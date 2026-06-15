# DESIGN_SPEC.md
# 沉浸式深度导读 · 设计规范
> 版本: 1.0 · 基于现有代码审计生成
> 审计日期: 2026-04-06

---

## 一、视觉规范

### 1.1 配色方案 (暖色系)

项目使用"场景调色板"系统——每本书定义多个调色板，引擎在滚动时动态切换。

**核心暖色变量 (默认/Hero)**
```css
--bg:            #F5F0E8       /* 米白底色 */
--bg-secondary:  #EDE7DA       /* 稍深的辅助底色 */
--fg:            #1A1A1A       /* 正文黑 */
--fg-secondary:  #5C5546       /* 辅助灰（暖调） */
--accent:        #B8860B       /* 暗金色 · 主强调 */
--accent-dim:    rgba(184,134,11,0.12)  /* 弱强调背景 */
--accent-mid:    rgba(184,134,11,0.35)  /* 中强调 */
--accent-glow:   rgba(184,134,11,0.06)  /* 微光背景 */
--border:        rgba(0,0,0,0.06)       /* 极淡边框 */
--glass-bg:      rgba(245,240,232,0.72) /* 毛玻璃底 */
--glass-border:  rgba(255,255,255,0.3)  /* 毛玻璃边 */
--card-bg:       rgba(255,255,255,0.7)  /* 卡片底 */
--muted-fg:      #7A7062       /* 静音文字 */
```

**暗色场景变量模式**
```css
/* 暗色场景通过 PALETTES[sceneName] 切换，典型值 */
--bg:            #0E1420       /* 深蓝黑 */
--fg:            #E2DED4       /* 暖白 */
--accent:        /* 保持或微调金/绿/蓝 */
--glass-bg:      rgba(14,20,32,0.88)
```

**调色板设计规则**:
- 每本书10-12个调色板：1个hero + 若干场景调色板
- 明暗交替：通过 `darkScenes` 数组声明哪些场景为暗色
- 暗色场景的 bg 应在 `#0A-#14` 范围，fg 应在 `#D0-#E4` 范围
- 明色场景的 bg 应在 `#E8-#F5` 范围，fg 应在 `#1A-#20` 范围
- accent 色不应纯饱和——保持"老金"/"橄榄绿"/"深海蓝"的低饱和暖调
- 每个调色板必须定义全部13个变量（缺失的由 engine.js 自动回退）

