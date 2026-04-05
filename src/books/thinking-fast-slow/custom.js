// ═══════════════════════════════════════════════════════════════
// Thinking, Fast and Slow — Custom Components & Styles
// Book-specific visualizations, animations, and interactive modules
// ═══════════════════════════════════════════════════════════════

// ── CUSTOM CSS ──────────────────────────────────────────────────
var CUSTOM_CSS = "\
/* ═══════════════════════════════════════════════════════\n\
   INTERACTIVE MODULES: Cognitive Bias Simulators\n\
   ═══════════════════════════════════════════════════════ */\n\
.interactive-module {\n\
  margin: 3rem 0;\n\
  padding: 2.5rem;\n\
  border-radius: 16px;\n\
  border: 1px solid var(--border);\n\
  background: var(--accent-glow);\n\
  position: relative;\n\
  overflow: hidden;\n\
}\n\
.interactive-module::before {\n\
  content: '';\n\
  position: absolute;\n\
  inset: 0;\n\
  background: linear-gradient(135deg, var(--accent-dim), transparent 60%);\n\
  pointer-events: none;\n\
  opacity: 0.5;\n\
}\n\
.interactive-module > * {\n\
  position: relative;\n\
  z-index: 1;\n\
}\n\
.interactive-module h3 {\n\
  font-family: var(--serif);\n\
  font-size: 1.3rem;\n\
  font-weight: 700;\n\
  margin-bottom: 0.5rem;\n\
}\n\
.interactive-module .module-tag {\n\
  font-family: var(--sans);\n\
  font-size: 0.55rem;\n\
  font-weight: 700;\n\
  letter-spacing: 0.3em;\n\
  color: var(--accent);\n\
  text-transform: uppercase;\n\
  margin-bottom: 1rem;\n\
  display: inline-flex;\n\
  align-items: center;\n\
  gap: 0.5rem;\n\
}\n\
.interactive-module .module-tag::before {\n\
  content: '';\n\
  width: 6px; height: 6px;\n\
  border-radius: 50%;\n\
  background: var(--accent);\n\
  animation: tagPulse 2s ease-in-out infinite;\n\
}\n\
@keyframes tagPulse {\n\
  0%, 100% { opacity: 1; transform: scale(1); }\n\
  50% { opacity: 0.4; transform: scale(0.6); }\n\
}\n\
.interactive-module .module-desc {\n\
  font-size: 0.9rem;\n\
  line-height: 1.8;\n\
  color: var(--fg-secondary);\n\
  margin-bottom: 2rem;\n\
}\n\
.module-reset-btn {\n\
  display: inline-flex;\n\
  align-items: center;\n\
  gap: 0.4rem;\n\
  margin-top: 1.5rem;\n\
  padding: 0.5rem 1.2rem;\n\
  border: 1px solid var(--border);\n\
  border-radius: 100px;\n\
  background: transparent;\n\
  color: var(--fg-secondary);\n\
  font-family: var(--sans);\n\
  font-size: 0.65rem;\n\
  font-weight: 600;\n\
  letter-spacing: 0.08em;\n\
  cursor: pointer;\n\
  transition: all 0.3s var(--ease-out);\n\
}\n\
.module-reset-btn:hover {\n\
  border-color: var(--accent);\n\
  color: var(--accent);\n\
  background: var(--accent-glow);\n\
}\n\
\n\
/* Bat-and-Ball Quiz */\n\
.bat-ball-btns {\n\
  display: flex;\n\
  gap: 1rem;\n\
  margin: 1.5rem 0;\n\
  flex-wrap: wrap;\n\
}\n\
.bat-ball-btns button {\n\
  flex: 1;\n\
  min-width: 140px;\n\
  padding: 1.5rem 1rem;\n\
  border-radius: 12px;\n\
  border: 2px solid var(--border);\n\
  background: var(--accent-glow);\n\
  font-family: var(--serif);\n\
  font-size: 1.8rem;\n\
  font-weight: 900;\n\
  cursor: pointer;\n\
  transition: all 0.3s var(--ease-out);\n\
  color: var(--fg);\n\
  position: relative;\n\
  overflow: hidden;\n\
}\n\
.bat-ball-btns button:hover {\n\
  border-color: var(--accent-mid);\n\
  transform: translateY(-2px);\n\
  box-shadow: 0 8px 25px var(--accent-dim);\n\
}\n\
.bat-ball-btns button.wrong {\n\
  border-color: #DC2626;\n\
  background: rgba(220,38,38,0.1);\n\
  color: #DC2626;\n\
  animation: wrongShake 0.5s ease;\n\
}\n\
.bat-ball-btns button.correct {\n\
  border-color: #16a34a;\n\
  background: rgba(22,163,74,0.1);\n\
  color: #16a34a;\n\
}\n\
@keyframes wrongShake {\n\
  0%, 100% { transform: translateX(0); }\n\
  20% { transform: translateX(-8px); }\n\
  40% { transform: translateX(8px); }\n\
  60% { transform: translateX(-4px); }\n\
  80% { transform: translateX(4px); }\n\
}\n\
.bat-ball-result {\n\
  padding: 1.5rem;\n\
  border-radius: 12px;\n\
  margin-top: 1rem;\n\
  font-size: 0.95rem;\n\
  line-height: 1.9;\n\
  display: none;\n\
}\n\
.bat-ball-result.show { display: block; }\n\
.bat-ball-result.wrong-result {\n\
  background: rgba(220,38,38,0.08);\n\
  border: 1px solid rgba(220,38,38,0.2);\n\
}\n\
.bat-ball-result.correct-result {\n\
  background: rgba(22,163,74,0.08);\n\
  border: 1px solid rgba(22,163,74,0.2);\n\
}\n\
.bat-ball-stats {\n\
  margin-top: 1rem;\n\
  display: flex;\n\
  gap: 1rem;\n\
  font-size: 0.75rem;\n\
  color: var(--fg-secondary);\n\
}\n\
.bat-ball-stats .stat {\n\
  padding: 0.4rem 0.8rem;\n\
  border-radius: 8px;\n\
  background: var(--accent-glow);\n\
  border: 1px solid var(--border);\n\
}\n\
\n\
/* Anchoring Spinner */\n\
.anchor-spinner-wrap {\n\
  display: flex;\n\
  flex-direction: column;\n\
  align-items: center;\n\
  gap: 1.5rem;\n\
  margin: 1.5rem 0;\n\
}\n\
.anchor-wheel {\n\
  width: 180px;\n\
  height: 180px;\n\
  border-radius: 50%;\n\
  border: 4px solid var(--accent-mid);\n\
  position: relative;\n\
  display: flex;\n\
  align-items: center;\n\
  justify-content: center;\n\
  background: conic-gradient(\n\
    var(--accent-dim) 0deg, var(--accent-glow) 45deg,\n\
    var(--accent-dim) 90deg, var(--accent-glow) 135deg,\n\
    var(--accent-dim) 180deg, var(--accent-glow) 225deg,\n\
    var(--accent-dim) 270deg, var(--accent-glow) 315deg,\n\
    var(--accent-dim) 360deg\n\
  );\n\
  transition: transform 3s cubic-bezier(0.2, 0.8, 0.3, 1);\n\
  will-change: transform;\n\
}\n\
.anchor-wheel-number {\n\
  font-family: var(--serif);\n\
  font-size: 3rem;\n\
  font-weight: 900;\n\
  color: var(--accent);\n\
  background: var(--bg);\n\
  width: 80px; height: 80px;\n\
  border-radius: 50%;\n\
  display: flex;\n\
  align-items: center;\n\
  justify-content: center;\n\
  box-shadow: 0 0 20px var(--accent-dim);\n\
}\n\
.anchor-wheel-pointer {\n\
  position: absolute;\n\
  top: -12px;\n\
  left: 50%;\n\
  transform: translateX(-50%);\n\
  width: 0; height: 0;\n\
  border-left: 8px solid transparent;\n\
  border-right: 8px solid transparent;\n\
  border-top: 14px solid var(--accent);\n\
}\n\
.anchor-spin-btn {\n\
  padding: 0.7rem 2rem;\n\
  border-radius: 100px;\n\
  border: 2px solid var(--accent);\n\
  background: var(--accent);\n\
  color: #fff;\n\
  font-family: var(--sans);\n\
  font-size: 0.8rem;\n\
  font-weight: 700;\n\
  letter-spacing: 0.1em;\n\
  cursor: pointer;\n\
  transition: all 0.3s var(--ease-out);\n\
}\n\
.anchor-spin-btn:hover {\n\
  transform: translateY(-2px);\n\
  box-shadow: 0 6px 20px var(--accent-mid);\n\
}\n\
.anchor-spin-btn:disabled {\n\
  opacity: 0.5;\n\
  cursor: not-allowed;\n\
  transform: none;\n\
}\n\
.anchor-slider-section {\n\
  width: 100%;\n\
  margin-top: 1.5rem;\n\
  display: none;\n\
}\n\
.anchor-slider-section.show { display: block; }\n\
.anchor-slider-section input[type=range] {\n\
  width: 100%;\n\
  margin: 1rem 0;\n\
  accent-color: var(--accent);\n\
  height: 6px;\n\
}\n\
.anchor-slider-value {\n\
  text-align: center;\n\
  font-family: var(--serif);\n\
  font-size: 2rem;\n\
  font-weight: 900;\n\
  color: var(--accent);\n\
}\n\
.anchor-submit-btn {\n\
  display: block;\n\
  margin: 1rem auto;\n\
  padding: 0.6rem 2rem;\n\
  border-radius: 100px;\n\
  border: 1px solid var(--accent);\n\
  background: transparent;\n\
  color: var(--accent);\n\
  font-family: var(--sans);\n\
  font-size: 0.75rem;\n\
  font-weight: 600;\n\
  cursor: pointer;\n\
  transition: all 0.3s var(--ease-out);\n\
}\n\
.anchor-submit-btn:hover {\n\
  background: var(--accent);\n\
  color: #fff;\n\
}\n\
.anchor-result {\n\
  margin-top: 1.5rem;\n\
  padding: 1.5rem;\n\
  border-radius: 12px;\n\
  background: var(--accent-glow);\n\
  border: 1px solid var(--border);\n\
  display: none;\n\
  line-height: 2;\n\
  font-size: 0.9rem;\n\
}\n\
.anchor-result.show { display: block; }\n\
.anchor-result .result-bar {\n\
  height: 8px;\n\
  border-radius: 4px;\n\
  margin: 0.5rem 0;\n\
  transition: width 1s var(--ease-out);\n\
  background: var(--accent);\n\
}\n\
\n\
/* Loss Aversion Coin Flip */\n\
.coin-flip-area {\n\
  text-align: center;\n\
  margin: 1.5rem 0;\n\
}\n\
.coin {\n\
  width: 100px;\n\
  height: 100px;\n\
  border-radius: 50%;\n\
  background: linear-gradient(135deg, #f0c040, #d4a020);\n\
  border: 4px solid #c49000;\n\
  display: inline-flex;\n\
  align-items: center;\n\
  justify-content: center;\n\
  font-size: 2rem;\n\
  font-weight: 900;\n\
  color: #7a5500;\n\
  margin: 1rem auto;\n\
  transition: transform 0.1s;\n\
  will-change: transform;\n\
}\n\
.coin.flipping {\n\
  animation: coinFlip 0.6s ease;\n\
}\n\
@keyframes coinFlip {\n\
  0% { transform: rotateX(0); }\n\
  50% { transform: rotateX(1800deg) scale(1.2); }\n\
  100% { transform: rotateX(3600deg); }\n\
}\n\
.coin-balance {\n\
  font-family: var(--serif);\n\
  font-size: 2.2rem;\n\
  font-weight: 900;\n\
  color: var(--accent);\n\
  margin: 0.5rem 0;\n\
}\n\
.coin-flip-btns {\n\
  display: flex;\n\
  gap: 0.75rem;\n\
  justify-content: center;\n\
  margin: 1rem 0;\n\
  flex-wrap: wrap;\n\
}\n\
.coin-flip-btns button {\n\
  padding: 0.7rem 1.5rem;\n\
  border-radius: 100px;\n\
  border: 1px solid var(--border);\n\
  background: transparent;\n\
  color: var(--fg);\n\
  font-family: var(--sans);\n\
  font-size: 0.75rem;\n\
  font-weight: 600;\n\
  cursor: pointer;\n\
  transition: all 0.3s var(--ease-out);\n\
}\n\
.coin-flip-btns button:hover {\n\
  border-color: var(--accent);\n\
  color: var(--accent);\n\
}\n\
.coin-flip-btns button.primary {\n\
  background: var(--accent);\n\
  color: #fff;\n\
  border-color: var(--accent);\n\
}\n\
.coin-flip-btns button.primary:hover {\n\
  box-shadow: 0 4px 15px var(--accent-mid);\n\
}\n\
.coin-history {\n\
  display: flex;\n\
  flex-wrap: wrap;\n\
  gap: 3px;\n\
  justify-content: center;\n\
  margin: 1rem 0;\n\
  max-height: 80px;\n\
  overflow: hidden;\n\
}\n\
.coin-dot {\n\
  width: 8px; height: 8px;\n\
  border-radius: 50%;\n\
  transition: all 0.3s;\n\
}\n\
.coin-dot.win { background: #16a34a; }\n\
.coin-dot.lose { background: #DC2626; }\n\
.coin-graph {\n\
  width: 100%;\n\
  height: 120px;\n\
  margin: 1rem 0;\n\
  border-radius: 8px;\n\
  border: 1px solid var(--border);\n\
  background: var(--accent-glow);\n\
  overflow: hidden;\n\
}\n\
.coin-graph svg {\n\
  width: 100%;\n\
  height: 100%;\n\
}\n\
.coin-result-text {\n\
  font-size: 0.85rem;\n\
  line-height: 1.8;\n\
  color: var(--fg-secondary);\n\
  margin-top: 1rem;\n\
  padding: 1rem;\n\
  border-radius: 8px;\n\
  background: var(--accent-glow);\n\
  border: 1px solid var(--border);\n\
  display: none;\n\
}\n\
.coin-result-text.show { display: block; }\n\
\n\
/* Linda Problem */\n\
.linda-options {\n\
  display: flex;\n\
  flex-direction: column;\n\
  gap: 0.75rem;\n\
  margin: 1.5rem 0;\n\
}\n\
.linda-options button {\n\
  padding: 1.2rem 1.5rem;\n\
  border-radius: 12px;\n\
  border: 2px solid var(--border);\n\
  background: var(--accent-glow);\n\
  text-align: left;\n\
  font-family: var(--sans);\n\
  font-size: 0.9rem;\n\
  line-height: 1.6;\n\
  cursor: pointer;\n\
  transition: all 0.3s var(--ease-out);\n\
  color: var(--fg);\n\
}\n\
.linda-options button:hover {\n\
  border-color: var(--accent-mid);\n\
  transform: translateX(4px);\n\
}\n\
.linda-options button.wrong {\n\
  border-color: #DC2626;\n\
  background: rgba(220,38,38,0.08);\n\
}\n\
.linda-options button.correct {\n\
  border-color: #16a34a;\n\
  background: rgba(22,163,74,0.08);\n\
}\n\
.linda-result {\n\
  margin-top: 1.5rem;\n\
  display: none;\n\
}\n\
.linda-result.show { display: block; }\n\
.linda-venn {\n\
  display: flex;\n\
  justify-content: center;\n\
  margin: 1.5rem 0;\n\
}\n\
.linda-venn svg {\n\
  max-width: 300px;\n\
}\n\
\n\
/* Peak-End Rule Demo */\n\
.peak-end-choices {\n\
  display: flex;\n\
  gap: 1rem;\n\
  margin: 1.5rem 0;\n\
  flex-wrap: wrap;\n\
}\n\
.peak-end-choices button {\n\
  flex: 1;\n\
  min-width: 200px;\n\
  padding: 1.5rem;\n\
  border-radius: 12px;\n\
  border: 2px solid var(--border);\n\
  background: var(--accent-glow);\n\
  cursor: pointer;\n\
  transition: all 0.3s var(--ease-out);\n\
  text-align: center;\n\
  color: var(--fg);\n\
}\n\
.peak-end-choices button:hover {\n\
  border-color: var(--accent-mid);\n\
  transform: translateY(-2px);\n\
}\n\
.peak-end-choices button.selected {\n\
  border-color: var(--accent);\n\
  box-shadow: 0 4px 20px var(--accent-dim);\n\
}\n\
.peak-end-result {\n\
  margin-top: 1.5rem;\n\
  padding: 1.5rem;\n\
  border-radius: 12px;\n\
  background: var(--accent-glow);\n\
  border: 1px solid var(--border);\n\
  line-height: 2;\n\
  font-size: 0.9rem;\n\
  display: none;\n\
}\n\
.peak-end-result.show { display: block; }\n\
.experience-bar {\n\
  display: flex;\n\
  align-items: center;\n\
  gap: 0.5rem;\n\
  margin: 0.5rem 0;\n\
  font-size: 0.75rem;\n\
  color: var(--fg-secondary);\n\
}\n\
.experience-bar .bar {\n\
  height: 24px;\n\
  border-radius: 6px;\n\
  display: flex;\n\
  align-items: center;\n\
  justify-content: center;\n\
  font-size: 0.65rem;\n\
  font-weight: 700;\n\
  color: #fff;\n\
  transition: width 1s var(--ease-out);\n\
}\n\
";

