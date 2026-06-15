#!/usr/bin/env python3
"""
智识图书馆 v2 · Reader 渲染器
为指定书籍生成交互式 HTML 阅读应用:
  - reader/index.html        全书入口(章节卡片墙 + 全书地图)
  - reader/ch{NN}.html        每章(通用模板,Hero + 主张 + 概念 + 完整六问 + 金句 + 关联)
  - reader/assets/reader.css  共享样式(已存在)
  - reader/assets/reader.js   共享 JS(已存在)

特殊章节(如 ch07 谬误墙)由人工维护,本脚本默认 skip。
"""

import json
import re
import sys
from pathlib import Path
from datetime import datetime

# ----- 配置 -----
BOOK_SLUG = "asking-right-questions"
ROOT = Path(__file__).resolve().parent.parent
BOOK_DIR = ROOT / "books" / BOOK_SLUG
READER_DIR = BOOK_DIR / "reader"
CHAPTERS_DIR = BOOK_DIR / "chapters"

# 不重新生成的特殊章(已有定制版)
SKIP_CHAPTERS = {"ch07"}

# 阶段分组(用于 index 卡片配色)
STAGE_MAP = {
    "ch02": ("精神底色",      1),  # 第1章
    "ch03": ("识别论证",      2),  # 第2章
    "ch04": ("识别论证",      2),  # 第3章
    "ch05": ("识别论证",      2),  # 第4章
    "ch06": ("识别论证",      2),  # 第5章
    "ch07": ("评价质量",      3),  # 第6章 谬误
    "ch08": ("评价质量",      3),  # 第7章 证据一
    "ch09": ("评价质量",      3),  # 第8章 证据二
    "ch10": ("评价质量",      3),  # 第9章 替代原因
    "ch11": ("评价质量",      3),  # 第10章 数据
    "ch12": ("主动建设",      4),  # 第11章 省略
    "ch13": ("主动建设",      4),  # 第12章 多结论
}

# 章节标题映射(原书中文章节号 → 显示标题)
TITLE_MAP = {
    "ch02": ("01", "学会提出好问题",        "How to Ask Good Questions"),
    "ch03": ("02", "论题和结论是什么",     "Issue & Conclusion"),
    "ch04": ("03", "理由是什么",           "Reasons"),
    "ch05": ("04", "哪些词语意思不明确",   "Ambiguous Words"),
    "ch06": ("05", "什么是价值观假设和描述性假设", "Value & Descriptive Assumptions"),
    "ch07": ("06", "推理过程中有没有谬误", "Fallacies in Reasoning"),
    "ch08": ("07", "证据效力(一):直觉 / 经历 / 案例 / 证词 / 专家", "Evidence I"),
    "ch09": ("08", "证据效力(二):个人观察 / 研究报告 / 类比", "Evidence II"),
    "ch10": ("09", "有没有替代原因",       "Rival Causes"),
    "ch11": ("10", "数据有没有欺骗性",     "Deceptive Statistics"),
    "ch12": ("11", "有什么重要信息被省略了", "Omitted Information"),
    "ch13": ("12", "能得出哪些合理的结论", "Reasonable Conclusions"),
}

# 每章一句话副标题(基于内容人工拟)
SUBTITLE_MAP = {
    "ch02": "海绵 vs 淘金 / 强势 vs 弱势 — 工具进场前的精神扭转。",
    "ch03": "识别作者究竟在争什么、要你接受什么 — 评价的起点。",
    "ch04": "理由 + 结论 = 论证 — 没有理由的断言只是裸奔。",
    "ch05": "词越抽象,越容易藏歧义 — 不澄清就不评价。",
    "ch06": "连接理由与结论的隐藏黏合剂 — 价值观与事实假设。",
    "ch07": "13 种把推理伪装成有理的常见手段 — 不必背名字,会问就行。",
    "ch08": "我为什么要相信它? — 五类常见证据的可靠性分级。",
    "ch09": "观察从来不是纯粹的,科学方法是最佳但不绝对。",
    "ch10": "因果不只一种解释 — 找到多个替代,信心成反比下降。",
    "ch11": "数据能、而且经常在撒谎 — 任何统计都是基于事实的估计。",
    "ch12": "所有论证都是不完整的 — 真正自主必须扫描空白。",
    "ch13": "同一理由几乎从不只导出一个合理结论 — 全书的智识自由顶点。",
}

# 工具 ----------------------------------------------------------

def hanzi_count(text: str) -> int:
    return len(re.findall(r'[一-鿿]', text))

def fmt(n: int) -> str:
    return f"{n:,}"

def read_chapter(ch: str) -> dict:
    """读取章节所有数据"""
    base = CHAPTERS_DIR / ch
    extract = json.loads((base / "extract.json").read_text(encoding="utf-8"))
    quotes_md = (base / "quotes.md").read_text(encoding="utf-8") if (base / "quotes.md").exists() else ""
    six_q = {}
    six_q_dir = base / "six_q"
    if six_q_dir.exists():
        for q in ["q1", "q2", "q3", "q4", "q5", "q6"]:
            f = six_q_dir / f"{q}.md"
            if f.exists():
                six_q[q] = f.read_text(encoding="utf-8")
    return {"slug": ch, "extract": extract, "quotes_md": quotes_md, "six_q": six_q}

