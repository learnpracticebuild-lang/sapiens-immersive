# 从 v1 迁移到 v2 · 操作指南

> 本指南告诉你:拿到这套新架构后,具体怎么落地到你的项目里,以及已有的劳动成果如何不浪费。

---

## 第一步:在你的项目里铺好新骨架

1. 在你的智识图书馆项目根目录下,创建以下结构:
   ```
   library/(你现有的项目根)
   ├── ARCHITECTURE.md       ← 本次交付,架构设计
   ├── CLAUDE.md             ← 本次交付,Claude Code 工作指令
   ├── MIGRATION.md          ← 本次交付,本文件
   ├── prompts/              ← 本次交付,5 个 prompt 模板
   ├── scripts/              ← 本次交付,2 个脚本
   ├── books/                ← 逐步填充
   ├── themes/               ← 逐步填充
   ├── inbox/                ← 待处理 EPUB 放这里
   └── archive/v1/           ← 旧产物归档
   ```

2. 把你当前的 `BOOK_OVERVIEW.md`、`CHAPTER_ANALYSIS_PART1.md` 等旧文件移到 `archive/v1/`,不要删除。

3. 安装依赖:
   ```bash
   pip install ebooklib beautifulsoup4
   # 如果要处理 AZW3/MOBI,还需要 calibre
   brew install --cask calibre  # macOS
   ```

---

## 第二步:验证新流程(用一本新书)

**不要从《聪明的投资者》重新开始**——那本书有版本错配的历史包袱,先换一本干净的书验证流程。

推荐先用:**《超越恐惧与贪婪》**(你最近在处理的行为金融学书)

1. 把该书 EPUB 放到 `inbox/`
2. 运行:
   ```bash
   python scripts/ingest.py inbox/beyond-fear-and-greed.epub --slug beyond-fear-and-greed
   ```
3. 人工确认 `meta.json` 和 `ch01/raw.txt` 正确
4. 开一个新的 Claude Code session,对它说:
   > 读取 CLAUDE.md。现在按标准流程处理 beyond-fear-and-greed 这本书的 ch01。
5. 观察 P1 + P2 六问的实际产出,对比你过去的产出质量

这一步如果满意,就正式切到新架构。

---

## 第三步:重新处理《聪明的投资者》

确认新流程可用后,回到《聪明的投资者》:

1. 获取**明确的第 4 版 EPUB**(Zweig 注释版,有"安全边际"专章,20 章)
   - 若只有 PDF,先用 calibre 的 ebook-convert 转 EPUB
   - 实在没有第 4 版电子书,降级用 PDF 文字版

2. 入库时用明确的 slug:
   ```bash
   python scripts/ingest.py inbox/intelligent-investor-4ed.epub \
       --slug intelligent-investor-v4
   ```
   
   版本明确写在 slug 里,防止以后混淆。

3. 入库后**务必手动检查**:
   - 章节数是否为 20
   - 第一章是否为"投资与投机"
   - 是否有第 20 章"安全边际"
   
   任何一条不符,停止处理,先找对版本。

4. 确认版本正确后,按新流程处理。旧的 `CHAPTER_ANALYSIS_PART1.md` 可作为 ch01-ch03 的产出参考,但**不要直接迁移**——新流程的六问深度会明显超过旧分析。

---

## 第四步:建立持续处理节奏

建议节奏:
- 一次处理一本书,不要并行多本
- 每处理 3-5 本书,回看一次 `themes/` 的主题索引,看是否有归并或新增
- 每月末,让 Claude Code 生成一份"图书馆生长报告":新增书目、主题关联、发现的作者观点冲突

---

## 常见问题

**Q:六问分 6 轮执行,会不会太烧 token?**
A:比你想象的少。六问每轮输入都是精简的(extract.json + 必要的前置问答),不是每次都喂原文。实测下来,整本书的 P2 阶段比"一次做完"反而节省 token,因为不会因为一次做不好反复重来。

**Q:我不想每次都手动开新 session 做 P2 六问,有办法自动化吗?**
A:可以。在 Claude Code 里,让它按 CLAUDE.md 的流程执行,它会自动分 6 轮内部调用。只有当你担心某轮产出质量时,才切到网页版 Opus 4.7 单独跑那一问。

**Q:Sonnet 4.6 做 P1 抽取,质量够吗?**
A:够。结构化抽取是 Sonnet 的强项,成本只有 Opus 的 1/5。如果发现某些难啃的书(哲学、文学类)Sonnet 抽取质量不够,可以在该书的 meta.json 里加一个 `"model_override": "opus-4.7"` 字段,我可以再给你加条件分支。

**Q:主题索引 themes/ 是我自己维护还是 AI 维护?**
A:AI 自动维护,你做最终审核。每处理完一本书,P5 会自动更新相关主题文件。你定期看一眼,发现分类不合理时修改主题文件名或合并——AI 会在下一次更新时遵循你的新分类。

**Q:如果某本书根本不适合这套流程(比如诗集、散文集、工具书)?**
A:不用硬套。在 meta.json 里标 `"skip_six_questions": true`,跳过 P2,只做 P1 + P3 + P5。血肉层可以改用"精彩段落辑录"的形式。这个分支我暂时没写死,等你遇到具体案例时再加。

---

## 预期效果

按新架构处理完一本书后,你应该:
1. **5 分钟内**通过 `book_skeleton.md` 掌握全书骨架
2. **1 小时内**通过 `book_essence.md` 掌握全书核心内容(替代阅读原书)
3. **任何时候**通过 `themes/` 找到该书在你知识网络中的位置
4. **深度追问时**通过某章的 `insights.md` 获得六个维度的分析

这就是从"读过这本书"到"真正掌握这本书"的转化。