BookEngine.injectCSS(CUSTOM_CSS);


// ═══════════════════════════════════════════════════════════════
// VISUALIZATION RENDERERS
// ═══════════════════════════════════════════════════════════════

// ── System 1 vs System 2 Comparison ──
BookEngine.registerViz('system-compare', {
  render: function(scene, config) {
    var rows = [
      { label: '\u5904\u7406\u901F\u5EA6', foraging: { score: 10, text: '\u6BEB\u79D2\u7EA7\u53CD\u5E94\uFF0C\u81EA\u52A8\u4E14\u5E76\u884C\u5904\u7406\u591A\u91CD\u4FE1\u53F7' }, farming: { score: 2, text: '\u9700\u8981\u6570\u79D2\u5230\u6570\u5206\u949F\uFF0C\u4E32\u884C\u4E14\u7F13\u6162\u7684\u9010\u6B65\u63A8\u7406' } },
      { label: '\u610F\u8BC6\u53C2\u4E0E\u5EA6', foraging: { score: 1, text: '\u5B8C\u5168\u65E0\u610F\u8BC6\u8FD0\u4F5C\uFF0C\u4F60\u751A\u81F3\u65E0\u6CD5\u611F\u77E5\u5B83\u7684\u5B58\u5728' }, farming: { score: 10, text: '\u9700\u8981\u6709\u610F\u8BC6\u7684\u6CE8\u610F\u529B\u6295\u5165\uFF0C\u4F60\u80FD\u6E05\u6670\u611F\u77E5\u81EA\u5DF1\u5728\u601D\u8003' } },
      { label: '\u8BA4\u77E5\u52AA\u529B', foraging: { score: 1, text: '\u6BEB\u4E0D\u8D39\u529B\uFF0C\u50CF\u547C\u5438\u4E00\u6837\u81EA\u52A8' }, farming: { score: 9, text: '\u6D88\u8017\u5927\u91CF\u8BA4\u77E5\u8D44\u6E90\uFF0C\u77B3\u5B54\u6269\u5927\u3001\u5FC3\u7387\u52A0\u5FEB\u3001\u8461\u8404\u7CD6\u6D88\u8017\u589E\u52A0' } },
      { label: '\u65E5\u5E38\u63A7\u5236\u6743', foraging: { score: 9, text: '\u5927\u90E8\u5206\u65E5\u5E38\u5224\u65AD\u7531\u7CFB\u7EDF1\u81EA\u52A8\u5B8C\u6210\uFF0C\u7CFB\u7EDF2\u53EA\u662F\u7B7E\u5B57\u6279\u51C6' }, farming: { score: 3, text: '\u53EA\u5728\u88AB\u201C\u56F0\u96BE\u201D\u89E6\u53D1\u65F6\u624D\u4E3B\u52A8\u4ECB\u5165\uFF0C\u4E14\u503E\u5411\u4E8E\u5077\u61D2' } },
      { label: '\u51FA\u9519\u6982\u7387', foraging: { score: 7, text: '\u5728\u7279\u5B9A\u6761\u4EF6\u4E0B\u4EA7\u751F\u53EF\u9884\u6D4B\u7684\u7CFB\u7EDF\u6027\u504F\u5DEE\uFF08\u542F\u53D1\u6CD5\u504F\u5DEE\uFF09' }, farming: { score: 3, text: '\u5F53\u88AB\u6B63\u786E\u6FC0\u6D3B\u65F6\u51FA\u9519\u8F83\u5C11\uFF0C\u4F46\u5BB9\u6613\u88AB\u75B2\u52B3\u548C\u5206\u5FC3\u524A\u5F31' } }
    ];
    var html = '<div class="data-viz reveal"><div class="data-viz-title">' + config.title + '</div>';
    html += '<div class="comparison-section"><div class="comparison-toggle">';
    html += '<button class="toggle-btn active" data-mode="foraging">\u26A1 \u7CFB\u7EDF1\uFF08\u5FEB\uFF09</button>';
    html += '<button class="toggle-btn" data-mode="farming">\uD83D\uDC22 \u7CFB\u7EDF2\uFF08\u6162\uFF09</button>';
    html += '<button class="toggle-btn" data-mode="compare">\u5BF9\u6BD4</button>';
    html += '</div><div class="comparison-rows">';
    for (var i = 0; i < rows.length; i++) {
      var dim = rows[i];
      var delay = Math.min(i + 1, 4);
      html += '<div class="comp-row reveal reveal-delay-' + delay + '" data-comp-row>';
      html += '<div class="comp-row-label">' + dim.label + '</div>';
      html += '<div class="comp-bars">';
      html += '<div class="comp-bar-wrapper" data-bar="foraging"><span class="comp-bar-tag">\u7CFB\u7EDF1</span><div class="comp-bar-track"><div class="comp-bar-fill amber" data-score="' + dim.foraging.score + '"></div></div><span class="comp-bar-value">' + dim.foraging.score + '/10</span></div>';
      html += '<div class="comp-bar-wrapper" data-bar="farming" style="display:none;"><span class="comp-bar-tag">\u7CFB\u7EDF2</span><div class="comp-bar-track"><div class="comp-bar-fill grey" data-score="' + dim.farming.score + '"></div></div><span class="comp-bar-value">' + dim.farming.score + '/10</span></div>';
      html += '</div>';
      html += '<div class="comp-text" data-text-foraging>' + dim.foraging.text + '</div>';
      html += '<div class="comp-text" data-text-farming style="display:none;">' + dim.farming.text + '</div>';
      html += '</div>';
    }
    html += '</div></div></div>';
    return html;
  }
});

