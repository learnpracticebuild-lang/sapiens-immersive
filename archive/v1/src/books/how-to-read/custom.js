// ═══════════════════════════════════════════════════════════════
// HOW TO READ A BOOK — Custom Components & Styles
// Book-specific visualizations, animations, and observers
// ═══════════════════════════════════════════════════════════════

// ── CUSTOM CSS ──────────────────────────────────────────────────
const CUSTOM_CSS = `
/* ═══════════════════════════════════════════════════════
   SVG PYRAMID VISUALIZATION
   ═══════════════════════════════════════════════════════ */
.svg-pyramid { max-width: 500px; margin: 0 auto 20px; }
.svg-pyramid svg { width: 100%; height: auto; }

.pyramid-detail {
  margin-top: 24px;
  padding: 24px;
  border-radius: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  display: none;
}
.pyramid-detail.visible { display: block; }
.pyramid-detail h4 {
  font-family: var(--serif);
  font-size: 16px;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 12px;
}
.pyramid-detail ul { list-style: none; padding: 0; }
.pyramid-detail li {
  font-size: 14px;
  line-height: 1.8;
  padding: 4px 0;
  padding-left: 20px;
  position: relative;
}
.pyramid-detail li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 12px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  opacity: .4;
}

/* ═══════════════════════════════════════════════════════
   RULES GRID (15 Rules of Analytical Reading)
   ═══════════════════════════════════════════════════════ */
.rules-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin: 24px 0;
}
.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 20px;
  border-radius: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  transition: all .3s;
  cursor: default;
}
.rule-item:hover { border-color: var(--accent); }
.rule-num {
  font-family: var(--inter);
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: var(--accent);
  min-width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.rule-text {
  font-family: var(--serif);
  font-size: 14px;
  line-height: 1.7;
}
.rule-stage {
  font-size: 11px;
  color: var(--accent);
  font-family: var(--inter);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

/* ═══════════════════════════════════════════════════════
   COMPARISON BARS (Active vs Passive Reading)
   ═══════════════════════════════════════════════════════ */
.htr-comparison-section {
  margin: 48px 0;
  padding: 36px;
  border-radius: 20px;
  background: var(--card-bg);
  border: 1px solid var(--border);
}
.htr-comp-title {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}
.htr-comp-toggle {
  display: flex;
  justify-content: center;
  gap: 0;
  margin-bottom: 24px;
}
.htr-comp-btn {
  padding: 10px 24px;
  border: 1.5px solid var(--border);
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  font-family: var(--sans);
  transition: all .3s;
  color: var(--fg);
}
.htr-comp-btn:first-child { border-radius: 20px 0 0 20px; }
.htr-comp-btn:last-child { border-radius: 0 20px 20px 0; }
.htr-comp-btn.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
.htr-comp-bars { display: flex; flex-direction: column; gap: 14px; }
.htr-comp-row { display: flex; align-items: center; gap: 12px; }
.htr-comp-label {
  min-width: 80px;
  font-size: 13px;
  font-family: var(--sans);
  text-align: right;
  color: var(--muted-fg);
}
.htr-comp-bar-track {
  flex: 1;
  height: 28px;
  background: rgba(0,0,0,0.04);
  border-radius: 14px;
  overflow: hidden;
  position: relative;
}
.htr-comp-bar-fill {
  height: 100%;
  border-radius: 14px;
  transition: width .8s var(--ease-out);
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  min-width: 40px;
}

/* ═══════════════════════════════════════════════════════
   FLOWCHART (Skim Reading Steps)
   ═══════════════════════════════════════════════════════ */
.flowchart {
  margin: 48px 0;
  padding: 36px;
  border-radius: 20px;
  background: var(--card-bg);
  border: 1px solid var(--border);
}
.flowchart-title {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
}
.flow-steps {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}
.flow-step {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-radius: 12px;
  background: var(--bg);
  border: 1.5px solid var(--border);
  min-width: 280px;
  transition: all .3s;
}
.flow-step:hover { border-color: var(--accent); }
.flow-step-icon { font-size: 24px; }
.flow-step-text {
  font-family: var(--serif);
  font-size: 14px;
  line-height: 1.6;
}
.flow-arrow {
  color: var(--accent);
  font-size: 20px;
  padding: 4px 0;
}

/* ═══════════════════════════════════════════════════════
   BOOK TYPE CARDS
   ═══════════════════════════════════════════════════════ */
.type-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 24px 0;
}
.type-card {
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--card-bg);
  transition: all .4s;
  cursor: default;
}
.type-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
}
.type-card-icon { font-size: 32px; margin-bottom: 12px; display: block; }
.type-card-name {
  font-family: var(--serif);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}
.type-card-key {
  font-size: 12px;
  color: var(--accent);
  margin-bottom: 8px;
  font-family: var(--inter);
  letter-spacing: 1px;
}
.type-card-desc { font-size: 13px; line-height: 1.7; color: var(--muted-fg); }

/* ═══════════════════════════════════════════════════════
   QUIZ MODULE (Critique Quiz)
   ═══════════════════════════════════════════════════════ */
.quiz-module {
  margin: 48px 0;
  padding: 36px;
  border-radius: 20px;
  background: var(--card-bg);
  border: 1px solid var(--border);
}
.quiz-title {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
}
.quiz-subtitle {
  font-size: 13px;
  color: var(--muted-fg);
  text-align: center;
  margin-bottom: 24px;
}
.quiz-question {
  font-family: var(--serif);
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 20px;
  text-align: center;
  padding: 0 20px;
}
.quiz-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}
.quiz-opt {
  padding: 14px 18px;
  border-radius: 12px;
  border: 1.5px solid var(--border);
  background: var(--card-bg);
  cursor: pointer;
  font-size: 14px;
  font-family: var(--sans);
  transition: all .3s;
  text-align: center;
}
.quiz-opt:hover { border-color: var(--accent); background: var(--accent-glow); }
.quiz-opt.selected { border-color: var(--accent); background: var(--accent-glow); font-weight: 600; }
.quiz-opt.correct { border-color: #4CAF50; background: rgba(76,175,80,0.1); color: #2E7D32; }
.quiz-opt.wrong { border-color: #E53935; background: rgba(229,57,53,0.1); color: #C62828; }
.quiz-result {
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  display: none;
  margin-top: 16px;
}
.quiz-result.visible { display: block; }
.quiz-result.correct-result { background: rgba(76,175,80,0.1); border: 1px solid rgba(76,175,80,0.3); }
.quiz-result.wrong-result { background: rgba(229,57,53,0.1); border: 1px solid rgba(229,57,53,0.3); }
.quiz-result h4 { font-family: var(--serif); font-size: 16px; margin-bottom: 8px; }
.quiz-result p { font-size: 14px; line-height: 1.7; }
.quiz-progress {
  text-align: center;
  font-size: 12px;
  color: var(--muted-fg);
  margin-bottom: 16px;
  font-family: var(--inter);
}
.quiz-score {
  text-align: center;
  padding: 24px;
  border-radius: 12px;
  background: var(--accent-glow);
  display: none;
}
.quiz-score.visible { display: block; }
.quiz-score h3 { font-family: var(--serif); font-size: 22px; margin-bottom: 8px; color: var(--accent); }
.quiz-score p { font-size: 14px; line-height: 1.7; }

/* ═══════════════════════════════════════════════════════
   CLASSIFY GAME
   ═══════════════════════════════════════════════════════ */
.classify-game {
  margin: 48px 0;
  padding: 36px;
  border-radius: 20px;
  background: var(--card-bg);
  border: 1px solid var(--border);
}
.classify-title {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
}
.classify-subtitle {
  font-size: 13px;
  color: var(--muted-fg);
  text-align: center;
  margin-bottom: 24px;
}
.classify-book { text-align: center; padding: 20px; margin-bottom: 20px; }
.classify-book-title {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}
.classify-book-author { font-size: 13px; color: var(--muted-fg); }
.classify-choices {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  max-width: 400px;
  margin: 0 auto 16px;
}
.classify-choice {
  padding: 12px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  font-family: var(--sans);
  transition: all .3s;
}
.classify-choice:hover { border-color: var(--accent); }
.classify-choice.correct { border-color: #4CAF50; background: rgba(76,175,80,0.1); }
.classify-choice.wrong { border-color: #E53935; background: rgba(229,57,53,0.1); }
.classify-feedback {
  text-align: center;
  font-size: 14px;
  line-height: 1.7;
  margin-top: 12px;
  padding: 16px;
  border-radius: 12px;
  display: none;
}
.classify-feedback.visible { display: block; }
.classify-counter {
  text-align: center;
  font-size: 12px;
  color: var(--muted-fg);
  margin-bottom: 16px;
  font-family: var(--inter);
}

/* ═══════════════════════════════════════════════════════
   TERMS EXERCISE
   ═══════════════════════════════════════════════════════ */
.terms-exercise {
  margin: 48px 0;
  padding: 36px;
  border-radius: 20px;
  background: var(--card-bg);
  border: 1px solid var(--border);
}
.terms-title {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
}
.terms-subtitle {
  font-size: 13px;
  color: var(--muted-fg);
  text-align: center;
  margin-bottom: 24px;
}
.terms-word { text-align: center; margin-bottom: 20px; }
.terms-word-text {
  font-family: var(--serif);
  font-size: 28px;
  font-weight: 700;
  color: var(--accent);
}
.terms-context {
  font-size: 14px;
  line-height: 1.7;
  padding: 16px 20px;
  border-radius: 12px;
  background: var(--bg);
  margin-bottom: 20px;
  font-family: var(--serif);
  border-left: 3px solid var(--accent);
}
.terms-meanings {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
}
.terms-meaning {
  padding: 14px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  cursor: pointer;
  font-size: 13px;
  text-align: center;
  transition: all .3s;
  font-family: var(--sans);
}
.terms-meaning:hover { border-color: var(--accent); }
.terms-meaning.correct { border-color: #4CAF50; background: rgba(76,175,80,0.1); }
.terms-meaning.wrong { border-color: #E53935; background: rgba(229,57,53,0.1); }
.terms-explain {
  padding: 16px;
  border-radius: 12px;
  background: var(--accent-glow);
  font-size: 14px;
  line-height: 1.7;
  display: none;
  text-align: center;
}
.terms-explain.visible { display: block; }

/* ═══════════════════════════════════════════════════════
   SELF ASSESSMENT
   ═══════════════════════════════════════════════════════ */
.assessment {
  margin: 48px 0;
  padding: 36px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(30,25,18,0.9), rgba(50,40,28,0.95));
  color: #E8DFD0;
  border: 1px solid rgba(139,105,20,0.3);
}
.assessment-title {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: var(--accent-dim);
  margin-bottom: 8px;
}
.assessment-subtitle {
  font-size: 13px;
  color: rgba(232,223,208,0.6);
  text-align: center;
  margin-bottom: 24px;
}
.assessment-q {
  font-family: var(--serif);
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 16px;
}
.assessment-opts { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.assessment-opt {
  padding: 12px 18px;
  border-radius: 10px;
  border: 1px solid rgba(139,105,20,0.3);
  background: rgba(255,255,255,0.05);
  cursor: pointer;
  font-size: 13px;
  transition: all .3s;
  color: #E8DFD0;
}
.assessment-opt:hover { border-color: var(--accent-dim); background: rgba(139,105,20,0.15); }
.assessment-opt.selected {
  border-color: var(--accent-dim);
  background: rgba(139,105,20,0.25);
  font-weight: 600;
}
.assessment-result {
  text-align: center;
  padding: 24px;
  border-radius: 12px;
  background: rgba(139,105,20,0.15);
  display: none;
}
.assessment-result.visible { display: block; }
.assessment-result h3 {
  font-family: var(--serif);
  font-size: 22px;
  color: var(--accent-dim);
  margin-bottom: 12px;
}
.assessment-result p { font-size: 14px; line-height: 1.7; }

/* ═══════════════════════════════════════════════════════
   RESPONSIVE OVERRIDES
   ═══════════════════════════════════════════════════════ */
@media (max-width: 640px) {
  .quiz-options { grid-template-columns: 1fr; }
  .type-cards { grid-template-columns: 1fr; }
  .classify-choices { grid-template-columns: 1fr; }
  .terms-meanings { grid-template-columns: 1fr; }
  .htr-comp-toggle { flex-wrap: wrap; }
}
`;

