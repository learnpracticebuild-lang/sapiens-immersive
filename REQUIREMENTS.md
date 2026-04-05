# 沉浸式深度导读 · 需求规格与系统规则 v3

> 本文档是通用工具开发的唯一权威基准。所有设计决策以此为准。
> 最后更新：2026-04-05

---

## 一、用户目标

### 终极愿景
打造**个人智识图书馆**——通过沉浸式交互体验，让我以超越原书的方式掌握每一本书的全部精华。

### 核心诉求（按优先级）
1. **内容完整性** —— 覆盖原书全部章节和核心论点，不遗漏
2. **体验超越性** —— 比直接读原书获得更丰富的理解和更高的价值
3. **可视化与趣味性** —— 数据可视化、动效、模拟器、互动测验，增加可读性
4. **知识留存** —— 思维导图、知识地图、自测，确保真正记住和内化
5. **审美品质** —— 电影级的视觉品质，精致的排版和动效
6. **效率与规模** —— 通用工具化，放入一本书就能高效产出沉浸式体验

### 使用流程（用户视角）
```
用户将PDF放入文件夹
    ↓
AI读取PDF，自动判断书籍类型（历史/心理学/哲学/科学...）
    ↓
AI执行"五层解读法"，逐层深度拆解：
    ├─ L1 检视：提取全书骨架（目录、主旨、术语表、场景划分）
    ├─ L2 分析：每场景重建论证链（英雄引言 + 叙事 + 深度解析）
    ├─ L3 体验：为每个核心概念设计可视化/模拟器/对比模块
    ├─ L4 批判：添加批判注释、当代关联、跨书引用
    └─ L5 固化：设计知识地图、自测问题、费曼提示
    ↓
AI根据书籍类型选择配色基调，生成 PALETTES
    ↓
渲染引擎将数据组装为完整的交互式HTML页面
    ↓
自动更新书架首页（新增卡片）
    ↓
推送GitHub Pages，用户在线体验
```

---

## 二、方法论框架：五层解读法

### 理论基础
融合以下经过验证的阅读与学习科学方法：
- **Adler四层阅读法**（基础→检视→分析→主题）—— 结构化理解的框架
- **SQ3R法**（Survey-Question-Read-Recite-Review）—— 主动阅读的操作步骤
- **Bloom认知层次**（记忆→理解→应用→分析→评价→创造）—— 理解深度的标尺
- **费曼技巧**（能否用简单的话教会别人？）—— 检验理解的试金石
- **间隔重复**（遗忘曲线 + 主动回忆）—— 长期记忆的科学基础
- **"必要难度"理论**（Robert Bjork）—— 交互测验比被动阅读更有效

### 五层解读法详解

#### L1：检视阅读层（全局扫描）
| 维度 | 说明 |
|------|------|
| **Adler对应** | 第二层"检视阅读"——快速把握全貌 |
| **目标** | 读者在10分钟内理解这本书讲了什么、结构如何 |
| **AI工作** | 分类书籍类型 → 提取目录结构 → 一句话概括主旨 → 列出关键术语表 → 确定场景划分 |
| **呈现形式** | Hero首屏（书名+作者+核心标签）、BookMeta（类型/场景数/部分数）、可选的Timeline总览 |
| **质量门控** | 一句话主旨是否精准？术语表是否覆盖核心概念？场景划分是否逻辑自洽？ |

#### L2：分析阅读层（逻辑链重建）
| 维度 | 说明 |
|------|------|
| **Adler对应** | 第三层"分析阅读"的三阶段——结构→诠释→批判 |
| **目标** | 完整还原作者的论证逻辑，让读者"与作者达成共识" |
| **AI工作** | 每场景提炼heroQuote → 用清晰逻辑重述narrative → 构建deepDives（前提→证据→结论三段式） |
| **呈现形式** | Scene（场景容器）+ HeroQuote（核心观点引言）+ Narrative（首字下沉叙事段落）+ DeepDive（可展开的解析卡片→侧边抽屉） |
| **质量门控** | 每个核心命题是否有完整论证链？术语是否按作者的定义使用？叙事是否忠实于原书逻辑？ |