// ── Bat and Ball Data Viz ──
BookEngine.registerViz('bat-ball', {
  render: function(scene, config) {
    return '<div class="data-viz reveal">' +
      '<div class="data-viz-title">' + config.title + '</div>' +
      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin:2rem 0;">' +
      '<div style="padding:1.5rem; border-radius:10px; background:var(--accent-glow); border:1px solid var(--border);">' +
      '<div style="font-family:var(--sans); font-size:0.55rem; font-weight:700; letter-spacing:0.2em; color:#DC2626; margin-bottom:0.75rem; text-transform:uppercase;">\u7CFB\u7EDF1\u7684\u76F4\u89C9\u7B54\u6848</div>' +
      '<div style="font-family:var(--serif); font-size:2.5rem; font-weight:900; color:#DC2626; margin-bottom:0.5rem;">10\u00A2</div>' +
      '<div style="font-size:0.8rem; line-height:1.8; opacity:0.75;">' +
      '\u201C1.10 \u51CF\u53BB 1 \u7B49\u4E8E 0.10\u201D<br>' +
      '<b>\u611F\u89C9\u5BF9\uFF0C\u4F46\u662F\u9519\u7684\u3002</b><br>' +
      '\u7403\u68D21.00 + \u68D2\u74030.10 = 1.10 \u2713<br>' +
      '\u4F46\u7403\u68D2\u53EA\u6BD4\u68D2\u7403\u8D350.90 \u2717' +
      '</div></div>' +
      '<div style="padding:1.5rem; border-radius:10px; background:var(--accent-glow); border:1px solid var(--border);">' +
      '<div style="font-family:var(--sans); font-size:0.55rem; font-weight:700; letter-spacing:0.2em; color:var(--accent); margin-bottom:0.75rem; text-transform:uppercase;">\u7CFB\u7EDF2\u7684\u6B63\u786E\u7B54\u6848</div>' +
      '<div style="font-family:var(--serif); font-size:2.5rem; font-weight:900; color:var(--accent); margin-bottom:0.5rem;">5\u00A2</div>' +
      '<div style="font-size:0.8rem; line-height:1.8; opacity:0.75;">' +
      '\u8BBE\u68D2\u7403 = x, \u7403\u68D2 = x + 1.00<br>' +
      'x + (x + 1.00) = 1.10<br>' +
      '<b>2x = 0.10, x = 0.05</b><br>' +
      '\u7403\u68D21.05 + \u68D2\u74030.05 = 1.10 \u2713' +
      '</div></div></div>' +
      '<div class="number-grid reveal" style="grid-template-columns: repeat(3, 1fr);">' +
      '<div><div class="big-number" style="color:#DC2626;" data-count-to="50">0</div><div class="big-number-label">% \u54C8\u4F5B\u5B66\u751F\u7B54\u9519</div></div>' +
      '<div><div class="big-number" data-count-to="80">0</div><div class="big-number-label">% \u666E\u901A\u5927\u5B66\u751F\u7B54\u9519</div></div>' +
      '<div><div class="big-number" data-count-to="3">0</div><div class="big-number-label">\u79D2 \u00B7 \u9A8C\u7B97\u6240\u9700\u65F6\u95F4</div></div>' +
      '</div></div>';
  }
});

// ── Anchoring Data Viz ──
BookEngine.registerViz('anchoring', {
  render: function(scene, config) {
    return '<div class="data-viz reveal">' +
      '<div class="data-viz-title">' + config.title + '</div>' +
      '<div class="svg-container" data-viz="anchoring">' +
      '<svg viewBox="0 0 600 200" fill="none">' +
      '<text x="0" y="28" font-family="var(--sans)" font-size="10" font-weight="600" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.1em">\u8F6C\u76D8\u505C\u5728 10</text>' +
      '<rect x="100" y="16" width="480" height="22" rx="4" fill="var(--border)"/>' +
      '<rect class="draw-bar" data-target-w="120" x="100" y="16" width="0" height="22" rx="4" fill="var(--accent)" opacity="0.6"/>' +
      '<text class="bar-label" x="225" y="31" font-family="var(--serif)" font-size="12" font-weight="700" fill="var(--accent)" opacity="0">\u5E73\u5747\u4F30\u8BA1\uFF1A25%</text>' +
      '<text x="0" y="78" font-family="var(--sans)" font-size="10" font-weight="600" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.1em">\u8F6C\u76D8\u505C\u5728 65</text>' +
      '<rect x="100" y="66" width="480" height="22" rx="4" fill="var(--border)"/>' +
      '<rect class="draw-bar" data-target-w="216" x="100" y="66" width="0" height="22" rx="4" fill="#D4A845"/>' +
      '<text class="bar-label" x="320" y="81" font-family="var(--serif)" font-size="12" font-weight="700" fill="#D4A845" opacity="0">\u5E73\u5747\u4F30\u8BA1\uFF1A45%</text>' +
      '<line x1="100" y1="110" x2="580" y2="110" stroke="var(--border)" stroke-width="1" stroke-dasharray="4 4"/>' +
      '<text x="200" y="140" font-family="var(--serif)" font-size="13" fill="var(--fg-secondary)" opacity="0.6" text-anchor="middle">\u5DEE\u8DDD\uFF1A20\u4E2A\u767E\u5206\u70B9</text>' +
      '<text x="200" y="165" font-family="var(--sans)" font-size="10" fill="var(--fg-secondary)" opacity="0.4">\u4EC5\u56E0\u4E00\u4E2A\u968F\u673A\u6570\u5B57</text>' +
      '</svg></div>' +
      '<div class="number-grid reveal" style="grid-template-columns: repeat(3, 1fr);">' +
      '<div><div class="big-number" data-count-to="20">0</div><div class="big-number-label">\u4E2A\u767E\u5206\u70B9 \u00B7 \u951A\u5B9A\u504F\u5DEE</div></div>' +
      '<div><div class="big-number" data-count-to="100" data-suffix="%">0</div><div class="big-number-label">\u88AB\u8BD5\u77E5\u9053\u951A\u662F\u968F\u673A\u7684</div></div>' +
      '<div><div class="big-number" data-count-to="0" data-suffix="%">0</div><div class="big-number-label">\u201C\u77E5\u9053\u504F\u5DEE\u201D\u540E\u7684\u6539\u5584</div></div>' +
      '</div></div>';
  }
});

// ── Loss Aversion Data Viz ──
BookEngine.registerViz('loss-aversion', {
  render: function(scene, config) {
    return '<div class="data-viz reveal">' +
      '<div class="data-viz-title">' + config.title + '</div>' +
      '<div class="svg-container" data-viz="loss-aversion">' +
      '<svg viewBox="0 0 600 340" fill="none">' +
      '<line x1="300" y1="20" x2="300" y2="320" stroke="var(--fg-secondary)" stroke-width="1" opacity="0.2"/>' +
      '<line x1="40" y1="170" x2="560" y2="170" stroke="var(--fg-secondary)" stroke-width="1" opacity="0.2"/>' +
      '<text x="560" y="165" font-family="var(--sans)" font-size="9" fill="var(--accent)" font-weight="600" text-anchor="end">\u6536\u76CA +</text>' +
      '<text x="45" y="165" font-family="var(--sans)" font-size="9" fill="#DC2626" font-weight="600">\u635F\u5931 \u2212</text>' +
      '<text x="310" y="35" font-family="var(--sans)" font-size="9" fill="var(--accent)" font-weight="600">\u5FC3\u7406\u4EF7\u503C +</text>' +
      '<text x="310" y="315" font-family="var(--sans)" font-size="9" fill="#DC2626" font-weight="600">\u5FC3\u7406\u4EF7\u503C \u2212</text>' +
      '<path class="draw-path" d="M300,170 C330,140 380,105 430,85 C470,70 520,60 560,55" stroke="var(--accent)" stroke-width="2.5" fill="none" style="--path-length:350"/>' +
      '<path class="draw-path" d="M300,170 C270,210 220,265 170,290 C130,308 80,318 40,322" stroke="#DC2626" stroke-width="2.5" fill="none" style="--path-length:350"/>' +
      '<circle cx="300" cy="170" r="5" fill="var(--fg)" opacity="0.6"/>' +
      '<text x="308" y="185" font-family="var(--sans)" font-size="8" fill="var(--fg-secondary)" opacity="0.6">\u53C2\u7167\u70B9</text>' +
      '<line x1="400" y1="100" x2="400" y2="170" stroke="var(--accent)" stroke-width="1" stroke-dasharray="3 3" opacity="0.4"/>' +
      '<line x1="200" y1="170" x2="200" y2="275" stroke="#DC2626" stroke-width="1" stroke-dasharray="3 3" opacity="0.4"/>' +
      '<text x="405" y="140" font-family="var(--sans)" font-size="8" fill="var(--accent)" opacity="0.6">+$100 \u7684\u5FEB\u4E50</text>' +
      '<text x="130" y="240" font-family="var(--sans)" font-size="8" fill="#DC2626" opacity="0.6">\u2212$100 \u7684\u75DB\u82E6</text>' +
      '<text x="130" y="255" font-family="var(--sans)" font-size="8" fill="#DC2626" opacity="0.5">(\u7EA6\u4E3A\u5FEB\u4E50\u76842\u500D)</text>' +
      '<rect x="380" y="60" width="90" height="26" rx="6" fill="var(--accent)" opacity="0.08"/>' +
      '<text x="425" y="77" font-family="var(--sans)" font-size="8" fill="var(--accent)" font-weight="600" opacity="0.7" text-anchor="middle">\u6536\u76CA\u533A \u00B7 \u5E73\u7F13</text>' +
      '<rect x="80" y="260" width="90" height="26" rx="6" fill="#DC2626" opacity="0.06"/>' +
      '<text x="125" y="277" font-family="var(--sans)" font-size="8" fill="#DC2626" font-weight="600" opacity="0.7" text-anchor="middle">\u635F\u5931\u533A \u00B7 \u9661\u5CED</text>' +
      '</svg></div>' +
      '<div class="number-grid reveal" style="grid-template-columns: repeat(3, 1fr);">' +
      '<div><div class="big-number" style="color:#DC2626;" data-count-to="2">0</div><div class="big-number-label">\u500D \u00B7 \u635F\u5931/\u6536\u76CA\u5FC3\u7406\u6BD4</div></div>' +
      '<div><div class="big-number" data-count-to="150">0</div><div class="big-number-label">\u7F8E\u5143 \u00B7 \u8BA9\u4EBA\u63A5\u53D750%\u8F93100\u7684\u8D4C\u6CE8</div></div>' +
      '<div><div class="big-number" data-count-to="1979">0</div><div class="big-number-label">\u5E74 \u00B7 \u524D\u666F\u7406\u8BBA\u53D1\u8868</div></div>' +
      '</div></div>';
  }
});