def parse_quotes(quotes_md: str) -> list:
    """解析 quotes.md 为 [{text, note}]"""
    if not quotes_md:
        return []
    quotes = []
    # 两种格式:旧格式纯 blockquote / 新格式 ## 金句 N
    blocks = re.split(r'\n## 金句\s*\d+[:：][^\n]*\n', quotes_md)
    if len(blocks) > 1:
        for b in blocks[1:]:
            m = re.search(r'>\s*(.+?)(?:\n\n)', b, re.DOTALL)
            text = m.group(1).strip() if m else b.split('\n')[0].strip('> ').strip()
            text = re.sub(r'\n>\s*', '\n', text).strip()
            note_match = re.search(r'—\s*(.+?)(?:\n##|$)', b, re.DOTALL)
            note = note_match.group(1).strip() if note_match else ""
            note = re.sub(r'\s+', ' ', note)[:300]
            quotes.append({"text": text, "note": note})
    else:
        # 旧格式:每个 > 一句
        items = re.findall(r'^>\s*(.+?)$', quotes_md, re.MULTILINE)
        for t in items[:5]:
            quotes.append({"text": t.strip(), "note": ""})
    return quotes[:5]

def build_six_tabs(six_q: dict) -> list:
    """为每问准备 tab 元数据"""
    labels = {
        "q1": ("Q1", "作者说了什么"),
        "q2": ("Q2", "论据是什么"),
        "q3": ("Q3", "反例与局限"),
        "q4": ("Q4", "隐含前提"),
        "q5": ("Q5", "与其他章节的关系"),
        "q6": ("Q6", "我如何实践"),
    }
    descs = {
        "q1": "本章核心主张的整体复述,看清作者究竟在主张什么、用怎样的论证骨架。",
        "q2": "把核心主张拆为多个论点,每个论点附作者原书中的论据(逻辑/案例/方法论)。",
        "q3": "本章工具的边界、反例、与学术界的对照——看清作者没说但应该被知道的局限。",
        "q4": "本章未明说但隐藏的前提——作者依赖什么默认才让工具成立。",
        "q5": "本章如何承接前序章节、又为后续章节铺路——在全书工具链中的位置。",
        "q6": "针对知识工作者的具体实践——把本章工具嵌入日常工作流的可执行路径。",
    }
    tabs = []
    for q in ["q1", "q2", "q3", "q4", "q5", "q6"]:
        if q not in six_q:
            continue
        text = six_q[q]
        chars = hanzi_count(text)
        tabs.append({
            "id": labels[q][0],
            "label": labels[q][1],
            "chars": fmt(chars),
            "desc": descs[q],
        })
    return tabs

def parse_core_claims(claims: list, max_n: int = 5) -> list:
    """从 core_claims 提取前 max_n 条作为主张卡片"""
    out = []
    for c in claims[:max_n]:
        if not c:
            continue
        # 短截断:首句 + 长度限制
        first = re.split(r'[。;;]', c)[0].strip()
        if not first:
            first = c[:50]
        out.append({
            "head": first[:40] + ("…" if len(first) > 40 else ""),
            "body": c.strip(),
        })
    return out

def extract_key_terms(extract: dict, max_n: int = 8) -> list:
    """从 key_terms 提取概念词"""
    terms = extract.get("key_terms", [])
    out = []
    for t in terms[:max_n]:
        if isinstance(t, dict):
            out.append({"term": t.get("term", ""), "def": t.get("definition", "") or t.get("def", "")})
        else:
            out.append({"term": str(t), "def": ""})
    return out

def js_string(s: str) -> str:
    """转义为 JS 字符串"""
    return s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n").replace("\r", "")

