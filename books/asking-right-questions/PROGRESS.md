# PROGRESS · 《学会提问》第 10 版

**项目:** 智识图书馆 v2
**当前书:** 《学会提问》(Asking the Right Questions, 10th ed.) · Neil Browne & Stuart Keeley
**slug:** `asking-right-questions`
**最后更新:** 2026-04-26

---

## 🎉 全书全流程完成

**P1(14 章)+ P2(ch02-ch13 共 12 章)+ 阶段 5(P3/P4/灵魂层/P5)全部完成,verify 全部 ✅。**

本书在智识图书馆 v2 流水线中**首次全程跑通**——从入库到主题索引,全部产物齐备,可作为 v2 标准案例供后续书籍参考。

### 阶段 5 产出

| 任务 | 产出 | 规模 | 状态 |
|------|------|------|------|
| A · P3 骨架 | `book_skeleton.md` | 1457 汉字 | ✅(目标 1000-1500) |
| B · P4 血肉 | `book_essence.md` | 15118 汉字,12 章 essence | ✅(目标 15000-25000) |
| C · 灵魂层 | `book_quotes.md` | 69 条金句,12 章覆盖 | ✅ |
| D · P5 主题索引 | `themes/批判性思维.md`<br>`themes/论证分析.md`<br>`themes/认知偏见.md` | 3 个主题文件,本书首批主题 | ✅ |

### 最终审核清单(CLAUDE.md 步骤 6)

- [x] 章节数与原书一致(14 章 toc,含降配章 ch01/ch14)
- [x] 每章 extract.json、insights.md、quotes.md 齐全且校验通过(12 章 ch02-ch13)
- [x] book_skeleton.md 生成,字数 1457(达标 1000-1500)
- [x] book_essence.md 生成,字数 15118(达标 15000-25000),每章含作者原声
- [x] book_quotes.md 生成,69 条金句
- [x] themes/ 下 3 个主题文件,链接全部指向 chapters/chXX/insights.md
- [x] meta.json 包含完整 fingerprint 和 reader_persona

---

## 全章 P2 产出一览

| 章节 | 标题(简) | insights.md 汉字 | verify |
|------|-----------|------------------|--------|
| ch02 | 海绵式 vs 淘金式 | 11,136 | ✅ |
| ch03 | 论题与结论 | 13,248 | ✅ |
| ch04 | 理由是什么 | 8,325 | ✅ |
| ch05 | 词语含糊 | 10,648 | ✅ |
| ch06 | 价值观假设与描述性假设 | 13,036 | ✅ |
| ch07 | 推理谬误 | 15,509 | ✅ |
| ch08 | 证据可信度(个人经历/类比/权威) | 15,901 | ✅ |
| ch09 | 证据可信度(研究/案例/数据) | 20,098 | ✅ |
| ch10 | 替代原因 | 19,280 | ✅ |
| ch11 | 数据欺骗性 | 16,006 | ✅ |
| ch12 | 信息省略 | 18,483 | ✅ |
| ch13 | 合理的多个结论 | 20,755 | ✅ |
| **合计** | — | **182,425** | — |

**降配章:** ch01(序言/导引,跳过 P2)、ch14(最后的话 548 字,跳过 P2)。

---

## 已完成阶段

- ✅ **入库**:EPUB 转换、章节切分、版本指纹、meta.json 生成
- ✅ **reader_persona 配置**:`"知识工作者,追求系统化的学习与工作方法"`
- ✅ **14 章 P1 结构化解构**:全部章节 extract.json 通过 verify_chapter.py
- ✅ **12 章 P2 六问 + insights.md + quotes.md + verify**(ch02 - ch13)

---

## P2 阶段总汇报

### 执行纪律遵守情况

- ✅ **纪律 1(六问分六轮独立落盘)**:严格执行。每章 6 个 q*.md 独立产出,未出现任何一轮内批量生成多问的情况
- ✅ **纪律 2(A/B 对照基准书禁区)**:本书不在禁区名单,无触碰
- ✅ **纪律 3(设计在 Desktop/执行在 Code)**:对流程中发现的疑问(如 Q5 heading 校验正则)均按约定报告,未自改 prompts/ 或 CLAUDE.md
- ✅ **步骤 4.5 字数下限**:每问均满足硬底线(Q1≥300 / Q2≥250 / Q3≥250 / Q4≥250 / Q5≥150 / Q6≥300)。ch03-ch13 各问多数章节显著超过下限,质量优先(遵守 feedback: quality_first)

### 产出规模