// ── Inject CSS ─────────────────────────────────────────────────
BookEngine.injectCSS(CUSTOM_CSS);


// ═══════════════════════════════════════════════════════════════
// VISUALIZATION RENDERERS
// ═══════════════════════════════════════════════════════════════

// ── Reading Pyramid ────────────────────────────────────────────
BookEngine.registerViz('reading-pyramid', {
  render: function(scene, config) {
    return '<div class="data-viz reveal">' +
      '<div class="data-viz-title">阅读的四个层次金字塔</div>' +
      '<div class="data-viz-subtitle">点击每一层查看详细说明</div>' +
      '<div class="svg-pyramid">' +
        '<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">' +
          '<defs>' +
            '<linearGradient id="g4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#D4A017" stop-opacity="0.9"/><stop offset="100%" stop-color="#8B6914" stop-opacity="0.9"/></linearGradient>' +
            '<linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#B8960E" stop-opacity="0.7"/><stop offset="100%" stop-color="#8B6914" stop-opacity="0.7"/></linearGradient>' +
            '<linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#A0845C" stop-opacity="0.5"/><stop offset="100%" stop-color="#8B6914" stop-opacity="0.5"/></linearGradient>' +
            '<linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#C0B090" stop-opacity="0.3"/><stop offset="100%" stop-color="#8B6914" stop-opacity="0.3"/></linearGradient>' +
          '</defs>' +
          '<polygon points="200,10 260,75 140,75" fill="url(#g4)" stroke="#D4A017" stroke-width="1.5" class="pyramid-click" data-level="3" style="cursor:pointer"/>' +
          '<polygon points="140,80 260,80 290,145 110,145" fill="url(#g3)" stroke="#B8960E" stroke-width="1.5" class="pyramid-click" data-level="2" style="cursor:pointer"/>' +
          '<polygon points="110,150 290,150 320,215 80,215" fill="url(#g2)" stroke="#A0845C" stroke-width="1.5" class="pyramid-click" data-level="1" style="cursor:pointer"/>' +
          '<polygon points="80,220 320,220 350,270 50,270" fill="url(#g1)" stroke="#C0B090" stroke-width="1.5" class="pyramid-click" data-level="0" style="cursor:pointer"/>' +
          '<text x="200" y="52" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="Noto Sans SC" style="pointer-events:none">主题阅读</text>' +
          '<text x="200" y="120" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="Noto Sans SC" style="pointer-events:none">分析阅读</text>' +
          '<text x="200" y="190" text-anchor="middle" fill="#6B4C2A" font-size="12" font-weight="600" font-family="Noto Sans SC" style="pointer-events:none">检视阅读</text>' +
          '<text x="200" y="253" text-anchor="middle" fill="#6B4C2A" font-size="12" font-weight="600" font-family="Noto Sans SC" style="pointer-events:none">基础阅读</text>' +
          '<text x="200" y="68" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="9" font-family="Inter" style="pointer-events:none">&lt;1% 的读者</text>' +
          '<text x="200" y="136" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="9" font-family="Inter" style="pointer-events:none">~5% 的读者</text>' +
          '<text x="200" y="206" text-anchor="middle" fill="rgba(107,76,42,0.6)" font-size="9" font-family="Inter" style="pointer-events:none">~15% 的读者</text>' +
          '<text x="200" y="266" text-anchor="middle" fill="rgba(107,76,42,0.5)" font-size="9" font-family="Inter" style="pointer-events:none">~80% 的读者</text>' +
        '</svg>' +
      '</div>' +
      '<div id="pyramidDetail" class="pyramid-detail">' +
        '<h4 id="pyramidDetailTitle"></h4>' +
        '<ul id="pyramidDetailList"></ul>' +
      '</div>' +
    '</div>';
  },
  init: function() {
    var levels = [
      {name:'基础阅读 · Elementary Reading',items:['认识字词，理解句子的字面含义','能回答"这个句子在说什么？"','小学阶段学会的技能','是所有更高层次的基础，但远远不够']},
      {name:'检视阅读 · Inspectional Reading',items:['系统化略读：30分钟掌握全书概貌','粗浅阅读：困难之处不停留，先求整体','能回答：这是什么类型的书？讲了什么？','快速判断一本书是否值得进行分析阅读']},
      {name:'分析阅读 · Analytical Reading',items:['最完整、最深入的阅读方式','三阶段十五条规则','透视全书骨架、与作者达成共识、公正评判','能完整重述并评价作者的论证']},
      {name:'主题阅读 · Syntopical Reading',items:['同时阅读多本同主题书籍','建立自己的术语体系，让作者们"对话"','构建超越任何单本书的洞见','阅读的最高层次——从接收者变为创造者']}
    ];
    document.querySelectorAll('.pyramid-click').forEach(function(el) {
      el.addEventListener('click', function() {
        var lvl = parseInt(el.dataset.level);
        var d = document.getElementById('pyramidDetail');
        var t = document.getElementById('pyramidDetailTitle');
        var l = document.getElementById('pyramidDetailList');
        t.textContent = levels[lvl].name;
        l.innerHTML = levels[lvl].items.map(function(it) { return '<li>' + it + '</li>'; }).join('');
        d.classList.add('visible');
      });
    });
  }
});


