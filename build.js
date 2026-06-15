#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// 智识图书馆 · 统一构建脚本
//   - 跑 v1 build(archive/v1/build.js)生成所有 v1 老书的 single-file HTML
//   - 把 v2 books/{slug}/reader/ 复制到 dist/{slug}/ 形成多文件 reader
//   - 生成统一图书馆首页(v1 旧书 + v2 新书)
// ═══════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const V1_DIR = path.join(ROOT, 'archive', 'v1');
const V1_DIST = path.join(V1_DIR, 'dist');
const V2_BOOKS_DIR = path.join(ROOT, 'books');

// --- 工具 ---
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}
function hanziCount(t) { return (t.match(/[一-鿿]/g) || []).length; }
function htmlEscape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

console.log('\n智识图书馆 · 统一构建开始\n');

// --- 清理 dist ---
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

// ═══════════════════════════════════════════════════════════════
// PHASE 1 · 跑 v1 build(归档的老引擎)
// ═══════════════════════════════════════════════════════════════
console.log('▶ Phase 1 · 构建 v1 老书(archive/v1/build.js)');

const v1Books = [];
if (fs.existsSync(path.join(V1_DIR, 'build.js'))) {
  try {
    execSync('node build.js', { cwd: V1_DIR, stdio: 'inherit' });

    // copy archive/v1/dist/{slug}/ → dist/{slug}/  (skip v1 index.html)
    if (fs.existsSync(V1_DIST)) {
      for (const entry of fs.readdirSync(V1_DIST, { withFileTypes: true })) {
        if (entry.name === 'index.html') continue; // 跳过 v1 旧首页
        const s = path.join(V1_DIST, entry.name);
        const d = path.join(DIST, entry.name);
        if (entry.isDirectory()) {
          copyDir(s, d);
          // 读 v1 书的 meta(尝试从 src/books/{slug}/data.js 提取)
          v1Books.push(readV1BookMeta(entry.name));
        } else {
          fs.copyFileSync(s, d);
        }
      }
      console.log(`  ✓ ${v1Books.length} 本 v1 书已复制到 dist/`);
    }
  } catch (err) {
    console.error('  ✗ v1 build 失败:', err.message);
  }
} else {
  console.log('  (无 archive/v1/build.js,跳过 v1)');
}

// ═══════════════════════════════════════════════════════════════
// PHASE 2 · 复制 v2 books/{slug}/reader/ → dist/{slug}/
// ═══════════════════════════════════════════════════════════════
console.log('\n▶ Phase 2 · 部署 v2 交互式 reader');

const v2Books = [];
if (fs.existsSync(V2_BOOKS_DIR)) {
  for (const slug of fs.readdirSync(V2_BOOKS_DIR)) {
    const bookDir = path.join(V2_BOOKS_DIR, slug);
    if (!fs.statSync(bookDir).isDirectory()) continue;

    const readerDir = path.join(bookDir, 'reader');
    if (!fs.existsSync(readerDir)) {
      console.log(`  跳过 ${slug}(无 reader/)`);
      continue;
    }

    const metaPath = path.join(bookDir, 'meta.json');
    const meta = fs.existsSync(metaPath)
      ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
      : { slug, title: slug, author: '' };

    const chapterFiles = fs.readdirSync(readerDir).filter(f => /^ch\d+\.html$/.test(f));
    let totalChars = 0;
    const chaptersDir = path.join(bookDir, 'chapters');
    if (fs.existsSync(chaptersDir)) {
      for (const ch of fs.readdirSync(chaptersDir)) {
        const ins = path.join(chaptersDir, ch, 'insights.md');
        if (fs.existsSync(ins)) totalChars += hanziCount(fs.readFileSync(ins, 'utf8'));
      }
    }

    const destDir = path.join(DIST, slug);
    copyDir(readerDir, destDir);

    v2Books.push({
      slug,
      title: meta.title || slug,
      author: meta.author || '',
      chapters: chapterFiles.length,
      totalChars,
      url: `./${slug}/index.html`,
      version: 'v2'
    });
    console.log(`  ✓ ${slug}(${chapterFiles.length} 章 · ${totalChars.toLocaleString()} 汉字 · 交互式 reader)`);
  }
}