**"与作者达成共识"机制**：
- AI在拆解时，识别每本书的**关键术语**（keyTerms）
- 每个术语记录**作者的特定定义**（不是日常含义）
- 在叙事中首次出现关键术语时，用视觉标记提示（加粗/高亮）
- 术语表作为全局资源，读者可随时查阅

#### L3：体验理解层（超越原书）
| 维度 | 说明 |
|------|------|
| **Bloom对应** | "应用"+"分析"层——能将概念用于新情境 |
| **目标** | 让抽象概念变成可感知、可互动的体验 |
| **AI工作** | 识别适合可视化的数据/概念 → 选择最合适的组件类型 → 设计交互逻辑和数据 |
| **呈现形式** | DataViz（SVG图表/金字塔/曲线）+ Interactive（模拟器/测验/对比切换）+ Comparison（对比模块） |
| **质量门控** | 每本书至少3个可视化 + 1个交互模块？数据是否准确？交互是否真正帮助理解？ |

**组件选择规则**（方法论如何驱动组件选型）：
```
书籍类型 → 自动推荐的体验组件
─────────────────────────────────
history     → Timeline + MapViz + PopulationCounter + ExtinctionViz
psychology  → BiasSimulator + ProbabilityTest + DecisionGame + CurveChart
philosophy  → ArgumentDiagram + TermsExercise + ThoughtExperiment
science     → CausalDiagram + ExperimentViz + DataChart
economics   → EconomicModel + CaseCompare + TrendChart
practical   → Flowchart + Checklist + SelfAssessment + ClassifyGame
fiction     → CharacterMap + NarrativeArc + ThemeWeb
```

#### L4：批判评价层（独立思考）
| 维度 | 说明 |
|------|------|
| **Adler对应** | 分析阅读第三阶段——批判性评价（规则9-15） |
| **Bloom对应** | "评价"层——做出有理有据的判断 |
| **目标** | 培养读者的批判性思维，不盲从作者 |
| **AI工作** | 用Adler四维度评估每个核心论点（无知/错误/不合逻辑/不完整）→ 标注当代关联 → 建立跨书引用 |
| **呈现形式** | CritiqueNote（批判注释卡片）+ AIReflection（终章AI反思）+ CrossRef（跨书关联标签） |
| **质量门控** | 批判是否基于Adler的四个合法维度？是否公平？是否有跨领域视角？ |

**Adler批判四维度（嵌入AI工作流）**：
1. **Uninformed**（无知）：作者是否缺乏当时不可获得的信息？
2. **Misinformed**（错误）：作者的事实断言在今天看来是否有误？
3. **Illogical**（不合逻辑）：结论是否能从前提推出？
4. **Incomplete**（不完整）：是否遗漏了重要的方面？

#### L5：知识固化层（长期记忆）
| 维度 | 说明 |
|------|------|
| **科学基础** | 遗忘曲线 + 主动回忆 + 间隔重复 + 费曼技巧 |
| **Bloom对应** | "记忆"+"创造"层——记住关键概念 + 综合形成新见解 |
| **目标** | 确保读者读完后真正记住、能复述、能应用 |
| **AI工作** | 每部分设计知识地图 → 提炼核心概念卡片 → 设计自测问题（多种形式）→ 编写费曼提示 |
| **呈现形式** | KnowledgeMap（部分间的思维导图）+ Quiz（测验）+ FeynmanPrompt（"用简单的话解释..."） |
| **质量门控** | 每个Part有知识地图？自测是否覆盖Bloom各层次？费曼提示是否指向最核心概念？ |

---

## 三、书籍分类与差异化策略

### 分类体系

分类是方法论的第一步（Adler规则一），决定了整个拆解策略：

| 类型代码 | 书籍类型 | Adler分类 | 拆解侧重 | 配色基调 | 场景数范围 |
|----------|----------|-----------|----------|----------|------------|
| `history` | 历史/人类学 | 理论-历史 | 因果链、叙事框架、文明对比 | 大地色系（金/褐/橄榄） | 12-18 |
| `psychology` | 心理学/认知 | 理论-科学 | 实验证据、认知模式、行为机制 | 冷蓝/靛蓝色系 | 10-14 |
| `philosophy` | 哲学/政治 | 理论-哲学 | 术语精确性、论证结构、思想谱系 | 深紫/暗红色系 | 8-12 |
| `science` | 自然科学 | 理论-科学 | 假说-证据链、因果机制、方法论 | 冷绿/蓝绿色系 | 10-16 |
| `economics` | 经济/商业 | 实用/理论混合 | 模型框架、案例分析、实操建议 | 深蓝/金色系 | 10-14 |
| `practical` | 方法论/实用 | 实用型 | 操作步骤、流程、适用场景 | 暖金/棕色系 | 8-12 |
| `fiction` | 文学/小说 | 想象文学 | 沉浸体验优先、主题、人物 | 书籍氛围定制 | 8-15 |

