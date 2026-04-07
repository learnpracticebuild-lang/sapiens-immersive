# 沉浸式深度导读引擎 · 使用说明
> 提取自 PROJECT_STATUS.md + DESIGN_SPEC.md
> 面向新书创作者：理解引擎工作原理后，才能正确填写data.js

---

## 一、引擎架构总览

### 文件组织

```
book knowledge/
├── src/
│   ├── engine/                    # 核心引擎（共享，不要修改）
│   │   ├── template.html          # HTML壳模板（50行）
│   │   ├── engine.css             # 样式系统（7层@layer）
│   │   ├── components.js          # 组件注册/插件/共享渲染器
│   │   └── engine.js              # 渲染引擎/滚动/模态/键盘导航
│   └── books/
│       └── [book-slug]/           # 每本书一个目录（kebab-case命名）
│           ├── data.js            # 书籍数据（必须）
│           └── custom.js          # 自定义组件（可选）
├── dist/
│   ├── index.html                 # 书架首页（自动生成，不要手动编辑）
│   └── [book-slug]/
│       └── index.html             # 构建产出（不要手动编辑）
└── build.js                       # 构建脚本（零依赖Node.js）
```

### 构建管线

```
template.html
  ← engine.css      (<!-- ENGINE_CSS --> 注入点)
  ← components.js   (<!-- COMPONENTS_JS --> 注入点)
  ← engine.js       (<!-- ENGINE_JS --> 注入点)
  ← data.js         (<!-- BOOK_DATA --> 注入点)
  ← custom.js       (<!-- BOOK_CUSTOM --> 注入点，如存在)
  → dist/[slug]/index.html（单文件HTML）
```

**运行构建：**
```bash
node build.js
```
构建所有书籍 + 书架首页，输出到 `dist/`。速度 <1秒。

**添加新书：**
```bash
mkdir src/books/new-book-slug
# 创建 data.js（必须）
# 创建 custom.js（可选）
node build.js
# 检查 dist/new-book-slug/index.html
```

---

## 二、引擎内置功能（无需custom.js）

以下所有功能只要在 data.js 中提供正确格式的数据，引擎会自动渲染：

| 功能 | 在data.js中如何触发 |
|------|------------------|
| Hero（书名/作者/徽章） | `meta.title`, `meta.author`, `meta.badge` |
| 场景导航点（右侧） | 自动，基于 `scenes` 数组 |
| 调色板动态切换 | `PALETTES` 对象 + `scenes[].palette` |
| 暗色场景（粒子/星空） | `darkScenes` 数组 |
| 部分分隔卡 | `meta.parts[].beforeScene` |
| 场景标题/副标题/编号 | `scenes[].title/subtitle/number` |
| Hero引言（擦入动画） | `scenes[].heroQuote`（必须是纯字符串） |
| 叙事段落（首字下沉） | `scenes[].narrative`（字符串数组） |
| 扩展阅读折叠面板 | `scenes[].extendedReading`（字符串数组） |
| Deep Dive抽屉 | `scenes[].deepDives`（含icon/title/chain） |
| 对比模块 | `scenes[].comparison` |
| 核心收获面板 | `scenes[].keyTakeaway` |
| 术语表浮动按钮 | `meta.keyTerms`（term/definition对象数组） |
| 知识地图（2级径向） | `knowledgeMaps` 数组 |
| 思维导图（3-4级树状） | `mindMaps` 数组 |
| AI反思段落 | `aiReflection.paragraphs` |
| 页脚 | `footer.title/text/note` |
| 进度条 | 自动 |
| 键盘导航（Space/↑/↓） | 自动 |
| Active Recall模糊遮罩 | `deepDives[].triggerQuestion`（触发） |
| 书架首页卡片 | `meta.shelf` 配置 |

**内置dataViz类型（无需custom.js）：**
- `comparison-table`：带列头的表格

---

## 三、自定义组件（custom.js插件系统）

当需要超出内置功能的交互时，在 `custom.js` 中使用插件API：

### 注册自定义数据可视化

```javascript
// custom.js 中
ENGINE.registerViz('my-viz-type', function(container, data) {
  // container: 要挂载到的DOM元素
  // data: 来自 data.js 中 scene.dataViz.data 的数据
  container.innerHTML = `<div>你的自定义HTML</div>`;
  // 可以在这里添加事件监听器、动画等
});
```

在 data.js 的场景中引用：
```javascript
dataViz: {
  type: 'my-viz-type',  // 与registerViz的第一个参数完全一致
  title: '可视化标题',
  data: { /* 传给handler的数据 */ }
}
```

### 注册自定义初始化函数

```javascript
// 页面加载完成后执行
ENGINE.registerInit(function() {
  // 初始化复杂组件、设置全局事件等
});
```

### 注册自定义插件（附加到场景）