// ═══════════════════════════════════════════════════════════════
// PHASE 3 · 生成统一首页 dist/index.html(v1 + v2)
// ═══════════════════════════════════════════════════════════════
console.log('\n▶ Phase 3 · 生成统一图书馆首页');

const allBooks = [...v2Books, ...v1Books];
const homepage = renderHomepage(v2Books, v1Books);
fs.writeFileSync(path.join(DIST, 'index.html'), homepage);
console.log(`  ✓ dist/index.html(${v2Books.length} 本 v2 交互式 + ${v1Books.length} 本 v1 沉浸式 = ${allBooks.length} 本)`);

console.log(`\n构建完成 → ${DIST}\n`);

// ═══════════════════════════════════════════════════════════════
// 辅助:从 v1 data.js 抽取书 meta
// ═══════════════════════════════════════════════════════════════
function readV1BookMeta(slug) {
  const dataPath = path.join(V1_DIR, 'src', 'books', slug, 'data.js');
  let title = slug, author = '', subtitle = '';
  if (fs.existsSync(dataPath)) {
    const code = fs.readFileSync(dataPath, 'utf8');
    const tm = code.match(/title:\s*['"`]([^'"`]+)['"`]/);
    const am = code.match(/author:\s*['"`]([^'"`]+)['"`]/);
    const sm = code.match(/subtitle:\s*['"`]([^'"`]+)['"`]/);
    if (tm) title = tm[1];
    if (am) author = am[1];
    if (sm) subtitle = sm[1];
  }
  return { slug, title, author, subtitle, url: `./${slug}/index.html`, version: 'v1' };
}

// ═══════════════════════════════════════════════════════════════
// 图书馆统一首页 HTML
// ═══════════════════════════════════════════════════════════════
function renderHomepage(v2Books, v1Books) {
  const v2Cards = v2Books.map((b, i) => `
      <a href="${b.url}" class="book-card v2">
        <div class="book-badge">V2 · INTERACTIVE</div>
        <div class="book-num">${String(i + 1).padStart(2, '0')}</div>
        <div class="book-meta">
          <h3 class="book-title">${htmlEscape(b.title)}</h3>
          <p class="book-author">${htmlEscape(b.author)}</p>
          <div class="book-stats">
            <span>${b.chapters} 章</span>
            <span class="dot">·</span>
            <span>${b.totalChars.toLocaleString()} 汉字深度产出</span>
            <span class="dot">·</span>
            <span>交互式 · 双主题</span>
          </div>
        </div>
        <div class="book-cta">进入阅读 →</div>
      </a>`).join('');

  const v1Cards = v1Books.map((b, i) => `
      <a href="${b.url}" class="book-card v1">
        <div class="book-badge v1-badge">V1 · IMMERSIVE</div>
        <div class="book-num">${String(i + 1).padStart(2, '0')}</div>
        <div class="book-meta">
          <h3 class="book-title">${htmlEscape(b.title)}</h3>
          <p class="book-author">${htmlEscape(b.author || b.subtitle || '—')}</p>
          <div class="book-stats">
            <span>滚动式沉浸阅读</span>
          </div>
        </div>
        <div class="book-cta">进入阅读 →</div>
      </a>`).join('');

  return `<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
  <script>
    (function(){var s=localStorage.getItem('reader-theme');if(s==='light'||s==='dark'){document.documentElement.setAttribute('data-theme',s);}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}})();
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>智识图书馆</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600;700;900&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root, :root[data-theme="dark"] {
      --bg-primary: #0f0e0a; --bg-secondary: #181612; --bg-card: #1f1c17;
      --bg-card-hover: #28241e; --border: #2e2a23;
      --text-primary: #e8e2d4; --text-secondary: #a8a195; --text-tertiary: #6b6558;
      --accent-amber: #f59e0b; --accent-amber-soft: #fbbf24;
      --accent-rose: #f43f5e; --accent-violet: #8b5cf6;
      --shadow-card: 0 0 0 transparent;
    }
    :root[data-theme="light"] {
      --bg-primary: #fbf8f1; --bg-secondary: #f3eee3; --bg-card: #ffffff;
      --bg-card-hover: #faf6ec; --border: #e6dcc7;
      --text-primary: #2a2620; --text-secondary: #5a544a; --text-tertiary: #968f80;
      --accent-amber: #b45309; --accent-amber-soft: #c2410c;
      --accent-rose: #be123c; --accent-violet: #6d28d9;
      --shadow-card: 0 1px 2px rgba(42, 38, 32, 0.04);
    }
    * { -webkit-font-smoothing: antialiased; box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; transition: background 0.4s, color 0.4s; }
    body {
      font-family: 'Noto Serif SC', 'Songti SC', serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.8;
      letter-spacing: 0.02em;
      min-height: 100vh;
    }
    .font-sans { font-family: 'Inter', 'PingFang SC', sans-serif; letter-spacing: -0.01em; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    ::selection { background: rgba(180, 83, 9, 0.2); }
    [data-theme="dark"] ::selection { background: rgba(245, 158, 11, 0.3); }

    .site-header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 50;
      backdrop-filter: blur(12px);
      background: rgba(251, 248, 241, 0.85);
      border-bottom: 1px solid var(--border);
      padding: 1rem 2rem;
      display: flex; align-items: center; justify-content: space-between;
    }
    [data-theme="dark"] .site-header { background: rgba(15, 14, 10, 0.85); }
    .site-logo { display: flex; align-items: center; gap: 0.75rem; font-family: 'Inter', sans-serif; }
    .site-logo .badge {
      width: 36px; height: 36px; border-radius: 8px;
      background: rgba(180, 83, 9, 0.12); border: 1px solid rgba(180, 83, 9, 0.3);
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 14px; color: var(--accent-amber);
    }
    [data-theme="dark"] .site-logo .badge { background: rgba(245, 158, 11, 0.12); border-color: rgba(245, 158, 11, 0.3); }
    .site-logo .label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-tertiary); }
    .site-logo .name { font-weight: 600; font-size: 0.9rem; color: var(--text-primary); margin-top: 2px; }
    .theme-toggle {
      width: 38px; height: 38px; border-radius: 999px;
      border: 1px solid var(--border); background: transparent;
      color: var(--text-secondary); cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center;
      transition: all 0.3s;
    }
    .theme-toggle:hover { color: var(--accent-amber); border-color: var(--accent-amber); }
    .theme-toggle .moon { display: inline; }
    .theme-toggle .sun { display: none; }
    [data-theme="light"] .theme-toggle .moon { display: none; }
    [data-theme="light"] .theme-toggle .sun { display: inline; }

    .hero {
      padding: 8rem 2rem 4rem;
      max-width: 1100px;
      margin: 0 auto;
      position: relative;
    }
    .hero .glow {
      position: absolute; top: -100px; right: -100px;
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(180, 83, 9, 0.06), transparent 60%);
      pointer-events: none;
    }
    [data-theme="dark"] .hero .glow { background: radial-gradient(circle, rgba(245, 158, 11, 0.15), transparent 60%); }
    .hero-tag {
      display: inline-block;
      padding: 4px 12px; border-radius: 999px;
      background: rgba(180, 83, 9, 0.1);
      border: 1px solid rgba(180, 83, 9, 0.3);
      color: var(--accent-amber);
      font-family: 'Inter', sans-serif;
      font-size: 0.7rem; font-weight: 600;
      letter-spacing: 0.15em; text-transform: uppercase;
      margin-bottom: 2rem;
    }
    [data-theme="dark"] .hero-tag { background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.3); }
    .hero h1 {
      font-family: 'Noto Serif SC', serif;
      font-weight: 900;
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      line-height: 1.05;
      letter-spacing: 0.02em;
      margin-bottom: 1.5rem;
      color: var(--text-primary);
    }
    .hero h1 .accent { color: var(--accent-amber); }
    .hero-sub {
      font-family: 'Inter', sans-serif;
      font-size: 1.05rem;
      color: var(--text-secondary);
      max-width: 700px;
      line-height: 1.7;
      margin-bottom: 3rem;
    }
    .hero-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1.5rem;
      max-width: 800px;
    }
    .stat { border-left: 2px solid rgba(180, 83, 9, 0.3); padding-left: 1rem; }
    [data-theme="dark"] .stat { border-left-color: rgba(245, 158, 11, 0.3); }
    .stat-num { font-family: 'JetBrains Mono', monospace; font-size: 2rem; color: var(--accent-amber); margin-bottom: 4px; }
    .stat-label { font-family: 'Inter', sans-serif; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-secondary); }

    .books-section {
      max-width: 1100px;
      margin: 0 auto;
      padding: 3rem 2rem 4rem;
    }
    .section-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border), transparent);
      max-width: 600px;
      margin: 0 auto 3rem;
    }
    .section-tag {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 6px;
      background: var(--bg-secondary);
      color: var(--text-secondary);
      font-family: 'Inter', sans-serif;
      font-size: 0.7rem; font-weight: 600;
      letter-spacing: 0.15em; text-transform: uppercase;
      margin-bottom: 1.25rem;
    }
    .section-title {
      font-family: 'Noto Serif SC', serif;
      font-weight: 800;
      font-size: clamp(1.75rem, 3.5vw, 2.5rem);
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }
    .section-title .accent { color: var(--accent-amber); }
    .section-sub {
      font-family: 'Inter', sans-serif;
      color: var(--text-secondary);
      max-width: 600px;
      margin-bottom: 2.5rem;
      line-height: 1.7;
    }
    .book-grid { display: grid; gap: 1rem; }
    .book-card {
      display: grid;
      grid-template-columns: 64px 1fr auto;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem 2rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 0.875rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: var(--shadow-card);
      position: relative; overflow: hidden;
    }
    .book-card::before {
      content: '';
      position: absolute; top: 0; left: 0; bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, var(--accent-amber), transparent);
      transform: scaleY(0); transform-origin: top;
      transition: transform 0.5s;
    }
    .book-card.v1::before { background: linear-gradient(180deg, var(--accent-violet), transparent); }
    .book-card:hover { background: var(--bg-card-hover); border-color: rgba(180, 83, 9, 0.4); transform: translateY(-2px); }
    [data-theme="dark"] .book-card:hover { border-color: rgba(245, 158, 11, 0.4); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
    [data-theme="light"] .book-card:hover { box-shadow: 0 6px 20px rgba(42, 38, 32, 0.08); }
    .book-card:hover::before { transform: scaleY(1); }
    .book-card.v1:hover { border-color: rgba(109, 40, 217, 0.4); }
    [data-theme="dark"] .book-card.v1:hover { border-color: rgba(139, 92, 246, 0.4); }
    .book-badge {
      position: absolute; top: 1rem; right: 1.5rem;
      font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 700;
      letter-spacing: 0.15em;
      color: var(--accent-amber);
      background: rgba(180, 83, 9, 0.08);
      border: 1px solid rgba(180, 83, 9, 0.25);
      padding: 2px 8px; border-radius: 4px;
    }
    [data-theme="dark"] .book-badge { background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.3); }
    .book-badge.v1-badge { color: var(--accent-violet); background: rgba(109, 40, 217, 0.08); border-color: rgba(109, 40, 217, 0.25); }
    [data-theme="dark"] .book-badge.v1-badge { background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.3); }
    .book-num {
      font-family: 'Inter', sans-serif;
      font-weight: 200; font-size: 2.75rem; line-height: 1;
      color: var(--accent-amber); opacity: 0.45;
    }
    .book-card.v1 .book-num { color: var(--accent-violet); }
    .book-title {
      font-family: 'Noto Serif SC', serif;
      font-weight: 700; font-size: 1.25rem;
      color: var(--text-primary); margin-bottom: 0.35rem; line-height: 1.3;
    }
    .book-author {
      font-family: 'Inter', sans-serif; font-size: 0.82rem;
      color: var(--text-secondary); margin-bottom: 0.6rem;
    }
    .book-stats {
      font-family: 'Inter', sans-serif; font-size: 0.72rem;
      color: var(--text-tertiary);
      display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem;
    }
    .book-stats .dot { opacity: 0.5; }
    .book-cta {
      font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 600;
      color: var(--accent-amber); transition: transform 0.3s;
      white-space: nowrap;
    }
    .book-card.v1 .book-cta { color: var(--accent-violet); }
    .book-card:hover .book-cta { transform: translateX(4px); }

    @media (max-width: 720px) {
      .book-card { grid-template-columns: 48px 1fr; padding: 1.25rem 1.25rem; gap: 1rem; }
      .book-num { font-size: 2rem; }
      .book-title { font-size: 1.05rem; }
      .book-badge { font-size: 0.55rem; padding: 2px 6px; top: 0.6rem; right: 0.75rem; }
      .book-cta { grid-column: 2; padding-top: 0.25rem; }
    }

    .site-footer {
      border-top: 1px solid var(--border);
      padding: 3rem 2rem;
      text-align: center;
      color: var(--text-tertiary);
      font-family: 'Inter', sans-serif;
      font-size: 0.75rem;
      letter-spacing: 0.1em;
    }
    .site-footer a { color: var(--accent-amber); text-decoration: none; }
    .site-footer a:hover { text-decoration: underline; }
  </style>
