#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// Immersive Book Engine — Build Script
// Merges engine + book data into single-file HTML per book
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

  // Extract title from data.js
  const titleMatch = dataJS.match(/title:\s*['"](.+?)['"]/);
  const title = titleMatch ? titleMatch[1] : bookSlug;

  // Build HTML
  let html = template
    .replace('<!-- BOOK_TITLE -->', `${title} · 沉浸式深度导读`)
    .replace('<!-- ENGINE_CSS -->', engineCSS)
    .replace('<!-- COMPONENTS_JS -->', componentsJS)
    .replace('<!-- ENGINE_JS -->', engineJS)
    .replace('<!-- BOOK_DATA -->', dataJS)
    .replace('<!-- BOOK_CUSTOM -->', customJS);

  // Write output
  const outDir = path.join(DIST, bookSlug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);

  const sizeKB = (Buffer.byteLength(html) / 1024).toFixed(0);
  console.log(`  ✅ dist/${bookSlug}/index.html (${sizeKB} KB)`);
});

// Copy bookshelf homepage
const indexSrc = path.join(__dirname, 'index.html');
if (fs.existsSync(indexSrc)) {
  fs.copyFileSync(indexSrc, path.join(DIST, 'index.html'));
  console.log(`  ✅ dist/index.html (bookshelf homepage)`);
}

console.log(`\n✨ Build complete!\n`);
