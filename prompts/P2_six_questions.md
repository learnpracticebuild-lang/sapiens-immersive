# P2 · 六问深度分析 Prompt(v2.1)

**使用场景**:单章 extract.json + raw.txt → six_q/q1-q6.md → insights.md
**建议模型**:Claude Opus 4.7
**effort**:xhigh

---

## 核心设计原则

**六问不是发散思考,是固定结构的认知训练。**

每一问对应一种思维动作:
- Q1 复述 → 确保真的读懂了
- Q2 溯源 → 看清论证结构
- Q3 反驳 → 激活批判性思维
- Q4 反向 → 识别作者的隐藏假设
- Q5 联系 → 建立章节间的知识网络
- Q6 落地 → 从认知到行为(按 reader_persona 设定视角)

**关键纪律:每问必须独立一轮 user message,产出独立落盘为 six_q/qN.md**。合并后模型会偷懒,每问只写 2-3 句,深度立即崩塌。

---

## Q1 · 作者说了什么

**输入:**
- `chapters/chXX/extract.json` 的 core_claims
- `chapters/chXX/raw.txt`

**Prompt:**
```
任务:用你自己的话,完整复述本章作者的核心主张。

要求:
1. 不得抄原文句子,必须重新组织表达
2. 400-600 字
3. 覆盖本章所有主要论点,不遗漏
4. 用"作者认为..."、"作者主张..."这类标识句式
5. 不加入任何你自己的评价

输入见上。

输出:纯文本,不要 markdown 标题。直接写到 chapters/chXX/six_q/q1.md。
```

---

## Q2 · 论据是什么

**输入:**
- `chapters/chXX/six_q/q1.md`
- `chapters/chXX/raw.txt`

**Prompt:**
```
任务:梳理作者用来支撑核心主张的论据链条。

要求:
1. 按"论点 → 论据"的结构组织
2. 论据分为三类,分别标注:【事实/数据】【逻辑推理】【历史案例】
3. 300-500 字
4. 若作者的某个论点缺乏充分论据,明确指出

输入见上。

输出:markdown 格式,层级清晰。写到 chapters/chXX/six_q/q2.md。
```

---

## Q3 · 反例与局限

**输入:**
- `chapters/chXX/six_q/q1.md`
- `chapters/chXX/six_q/q2.md`
- `chapters/chXX/raw.txt` ← **必读,作者常自己明示局限**
- 章节主题领域的通识知识

**Prompt:**
```
任务:指出作者观点的适用边界,以及可能的反例。

要求:
1. 不是否定作者,而是厘清"作者的观点在什么情况下不成立"
2. 至少给出 2 个反例或局限场景
3. 先扫描 raw.txt,作者本人明示的局限优先引用;再补充你从通识知识或其他学者反驳中来的反例
4. 300-500 字
5. 态度中立,不贬损

输入见上。

输出:markdown 格式。写到 chapters/chXX/six_q/q3.md。
```

---

## Q4 · 隐含前提

**输入:**
- `chapters/chXX/six_q/q1.md`
- `chapters/chXX/six_q/q2.md`
- `chapters/chXX/extract.json` 的 key_terms(术语定义往往藏着前提)

**Prompt:**
```
任务:识别作者没有明说、但他的论证必须依赖的前提假设。

要求:
1. 至少找出 3 条
2. 每条说清楚:该前提是什么 + 为什么作者的论证依赖它 + 该前提在现实中的可靠性
3. 300-500 字
4. 这是最难的一问,请深度思考

输入见上。

输出:markdown 格式,编号列表。写到 chapters/chXX/six_q/q4.md。
```

---

## Q5 · 与其他章节的关系

**输入:**
- 本章 `extract.json`
- **已处理章节**的所有 `extract.json`(由于步骤 4 强制按 toc 顺序处理,本章处理时,前面所有章节的 extract 均可读;后面章节尚未处理,不在范围内)
- `toc.json`