// ── Four Levels (Active vs Passive + Self Assessment) ──────────
BookEngine.registerViz('four-levels', {
  render: function(scene, config) {
    return '<div class="htr-comparison-section reveal">' +
      '<div class="htr-comp-title">主动阅读 vs 被动阅读：效果对比</div>' +
      '<div class="htr-comp-toggle">' +
        '<button class="htr-comp-btn active" data-mode="passive">被动阅读</button>' +
        '<button class="htr-comp-btn" data-mode="active">主动阅读</button>' +
      '</div>' +
      '<div class="htr-comp-bars" id="htrCompBars">' +
        '<div class="htr-comp-row"><div class="htr-comp-label">信息记忆</div><div class="htr-comp-bar-track"><div class="htr-comp-bar-fill" data-passive="15" data-active="70" style="width:15%;background:linear-gradient(90deg,#E53935,#FF5252)">15%</div></div></div>' +
        '<div class="htr-comp-row"><div class="htr-comp-label">理解深度</div><div class="htr-comp-bar-track"><div class="htr-comp-bar-fill" data-passive="10" data-active="65" style="width:10%;background:linear-gradient(90deg,#E53935,#FF5252)">10%</div></div></div>' +
        '<div class="htr-comp-row"><div class="htr-comp-label">批判思维</div><div class="htr-comp-bar-track"><div class="htr-comp-bar-fill" data-passive="5" data-active="55" style="width:5%;background:linear-gradient(90deg,#E53935,#FF5252)">5%</div></div></div>' +
        '<div class="htr-comp-row"><div class="htr-comp-label">长期留存</div><div class="htr-comp-bar-track"><div class="htr-comp-bar-fill" data-passive="10" data-active="60" style="width:10%;background:linear-gradient(90deg,#E53935,#FF5252)">10%</div></div></div>' +
        '<div class="htr-comp-row"><div class="htr-comp-label">心智成长</div><div class="htr-comp-bar-track"><div class="htr-comp-bar-fill" data-passive="5" data-active="50" style="width:5%;background:linear-gradient(90deg,#E53935,#FF5252)">5%</div></div></div>' +
      '</div>' +
    '</div>' +
    '<div class="assessment reveal" id="selfAssessment">' +
      '<div class="assessment-title">你的阅读层次自评</div>' +
      '<div class="assessment-subtitle">回答以下问题，了解你目前处于哪个阅读层次</div>' +
      '<div id="assessmentContent"></div>' +
    '</div>';
  },
  init: function() {
    // Comparison toggle
    document.querySelectorAll('.htr-comp-toggle').forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        var btn = e.target.closest('.htr-comp-btn');
        if (!btn) return;
        toggle.querySelectorAll('.htr-comp-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var mode = btn.dataset.mode;
        var colors = mode === 'active' ? 'linear-gradient(90deg,#4CAF50,#66BB6A)' : 'linear-gradient(90deg,#E53935,#FF5252)';
        var section = toggle.closest('.htr-comparison-section');
        section.querySelectorAll('.htr-comp-bar-fill').forEach(function(bar) {
          var val = bar.dataset[mode];
          bar.style.width = val + '%';
          bar.style.background = colors;
          bar.textContent = val + '%';
        });
      });
    });

    // Self Assessment
    var questions = [
      {q:'读完一本书后，你能用一句话说出它的主旨吗？',opts:['总是可以','大部分时候可以','有时候可以','很少能做到'],scores:[3,2,1,0]},
      {q:'你读书时会标注和思考作者使用的关键术语吗？',opts:['系统化地标注和定义','偶尔标注','只是划线','从不'],scores:[3,2,1,0]},
      {q:'读完后你能重建作者的论证链条（前提→证据→结论）吗？',opts:['可以，而且经常这样做','部分可以','很困难','从没尝试过'],scores:[3,2,1,0]},
      {q:'你会主动阅读多本同主题的书来比较不同观点吗？',opts:['经常这样做','偶尔','很少','不会'],scores:[3,2,1,0]},
      {q:'当你不同意作者时，你能给出具体的理由（而不仅仅是感觉）吗？',opts:['总是有理由','大多数时候','不太确定','主要靠直觉'],scores:[3,2,1,0]}
    ];
    var currentQ = 0;
    var totalScore = 0;
    var container = document.getElementById('assessmentContent');
    if (!container) return;

    function renderQ() {
      if (currentQ >= questions.length) {
        var level, desc;
        if (totalScore >= 12) { level = '主题阅读层次'; desc = '你已经是一个高级读者，具备跨书比较和综合分析的能力。'; }
        else if (totalScore >= 8) { level = '分析阅读层次'; desc = '你能较好地理解一本书的深层结构，但在跨书综合方面还有提升空间。'; }
        else if (totalScore >= 4) { level = '检视阅读层次'; desc = '你能快速把握书的大意，但在深度理解和批判性思考方面还需要刻意练习。'; }
        else { level = '基础阅读层次'; desc = '你目前的阅读主要停留在获取信息层面。本书的方法将帮助你实现质的飞跃。'; }
        container.innerHTML =
          '<div class="assessment-result visible">' +
            '<h3>你当前处于：' + level + '</h3>' +
            '<p>得分：' + totalScore + '/15</p>' +
            '<p>' + desc + '</p>' +
            '<p style="margin-top:12px;font-size:12px;opacity:.7">这不是终点——本书的每一个场景都在帮你攀升到更高的层次。</p>' +
          '</div>';
        return;
      }
      var q = questions[currentQ];
      container.innerHTML =
        '<div class="assessment-q">' + (currentQ + 1) + '/' + questions.length + '. ' + q.q + '</div>' +
        '<div class="assessment-opts">' +
          q.opts.map(function(o, i) { return '<div class="assessment-opt" data-idx="' + i + '">' + o + '</div>'; }).join('') +
        '</div>';
      container.querySelectorAll('.assessment-opt').forEach(function(opt) {
        opt.addEventListener('click', function() {
          var idx = parseInt(opt.dataset.idx);
          totalScore += questions[currentQ].scores[idx];
          opt.classList.add('selected');
          container.querySelectorAll('.assessment-opt').forEach(function(o) { o.style.pointerEvents = 'none'; });
          setTimeout(function() { currentQ++; renderQ(); }, 600);
        });
      });
    }
    renderQ();
  }
});


