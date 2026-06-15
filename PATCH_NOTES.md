# v2.1 Patch Notes

根据 Code 自检反馈修复的问题。此 patch 替换 v2.0 的对应文件。

## 覆盖文件清单

1. `CLAUDE.md`(根目录)—— 完整重写,加入:
   - 第零章:三条核心纪律(六问分六轮、A/B 基准禁区、设计/执行分离)
   - 步骤 2.5:reader_persona 配置机制
   - 步骤 4:six_q/ 落盘格式
   - 步骤 5:新增任务 C(compose_quotes.py)
   - slug 命名规范
   - "并行"改为"独立"

2. `prompts/P2_six_questions.md` —— 重写,修复:
   - Q3 输入加 raw.txt
   - Q5 改用"按 toc 顺序处理"的前置假设
   - Q6 用 reader_persona 动态拼装 prompt,支持 null 降级
   - 明确落盘到 six_q/qN.md

3. `scripts/ingest.py` —— 小幅更新:
   - meta.json 新增 reader_persona 字段(默认 null)
   - 加入 slug 格式校验
   - 报告信息更完善(提醒核对章节数、设置 reader_persona)

4. `scripts/compose_quotes.py` —— **新增脚本**:
   - 把所有章节的 quotes.md 机械拼接为 book_quotes.md
   - 不经过模型,纯文件操作

## 未改动的文件

- ARCHITECTURE.md(内容仍正确,只是第五节提到的"version_check.py"其实已合并进 ingest.py,属于文档小瑕疵,不影响执行)
- MIGRATION.md(旧的"用《超越恐惧与贪婪》小试"建议已被 CLAUDE.md 第零章纪律 2 覆盖,以 CLAUDE.md 为准)
- prompts/P1_extract.md(无问题)
- prompts/P3_skeleton.md(无问题)
- prompts/P4_essence.md(无问题)
- prompts/P5_theme_update.md(无问题)
- scripts/verify_chapter.py(无问题)

## 执行方式

解压后,把 library_v2_patch/ 下所有文件按原路径**替换/新增**到项目根目录。
- CLAUDE.md:覆盖
- prompts/P2_six_questions.md:覆盖
- scripts/ingest.py:覆盖
- scripts/compose_quotes.py:新增(原项目没有这个文件)