def html_escape(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")

# 模板 ----------------------------------------------------------

def render_chapter(ch: str, all_chapters: list) -> str:
    """生成单章 HTML"""
    data = read_chapter(ch)
    extract = data["extract"]
    six_q = data["six_q"]
    num, title_cn, title_en = TITLE_MAP[ch]
    subtitle = SUBTITLE_MAP[ch]
    stage_label, stage_n = STAGE_MAP[ch]

    quotes = parse_quotes(data["quotes_md"])
    claims = parse_core_claims(extract.get("core_claims", []), max_n=5)
    terms = extract_key_terms(extract, max_n=8)
    six_tabs = build_six_tabs(six_q)

    # 章节导航
    idx = all_chapters.index(ch)
    prev_ch = all_chapters[idx - 1] if idx > 0 else None
    next_ch = all_chapters[idx + 1] if idx < len(all_chapters) - 1 else None

    def chapter_link(c):
        n, t, _ = TITLE_MAP[c]
        return {"slug": c, "num": n, "title": t}

    prev_link = chapter_link(prev_ch) if prev_ch else None
    next_link = chapter_link(next_ch) if next_ch else None

    # === 渲染 HTML ===
    html_parts = []
    html_parts.append(f'''<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
  <script>
    (function(){{var s=localStorage.getItem('reader-theme');if(s==='light'||s==='dark'){{document.documentElement.setAttribute('data-theme',s);}}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){{document.documentElement.setAttribute('data-theme','dark');}}}})();
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>第 {num} 章 · {title_cn} | 学会提问</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600;700;900&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./assets/reader.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="./assets/reader.js"></script>
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body x-data="chapterApp({{ sixTabs: window.__SIX_TABS__, sectionIds: ['hero','core','concepts','quotes','related','deep-six'] }})" x-init="init()">

  <!-- Reading progress -->
  <div class="read-progress" :style="`width: ${{readProgress}}%`"></div>

  <!-- Side nav dots -->
  <nav class="side-nav hidden lg:flex">
    <a :class="activeSection === 'hero' ? 'active' : ''" href="#hero" title="开篇"></a>
    <a :class="activeSection === 'core' ? 'active' : ''" href="#core" title="核心主张"></a>
    <a :class="activeSection === 'concepts' ? 'active' : ''" href="#concepts" title="关键概念"></a>
    <a :class="activeSection === 'quotes' ? 'active' : ''" href="#quotes" title="金句"></a>
    <a :class="activeSection === 'related' ? 'active' : ''" href="#related" title="关联"></a>
    <a :class="activeSection === 'deep-six' ? 'active' : ''" href="#deep-six" title="完整六问"></a>
  </nav>

  <!-- Top bar -->
  <header class="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[#0a0a0f]/70 border-b border-[#2a2a38]/50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="./index.html" class="flex items-center gap-3 hover:opacity-80 transition">
        <div class="w-8 h-8 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
          <span class="font-sans-modern text-xs font-bold text-amber-400">{num}</span>
        </div>
        <div class="text-xs font-sans-modern text-[#a8a5a0]">
          <div class="text-[#6b6b73] uppercase tracking-widest text-[0.65rem]">学会提问 · 第 10 版</div>
          <div class="text-white">第 {num} 章 · {title_cn}</div>
        </div>
      </a>
      <div class="flex items-center gap-4 font-sans-modern text-xs text-[#a8a5a0]">
        <a href="./index.html" class="hidden md:flex items-center gap-1 hover:text-amber-400 transition">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          <span>目录</span>
        </a>
        <div class="hidden md:flex items-center gap-2">
          <span class="text-[#6b6b73]">阅读进度</span>
          <span class="text-amber-400 font-mono" x-text="`${{Math.round(readProgress)}}%`"></span>
        </div>
        <button class="theme-toggle" @click="toggleTheme()" :title="theme === 'light' ? '切换到深色' : '切换到浅色'">
          <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section id="hero" class="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-24 pb-32 overflow-hidden">
    <div class="absolute -top-40 -right-40 w-[600px] h-[600px] glow-amber rounded-full"></div>
    <div class="relative max-w-6xl mx-auto w-full z-10">
      <div class="hint-tag bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-8">CHAPTER {num} · {stage_label}</div>
      <div class="flex items-baseline gap-8 mb-8">
        <div class="chapter-num">{num}</div>
        <div class="hidden md:block flex-1">
          <div class="text-xs font-sans-modern uppercase tracking-[0.3em] text-[#6b6b73] mb-3">{title_en.upper()}</div>
          <div class="font-sans-modern text-base text-[#a8a5a0] leading-relaxed max-w-md">{subtitle}</div>
        </div>
      </div>
      <h1 class="hero-cn text-4xl md:text-6xl lg:text-7xl mb-12 max-w-5xl text-white">
        {title_cn}
      </h1>
      <div class="grid md:grid-cols-3 gap-6 max-w-4xl">
        <div class="border-l border-amber-500/30 pl-4">
          <div class="font-mono text-3xl text-amber-400 mb-1">{len(claims)}</div>
          <div class="font-sans-modern text-xs text-[#a8a5a0] uppercase tracking-wider">核心主张</div>
        </div>
        <div class="border-l border-amber-500/30 pl-4">
          <div class="font-mono text-3xl text-amber-400 mb-1">{len(terms)}</div>
          <div class="font-sans-modern text-xs text-[#a8a5a0] uppercase tracking-wider">关键概念</div>
        </div>
        <div class="border-l border-amber-500/30 pl-4">
          <div class="font-mono text-3xl text-amber-400 mb-1">{sum(int(t['chars'].replace(',', '')) for t in six_tabs):,}</div>
          <div class="font-sans-modern text-xs text-[#a8a5a0] uppercase tracking-wider">深度产出汉字</div>
        </div>
      </div>
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 pulse">
        <div class="font-sans-modern text-xs text-[#6b6b73] uppercase tracking-widest mb-2 text-center">向下滚动</div>
        <svg class="mx-auto" width="20" height="32" viewBox="0 0 20 32" fill="none">
          <rect x="1" y="1" width="18" height="30" rx="9" stroke="#6b6b73" stroke-width="1"/>
          <circle cx="10" cy="10" r="2" fill="currentColor" style="color:var(--accent-amber)">
            <animate attributeName="cy" values="10;20;10" dur="2s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
    </div>
  </section>
''')

    # CORE CLAIMS
    html_parts.append('''
  <!-- CORE CLAIMS -->
  <section id="core" class="relative px-6 lg:px-16 py-24 max-w-7xl mx-auto">
    <div class="reveal">
      <div class="hint-tag bg-[#1a1a26] text-[#a8a5a0] border border-[#2a2a38] mb-6">§1 · 核心主张</div>
      <h2 class="hero-cn text-3xl md:text-5xl mb-12 max-w-4xl leading-tight text-white">作者的<span class="text-amber-400">几个关键判断</span></h2>
      <div class="grid lg:grid-cols-2 gap-6 max-w-6xl">
''')
    for i, c in enumerate(claims):
        html_parts.append(f'''        <div class="card rounded-xl p-7">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
              <span class="font-mono text-amber-400 font-bold">{i+1:02d}</span>
            </div>
            <div>
              <h3 class="font-sans-modern font-bold text-base text-white mb-3">{html_escape(c["head"])}</h3>
              <p class="text-[#d4d2cf] leading-relaxed text-[15px]">{html_escape(c["body"])}</p>
            </div>
          </div>
        </div>
''')
    html_parts.append('''      </div>
    </div>
  </section>

  <div class="section-line max-w-6xl mx-auto"></div>
''')

    # KEY TERMS
    if terms:
        html_parts.append('''
  <!-- KEY TERMS -->
  <section id="concepts" class="relative px-6 lg:px-16 py-24 max-w-7xl mx-auto">
    <div class="reveal">
      <div class="hint-tag bg-[#1a1a26] text-[#a8a5a0] border border-[#2a2a38] mb-6">§2 · 关键概念</div>
      <h2 class="hero-cn text-3xl md:text-5xl mb-4 text-white">本章<span class="text-amber-400">核心术语</span></h2>
      <p class="font-sans-modern text-[#a8a5a0] text-lg max-w-3xl mb-12">掌握这些术语,就掌握了本章的工具骨架。</p>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
''')
        for t in terms:
            term_text = html_escape(t["term"])
            def_text = html_escape(t["def"]) if t["def"] else ""
            html_parts.append(f'''        <div class="card rounded-lg p-5">
          <div class="font-sans-modern font-bold text-amber-400 mb-2">{term_text}</div>
          {f'<div class="text-sm text-[#a8a5a0] leading-relaxed">{def_text}</div>' if def_text else '<div class="text-xs text-[#6b6b73] italic">详见下方完整六问</div>'}
        </div>
''')
        html_parts.append('''      </div>
    </div>
  </section>

  <div class="section-line max-w-6xl mx-auto"></div>
''')

    # QUOTES
    if quotes:
        html_parts.append('''
  <!-- QUOTES -->
  <section id="quotes" class="relative px-6 lg:px-16 py-24">
    <div class="absolute top-0 right-0 w-[400px] h-[400px] glow-amber rounded-full opacity-30"></div>
    <div class="max-w-5xl mx-auto reveal relative z-10">
      <div class="hint-tag bg-[#1a1a26] text-[#a8a5a0] border border-[#2a2a38] mb-6">§3 · 作者原声</div>
      <h2 class="hero-cn text-3xl md:text-5xl mb-12 text-white">本章<span class="text-amber-400">章节金句</span></h2>
      <div class="space-y-6">
''')
        for i, q in enumerate(quotes):
            qtext = html_escape(q["text"])
            qnote = html_escape(q["note"]) if q["note"] else ""
            html_parts.append(f'''        <div class="author-voice rounded-r-xl p-6 md:p-8">
          <div class="flex items-start gap-6">
            <div class="font-mono text-3xl text-amber-400/60 flex-shrink-0">{i+1:02d}</div>
            <div class="flex-1">
              <div class="text-lg md:text-xl text-[#e8e6e3] leading-loose mb-4 pull-quote pl-4">{qtext}</div>
              {f'<div class="text-sm text-[#a8a5a0] font-sans-modern">{qnote}</div>' if qnote else ''}
            </div>
          </div>
        </div>
''')
        html_parts.append('''      </div>
    </div>
  </section>

  <div class="section-line max-w-6xl mx-auto"></div>
''')

    # RELATED CHAPTERS
    html_parts.append('''
  <!-- RELATED -->
  <section id="related" class="relative px-6 lg:px-16 py-24">
    <div class="max-w-7xl mx-auto reveal">
      <div class="hint-tag bg-[#1a1a26] text-[#a8a5a0] border border-[#2a2a38] mb-6">§4 · 全书坐标</div>
      <h2 class="hero-cn text-3xl md:text-5xl mb-4 text-white">本章在<span class="text-amber-400">工具链</span>中的位置</h2>
      <p class="font-sans-modern text-[#a8a5a0] text-lg max-w-3xl mb-12">完整的章节关联(承接 / 铺垫)在下方 §5 完整六问的 Q5 中详细展开。</p>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
''')
    for ach in all_chapters:
        n, t, _ = TITLE_MAP[ach]
        is_current = ach == ch
        cls = "border-amber-500 bg-amber-500/10" if is_current else "border-[#2a2a38]"
        html_parts.append(f'''        <a href="./{ach}.html" class="block rounded-lg border {cls} p-4 transition hover:border-amber-500/50">
          <div class="font-mono text-xs text-amber-400 mb-1">CH {n}</div>
          <div class="text-sm {'text-amber-400 font-medium' if is_current else 'text-[#d4d2cf]'}">{html_escape(t)[:18]}{'…' if len(t) > 18 else ''}</div>
        </a>
''')
    html_parts.append('''      </div>
      <div class="mt-8 p-6 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-4">
        <div class="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--accent-amber)"><path d="M12 2v20M2 12h20"/></svg>
        </div>
        <div class="flex-1">
          <div class="font-sans-modern text-xs uppercase tracking-widest text-amber-400 mb-1">向下继续</div>
          <div class="text-[#d4d2cf]">下一节就是<strong class="text-white">完整六问深度产出</strong>——反例、前提、章节关系、个人实践,全部就地展开,无需跳转。</div>
        </div>
      </div>
    </div>
  </section>

  <div class="section-line max-w-6xl mx-auto"></div>
''')

    # SIX QUESTIONS
    if six_tabs:
        total_chars = sum(int(t['chars'].replace(',', '')) for t in six_tabs)
        html_parts.append(f'''
  <!-- DEEP SIX -->
  <section id="deep-six" class="relative px-6 lg:px-16 py-24">
    <div class="absolute -top-40 left-0 w-[600px] h-[600px] glow-violet rounded-full opacity-30 pointer-events-none"></div>
    <div class="max-w-6xl mx-auto reveal relative z-10">
      <div class="hint-tag bg-[#1a1a26] text-[#a8a5a0] border border-[#2a2a38] mb-6">§5 · 完整六问深度产出</div>
      <h2 class="hero-cn text-3xl md:text-5xl mb-4 text-white">{total_chars:,} 汉字<span class="text-amber-400">就地展开</span></h2>
      <p class="font-sans-modern text-[#a8a5a0] text-lg max-w-3xl mb-10">核心主张、论据、反例、隐含前提、章节关系、个人实践——本章六问完整产出,无需跳转,在此就地阅读。点击下方 tab 切换。</p>

      <div class="tab-bar mb-10">
        <div class="flex flex-wrap gap-2">
          <template x-for="(t, i) in sixTabs" :key="i">
            <button class="filter-pill flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-sans-modern transition-all"
                    :class="activeQ === t.id ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-[#2a2a38] text-[#d4d2cf] hover:border-amber-500/40 hover:text-amber-400'"
                    @click="setActiveQ(t.id)">
              <span class="font-mono text-xs opacity-80" x-text="t.id"></span>
              <span class="font-medium" x-text="t.label"></span>
              <span class="text-xs opacity-60 hidden md:inline" x-text="`· ${{t.chars}}字`"></span>
            </button>
          </template>
        </div>
      </div>

      <div class="mb-8 p-4 rounded-lg bg-[#14141d] border border-[#2a2a38]">
        <div class="flex items-start gap-3">
          <div class="font-mono text-amber-400 text-xs flex-shrink-0 pt-0.5" x-text="currentTab.id"></div>
          <div>
            <div class="font-sans-modern font-medium text-white mb-1" x-text="currentTab.label"></div>
            <div class="text-sm text-[#a8a5a0]" x-text="currentTab.desc"></div>
          </div>
        </div>
      </div>

      <article class="prose-six tab-content" :key="activeQ" x-html="renderedQ"></article>

      <div class="mt-16 pt-8 border-t border-[#2a2a38] flex flex-wrap items-center justify-between gap-4">
        <div class="text-xs font-sans-modern text-[#6b6b73]">
          数据源:<span class="font-mono text-amber-400">chapters/{ch}/six_q/</span>
          <span>·</span> 严格按纪律 1 独立落盘
        </div>
        <button @click="scrollToTop()" class="font-sans-modern text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          回到章节顶部
        </button>
      </div>
    </div>
  </section>

  <div class="section-line max-w-6xl mx-auto"></div>
''')

    # CHAPTER NAV (prev/next)
    html_parts.append('''
  <!-- CHAPTER NAV -->
  <section class="px-6 lg:px-16 py-16">
    <div class="max-w-6xl mx-auto">
      <div class="grid md:grid-cols-2 gap-4">
''')
    if prev_link:
        html_parts.append(f'''        <a href="./{prev_link['slug']}.html" class="chapter-nav-card">
          <div class="font-sans-modern text-xs uppercase tracking-widest text-[#6b6b73]">← 上一章</div>
          <div class="font-mono text-amber-400 text-sm">CH {prev_link['num']}</div>
          <div class="text-white font-medium">{html_escape(prev_link['title'])}</div>
        </a>
''')
    else:
        html_parts.append('''        <a href="./index.html" class="chapter-nav-card">
          <div class="font-sans-modern text-xs uppercase tracking-widest text-[#6b6b73]">← 返回</div>
          <div class="font-mono text-amber-400 text-sm">INDEX</div>
          <div class="text-white font-medium">全书目录</div>
        </a>
''')
    if next_link:
        html_parts.append(f'''        <a href="./{next_link['slug']}.html" class="chapter-nav-card text-right">
          <div class="font-sans-modern text-xs uppercase tracking-widest text-[#6b6b73]">下一章 →</div>
          <div class="font-mono text-amber-400 text-sm">CH {next_link['num']}</div>
          <div class="text-white font-medium">{html_escape(next_link['title'])}</div>
        </a>
''')
    else:
        html_parts.append('''        <a href="./index.html" class="chapter-nav-card text-right">
          <div class="font-sans-modern text-xs uppercase tracking-widest text-[#6b6b73]">返回 →</div>
          <div class="font-mono text-amber-400 text-sm">INDEX</div>
          <div class="text-white font-medium">全书目录</div>
        </a>
''')
    html_parts.append('''      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="px-6 lg:px-16 py-16 border-t border-[#2a2a38]">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <div>
          <div class="font-sans-modern text-xs uppercase tracking-widest text-[#6b6b73] mb-3">本章</div>
          <h3 class="hero-cn text-xl text-white mb-2">''' + title_cn + '''</h3>
          <p class="text-sm text-[#a8a5a0]">学会提问 · 第 10 版 · 第 ''' + num + ''' 章</p>
        </div>
        <div>
          <div class="font-sans-modern text-xs uppercase tracking-widest text-[#6b6b73] mb-3">作者</div>
          <p class="text-[#d4d2cf]">Neil Browne · Stuart Keeley</p>
          <p class="text-sm text-[#a8a5a0] mt-1">30+ 年迭代 · 至第 10 版</p>
        </div>
        <div>
          <div class="font-sans-modern text-xs uppercase tracking-widest text-[#6b6b73] mb-3">数据源</div>
          <p class="text-sm text-[#a8a5a0] font-mono">chapters/''' + ch + '''/insights.md</p>
          <p class="text-sm text-[#a8a5a0] font-mono">chapters/''' + ch + '''/quotes.md</p>
        </div>
      </div>
      <div class="text-center text-xs font-sans-modern text-[#6b6b73] tracking-widest">
        智识图书馆 V2 · 阅读体验 · ''' + ch + '''
      </div>
    </div>
  </footer>
''')

    # Embedded markdown for six questions
    html_parts.append('''
  <!-- Embedded markdown source for §5 -->
''')
    for q_key in ["q1", "q2", "q3", "q4", "q5", "q6"]:
        if q_key in six_q:
            md_content = six_q[q_key]
            html_parts.append(f'  <script type="text/markdown" id="md-{q_key}">\n{md_content}\n  </script>\n')

    # Inject sixTabs
    six_tabs_json = json.dumps(six_tabs, ensure_ascii=False)
    html_parts.append(f'''
  <script>
    window.__SIX_TABS__ = {six_tabs_json};
  </script>
</body>
</html>
''')

    return "".join(html_parts)


def render_index(all_chapters: list) -> str:
    """生成全书入口页"""
    # 计算每章字数
    chapter_data = []
    for ch in all_chapters:
        try:
            data = read_chapter(ch)
            insights_file = CHAPTERS_DIR / ch / "insights.md"
            insights_chars = hanzi_count(insights_file.read_text(encoding="utf-8")) if insights_file.exists() else 0
            num, title_cn, title_en = TITLE_MAP[ch]
            stage_label, stage_n = STAGE_MAP[ch]
            subtitle = SUBTITLE_MAP[ch]
            chapter_data.append({
                "slug": ch,
                "num": num,
                "title_cn": title_cn,
                "title_en": title_en,
                "subtitle": subtitle,
                "stage_label": stage_label,
                "stage_n": stage_n,
                "chars": insights_chars,
            })
        except Exception as e:
            print(f"  warn: ch={ch} skip ({e})")

    total_chars = sum(c["chars"] for c in chapter_data)

    cards_html = []
    for c in chapter_data:
        cards_html.append(f'''      <a href="./{c["slug"]}.html" class="toc-card group">
        <div class="flex items-start justify-between mb-4">
          <span class="toc-num">{c["num"]}</span>
          <span class="stage-badge stage-{c["stage_n"]}">{c["stage_label"]}</span>
        </div>
        <h3 class="hero-cn text-lg md:text-xl mb-2 text-white leading-snug">{html_escape(c["title_cn"])}</h3>
        <p class="font-sans-modern text-xs uppercase tracking-widest text-[#6b6b73] mb-3">{c["title_en"]}</p>
        <p class="text-sm text-[#a8a5a0] leading-relaxed mb-4 min-h-[3em]">{html_escape(c["subtitle"])}</p>
        <div class="flex items-center justify-between text-xs font-sans-modern text-[#6b6b73] pt-3 border-t border-[#2a2a38]">
          <span class="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg>
            {c["chars"]:,} 汉字
          </span>
          <span class="text-amber-400 group-hover:translate-x-1 transition-transform">阅读 →</span>
        </div>
      </a>''')

    return f'''<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
  <script>
    (function(){{var s=localStorage.getItem('reader-theme');if(s==='light'||s==='dark'){{document.documentElement.setAttribute('data-theme',s);}}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){{document.documentElement.setAttribute('data-theme','dark');}}}})();
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>学会提问(原书第10版)· 交互式阅读</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600;700;900&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./assets/reader.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="./assets/reader.js"></script>
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body x-data="indexApp()" x-init="init()">

  <!-- Top bar -->
  <header class="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[#0a0a0f]/70 border-b border-[#2a2a38]/50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
          <span class="font-sans-modern text-xs font-bold text-amber-400">∞</span>
        </div>
        <div class="text-xs font-sans-modern text-[#a8a5a0]">
          <div class="text-[#6b6b73] uppercase tracking-widest text-[0.65rem]">智识图书馆 V2</div>
          <div class="text-white">学会提问 · 第 10 版</div>
        </div>
      </div>
      <button class="theme-toggle" @click="toggleTheme()" :title="theme === 'light' ? '切换到深色' : '切换到浅色'">
        <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        <svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      </button>
    </div>
  </header>

  <!-- HERO -->
  <section class="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-24 pb-32 overflow-hidden">
    <div class="absolute -top-40 -right-40 w-[800px] h-[800px] glow-amber rounded-full"></div>
    <div class="absolute -bottom-40 -left-40 w-[600px] h-[600px] glow-rose rounded-full opacity-40"></div>
    <div class="relative max-w-6xl mx-auto w-full z-10">
      <div class="hint-tag bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-8">ASKING THE RIGHT QUESTIONS · 10TH EDITION</div>
      <h1 class="hero-cn text-5xl md:text-7xl lg:text-8xl mb-8 max-w-5xl text-white leading-tight">
        学会<span class="text-amber-400">提问</span>
      </h1>
      <p class="font-sans-modern text-lg md:text-xl text-[#a8a5a0] max-w-3xl mb-12 leading-relaxed">
        Neil Browne &amp; Stuart Keeley · 第 10 版 · 30+ 年持续迭代<br>
        把"批判性思维"拆解为<strong class="text-white">一套环环相扣的关键问题</strong>——12 章工具链、{total_chars:,} 汉字深度产出。
      </p>
      <div class="grid md:grid-cols-4 gap-6 max-w-4xl mb-16">
        <div class="border-l border-amber-500/30 pl-4">
          <div class="font-mono text-3xl text-amber-400 mb-1">{len(chapter_data)}</div>
          <div class="font-sans-modern text-xs text-[#a8a5a0] uppercase tracking-wider">章节</div>
        </div>
        <div class="border-l border-amber-500/30 pl-4">
          <div class="font-mono text-3xl text-amber-400 mb-1">10</div>
          <div class="font-sans-modern text-xs text-[#a8a5a0] uppercase tracking-wider">关键问题</div>
        </div>
        <div class="border-l border-amber-500/30 pl-4">
          <div class="font-mono text-3xl text-amber-400 mb-1">13</div>
          <div class="font-sans-modern text-xs text-[#a8a5a0] uppercase tracking-wider">类常见谬误</div>
        </div>
        <div class="border-l border-amber-500/30 pl-4">
          <div class="font-mono text-3xl text-amber-400 mb-1">{total_chars//1000}K</div>
          <div class="font-sans-modern text-xs text-[#a8a5a0] uppercase tracking-wider">深度汉字</div>
        </div>
      </div>
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 pulse">
        <div class="font-sans-modern text-xs text-[#6b6b73] uppercase tracking-widest mb-2 text-center">向下查看 12 章</div>
        <svg class="mx-auto" width="20" height="32" viewBox="0 0 20 32" fill="none">
          <rect x="1" y="1" width="18" height="30" rx="9" stroke="#6b6b73" stroke-width="1"/>
          <circle cx="10" cy="10" r="2" fill="currentColor" style="color:var(--accent-amber)">
            <animate attributeName="cy" values="10;20;10" dur="2s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
    </div>
  </section>

  <!-- TOOL-CHAIN MAP (4 stages) -->
  <section class="px-6 lg:px-16 py-24 max-w-7xl mx-auto reveal">
    <div class="hint-tag bg-[#1a1a26] text-[#a8a5a0] border border-[#2a2a38] mb-6">§ 全书架构</div>
    <h2 class="hero-cn text-3xl md:text-5xl mb-4 text-white">12 章 · <span class="text-amber-400">四阶段工具链</span></h2>
    <p class="font-sans-modern text-[#a8a5a0] text-lg max-w-3xl mb-12">从精神底色到主动建设——批判性思维的完整路径。</p>
    <div class="grid md:grid-cols-4 gap-4">
      <div class="card rounded-xl p-5">
        <div class="stage-badge stage-1 mb-3">阶段 1</div>
        <h3 class="hero-cn text-lg text-white mb-2">精神底色</h3>
        <p class="text-xs text-[#a8a5a0] leading-relaxed">海绵 vs 淘金、强势 vs 弱势——工具进场前的思维校准。</p>
        <div class="mt-3 font-mono text-xs text-[#6b6b73]">CH 01</div>
      </div>
      <div class="card rounded-xl p-5">
        <div class="stage-badge stage-2 mb-3">阶段 2</div>
        <h3 class="hero-cn text-lg text-white mb-2">识别论证</h3>
        <p class="text-xs text-[#a8a5a0] leading-relaxed">论题 / 结论 / 理由 / 词义 / 假设——看清作者究竟说了什么。</p>
        <div class="mt-3 font-mono text-xs text-[#6b6b73]">CH 02 – 05</div>
      </div>
      <div class="card rounded-xl p-5">
        <div class="stage-badge stage-3 mb-3">阶段 3</div>
        <h3 class="hero-cn text-lg text-white mb-2">评价质量</h3>
        <p class="text-xs text-[#a8a5a0] leading-relaxed">谬误 / 证据 / 因果 / 数据——把论证拆到原子层面审查。</p>
        <div class="mt-3 font-mono text-xs text-[#6b6b73]">CH 06 – 10</div>
      </div>
      <div class="card rounded-xl p-5">
        <div class="stage-badge stage-4 mb-3">阶段 4</div>
        <h3 class="hero-cn text-lg text-white mb-2">主动建设</h3>
        <p class="text-xs text-[#a8a5a0] leading-relaxed">省略 / 多结论——从被动审查升级为主动构造判断。</p>
        <div class="mt-3 font-mono text-xs text-[#6b6b73]">CH 11 – 12</div>
      </div>
    </div>
  </section>

  <div class="section-line max-w-6xl mx-auto"></div>

  <!-- TOC GRID -->
  <section class="px-6 lg:px-16 py-24 max-w-7xl mx-auto reveal">
    <div class="hint-tag bg-[#1a1a26] text-[#a8a5a0] border border-[#2a2a38] mb-6">§ 目录</div>
    <h2 class="hero-cn text-3xl md:text-5xl mb-4 text-white"><span class="text-amber-400">12 章</span>交互阅读</h2>
    <p class="font-sans-modern text-[#a8a5a0] text-lg max-w-3xl mb-12">每一章一个独立的阅读体验,含核心主张、关键概念、章节金句和完整的六问深度产出(平均 1.5 万汉字)。</p>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
{chr(10).join(cards_html)}
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="px-6 lg:px-16 py-16 border-t border-[#2a2a38] mt-24">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <div>
          <div class="font-sans-modern text-xs uppercase tracking-widest text-[#6b6b73] mb-3">书籍</div>
          <h3 class="hero-cn text-xl text-white mb-2">学会提问(原书第 10 版)</h3>
          <p class="text-sm text-[#a8a5a0]">Asking the Right Questions, 10th Ed.</p>
        </div>
        <div>
          <div class="font-sans-modern text-xs uppercase tracking-widest text-[#6b6b73] mb-3">作者</div>
          <p class="text-[#d4d2cf]">Neil Browne · Stuart Keeley</p>
          <p class="text-sm text-[#a8a5a0] mt-1">30+ 年迭代 · 至第 10 版</p>
        </div>
        <div>
          <div class="font-sans-modern text-xs uppercase tracking-widest text-[#6b6b73] mb-3">原始产出</div>
          <p class="text-sm text-[#a8a5a0] font-mono">book_skeleton.md / book_essence.md</p>
          <p class="text-sm text-[#a8a5a0] font-mono">chapters/chXX/insights.md</p>
        </div>
      </div>
      <div class="text-center text-xs font-sans-modern text-[#6b6b73] tracking-widest">
        智识图书馆 V2 · 阅读体验 · 全书 {total_chars:,} 汉字深度产出
      </div>
    </div>
  </footer>

</body>
</html>
'''


# 主流程 --------------------------------------------------------

def main():
    chapters = sorted([c for c in TITLE_MAP.keys()])
    print(f"渲染 {BOOK_SLUG} · {len(chapters)} 章")

    for ch in chapters:
        if ch in SKIP_CHAPTERS:
            print(f"  [skip] {ch} (定制版,人工维护)")
            continue
        try:
            html = render_chapter(ch, chapters)
            out = READER_DIR / f"{ch}.html"
            out.write_text(html, encoding="utf-8")
            print(f"  ✓ {ch}.html ({len(html)//1024} KB)")
        except Exception as e:
            print(f"  ✗ {ch} ERROR: {e}")
            import traceback
            traceback.print_exc()

    # Index
    try:
        index_html = render_index(chapters)
        (READER_DIR / "index.html").write_text(index_html, encoding="utf-8")
        print(f"  ✓ index.html ({len(index_html)//1024} KB)")
    except Exception as e:
        print(f"  ✗ index.html ERROR: {e}")
        import traceback
        traceback.print_exc()

    print("完成")


if __name__ == "__main__":
    main()