// ── Skim Flowchart ─────────────────────────────────────────────
BookEngine.registerViz('skim-flowchart', {
  render: function(scene, config) {
    return '<div class="flowchart reveal">' +
      '<div class="flowchart-title">检视阅读六步法</div>' +
      '<div class="flow-steps">' +
        '<div class="flow-step"><div class="flow-step-icon">📋</div><div class="flow-step-text"><strong>步骤一</strong><br>读书名页和前言，搞清楚书的主题范围<br><em style="color:var(--muted-fg);font-size:12px">⏱ 约1分钟</em></div></div>' +
        '<div class="flow-arrow">↓</div>' +
        '<div class="flow-step"><div class="flow-step-icon">🗂️</div><div class="flow-step-text"><strong>步骤二</strong><br>研究目录，理解全书结构蓝图<br><em style="color:var(--muted-fg);font-size:12px">⏱ 约2分钟</em></div></div>' +
        '<div class="flow-arrow">↓</div>' +
        '<div class="flow-step"><div class="flow-step-icon">🔍</div><div class="flow-step-text"><strong>步骤三</strong><br>检查索引，识别关键术语和高频话题<br><em style="color:var(--muted-fg);font-size:12px">⏱ 约2分钟</em></div></div>' +
        '<div class="flow-arrow">↓</div>' +
        '<div class="flow-step"><div class="flow-step-icon">💬</div><div class="flow-step-text"><strong>步骤四</strong><br>读出版者介绍/腰封，快速获取核心摘要<br><em style="color:var(--muted-fg);font-size:12px">⏱ 约1分钟</em></div></div>' +
        '<div class="flow-arrow">↓</div>' +
        '<div class="flow-step"><div class="flow-step-icon">📖</div><div class="flow-step-text"><strong>步骤五</strong><br>翻阅核心章节的开头和结尾段落<br><em style="color:var(--muted-fg);font-size:12px">⏱ 约10分钟</em></div></div>' +
        '<div class="flow-arrow">↓</div>' +
        '<div class="flow-step"><div class="flow-step-icon">🎯</div><div class="flow-step-text"><strong>步骤六</strong><br>随机翻阅，读散落的段落，感受作者的文风<br><em style="color:var(--muted-fg);font-size:12px">⏱ 约10分钟</em></div></div>' +
        '<div class="flow-arrow">↓</div>' +
        '<div class="flow-step" style="border-color:var(--accent);background:var(--accent-glow)"><div class="flow-step-icon">✅</div><div class="flow-step-text"><strong>产出</strong><br>你现在可以回答：这本书是什么类型？讲了什么？值不值得深读？</div></div>' +
      '</div>' +
    '</div>';
  }
});