**Prompt:**
```
任务:定位本章在全书论证链条中的位置。

要求:
1. 回答两个问题:
   (a) 本章承接了前面哪些章节的铺垫?
   (b) 基于 toc 全书目录,本章为后面哪些章节做准备?(可以基于章节标题推测,无需读后续章节正文)
2. 200-400 字
3. 不要写成"本章讲了 X"的摘要,而是写章节间的逻辑接力

输入见上。

输出:markdown 格式。写到 chapters/chXX/six_q/q5.md。
```

---

## Q6 · 我如何实践

**输入:**
- `chapters/chXX/six_q/q1.md`
- `chapters/chXX/six_q/q2.md`
- `chapters/chXX/six_q/q4.md`
- `meta.json` 的 `reader_persona` 字段

**Prompt(动态拼装):**

若 reader_persona 非 null:
```
任务:把本章的思想转化为对特定读者的可操作行动指引。

读者画像(来自 meta.json):
{reader_persona 内容}

要求:
1. 至少给出 3 条具体的、可执行的行动建议
2. 每条包含:建议是什么 + 什么场景下触发 + 执行时的注意事项
3. 避免空泛的"多学习""要谨慎"这类废话
4. 400-600 字
5. 若本章是纯理论章节,难以直接实践,给出"思维层面的使用方式"(如:遇到什么类型的问题时,用本章的框架来分析)
6. 若读者画像与本章主题明显错配(例如金融 CFO 读纯历史章节),在开头用一行标注"本章对 {画像} 的直接实践价值有限,以下为思维层面的迁移",然后给思维层面建议

输入见上。

输出:markdown 格式,编号列表。写到 chapters/chXX/six_q/q6.md。
```

若 reader_persona 为 null:
```
任务:基于本章的思想,写"通用思维层面的启示"。

要求:
1. 给出 3-5 条启示,每条是一个可迁移到其他领域的思维框架
2. 每条 100-150 字,说明:该框架是什么 + 可用于什么类型的问题
3. 400-600 字
4. 不假设具体读者身份

输入见上。

输出:markdown 格式,编号列表。写到 chapters/chXX/six_q/q6.md。
```

---

## 六问完成后:组装 insights.md

所有 q1.md - q6.md 均已落盘后,按以下结构组装为 `chapters/chXX/insights.md`:

```markdown
# {章节号} · {章节标题}

> 认知转化产出 | 生成时间:{ISO timestamp}
> 基于六问分析,每问独立执行

## Q1 · 作者说了什么
{q1.md 内容}

## Q2 · 论据是什么
{q2.md 内容}

## Q3 · 反例与局限
{q3.md 内容}

## Q4 · 隐含前提
{q4.md 内容}

## Q5 · 与其他章节的关系
{q5.md 内容}

## Q6 · 我如何实践
{q6.md 内容}

---

## 附:本章金句

{从 raw.txt 精选 3-5 句作者原文,保留作者声音,每句独立一行用 > 开头}
```

组装完成后,同时生成独立的 `chapters/chXX/quotes.md`(只含金句部分,供 compose_quotes.py 拼接用)。

---

## 调用示例(给 Claude Code)

```
现在对 ch04 执行 P2 六问分析。

纪律:每问一次独立 user message,产出落盘到 chapters/ch04/six_q/qN.md。不允许合并。

按顺序执行:
1. Q1(输入:extract.json + raw.txt) → q1.md
2. Q2(输入:q1.md + raw.txt) → q2.md
3. Q3(输入:q1.md + q2.md + raw.txt + 通识) → q3.md
4. Q4(输入:q1.md + q2.md + extract.json.key_terms) → q4.md
5. Q5(输入:本章 extract.json + ch01-ch03 的 extract.json + toc.json) → q5.md
6. Q6(读 meta.json 的 reader_persona 后拼装 prompt,输入:q1.md + q2.md + q4.md + 画像) → q6.md
7. 组装 insights.md + quotes.md
8. 运行 verify_chapter.py ch04 校验
```
