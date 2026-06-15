#!/usr/bin/env python3
"""
智识图书馆 v2 · 入库脚本

功能:
1. 从 inbox/ 读取 EPUB(或其他格式先转 EPUB)
2. 提取目录结构 → toc.json
3. 按章节切分原文 → chapters/chXX/raw.txt
4. 生成版本指纹 → meta.json
5. 警告:若同书已存在,对比版本差异

用法:
    python scripts/ingest.py inbox/intelligent-investor.epub \
                             --slug intelligent-investor

依赖:
    pip install ebooklib beautifulsoup4
    (AZW3/MOBI 需要 calibre 的 ebook-convert 命令)
"""

import argparse
import hashlib
import json
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

try:
    from ebooklib import epub
    from bs4 import BeautifulSoup
except ImportError:
    print("错误:请先安装依赖 pip install ebooklib beautifulsoup4")
    sys.exit(1)


LIBRARY_ROOT = Path("books")


def convert_to_epub(input_path: Path) -> Path:
    """非 EPUB 格式 → EPUB(调用 calibre 的 ebook-convert)"""
    if input_path.suffix.lower() == ".epub":
        return input_path
    
    output_path = input_path.with_suffix(".epub")
    print(f"[转换] {input_path.name} → EPUB")
    try:
        subprocess.run(
            ["ebook-convert", str(input_path), str(output_path)],
            check=True, capture_output=True
        )
    except FileNotFoundError:
        print("错误:未安装 calibre。请安装 calibre 或手动提供 EPUB。")
        sys.exit(1)
    return output_path


def extract_toc(book: epub.EpubBook) -> list:
    """提取目录结构"""
    def flatten(items, level=0):
        result = []
        for item in items:
            if isinstance(item, tuple):
                section, children = item
                result.append({
                    "level": level,
                    "title": section.title,
                    "href": getattr(section, "href", None),
                })
                result.extend(flatten(children, level + 1))
            else:
                result.append({
                    "level": level,
                    "title": item.title,
                    "href": item.href,
                })
        return result
    return flatten(book.toc)


def _normalize_href(href: str) -> str:
    """规范化 href:去除 anchor,去除可能的 ../ 前缀"""
    href = href.split("#")[0]
    # epub 里 toc 的 href 可能是 "chapter04.xhtml" 或 "OEBPS/chapter04.xhtml"
    # spine 里的 item name 一般是完整相对路径
    return href


def _build_spine_order(book: epub.EpubBook) -> list:
    """
    获取 EPUB 的 spine 阅读顺序(xhtml 文件列表)。
    spine 是 EPUB 定义的文档阅读顺序,比 toc 更底层、更完整。
    返回:[(item_id, item_name), ...] 按阅读顺序
    """
    spine_order = []
    for itemref in book.spine:
        # itemref 可能是 (id, linear) 元组或直接是 id 字符串
        item_id = itemref[0] if isinstance(itemref, tuple) else itemref
        item = book.get_item_with_id(item_id)
        if item is not None:
            spine_order.append((item_id, item.get_name()))
    return spine_order


def _find_spine_index(spine_order: list, href: str) -> int:
    """在 spine 中找到 href 对应文件的位置。找不到返回 -1。"""
    target = _normalize_href(href)
    # 匹配策略:spine item name 的尾部要和 target 匹配
    # 例如 target="part0018.xhtml",item_name="OEBPS/part0018.xhtml" 应匹配
    for idx, (_, name) in enumerate(spine_order):
        if name.endswith(target) or target.endswith(name):
            return idx
    # 兜底:只比文件名(不含路径)
    target_basename = target.split("/")[-1]
    for idx, (_, name) in enumerate(spine_order):
        if name.split("/")[-1] == target_basename:
            return idx
    return -1


def _extract_text_from_item(book: epub.EpubBook, item_id: str) -> str:
    """从 spine item 提取纯文本"""
    item = book.get_item_with_id(item_id)
    if item is None:
        return ""
    soup = BeautifulSoup(item.get_content(), "html.parser")
    for tag in soup(["script", "style"]):
        tag.decompose()
    text = soup.get_text(separator="\n")
    text = re.sub(r"\n\s*\n", "\n\n", text).strip()
    return text