// ── Fifteen Rules ──────────────────────────────────────────────
BookEngine.registerViz('fifteen-rules', {
  render: function(scene, config) {
    return '<div class="data-viz reveal">' +
      '<div class="data-viz-title">分析阅读的十五条规则</div>' +
      '<div class="data-viz-subtitle">三个阶段，十五条规则，一套完整的深度阅读工具箱</div>' +
      '<div class="rules-grid">' +
        '<div class="rule-stage">第一阶段：结构性阅读 —— 这本书整体在谈什么？</div>' +
        '<div class="rule-item"><div class="rule-num">1</div><div class="rule-text">按照书的种类与主题来分类</div></div>' +
        '<div class="rule-item"><div class="rule-num">2</div><div class="rule-text">用最简短的文字说出整本书在谈什么</div></div>' +
        '<div class="rule-item"><div class="rule-num">3</div><div class="rule-text">将主要部分按顺序与关联性列举出来，拟出全书的大纲</div></div>' +
        '<div class="rule-item"><div class="rule-num">4</div><div class="rule-text">确定作者想要解决的问题</div></div>' +
        '<div class="rule-stage" style="margin-top:16px">第二阶段：诠释性阅读 —— 细节上说了什么？</div>' +
        '<div class="rule-item"><div class="rule-num">5</div><div class="rule-text">找出关键字，与作者达成共识</div></div>' +
        '<div class="rule-item"><div class="rule-num">6</div><div class="rule-text">找出最重要的句子，抓住作者的核心命题</div></div>' +
        '<div class="rule-item"><div class="rule-num">7</div><div class="rule-text">找出作者的论证，重建论证的前因后果</div></div>' +
        '<div class="rule-item"><div class="rule-num">8</div><div class="rule-text">确定作者已经解决了哪些问题，还有哪些是未解决的</div></div>' +
        '<div class="rule-stage" style="margin-top:16px">第三阶段：批判性阅读 —— 说得对吗？与我何干？</div>' +
        '<div class="rule-item"><div class="rule-num">9</div><div class="rule-text">除非你已经完成大纲与诠释，否则不要轻易批评</div></div>' +
        '<div class="rule-item"><div class="rule-num">10</div><div class="rule-text">不要争强好胜，非辩到底不可</div></div>' +
        '<div class="rule-item"><div class="rule-num">11</div><div class="rule-text">在说出评论之前，要能区分真正的知识与个人观点</div></div>' +
        '<div class="rule-item"><div class="rule-num">12</div><div class="rule-text">证明作者的知识不足（uninformed）</div></div>' +
        '<div class="rule-item"><div class="rule-num">13</div><div class="rule-text">证明作者的知识有误（misinformed）</div></div>' +
        '<div class="rule-item"><div class="rule-num">14</div><div class="rule-text">证明作者不合逻辑（illogical）</div></div>' +
        '<div class="rule-item"><div class="rule-num">15</div><div class="rule-text">证明作者的分析不够完整（incomplete）</div></div>' +
      '</div>' +
    '</div>';
  }
});