// ── Expert Validity Data Viz ──
BookEngine.registerViz('expert-validity', {
  render: function(scene, config) {
    return '<div class="data-viz reveal">' +
      '<div class="data-viz-title">' + config.title + '</div>' +
      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin:2rem 0;">' +
      '<div style="padding:1.5rem; border-radius:10px; background:var(--accent-glow); border:1px solid var(--border);">' +
      '<div style="font-family:var(--sans); font-size:0.55rem; font-weight:700; letter-spacing:0.2em; color:var(--accent); margin-bottom:0.75rem; text-transform:uppercase;">\u6709\u6548\u76F4\u89C9\u9886\u57DF</div>' +
      '<div style="font-family:var(--serif); font-size:1.1rem; font-weight:700; margin-bottom:0.75rem;">\u9AD8\u6709\u6548\u6027\u73AF\u5883</div>' +
      '<div style="font-size:0.8rem; line-height:1.8; opacity:0.75;">' +
      '<b>\u6761\u4EF6\uFF1A\u89C4\u5F8B\u6027 + \u5373\u65F6\u53CD\u9988</b><br>' +
      '\u56FD\u9645\u8C61\u68CB\u5927\u5E08<br>' +
      '\u6D88\u9632\u5458 / \u98DE\u884C\u5458<br>' +
      '\u6709\u7ECF\u9A8C\u7684\u4E34\u5E8A\u533B\u751F<br>' +
      '\u804C\u4E1A\u8FD0\u52A8\u5458' +
      '</div></div>' +
      '<div style="padding:1.5rem; border-radius:10px; background:rgba(220,38,38,0.05); border:1px solid var(--border);">' +
      '<div style="font-family:var(--sans); font-size:0.55rem; font-weight:700; letter-spacing:0.2em; color:#DC2626; margin-bottom:0.75rem; text-transform:uppercase;">\u65E0\u6548\u76F4\u89C9\u9886\u57DF</div>' +
      '<div style="font-family:var(--serif); font-size:1.1rem; font-weight:700; margin-bottom:0.75rem;">\u4F4E\u6709\u6548\u6027\u73AF\u5883</div>' +
      '<div style="font-size:0.8rem; line-height:1.8; opacity:0.75;">' +
      '<b>\u6761\u4EF6\uFF1A\u9AD8\u566A\u97F3 + \u5EF6\u8FDF\u53CD\u9988</b><br>' +
      '\u80A1\u7968\u5206\u6790\u5E08 / \u57FA\u91D1\u7ECF\u7406<br>' +
      '\u957F\u671F\u7ECF\u6D4E\u9884\u6D4B<br>' +
      '\u653F\u6CBB\u8BC4\u8BBA\u5BB6<br>' +
      '\u7CBE\u795E\u79D1\u957F\u671F\u9884\u540E\u5224\u65AD' +
      '</div></div></div>' +
      '<div class="number-grid reveal" style="grid-template-columns: repeat(3, 1fr);">' +
      '<div><div class="big-number" style="color:#DC2626;" data-count-to="0" data-suffix=".01">0</div><div class="big-number-label">\u6295\u8D44\u987E\u95EE8\u5E74\u4E1A\u7EE9\u76F8\u5173\u7CFB\u6570</div></div>' +
      '<div><div class="big-number" data-count-to="82000">0</div><div class="big-number-label">\u4E2A\u9884\u6D4B \u00B7 \u6CF0\u6D1B\u514B20\u5E74\u7814\u7A76</div></div>' +
      '<div><div class="big-number" data-count-to="284">0</div><div class="big-number-label">\u4F4D\u201C\u4E13\u5BB6\u201D\u4E0D\u5982\u7B80\u5355\u7B97\u6CD5</div></div>' +
      '</div></div>';
  }
});

// ── Framing Data Viz ──
BookEngine.registerViz('framing', {
  render: function(scene, config) {
    return '<div class="data-viz reveal">' +
      '<div class="data-viz-title">' + config.title + '</div>' +
      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin:2rem 0;">' +
      '<div style="padding:1.5rem; border-radius:10px; background:var(--accent-glow); border:1px solid var(--border);">' +
      '<div style="font-family:var(--sans); font-size:0.55rem; font-weight:700; letter-spacing:0.2em; color:var(--accent); margin-bottom:0.75rem; text-transform:uppercase;">\u6536\u76CA\u6846\u67B6</div>' +
      '<div style="font-family:var(--serif); font-size:1rem; font-weight:700; margin-bottom:0.75rem;">\u65B9\u6848A\uFF1A\u786E\u5B9A\u6551200\u4EBA</div>' +
      '<div style="font-size:0.8rem; line-height:1.8; opacity:0.75;">' +
      '\u65B9\u6848B\uFF1A1/3\u6982\u7387\u6551600\u4EBA<br>' +
      '<b>72%\u9009\u62E9A</b> \u2192 \u98CE\u9669\u89C4\u907F<br>' +
      '\u201C\u786E\u5B9A\u7684\u6536\u76CA\u6BD4\u8D4C\u535A\u597D\u201D' +
      '</div></div>' +
      '<div style="padding:1.5rem; border-radius:10px; background:rgba(220,38,38,0.05); border:1px solid var(--border);">' +
      '<div style="font-family:var(--sans); font-size:0.55rem; font-weight:700; letter-spacing:0.2em; color:#DC2626; margin-bottom:0.75rem; text-transform:uppercase;">\u635F\u5931\u6846\u67B6</div>' +
      '<div style="font-family:var(--serif); font-size:1rem; font-weight:700; margin-bottom:0.75rem;">\u65B9\u6848C\uFF1A\u786E\u5B9A\u6B7B400\u4EBA</div>' +
      '<div style="font-size:0.8rem; line-height:1.8; opacity:0.75;">' +
      '\u65B9\u6848D\uFF1A2/3\u6982\u7387\u6B7B600\u4EBA<br>' +
      '<b>78%\u9009\u62E9D</b> \u2192 \u98CE\u9669\u8FFD\u6C42<br>' +
      '\u201C\u8D4C\u4E00\u628A\u6765\u907F\u514D\u786E\u5B9A\u635F\u5931\u201D' +
      '</div></div></div>' +
      '<div style="text-align:center; padding:1.5rem 0; font-family:var(--serif); font-size:0.85rem; opacity:0.6; line-height:2;">' +
      'A = C \u00B7 B = D \u00B7 \u9009\u9879\u5B8C\u5168\u76F8\u540C<br>' +
      '\u552F\u4E00\u53D8\u5316\u7684\u662F\u8868\u8FF0\u65B9\u5F0F\u2014\u2014\u4F46\u504F\u597D\u5B8C\u5168\u9006\u8F6C' +
      '</div></div>';
  }
});

// ── Probability Weighting Data Viz ──
BookEngine.registerViz('probability-weighting', {
  render: function(scene, config) {
    return '<div class="data-viz reveal">' +
      '<div class="data-viz-title">' + config.title + '</div>' +
      '<div class="svg-container" data-viz="probability-weighting">' +
      '<svg viewBox="0 0 600 340" fill="none">' +
      '<line x1="60" y1="300" x2="560" y2="300" stroke="var(--fg-secondary)" stroke-width="1" opacity="0.2"/>' +
      '<line x1="60" y1="300" x2="60" y2="30" stroke="var(--fg-secondary)" stroke-width="1" opacity="0.2"/>' +
      '<line x1="60" y1="300" x2="560" y2="30" stroke="var(--fg-secondary)" stroke-width="1" stroke-dasharray="5 5" opacity="0.2"/>' +
      '<text x="440" y="110" font-family="var(--sans)" font-size="8" fill="var(--fg-secondary)" opacity="0.3" transform="rotate(-32 440 110)">\u7406\u6027\u52A0\u6743\u7EBF</text>' +
      '<text x="310" y="325" font-family="var(--sans)" font-size="9" fill="var(--fg-secondary)" opacity="0.5" text-anchor="middle">\u5BA2\u89C2\u6982\u7387</text>' +
      '<text x="20" y="170" font-family="var(--sans)" font-size="9" fill="var(--fg-secondary)" opacity="0.5" transform="rotate(-90 20 170)">\u51B3\u7B56\u6743\u91CD</text>' +
      '<text x="80" y="318" font-family="var(--sans)" font-size="8" fill="var(--fg-secondary)" opacity="0.4">0%</text>' +
      '<text x="545" y="318" font-family="var(--sans)" font-size="8" fill="var(--fg-secondary)" opacity="0.4">100%</text>' +
      '<path class="draw-path" d="M60,300 C80,260 100,245 140,230 C200,210 280,195 340,175 C400,155 440,135 480,100 C510,75 540,50 556,34" stroke="var(--accent)" stroke-width="2.5" fill="none" style="--path-length:600"/>' +
      '<rect x="70" y="220" width="100" height="45" rx="6" fill="var(--accent)" opacity="0.08"/>' +
      '<text x="120" y="238" font-family="var(--sans)" font-size="9" fill="var(--accent)" font-weight="600" opacity="0.8" text-anchor="middle">\u8FC7\u5EA6\u52A0\u6743\u533A</text>' +
      '<text x="120" y="253" font-family="var(--sans)" font-size="7.5" fill="var(--accent)" opacity="0.6" text-anchor="middle">\uD83C\uDFB0 \u5F69\u7968\u6548\u5E94</text>' +
      '<rect x="260" y="192" width="100" height="45" rx="6" fill="#DC2626" opacity="0.06"/>' +
      '<text x="310" y="210" font-family="var(--sans)" font-size="9" fill="#DC2626" font-weight="600" opacity="0.8" text-anchor="middle">\u4F4E\u4F30\u533A</text>' +
      '<text x="310" y="225" font-family="var(--sans)" font-size="7.5" fill="#DC2626" opacity="0.6" text-anchor="middle">\u4E2D\u7B49\u6982\u7387\u88AB\u5FFD\u89C6</text>' +
      '<rect x="440" y="45" width="110" height="45" rx="6" fill="var(--accent)" opacity="0.08"/>' +
      '<text x="495" y="63" font-family="var(--sans)" font-size="9" fill="var(--accent)" font-weight="600" opacity="0.8" text-anchor="middle">\u786E\u5B9A\u6027\u6548\u5E94</text>' +
      '<text x="495" y="78" font-family="var(--sans)" font-size="7.5" fill="var(--accent)" opacity="0.6" text-anchor="middle">\uD83D\uDEE1\uFE0F \u4FDD\u9669\u6548\u5E94</text>' +
      '</svg></div>' +
      '<div class="number-grid reveal" style="grid-template-columns: repeat(3, 1fr);">' +
      '<div><div class="big-number" data-count-to="1" data-suffix="%">0</div><div class="big-number-label">\u5B9E\u9645\u98CE\u9669 \u2192 \u5FC3\u7406\u4E2D\u536010%+</div></div>' +
      '<div><div class="big-number" style="color:#DC2626;" data-count-to="30" data-suffix="%">0</div><div class="big-number-label">\u5B9E\u9645\u98CE\u9669 \u2192 \u5FC3\u7406\u4E2D\u201C\u6CA1\u4E8B\u201D</div></div>' +
      '<div><div class="big-number" data-count-to="99" data-suffix="%">0</div><div class="big-number-label">\u2192 100% \u7684\u5FC3\u7406\u4EF7\u503C\u6781\u5927</div></div>' +
      '</div></div>';
  }
});