def extract_chapter_texts_by_spine(
    book: epub.EpubBook, top_chapters: list
) -> list:
    """
    基于 spine 顺序切分章节正文。
    
    每章的范围 = 从该章 TOC href 对应的 spine 位置,
                 到下一章 TOC href 对应的 spine 位置之前的所有 xhtml。
    
    返回每章的拼接正文列表。
    """
    spine_order = _build_spine_order(book)
    if not spine_order:
        # spine 缺失,降级到原逻辑
        print("⚠️  EPUB 无 spine 信息,降级为单文件切分(可能缺失内容)")
        return [extract_chapter_text(book, ch["href"]) for ch in top_chapters]
    
    # 为每章找 spine 起点
    chapter_start_indices = []
    for ch in top_chapters:
        idx = _find_spine_index(spine_order, ch["href"])
        if idx < 0:
            print(f"⚠️  未在 spine 中找到章节 '{ch['title']}' 的入口文件 {ch['href']}")
        chapter_start_indices.append(idx)
    
    # 计算每章的 spine 结束位置(下一章开始前,或 spine 末尾)
    chapter_texts = []
    for i, start_idx in enumerate(chapter_start_indices):
        if start_idx < 0:
            chapter_texts.append("")
            continue
        
        # 下一章的起点(作为本章的结束边界)
        next_start = None
        for j in range(i + 1, len(chapter_start_indices)):
            if chapter_start_indices[j] >= 0:
                next_start = chapter_start_indices[j]
                break
        end_idx = next_start if next_start is not None else len(spine_order)
        
        # 拼接 spine[start_idx:end_idx] 所有 item 的文本
        parts = []
        for spine_idx in range(start_idx, end_idx):
            item_id, _ = spine_order[spine_idx]
            text = _extract_text_from_item(book, item_id)
            if text:
                parts.append(text)
        chapter_texts.append("\n\n".join(parts))
    
    return chapter_texts


def extract_chapter_text(book: epub.EpubBook, href: str) -> str:
    """
    [保留] 单文件章节抽取,作为降级备用。
    主流程已改用 extract_chapter_texts_by_spine。
    """
    href_file = href.split("#")[0]
    for item in book.get_items():
        if item.get_name().endswith(href_file):
            soup = BeautifulSoup(item.get_content(), "html.parser")
            for tag in soup(["script", "style"]):
                tag.decompose()
            text = soup.get_text(separator="\n")
            text = re.sub(r"\n\s*\n", "\n\n", text).strip()
            return text
    return ""


def compute_fingerprint(book: epub.EpubBook, chapters_text: list) -> dict:
    """生成版本指纹:章节数、首章首段、总字数"""
    total_chars = sum(len(t) for t in chapters_text)
    first_chapter_opening = chapters_text[0][:500] if chapters_text else ""
    opening_hash = hashlib.md5(
        first_chapter_opening.encode("utf-8")
    ).hexdigest()[:12]
    
    return {
        "chapter_count": len(chapters_text),
        "total_chars": total_chars,
        "first_chapter_opening_500chars": first_chapter_opening,
        "first_chapter_hash": opening_hash,
    }


def check_version_collision(slug: str, fingerprint: dict) -> None:
    """检查是否与已入库版本冲突"""
    existing = LIBRARY_ROOT / slug / "meta.json"
    if not existing.exists():
        return
    
    old_meta = json.loads(existing.read_text(encoding="utf-8"))
    old_fp = old_meta.get("fingerprint", {})
    
    if old_fp.get("first_chapter_hash") == fingerprint["first_chapter_hash"]:
        print(f"[确认] 与已入库版本一致,跳过重复入库")
        sys.exit(0)
    
    print(f"\n⚠️  版本冲突警告 ⚠️")
    print(f"书籍 slug '{slug}' 已存在,但版本指纹不同:")
    print(f"  旧版本:章节数 {old_fp.get('chapter_count')}, "
          f"总字数 {old_fp.get('total_chars')}")
    print(f"  新版本:章节数 {fingerprint['chapter_count']}, "
          f"总字数 {fingerprint['total_chars']}")
    print(f"\n旧版本首章开头:\n{old_fp.get('first_chapter_opening_500chars', '')[:200]}")
    print(f"\n新版本首章开头:\n{fingerprint['first_chapter_opening_500chars'][:200]}")
    print(f"\n这很可能是不同版本(如第 3 版 vs 第 4 版)。")
    print(f"请人工确认后,用 --slug 指定新的 slug(如 {slug}-v4),或先删除旧目录。")
    sys.exit(1)


