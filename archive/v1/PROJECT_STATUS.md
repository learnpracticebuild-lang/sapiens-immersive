# PROJECT_STATUS.md
# 沉浸式深度导读 · 项目审计报告
> 审计日期: 2026-04-06

---

## 一、项目目录树

```
book knowledge/
├── .claude/
│   ├── launch.json              # 预览服务器配置 (port 3456)
│   ├── settings.json            # Claude Code 项目设置
│   └── settings.local.json      # 本地设置
├── .github/
│   └── workflows/deploy.yml     # GitHub Pages 自动部署
├── src/
│   ├── engine/                  # 🔧 核心引擎 (共享)
│   │   ├── template.html        #   50 行 · HTML壳模板
│   │   ├── engine.css           # 1537 行 · 7层CSS (@layer)
│   │   ├── components.js        #  302 行 · 组件注册/插件/共享渲染器
│   │   └── engine.js            #  582 行 · 渲染引擎/滚动/模态/键盘导航
│   └── books/                   # 📚 书籍数据
│       ├── sapiens/             #   data.js (1084行) + custom.js (1265行)
│       ├── thinking-fast-slow/  #   data.js (711行)  + custom.js (1307行)
│       ├── how-to-read/         #   data.js (689行)  + custom.js (967行)
│       ├── security-analysis/   #   data.js (1133行) + custom.js (6行, stub)
│       ├── intelligent-investor/#   data.js (856行)  · 无custom.js
│       ├── guns-germs-steel/    #   data.js (746行)  + custom.js (6行, stub)
│       ├── antifragile/         #   data.js (710行)  · 无custom.js
│       ├── beginning-of-infinity/#  data.js (569行)  + custom.js (4行, stub)
│       ├── beyond-greed-fear/   #   data.js (558行)  + custom.js (6行, stub)
│       ├── common-sense/        #   data.js (498行)  + custom.js (6行, stub)
│       ├── competition-demystified/# data.js (514行) · 无custom.js [新增]
│       └── excellence-genes/    #   data.js (704行)  · 无custom.js [新增]
├── dist/                        # 构建输出 (11本书 + 书架首页)
├── build.js                     #  445 行 · 零依赖构建脚本
├── REQUIREMENTS.md              #  864 行 · 需求规格与系统规则 v3
├── METHODOLOGY.md               #  294 行 · 方法论文档
├── index.html                   #  364 行 · [遗留] 旧版书架首页
├── sapiens/index.html           # 3989 行 · [遗留] 独立版人类简史
├── thinking-fast-slow/index.html# 3497 行 · [遗留] 独立版思考快与慢
├── how-to-read/index.html       # 1871 行 · [遗留] 独立版如何阅读
└── *.pdf / *.mobi / *.zip       # 源书文件 (非代码)
```

---

## 二、书籍页面详细审计

### 构建产出概览

| 书名 | 构建大小 | data.js行数 | custom.js行数 | 技术栈 |
|------|---------|------------|-------------|--------|
| sapiens | 259 KB | 1084 | 1265 | 纯引擎 + 自定义组件(Dunbar可视化, 时间线探索器, SVG金字塔) |
| thinking-fast-slow | 229 KB | 711 | 1307 | 纯引擎 + 自定义组件(认知偏差模拟器, 概率测试, 锚定效应) |
| how-to-read | 186 KB | 689 | 967 | 纯引擎 + 自定义组件(SVG金字塔, 15规则网格, 分类游戏) |
| security-analysis | 264 KB | 1133 | 6(stub) | 纯引擎 |
| intelligent-investor | 218 KB | 856 | 无 | 纯引擎 |
| guns-germs-steel | 166 KB | 746 | 6(stub) | 纯引擎 |
| antifragile | 169 KB | 710 | 无 | 纯引擎 |
| beginning-of-infinity | 156 KB | 569 | 4(stub) | 纯引擎 |
| beyond-greed-fear | 150 KB | 558 | 6(stub) | 纯引擎 |
| common-sense | 134 KB | 498 | 6(stub) | 纯引擎 |
| competition-demystified | 152 KB | 514 | 无 | 纯引擎 |
| excellence-genes | 未构建 | 704 | 无 | 纯引擎 |

### 已实现的交互清单 (引擎级)