// ── Peak-End Data Viz ──
BookEngine.registerViz('peak-end', {
  render: function(scene, config) {
    return '<div class="data-viz reveal">' +
      '<div class="data-viz-title">' + config.title + '</div>' +
      '<div class="svg-container" data-viz="peak-end">' +
      '<svg viewBox="0 0 600 240" fill="none">' +
      '<text x="0" y="18" font-family="var(--sans)" font-size="10" font-weight="600" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.1em">\u6761\u4EF6A\uFF1A60\u79D2\u51B7\u6C34</text>' +
      '<rect x="60" y="30" width="200" height="40" rx="6" fill="#DC2626" opacity="0.3"/>' +
      '<text x="160" y="55" font-family="var(--serif)" font-size="11" fill="#DC2626" font-weight="600" text-anchor="middle">14\u00B0C \u00B7 60\u79D2 \u00B7 \u75DB\u82E6</text>' +
      '<text x="280" y="55" font-family="var(--sans)" font-size="9" fill="var(--fg-secondary)" opacity="0.5">\u2190 \u7ED3\u675F</text>' +
      '<text x="0" y="108" font-family="var(--sans)" font-size="10" font-weight="600" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.1em">\u6761\u4EF6B\uFF1A60\u79D2 + 30\u79D2\u6E10\u6696</text>' +
      '<rect x="60" y="120" width="200" height="40" rx="6" fill="#DC2626" opacity="0.3"/>' +
      '<text x="160" y="145" font-family="var(--serif)" font-size="11" fill="#DC2626" font-weight="600" text-anchor="middle">14\u00B0C \u00B7 60\u79D2 \u00B7 \u75DB\u82E6</text>' +
      '<rect x="260" y="120" width="100" height="40" rx="6" fill="var(--accent)" opacity="0.2"/>' +
      '<text x="310" y="145" font-family="var(--serif)" font-size="10" fill="var(--accent)" font-weight="600" text-anchor="middle">15\u00B0C \u00B7 30\u79D2</text>' +
      '<text x="378" y="145" font-family="var(--sans)" font-size="9" fill="var(--accent)" opacity="0.5">\u2190 \u7ED3\u675F\uFF08\u7A0D\u597D\uFF09</text>' +
      '<text x="60" y="205" font-family="var(--serif)" font-size="14" fill="var(--accent)" font-weight="700">80% \u7684\u4EBA\u9009\u62E9\u91CD\u590D\u6761\u4EF6B</text>' +
      '<text x="60" y="228" font-family="var(--sans)" font-size="10" fill="var(--fg-secondary)" opacity="0.5">\u5C3D\u7BA1B\u7684\u603B\u75DB\u82E6\u91CF\u66F4\u5927\uFF0890\u79D2 &gt; 60\u79D2\uFF09</text>' +
      '</svg></div>' +
      '<div class="number-grid reveal" style="grid-template-columns: repeat(3, 1fr);">' +
      '<div><div class="big-number" data-count-to="80" data-suffix="%">0</div><div class="big-number-label">\u9009\u62E9\u4E86\u201C\u66F4\u591A\u75DB\u82E6\u201D\u7684B</div></div>' +
      '<div><div class="big-number" data-count-to="0" data-suffix="">0</div><div class="big-number-label">\u8BB0\u5FC6\u81EA\u6211\u5BF9\u201C\u6301\u7EED\u65F6\u95F4\u201D\u7684\u5173\u6CE8</div></div>' +
      '<div><div class="big-number" data-count-to="2">0</div><div class="big-number-label">\u4E2A\u5173\u952E\u65F6\u523B\uFF1A\u5CF0\u503C + \u7EC8\u503C</div></div>' +
      '</div></div>';
  }
});


// ═══════════════════════════════════════════════════════════════
// INTERACTIVE MODULE RENDERERS
// ═══════════════════════════════════════════════════════════════

// ── Bat and Ball Quiz ──
BookEngine.registerViz('bat-ball-quiz', {
  render: function(scene, config) {
    return '<div class="interactive-module reveal" id="batBallModule">' +
      '<div class="module-tag">\u4E92\u52A8\u5B9E\u9A8C \u00B7 Interactive</div>' +
      '<h3>\uD83C\uDFCF \u7403\u68D2\u4E0E\u7403\uFF1A\u4F60\u7684\u7CFB\u7EDF1\u4F1A\u62A2\u7B54\u5417\uFF1F</h3>' +
      '<div class="module-desc">\u7403\u62CD\u548C\u7403\u4E00\u5171 <b>1.10\u5143</b>\uFF0C\u7403\u62CD\u6BD4\u7403\u8D35 <b>1\u5143</b>\u3002<br>\u8BF7\u95EE\u7403\u591A\u5C11\u94B1\uFF1F</div>' +
      '<div class="bat-ball-btns" id="batBallBtns">' +
      '<button data-answer="wrong" aria-label="0.10\u5143">0.10\u5143</button>' +
      '<button data-answer="correct" aria-label="0.05\u5143">0.05\u5143</button>' +
      '</div>' +
      '<div class="bat-ball-result wrong-result" id="batBallWrong">' +
      '<b style="color:#DC2626;font-size:1.1rem;">\uD83D\uDE31 \u4F60\u7684\u7CFB\u7EDF1\u62A2\u7B54\u4E86\uFF01</b><br>' +
      '\u8FD9\u5C31\u662F\u5361\u5C3C\u66FC\u8BF4\u7684\u201C\u7CFB\u7EDF2\u7684\u61D2\u60F0\u201D\u2014\u2014\u4F60\u7684\u76F4\u89C9\u81EA\u52A8\u8BA1\u7B97\u4E86 1.10 - 1.00 = 0.10\uFF0C\u4F46\u6CA1\u6709\u53BB\u9A8C\u8BC1\u3002<br>' +
      '\u6B63\u786E\u7B54\u6848\u662F <b>0.05\u5143</b>\uFF1A\u7403\u68D2 1.05 + \u7403 0.05 = 1.10\uFF0C\u4E14 1.05 - 0.05 = 1.00 \u2713<br>' +
      '<b>\u8D85\u8FC750%\u7684\u54C8\u4F5B\u548CMIT\u5B66\u751F\u4E5F\u7B54\u9519\u4E86\u2014\u2014\u8FD9\u4E0D\u662F\u667A\u529B\u95EE\u9898\uFF0C\u662F\u601D\u7EF4\u4E60\u60EF\u95EE\u9898\u3002</b>' +
      '</div>' +
      '<div class="bat-ball-result correct-result" id="batBallCorrect">' +
      '<b style="color:#16a34a;font-size:1.1rem;">\uD83C\uDF89 \u4F60\u7684\u7CFB\u7EDF2\u5728\u7EBF\uFF01</b><br>' +
      '\u6B63\u786E\uFF01\u7403\u662F 0.05\u5143\uFF0C\u7403\u68D2\u662F 1.05\u5143\u3002\u4F60\u51FB\u8D25\u4E86\u5927\u591A\u6570\u4EBA\u2014\u2014\u5305\u62EC50%\u4EE5\u4E0A\u7684\u9876\u7EA7\u5927\u5B66\u5B66\u751F\u3002<br>' +
      '<b>\u4F60\u5C5E\u4E8E\u90A3\u4E9B\u5BF9\u76F4\u89C9\u7B54\u6848\u4FDD\u6301\u6000\u7591\u7684\u5C11\u6570\u6D3E\u3002</b>' +
      '</div>' +
      '<div class="bat-ball-stats" id="batBallStats" style="display:none;">' +
      '<div class="stat" id="batBallStatWrong">\u274C \u90090.10\u5143: <b>0</b>\u4EBA</div>' +
      '<div class="stat" id="batBallStatCorrect">\u2705 \u90090.05\u5143: <b>0</b>\u4EBA</div>' +
      '</div>' +
      '<button class="module-reset-btn" id="batBallReset" style="display:none;">\uD83D\uDD04 \u91CD\u65B0\u6D4B\u8BD5</button>' +
      '</div>';
  }
});

// ── Anchoring Demo ──
BookEngine.registerViz('anchoring-demo', {
  render: function(scene, config) {
    return '<div class="interactive-module reveal" id="anchorModule">' +
      '<div class="module-tag">\u4E92\u52A8\u5B9E\u9A8C \u00B7 Interactive</div>' +
      '<h3>\uD83C\uDFA1 \u951A\u5B9A\u6548\u5E94\uFF1A\u968F\u673A\u6570\u5B57\u5982\u4F55\u64CD\u63A7\u4F60\u7684\u5224\u65AD</h3>' +
      '<div class="module-desc">\u8F6C\u52A8\u8F6E\u76D8\uFF0C\u7136\u540E\u56DE\u7B54\u4E00\u4E2A\u5173\u4E8E\u8054\u5408\u56FD\u7684\u95EE\u9898\u3002</div>' +
      '<div class="anchor-spinner-wrap">' +
      '<div style="position:relative;">' +
      '<div class="anchor-wheel" id="anchorWheel">' +
      '<div class="anchor-wheel-pointer"></div>' +
      '<div class="anchor-wheel-number" id="anchorNumber">?</div>' +
      '</div></div>' +
      '<button class="anchor-spin-btn" id="anchorSpinBtn">\uD83C\uDFAF \u8F6C\u52A8\u8F6E\u76D8</button>' +
      '</div>' +
      '<div class="anchor-slider-section" id="anchorSlider">' +
      '<div style="font-size:0.9rem;line-height:1.8;margin-bottom:1rem;">' +
      '<b>\u8054\u5408\u56FD\u4E2D\u975E\u6D32\u56FD\u5BB6\u7684\u767E\u5206\u6BD4\u662F\u9AD8\u4E8E\u8FD8\u662F\u4F4E\u4E8E<span id="anchorValueRef"></span>\uFF1F</b><br>' +
      '\u4F60\u7684\u4F30\u8BA1\u662F\u591A\u5C11\uFF1F' +
      '</div>' +
      '<div class="anchor-slider-value" id="anchorSliderValue">50%</div>' +
      '<input type="range" min="0" max="100" value="50" id="anchorSliderInput">' +
      '<div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--fg-secondary);opacity:0.5;"><span>0%</span><span>100%</span></div>' +
      '<button class="anchor-submit-btn" id="anchorSubmitBtn">\u63D0\u4EA4\u6211\u7684\u4F30\u8BA1</button>' +
      '</div>' +
      '<div class="anchor-result" id="anchorResult">' +
      '<b style="font-size:1.05rem;">\uD83D\uDCCA \u5B9E\u9A8C\u7ED3\u679C\u5BF9\u6BD4</b><br><br>' +
      '<div id="anchorResultContent"></div>' +
      '</div>' +
      '<button class="module-reset-btn" id="anchorReset" style="display:none;">\uD83D\uDD04 \u91CD\u65B0\u5B9E\u9A8C</button>' +
      '</div>';
  }
});

