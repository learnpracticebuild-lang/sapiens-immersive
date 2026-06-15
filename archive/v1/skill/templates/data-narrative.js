// ═══════════════════════════════════════════════════════════════
// [BOOK_TITLE_EN] · DATA  ← 替换为英文书名
// [书名] · Immersive Book Engine Data
// 叙事型书籍模板 · 基于《人类简史》骨架提取
// ═══════════════════════════════════════════════════════════════
//
// 使用说明：
// 1. 将所有 [占位符] 替换为真实内容
// 2. 调色板：至少10-12个，明暗交替（4-5个暗色场景）
// 3. 场景数量：叙事型通常 12-18 个场景
// 4. 严格遵守 DESIGN_SPEC.md 第三节的格式红线
//
// 格式红线（构建失败的最常见原因）：
// - heroQuote：必须是纯字符串，不能是 {text, author} 对象
// - deepDives：必须包含 icon + title + chain: {premise, evidence, conclusion}
// - extendedReading：必须是字符串数组，不能是对象数组
// - aiReflection.palette：必须是字符串键名（如 'scene12'），不能是对象
// ═══════════════════════════════════════════════════════════════

const PALETTES = {
  // ─── Hero 调色板（暖色，用于封面场景） ───────────────────────
  hero: {
    bg: '#F5F0E8', bgSecondary: '#EDE7DA', fg: '#1A1A1A', fgSecondary: '#5C5546',
    accent: '#B8860B', accentDim: 'rgba(184,134,11,0.12)', accentMid: 'rgba(184,134,11,0.35)',
    accentGlow: 'rgba(184,134,11,0.06)', border: 'rgba(0,0,0,0.06)',
    glassBg: 'rgba(245,240,232,0.82)', glassBorder: 'rgba(255,255,255,0.3)'
  },

  // ─── 场景调色板（明色场景示例） ──────────────────────────────
  // 明色场景：bg 在 #E8-#F5 范围，fg 在 #1A-#20 范围
  // accent 保持低饱和暖调（老金/橄榄绿/深赭石/深海蓝）
  scene1: { // 明色 · [场景主题，如：起源与演化]
    bg: '#F7F3EC', bgSecondary: '#EDE8DE', fg: '#2C2416', fgSecondary: '#6B5D4A',
    accent: '#A0522D', accentDim: 'rgba(160,82,45,0.1)', accentMid: 'rgba(160,82,45,0.3)',
    accentGlow: 'rgba(160,82,45,0.05)', border: 'rgba(44,36,22,0.06)',
    glassBg: 'rgba(247,243,236,0.82)', glassBorder: 'rgba(255,255,255,0.25)'
  },
  scene2: { // 明色 · [场景主题]
    bg: '#F4F1EA', bgSecondary: '#E8E3D8', fg: '#1F1A12', fgSecondary: '#6E6350',
    accent: '#8B6914', accentDim: 'rgba(139,105,20,0.1)', accentMid: 'rgba(139,105,20,0.3)',
    accentGlow: 'rgba(139,105,20,0.05)', border: 'rgba(31,26,18,0.06)',
    glassBg: 'rgba(244,241,234,0.82)', glassBorder: 'rgba(255,255,255,0.25)'
  },
  scene3: { // 明色 · [场景主题，绿调，适合自然/生命/成长类场景]
    bg: '#F0F2EC', bgSecondary: '#E4E8DD', fg: '#1C2418', fgSecondary: '#566148',
    accent: '#5E7A3A', accentDim: 'rgba(94,122,58,0.1)', accentMid: 'rgba(94,122,58,0.3)',
    accentGlow: 'rgba(94,122,58,0.05)', border: 'rgba(28,36,24,0.06)',
    glassBg: 'rgba(240,242,236,0.82)', glassBorder: 'rgba(255,255,255,0.25)'
  },

  // ─── 暗色场景调色板（声明在 darkScenes 数组中） ──────────────
  // 暗色场景：bg 在 #0A-#14 范围，fg 在 #D0-#E4 范围
  scene4: { // 暗色 · [场景主题，金色accent，适合文明/权力/转折类场景]
    bg: '#141414', bgSecondary: '#1C1C1C', fg: '#E8E4DC', fgSecondary: '#8A8478',
    accent: '#D4A845', accentDim: 'rgba(212,168,69,0.1)', accentMid: 'rgba(212,168,69,0.3)',
    accentGlow: 'rgba(212,168,69,0.05)', border: 'rgba(255,255,255,0.06)',
    glassBg: 'rgba(30,30,30,0.85)', glassBorder: 'rgba(255,255,255,0.08)'
  },
  scene5: { // 明色 · [场景主题]
    bg: '#F5F0E0', bgSecondary: '#EBE4CE', fg: '#2A2011', fgSecondary: '#7A6C4E',
    accent: '#B8860B', accentDim: 'rgba(184,134,11,0.1)', accentMid: 'rgba(184,134,11,0.3)',
    accentGlow: 'rgba(184,134,11,0.05)', border: 'rgba(42,32,17,0.07)',
    glassBg: 'rgba(245,240,224,0.82)', glassBorder: 'rgba(255,255,255,0.25)'
  },
  scene6: { // 明色 · [场景主题，赭石调，适合历史/社会/文化类场景]
    bg: '#F2EDE4', bgSecondary: '#E6DFD2', fg: '#1E1914', fgSecondary: '#6D6050',
    accent: '#8B4513', accentDim: 'rgba(139,69,19,0.1)', accentMid: 'rgba(139,69,19,0.3)',
    accentGlow: 'rgba(139,69,19,0.05)', border: 'rgba(30,25,20,0.07)',
    glassBg: 'rgba(242,237,228,0.82)', glassBorder: 'rgba(255,255,255,0.25)'
  },
  scene7: { // 明色 · [场景主题]
    bg: '#EDE8DC', bgSecondary: '#E2DBCB', fg: '#221C12', fgSecondary: '#6A5C46',
    accent: '#7B6327', accentDim: 'rgba(123,99,39,0.1)', accentMid: 'rgba(123,99,39,0.3)',
    accentGlow: 'rgba(123,99,39,0.05)', border: 'rgba(34,28,18,0.07)',
    glassBg: 'rgba(237,232,220,0.82)', glassBorder: 'rgba(255,255,255,0.25)'
  },
  scene8: { // 暗色 · [场景主题，暖紫调，适合批判/反思/转折类场景]
    bg: '#1A1520', bgSecondary: '#221C2A', fg: '#E4DED6', fgSecondary: '#9A8F82',
    accent: '#C47A5A', accentDim: 'rgba(196,122,90,0.1)', accentMid: 'rgba(196,122,90,0.3)',
    accentGlow: 'rgba(196,122,90,0.05)', border: 'rgba(255,255,255,0.06)',
    glassBg: 'rgba(30,24,38,0.85)', glassBorder: 'rgba(255,255,255,0.08)'
  },
  scene9: { // 明色 · [场景主题]
    bg: '#F5F0E0', bgSecondary: '#ECE5CF', fg: '#2A2011', fgSecondary: '#7A6C4E',
    accent: '#C49B2A', accentDim: 'rgba(196,155,42,0.1)', accentMid: 'rgba(196,155,42,0.35)',
    accentGlow: 'rgba(196,155,42,0.05)', border: 'rgba(42,32,17,0.06)',
    glassBg: 'rgba(245,240,224,0.82)', glassBorder: 'rgba(255,255,255,0.25)'
  },
  scene10: { // 明色 · [场景主题，紫调，适合思想/意识形态/宗教类场景]
    bg: '#F0EAF0', bgSecondary: '#E4DBE6', fg: '#1E1420', fgSecondary: '#6A5670',
    accent: '#7B4B8A', accentDim: 'rgba(123,75,138,0.1)', accentMid: 'rgba(123,75,138,0.3)',
    accentGlow: 'rgba(123,75,138,0.05)', border: 'rgba(30,20,32,0.06)',
    glassBg: 'rgba(240,234,240,0.82)', glassBorder: 'rgba(255,255,255,0.25)'
  },
  scene11: { // 暗色 · [场景主题，蓝调，适合科技/未来/宇宙类场景]
    bg: '#181820', bgSecondary: '#1E1E2E', fg: '#E0DCD4', fgSecondary: '#908880',
    accent: '#6A8EC0', accentDim: 'rgba(106,142,192,0.1)', accentMid: 'rgba(106,142,192,0.3)',
    accentGlow: 'rgba(106,142,192,0.05)', border: 'rgba(255,255,255,0.06)',
    glassBg: 'rgba(28,28,40,0.85)', glassBorder: 'rgba(255,255,255,0.08)'
  },
  scene12: { // 明色 · [场景主题，用于全书终章或综合性场景]
    bg: '#F2F0EC', bgSecondary: '#E6E2DA', fg: '#1C1A16', fgSecondary: '#6B6658',
    accent: '#8B7355', accentDim: 'rgba(139,115,85,0.1)', accentMid: 'rgba(139,115,85,0.3)',
    accentGlow: 'rgba(139,115,85,0.05)', border: 'rgba(28,26,22,0.06)',
    glassBg: 'rgba(242,240,236,0.82)', glassBorder: 'rgba(255,255,255,0.25)'
  }
  // ... 根据实际场景数量，按上述明/暗模式继续添加调色板
};