</head>
<body>

  <header class="site-header">
    <div class="site-logo">
      <div class="badge">∞</div>
      <div>
        <div class="label">智识图书馆</div>
        <div class="name">Intellectual Reading Library</div>
      </div>
    </div>
    <button class="theme-toggle" onclick="toggleTheme()" aria-label="切换主题">
      <svg class="moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      <svg class="sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
    </button>
  </header>

  <section class="hero">
    <div class="glow"></div>
    <div class="hero-tag">智识图书馆 · INTELLECTUAL READING LIBRARY</div>
    <h1>把每本书读到<span class="accent">原子层面</span></h1>
    <p class="hero-sub">
      两代阅读引擎共存:<strong>V2 交互式阅读</strong>(每章六问深度产出 + 双主题切换 + 完整就地展开)与 <strong>V1 沉浸式滚动</strong>(将书拆为逻辑链重建的故事场景),按你的偏好选择进入方式。
    </p>
    <div class="hero-stats">
      <div class="stat"><div class="stat-num">${v2Books.length + v1Books.length}</div><div class="stat-label">本书</div></div>
      <div class="stat"><div class="stat-num">${v2Books.length}</div><div class="stat-label">V2 交互式</div></div>
      <div class="stat"><div class="stat-num">${v1Books.length}</div><div class="stat-label">V1 沉浸式</div></div>
      <div class="stat"><div class="stat-num">${(v2Books.reduce((s,b)=>s+b.totalChars,0)/1000).toFixed(0)}K+</div><div class="stat-label">V2 深度汉字</div></div>
    </div>
  </section>

  ${v2Books.length > 0 ? `
  <div class="section-divider"></div>
  <section class="books-section">
    <div class="section-tag">V2 · INTERACTIVE READER</div>
    <h2 class="section-title">交互式<span class="accent">深度阅读</span></h2>
    <p class="section-sub">每本书都是一个独立的交互应用——双主题(浅色护眼 / 深色夜读)、章节金句、关键概念、完整六问就地展开。</p>
    <div class="book-grid">${v2Cards}\n    </div>
  </section>` : ''}

  ${v1Books.length > 0 ? `
  <div class="section-divider"></div>
  <section class="books-section">
    <div class="section-tag">V1 · IMMERSIVE SCROLL</div>
    <h2 class="section-title">沉浸式<span class="accent">滚动叙事</span></h2>
    <p class="section-sub">将经典书籍拆解为滚动场景体验——不是摘要,而是完整的逻辑链重建。每一本书,都值得被这样阅读。</p>
    <div class="book-grid">${v1Cards}\n    </div>
  </section>` : ''}

  <footer class="site-footer">
    智识图书馆 · <a href="https://github.com/learnpracticebuild-lang/sapiens-immersive" target="_blank">GitHub</a> · V1 + V2 双引擎
  </footer>

  <script>
    function toggleTheme() {
      const cur = document.documentElement.getAttribute('data-theme') || 'light';
      const next = cur === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('reader-theme', next); } catch(e) {}
    }
  </script>
</body>
</html>
`;
}