// ── Linda Problem ──
BookEngine.registerViz('linda-problem', {
  render: function(scene, config) {
    return '<div class="interactive-module reveal" id="lindaModule">' +
      '<div class="module-tag">\u4E92\u52A8\u5B9E\u9A8C \u00B7 Interactive</div>' +
      '<h3>\uD83D\uDC69 \u7433\u8FBE\u95EE\u9898\uFF1A\u4F60\u7684\u76F4\u89C9\u7B26\u5408\u903B\u8F91\u5417\uFF1F</h3>' +
      '<div class="module-desc">' +
      '\u7433\u8FBE31\u5C81\uFF0C\u5355\u8EAB\uFF0C\u76F4\u8A00\u4E0D\u8BB3\u4E14\u975E\u5E38\u806A\u660E\u3002\u5979\u4E3B\u4FEE\u54F2\u5B66\uFF0C\u5728\u5B66\u751F\u65F6\u4EE3\u79EF\u6781\u53C2\u4E0E\u793E\u4F1A\u6B63\u4E49\u548C\u53CD\u6838\u8FD0\u52A8\u3002<br><br>' +
      '<b>\u54EA\u4E2A\u66F4\u53EF\u80FD\uFF1F</b>' +
      '</div>' +
      '<div class="linda-options" id="lindaOptions">' +
      '<button data-answer="correct">A. \u7433\u8FBE\u662F\u94F6\u884C\u51FA\u7EB3\u5458</button>' +
      '<button data-answer="wrong">B. \u7433\u8FBE\u662F\u94F6\u884C\u51FA\u7EB3\u5458\uFF0C\u540C\u65F6\u4E5F\u662F\u5973\u6743\u8FD0\u52A8\u7684\u79EF\u6781\u5206\u5B50</button>' +
      '</div>' +
      '<div class="linda-result" id="lindaResult">' +
      '<div id="lindaResultContent"></div>' +
      '<div class="linda-venn">' +
      '<svg viewBox="0 0 300 200" fill="none">' +
      '<circle cx="130" cy="100" r="80" fill="rgba(220,38,38,0.1)" stroke="#DC2626" stroke-width="2"/>' +
      '<circle cx="190" cy="100" r="55" fill="rgba(22,163,74,0.1)" stroke="#16a34a" stroke-width="2"/>' +
      '<text x="80" y="60" font-family="var(--sans)" font-size="10" fill="#DC2626" font-weight="600">\u94F6\u884C\u51FA\u7EB3\u5458</text>' +
      '<text x="80" y="75" font-family="var(--sans)" font-size="9" fill="#DC2626" opacity="0.6">P(A) = \u8F83\u5927</text>' +
      '<text x="160" y="105" font-family="var(--sans)" font-size="9" fill="#16a34a" font-weight="600" text-anchor="middle">A \u4E14 B</text>' +
      '<text x="160" y="120" font-family="var(--sans)" font-size="8" fill="#16a34a" opacity="0.6" text-anchor="middle">P(A\u2229B) \u2264 P(A)</text>' +
      '<text x="215" y="60" font-family="var(--sans)" font-size="10" fill="var(--accent)" font-weight="600">\u5973\u6743\u6D3B\u8DC3\u5206\u5B50</text>' +
      '</svg></div>' +
      '<div style="font-size:0.85rem;line-height:1.9;color:var(--fg-secondary);padding:1rem;border-radius:8px;background:var(--accent-glow);border:1px solid var(--border);margin-top:1rem;">' +
      '<b>\u8FD9\u5C31\u662F\u201C\u5408\u53D6\u8C2C\u8BEF\u201D</b>\u2014\u2014\u201C\u94F6\u884C\u51FA\u7EB3\u5458\u4E14\u5973\u6743\u4E3B\u4E49\u8005\u201D\u662F\u201C\u94F6\u884C\u51FA\u7EB3\u5458\u201D\u7684<b>\u5B50\u96C6</b>\u3002<br>' +
      '\u5B50\u96C6\u6C38\u8FDC\u4E0D\u53EF\u80FD\u6BD4\u5168\u96C6\u66F4\u5927\uFF1AP(A\u2229B) \u2264 P(A)\uFF0C\u8FD9\u662F\u57FA\u672C\u903B\u8F91\u3002<br>' +
      '\u4F46\u8D85\u8FC7 <b>80%</b> \u7684\u4EBA\u9009\u9519\u4E86\u2014\u2014\u56E0\u4E3AB\u7684\u63CF\u8FF0\u4E0E\u7433\u8FBE\u7684\u5F62\u8C61\u66F4\u201C\u76F8\u4F3C\u201D\uFF08\u4EE3\u8868\u6027\u542F\u53D1\u6CD5\uFF09\u3002' +
      '</div></div>' +
      '<button class="module-reset-btn" id="lindaReset" style="display:none;">\uD83D\uDD04 \u91CD\u65B0\u6D4B\u8BD5</button>' +
      '</div>';
  }
});

// ── Coin Flip Game ──
BookEngine.registerViz('coin-flip-game', {
  render: function(scene, config) {
    return '<div class="interactive-module reveal" id="coinModule">' +
      '<div class="module-tag">\u4E92\u52A8\u5B9E\u9A8C \u00B7 Interactive</div>' +
      '<h3>\uD83E\uDE99 \u635F\u5931\u538C\u6076\uFF1A\u4F60\u6562\u63A5\u53D7\u8FD9\u4E2A\u8D4C\u6CE8\u5417\uFF1F</h3>' +
      '<div class="module-desc">' +
      '\u89C4\u5219\uFF1A\u629B\u786C\u5E01\u3002<b>\u6B63\u9762\u8D62150\u5143\uFF0C\u53CD\u9762\u8F93100\u5143\u3002</b><br>' +
      '\u4F60\u6709 <b>1000\u5143</b> \u8D77\u59CB\u8D44\u91D1\u3002\u4F60\u613F\u610F\u8D4C\u5417\uFF1F' +
      '</div>' +
      '<div class="coin-flip-area" id="coinArea">' +
      '<div id="coinPreQuestion">' +
      '<div style="font-size:0.95rem;margin-bottom:1.5rem;color:var(--fg-secondary);">\u5728\u5F00\u59CB\u4E4B\u524D\u2014\u2014\u4F60\u7684\u7B2C\u4E00\u53CD\u5E94\u662F\u4EC0\u4E48\uFF1F</div>' +
      '<div class="coin-flip-btns">' +
      '<button id="coinRefuse">\uD83D\uDE30 \u4E0D\u613F\u610F\uFF0C\u592A\u5192\u9669\u4E86</button>' +
      '<button id="coinAccept" class="primary">\uD83D\uDCAA \u613F\u610F\uFF0C\u6211\u6765\u8BD5\u8BD5</button>' +
      '</div></div>' +
      '<div id="coinGame" style="display:none;">' +
      '<div class="coin" id="coinVisual">\uD83E\uDE99</div>' +
      '<div class="coin-balance">\u4F59\u989D\uFF1A<span id="coinBalance">1000</span>\u5143</div>' +
      '<div style="font-size:0.75rem;color:var(--fg-secondary);margin-bottom:0.5rem;">' +
      '\u7B2C <span id="coinRound">0</span> \u8F6E \u00B7' +
      ' \u80DC <span id="coinWins" style="color:#16a34a;">0</span> \u00B7' +
      ' \u8D1F <span id="coinLosses" style="color:#DC2626;">0</span> \u00B7' +
      ' \u671F\u671B\u6536\u76CA\uFF1A<span style="color:var(--accent);">+25\u5143/\u8F6E</span>' +
      '</div>' +
      '<div class="coin-history" id="coinHistory"></div>' +
      '<div class="coin-graph" id="coinGraph">' +
      '<svg id="coinGraphSvg" viewBox="0 0 400 120" preserveAspectRatio="none"></svg>' +
      '</div>' +
      '<div class="coin-flip-btns">' +
      '<button id="coinFlipOne">\u629B\u4E00\u6B21</button>' +
      '<button id="coinFlip10" class="primary">\u8FDE\u629B10\u6B21</button>' +
      '<button id="coinFlip50">\u8FDE\u629B50\u6B21</button>' +
      '</div></div>' +
      '<div class="coin-result-text" id="coinReveal"></div>' +
      '</div>' +
      '<button class="module-reset-btn" id="coinReset" style="display:none;">\uD83D\uDD04 \u91CD\u65B0\u5F00\u59CB</button>' +
      '</div>';
  }
});

// ── Peak-End Demo ──
BookEngine.registerViz('peak-end-demo', {
  render: function(scene, config) {
    return '<div class="interactive-module reveal" id="peakEndModule">' +
      '<div class="module-tag">\u4E92\u52A8\u5B9E\u9A8C \u00B7 Interactive</div>' +
      '<h3>\uD83C\uDF21\uFE0F \u5CF0\u7EC8\u5B9A\u5F8B\uFF1A\u4F60\u4F1A\u9009\u62E9\u91CD\u590D\u54EA\u6BB5\u7ECF\u5386\uFF1F</h3>' +
      '<div class="module-desc">\u60F3\u8C61\u4F60\u5FC5\u987B\u53C2\u52A0\u4E00\u4E2A\u51B7\u6C34\u5B9E\u9A8C\uFF0C\u7136\u540E\u9009\u62E9\u4E00\u4E2A\u91CD\u590D\u3002</div>' +
      '<div style="margin:1.5rem 0;">' +
      '<div class="experience-bar">' +
      '<span style="width:60px;flex-shrink:0;font-weight:600;">\u4F53\u9A8CA</span>' +
      '<div class="bar" style="width:60%;background:#DC2626;opacity:0.7;">60\u79D2 \u00B7 14\u00B0C \u75DB\u82E6</div>' +
      '<span>\u7ED3\u675F</span>' +
      '</div>' +
      '<div class="experience-bar" style="margin-top:0.75rem;">' +
      '<span style="width:60px;flex-shrink:0;font-weight:600;">\u4F53\u9A8CB</span>' +
      '<div class="bar" style="width:60%;background:#DC2626;opacity:0.7;">60\u79D2 \u00B7 14\u00B0C \u75DB\u82E6</div>' +
      '<div class="bar" style="width:30%;background:var(--accent);opacity:0.5;">30\u79D2 \u00B7 15\u00B0C \u5FAE\u75DB</div>' +
      '<span>\u7ED3\u675F</span>' +
      '</div></div>' +
      '<div style="font-size:0.85rem;color:var(--fg-secondary);margin-bottom:1.5rem;text-align:center;">' +
      '\u4F53\u9A8CB = \u4F53\u9A8CA\u7684\u5168\u90E8\u75DB\u82E6 + \u989D\u594E30\u79D2\u4E0D\u9002<br>' +
      '<b>\u5982\u679C\u5FC5\u987B\u91CD\u590D\u4E00\u6B21\uFF0C\u4F60\u9009\u54EA\u4E2A\uFF1F</b>' +
      '</div>' +
      '<div class="peak-end-choices" id="peakEndChoices">' +
      '<button data-choice="A">' +
      '<div style="font-size:1.5rem;margin-bottom:0.5rem;">\uD83D\uDE23</div>' +
      '<div style="font-family:var(--serif);font-size:1.1rem;font-weight:700;">\u4F53\u9A8CA</div>' +
      '<div style="font-size:0.75rem;color:var(--fg-secondary);margin-top:0.3rem;">60\u79D2\u75DB\u82E6\uFF0C\u7136\u540E\u7ED3\u675F</div>' +
      '</button>' +
      '<button data-choice="B">' +
      '<div style="font-size:1.5rem;margin-bottom:0.5rem;">\uD83D\uDE10</div>' +
      '<div style="font-family:var(--serif);font-size:1.1rem;font-weight:700;">\u4F53\u9A8CB</div>' +
      '<div style="font-size:0.75rem;color:var(--fg-secondary);margin-top:0.3rem;">60\u79D2\u75DB\u82E6 + 30\u79D2\u5FAE\u75DB</div>' +
      '</button></div>' +
      '<div class="peak-end-result" id="peakEndResult"></div>' +
      '<button class="module-reset-btn" id="peakEndReset" style="display:none;">\uD83D\uDD04 \u91CD\u65B0\u9009\u62E9</button>' +
      '</div>';
  }
});


// ═══════════════════════════════════════════════════════════════
// INTERACTIVE MODULE INITIALIZERS
// ═══════════════════════════════════════════════════════════════