| 交互 | 类型 | 实现位置 |
|------|------|---------|
| 滚动进入动画 (reveal/reveal-wipe) | IntersectionObserver | engine.js |
| 调色板切换 (13色变量) | scroll + RAF | engine.js |
| 键盘导航 (Space/↑/↓) | keydown | engine.js |
| 进度条 (顶部) | scroll | engine.js |
| 场景导航点 (右侧) | scroll | engine.js |
| Hero视差 | scroll | engine.js |
| Deep Dive 侧边抽屉 | click → modal | engine.js |
| Active Recall (模糊遮罩) | click | engine.js |
| 对比切换模块 | toggle buttons | components.js |
| SVG柱图/条形图动画 | IntersectionObserver | components.js |
| 计数器动画 | IntersectionObserver | components.js |
| 术语表浮动按钮/抽屉 | click → modal | engine.js |
| 术语行内高亮 (hover提示) | CSS + title attr | engine.js |
| 知识地图 (2级径向) | 静态HTML | components.js |
| 思维导图 (3-4级树状) | 静态HTML | components.js |
| 对比表格 | 静态HTML | components.js |
| 暗色场景粒子 | CSS动画 | engine.css |
| 星空背景 | CSS动画 | engine.css |
| 核心收获面板 | 静态HTML | engine.js |
| 扩展阅读折叠面板 | \<details\> | engine.js |

### 书籍级自定义交互

| 书名 | 自定义组件 |
|------|-----------|
| sapiens | Dunbar圈层可视化、时间线探索器、人口增长SVG、灭绝物种网格 |
| thinking-fast-slow | 锚定效应模拟器、概率测试、琳达问题测验、损失厌恶计算器、系统1/2任务模拟器 |
| how-to-read | 四层金字塔SVG(可点击)、15规则卡片网格、分类判断游戏、阅读层级进度跟踪 |

---

## 三、代码层面发现的问题清单

### 🔴 Critical (影响功能)

1. **excellence-genes数据格式不兼容**
   - `heroQuote` 使用 `{text, author, source}` 对象格式，但引擎 `engine.js` 第132-137行期望的是纯字符串。渲染时会显示 `[object Object]` 而非引用文本。
   - `deepDives` 使用直接 `{premise, evidence, conclusion}` 而非 `{chain: {premise, evidence, conclusion}}`，且缺少 `icon` 和 `title` 字段。引擎 `engine.js` 第199-213行寻找 `dd.icon`、`dd.title`、`dd.chain.premise` — 会导致渲染崩溃或空白。
   - `extendedReading` 使用 `[{title, author, why}]` 对象数组，但引擎期望纯字符串数组（第163-169行直接用 `<p>${p}</p>` 渲染）。会显示 `[object Object]`。
   - `comparison` 数据结构（Scene 10）使用 `{headers, rows}` 矩阵格式，但引擎的 `renderComparison()` 期望的是 `{rows: [{label, mode1: {score, text}, mode2: {score, text}}]}` 格式。

2. **competition-demystified同样存在部分格式问题**
   - `extendedReading` 使用对象数组格式，与引擎的纯字符串期望不匹配。
   - `dataViz` 使用 `{type: 'comparison', rows}` 和 `{type: 'bar'}` 格式，但引擎没有注册这些viz类型（只注册了 `comparison-table`）。这些数据可视化不会渲染。
   - `deepDives` 使用直接 `{premise, evidence, conclusion}` 而非 `{chain: {premise, evidence, conclusion}}`，且缺少 `icon` 和 `title` 字段。

3. **intelligent-investor同样存在 extendedReading/dataViz/keyTakeaway 格式问题**
   - 这些是后期添加的功能，数据格式与引擎渲染逻辑不匹配。

### 🟡 Warning (质量/一致性)

4. **遗留独立HTML文件未清理**
   - `index.html` (364行)、`sapiens/index.html` (3989行)、`thinking-fast-slow/index.html` (3497行)、`how-to-read/index.html` (1871行) 是迁移到引擎架构前的遗留文件，总计 9721 行无用代码。
   - 可能导致混淆：根目录 `index.html` 与 `dist/index.html` (自动生成的书架) 功能重复。

5. **custom.js stub文件无意义**
   - 5本书有仅 4-6 行的 custom.js，内容只是 `// No custom components` 或空的变量声明。build.js 已处理了缺失 custom.js 的情况（第46-48行），这些 stub 文件完全多余。

6. **数据格式跨书不一致**
   - `heroQuote`: 11本用字符串，1本 (excellence-genes) 用对象。
   - `deepDives`: 10本用 `chain: {premise, evidence, conclusion}`，2本 (competition-demystified, excellence-genes) 直接用 `{premise, evidence, conclusion}`。
   - `extendedReading`: 早期书用字符串数组，新书用 `{title, author, why}` 对象数组。
   - `footer`: 早期书用 `{title, text, note}`，新书 (excellence-genes) 用 `{original: {title, author, year}, disclaimer}`。
   - `dataViz`: sapiens 用 `{type: 'dunbar'}` 等自定义类型（有注册handler），新书用 `{type: 'bar'}`, `{type: 'comparison'}` 等未注册类型。

7. **CSS 中存在重复声明**
   - engine.css 第88-103行 `.progress-bar` 被声明了两次（第二次用 `!important` 覆盖第一次）
   - engine.css 第393-404行 `.narrative p strong, .narrative p b` 被声明了两次