### 分类如何驱动全流程

```
分类结果
  ├─→ 拆解侧重：决定L2分析阅读重点提取什么
  ├─→ 组件选型：决定L3体验层用什么交互组件
  ├─→ 批判框架：决定L4用什么维度评价
  ├─→ 配色基调：决定PALETTES的色彩方向
  ├─→ 阅读节奏：决定场景数量和深度平衡
  └─→ 特色模块：决定该类型独有的可视化
```

### 想象文学的特殊规则（来自Adler）
- L2层不提取"命题和论证"，而是提取"主题、意象、人物弧光"
- L3层不做"实验模拟"，而是做"人物关系图、叙事时间线、主题象征网络"
- L4层不问"作者是否正确"，而是问"世界是否一致？你是否被触动？"
- DeepDive的三段式改为：设定→冲突→启示

---

## 四、AI深度拆解流程（详细版）

这是整个系统的核心——AI如何将一本书转化为沉浸式体验。

### 阶段0：输入与预处理
```
输入：用户将PDF放入根目录
处理：
  1. 读取PDF文本内容（如无法提取则依赖AI既有知识）
  2. 识别书名、作者、出版信息
  3. 提取目录结构（如有）
输出：原始文本 + 目录结构
```

### 阶段1：检视阅读（L1）—— 全局扫描
```
输入：原始文本 / AI对该书的深度知识
处理：
  1. 分类：判断书籍类型（7类之一）
     → 采用Adler规则一："这本书是教我做什么事？还是让我理解什么道理？"
     → 如果是理论型，进一步判断：历史/科学/哲学？
  2. 主旨概括：一句话说出全书核心论点（Adler规则二）
     → 测试标准：如果概括需要超过两句话，说明还没抓住核心
  3. 术语表：识别15-30个关键术语，记录作者的特定定义
     → 特别注意作者赋予日常词汇的特殊含义
  4. 结构大纲：列出全书的论证骨架（Adler规则三）
     → 不是复制目录，而是重建逻辑结构
  5. 核心问题：作者试图回答什么问题？（Adler规则四）
  6. 场景划分：将内容切分为8-18个场景
     → 每个场景对应一个完整的论证单元
     → 相关场景组织为"部分"（通常3-5个部分）
输出：BOOK_META（分类、主旨、术语表、部分划分、场景清单）
质量门控：
  □ 分类是否准确？
  □ 一句话主旨是否抓住核心？
  □ 术语表是否覆盖全部关键概念？
  □ 场景划分是否逻辑自洽、粒度适当？
```

### 阶段2：分析阅读（L2）—— 逐场景深度拆解
```
输入：场景清单 + 原始文本 + 术语表
处理（对每个场景）：
  1. 英雄引言（heroQuote）：
     → 提炼该场景最震撼/最核心的一句观点
     → 标准：读到这句话就想停下来思考
  2. 叙事段落（narrative）：
     → 用清晰的中文逻辑重述该场景的论证
     → 匹配原书作者的分析语调
     → 3-5个段落，每段聚焦一个论点
     → 首段首字下沉，增强阅读仪式感
  3. 深度解析（deepDives）：
     → 每个场景2-4个深度解析卡片
     → 每张卡片遵循"前提→证据→结论"三段式
     → 前提：作者的出发点/假设
     → 证据：支撑的数据/案例/实验/推理
     → 结论：由此得出的核心论断
  4. 关键术语标注：
     → 在叙事中标注首次出现的关键术语
     → 确保使用作者的定义（"与作者达成共识"）
输出：每个场景的 { heroQuote, narrative[], deepDives[] }
质量门控：
  □ heroQuote是否真正是最核心的观点？
  □ narrative是否完整还原论证逻辑？
  □ deepDive的前提→证据→结论链条是否严密？
  □ 术语使用是否与作者的定义一致？
```