// ── Terms Exercise ─────────────────────────────────────────────
BookEngine.registerViz('terms-exercise', {
  render: function(scene, config) {
    return '<div class="terms-exercise reveal" id="termsExercise">' +
      '<div class="terms-title">互动练习：与作者"达成共识"</div>' +
      '<div class="terms-subtitle">同一个词在不同语境下含义不同。你能找出作者的真正意思吗？</div>' +
      '<div id="termsContent"></div>' +
    '</div>';
  },
  init: function() {
    var exercises = [
      {word:'自由',context:'在这里，卢梭说的"自由"并不是指想做什么就做什么，而是指服从自己为自己制定的法律。',meanings:['想做什么就做什么','不受他人约束','服从自己制定的法律','拥有选择的权利'],correct:2,explain:'卢梭将"自由"定义为自律——遵守自己通过理性制定的规则。这与日常理解的"自由=无拘束"完全不同。这就是为什么"与作者达成共识"如此重要：如果你用自己的定义理解卢梭，你会完全误解他的论证。'},
      {word:'革命',context:'科学革命的本质不是新发现，而是方法论的转变——从"我已经知道答案"到"我承认自己无知"。（参考自《人类简史》）',meanings:['暴力推翻政权','快速的技术进步','方法论的根本转变','群众运动'],correct:2,explain:'在这个语境中，"革命"指的是思维方式的根本转变，不是政治革命或技术进步。赫拉利强调的是认知框架的转换——从确定性到不确定性。'},
      {word:'理性',context:'康德所说的"理性"不是聪明或会算计，而是一种能够认识普遍道德法则的先验能力。',meanings:['聪明才智','逻辑推理能力','认识道德法则的先验能力','权衡利弊的能力'],correct:2,explain:'康德的"理性"是一个高度专业化的哲学术语，指人类先天具有的认识道德普遍法则的能力。用日常含义理解这个词，会让康德的整套伦理学变得不可理解。'}
    ];
    var currentTerm = 0;
    var container = document.getElementById('termsContent');
    if (!container) return;

    function renderTerm() {
      if (currentTerm >= exercises.length) {
        container.innerHTML = '<div style="text-align:center;padding:20px"><h4 style="font-family:var(--serif);color:var(--accent);margin-bottom:8px">练习完成！</h4><p style="font-size:14px;line-height:1.7">你已经体验了"与作者达成共识"的过程。<br>记住：每次遇到关键词，先问"作者这里是什么意思？"</p></div>';
        return;
      }
      var ex = exercises[currentTerm];
      container.innerHTML =
        '<div class="terms-word"><div class="terms-word-text">"' + ex.word + '"</div></div>' +
        '<div class="terms-context">' + ex.context + '</div>' +
        '<div style="font-size:13px;color:var(--muted-fg);text-align:center;margin-bottom:12px">在这个语境中，"' + ex.word + '"最可能是什么意思？</div>' +
        '<div class="terms-meanings">' +
          ex.meanings.map(function(m, i) { return '<div class="terms-meaning" data-idx="' + i + '">' + m + '</div>'; }).join('') +
        '</div>' +
        '<div class="terms-explain" id="termsExplain"></div>' +
        '<div class="classify-counter">' + (currentTerm + 1) + ' / ' + exercises.length + '</div>';

      container.querySelectorAll('.terms-meaning').forEach(function(el) {
        el.addEventListener('click', function() {
          var idx = parseInt(el.dataset.idx);
          var ex2 = exercises[currentTerm];
          container.querySelectorAll('.terms-meaning').forEach(function(m, i) {
            m.style.pointerEvents = 'none';
            if (i === ex2.correct) m.classList.add('correct');
            else if (i === idx) m.classList.add('wrong');
          });
          var explain = document.getElementById('termsExplain');
          explain.textContent = ex2.explain;
          explain.classList.add('visible');
          setTimeout(function() { currentTerm++; renderTerm(); }, 3500);
        });
      });
    }
    renderTerm();
  }
});


