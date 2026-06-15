#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// Immersive Book Engine — Build Script
// Merges engine + book data into single-file HTML per book
// Auto-generates bookshelf homepage from book metadata
// Zero dependencies — uses only Node.js built-in modules
// ═══════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');

// Read engine files
const template = fs.readFileSync(path.join(SRC, 'engine', 'template.html'), 'utf8');
const engineCSS = fs.readFileSync(path.join(SRC, 'engine', 'engine.css'), 'utf8');
const engineJS = fs.readFileSync(path.join(SRC, 'engine', 'engine.js'), 'utf8');
const componentsJS = fs.readFileSync(path.join(SRC, 'engine', 'components.js'), 'utf8');

// Ensure dist exists
fs.mkdirSync(DIST, { recursive: true });

// Process each book
const booksDir = path.join(SRC, 'books');
const books = fs.readdirSync(booksDir).filter(f =>
  fs.statSync(path.join(booksDir, f)).isDirectory()
);

console.log(`\n📚 Building ${books.length} book(s)...\n`);

// Collect book metadata for homepage generation
const booksMeta = [];

books.forEach(bookSlug => {
  const bookDir = path.join(booksDir, bookSlug);
  const dataPath = path.join(bookDir, 'data.js');

  if (!fs.existsSync(dataPath)) {
    console.log(`⏭  Skipping ${bookSlug}/ (no data.js)`);
    return;
  }

  const dataJS = fs.readFileSync(dataPath, 'utf8');
  const customPath = path.join(bookDir, 'custom.js');
  const customJS = fs.existsSync(customPath)
    ? fs.readFileSync(customPath, 'utf8')
    : '// No custom components';

  // Extract metadata from data.js using regex
  const extract = (key) => {
    const m = dataJS.match(new RegExp(`${key}:\\s*'([^']*)'`));
    return m ? m[1] : null;
  };

  const title = extract('title') || bookSlug;
  const titleEn = extract('titleEn') || '';
  const author = extract('author') || '';
  const authorEn = extract('authorEn') || '';

  // Extract shelf config
  const shelfBlock = dataJS.match(/shelf:\s*\{([\s\S]*?)\}/);
  let shelf = { emoji: '📕', gradient: 'linear-gradient(135deg, #333 0%, #666 100%)', description: '', stats: [] };
  if (shelfBlock) {
    const emojiM = shelfBlock[1].match(/emoji:\s*'([^']*)'/);
    const gradientM = shelfBlock[1].match(/gradient:\s*'([^']*)'/);
    const descM = shelfBlock[1].match(/description:\s*'([^']*)'/);
    const statsM = shelfBlock[1].match(/stats:\s*\[([\s\S]*?)\]/);
    if (emojiM) shelf.emoji = emojiM[1];
    if (gradientM) shelf.gradient = gradientM[1];
    if (descM) shelf.description = descM[1];
    if (statsM) {
      shelf.stats = statsM[1].match(/'([^']*)'/g)?.map(s => s.replace(/'/g, '')) || [];
    }
  }

  booksMeta.push({ slug: bookSlug, title, titleEn, author, authorEn, shelf });

  // Build HTML
  // NOTE: Use function replacement to avoid $', $&, $` special patterns
  // in content strings being misinterpreted as replacement directives.
  let html = template
    .replace('<!-- BOOK_TITLE -->', () => `${title} · 沉浸式深度导读`)
    .replace('<!-- ENGINE_CSS -->', () => engineCSS)
    .replace('<!-- COMPONENTS_JS -->', () => componentsJS)
    .replace('<!-- ENGINE_JS -->', () => engineJS)
    .replace('<!-- BOOK_DATA -->', () => dataJS)
    .replace('<!-- BOOK_CUSTOM -->', () => customJS);

  // Write output
  const outDir = path.join(DIST, bookSlug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);

  const sizeKB = (Buffer.byteLength(html) / 1024).toFixed(0);
  console.log(`  ✅ dist/${bookSlug}/index.html (${sizeKB} KB)`);
});

// ═══════════════════════════════════════════════════════════════
// Auto-generate bookshelf homepage
// ═══════════════════════════════════════════════════════════════

