# 智识图书馆 v2 · 架构设计文档

> 为 Claude Opus 4.7 重新设计的三层漏斗架构,目标:替代阅读原书的认知转化系统

---

## 一、设计原则(不可妥协)

1. **单位原则**:一切处理以"章"为基本单位,不以"书"为单位
2. **单轮原则**:每个 prompt 只让模型干一件事,不复合任务
3. **验证原则**:每步产出都要有机器可校验的完整性指标
4. **保留原则**:作者的原文金句必须保留,不能被过度压缩
5. **分层模型**:低阶任务用 Sonnet 4.6,高阶任务用 Opus 4.7

---

## 二、目录结构

```
library-v2/
├── inbox/                        # 待入库的 epub
├── books/
│   └── {book-slug}/              # 每本书一个目录
│       ├── meta.json             # 书籍元数据 + 版本信息
│       ├── toc.json              # 目录骨架(从 EPUB 提取)
│       ├── chapters/
│       │   ├── ch01/
│       │   │   ├── raw.txt       # 章节原文
│       │   │   ├── extract.json  # 第一层:结构化解构
│       │   │   ├── insights.md   # 第二层:六问分析
│       │   │   └── quotes.md     # 保留的原文金句
│       │   └── ch02/...
│       ├── book_skeleton.md      # 骨架层:全书单页地图
│       ├── book_essence.md       # 血肉层:全书精华本
│       └── book_quotes.md        # 灵魂层:金句集
├── themes/                       # 跨书主题索引
│   ├── 价值投资.md
│   ├── 认知偏差.md
│   └── ...
├── prompts/                      # 所有 prompt 模板
│   ├── P1_extract.md
│   ├── P2_six_questions.md
│   ├── P3_skeleton.md
│   ├── P4_essence.md
│   └── P5_theme_update.md
└── scripts/
    ├── ingest.py                 # EPUB → chapters/ch*/raw.txt
    ├── verify_chapter.py         # 每章产出完整性校验
    └── version_check.py          # 版本核对(首章首段采样)
```

---

## 三、三层处理流水线

### 第一层:结构化解构(Extraction)

**输入**:单章原文(≤ 1.5 万字)
**模型**:Claude Sonnet 4.6(便宜够用)
**温度**:低
**任务**:只做信息抽取,不做发挥

产出 `extract.json`:
```json
{
  "chapter_id": "ch04",
  "chapter_title": "一般防御型投资者的投资组合策略",
  "word_count": 12543,
  "core_claims": [
    "防御型投资者应将资金在债券与股票之间按 50/50 配置",
    "..."
  ],
  "key_data": [
    {"value": "4.5%", "context": "1972年高等级公司债收益率"}
  ],
  "key_terms": ["防御型投资者", "50/50 策略"],
  "author_examples": [
    "..."
  ],
  "structural_notes": "本章分 6 个小节,小节标题如下:[...]"
}
```

### 第二层:六问分析(Six Questions)

**输入**:单章的 `extract.json` + `raw.txt`
**模型**:Claude Opus 4.7(需要深度思考)
**温度**:中
**任务**:针对该章固定做六个独立追问,每问一轮

**六问:**
1. **作者说了什么?** — 用你自己的话复述该章核心主张
2. **论据是什么?** — 作者用什么事实/数据/逻辑支撑
3. **反例与局限是什么?** — 什么情况下作者的观点不成立
4. **隐含前提是什么?** — 作者没说但必须成立的假设
5. **与其他章节的关系?** — 这章在全书论证链条中的位置
6. **我如何实践?** — 具体到行为层面的可操作结论

产出 `insights.md`:每问独立一节,各 300-500 字。

### 第三层:知识整合(Integration)

分三个任务,每个独立执行:

**任务 A — 骨架层(Skeleton)**
- 输入:所有章节的 `extract.json` 的 `core_claims`
- 输出:一页纸的全书论证地图
- 目标:看完就知道这本书在讲什么

**任务 B — 血肉层(Essence)**
- 输入:所有章节的 `insights.md` 的"作者说了什么"+"我如何实践"两节
- 输出:精华本,按章排列,每章 800-1200 字
- 目标:看完就掌握了全书内容

**任务 C — 主题索引(Theme Update)**
- 输入:本书元数据 + 骨架层
- 输出:更新 `themes/` 下相关主题文件,插入本书的相关论点+指向章节
- 目标:实现跨书主题检索

---

## 四、完整性校验机制

每章处理完,自动运行三重校验:

| 校验项 | 判定 | 不通过处理 |
|-------|------|----------|
| 原文字数 vs 小节数比例 | extract.json 的 `word_count` ÷ `structural_notes` 小节数,正常 1500-3500 | 低于下限 → 可能漏读,人工复核 |
| 核心论点数 | core_claims 数量 ≥ 3 | 低于 → 重跑 |
| insights.md 六节齐全 | 文件中含 6 个固定 heading | 缺失 → 重跑对应部分 |

校验脚本为 `scripts/verify_chapter.py`,每章完成后自动调用。

---

## 五、版本核对前置(防止 Part 1 白做)

新增 `scripts/version_check.py`,在入库 EPUB 时**第一步**强制执行:

1. 提取 EPUB 第一章的前 500 字
2. 让模型给出书名、作者、版本特征(章节数、出版年份线索)
3. 在 `meta.json` 中记录版本指纹
4. 若该书已有历史版本,自动对比并警告

这一步做完用户手动确认一次版本,之后全自动。

---

## 六、旧资产迁移

针对已完成的 `BOOK_OVERVIEW.md` 和 `CHAPTER_ANALYSIS_PART1.md`:

1. `BOOK_OVERVIEW.md` → 近似等同于新架构的 `book_skeleton.md`,直接迁移
2. `CHAPTER_ANALYSIS_PART1.md` → 拆分为 ch01-ch03 的 `insights.md`,补齐六问中缺失的部分
3. 迁移脚本 `scripts/migrate_v1.py`(待 v1 产物结构稳定后再开发)

---

## 七、模型与成本策略

| 任务 | 模型 | 原因 |
|-----|------|------|
| 版本核对 | Sonnet 4.6 | 简单识别任务 |
| 结构化解构 | Sonnet 4.6 | 抽取类任务,不需要 Opus |
| 六问分析 | **Opus 4.7** | 深度思考的唯一环节,值得花钱 |
| 骨架层 | Sonnet 4.6 | 基于已压缩素材 |
| 血肉层 | **Opus 4.7** | 需要高质量组织 |
| 主题索引 | Sonnet 4.6 | 模式化任务 |

**预估单本书成本**:Opus 4.7 只在 6 个关键节点用,其余用 Sonnet。相比原先全 Opus 处理,token 消耗降低约 60%,同时质量提升。

---

## 八、与 Claude Code 的协作模式

- 你给 Claude Code 发指令时,**始终指定处理的章节号**(如"处理 ch04")
- Claude Code 读取对应的 prompt 模板,不要让它临场发挥
- 每完成一章,自动运行校验脚本并报告结果
- 全书整合(第三层)最后集中处理,不与章节处理混在一起

---

## 九、验收标准

一本书处理完毕后,必须同时具备:
- [ ] `book_skeleton.md` — 一页纸,看完知道全书讲什么
- [ ] `book_essence.md` — 精华本,看完掌握全书内容
- [ ] `book_quotes.md` — 金句集,保留作者原味
- [ ] 每章的 `extract.json` + `insights.md` + `quotes.md` 齐全且通过校验
- [ ] `themes/` 下相关主题文件已更新本书条目
- [ ] `meta.json` 版本指纹完整

全部达标,才算完成一本书的"认知转化"。