// ═══════════════════════════════════════════════════════════════
// CONTENT DATA
// ═══════════════════════════════════════════════════════════════

const CONTENT_DATA = {
  meta: {
    title: '[中文书名]',                          // 例: '人类简史'
    titleEn: '[ENGLISH TITLE IN CAPS]',           // 例: 'SAPIENS: A Brief History of Humankind'
    subtitle: '[副标题]',                          // 例: '从动物到上帝'
    badge: '沉浸式深度导读 · [ENGLISH] · COMPLETE',
    author: '[中文作者名]',                        // 例: '尤瓦尔·赫拉利'
    authorEn: '[Author Name]',                    // 例: 'Yuval Noah Harari'
    type: '[类型]',                                // history|psychology|philosophy|science|economics|practical|fiction
    shelf: {
      emoji: '[单个emoji]',                        // 例: '🧬'
      gradient: 'linear-gradient(135deg, [起始色] 0%, [中间色] 50%, [结束色] 100%)',
      description: '[一句话描述，点出全书价值]',
      stats: ['[X] 场景', '[Y] 部分', '[关键词标签]']
    },

    // ═══ 深度内容字段（来自Step 1-3的分析性阅读成果）═══

    // 全书核心论点（不是主题描述，是作者要证明什么）
    // 叙事型：3-5句话，说清楚论证链的主线
    coreThesis: '[全书核心论点，1-3段，每段2-4句话，保留完整逻辑链]',

    // 作者试图解决的问题（成书背景+核心问题意识）
    authorProblem: '[作者写这本书的时代背景和核心问题意识，1-2段]',

    // 全书结构概述（部分划分+各部分功能）
    bookStructure: '[全书结构，说明各部分如何在论证上推进，1-2段]',

    // 引导读者边读边思考的问题（来自SYNTHESIS.md的检验问题中选最好的5-7个）
    readerQuestions: [
      '[问题1：理解性问题，不是记忆性]',
      '[问题2]',
      '[问题3]',
      '[问题4]',
      '[问题5]'
    ],

    // 对全书的批判性评价（来自SYNTHESIS.md）
    critique: '[全书批判性总评，指出最有力和最薄弱的论证，1-2段]',

    // 作者赋予特定含义的关键术语（10-20个）
    keyTerms: [
      { term: '[术语名]', definition: '[作者自己的定义，不是字典定义，2-4句话]' },
      { term: '[术语名]', definition: '[...]' },
      // ... 继续添加，建议10-20个
    ],

    // 全书部分划分（用于渲染 "第N部分" 分隔卡）
    parts: [
      { number: 1, title: '[第一部分标题]', titleEn: '[PART ONE EN]', beforeScene: 'scene-1' },
      { number: 2, title: '[第二部分标题]', titleEn: '[PART TWO EN]', beforeScene: 'scene-[N]' },
      // ... 根据实际部分数量继续
    ]
  },

  // 声明哪些场景使用暗色调色板（必须与PALETTES中定义的暗色调色板对应）
  // 规则：键名使用 sceneN 格式（无连字符）
  darkScenes: ['scene4', 'scene8', 'scene11'],  // ← 修改为实际的暗色场景


  // ═══════════════════════════════════════════════════════════════
  // SCENES（叙事型：场景按书的叙事/论证顺序排列）
  // ═══════════════════════════════════════════════════════════════
  scenes: [

    // ─────────────────────────────────────────────────────────────
    // PART I · [第一部分标题]
    // ─────────────────────────────────────────────────────────────

    // SCENE 1：[场景标题]（覆盖第X-Y章）
    {
      id: 'scene-1',
      number: '场景 01',    // 或数字 1，两种格式均可
      palette: 'scene1',   // 必须与 PALETTES 中的键名一致

      title: '[场景标题]',
      subtitle: '[场景副标题，说明这个场景的核心内容]',
      titleEn: '[SCENE TITLE IN ENGLISH]',  // 可选，用于装饰性英文标注

      // 必须是纯字符串！不能是 {text, author} 对象
      heroQuote: '[原书中最震撼的原句，选择能概括本场景核心论点的句子]',

      // 每个场景的"核心收获"面板（读完后的一句话总结）
      keyTakeaway: '[本场景的核心收获，理解性总结，不是记忆性摘要，1-2句话]',

      // 叙事段落（最重要的内容部分）
      // 要求：≥6段，每段300-500字，保留论证链和案例的叙事性
      // 第一段会自动获得首字下沉效果
      narrative: [
        '[第一段：开篇段，通常从一个具体的场景/故事/反直觉发现切入，建立问题意识]...',
        '[第二段：提出核心论点，引入关键概念]...',
        '[第三段：主要论证/案例1，保留叙事性，不要压缩成概括]...',
        '[第四段：主要论证/案例2，或对比/延伸]...',
        '[第五段：深化论证，或引入反直觉洞察]...',
        '[第六段：结论/过渡，与下一场景的逻辑衔接]...'
      ],

      // 扩展阅读（折叠面板，供有兴趣的读者深入）
      // 必须是字符串数组！不能是对象数组
      extendedReading: [
        '[扩展背景段落1：提供本章的学术背景/历史背景/延伸阅读建议]...',
        '[扩展背景段落2：补充正文未展开的相关研究或案例]...',
        '[扩展背景段落3（可选）：与其他书的交叉引用]...'
      ],

      // 数据可视化（可选）
      // 使用引擎内置类型 或 在 custom.js 中用 registerViz 注册的自定义类型
      dataViz: {
        type: '[viz类型，例如 comparison-table，或自定义类型如 dunbar]',
        title: '[可视化标题]',
        // data 格式由 viz 类型决定，自定义 viz 在 custom.js 中处理
        data: {}  // 如果是自定义viz，可以省略data，在custom.js中直接渲染
      },

      // 深度解析卡片（点击展开抽屉，显示完整论证链）
      // 必须包含 icon + title + chain！缺任何一项都会导致渲染失败
      deepDives: [
        {
          title: '[论证点标题，反直觉洞察的核心问题]',
          icon: '[单个emoji，表达这个论证的主题]',
          triggerQuestion: '[主动回忆问题：引导读者在看答案前先思考，可选]',
          chain: {
            premise: '[前提/假设：这个论证建立在什么基础上？什么样的普遍认知或前提条件？]',
            evidence: '[证据/数据：作者用了什么具体案例、数字、历史事实来支撑？保留具体数字]',
            conclusion: '[结论：前提+证据导出什么结论？有什么新的洞察或实践意义？]'
          }
        },
        {
          title: '[第二个论证点标题]',
          icon: '[emoji]',
          chain: {
            premise: '[前提]',
            evidence: '[证据，保留具体数字和案例细节]',
            conclusion: '[结论]'
          }
        },
        {
          title: '[第三个论证点标题]',
          icon: '[emoji]',
          chain: {
            premise: '[前提]',
            evidence: '[证据]',
            conclusion: '[结论]'
          }
        }
      ]
    },


    // SCENE 2：[场景标题]（覆盖第X-Y章）
    {
      id: 'scene-2',
      number: '场景 02',
      palette: 'scene2',

      title: '[场景标题]',
      subtitle: '[场景副标题]',
      titleEn: '[SCENE TITLE EN]',

      heroQuote: '[原书中最震撼的原句]',

      keyTakeaway: '[核心收获，1-2句话]',

      narrative: [
        '[第一段]...',
        '[第二段]...',
        '[第三段]...',
        '[第四段]...',
        '[第五段]...',
        '[第六段]...'
      ],

      extendedReading: [
        '[扩展段落1]...',
        '[扩展段落2]...'
      ],

      // 叙事型书籍中，comparison 是可选的，在有明显对比内容时使用
      // （框架型书籍几乎每个场景都应该有 comparison）
      comparison: {
        labels: ['[选项A名称]', '[选项B名称]'],
        modes: ['modeA', 'modeB'],   // 内部键名，camelCase
        triggerLabel: '[对比模块标题，显示在按钮上方]',
        rows: [
          {
            label: '[对比维度1]',
            modeA: { score: 8, text: '[选项A在这个维度的描述]' },
            modeB: { score: 3, text: '[选项B在这个维度的描述]' }
          },
          {
            label: '[对比维度2]',
            modeA: { score: 7, text: '[描述]' },
            modeB: { score: 5, text: '[描述]' }
          },
          {
            label: '[对比维度3]',
            modeA: { score: 9, text: '[描述]' },
            modeB: { score: 2, text: '[描述]' }
          }
          // score 范围 1-10，决定条形图宽度
        ]
      },

      deepDives: [
        {
          title: '[论证点标题]',
          icon: '[emoji]',
          chain: {
            premise: '[前提]',
            evidence: '[证据]',
            conclusion: '[结论]'
          }
        },
        {
          title: '[论证点标题]',
          icon: '[emoji]',
          chain: {
            premise: '[前提]',
            evidence: '[证据]',
            conclusion: '[结论]'
          }
        }
      ]
    },

    // ... 按同样的模式继续添加其余场景（叙事型通常12-18个）
    // 每个场景都应该包含：heroQuote, narrative(≥6段), deepDives(≥3个)
    // 可选：dataViz, comparison, extendedReading, keyTakeaway


  ],  // scenes 结束


  // ═══════════════════════════════════════════════════════════════
  // 知识地图（插入在部分之间，用于回顾该部分的核心概念）
  // afterPart: 数字，表示插在第几部分之后
  // ═══════════════════════════════════════════════════════════════
  knowledgeMaps: [
    {
      afterPart: 1,                  // 插入在第一部分之后
      palette: 'scene4',             // 通常使用暗色调色板
      title: '[第一部分知识地图标题]',
      center: '[中心节点：这一部分的核心概念]',
      branches: [
        {
          title: '[分支1标题：核心论点1]',
          leaves: ['[叶子1：关键细节/证据]', '[叶子2]', '[叶子3]']
        },
        {
          title: '[分支2标题：核心论点2]',
          leaves: ['[叶子1]', '[叶子2]', '[叶子3]']
        },
        {
          title: '[分支3标题：核心论点3]',
          leaves: ['[叶子1]', '[叶子2]', '[叶子3]']
        },
        {
          title: '[分支4标题：核心论点4]',
          leaves: ['[叶子1]', '[叶子2]', '[叶子3]']
        }
      ]
    },
    {
      afterPart: 2,
      palette: 'scene8',
      title: '[第二部分知识地图标题]',
      center: '[中心节点]',
      branches: [
        { title: '[分支1]', leaves: ['[叶子1]', '[叶子2]', '[叶子3]'] },
        { title: '[分支2]', leaves: ['[叶子1]', '[叶子2]', '[叶子3]'] },
        { title: '[分支3]', leaves: ['[叶子1]', '[叶子2]', '[叶子3]'] }
      ]
    }
    // ... 每个主要部分后面都可以加一个知识地图
  ],


  // ═══════════════════════════════════════════════════════════════
  // 思维导图（通常放在全书末尾，呈现全书论证结构）
  // afterPart: 'final' 表示放在最后一个场景之后
  // ═══════════════════════════════════════════════════════════════
  mindMaps: [
    {
      afterPart: 'final',
      palette: 'scene11',           // 通常使用暗色调色板
      title: '[全书论证结构图标题]',
      subtitle: '[SUBTITLE IN ENGLISH]',
      root: '[根节点：全书核心命题，1-2行]',
      branches: [
        {
          text: '[第一部分名称]',
          children: [
            {
              text: '[L2节点：核心概念1]',
              children: ['[L3叶子：关键细节1]', '[L3叶子：关键细节2]', '[L3叶子：关键细节3]']
            },
            {
              text: '[L2节点：核心概念2]',
              children: ['[L3叶子]', '[L3叶子]']
            },
            '[L2纯文字叶子（简短观点）]'
          ]
        },
        {
          text: '[第二部分名称]',
          children: [
            { text: '[L2节点]', children: ['[L3]', '[L3]', '[L3]'] },
            { text: '[L2节点]', children: ['[L3]', '[L3]'] }
          ]
        },
        {
          text: '[第三部分名称]',
          children: [
            { text: '[L2节点]', children: ['[L3]', '[L3]', '[L3]'] },
            { text: '[L2节点]', children: ['[L3]', '[L3]'] }
          ]
        },
        {
          text: '[第四部分名称（如有）]',
          children: [
            { text: '[L2节点]', children: ['[L3]', '[L3]', '[L3]'] }
          ]
        }
      ]
    }
  ],


  // ═══════════════════════════════════════════════════════════════
  // AI反思（终章，沉浸式收尾）
  // palette: 必须是字符串键名，不能是对象
  // paragraphs: 4-6段，从AI视角/当代视角重新审视全书论点
  // ═══════════════════════════════════════════════════════════════
  aiReflection: {
    palette: 'scene12',              // 必须是 PALETTES 中存在的键名字符串
    label: '写在最后',
    title: '[AI反思标题，如：当AI读完这本书]',
    subtitle: '[SUBTITLE IN ENGLISH]',
    heroQuote: '[开篇引言，说明AI时代与这本书的特殊关联]',
    paragraphs: [
      // 每段300-500字，使用 <b>加粗</b> 强调核心观点
      '[第一段：全书最重要的洞察在AI时代如何重新显现，具体联系当代事件]...',
      '[第二段：全书论点与AI发展的深层联系，不是表面类比而是结构性呼应]...',
      '[第三段：全书框架对理解AI时代的哪个具体问题最有帮助]...',
      '[第四段：批判性视角——全书在AI时代的局限和需要更新的部分]...',
      '[第五段：结语——读完这本书后，应该带着什么新的问题去观察当下世界]...'
    ]
  },


  // ═══════════════════════════════════════════════════════════════
  // 页脚（全书收尾）
  // ═══════════════════════════════════════════════════════════════
  footer: {
    title: '全书 · 终',
    text: '[全书收尾文字，1-3段，可以是诗意的总结或对读者的最后一个问题]',
    note: '[版权/来源说明，如：[作者]《[书名]》· 沉浸式深度导读 · 全[N]部分]'
  }

};