function generateHomepage(booksMeta) {
  const bookCards = booksMeta.map((b, i) => `
  <a class="book-card" href="./${b.slug}/" style="animation-delay: ${0.6 + i * 0.2}s;">
    <div class="book-card-banner" style="background: ${b.shelf.gradient};">
      <span class="book-card-emoji">${b.shelf.emoji}</span>
      <div style="text-align:center;">
        <div class="book-card-part">${b.titleEn}</div>
        <div class="book-card-banner-title">${b.title}</div>
      </div>
    </div>
    <div class="book-card-body">
      <div class="book-card-title">${b.title}</div>
      <div class="book-card-author">${b.author}${b.authorEn ? ' · ' + b.authorEn : ''}</div>
      <p class="book-card-desc">${b.shelf.description}</p>
      <div class="book-card-meta">
        ${b.shelf.stats.map(s => `<span class="book-card-tag">${s}</span>`).join('\n        ')}
      </div>
    </div>
    <div class="book-card-arrow">→</div>
  </a>`).join('\n');

  const comingSoon = `
  <div class="book-card coming-soon" style="animation-delay: ${0.6 + booksMeta.length * 0.2}s;">
    <div class="book-card-banner" style="background: linear-gradient(135deg, #333 0%, #666 100%);">
      <div style="text-align:center;">
        <div class="book-card-part">COMING SOON</div>
        <div class="book-card-banner-title">即将上线</div>
      </div>
    </div>
    <div class="book-card-body">
      <div class="book-card-title">更多书籍，敬请期待</div>
      <div class="book-card-author">持续更新中</div>
      <p class="book-card-desc">每一本改变认知的经典，都将被重建为沉浸式的交互体验。如果你有想看的书，欢迎提出建议。</p>
      <div class="book-card-meta">
        <span class="book-card-tag">? 场景</span>
        <span class="book-card-tag">待定</span>
      </div>
    </div>
  </div>`;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>沉浸式深度导读 · Immersive Book Engine</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200;300;400;600;700;900&family=Noto+Sans+SC:wght@300;400;500;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #F5F0E8;
  --fg: #1A1A1A;
  --fg-secondary: #5C5546;
  --accent: #B8860B;
  --accent-dim: rgba(184,134,11,0.08);
  --border: rgba(0,0,0,0.06);
  --serif: 'Noto Serif SC', 'Songti SC', Georgia, serif;
  --sans: 'Noto Sans SC', 'Inter', system-ui, -apple-system, sans-serif;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

html {
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
}

body {
  font-family: var(--sans);
  background: var(--bg);
  color: var(--fg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

::selection { background: var(--accent); color: #fff; }

/* ── Header ── */
.header {
  text-align: center;
  padding: clamp(4rem, 12vw, 8rem) 2rem clamp(2rem, 6vw, 4rem);
  max-width: 700px;
}

.header-overline {
  font-family: var(--sans);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeUp 0.8s var(--ease-out) 0.2s forwards;
}

.header-title {
  font-family: var(--serif);
  font-size: clamp(2.2rem, 7vw, 4rem);
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 1rem;
  opacity: 0;
  animation: fadeUp 0.8s var(--ease-out) 0.4s forwards;
}

.header-sub {
  font-size: 0.85rem;
  color: var(--fg-secondary);
  line-height: 1.9;
  max-width: 500px;
  margin: 0 auto;
  opacity: 0;
  animation: fadeUp 0.8s var(--ease-out) 0.6s forwards;
}

.header-count {
  display: inline-block;
  margin-top: 1.5rem;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--accent);
  padding: 0.4rem 1rem;
  background: var(--accent-dim);
  border-radius: 20px;
  opacity: 0;
  animation: fadeUp 0.8s var(--ease-out) 0.7s forwards;
}

/* ── Book Grid ── */
.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 900px;
  width: 100%;
  padding: 0 2rem 6rem;
}

.book-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--border);
  transition: transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out);
  text-decoration: none;
  color: var(--fg);
  opacity: 0;
  animation: fadeUp 0.8s var(--ease-out) forwards;
}

.book-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
}

.book-card-banner {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.book-card-banner::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to top, #fff, transparent);
}

.book-card-emoji {
  font-size: 4rem;
  filter: saturate(0.7);
  opacity: 0.15;
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
}

.book-card-part {
  font-family: var(--sans);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #fff;
  opacity: 0.8;
  position: relative;
  z-index: 1;
}

.book-card-banner-title {
  font-family: var(--serif);
  font-size: 1.8rem;
  font-weight: 900;
  color: #fff;
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 2rem;
  line-height: 1.3;
}

.book-card-body {
  padding: 1.5rem 1.8rem 1.8rem;
}

.book-card-title {
  font-family: var(--serif);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.book-card-author {
  font-size: 0.7rem;
  color: var(--fg-secondary);
  margin-bottom: 1rem;
}

.book-card-desc {
  font-size: 0.78rem;
  line-height: 1.85;
  color: var(--fg-secondary);
  margin-bottom: 1.2rem;
}

.book-card-meta {
  display: flex;
  gap: 1.2rem;
  font-size: 0.65rem;
  color: var(--accent);
  font-weight: 600;
}

.book-card-tag {
  padding: 0.25rem 0.6rem;
  background: var(--accent-dim);
  border-radius: 4px;
}

.book-card-arrow {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 0.9rem;
  transition: all 0.3s var(--ease-out);
}

.book-card:hover .book-card-arrow {
  background: var(--accent);
  color: #fff;
  transform: translateX(3px);
}

/* ── Coming Soon ── */
.book-card.coming-soon {
  opacity: 0;
  animation: fadeUp 0.8s var(--ease-out) forwards;
}
.book-card.coming-soon:hover { transform: none; box-shadow: none; }
.book-card.coming-soon .book-card-banner { opacity: 0.5; }
.book-card.coming-soon .book-card-body { opacity: 0.5; }
.book-card.coming-soon .book-card-arrow { display: none; }
.book-card.coming-soon { pointer-events: none; }

/* ── Footer ── */
.shelf-footer {
  text-align: center;
  padding: 2rem;
  font-size: 0.65rem;
  color: var(--fg-secondary);
  opacity: 0.4;
  line-height: 2;
}

/* ── Animations ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

@media (max-width: 600px) {
  .book-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem 4rem;
  }
}
</style>
</head>
<body>

<header class="header">
  <div class="header-overline">Immersive Book Engine</div>
  <h1 class="header-title">沉浸式深度导读</h1>
  <p class="header-sub">将经典书籍拆解为沉浸式的滚动体验——<br>不是摘要，不是书评，而是完整的逻辑链重建。<br>每一本书，都值得被这样阅读。</p>
  <div class="header-count">已收录 ${booksMeta.length} 本书</div>
</header>

<main class="book-grid">
${bookCards}
${comingSoon}
</main>

<footer class="shelf-footer">
  沉浸式深度导读 · Immersive Book Engine<br>
  用交互重建逻辑，用滚动取代翻页
</footer>

</body>
</html>`;
}

const homepageHTML = generateHomepage(booksMeta);
fs.writeFileSync(path.join(DIST, 'index.html'), homepageHTML);
console.log(`  ✅ dist/index.html (auto-generated bookshelf · ${booksMeta.length} books)`);

console.log(`\n✨ Build complete!\n`);