### 阶段3：体验设计（L3）—— 可视化与交互
```
输入：每场景内容 + 书籍类型 + 组件推荐表
处理：
  1. 扫描所有场景，识别适合可视化的内容：
     → 有数据对比？ → BarChart / Comparison
     → 有时间序列？ → Timeline / Counter
     → 有流程/步骤？ → Flowchart
     → 有分类/层次？ → Pyramid / TypeCards
     → 有概率/曲线？ → CurveChart
     → 有地理分布？ → MapViz
     → 有认知偏差？ → BiasSimulator
     → 有论证结构？ → ArgumentDiagram
  2. 为每个可视化设计数据结构和交互逻辑
  3. 设计交互测验/练习：
     → 书籍分类练习（practical类）
     → 认知偏差体验（psychology类）
     → 术语理解测试（philosophy类）
     → 因果关系推理（history/science类）
  4. 确保每本书至少：3个数据可视化 + 1个交互模块
输出：每场景的 { dataViz?, interactive? }
质量门控：
  □ 可视化是否真正帮助理解（而非装饰）？
  □ 交互是否让抽象概念变得可感知？
  □ 数据是否准确？
  □ 是否考虑了移动端体验？
```

### 阶段4：批判与延伸（L4）
```
输入：完整的场景内容 + 术语表 + 书籍分类
处理：
  1. 对每个核心论点，用Adler四维度扫描：
     → 以今天的知识看，作者是否有信息缺失？
     → 事实断言是否有误？
     → 推理是否严密？
     → 分析是否遗漏了重要方面？
  2. 添加当代关联：书中观点在AI时代/当代社会的映射
  3. 建立跨书引用：与图书馆中其他书的概念交叉
  4. 设计终章AI反思：综合全书+当代视角的深度思考
输出：critique字段（可选） + aiReflection + crossReferences
质量门控：
  □ 批判是否基于Adler四维度（而非主观好恶）？
  □ 当代关联是否有洞察力？
  □ 跨书引用是否真正有关联价值？
```

### 阶段5：知识固化设计（L5）
```
输入：全部场景 + 部分划分
处理：
  1. 每个Part后设计知识地图：
     → 中心节点 = 该部分的核心概念
     → 3-4个分支 = 子主题
     → 每分支3-5个要点
  2. 设计自测问题（覆盖Bloom各层次）：
     → 记忆层：关键事实回忆
     → 理解层：用自己的话复述
     → 应用层：应用到新场景
     → 分析层：拆解论证结构
     → 评价层：判断论证强弱
     → 创造层：综合形成新见解
  3. 编写费曼提示：选取最核心的3-5个概念
输出：knowledgeMaps[] + 自测数据 + feynmanPrompts
质量门控：
  □ 知识地图是否准确概括了该部分的知识结构？
  □ 自测问题是否覆盖了Bloom的多个层次？
```

### 阶段6：视觉设计
```
输入：书籍类型 + 场景数量 + 情感基调
处理：
  1. 根据类型选择配色方向（见分类表）
  2. 为每个场景设计调色板（10个CSS变量 × N个场景）
  3. 明暗场景交替：关键/戏剧性场景用深色调
  4. 确保所有颜色满足WCAG对比度标准
输出：PALETTES对象
```

### 阶段7：组装与部署
```
输入：BOOK_META + PALETTES + CONTENT_DATA + 引擎代码
处理：
  1. 引擎加载书籍数据
  2. renderApp() 根据数据生成完整页面
  3. 初始化所有交互组件
  4. 更新书架首页（添加新书卡片）
  5. 推送GitHub Pages
输出：/book-slug/index.html + 更新后的书架首页
```

---

## 五、技术架构

### 5.1 架构选型分析

从已完成的3本书中发现的问题：
- 每本书 1870-4000 行代码，其中 **~90%是重复的引擎代码**
- 修复一个引擎bug需要改3个文件
- 新增一个通用组件需要复制到所有书中
- 没有代码复用，维护成本线性增长

**三个候选方案对比**：

