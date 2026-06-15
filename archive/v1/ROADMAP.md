# ROADMAP.md
# 沉浸式深度导读 · 项目路线图与待办事项
> 创建日期: 2026-04-06
> 最后更新: 2026-04-06

---

## 当前状态

### 已完成
- [x] 引擎架构（engine.js/engine.css/components.js/template.html + build.js）
- [x] 12本书的基础data.js（但大部分内容深度不够）
- [x] 3本书有实质性custom.js交互（sapiens, thinking-fast-slow, how-to-read）
- [x] PROJECT_STATUS.md 项目审计报告
- [x] DESIGN_SPEC.md 设计规范文档
- [x] CONTENT_WORKFLOW.md 内容提取工作流
- [x] 《人类简史》Step 1-3 完成（BOOK_OVERVIEW.md + CHAPTER_ANALYSIS_PART1-4.md + SYNTHESIS.md）

### 待完成
- [ ] **《人类简史》Step 4：格式化为data.js + custom.js**（下一步）
- [ ] 《人类简史》验收与微调
- [ ] 清理遗留文件和修复数据格式问题
- [ ] 第二本标杆书（分析框架型）
- [ ] 引擎布局模式扩展
- [ ] Skill封装

---

## 阶段一：完成《人类简史》标杆（当前）

### Step 4 提示词（直接复制到Code模式使用）

> 请阅读以下文件：
> 1. DESIGN_SPEC.md（数据格式规范）
> 2. CONTENT_WORKFLOW.md（Step 4的具体要求）
> 3. src/books/sapiens/BOOK_OVERVIEW.md
> 4. src/books/sapiens/CHAPTER_ANALYSIS_PART1.md
> 5. src/books/sapiens/CHAPTER_ANALYSIS_PART2.md
> 6. src/books/sapiens/CHAPTER_ANALYSIS_PART3.md
> 7. src/books/sapiens/CHAPTER_ANALYSIS_PART4.md
> 8. src/books/sapiens/SYNTHESIS.md
> 9. 当前的 src/books/sapiens/data.js（了解现有结构）
> 10. 当前的 src/books/sapiens/custom.js（了解已有的自定义组件）
>
> 执行 CONTENT_WORKFLOW.md 中的 **Step 4: 格式化为data.js**。
>
> 基于分析性阅读的全部成果，重写 data.js 和 custom.js。具体要求见 CONTENT_WORKFLOW.md Step 4 部分。
>
> 完成后运行 node build.js 构建，并用 DESIGN_SPEC.md 第五节的10项清单逐一验证。

**模型建议：Sonnet 4.6 即可。** 这一步是结构化格式转换，不需要Opus的创造性。

### Step 4 完成后：验收

用以下清单逐项检查（打开 dist/sapiens/index.html）：

**技术验收（DESIGN_SPEC第五节）：**
- [ ] 构建成功，无错误
- [ ] Hero渲染正确
- [ ] 调色板切换流畅
- [ ] Deep Dive抽屉正常
- [ ] 术语表完整
- [ ] 知识地图/思维导图正常
- [ ] 移动端适配
- [ ] 数据格式合规
- [ ] 每场景≥3段narrative + ≥2个deepDives
- [ ] 返回书架链接正确

**内容验收（逐场景）：**
- [ ] 每个场景读完后，能用自己的话复述核心论点
- [ ] 每个场景至少有一个"啊哈"的反直觉洞察
- [ ] Deep Dive的论证链完整（前提→证据→结论），不是一句话概括
- [ ] 交互组件帮助理解了某个抽象概念（不只是好看）

**内容验收（全书）：**
- [ ] 能回答SYNTHESIS.md中10个检验问题的至少7个
- [ ] 感受到了"暗线"（每次进步的代价）
- [ ] 增值内容（AI/中国/投资视角）让我觉得"比原书多学到了东西"
- [ ] 总阅读时间在2-3小时以内

### 验收后如果不满意的反馈模板

不要说"交互不够"或"不满意"这种模糊反馈。用这个模板：

> 场景X的问题：
> - 具体哪里不对：[描述]
> - 我期望看到什么：[描述]
> - 参考：哪个已有场景的效果是我想要的

---

## 阶段二：清理与修复（Step 4验收通过后）

给Code模式的提示词：

> 请阅读 PROJECT_STATUS.md 和 DESIGN_SPEC.md。
> 按以下优先顺序执行清理工作：
> 1. 删除遗留独立HTML文件（index.html, sapiens/index.html, thinking-fast-slow/index.html, how-to-read/index.html）
> 2. 删除所有stub custom.js（只有4-6行的那些）
> 3. 修复 excellence-genes/data.js 和 competition-demystified/data.js 的数据格式
> 4. 修复 engine.css 中的重复声明和暂停的粒子动画
> 5. 更新 REQUIREMENTS.md 反映零依赖的实际状态
> 6. 重新构建全部书籍，确认无错误

---

## 阶段三：第二本标杆书（分析框架型）

### 选书建议
优先选《聪明的投资者》而非《证券分析》。理由：
- 篇幅更短（~600页 vs ~800页），框架更清晰
- 与你的投资实践直接相关
- 核心概念（安全边际、市场先生、防御型vs进取型投资者）适合做成交互模拟器

### 需要先解决的问题

**PDF质量预检（Step 0）：**
> 请打开项目目录中《聪明的投资者》的PDF，随机抽取第50页、第150页、第250页，把文字读出来给我看。

**引擎布局模式扩展：**
在 data.js 的 meta 中增加 layoutMode 字段：
- `scroll`：现有线性滚动（叙事型，默认）
- `toolkit`：左侧导航树+右侧内容面板（分析框架型）
- `hybrid`：主体滚动+嵌入工具面板（认知科学型）

**CONTENT_WORKFLOW.md 升级：**
Step 1 增加"书籍类型判定"，根据类型调整 Step 2 的提取策略：
- 叙事型：提取论证链+案例+数据（现有流程）
- 分析框架型：提取分析框架+决策树+判断标准+案例演示+公式/比率
- 方法论型：提取操作步骤+检查清单+练习题

---

## 阶段四：Skill封装（两本标杆都验收通过后）

打包以下文件为 Claude Skill：
- CONTENT_WORKFLOW.md（升级版，含类型适配和Step 0）
- DESIGN_SPEC.md
- data.js 模板（scroll型 + toolkit型 各一个）
- 阅读体验验收清单
- 引擎使用说明

封装后的使用方式：
"打开Code → 选book knowledge项目 → 告诉AI：请按照阅读引擎Skill处理《XX》这本书 → AI自动执行Step 0-4 → 你验收"

---

## 每次新开Code Session的标准开头

无论做什么任务，每次新session的第一句话：

> 请先阅读项目根目录的 ROADMAP.md、DESIGN_SPEC.md 和 PROJECT_STATUS.md，了解项目当前状态和下一步计划。然后告诉我你理解的当前任务是什么。

这确保AI每次都从正确的上下文开始，而不是从零猜测。

---

## 重要原则

1. **一次只做一件事**：不要在一个session里同时改引擎和改内容
2. **先看方案再写代码**：任何涉及引擎修改的任务，都要求AI先输出方案文档给你审批
3. **用Sonnet做执行，用Opus做创造**：格式化、清理、构建用Sonnet；内容提取、综合分析、架构设计用Opus
4. **每次改动后构建验证**：修改任何文件后都运行 node build.js 确认无错误
5. **不满意时用模板反馈**：具体到场景、具体到问题、具体到期望
