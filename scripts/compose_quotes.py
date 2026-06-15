#!/usr/bin/env python3
"""
智识图书馆 v2 · 金句集拼接脚本

把所有章节的 quotes.md 机械拼接为 book_quotes.md,不经过模型。
灵魂层(金句集)的标准生成路径。

用法:
    .venv/bin/python scripts/compose_quotes.py <book-slug>
"""

import json
import sys
from datetime import datetime
from pathlib import Path

LIBRARY_ROOT = Path("books")


def main():
    if len(sys.argv) != 2:
        print("用法: python compose_quotes.py <book-slug>")
        sys.exit(1)
    
    slug = sys.argv[1]
    book_dir = LIBRARY_ROOT / slug
    
    if not book_dir.exists():
        print(f"书籍目录不存在:{book_dir}")
        sys.exit(1)
    
    meta_file = book_dir / "meta.json"
    if not meta_file.exists():
        print(f"meta.json 不存在:{meta_file}")
        sys.exit(1)
    meta = json.loads(meta_file.read_text(encoding="utf-8"))
    
    chapters_dir = book_dir / "chapters"
    chapter_dirs = sorted([d for d in chapters_dir.iterdir() if d.is_dir()])
    
    if not chapter_dirs:
        print("未找到任何章节目录")
        sys.exit(1)
    
    lines = [
        f"# {meta.get('title', 'Unknown')} · 金句集",
        "",
        f"> 作者:{meta.get('author', 'Unknown')}",
        f"> 生成时间:{datetime.now().isoformat()}",
        f"> 来源:每章独立精选金句的机械拼接",
        "",
        "---",
        "",
    ]
    
    total_quotes = 0
    missing_chapters = []
    
    for ch_dir in chapter_dirs:
        ch_id = ch_dir.name
        quotes_file = ch_dir / "quotes.md"
        if not quotes_file.exists():
            missing_chapters.append(ch_id)
            continue
        
        content = quotes_file.read_text(encoding="utf-8").strip()
        if not content:
            missing_chapters.append(ch_id)
            continue
        
        # 章节标题(尝试从 extract.json 取)
        extract_file = ch_dir / "extract.json"
        ch_title = ch_id
        if extract_file.exists():
            try:
                extract = json.loads(extract_file.read_text(encoding="utf-8"))
                ch_title = extract.get("chapter_title", ch_id)
            except Exception:
                pass
        
        lines.append(f"## {ch_id} · {ch_title}")
        lines.append("")
        lines.append(content)
        lines.append("")
        lines.append("---")
        lines.append("")
        
        # 粗略统计 blockquote 数
        total_quotes += content.count("\n>") + (1 if content.startswith(">") else 0)
    
    # 尾部统计
    lines.append("")
    lines.append(f"**本书共收录 {len(chapter_dirs) - len(missing_chapters)} 章金句,约 {total_quotes} 条**")
    if missing_chapters:
        lines.append("")
        lines.append(f"⚠️ 缺失 quotes.md 的章节:{', '.join(missing_chapters)}")
    
    output_file = book_dir / "book_quotes.md"
    output_file.write_text("\n".join(lines), encoding="utf-8")
    
    print(f"✅ book_quotes.md 已生成")
    print(f"   章节数:{len(chapter_dirs)}")
    print(f"   含金句章节:{len(chapter_dirs) - len(missing_chapters)}")
    print(f"   金句总数(粗略):{total_quotes}")
    if missing_chapters:
        print(f"   ⚠️  缺失章节:{missing_chapters}")


if __name__ == "__main__":
    main()