| 维度 | A: 单文件自包含（现状） | B: 运行时共享引擎 | C: 构建时合并 |
|------|----------------------|------------------|-------------|
| 每本书代码量 | 1870-4000行 | **200-600行（仅数据）** | 1870-4000行（输出） |
| 修复引擎bug | 改N个文件 | **改1个文件，全部生效** | 改1个文件，重新构建N本 |
| 新增组件 | 复制到N本 | **加1个文件，全部可用** | 加1个文件，重新构建N本 |
| 离线可用 | ✅ | ❌（需同源加载） | ✅ |
| GitHub Pages | ✅ | ✅ | ✅ |
| 需要构建步骤 | ❌ | ❌ | ✅（需要Node.js） |
| 首次加载速度 | 较慢（大文件） | **快（引擎缓存后秒开）** | 较慢（大文件） |
| 开发效率 | 低 | **最高** | 中 |

**选定方案：C（构建时合并）+ 开发时B模式**

核心思路：**源码分离，产物合并**
- 开发时：engine/ 目录包含共享引擎代码，每本书只写数据文件（方案B的开发体验）
- 部署时：GitHub Action 运行一个简单的构建脚本，将引擎+数据合并为单文件HTML（方案A的输出质量）
- 构建脚本极其简单：~30行 Node.js，读模板 → 注入CSS → 注入JS → 注入书籍数据 → 输出HTML
- 无需 npm install，无需 webpack/vite，纯 Node.js 内置 API

理由：
1. **最佳维护性**：源码分离，改一次引擎自动重建所有书
2. **最佳性能**：输出仍是单文件HTML，零运行时网络请求
3. **离线可用**：单文件可独立打开，不依赖网络
4. **零工具链依赖**：构建脚本用 Node.js 内置 fs 模块即可
5. **GitHub Actions自动化**：push → 构建 → 部署，全自动

### 5.2 目标文件结构

```
book-knowledge/
├── index.html                      # 书架首页（直接部署，不需构建）
├── build.js                        # 构建脚本（~30行Node.js）
├── src/                            # 源码目录
│   ├── engine/                     # 共享渲染引擎
│   │   ├── template.html           # HTML骨架模板
│   │   ├── engine.css              # 完整样式系统
│   │   ├── engine.js               # 核心引擎
│   │   └── components.js           # 组件库
│   └── books/                      # 每本书的源数据
│       ├── sapiens/
│       │   ├── data.js             # PALETTES + CONTENT_DATA
│       │   └── custom.js           # 该书独有的交互组件（可选）
│       ├── thinking-fast-slow/
│       │   ├── data.js
│       │   └── custom.js
│       └── how-to-read/
│           └── data.js
├── dist/                           # 构建输出（部署到GitHub Pages）
│   ├── sapiens/index.html          # 单文件HTML（构建合并产物）
│   ├── thinking-fast-slow/index.html
│   └── how-to-read/index.html
├── METHODOLOGY.md
├── REQUIREMENTS.md
├── .github/workflows/deploy.yml    # push → build → deploy
└── *.pdf                           # 源PDF（.gitignore）
```

### 5.3 构建流程

```
build.js 工作原理（~30行 Node.js，零依赖）：

1. 读取 src/engine/template.html（HTML骨架，含占位符）
2. 读取 src/engine/engine.css → 注入到 <style>占位符
3. 读取 src/engine/engine.js → 注入到 <script>占位符
4. 读取 src/engine/components.js → 追加注入
5. 遍历 src/books/ 每个子目录：
   a. 读取 data.js（PALETTES + CONTENT_DATA）→ 注入到数据占位符
   b. 读取 custom.js（如果存在）→ 追加注入
   c. 替换模板中的标题等元信息
   d. 写出到 dist/{book-slug}/index.html
6. 完成

触发方式：
  - 本地：node build.js
  - 自动：GitHub Actions 在 push 时自动运行
```

### 5.4 每本书的源文件结构（开发时）

```javascript
// src/books/sapiens/data.js —— 这是开发者唯一需要编写的文件

const PALETTES = {
  scene1: { bg:'#FAF7F2', fg:'#2C2418', accent:'#8B6914', ... },
  scene2: { ... },
  // ...
};

const CONTENT_DATA = {
  meta: { title:'人类简史', type:'history', ... },
  scenes: [ ... ],
  knowledgeMaps: [ ... ],
  aiReflection: { ... }
};
```