// ── Critique Quiz ──────────────────────────────────────────────
BookEngine.registerViz('critique-quiz', {
  render: function(scene, config) {
    return '<div class="quiz-module reveal" id="critiqueQuiz">' +
      '<div class="quiz-title">批判性阅读实战测验</div>' +
      '<div class="quiz-subtitle">判断以下读者的批评是否符合艾德勒的批判规则</div>' +
      '<div id="critiqueContent"></div>' +
    '</div>';
  },
  init: function() {
    var quizzes = [
      {scenario:'读者小王读完一本经济学著作后说："这本书太无聊了，我不同意。"',question:'这个批评符合艾德勒的批判规则吗？',opts:['符合','不符合'],correct:1,explain:'违反了规则九：小王没有证明自己理解了作者的论证就急于否定。"太无聊"不是理性的反驳理由——它既不指出作者的无知、错误、不合逻辑或不完整，只是一种主观感受。'},
      {scenario:'读者小李读完《枪炮、病菌与钢铁》后指出："作者在分析非洲历史时忽略了内部贸易网络的影响，使其地理决定论的解释不够完整。"',question:'这个批评符合艾德勒的批判规则吗？',opts:['符合','不符合'],correct:0,explain:'完全符合规则十五（分析不完整）。小李明确指出了作者未涉及的相关因素，并解释了这种遗漏如何影响整体论证。这是一个有建设性的、有据可依的批评。'},
      {scenario:'读者小赵在朋友推荐下翻了几页就说："这个作者的三观和我不一样，完全错误。"',question:'这个批评符合艾德勒的批判规则吗？',opts:['符合','不符合'],correct:1,explain:'违反了规则九（未完整阅读就批评）、规则十（为争辩而争辩）和规则十一（混淆知识与观点）。"三观不同"不构成作者错误的证据——你必须先理解作者的完整论证，再指出具体哪里无知、有误、不合逻辑或不完整。'}
    ];
    var currentCQ = 0;
    var correctCount = 0;
    var container = document.getElementById('critiqueContent');
    if (!container) return;

    function renderCQ() {
      if (currentCQ >= quizzes.length) {
        container.innerHTML =
          '<div class="quiz-score visible">' +
            '<h3>' + correctCount + '/' + quizzes.length + ' 正确</h3>' +
            '<p>' + (correctCount === quizzes.length ? '你已经掌握了批判性阅读的要领！' : '继续练习——记住，理解先于评判，反驳必须有据。') + '</p>' +
          '</div>';
        return;
      }
      var q = quizzes[currentCQ];
      container.innerHTML =
        '<div class="quiz-progress">' + (currentCQ + 1) + ' / ' + quizzes.length + '</div>' +
        '<div style="padding:16px;border-radius:12px;background:var(--bg);margin-bottom:16px;font-family:var(--serif);font-size:14px;line-height:1.7;border-left:3px solid var(--accent)">' + q.scenario + '</div>' +
        '<div class="quiz-question">' + q.question + '</div>' +
        '<div class="quiz-options">' +
          q.opts.map(function(o, i) { return '<div class="quiz-opt" data-idx="' + i + '">' + o + '</div>'; }).join('') +
        '</div>' +
        '<div class="quiz-result" id="critiqueResult"></div>';

      container.querySelectorAll('.quiz-opt').forEach(function(opt) {
        opt.addEventListener('click', function() {
          var idx = parseInt(opt.dataset.idx);
          var q2 = quizzes[currentCQ];
          container.querySelectorAll('.quiz-opt').forEach(function(o, i) {
            o.style.pointerEvents = 'none';
            if (i === q2.correct) o.classList.add('correct');
            else if (i === idx && idx !== q2.correct) o.classList.add('wrong');
          });
          if (idx === q2.correct) correctCount++;
          var result = document.getElementById('critiqueResult');
          result.className = 'quiz-result visible ' + (idx === q2.correct ? 'correct-result' : 'wrong-result');
          result.innerHTML = '<h4>' + (idx === q2.correct ? '✓ 正确！' : '✗ 不太对') + '</h4><p>' + q2.explain + '</p>';
          setTimeout(function() { currentCQ++; renderCQ(); }, 4000);
        });
      });
    }
    renderCQ();
  }
});


