# P1 · 结构化解构 Prompt

**使用场景**:单章原文 → extract.json
**建议模型**:Claude Sonnet 4.6
**effort**:medium

---

## Prompt 模板

```
任务:从下方章节原文中抽取结构化信息,输出 JSON。

严格要求:
1. 只抽取原文中明确存在的内容,不做推断、不做发挥
2. 所有字段必须填写,不得省略
3. 输出必须是可解析的 JSON,不要加 ```json 包装

输入变量:
- CHAPTER_ID: {ch04}
- CHAPTER_TITLE: {一般防御型投资者的投资组合策略}
- RAW_TEXT: {章节全文}

输出 JSON 结构:
{
  "chapter_id": "ch04",
  "chapter_title": "...",
  "word_count": <原文字数,整数>,
  "core_claims": [
    "<作者在本章提出的核心论点 1,完整句子>",
    "<论点 2>",
    "<论点 3>"
    // 至少 3 条,最多 8 条
  ],
  "key_data": [
    {"value": "<数字/百分比/金额>", "context": "<该数据的出处或语境>"}
    // 本章所有关键数字
  ],
  "key_terms": [
    "<本章引入或重点讨论的专业术语>"
    // 3-10 个
  ],
  "author_examples": [
    "<作者用来支撑论点的具体例子,一句话概括>"
    // 本章所有显著案例
  ],
  "structural_notes": "本章共 <N> 个小节,小节标题依次为:[标题1, 标题2, ...]"
}

只输出 JSON,不要任何解释性文字。
```

---

## 调用示例(Claude Code 里)

```
请读取 books/intelligent-investor/chapters/ch04/raw.txt,
按 prompts/P1_extract.md 的要求生成 extract.json,
保存到 books/intelligent-investor/chapters/ch04/extract.json。

处理完成后运行 scripts/verify_chapter.py ch04 并报告结果。
```

---

## 常见失败模式与对策

| 失败模式 | 原因 | 对策 |
|---------|------|------|
| 模型加了总结性开头 | 没按"只输出 JSON"执行 | 4.7 字面化强,很少发生;4.6 偶发,解析失败时重跑 |
| core_claims 不到 3 条 | 章节太短或抽取过于保守 | verify 脚本会报警,人工确认是否为短章 |
| 输出截断 | max_tokens 不够 | Claude Code 里指定 max_tokens=4000 |