```javascript
// src/books/sapiens/custom.js —— 仅当需要独有交互组件时才写（可选）

const CUSTOM_COMPONENTS = {
  'population-counter': {
    render: function(config) { return '<div class="pop-counter">...</div>'; },
    init: function() { /* 初始化动画逻辑 */ }
  },
  'wheat-map': {
    render: function(config) { return '<div class="wheat-map">...</div>'; },
    init: function() { /* 初始化地图刷控 */ }
  }
};
```

**每本书的开发代码量：从 ~4000行 降至 ~200-600行（仅数据+自定义组件）**
**构建输出仍是完整的单文件HTML（~4000行），保持零运行时依赖**

### 5.4 engine.js 核心模块

```
engine.js 职责：
├── applyPalette(name)        # CSS变量切换
├── renderApp()               # 主渲染函数（读取CONTENT_DATA生成HTML）
├── initScrollSystem()        # 三层Observer + 进度条 + 导航点
├── initKeyboard()            # 键盘导航（Space/Arrow/Escape）
├── initParticles()           # 浮动粒子
├── openDeepDive(sceneId, i)  # 侧边抽屉Modal
├── closeModal()              # 关闭Modal
└── init()                    # 入口函数（DOMContentLoaded时调用）
```

### 5.5 components.js 组件注册机制

```javascript
// 组件注册表
const COMPONENT_REGISTRY = {
  // 数据可视化类
  'bar-chart':    { render: renderBarChart,    init: null },
  'curve-chart':  { render: renderCurveChart,  init: null },
  'pyramid':      { render: renderPyramid,     init: initPyramid },
  'timeline':     { render: renderTimeline,    init: initTimeline },
  'flowchart':    { render: renderFlowchart,   init: null },
  'rules-grid':   { render: renderRulesGrid,   init: null },
  'type-cards':   { render: renderTypeCards,    init: null },
  'map':          { render: renderMap,         init: initMap },
  'counter':      { render: renderCounter,     init: initCounter },

  // 交互类
  'quiz':         { render: renderQuiz,        init: initQuiz },
  'comparison':   { render: renderComparison,  init: initComparison },
  'assessment':   { render: renderAssessment,  init: initAssessment },
  'classify':     { render: renderClassify,    init: initClassify },
  'terms':        { render: renderTerms,       init: initTerms },
  'bias-sim':     { render: renderBiasSim,     init: initBiasSim },
  'coin-flip':    { render: renderCoinFlip,    init: initCoinFlip },

  // 结构类
  'knowledge-map':{ render: renderKnowledgeMap,init: null }
};

// 自定义组件注入
if (window.CUSTOM_COMPONENTS) {
  Object.entries(CUSTOM_COMPONENTS).forEach(([name, handler]) => {
    COMPONENT_REGISTRY[name] = { render: handler, init: null };
  });
}
```

### 5.6 CSS变量系统（12个核心变量）
```css
:root {
  --bg: #FAF7F2;           /* 背景色 */
  --fg: #2C2418;           /* 前景/文字色 */
  --accent: #8B6914;       /* 强调色（主色） */
  --accentDim: #B8960E;    /* 强调色（淡） */
  --accentMid: #D4A017;    /* 强调色（中） */
  --accentGlow: rgba(...); /* 强调色（辉光） */
  --border: rgba(...);     /* 边框色 */
  --glassBg: rgba(...);    /* 毛玻璃背景 */
  --cardBg: rgba(...);     /* 卡片背景 */
  --mutedFg: #7A7062;      /* 弱化文字色 */
  --serif: 'Noto Serif SC', serif;
  --sans: 'Noto Sans SC', sans-serif;
}
```

### 5.7 现代 CSS/JS 技术采纳决策

