#!/usr/bin/env python3
"""
智识图书馆 v2 · 章节完整性校验

在每个章节的 extract.json / insights.md 生成后,自动运行,
确保产出完整,避免"模型说做完了但实际没做完"的情况。

用法:
    python scripts/verify_chapter.py <book-slug> <chapter-id>
    
    例如:
    python scripts/verify_chapter.py intelligent-investor-v4 ch04
"""

import json
import re
import sys
from pathlib import Path


LIBRARY_ROOT = Path("books")


class CheckResult:
    def __init__(self):
        self.issues = []
        self.warnings = []
    
    def fail(self, msg):
        self.issues.append(msg)
    
    def warn(self, msg):
        self.warnings.append(msg)
    
    def ok(self):
        return len(self.issues) == 0
    
    def report(self, chapter_id):
        print(f"\n=== 校验报告 · {chapter_id} ===")
        if self.ok() and not self.warnings:
            print("✅ 全部通过")
            return
        
        if self.issues:
            print(f"\n❌ 严重问题 ({len(self.issues)} 条):")
            for i, issue in enumerate(self.issues, 1):
                print(f"  {i}. {issue}")
        
        if self.warnings:
            print(f"\n⚠️  警告 ({len(self.warnings)} 条):")
            for i, warn in enumerate(self.warnings, 1):
                print(f"  {i}. {warn}")


def check_extract(ch_dir: Path, result: CheckResult):
    """校验 extract.json"""
    extract_file = ch_dir / "extract.json"
    if not extract_file.exists():
        result.fail("extract.json 不存在")
        return None
    
    try:
        data = json.loads(extract_file.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        result.fail(f"extract.json 解析失败:{e}")
        return None
    
    # 必填字段
    required = ["chapter_id", "chapter_title", "word_count",
                "core_claims", "key_data", "key_terms",
                "author_examples", "structural_notes"]
    for field in required:
        if field not in data:
            result.fail(f"extract.json 缺字段:{field}")
    
    # core_claims 数量
    claims = data.get("core_claims", [])
    if len(claims) < 3:
        result.fail(f"core_claims 仅 {len(claims)} 条(要求 ≥3)")
    elif len(claims) > 8:
        result.warn(f"core_claims 多达 {len(claims)} 条(建议 ≤8)")
    
    # word_count 与原文的一致性
    raw_file = ch_dir / "raw.txt"
    if raw_file.exists():
        actual_chars = len(raw_file.read_text(encoding="utf-8"))
        reported = data.get("word_count", 0)
        # 中文字符数 ≈ word_count 的合理比例
        if reported > 0:
            ratio = reported / max(actual_chars, 1)
            if ratio < 0.3 or ratio > 1.5:
                result.warn(
                    f"word_count={reported} 与原文字符数 {actual_chars} "
                    f"比例异常({ratio:.2f}),可能抽取口径不一致"
                )
    
    # structural_notes 不能为空
    if not data.get("structural_notes"):
        result.fail("structural_notes 为空")
    
    return data


def check_insights(ch_dir: Path, result: CheckResult):
    """校验 insights.md 六问是否齐全"""
    insights_file = ch_dir / "insights.md"
    if not insights_file.exists():
        result.warn("insights.md 尚未生成")
        return
    
    content = insights_file.read_text(encoding="utf-8")
    
    # 六问 heading 检查
    expected_headings = [
        r"Q1\s*·?\s*作者说了什么",
        r"Q2\s*·?\s*论据是什么",
        r"Q3\s*·?\s*反例与局限",
        r"Q4\s*·?\s*隐含前提",
        r"Q5\s*·?\s*与其他章节的关系",
        r"Q6\s*·?\s*我如何实践",
    ]
    
    for i, pattern in enumerate(expected_headings, 1):
        if not re.search(pattern, content):
            result.fail(f"insights.md 缺少 Q{i} 章节")
    
    # 字数检查(六问至少 2000 字)
    word_count = len(content)
    if word_count < 2000:
        result.warn(f"insights.md 字数偏低 ({word_count} 字),六问可能过于简略")
    
    # 金句附录
    if "本章金句" not in content and "原文金句" not in content:
        result.warn("insights.md 未附原文金句(灵魂层素材)")


def check_quotes(ch_dir: Path, result: CheckResult):
    """quotes.md 可选,若存在做基础校验"""
    quotes_file = ch_dir / "quotes.md"
    if not quotes_file.exists():
        return  # 可选文件,不报错
    
    content = quotes_file.read_text(encoding="utf-8")
    quote_count = content.count(">")  # 粗略用 blockquote 数统计
    if quote_count < 2:
        result.warn(f"quotes.md 仅 {quote_count} 条引用,建议 ≥3")


def main():
    if len(sys.argv) != 3:
        print("用法: python verify_chapter.py <book-slug> <chapter-id>")
        sys.exit(1)
    
    slug, ch_id = sys.argv[1], sys.argv[2]
    ch_dir = LIBRARY_ROOT / slug / "chapters" / ch_id
    
    if not ch_dir.exists():
        print(f"章节目录不存在:{ch_dir}")
        sys.exit(1)
    
    result = CheckResult()
    
    check_extract(ch_dir, result)
    check_insights(ch_dir, result)
    check_quotes(ch_dir, result)
    
    result.report(ch_id)
    sys.exit(0 if result.ok() else 1)


if __name__ == "__main__":
    main()