```javascript
ENGINE.registerPlugin(function(sceneEl, sceneData) {
  // sceneEl: 场景的DOM元素
  // sceneData: 该场景在data.js中的完整数据对象
  if (sceneData.id === 'scene-3') {
    // 仅在特定场景执行
  }
});
```

### 已有的成功案例（参考）

| 书名 | 自定义组件 | 教学目标 |
|------|-----------|---------|
| sapiens | Dunbar圈层可视化 | 直观展示150人社交上限 |
| sapiens | 时间线探索器 | 人类历史关键里程碑 |
| thinking-fast-slow | 锚定效应模拟器 | 让读者亲身体验认知偏差 |
| thinking-fast-slow | 损失厌恶计算器 | 把数学直观化 |
| how-to-read | 四层阅读金字塔（可点击） | 展示四种阅读方式的递进 |
| intelligent-investor | 投资vs投机对比计算器 | 让读者自评三个条件 |

---

## 四、关键约束（违反会导致渲染失败）

### 格式红线（来自DESIGN_SPEC.md第三节）

| 字段 | 正确格式 | 错误格式 |
|------|---------|---------|
| `heroQuote` | `'引言文本'`（纯字符串） | `{text: '...', author: '...'}` |
| `deepDives[].icon` | `'🔍'`（必须存在） | 缺失此字段 |
| `deepDives[].title` | `'标题文字'`（必须存在） | 缺失此字段 |
| `deepDives[].chain` | `{chain: {premise, evidence, conclusion}}` | 直接 `{premise, evidence, conclusion}` |
| `extendedReading` | `['段落1', '段落2']`（字符串数组） | `[{title, author, why}]`（对象数组） |
| `aiReflection.palette` | `'scene10'`（字符串键名） | `{bg: '...'}` 对象 |
| `darkScenes` | `['scene4', 'scene8']`（使用无连字符格式） | `['scene-4']` |
| `dataViz.type` | 已注册的类型名 | 未注册的类型（静默失败） |

### 键名约定

- 书籍目录：`kebab-case`（如 `thinking-fast-slow`）
- 场景id：`kebab-case`（如 `scene-1`）
- 调色板键名：`camelCase`（如 `scene1`, `scene12`）——注意与 `darkScenes` 数组中的键名一致
- `parts[].beforeScene`：`kebab-case`（与场景id格式一致）

---

## 五、调色板设计规则（快速参考）

**明色场景（适合基础内容/平静场景）：**
- `bg`: `#E8-#F5` 范围（如 #F5F0E8, #F2EDE4）
- `fg`: `#1A-#20` 范围（如 #1A1A1A, #1C2234）
- `accent`: 低饱和暖调——老金(#B8860B)、橄榄绿(#5E7A3A)、赭石(#8B4513)、深海蓝(#2E5A8C)

**暗色场景（适合震撼内容/转折场景，必须加入 darkScenes 数组）：**
- `bg`: `#0A-#14` 范围（如 #141414, #0E1A28）
- `fg`: `#D0-#E4` 范围（如 #E8E4DC, #D8D4CC）
- `accent`: 可提亮为金(#D4A845)、冷蓝(#6A8EC0)、暖红(#CD4F39)
- `glassBg`: 使用 `rgba(x,x,x,0.85-0.88)`

**禁止：** 纯黑底(#000)、纯白底(#FFF)、高饱和荧光色、冷灰系正文

---

## 六、性能约束

- **零外部JS依赖**：不能引入GSAP/ECharts/jQuery/React等任何JS库
- **零CSS预处理**：使用原生CSS + @layer，不用SASS/Less
- **动画**：用CSS transition + IntersectionObserver + requestAnimationFrame，不用JS直接操作scroll事件
- **字体**：只允许Google Fonts的 Noto Serif SC + Noto Sans SC + Inter（已在template.html中加载）
- **内容一次渲染**：不用懒加载，所有内容一次性渲染，引擎用content-visibility优化性能

---

## 七、常见问题排查

| 症状 | 最可能的原因 | 解决方法 |
|------|------------|---------|
| heroQuote显示`[object Object]` | heroQuote写成了对象格式 | 改为纯字符串 |
| Deep Dive抽屉空白 | chain嵌套层级错误或缺少icon/title | 检查deepDives格式 |
| extendedReading显示`[object Object]` | 使用了对象数组 | 改为字符串数组 |
| dataViz不渲染（静默失败） | type名在custom.js中未注册 | 检查registerViz的类型名是否完全一致 |
| 调色板不切换 | palette键名与PALETTES中的键名不匹配 | 确保大小写完全一致 |
| 暗色场景没有粒子效果 | scene未加入darkScenes数组 | 将sceneN（无连字符）加入darkScenes |
| 知识地图/思维导图不出现 | afterPart数值与meta.parts数量不匹配 | 检查afterPart对应的部分是否存在 |
| 书架首页不显示新书 | meta.shelf配置缺失 | 确保meta中有完整的shelf配置 |
| build.js报错 | data.js语法错误 | 检查JSON语法，特别是最后一个元素后面的逗号 |