**禁止的配色**:
- 纯黑底 (#000000) 或纯白底 (#FFFFFF)
- 高饱和荧光色 (如 #FF0000, #00FF00, #0000FF)
- 冷灰系 (如 #888888 无暖调) 用于正文

### 1.2 字体

```css
--serif: 'Noto Serif SC', 'Songti SC', Georgia, serif;
  /* 用于: 标题、引言、术语名、段落首字下沉 */

--sans:  'Noto Sans SC', 'Inter', system-ui, -apple-system, sans-serif;
  /* 用于: 正文、标签、按钮、导航、辅助文字 */
```

**字号系统** (使用 clamp 响应式):
| 元素 | 字号 | 字重 |
|------|------|------|
| Hero标题 | `clamp(3.5rem, 12vw, 8rem)` | 900 |
| 场景标题 | `clamp(2.4rem, 6vw, 4rem)` | 900 |
| Hero引言 | `clamp(1.5rem, 4vw, 2.6rem)` | 300 |
| 正文段落 | `1.05rem` | 400 |
| 辅助标签 | `0.55-0.65rem` | 600-700 |
| 按钮文字 | `0.72-0.75rem` | 600 |

**排版规则**:
- 正文行高: `2.1`（宽松中文阅读）
- 段落间距: `2.5rem`
- 最大内容宽度: `680px` (.scene-inner)
- 首段首字下沉: `3.5em` 字号，serif字体，accent色
- 字间距: 标签使用 `letter-spacing: 0.2-0.4em`，正文不加

### 1.3 间距系统

| 位置 | 值 |
|------|-----|
| 场景顶部内边距 | `12rem`（桌面）/ `7rem`（移动端） |
| 场景底部内边距 | `8rem`（桌面）/ `5rem`（移动端） |
| 场景标题→正文 | `6rem` |
| 段落间距 | `2.5rem` |
| 组件间距 | `3-5rem` |
| 卡片内边距 | `1.2-1.5rem` |
| 卡片圆角 | `12-16px` |

### 1.4 卡片样式

```css
/* 标准信息卡片 */
background: var(--accent-glow);
border: 1px solid var(--border);
border-radius: 12px;
padding: 1.2rem;

/* 悬浮效果 */
transition: all 0.4s var(--ease-out);
&:hover {
  border-color: var(--accent-mid);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px var(--accent-dim);
}
```

**毛玻璃效果**:
```css
background: var(--glass-bg);
backdrop-filter: blur(12-40px);
-webkit-backdrop-filter: blur(12-40px);
border: 1px solid var(--glass-border);
```

---

## 二、交互规范

### 2.1 推荐的交互模式

| 模式 | 参数标准 | 适用场景 |
|------|---------|---------|
| 滚动入场 (reveal) | `translateY(50px)`, 1s过渡, threshold 0.1 | 所有内容元素 |
| 延迟入场 | 0.15s递增 (delay-1到delay-4) | 同一组内的元素依次出现 |
| 擦入动画 (reveal-wipe) | `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)`, 1.6s | 引言/重点内容 |
| 调色板切换 | `transition: 1.4s ease-smooth`, 检测视口45%位置 | 场景间过渡 |
| 侧边抽屉 | `translateX(100%)` → `0`, 0.6s ease-out, 宽度 min(580px, 92vw) | Deep Dive详情 |
| 模糊遮罩 | `filter: blur(8px)`, 点击按钮解除 | Active Recall |
| 柱图动画 | 宽度从0到目标值, 1.5s ease-out, 300ms间隔 | 数据可视化 |
| 计数器 | 2s三次缓出, 格式化大数字 (K/M) | 大数字统计 |
| 对比切换 | 按钮组切换, 条形图重新动画 | 维度对比 |
| 折叠面板 | `<details>` 原生, 箭头旋转 90° | 扩展阅读 |

### 2.2 缓动曲线

```css
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);    /* 快入慢出, 用于大部分动画 */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);     /* 平滑, 用于调色板/滚动 */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹簧, 用于按钮/小元素 */
```

### 2.3 禁止使用的方案

| 禁止项 | 原因 |
|--------|------|
| 外部JS库 (GSAP/ECharts/jQuery) | 项目定位为零依赖, 所有动画用CSS transition + requestAnimationFrame |
| 无限滚动/懒加载 | content-visibility已处理性能, 所有内容一次性渲染 |
| 轮播/走马灯 | 线性滚动体验, 不中断阅读流 |
| 弹窗/Toast通知 | 侧边抽屉是唯一的弹出层 |
| 自动播放动画 | 所有动画由滚动触发, 不在视口外播放 |
| 粘性固定内容 (除进度条/导航) | 阅读流不应被遮挡 |
| 水平滚动 (除表格) | 移动端体验差 |
| 纯装饰动画 | 每个动画必须服务于信息传达 |

### 2.4 性能约束

- `content-visibility: auto` + `contain-intrinsic-size`: 用于所有场景 (已实现)
- `will-change`: 仅用于 hero 标题和粒子 (不滥用)
- `IntersectionObserver`: 替代 scroll 事件做元素级检测
- 滚动处理: `passive: true` + `requestAnimationFrame` 节流
- 暗色粒子: 限制20个/场景, CSS动画非JS
- 单文件HTML: 无网络请求 (除Google Fonts)

---

## 三、内容架构

### 3.1 三层信息结构

```
L1 · 全局导航层
├── Hero (书名/作者/徽章/滚动提示)
├── BookMeta (分类/场景数/部分数) [通过 shelf 配置]
└── Glossary FAB (术语表浮动按钮)

L2 · 场景叙事层 (每场景)
├── Part Divider (部分标题, 仅部分间)
├── Scene Header (编号/标题/副标题)
├── Hero Quote (核心引言)
├── Narrative (3-6段叙事, 首段首字下沉)
├── Extended Reading (折叠面板)
├── Data Viz / Interactive (可视化/交互组件)
├── Comparison (对比模块)
├── Deep Dives (论证链卡片 → 点击展开抽屉)
└── Key Takeaway (核心收获面板)

L3 · 知识固化层 (部分间/全书末尾)
├── Knowledge Map (2级径向知识地图)
├── Mind Map (3-4级树状思维导图)
├── AI Reflection (终章反思)
└── Footer (全书终/返回书架)
```

### 3.2 data.js 模板 (标准格式)

```javascript
const PALETTES = {
  hero: { bg, bgSecondary, fg, fgSecondary, accent, accentDim, accentMid, accentGlow, border, glassBg, glassBorder },
  scene1: { /* 同上 */ },
  // ... 每个场景一个调色板
};

const CONTENT_DATA = {
  meta: {
    title: '中文书名',
    titleEn: 'ENGLISH TITLE',
    subtitle: '副标题 · 作者',
    badge: '沉浸式深度导读 · ENGLISH · COMPLETE',
    author: '作者名',
    authorEn: 'Author Name',
    type: 'history|psychology|philosophy|science|economics|practical|fiction',
    shelf: {
      emoji: '📖',
      gradient: 'linear-gradient(135deg, ...)',
      description: '一句话描述',
      stats: ['X 场景', 'Y 部分', '关键词']
    },
    // === 以下为深度内容字段（L1检视阅读层输出）===
    coreThesis: '全书核心论点 (1-3段)',
    authorProblem: '作者试图解决的问题',
    bookStructure: '全书结构概述',
    readerQuestions: ['引导性问题1', '问题2', ...],
    critique: '批判性总评',
    keyTerms: [
      { term: '术语', definition: '作者的特定定义' }
    ],
    parts: [
      { number: 1, title: '部分标题', titleEn: 'PART TITLE EN', beforeScene: 'scene-1' }
    ]
  },

  darkScenes: ['scene1', 'scene4', ...],  // 声明哪些场景用暗色调色板

  scenes: [
    {
      id: 'scene-1',
      palette: 'scene1',
      title: '场景标题',
      subtitle: '场景副标题',
      titleEn: 'SCENE TITLE EN',  // 可选
      number: 1,                   // 或 '场景 01' 字符串

      // *** 注意: heroQuote 必须是字符串 ***
      heroQuote: '核心引言文本',

      keyTakeaway: '核心收获总结 (可选)',

      narrative: [
        '第一段（将获得首字下沉）...',
        '第二段...',
        '第三段...'
      ],

      // *** 注意: extendedReading 当前引擎期望字符串数组 ***
      extendedReading: [
        '背景段落1...',
        '背景段落2...'
      ],

      // 数据可视化 (需要已注册的viz类型, 或使用自定义custom.js)
      dataViz: {
        type: 'comparison-table',  // 引擎内置类型
        title: '标题',
        data: { columns: [...], rows: [...] }
      },
      // 或: dataViz: { type: 'custom-type' }  // 需在custom.js中registerViz

      // *** 注意: deepDives 必须包含 icon, title, chain ***
      deepDives: [
        {
          title: '解析标题',
          icon: '🔍',
          triggerQuestion: '主动回忆问题 (可选)',
          chain: {
            premise: '前提/假设...',
            evidence: '证据/数据...',
            conclusion: '结论...'
          }
        }
      ],

      // 对比模块 (可选)
      comparison: {
        labels: ['A组', 'B组'],
        modes: ['modeA', 'modeB'],
        triggerLabel: '对比标题',
        rows: [
          { label: '维度1', modeA: { score: 8, text: '描述' }, modeB: { score: 5, text: '描述' } }
        ]
      }
    }
  ],

  knowledgeMaps: [
    {
      afterPart: 1,  // 插入在第1部分之后
      palette: 'scene4',
      title: '知识地图标题',
      center: '中心节点文字',
      branches: [
        { title: '分支标题', leaves: ['叶子1', '叶子2'] }
      ]
    }
  ],

  mindMaps: [
    {
      afterPart: 'final',  // 或数字
      palette: 'scene10',
      title: '思维导图标题',
      subtitle: 'SUBTITLE',
      root: '根节点文字',
      branches: [
        {
          text: 'L1分支标题',
          children: [
            { text: 'L2标题', children: ['L3叶子1', 'L3叶子2'] },
            'L2纯文字叶子'
          ]
        }
      ]
    }
  ],

  aiReflection: {
    palette: 'scene10',  // *** 必须是字符串键名, 不是对象 ***
    title: 'AI 导读反思',
    paragraphs: ['段落1...', '段落2...']
  },

  footer: {
    title: '全书 · 终',
    text: '结语文字',
    note: '附注 (可选)'
  }
};
```

### 3.3 数据格式注意事项 (兼容性红线)

| 字段 | 正确格式 | 错误格式 (会导致渲染失败) |
|------|---------|------------------------|
| `heroQuote` | 纯字符串 `'引言文本'` | `{text: '...', author: '...'}` |
| `deepDives[].chain` | `{chain: {premise, evidence, conclusion}}` | 直接 `{premise, evidence, conclusion}` |
| `deepDives[].icon` | 必须存在, emoji字符串 | 缺失 |
| `deepDives[].title` | 必须存在, 字符串 | 缺失 |
| `extendedReading` | 字符串数组 `['段落1', '段落2']` | 对象数组 `[{title, author, why}]` |
| `aiReflection.palette` | 字符串键名 `'scene10'` | 对象 `{bg: '...'}` |
| `dataViz.type` | 已注册类型 或 在custom.js中注册 | 未注册类型 (静默失败) |

---

## 四、技术约束

### 4.1 统一的库和版本

| 依赖 | 版本/来源 | 加载方式 |
|------|----------|---------|
| Node.js | ≥ 18 (使用内置 fs/path) | 仅构建时 |
| Google Fonts | Noto Serif SC, Noto Sans SC, Inter | CDN link |
| 外部JS库 | **无** | - |
| CSS预处理器 | **无** (原生CSS + @layer) | - |

### 4.2 文件组织规则

```
添加新书的标准流程:
1. mkdir src/books/new-book-slug/
2. 创建 data.js (必须, 遵循模板格式)
3. 创建 custom.js (可选, 仅在需要自定义组件时)
4. node build.js
5. 检查 dist/new-book-slug/index.html

文件命名:
- 书籍目录: kebab-case (如 thinking-fast-slow)
- 调色板键: camelCase (如 scene1, scene2)
- 场景ID: kebab-case (如 scene-1, scene-2)
- CSS类名: kebab-case with BEM风格 (如 .dd-trigger-title, .km-branch-title)
```

### 4.3 构建管线

```
src/engine/template.html
  ← src/engine/engine.css      (<!-- ENGINE_CSS -->)
  ← src/engine/components.js   (<!-- COMPONENTS_JS -->)
  ← src/engine/engine.js       (<!-- ENGINE_JS -->)
  ← src/books/{slug}/data.js   (<!-- BOOK_DATA -->)
  ← src/books/{slug}/custom.js (<!-- BOOK_CUSTOM -->)
  → dist/{slug}/index.html

+ 自动生成 dist/index.html (书架首页)
```

### 4.4 部署

- GitHub Pages via Actions (`.github/workflows/deploy.yml`)
- push to main → build → upload dist/ → deploy
- 无服务端逻辑, 纯静态

---

## 五、质量检查清单 (10项必验标准)

### 新增书籍验证

- [ ] **1. 构建成功**: `node build.js` 无错误, 产出 dist/{slug}/index.html
- [ ] **2. Hero渲染**: 书名、作者、徽章正确显示, 滚动提示可见
- [ ] **3. 场景切换**: 所有场景的调色板正确切换, 明暗交替流畅
- [ ] **4. Deep Dive**: 所有卡片可点击, 抽屉打开, 前提→证据→结论完整显示
- [ ] **5. 术语表**: 浮动按钮可点击, 术语列表完整, 行内高亮有 hover 提示
- [ ] **6. 知识地图/思维导图**: 位置正确 (afterPart), 内容完整, 布局不溢出
- [ ] **7. 移动端**: 768px以下布局正常, 导航点隐藏, 触摸交互正常
- [ ] **8. 数据格式**: heroQuote为字符串, deepDives含chain/icon/title, extendedReading为字符串数组
- [ ] **9. 内容深度**: 每场景≥3段narrative, ≥2个deepDives, 至少部分场景有keyTakeaway
- [ ] **10. 返回书架**: 底部"返回书架"链接指向正确的 ../index.html

### 引擎级回归验证

- [ ] 进度条跟随滚动
- [ ] 键盘导航 (Space/↑/↓) 在所有页面正常
- [ ] ESC关闭模态
- [ ] 首字下沉在第一段正确显示
- [ ] `prefers-reduced-motion` 正确禁用动画

---

## 六、架构评估：单文件HTML vs 多文件项目

### 当前方案: 单文件HTML (每本书一个 index.html)

**优势**:
1. **极致简洁的分发**: 一个HTML文件 = 一本完整的书, 可离线阅读, 可直接发给任何人
2. **零运行时依赖**: 不需要服务器、不需要打包工具、不需要网络 (除首次加载字体)
3. **GitHub Pages完美适配**: dist/ 直接部署, 无路由问题
4. **调试直观**: 单文件意味着所有代码在一个地方, 浏览器DevTools即是全部工具
5. **构建极快**: <1秒完成所有书的构建

**劣势**:
1. **文件尺寸增长**: 最大的书已达 264KB, 随着内容加深会继续增长
2. **CSS/JS无法跨书缓存**: 每本书重复加载相同的引擎代码 (~15KB CSS + ~5KB JS)
3. **开发体验**: 修改引擎代码后需要重新构建所有书

**专业判断: 保持当前方案**

理由:
1. 264KB 在现代网络中不是问题 — 一张未压缩的照片就比这大
2. 引擎代码仅占总大小的 ~8%, 不值得为此引入多文件复杂性
3. 项目的核心价值在于内容深度, 不是前端工程效率 — 工程复杂性应该最小化
4. 单文件的"可携带性"对个人图书馆的使用场景极有价值
5. 如果未来超过 500KB/书, 可以考虑仅拆分字体为外部资源

**唯一建议的优化**: 在 build.js 中添加 HTML 压缩 (去除注释和多余空白), 可以减少 15-20% 体积而不影响任何功能。

---

## 七、待解决的优先事项 (按紧急度排序)

1. **🔴 修复 excellence-genes 数据格式** — heroQuote/deepDives/extendedReading/comparison 与引擎不兼容
2. **🔴 修复 competition-demystified 数据格式** — deepDives/extendedReading/dataViz 与引擎不兼容
3. **🟡 升级引擎以支持新格式** (推荐替代方案) — heroQuote对象、extendedReading对象、新dataViz类型
4. **🟡 删除遗留独立HTML** — 9721行废弃代码
5. **🟢 修复CSS死代码** — 重复声明、暂停的粒子动画
6. **🟢 删除stub custom.js** — 5个无用文件
7. **🟢 更新REQUIREMENTS.md** — 反映真实的零依赖实现