| 技术 | 浏览器支持 | 决策 | 理由 |
|------|-----------|------|------|
| CSS `@layer` | Chrome 99+, Safari 15.4+, Firefox 97+ ✅ | **采纳** | 零成本组织CSS层级，防止选择器优先级冲突 |
| CSS Container Queries | Chrome 105+, Safari 16+, Firefox 110+ ✅ | **采纳** | 组件自适应容器宽度（而非视口），对Modal内组件特别有用 |
| `content-visibility: auto` | Chrome 85+, Firefox 125+, Safari❌ | **渐进增强** | 跳过离屏场景的渲染，移动端最大性能提升 |
| View Transitions API | Chrome 111+, Safari 18+, Firefox 132+ | **渐进增强** | 场景切换时平滑过渡，fallback为当前CSS transition |
| CSS scroll-driven animations | Chrome 115+, Safari❌, Firefox❌ | **不采纳** | Safari不支持且无时间表，IntersectionObserver已满足需求 |
| Web Components | 全支持 ✅ | **暂不采纳** | 增加复杂度，当前组件注册表机制已够用，未来可按需引入 |

### 5.8 移动端性能优化（必须实施）

当前3本书存在的性能问题及修复方案：

| 问题 | 影响 | 修复方案 | 优先级 |
|------|------|----------|--------|
| 离屏场景仍然渲染 | 大量无用Paint | 给`.scene`加`content-visibility:auto; contain-intrinsic-size:auto 100vh;` | P0 |
| 粒子动画持续运行 | GPU持续占用 | 默认`animation-play-state:paused`，IntersectionObserver进入视口才`running` | P0 |
| 8+个IntersectionObserver | 多余的观察任务 | 合并为2-3个Observer（reveal / palette / component-init） | P1 |
| `background-color`过渡触发全页重绘 | 每次换场景全页repaint | 改用固定伪元素的`opacity`过渡（GPU合成层，不触发重绘） | P1 |
| Google Fonts加载3族13+权重 | 中文字体5-10MB+ | 精简为实际使用的权重，加`font-display:swap` | P2 |

---

## 六、CONTENT_DATA 标准 Schema（v3）

```javascript
const CONTENT_DATA = {
  meta: {
    title: '书名',
    titleEn: 'English Title',
    author: '作者',
    authorEn: 'Author Name',
    type: 'history|psychology|philosophy|science|economics|practical|fiction',
    coreThesis: '一句话概括全书核心论点',
    keyTerms: [
      { term: '虚构', definition: '指人类集体想象出的概念（国家、货币、法律），它们不存在于客观现实中，但因为所有人都相信它，所以拥有了真实的力量。' }
    ],
    parts: [
      { number: 1, title: '部分标题', titleEn: 'Part Title', beforeScene: 'scene-1' }
    ]
  },

  scenes: [
    {
      // ── 必填字段 ──
      id: 'scene-1',
      number: '01',
      part: 1,
      palette: 'scene1',
      title: '场景标题',
      subtitle: '副标题',

      // L1: 检视
      heroQuote: '最震撼的核心观点',

      // L2: 分析
      narrative: ['段落1', '段落2', '段落3'],
      deepDives: [{
        title: '解析标题',
        icon: '🔬',
        chain: {
          premise: '前提/出发点',
          evidence: '证据/数据/推理',
          conclusion: '结论/论断'
        }
      }],

      // L3: 体验（可选）
      dataViz: {
        type: 'bar|curve|pyramid|flowchart|rules|timeline|map|type-cards|counter|custom',
        title: '可视化标题',
        subtitle: '副标题',
        data: { /* 类型特定数据 */ }
      },
      interactive: {
        type: 'quiz|comparison|assessment|classify|terms|bias-sim|coin-flip|custom',
        title: '模块标题',
        config: { /* 类型特定配置 */ }
      },

      // L4: 批判（可选）
      critique: {
        dimensions: [
          { type: 'uninformed|misinformed|illogical|incomplete', note: '具体说明' }
        ],
        modernRelevance: '当代关联'
      },

      // L5: 固化（可选）
      keyTakeaway: '一句话核心收获',
      feynmanPrompt: '试着用简单的话解释这个概念：...'
    }
  ],

  knowledgeMaps: [
    {
      afterPart: 1,  // 在第几部分之后显示
      title: '知识地图标题',
      centerNode: '中心概念',
      branches: [
        { title: '分支标题', items: ['要点1', '要点2', '要点3'] }
      ]
    }
  ],

  aiReflection: {
    title: '终章标题',
    subtitle: '副标题',
    paragraphs: ['段落1', '段落2']
  },

  crossReferences: [
    { concept: '概念名', bookSlug: 'sapiens', sceneId: 'scene-5', note: '关联说明' }
  ]
};
```