BookEngine.registerInit(function() {
  // ── Bat and Ball ──
  (function() {
    var btns = document.getElementById('batBallBtns');
    var wrongResult = document.getElementById('batBallWrong');
    var correctResult = document.getElementById('batBallCorrect');
    var stats = document.getElementById('batBallStats');
    var resetBtn = document.getElementById('batBallReset');
    if (!btns) return;

    var data = JSON.parse(localStorage.getItem('batBallStats') || '{"wrong":0,"correct":0}');

    function updateStats() {
      stats.style.display = 'flex';
      document.querySelector('#batBallStatWrong b').textContent = data.wrong;
      document.querySelector('#batBallStatCorrect b').textContent = data.correct;
    }

    btns.addEventListener('click', function(e) {
      var btn = e.target.closest('button');
      if (!btn || btn.classList.contains('wrong') || btn.classList.contains('correct')) return;
      var answer = btn.dataset.answer;
      btns.querySelectorAll('button').forEach(function(b) { b.style.pointerEvents = 'none'; });

      if (answer === 'wrong') {
        btn.classList.add('wrong');
        wrongResult.classList.add('show');
        data.wrong++;
      } else {
        btn.classList.add('correct');
        correctResult.classList.add('show');
        data.correct++;
      }
      localStorage.setItem('batBallStats', JSON.stringify(data));
      updateStats();
      resetBtn.style.display = 'inline-flex';
    });

    resetBtn.addEventListener('click', function() {
      btns.querySelectorAll('button').forEach(function(b) {
        b.classList.remove('wrong', 'correct');
        b.style.pointerEvents = '';
      });
      wrongResult.classList.remove('show');
      correctResult.classList.remove('show');
      resetBtn.style.display = 'none';
    });
  })();

  // ── Anchoring ──
  (function() {
    var spinBtn = document.getElementById('anchorSpinBtn');
    var wheel = document.getElementById('anchorWheel');
    var numberEl = document.getElementById('anchorNumber');
    var sliderSection = document.getElementById('anchorSlider');
    var sliderInput = document.getElementById('anchorSliderInput');
    var sliderValue = document.getElementById('anchorSliderValue');
    var valueRef = document.getElementById('anchorValueRef');
    var submitBtn = document.getElementById('anchorSubmitBtn');
    var result = document.getElementById('anchorResult');
    var resultContent = document.getElementById('anchorResultContent');
    var resetBtn = document.getElementById('anchorReset');
    if (!spinBtn) return;

    var anchorVal = 0;

    spinBtn.addEventListener('click', function() {
      spinBtn.disabled = true;
      anchorVal = Math.random() > 0.5 ? 65 : 10;
      var spins = 5 + Math.random() * 3;
      var targetDeg = spins * 360 + (anchorVal === 10 ? 36 : 234);
      wheel.style.transform = 'rotate(' + targetDeg + 'deg)';

      setTimeout(function() {
        numberEl.textContent = anchorVal;
        numberEl.style.fontSize = '3rem';
        valueRef.textContent = anchorVal;
        sliderSection.classList.add('show');
      }, 3200);
    });

    sliderInput.addEventListener('input', function() {
      sliderValue.textContent = sliderInput.value + '%';
    });

    submitBtn.addEventListener('click', function() {
      var userEstimate = parseInt(sliderInput.value);
      submitBtn.style.display = 'none';
      sliderInput.disabled = true;

      var lowAnchor = { anchor: 10, avg: 25 };
      var highAnchor = { anchor: 65, avg: 45 };

      var html = '';
      html += '<div style="margin-bottom:1rem;"><b>\u4F60\u7684\u951A\u5B9A\u503C\uFF1A' + anchorVal + '</b> \u00B7 <b>\u4F60\u7684\u4F30\u8BA1\uFF1A' + userEstimate + '%</b></div>';
      html += '<div style="font-size:0.8rem;color:var(--fg-secondary);margin-bottom:1rem;">\u5361\u5C3C\u66FC\u5B9E\u9A8C\u4E2D\u4E24\u7EC4\u88AB\u8BD5\u7684\u5E73\u5747\u4F30\u8BA1\uFF1A</div>';

      html += '<div style="margin-bottom:0.75rem;">';
      html += '<div style="font-size:0.7rem;margin-bottom:0.3rem;">\u951A\u5B9A\u503C=10\u7684\u7EC4 \u2192 \u5E73\u5747\u4F30\u8BA1 <b>25%</b></div>';
      html += '<div style="width:' + lowAnchor.avg + '%;background:#4AACCF;height:8px;border-radius:4px;transition:width 1s;"></div>';
      html += '</div>';

      html += '<div style="margin-bottom:0.75rem;">';
      html += '<div style="font-size:0.7rem;margin-bottom:0.3rem;">\u951A\u5B9A\u503C=65\u7684\u7EC4 \u2192 \u5E73\u5747\u4F30\u8BA1 <b>45%</b></div>';
      html += '<div style="width:' + highAnchor.avg + '%;background:#D4A845;height:8px;border-radius:4px;transition:width 1s;"></div>';
      html += '</div>';

      html += '<div style="margin-bottom:0.75rem;">';
      html += '<div style="font-size:0.7rem;margin-bottom:0.3rem;">\u4F60\u7684\u4F30\u8BA1 \u2192 <b>' + userEstimate + '%</b>' + (anchorVal === 10 ? '\uFF08\u4F60\u7684\u951A=10\uFF09' : '\uFF08\u4F60\u7684\u951A=65\uFF09') + '</div>';
      html += '<div style="width:' + userEstimate + '%;background:var(--accent);height:8px;border-radius:4px;transition:width 1s;"></div>';
      html += '</div>';

      var myGroup = anchorVal === 10 ? lowAnchor : highAnchor;
      var diff = Math.abs(userEstimate - myGroup.avg);
      if (diff <= 5) {
        html += '<div style="margin-top:1rem;padding:1rem;border-radius:8px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.15);font-size:0.85rem;">\uD83D\uDE31 \u4F60\u7684\u4F30\u8BA1\u975E\u5E38\u63A5\u8FD1\u4F60\u8FD9\u7EC4\u7684\u5E73\u5747\u503C\uFF01<b>\u951A\u5B9A\u6548\u5E94\u5BF9\u4F60\u4EA7\u751F\u4E86\u5178\u578B\u5F71\u54CD\u3002</b>\u4E00\u4E2A\u660E\u663E\u968F\u673A\u7684\u6570\u5B57\uFF0C\u6084\u6084\u5730\u62C9\u504F\u4E86\u4F60\u7684\u5224\u65AD\u3002</div>';
      } else if ((anchorVal === 10 && userEstimate < 30) || (anchorVal === 65 && userEstimate > 40)) {
        html += '<div style="margin-top:1rem;padding:1rem;border-radius:8px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.15);font-size:0.85rem;">\uD83C\uDFAF \u4F60\u7684\u4F30\u8BA1\u65B9\u5411\u4E0E\u4F60\u7684\u951A\u5B9A\u503C\u4E00\u81F4\u2014\u2014\u951A\u5B9A\u6548\u5E94\u5728\u8D77\u4F5C\u7528\u3002<b>\u4E24\u7EC4\u4E4B\u95F420\u4E2A\u767E\u5206\u70B9\u7684\u5DEE\u5F02\uFF0C\u4EC5\u56E0\u4E00\u4E2A\u968F\u673A\u6570\u5B57\u3002</b></div>';
      } else {
        html += '<div style="margin-top:1rem;padding:1rem;border-radius:8px;background:rgba(22,163,74,0.08);border:1px solid rgba(22,163,74,0.15);font-size:0.85rem;">\uD83E\uDDE0 \u4F60\u7684\u4F30\u8BA1\u4F3C\u4E4E\u6CA1\u6709\u88AB\u951A\u5B9A\u503C\u5F3A\u70C8\u5F71\u54CD\u3002\u4F46\u5728\u5361\u5C3C\u66FC\u7684\u5B9E\u9A8C\u4E2D\uFF0C\u5373\u4F7F\u88AB\u8BD5\u77E5\u9053\u6570\u5B57\u6765\u81EA\u8F6C\u76D8\uFF0C<b>\u4E24\u7EC4\u7684\u5E73\u5747\u4F30\u8BA1\u4ECD\u76F8\u5DEE20\u4E2A\u767E\u5206\u70B9</b>\u3002</div>';
      }

      resultContent.innerHTML = html;
      result.classList.add('show');
      resetBtn.style.display = 'inline-flex';
    });

    resetBtn.addEventListener('click', function() {
      spinBtn.disabled = false;
      wheel.style.transform = 'rotate(0deg)';
      numberEl.textContent = '?';
      sliderSection.classList.remove('show');
      sliderInput.disabled = false;
      sliderInput.value = 50;
      sliderValue.textContent = '50%';
      submitBtn.style.display = 'block';
      result.classList.remove('show');
      resetBtn.style.display = 'none';
    });
  })();

  // ── Linda Problem ──
  (function() {
    var options = document.getElementById('lindaOptions');
    var resultEl = document.getElementById('lindaResult');
    var resetBtn = document.getElementById('lindaReset');
    if (!options) return;

    options.addEventListener('click', function(e) {
      var btn = e.target.closest('button');
      if (!btn || btn.classList.contains('wrong') || btn.classList.contains('correct')) return;
      var answer = btn.dataset.answer;
      options.querySelectorAll('button').forEach(function(b) { b.style.pointerEvents = 'none'; });

      var resultContent = document.getElementById('lindaResultContent');
      if (answer === 'wrong') {
        btn.classList.add('wrong');
        options.querySelector('[data-answer="correct"]').classList.add('correct');
        resultContent.innerHTML = '<b style="color:#DC2626;font-size:1.1rem;">\uD83D\uDE31 \u5408\u53D6\u8C2C\u8BEF\uFF01\u4F60\u548C80%\u7684\u4EBA\u4E00\u6837\u843D\u5165\u4E86\u9677\u9631</b><br>\u4F60\u9009\u4E86B\u2014\u2014\u4F46\u8FD9\u5728\u903B\u8F91\u4E0A\u4E0D\u53EF\u80FD\u6BD4A\u66F4\u53EF\u80FD\u3002';
      } else {
        btn.classList.add('correct');
        resultContent.innerHTML = '<b style="color:#16a34a;font-size:1.1rem;">\uD83C\uDF89 \u4F60\u51FB\u8D25\u4E86\u5408\u53D6\u8C2C\u8BEF\uFF01</b><br>\u6B63\u786E\uFF01P(A\u2229B) \u2264 P(A) \u662F\u57FA\u672C\u903B\u8F91\u2014\u2014\u5B50\u96C6\u6C38\u8FDC\u4E0D\u5927\u4E8E\u5168\u96C6\u3002\u4F46\u8D85\u8FC780%\u7684\u4EBA\u4F1A\u9009\u9519\u3002';
      }
      resultEl.classList.add('show');
      resetBtn.style.display = 'inline-flex';
    });

    resetBtn.addEventListener('click', function() {
      options.querySelectorAll('button').forEach(function(b) {
        b.classList.remove('wrong', 'correct');
        b.style.pointerEvents = '';
      });
      resultEl.classList.remove('show');
      resetBtn.style.display = 'none';
    });
  })();

  // ── Coin Flip ──
  (function() {
    var coinArea = document.getElementById('coinArea');
    if (!coinArea) return;

    var balance = 1000, round = 0, wins = 0, losses = 0, history = [];

    var preQ = document.getElementById('coinPreQuestion');
    var game = document.getElementById('coinGame');
    var coinVisual = document.getElementById('coinVisual');
    var balanceEl = document.getElementById('coinBalance');
    var roundEl = document.getElementById('coinRound');
    var winsEl = document.getElementById('coinWins');
    var lossesEl = document.getElementById('coinLosses');
    var historyEl = document.getElementById('coinHistory');
    var graphSvg = document.getElementById('coinGraphSvg');
    var reveal = document.getElementById('coinReveal');
    var resetBtn = document.getElementById('coinReset');

    document.getElementById('coinRefuse').addEventListener('click', function() {
      preQ.style.display = 'none';
      game.style.display = 'block';
      reveal.innerHTML = '\uD83D\uDE30 <b>\u5927\u591A\u6570\u4EBA\u548C\u4F60\u4E00\u6837\u62D2\u7EDD\u4E86</b>\u2014\u2014\u5C3D\u7BA1\u8FD9\u4E2A\u8D4C\u6CE8\u7684\u671F\u671B\u6536\u76CA\u662F <b>+25\u5143/\u8F6E</b>\uFF08150x0.5 - 100x0.5 = 25\uFF09\u3002\u635F\u5931100\u5143\u7684\u6050\u60E7\u538B\u8FC7\u4E86\u8D62150\u5143\u7684\u5438\u5F15\u529B\u3002\u8FD9\u5C31\u662F<b>\u635F\u5931\u538C\u6076</b>\u3002<br><br>\u73B0\u5728\u8BD5\u8BD5\u8FDE\u7EED\u73A9\u2014\u2014\u770B\u770B\u7ED3\u679C\u5982\u4F55\u3002';
      reveal.classList.add('show');
    });

    document.getElementById('coinAccept').addEventListener('click', function() {
      preQ.style.display = 'none';
      game.style.display = 'block';
    });

    function doFlip() {
      var isHeads = Math.random() > 0.5;
      round++;
      if (isHeads) { balance += 150; wins++; history.push(1); }
      else { balance -= 100; losses++; history.push(0); }
      return isHeads;
    }

    function updateUI() {
      balanceEl.textContent = balance;
      roundEl.textContent = round;
      winsEl.textContent = wins;
      lossesEl.textContent = losses;

      var dotsHtml = '';
      var showLast = Math.min(history.length, 100);
      for (var i = history.length - showLast; i < history.length; i++) {
        dotsHtml += '<div class="coin-dot ' + (history[i] ? 'win' : 'lose') + '"></div>';
      }
      historyEl.innerHTML = dotsHtml;

      if (history.length > 1) {
        var values = [1000];
        var cum = 1000;
        for (var i = 0; i < history.length; i++) { cum += history[i] ? 150 : -100; values.push(cum); }
        var maxVal = Math.max.apply(null, values.concat([1200])), minVal = Math.min.apply(null, values.concat([800]));
        var range = maxVal - minVal || 1, w = 400, h = 120;
        var step = w / Math.max(values.length - 1, 1);
        var pathD = '';
        for (var j = 0; j < values.length; j++) {
          var x = j * step, y = h - ((values[j] - minVal) / range) * (h - 10) - 5;
          pathD += (j === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }
        var baseY = h - ((1000 - minVal) / range) * (h - 10) - 5;
        graphSvg.innerHTML =
          '<line x1="0" y1="' + baseY.toFixed(1) + '" x2="400" y2="' + baseY.toFixed(1) + '" stroke="var(--fg-secondary)" stroke-width="0.5" stroke-dasharray="4 4" opacity="0.3"/>' +
          '<text x="402" y="' + (baseY + 3).toFixed(1) + '" font-family="var(--sans)" font-size="8" fill="var(--fg-secondary)" opacity="0.5">1000</text>' +
          '<path d="' + pathD + '" stroke="var(--accent)" stroke-width="2" fill="none"/>';
      }

      if (round >= 20 && !reveal.classList.contains('show')) {
        var profit = balance - 1000;
        reveal.innerHTML = (profit >= 0 ? '\uD83D\uDCC8' : '\uD83D\uDCC9') + ' \u7ECF\u8FC7' + round + '\u8F6E\uFF0C\u4F60\u7684\u4F59\u989D\u662F <b>' + balance + '\u5143</b>\uFF08' + (profit >= 0 ? '+' : '') + profit + '\u5143\uFF09\u3002<br>' +
          (profit >= 0
            ? '\u6B63\u5982\u671F\u671B\u503C\u6240\u9884\u6D4B\u2014\u2014\u8FD9\u4E2A\u201C\u6709\u98CE\u9669\u201D\u7684\u8D4C\u6CE8\u51E0\u4E4E\u603B\u662F\u76C8\u5229\u7684\u3002<b>\u635F\u5931\u538C\u6076\u8BA9\u5927\u591A\u6570\u4EBA\u62D2\u7EDD\u4E86\u597D\u8D4C\u6CE8\u3002</b>'
            : '\u5373\u4F7F\u77ED\u671F\u4E8F\u635F\uFF0C\u671F\u671B\u503C\u4ECD\u662F\u6B63\u7684\u3002\u7EE7\u7EED\u73A9\u2014\u2014\u5927\u6570\u5B9A\u5F8B\u7EC8\u4F1A\u663E\u73B0\u3002<b>\u4F46\u635F\u5931\u538C\u6076\u8BA9\u6211\u4EEC\u5728\u77ED\u671F\u6CE2\u52A8\u4E2D\u653E\u5F03\u4E86\u3002</b>');
        reveal.classList.add('show');
      }
      resetBtn.style.display = round > 0 ? 'inline-flex' : 'none';
    }

    function animateFlip(count, cb) {
      if (count <= 0) { if (cb) cb(); return; }
      coinVisual.classList.add('flipping');
      setTimeout(function() {
        var isHeads = doFlip();
        coinVisual.textContent = isHeads ? '\uD83C\uDF89' : '\uD83D\uDC80';
        coinVisual.classList.remove('flipping');
        updateUI();
        if (count > 1) {
          setTimeout(function() { animateFlip(count - 1, cb); }, count > 10 ? 50 : 200);
        } else {
          setTimeout(function() { coinVisual.textContent = '\uD83E\uDE99'; if (cb) cb(); }, 800);
        }
      }, count > 10 ? 100 : 600);
    }

    document.getElementById('coinFlipOne').addEventListener('click', function() { animateFlip(1); });
    document.getElementById('coinFlip10').addEventListener('click', function() { animateFlip(10); });
    document.getElementById('coinFlip50').addEventListener('click', function() { animateFlip(50); });

    resetBtn.addEventListener('click', function() {
      balance = 1000; round = 0; wins = 0; losses = 0; history = [];
      reveal.classList.remove('show');
      updateUI();
      graphSvg.innerHTML = '';
      coinVisual.textContent = '\uD83E\uDE99';
      resetBtn.style.display = 'none';
    });
  })();

  // ── Peak-End ──
  (function() {
    var choices = document.getElementById('peakEndChoices');
    var resultEl = document.getElementById('peakEndResult');
    var resetBtn = document.getElementById('peakEndReset');
    if (!choices) return;

    choices.addEventListener('click', function(e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var choice = btn.dataset.choice;
      choices.querySelectorAll('button').forEach(function(b) {
        b.style.pointerEvents = 'none';
        b.classList.remove('selected');
      });
      btn.classList.add('selected');

      var html = '';
      if (choice === 'B') {
        html = '<b style="color:var(--accent);font-size:1.05rem;">\uD83D\uDE31 \u4F60\u548C80%\u7684\u5B9E\u9A8C\u88AB\u8BD5\u505A\u4E86\u76F8\u540C\u7684\u9009\u62E9\uFF01</b><br><br>' +
          '\u4F46\u4F53\u9A8CB\u5BA2\u89C2\u4E0A\u66F4\u7CDF\u2014\u2014\u5B83\u5305\u542B\u4E86A\u7684<b>\u5168\u90E8\u75DB\u82E6</b>\uFF0C\u5916\u52A0\u989D\u594E30\u79D2\u7684\u4E0D\u9002\u3002\u4F60\u9009\u62E9\u4E86\u66F4\u591A\u603B\u75DB\u82E6\u3002<br><br>' +
          '\u4F60\u7684<b>\u8BB0\u5FC6\u81EA\u6211</b>\u53EA\u5728\u4E4E<b>\u5CF0\u503C</b>\u548C<b>\u7EC8\u503C</b>\u3002B\u7684\u7ED3\u5C3E\u7A0D\u597D\uFF0C\u6240\u4EE5\u8BB0\u5FC6\u81EA\u6211\u8BA4\u4E3AB\u201C\u4E0D\u90A3\u4E48\u7CDF\u201D\u3002<br><br>' +
          '<b>\u8FD9\u5C31\u662F\u5CF0\u7EC8\u5B9A\u5F8B\u2014\u2014\u5B83\u6539\u53D8\u4E86\u6211\u4EEC\u5BF9\u5E78\u798F\u3001\u533B\u7597\u548C\u4EBA\u751F\u56DE\u5FC6\u7684\u7406\u89E3\u3002</b>';
      } else {
        html = '<b style="color:#16a34a;font-size:1.05rem;">\uD83E\uDDE0 \u7406\u6027\u7684\u9009\u62E9\uFF01\u4F46\u4F60\u662F\u5C11\u6570\u6D3E\u3002</b><br><br>' +
          '\u903B\u8F91\u4E0AA\u7684\u603B\u75DB\u82E6\u786E\u5B9E\u66F4\u5C11\u3002\u4F46\u5728\u5B9E\u9A8C\u4E2D\uFF0C<b>80%\u7684\u4EBA\u9009\u4E86B</b>\u3002<br><br>' +
          '\u56E0\u4E3A<b>\u8BB0\u5FC6\u81EA\u6211</b>\u53EA\u5728\u4E4E<b>\u5CF0\u503C</b>\u548C<b>\u7EC8\u503C</b>\u2014\u2014B\u7684\u7ED3\u5C3E\u66F4\u6E29\u548C\uFF0C\u201C\u611F\u89C9\u6CA1\u90A3\u4E48\u7CDF\u201D\u3002<br><br>' +
          '<b>\u5CF0\u7EC8\u5B9A\u5F8B\uFF1A\u6211\u4EEC\u7684\u751F\u6D3B\u51B3\u7B56\u51E0\u4E4E\u603B\u7531\u8BB0\u5FC6\u81EA\u6211\u4E3B\u5BFC\u2014\u2014\u800C\u8BB0\u5FC6\u81EA\u6211\u5728\u7CFB\u7EDF\u6027\u5730\u6B3A\u9A97\u6211\u4EEC\u3002</b>';
      }
      resultEl.innerHTML = html;
      resultEl.classList.add('show');
      resetBtn.style.display = 'inline-flex';
    });

    resetBtn.addEventListener('click', function() {
      choices.querySelectorAll('button').forEach(function(b) {
        b.classList.remove('selected');
        b.style.pointerEvents = '';
      });
      resultEl.classList.remove('show');
      resetBtn.style.display = 'none';
    });
  })();
});

// ── SVG Path Draw Observer ──
BookEngine.registerObserver(function() {
  var pathObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('drawn');
        pathObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.draw-path').forEach(function(el) { pathObs.observe(el); });
});