8. **暗色粒子动画永远暂停**
   - engine.css 第1412行 `animation-play-state: paused;`，但代码中没有任何地方将其设为 `running`。粒子永远不会动。

### 🟢 Info (改进建议)

9. **REQUIREMENTS.md 中提到的功能尚未实现**
   - CDN加载 GSAP/ECharts/Canvas → 实际为零依赖纯CSS/JS
   - 间隔重复复习模式 → 未实现
   - 费曼提示 → 未实现
   - 分类判断自动化 → 手动在 data.js 中设置 type
   - 输入方式A/B/C的自动化流程 → 未实现

10. **build.js 的元数据提取使用脆弱的正则**
    - 第51-54行用 `match(new RegExp(...))` 提取 title/author 等，只能匹配单引号包裹的值，遇到包含单引号的内容会失败。description 字段如果包含单引号也会截断。

---

## 四、最好的部分 (值得保留)

### 1. 引擎架构设计 (⭐⭐⭐⭐⭐)
`src/engine/` 的四文件架构是项目最大的资产：
- `template.html` 极简壳（50行），只负责占位和加载顺序
- `components.js` 提供了完整的插件系统（registerViz/registerPlugin/registerHook/registerInit），使书籍可以注入自定义组件而不修改引擎代码
- `engine.js` 统一处理所有共享逻辑（调色板切换、滚动、模态、键盘导航）
- `engine.css` 使用 @layer 分层（base/layout/components/interactive/animation/book-custom/utilities），避免了优先级混乱
- `build.js` 零依赖构建，将引擎+数据合成单文件HTML，简洁可靠

**为什么好**: 这个架构实现了"引擎不动，数据驱动"的目标——添加新书只需创建 data.js，无需触碰引擎代码。

### 2. 调色板系统 (⭐⭐⭐⭐⭐)
13个CSS变量的统一色彩系统，配合滚动时的动态切换，实现了"每个场景都有独立氛围但视觉语言一致"的效果。明暗场景切换流畅（1.4s过渡），暗色场景的粒子和星空增加了沉浸感。

### 3. Deep Dive 侧边抽屉 + Active Recall (⭐⭐⭐⭐)
"前提→证据→结论"的论证链展示非常贴合Adler方法论，模糊遮罩的主动回忆机制是真正有教学价值的交互设计。

### 4. 书架首页自动生成 (⭐⭐⭐⭐)
build.js 从各书的 meta.shelf 配置自动生成美观的书架首页，新增书籍零配置。

### 5. sapiens/thinking-fast-slow 的自定义组件 (⭐⭐⭐⭐)
Dunbar圈层、认知偏差模拟器等组件真正做到了"让抽象概念可触摸"。这些组件通过 registerViz 注入，不污染引擎，是插件系统的最佳实践。

---

## 五、最差的部分 (应该放弃或重构)

### 1. 遗留独立HTML (立即删除)
`index.html`、`sapiens/index.html`、`thinking-fast-slow/index.html`、`how-to-read/index.html` 共计 9721 行无用代码。它们是迁移前的遗物，现在 dist/ 中有引擎构建的版本。保留它们只会造成混淆（"到底该看哪个版本？"）。

### 2. 数据格式的分裂 (必须统一)
新书 (competition-demystified, excellence-genes, 部分 intelligent-investor 功能) 使用了与引擎不兼容的数据格式。这意味着它们的 deepDives、heroQuote、extendedReading、dataViz 不会正确渲染。这是"内容丰富但无法显示"的严重问题。需要二选一：
- **方案A**: 修改新书数据 → 适配现有引擎
- **方案B**: 升级引擎 → 支持新格式（推荐，因为新格式更丰富）

### 3. stub custom.js 文件 (删除)
5个只有 4-6 行的 custom.js 文件没有任何功能，应该删除。build.js 已经处理了缺失的情况。

### 4. CSS 重复声明和死代码 (清理)
两处重复声明和一处永远暂停的动画是代码迭代残留，应清理。

### 5. REQUIREMENTS.md 与实际实现的脱节 (更新文档)
文档承诺了 GSAP/ECharts/Canvas CDN加载、间隔重复复习、费曼提示等功能，但实际项目是零外部依赖的纯CSS/JS实现。文档需要更新以反映真实状态，避免误导新 session 的 AI。

---

## 六、关键数据统计

| 指标 | 数值 |
|------|------|
| 引擎代码总行数 | 2,471 (template+css+components+engine) |
| 书籍数据总行数 | 8,772 (12本书的data.js) |
| 自定义组件总行数 | 3,539 (3本书有实质自定义) |
| 构建脚本行数 | 445 |
| 构建产出总大小 | ~2.2 MB (11本书 + 书架) |
| 遗留废弃代码行数 | 9,721 (4个独立HTML) |
| 外部依赖 | 0 (Google Fonts除外) |
| 构建时间 | <1秒 |