def ingest(input_path: Path, slug: str, force: bool = False):
    """主流程"""
    # Step 1: 确保是 EPUB
    epub_path = convert_to_epub(input_path)
    
    # Step 2: 解析
    print(f"[解析] {epub_path.name}")
    book = epub.read_epub(str(epub_path))
    
    # 元数据
    title = book.get_metadata("DC", "title")
    author = book.get_metadata("DC", "creator")
    title = title[0][0] if title else "Unknown"
    author = author[0][0] if author else "Unknown"
    
    # 目录
    toc = extract_toc(book)
    # 只保留顶层章节(level 0),避免把小节也当章
    top_chapters = [t for t in toc if t["level"] == 0 and t.get("href")]
    
    if len(top_chapters) < 3:
        print(f"⚠️  检测到顶层章节少于 3 个,可能目录结构异常")
        print(f"请检查 EPUB 的 toc,或手动调整切分")
    
    # 提取章节正文(基于 spine 顺序,正确处理跨 xhtml 的章节)
    chapters_text = extract_chapter_texts_by_spine(book, top_chapters)
    
    # 健康检查:总字数与 EPUB 所有文本量对比,发现严重缺漏
    all_spine_text_len = 0
    for itemref in book.spine:
        item_id = itemref[0] if isinstance(itemref, tuple) else itemref
        item = book.get_item_with_id(item_id)
        if item is not None:
            try:
                soup = BeautifulSoup(item.get_content(), "html.parser")
                for tag in soup(["script", "style"]):
                    tag.decompose()
                all_spine_text_len += len(soup.get_text(separator="\n"))
            except Exception:
                pass
    chaptered_len = sum(len(t) for t in chapters_text)
    if all_spine_text_len > 0:
        retention = chaptered_len / all_spine_text_len
        print(f"[诊断] EPUB 全文字符数:{all_spine_text_len:,}")
        print(f"[诊断] 切章后保留字符数:{chaptered_len:,}")
        print(f"[诊断] 保留率:{retention:.1%}")
        if retention < 0.70:
            print(f"\n⚠️  严重警告:切章后保留率 {retention:.1%} 低于 70%,可能仍有内容丢失")
            print(f"   建议:检查 EPUB 的 toc/spine 结构,或手动调整切章逻辑")
            print(f"   继续执行,但入库结果需要人工重点核对\n")
    
    # Step 3: 生成版本指纹
    fingerprint = compute_fingerprint(book, chapters_text)
    
    # Step 4: 检查冲突
    if not force:
        check_version_collision(slug, fingerprint)
    
    # Step 5: 落盘
    book_dir = LIBRARY_ROOT / slug
    book_dir.mkdir(parents=True, exist_ok=True)
    (book_dir / "chapters").mkdir(exist_ok=True)
    
    # meta.json
    # reader_persona 字段:Q6 实践建议的视角设定
    # 默认 null,由用户在版本确认阶段根据书籍类型设置
    # 可选值见 CLAUDE.md 步骤 2.5
    meta = {
        "slug": slug,
        "title": title,
        "author": author,
        "source_file": str(input_path),
        "ingested_at": datetime.now().isoformat(),
        "fingerprint": fingerprint,
        "reader_persona": None,  # TODO: 用户确认版本时设置
    }
    (book_dir / "meta.json").write_text(
        json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    
    # toc.json
    (book_dir / "toc.json").write_text(
        json.dumps(top_chapters, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    
    # 章节 raw.txt
    for idx, (ch, text) in enumerate(zip(top_chapters, chapters_text), 1):
        ch_id = f"ch{idx:02d}"
        ch_dir = book_dir / "chapters" / ch_id
        ch_dir.mkdir(exist_ok=True)
        (ch_dir / "raw.txt").write_text(text, encoding="utf-8")
    
    # 报告
    print(f"\n✅ 入库完成")
    print(f"   书名:{title}")
    print(f"   作者:{author}")
    print(f"   章节数:{len(top_chapters)}")
    print(f"   总字数:{fingerprint['total_chars']:,}")
    print(f"   版本指纹:{fingerprint['first_chapter_hash']}")
    print(f"\n📋 下一步:")
    print(f"   1. 人工核对 {book_dir}/chapters/ch01/raw.txt 的开头几段,确认版本正确")
    print(f"   2. 核对章节数 {len(top_chapters)} 与原书目录是否一致")
    print(f"      (若不一致,可能是 Part/Chapter 二级结构被误当成一层,需手动调整)")
    print(f"   3. 打开 {book_dir}/meta.json 设置 reader_persona 字段")
    print(f"      (参考 CLAUDE.md 步骤 2.5)")


def validate_slug(slug: str) -> None:
    """slug 命名规范校验:小写英文 + 短横线,长度 ≤ 30"""
    import re
    if not re.match(r"^[a-z0-9]+(-[a-z0-9]+)*$", slug):
        print(f"❌ slug 格式错误:{slug}")
        print(f"   要求:英文小写字母/数字,单词间用短横线,不含下划线/空格/点/中文")
        print(f"   示例:intelligent-investor-v4, thinking-fast-slow")
        sys.exit(1)
    if len(slug) > 30:
        print(f"❌ slug 过长({len(slug)} 字符,上限 30):{slug}")
        sys.exit(1)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input", type=Path, help="输入文件(EPUB/AZW3/MOBI)")
    ap.add_argument("--slug", required=True, help="书籍标识,如 intelligent-investor-v4")
    ap.add_argument("--force", action="store_true", help="跳过版本冲突检查")
    args = ap.parse_args()
    
    validate_slug(args.slug)
    
    if not args.input.exists():
        print(f"文件不存在:{args.input}")
        sys.exit(1)
    
    ingest(args.input, args.slug, args.force)


if __name__ == "__main__":
    main()