---

## 七、质量标准

### 内容完整性
- [ ] 全部章节/核心论点已覆盖，零遗漏
- [ ] 关键术语已识别并定义（"与作者达成共识"）
- [ ] 每个核心命题有完整的论证链重建（前提→证据→结论）
- [ ] 数据和事实已交叉验证

### 理解深度（Bloom六层检验）
- [ ] 记忆层：读者能回忆关键事实和概念（知识地图）
- [ ] 理解层：读者能用自己的话复述（叙事段落的清晰重述）
- [ ] 应用层：读者能将概念应用到新场景（模拟器/练习）
- [ ] 分析层：读者能拆解论证结构（深度解析卡片）
- [ ] 评价层：读者能判断论证强弱（批判注释）
- [ ] 创造层：读者能综合形成新见解（AI反思/跨书关联）

### 体验丰富度
- [ ] 至少 3 个数据可视化
- [ ] 至少 1 个交互模拟器/测验
- [ ] 每个部分（Part）有 1 张知识地图
- [ ] 有跨时代/跨领域的关联思考（AI反思终章）
- [ ] 深度解析卡片覆盖所有核心概念（每场景2-4个）

### 技术质量
- [ ] 滚动动画流畅（60fps）
- [ ] 移动端完全适配（@media < 640px）
- [ ] 无重复/冗余模块
- [ ] 首屏加载 < 3秒（引擎缓存后 < 1秒）
- [ ] 所有交互模块可正常使用
- [ ] 导航系统（进度条、导航点、键盘）正常工作

---

## 八、当前资产清单

### 已完成书籍（3本，待迁移到新架构）
| 书名 | Slug | 场景数 | 特色组件 | 当前行数 | 迁移后预计 |
|------|------|--------|----------|----------|------------|
| 人类简史 | `sapiens` | 18 | 时间轴、人口计数器、灭绝可视化、小麦地图 | ~4000 | ~600 |
| 思考，快与慢 | `thinking-fast-slow` | 12 | 5个认知偏差模拟器、损失厌恶曲线 | ~3500 | ~500 |
| 如何阅读一本书 | `how-to-read` | 11 | 金字塔、15规则图、分类游戏、术语练习 | ~1870 | ~400 |

### 待制作书籍（已有PDF）
| 书名 | 预计类型 | 预计特色组件 |
|------|----------|-------------|
| 枪炮、病菌与钢铁 | `history` | 地理因果图、粮食驯化地图、技术传播动画 |
| 常识（托马斯·潘恩） | `philosophy` | 论证解剖图、修辞分析、历史语境对照 |

### 基础设施
- ✅ 书架首页 `index.html`
- ✅ GitHub Actions 部署 `.github/workflows/deploy.yml`
- ✅ 方法论文档 `METHODOLOGY.md`
- ✅ 需求文档 `REQUIREMENTS.md`

---

## 九、开发计划

### Phase 1: 构建共享引擎 + 构建系统
1. 从3本书中提取共通CSS → `src/engine/engine.css`（含@layer、content-visibility等现代优化）
2. 从3本书中提取共通JS → `src/engine/engine.js`（合并Observer、优化粒子、palette过渡优化）
3. 将所有可复用组件整理为注册表 → `src/engine/components.js`
4. 编写HTML模板 → `src/engine/template.html`
5. 编写构建脚本 → `build.js`（~30行Node.js）
6. 更新GitHub Actions → push时自动构建+部署

### Phase 2: 迁移已有书籍到新架构
7. 将《如何阅读一本书》迁移（最简单，用来验证引擎）
8. 将《人类简史》迁移（最多自定义组件，验证custom.js机制）
9. 将《思考，快与慢》迁移（最多交互模拟器）
10. 全量回归测试：所有交互功能正常、移动端性能达标

### Phase 3: 用新架构制作新书（验证生产效率）
11. 制作《枪炮、病菌与钢铁》—— 此时只需编写 data.js + custom.js
12. 制作《常识》

### Phase 4: 持续优化
13. 根据制作经验完善组件库
14. 书架首页动态化（自动读取dist/子目录生成卡片）
15. 跨书关联功能（crossReferences渲染）
16. 性能监控（Lighthouse CI集成到GitHub Actions）