// ── Book Types + Classify Game ─────────────────────────────────
BookEngine.registerViz('book-types', {
  render: function(scene, config) {
    return '<div class="data-viz reveal">' +
      '<div class="data-viz-title">书籍类型速查图鉴</div>' +
      '<div class="data-viz-subtitle">不同类型的书需要不同的"读法"</div>' +
      '<div class="type-cards">' +
        '<div class="type-card"><span class="type-card-icon">🔧</span><div class="type-card-name">实用型</div><div class="type-card-key">HOW TO / SHOULD DO</div><div class="type-card-desc">教你怎么做或应该做什么。核心问题：目标是什么？手段有效吗？</div></div>' +
        '<div class="type-card"><span class="type-card-icon">📜</span><div class="type-card-name">历史</div><div class="type-card-key">NARRATIVE + INTERPRETATION</div><div class="type-card-desc">在事实中编织叙事。核心问题：选择了哪些事实？因果解释是否唯一？</div></div>' +
        '<div class="type-card"><span class="type-card-icon">🔬</span><div class="type-card-name">科学</div><div class="type-card-key">HYPOTHESIS + EVIDENCE</div><div class="type-card-desc">用实验和数据验证假说。核心问题：方法论是否严密？结论是否可复制？</div></div>' +
        '<div class="type-card"><span class="type-card-icon">🏛️</span><div class="type-card-name">哲学</div><div class="type-card-key">DEFINITION + REASONING</div><div class="type-card-desc">用纯粹推理探讨根本问题。核心问题：术语是否精确？推理是否有效？</div></div>' +
        '<div class="type-card"><span class="type-card-icon">📊</span><div class="type-card-name">社会科学</div><div class="type-card-key">DATA + FRAMEWORK</div><div class="type-card-desc">结合数据与理论框架解释社会现象。核心问题：变量控制是否充分？</div></div>' +
        '<div class="type-card"><span class="type-card-icon">✨</span><div class="type-card-name">想象文学</div><div class="type-card-key">EXPERIENCE + TRUTH</div><div class="type-card-desc">创造一个世界让你体验。核心问题：世界是否一致？你是否被触动？</div></div>' +
      '</div>' +
    '</div>' +
    '<div class="classify-game reveal" id="classifyGame">' +
      '<div class="classify-title">互动：图书分类挑战</div>' +
      '<div class="classify-subtitle">判断以下书籍属于什么类型——这是分析阅读的第一步</div>' +
      '<div id="classifyContent"></div>' +
    '</div>';
  },
  init: function() {
    var books = [
      {title:'《国富论》',author:'亚当·斯密',choices:['实用型','历史','科学','哲学'],correct:2,explain:'《国富论》虽然有政策建议的成分，但其核心是对经济运行规律的理论探索——属于社会科学/理论型。斯密在建立一套解释市场运作的理论体系。'},
      {title:'《高效能人士的七个习惯》',author:'史蒂芬·柯维',choices:['实用型','科学','哲学','历史'],correct:0,explain:'典型的实用型书籍——它明确地告诉你"应该怎么做"来提升效能。关键问题是：你接受这些目标吗？这些方法有效吗？'},
      {title:'《百年孤独》',author:'加西亚·马尔克斯',choices:['历史','哲学','想象文学','社会科学'],correct:2,explain:'虽然它包含拉美历史元素，但本质是一部想象文学作品。阅读它时应该先沉浸在马孔多的世界里，感受而非分析——这是艾德勒对文学作品的阅读建议。'},
      {title:'《理想国》',author:'柏拉图',choices:['实用型','历史','科学','哲学'],correct:3,explain:'哲学的经典代表——通过对话和推理探讨"正义"的本质。阅读时需要极其关注术语定义（如柏拉图对"正义"的独特定义）和推理过程。'},
      {title:'《人类简史》',author:'尤瓦尔·赫拉利',choices:['历史','科学','哲学','实用型'],correct:0,explain:'虽然包含科学和哲学元素，但核心是一部历史叙事——讲述智人从动物到上帝的演化历程。关键是识别赫拉利的解读框架，并与其他历史学家的视角对照。'}
    ];
    var currentBook = 0;
    var classifyCorrect = 0;
    var container = document.getElementById('classifyContent');
    if (!container) return;

    function renderBook() {
      if (currentBook >= books.length) {
        container.innerHTML =
          '<div class="quiz-score visible">' +
            '<h3>' + classifyCorrect + '/' + books.length + ' 分类正确</h3>' +
            '<p>' + (classifyCorrect >= 4 ? '你已经掌握了书籍分类的技能——分析阅读的第一步！' : classifyCorrect >= 2 ? '不错的开始！多加练习，你会越来越敏锐。' : '分类需要更多练习——但这正是学习的过程！') + '</p>' +
          '</div>';
        return;
      }
      var b = books[currentBook];
      container.innerHTML =
        '<div class="classify-counter">' + (currentBook + 1) + ' / ' + books.length + '</div>' +
        '<div class="classify-book">' +
          '<div class="classify-book-title">' + b.title + '</div>' +
          '<div class="classify-book-author">' + b.author + '</div>' +
        '</div>' +
        '<div class="classify-choices">' +
          b.choices.map(function(c, i) { return '<div class="classify-choice" data-idx="' + i + '">' + c + '</div>'; }).join('') +
        '</div>' +
        '<div class="classify-feedback" id="classifyFeedback"></div>';

      container.querySelectorAll('.classify-choice').forEach(function(choice) {
        choice.addEventListener('click', function() {
          var idx = parseInt(choice.dataset.idx);
          var b2 = books[currentBook];
          container.querySelectorAll('.classify-choice').forEach(function(c, i) {
            c.style.pointerEvents = 'none';
            if (i === b2.correct) c.classList.add('correct');
            else if (i === idx && idx !== b2.correct) c.classList.add('wrong');
          });
          if (idx === b2.correct) classifyCorrect++;
          var fb = document.getElementById('classifyFeedback');
          fb.className = 'classify-feedback visible';
          fb.style.background = idx === b2.correct ? 'rgba(76,175,80,0.1)' : 'rgba(229,57,53,0.1)';
          fb.innerHTML = '<strong>' + (idx === b2.correct ? '✓ 正确！' : '✗ 不太对') + '</strong><br>' + b2.explain;
          setTimeout(function() { currentBook++; renderBook(); }, 3500);
        });
      });
    }
    renderBook();
  }
});


// ═══════════════════════════════════════════════════════════════
// INIT — run all viz init functions after render
// ═══════════════════════════════════════════════════════════════

BookEngine.registerInit(function() {
  // Init all registered viz types that have init methods
  ['reading-pyramid', 'four-levels', 'terms-exercise', 'critique-quiz', 'book-types'].forEach(function(type) {
    BookEngine.initViz(type);
  });
});