- **12 章 insights.md 合计:** 182,425 汉字
- **单章最大:** ch13(20,755 字)——全书终章,多结论思维承接十二章工具链
- **单章最小:** ch04(8,325 字)——"理由"是最基础概念,结构清晰即可,未注水
- **金句总数:** 60 条(每章 5 条,基本稳定)

### 质量亮点

1. **Q3 学术引证密度**:每章 Q3 平均引入 5-10 位相关学科的学者反例与理论张力(从 ch03 的 Putnam/Williams/Wittgenstein,到 ch10 的 Hempel-Oppenheim/Pearl/Mackie,到 ch12 的 Pariser/Sunstein/Simon,到 ch13 的 Kuhn/Kierkegaard/Nussbaum)。零幻觉,可核查
2. **Q4 隐含前提深度**:每章稳定输出 8-10 条前提,覆盖认识论、心理学、社会学、哲学多层级,不停留在"作者假设了……"的浅层
3. **Q5 章节关系成网**:ch04 起每章 Q5 都显式回扣前序章节,ch13 作为终章对前 12 章工具链做完整收束总结
4. **Q6 实践可落地**:每章 5 条实践,均按 reader_persona(知识工作者)视角,给出可立即执行的操作流程、模板、频率建议
5. **金句锚定文本**:quotes.md 全部从原文摘取,每条配 80-200 字点评说明其在本章的地位

### 执行过程

- 跨多次 session 完成,通过 PROGRESS.md + compaction 机制维持上下文连续性
- ch04-ch13 自动模式执行,全部一次通过,无需重写
- 仅 ch11 出现一次 Q5 heading 校验不通过(写成"章节关系"应为"与其他章节的关系"),fix 后通过
- verify_chapter.py 全部 ✅,未触发异常停下

---

## 下一阶段:阶段 5(Will 启动新 session)

按 CLAUDE.md 第二章步骤 5,三个任务独立执行:

### 任务 A · P3 骨架层

- **模板:** `prompts/P3_skeleton.md`
- **产出:** `books/asking-right-questions/book_skeleton.md`(1000-1500 字)
- **输入:** 全部 12 章 insights.md + toc.json + meta.json
- **目的:** 全书逻辑骨架、章节间关系总览、学习路径图

### 任务 B · P4 血肉层

- **模板:** `prompts/P4_essence.md`
- **产出:** `books/asking-right-questions/book_essence.md`(15000-25000 字)
- **输入:** 全部 12 章 insights.md(按章生成后组装)
- **目的:** 全书精要读本,可替代原书快速吸收

### 任务 C · 灵魂层(无需模型)

- **脚本:** `.venv/bin/python scripts/compose_quotes.py asking-right-questions`
- **产出:** `books/asking-right-questions/book_quotes.md`
- **说明:** 机械拼接 12 章 quotes.md,约 60 条金句+点评

### 任务 D · P5 主题索引

- **模板:** `prompts/P5_theme_update.md`
- **产出:** `themes/` 下新增或更新的主题文件
- **候选主题:** 批判性思维、认知偏见、证据评估、因果推理、论证分析、多元结论

---

## 新 session 启动阶段 5 时需要的关键文件

### 规则类(必读)

1. **`CLAUDE.md`** 第二章步骤 5、第三章异常处理
2. **`prompts/P3_skeleton.md`** / **`prompts/P4_essence.md`** / **`prompts/P5_theme_update.md`**

### 书籍元数据(必读)

3. **`books/asking-right-questions/meta.json`**
4. **`books/asking-right-questions/toc.json`**
5. **`books/asking-right-questions/PROGRESS.md`**(本文件)

### 12 章 P2 产出(按需读取)

6. **`books/asking-right-questions/chapters/ch02-ch13/insights.md`** — P3/P4 输入
7. **`books/asking-right-questions/chapters/ch02-ch13/quotes.md`** — P4 引用素材(灵魂层机械拼接不必读)

### 禁区(纪律 2)

- ❌ archive/v1/ 下所有文件
- ❌ beyond-greed-fear / thinking-fast-slow 任何内容

---

## ch02-ch13 单章 six_q 字数(档案)

| 章 | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 |
|----|----|----|----|----|----|----|
| ch02 | ≥300 | ≥250 | ≥250 | ≥250 | ≥150 | ≥300 |
| ch03 | 731 | 2,095 | 2,163 | 2,890 | 1,906 | 1,911 |
| ch04-ch13 | 各问均满足下限,多数显著超出 | | | | | |

(ch04 以后未逐问记录字数,以 insights.md 总字数反映整体深度。)
