// ═══════════════════════════════════════════════════════════════
// The Intelligent Investor — Custom Components & Styles
// Book-specific interactive modules, visualizations, and observers
// ═══════════════════════════════════════════════════════════════

// ── CUSTOM CSS ──────────────────────────────────────────────────
const CUSTOM_CSS = `
/* ═══════════════════════════════════════════════════════
   SHARED: Interactive Module Container
   ═══════════════════════════════════════════════════════ */
.ii-module {
  margin: 3rem 0;
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--accent-glow);
  position: relative;
  overflow: hidden;
}
.ii-module::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-dim), transparent 60%);
  pointer-events: none;
  opacity: 0.5;
}
.ii-module > * {
  position: relative;
  z-index: 1;
}
.ii-module h3 {
  font-family: var(--serif);
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.ii-module .ii-tag {
  font-family: var(--sans);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.ii-module .ii-tag::before {
  content: '';
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: iiTagPulse 2s ease-in-out infinite;
}
@keyframes iiTagPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.6); }
}
.ii-module .ii-desc {
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--fg-secondary);
  margin-bottom: 2rem;
}
.ii-reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.5rem;
  padding: 0.5rem 1.2rem;
  border: 1px solid var(--border);
  border-radius: 100px;
  background: transparent;
  color: var(--fg-secondary);
  font-family: var(--sans);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.3s var(--ease-out);
}
.ii-reset-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-glow);
}

/* ═══════════════════════════════════════════════════════
   COMPONENT 1: Mr. Market Mood Simulator
   ═══════════════════════════════════════════════════════ */
.mm-sim { max-width: 560px; margin: 0 auto; }
.mm-day-counter {
  font-family: var(--sans);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--fg-secondary);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}
.mm-face {
  width: 100px; height: 100px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  transition: all 0.6s var(--ease-out);
  border: 3px solid var(--border);
}
.mm-face.euphoric {
  background: rgba(220, 38, 38, 0.12);
  border-color: rgba(220, 38, 38, 0.3);
}
.mm-face.normal {
  background: var(--accent-dim);
  border-color: var(--accent-mid);
}
.mm-face.depressed {
  background: rgba(22, 163, 74, 0.12);
  border-color: rgba(22, 163, 74, 0.3);
}
.mm-speech {
  text-align: center;
  font-family: var(--serif);
  font-size: 1.05rem;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--fg);
  min-height: 3em;
}
.mm-price-tag {
  text-align: center;
  font-family: var(--serif);
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--accent);
  margin-bottom: 2rem;
}
.mm-price-tag span {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--fg-secondary);
  display: block;
  margin-top: 0.2rem;
  font-family: var(--sans);
  letter-spacing: 0.1em;
}
.mm-actions {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  flex-wrap: wrap;
}
.mm-actions button {
  flex: 1;
  min-width: 100px;
  max-width: 160px;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  border: 2px solid var(--border);
  background: var(--accent-glow);
  font-family: var(--sans);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.3s var(--ease-out);
  color: var(--fg);
}
.mm-actions button:hover {
  border-color: var(--accent-mid);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--accent-dim);
}
.mm-actions button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
.mm-actions button.buy-btn:hover { border-color: #16a34a; color: #16a34a; }
.mm-actions button.sell-btn:hover { border-color: #DC2626; color: #DC2626; }
.mm-history {
  margin-top: 2rem;
  border-top: 1px solid var(--border);
  padding-top: 1rem;
}
.mm-history-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 0.8rem;
  color: var(--fg-secondary);
  border-bottom: 1px solid var(--border);
}
.mm-history-row .mm-h-action {
  font-weight: 700;
  font-family: var(--sans);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}
.mm-h-action.bought { background: rgba(22,163,74,0.12); color: #16a34a; }
.mm-h-action.sold { background: rgba(220,38,38,0.12); color: #DC2626; }
.mm-h-action.ignored { background: var(--accent-glow); color: var(--fg-secondary); }

.mm-result {
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  display: none;
}
.mm-result.show { display: block; }
.mm-result-title {
  font-family: var(--serif);
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.mm-result-intrinsic {
  text-align: center;
  font-family: var(--serif);
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--accent);
  margin: 1rem 0;
}
.mm-result-intrinsic span {
  display: block;
  font-size: 0.65rem;
  font-weight: 600;
  font-family: var(--sans);
  color: var(--fg-secondary);
  letter-spacing: 0.1em;
  margin-top: 0.3rem;
}
.mm-pnl {
  text-align: center;
  font-family: var(--serif);
  font-size: 1.3rem;
  font-weight: 700;
  margin: 1rem 0;
}
.mm-pnl.positive { color: #16a34a; }
.mm-pnl.negative { color: #DC2626; }
.mm-pnl.neutral { color: var(--fg-secondary); }
.mm-result-lesson {
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--fg-secondary);
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

/* ═══════════════════════════════════════════════════════
   COMPONENT 2: Graham's 7-Criteria Screener
   ═══════════════════════════════════════════════════════ */
.gs-company-btns {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.gs-company-btns button {
  padding: 0.6rem 1.2rem;
  border-radius: 100px;
  border: 2px solid var(--border);
  background: transparent;
  font-family: var(--sans);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s var(--ease-out);
  color: var(--fg);
}
.gs-company-btns button:hover {
  border-color: var(--accent-mid);
  background: var(--accent-glow);
}
.gs-company-btns button.active {
  border-color: var(--accent);
  background: var(--accent);
  color: #fff;
}
.gs-grid {
  display: grid;
  gap: 0;
}
.gs-row {
  display: grid;
  grid-template-columns: 2fr 0.6fr 3fr;
  gap: 1rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--border);
  align-items: center;
  transition: opacity 0.3s ease;
}
.gs-row:last-child { border-bottom: none; }
.gs-criterion {
  font-family: var(--serif);
  font-size: 0.85rem;
  font-weight: 600;
}
.gs-criterion small {
  display: block;
  font-family: var(--sans);
  font-size: 0.65rem;
  font-weight: 400;
  color: var(--fg-secondary);
  margin-top: 0.2rem;
}
.gs-light {
  width: 28px; height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 900;
  transition: all 0.4s var(--ease-out);
  border: 2px solid var(--border);
  background: var(--accent-glow);
  color: var(--fg-secondary);
}
.gs-light.pass { background: rgba(22,163,74,0.15); border-color: rgba(22,163,74,0.4); color: #16a34a; }
.gs-light.warn { background: rgba(234,179,8,0.15); border-color: rgba(234,179,8,0.4); color: #ca8a04; }
.gs-light.fail { background: rgba(220,38,38,0.15); border-color: rgba(220,38,38,0.4); color: #DC2626; }
.gs-detail {
  font-size: 0.78rem;
  line-height: 1.6;
  color: var(--fg-secondary);
}
.gs-verdict {
  margin-top: 1.5rem;
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  font-family: var(--serif);
  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
  transition: all 0.4s var(--ease-out);
}
.gs-verdict.approved {
  background: rgba(22,163,74,0.1);
  border: 1px solid rgba(22,163,74,0.3);
  color: #16a34a;
}
.gs-verdict.rejected {
  background: rgba(220,38,38,0.08);
  border: 1px solid rgba(220,38,38,0.2);
  color: #DC2626;
}
.gs-verdict.borderline {
  background: rgba(234,179,8,0.1);
  border: 1px solid rgba(234,179,8,0.3);
  color: #ca8a04;
}
.gs-empty {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--fg-secondary);
  font-size: 0.85rem;
  font-style: italic;
}

/* ═══════════════════════════════════════════════════════
   COMPONENT 3: Margin of Safety Calculator
   ═══════════════════════════════════════════════════════ */
.ms-calc { max-width: 520px; margin: 0 auto; }
.ms-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  margin-bottom: 2rem;
}
@media (max-width: 480px) { .ms-inputs { grid-template-columns: 1fr; } }
.ms-input-group label {
  display: block;
  font-family: var(--sans);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--fg-secondary);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.ms-input-group input[type=range] {
  width: 100%;
  margin: 0.3rem 0;
  accent-color: var(--accent);
  height: 4px;
}
.ms-input-val {
  font-family: var(--serif);
  font-size: 1.3rem;
  font-weight: 900;
  color: var(--accent);
  text-align: center;
}

.ms-gauge-wrap {
  margin: 2rem 0;
  text-align: center;
}
.ms-gauge-label {
  font-family: var(--sans);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--fg-secondary);
  text-transform: uppercase;
  margin-bottom: 0.8rem;
}
.ms-gauge-bar {
  position: relative;
  width: 100%;
  height: 32px;
  border-radius: 16px;
  background: linear-gradient(90deg,
    rgba(220,38,38,0.25) 0%,
    rgba(234,179,8,0.25) 40%,
    rgba(22,163,74,0.25) 100%
  );
  overflow: hidden;
  border: 1px solid var(--border);
}
.ms-gauge-fill {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  border-radius: 16px;
  transition: width 0.6s var(--ease-out), background 0.6s ease;
  min-width: 4px;
}
.ms-gauge-fill.danger { background: rgba(220,38,38,0.6); }
.ms-gauge-fill.caution { background: rgba(234,179,8,0.6); }
.ms-gauge-fill.safe { background: rgba(22,163,74,0.6); }
.ms-gauge-marker {
  position: absolute;
  top: -6px; bottom: -6px;
  width: 3px;
  background: var(--fg);
  border-radius: 2px;
  transition: left 0.6s var(--ease-out);
}
.ms-gauge-zones {
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
  font-size: 0.55rem;
  font-family: var(--sans);
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--fg-secondary);
}

.ms-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  margin-top: 1.5rem;
}
.ms-metric-card {
  padding: 1rem;
  border-radius: 10px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  text-align: center;
}
.ms-metric-card .ms-m-label {
  font-family: var(--sans);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--fg-secondary);
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}
.ms-metric-card .ms-m-value {
  font-family: var(--serif);
  font-size: 1.4rem;
  font-weight: 900;
}
.ms-m-value.safe { color: #16a34a; }
.ms-m-value.caution { color: #ca8a04; }
.ms-m-value.danger { color: #DC2626; }

.ms-verdict {
  margin-top: 1.5rem;
  padding: 1.2rem;
  border-radius: 12px;
  text-align: center;
  font-family: var(--serif);
  font-size: 0.95rem;
  line-height: 1.7;
  transition: all 0.4s ease;
}
.ms-verdict.safe-zone {
  background: rgba(22,163,74,0.08);
  border: 1px solid rgba(22,163,74,0.25);
  color: #16a34a;
}
.ms-verdict.caution-zone {
  background: rgba(234,179,8,0.08);
  border: 1px solid rgba(234,179,8,0.25);
  color: #ca8a04;
}
.ms-verdict.danger-zone {
  background: rgba(220,38,38,0.08);
  border: 1px solid rgba(220,38,38,0.2);
  color: #DC2626;
}
`;

BookEngine.injectCSS(CUSTOM_CSS);


// ═══════════════════════════════════════════════════════════════
// COMPONENT 1: Mr. Market Mood Simulator
// Scene 7 · 市场先生情绪模拟器
//
// Teaches: Ch8's allegory — Mr. Market is your servant, not your
// guide. Discipline means buying when he's depressed and ignoring
// him when he's euphoric.
// ═══════════════════════════════════════════════════════════════

var MM_INTRINSIC = 50; // hidden intrinsic value

var MM_ROUNDS = [
  { mood: 'euphoric', price: 82, emoji: '\uD83E\uDD29', speech: '"这只股票前景无限！所有人都在买！我愿意以$82卖给你——快点，明天就涨到$100了！"' },
  { mood: 'normal', price: 53, emoji: '\uD83D\uDE10', speech: '"今天行情一般，$53一股，你要不要？说实话我也看不太准。"' },
  { mood: 'depressed', price: 31, emoji: '\uD83D\uDE2D', speech: '"完了完了，经济要崩溃了！$31你拿走吧，我受不了了，再跌下去我倾家荡产！"' },
  { mood: 'euphoric', price: 91, emoji: '\uD83E\uDD11', speech: '"新纪元来了！分析师说目标价$150！$91还是便宜的——你看看那些傻瓜，还在犹豫。"' },
  { mood: 'depressed', price: 28, emoji: '\uD83D\uDE30', speech: '"战争、通胀、衰退……没人要股票了。$28，求你买走吧。我只想要现金。"' },
  { mood: 'normal', price: 48, emoji: '\uD83E\uDD14', speech: '"市场回稳了一点。$48一股，不贵也不便宜。你自己看着办吧。"' }
];

BookEngine.registerViz('mr-market-sim', {
  render: function(scene, config) {
    return '<div class="ii-module reveal" id="mrMarketModule">' +
      '<div class="ii-tag">\u4E92\u52A8\u5B9E\u9A8C \u00B7 Interactive</div>' +
      '<h3>\uD83C\uDFAD \u5E02\u573A\u5148\u751F\u60C5\u7EEA\u6A21\u62DF\u5668</h3>' +
      '<div class="ii-desc">' +
        '\u4F60\u6301\u6709\u4E00\u53EA\u80A1\u7968\uFF0C\u4F46\u4F60\u4E0D\u77E5\u9053\u5B83\u7684\u771F\u5B9E\u4EF7\u503C\u3002\u6BCF\u5929\uFF0C\u60C5\u7EEA\u4E0D\u7A33\u5B9A\u7684\u201C\u5E02\u573A\u5148\u751F\u201D\u4F1A\u4E0A\u95E8\u62A5\u4EF7\u3002<br>' +
        '\u4F60\u53EF\u4EE5\u4EE5\u4ED6\u7684\u62A5\u4EF7<b>\u4E70\u5165</b>\u3001<b>\u5356\u51FA</b>\uFF0C\u6216\u8005\u5B8C\u5168<b>\u5FFD\u7565</b>\u4ED6\u3002<br>' +
        '6\u5929\u540E\u63ED\u6653\u771F\u5B9E\u4EF7\u503C\u2014\u2014\u770B\u770B\u4F60\u7684\u7B56\u7565\u80FD\u5426\u8DD1\u8D62\u5E02\u573A\u5148\u751F\u3002' +
      '</div>' +
      '<div class="mm-sim" id="mmSim">' +
        '<div class="mm-day-counter" id="mmDayLabel">\u7B2C 1 \u5929 / \u5171 6 \u5929</div>' +
        '<div class="mm-face" id="mmFace">\uD83E\uDD29</div>' +
        '<div class="mm-speech" id="mmSpeech"></div>' +
        '<div class="mm-price-tag" id="mmPrice">$82<span>\u5E02\u573A\u5148\u751F\u7684\u62A5\u4EF7</span></div>' +
        '<div class="mm-actions" id="mmActions">' +
          '<button class="buy-btn" data-mm-action="buy">\u4E70\u5165 BUY</button>' +
          '<button data-mm-action="ignore">\u5FFD\u7565 IGNORE</button>' +
          '<button class="sell-btn" data-mm-action="sell">\u5356\u51FA SELL</button>' +
        '</div>' +
        '<div class="mm-history" id="mmHistory" style="display:none;"></div>' +
        '<div class="mm-result" id="mmResult">' +
          '<div class="mm-result-title">\u63ED\u6653\uFF1A\u8FD9\u53EA\u80A1\u7968\u7684\u5185\u5728\u4EF7\u503C\u662F\u2026\u2026</div>' +
          '<div class="mm-result-intrinsic">$' + MM_INTRINSIC + '<span>\u57FA\u4E8E\u6BCF\u80A1\u6536\u76CA\u3001\u8D44\u4EA7\u548C\u80A1\u606F\u7684\u5408\u7406\u4F30\u503C</span></div>' +
          '<div class="mm-pnl" id="mmPnl"></div>' +
          '<div class="mm-result-lesson" id="mmLesson"></div>' +
        '</div>' +
      '</div>' +
      '<button class="ii-reset-btn" id="mmReset" style="display:none;">\u21BB \u91CD\u65B0\u5F00\u59CB</button>' +
    '</div>';
  }
});


// ═══════════════════════════════════════════════════════════════
// COMPONENT 2: Graham's 7-Criteria Screener
// Scene 8 · 防御型选股7项标准筛选器
//
// Teaches: Ch14's practical 7-criteria framework for defensive
// investors. Shows how simple, mechanical rules can separate
// safe stocks from dangerous ones.
// ═══════════════════════════════════════════════════════════════

var GS_CRITERIA = [
  { name: '\u8FD0\u8425\u89C4\u6A21', rule: '\u5E74\u6536\u5165 \u2265 $100M', key: 'size' },
  { name: '\u8D22\u52A1\u5065\u5EB7', rule: '\u6D41\u52A8\u6BD4\u7387 \u2265 2:1', key: 'ratio' },
  { name: '\u76C8\u5229\u7A33\u5B9A', rule: '\u8FDE\u7EED10\u5E74\u6B63\u6536\u76CA', key: 'earnings' },
  { name: '\u80A1\u606F\u8BB0\u5F55', rule: '\u8FDE\u7EED20\u5E74\u53D1\u653E\u80A1\u606F', key: 'dividend' },
  { name: '\u76C8\u5229\u589E\u957F', rule: '10\u5E74EPS\u589E\u957F \u2265 33%', key: 'growth' },
  { name: 'PE\u5408\u7406', rule: 'PE \u2264 15\u500D\uFF083\u5E74\u5747\u503C\uFF09', key: 'pe' },
  { name: 'PE\u00D7PB', rule: 'PE \u00D7 PB \u2264 22.5', key: 'pepb' }
];

var GS_COMPANIES = {
  'emerson-1972': {
    label: 'Emerson Electric (1972)',
    desc: '\u683C\u96F7\u5384\u59C6\u4E66\u4E2D\u7684\u9632\u5FA1\u578B\u5178\u8303',
    data: {
      size: { pass: 'pass', val: '$5.44\u4EBF\u6536\u5165', detail: '\u5927\u578B\u5DE5\u4E1A\u96C6\u56E2\uFF0C\u8FDC\u8D85\u6700\u4F4E\u6807\u51C6' },
      ratio: { pass: 'pass', val: '2.5:1', detail: '\u6D41\u52A8\u8D44\u4EA7\u5145\u88D5\uFF0C\u8D22\u52A1\u7A33\u5065' },
      earnings: { pass: 'pass', val: '10/10\u5E74\u6B63\u6536\u76CA', detail: '1962-1971\u5E74\u6BCF\u5E74\u76C8\u5229\u5747\u4E3A\u6B63' },
      dividend: { pass: 'pass', val: '\u8FDE\u7EED32\u5E74', detail: '\u81EA1940\u5E74\u8D77\u4ECE\u672A\u4E2D\u65AD\u80A1\u606F' },
      growth: { pass: 'pass', val: '+86%', detail: 'EPS\u4ECE$1.20\u589E\u81F3$2.24\uFF0C\u8FDC\u8D8533%\u6807\u51C6' },
      pe: { pass: 'warn', val: '22.5\u500D', detail: '\u572815\u500D\u4E0A\u9650\u4E4B\u4E0A\u2014\u2014\u504F\u9AD8\u4F46\u4F53\u73B0\u5E02\u573A\u5BF9\u4F18\u8D28\u80A1\u7684\u6EA2\u4EF7' },
      pepb: { pass: 'warn', val: '24.7', detail: '22.5\u00D71.1 \u2014\u2014 \u8F7B\u5FAE\u8D85\u6807\uFF0C\u63A5\u8FD1\u8FB9\u754C' }
    },
    verdict: 'borderline',
    verdictText: '\u201C\u63A5\u8FD1\u53CA\u683C\u201D\u2014\u2014 5/7\u901A\u8FC7\uFF0C\u4F46PE\u504F\u9AD8\u3002\u683C\u96F7\u5384\u59C6\u4F1A\u8BF4\uFF1A\u53EF\u4EE5\u4F5C\u4E3A\u5206\u6563\u7EC4\u5408\u7684\u4E00\u90E8\u5206\uFF0C\u4F46\u4E0D\u5E94\u8FD4\u91CD\u4ED3\u3002'
  },
  'etoys-1999': {
    label: 'eToys (1999)',
    desc: '\u4E92\u8054\u7F51\u6CE1\u6CAB\u5178\u578B',
    data: {
      size: { pass: 'fail', val: '$3000\u4E07\u6536\u5165', detail: '\u8FDC\u4F4E\u4E8E$1\u4EBF\u6807\u51C6\uFF0C\u4F46\u5E02\u503C\u5374\u8FBE$80\u4EBF' },
      ratio: { pass: 'warn', val: '\u4F9D\u8D56\u878D\u8D44', detail: '\u73B0\u91D1\u6765\u81EAIPO\u800C\u975E\u7ECF\u8425\uFF0C\u6D41\u52A8\u6BD4\u7387\u865A\u9AD8' },
      earnings: { pass: 'fail', val: '\u4ECE\u672A\u76C8\u5229', detail: '\u6210\u7ACB\u4EE5\u6765\u6BCF\u5E74\u4E8F\u635F\uFF0C\u4E14\u4E8F\u635F\u52A0\u901F\u6269\u5927' },
      dividend: { pass: 'fail', val: '\u4ECE\u672A\u53D1\u653E', detail: '\u6CA1\u6709\u5229\u6DA6\u53EF\u5206\u914D' },
      growth: { pass: 'fail', val: 'N/A', detail: '\u6CA1\u6709\u76C8\u5229\u57FA\u7840\u65E0\u6CD5\u8BA1\u7B97\u589E\u957F' },
      pe: { pass: 'fail', val: '\u8D1F\u503C', detail: '\u4E8F\u635F\u4F01\u4E1A\u65E0PE\u53EF\u8A00\u2014\u2014\u5374\u88AB\u5E02\u573A\u7528\u201C\u6536\u5165\u500D\u6570\u201D\u7ED9\u51FA\u8352\u8C2C\u4F30\u503C' },
      pepb: { pass: 'fail', val: '\u65E0\u7A77\u5927', detail: 'PE\u4E3A\u8D1F\uFF0CPB\u53EF\u80FD\u8D85100\u2014\u2014\u5B8C\u5168\u8131\u79BB\u683C\u96F7\u5384\u59C6\u6846\u67B6' }
    },
    verdict: 'rejected',
    verdictText: '\u201C\u5371\u9669\uFF01\u201D\u2014\u2014 0/7\u901A\u8FC7\u3002\u8FD9\u6B63\u662F\u683C\u96F7\u5384\u59C6\u7B5B\u9009\u5668\u8BBE\u8BA1\u6765\u62E6\u622A\u7684\u80A1\u7968\u3002eToys\u4E8E2001\u5E74\u7834\u4EA7\u3002'
  },
  'sysco-2000': {
    label: 'Sysco Corp (2000)',
    desc: '\u5179\u5A01\u683C\u63A8\u8350\u7684\u7A33\u5065\u6A21\u8303',
    data: {
      size: { pass: 'pass', val: '$192\u4EBF\u6536\u5165', detail: '\u5317\u7F8E\u6700\u5927\u98DF\u54C1\u5206\u9500\u5546\uFF0C\u89C4\u6A21\u5341\u8DB3' },
      ratio: { pass: 'pass', val: '2.1:1', detail: '\u6D41\u52A8\u6BD4\u7387\u521A\u597D\u8FBE\u6807\uFF0C\u7A33\u5065\u4F46\u4E0D\u7B97\u5BCC\u88D5' },
      earnings: { pass: 'pass', val: '10/10\u5E74\u6B63\u6536\u76CA', detail: '\u5373\u4F7F\u5728\u7ECF\u6D4E\u8870\u9000\u4E2D\u4E5F\u4FDD\u6301\u76C8\u5229' },
      dividend: { pass: 'pass', val: '\u8FDE\u7EED24\u5E74', detail: '\u81EA1976\u5E74\u8D77\u4ECE\u672A\u4E2D\u65AD\uFF0C\u4E14\u6301\u7EED\u589E\u957F' },
      growth: { pass: 'pass', val: '+202%', detail: 'EPS10\u5E74\u589E\u957F3\u500D\uFF0C\u8FDC\u8D8533%\u6807\u51C6' },
      pe: { pass: 'pass', val: '12.8\u500D', detail: '\u4F4E\u4E8E15\u500D\u4E0A\u9650\uFF0C\u5C5E\u4E8E\u5408\u7406\u4F30\u503C\u533A\u95F4' },
      pepb: { pass: 'pass', val: '16.9', detail: '12.8\u00D71.32 = 16.9\uFF0C\u8FDC\u4F4E\u4E8E22.5\u4E0A\u9650' }
    },
    verdict: 'approved',
    verdictText: '\u201C\u683C\u96F7\u5384\u59C6\u8BA4\u8BC1\u201D\u2014\u2014 7/7\u5168\u90E8\u901A\u8FC7\u3002\u5178\u578B\u7684\u9632\u5FA1\u578B\u6295\u8D44\u6807\u7684\u3002Sysco\u6B64\u540E3\u5E74\u80A1\u4EF7+56%\u2014\u2014\u6B63\u662F\u7B80\u5355\u89C4\u5219\u7684\u80DC\u5229\u3002'
  },
  'cisco-2000': {
    label: 'Cisco Systems (2000)',
    desc: '\u201C\u660E\u661F\u80A1\u201D\u6CE1\u6CAB\u5178\u578B',
    data: {
      size: { pass: 'pass', val: '$189\u4EBF\u6536\u5165', detail: '\u89C4\u6A21\u8FBE\u6807\uFF0C\u4F46\u89C4\u6A21\u4E0D\u80FD\u66FF\u4EE3\u4F30\u503C\u7684\u5408\u7406\u6027' },
      ratio: { pass: 'pass', val: '2.2:1', detail: '\u6D41\u52A8\u6BD4\u7387\u8FBE\u6807\uFF0C\u53D7\u76CA\u4E8E\u9AD8\u73B0\u91D1\u6D41' },
      earnings: { pass: 'warn', val: '7/10\u5E74', detail: '\u65E9\u671F3\u5E74\u6CA1\u6709\u76C8\u5229\u8BB0\u5F55\uFF08\u4E0A\u5E02\u65F6\u95F4\u77ED\uFF09' },
      dividend: { pass: 'fail', val: '\u4ECE\u672A\u53D1\u653E', detail: '\u7F8E\u5176\u540D\u66F0\u201C\u518D\u6295\u8D44\u201D\uFF0C\u5B9E\u5219\u7528\u4E8E\u6536\u8D2D\u548C\u56DE\u8D2D\u62B5\u6D88\u671F\u6743\u7A00\u91CA' },
      growth: { pass: 'pass', val: '+400%+', detail: '\u589E\u957F\u786E\u5B9E\u60CA\u4EBA\u2014\u2014\u4F46\u589E\u957F\u4E0D\u80FD\u66FF\u4EE3\u4F30\u503C' },
      pe: { pass: 'fail', val: '196\u500D', detail: '\u8D85\u8FC715\u500D\u6807\u51C613\u500D\u2014\u2014\u5F53\u65F6\u5E02\u573A\u8BA4\u4E3A\u201C\u89C4\u5219\u4E0D\u9002\u7528\u4E8E\u65B0\u7ECF\u6D4E\u201D' },
      pepb: { pass: 'fail', val: '\u2248 3920', detail: '196\u00D720 \u2014\u2014 \u662F\u4E0A\u9650\u768422.5\u7684174\u500D\u3002\u4EFB\u4F55\u5B57\u9762\u90FD\u65E0\u6CD5\u4E3A\u6B64\u8FA9\u62A4\u3002' }
    },
    verdict: 'rejected',
    verdictText: '\u201C\u5371\u9669\uFF01\u201D\u2014\u2014 3/7\u901A\u8FC7\u3002PE 196\u500D\u548C\u4ECE\u4E0D\u5206\u7EA2\u5C31\u662F\u4E24\u9762\u7EA2\u65D7\u3002\u601D\u79D1\u6B64\u540E3\u5E74\u80A1\u4EF7-75%\u3002\u7B80\u5355\u7684\u7B5B\u9009\u5668\u5C31\u80FD\u6551\u4F60\u3002'
  }
};

BookEngine.registerViz('graham-screener', {
  render: function(scene, config) {
    var compBtns = '';
    Object.keys(GS_COMPANIES).forEach(function(key) {
      compBtns += '<button data-gs-company="' + key + '">' + GS_COMPANIES[key].label + '</button>';
    });

    var criteriaRows = '';
    GS_CRITERIA.forEach(function(c) {
      criteriaRows +=
        '<div class="gs-row" data-gs-criterion="' + c.key + '">' +
          '<div class="gs-criterion">' + c.name + '<small>' + c.rule + '</small></div>' +
          '<div class="gs-light" data-gs-light="' + c.key + '">\u2014</div>' +
          '<div class="gs-detail" data-gs-detail="' + c.key + '"></div>' +
        '</div>';
    });

    return '<div class="ii-module reveal" id="grahamScreener">' +
      '<div class="ii-tag">\u4E92\u52A8\u5DE5\u5177 \u00B7 Interactive</div>' +
      '<h3>\uD83D\uDD0D \u9632\u5FA1\u578B\u9009\u80A17\u9879\u6807\u51C6\u7B5B\u9009\u5668</h3>' +
      '<div class="ii-desc">' +
        '\u683C\u96F7\u5384\u59C6\u5728\u7B2C14\u7AE0\u5217\u51FA\u4E867\u9879\u7B5B\u9009\u6807\u51C6\u2014\u2014\u4E0D\u9700\u8981\u590D\u6742\u5206\u6790\uFF0C\u53EA\u9700\u8981\u7B80\u5355\u7684\u8D22\u52A1\u6570\u636E\u3002<br>' +
        '\u9009\u62E9\u4E00\u5BB6\u516C\u53F8\uFF0C\u770B\u770B\u5B83\u80FD\u5426\u901A\u8FC7\u683C\u96F7\u5384\u59C6\u7684\u7B5B\u9009\u3002' +
      '</div>' +
      '<div class="gs-company-btns" id="gsCompanyBtns">' + compBtns + '</div>' +
      '<div id="gsContent">' +
        '<div class="gs-empty">\u2190 \u8BF7\u9009\u62E9\u4E00\u5BB6\u516C\u53F8\u5F00\u59CB\u7B5B\u9009</div>' +
      '</div>' +
    '</div>';
  }
});


// ═══════════════════════════════════════════════════════════════
// COMPONENT 3: Margin of Safety Calculator
// Scene 12 · 安全边际计算器
//
// Teaches: Ch20's central thesis — the mathematical relationship
// between earnings yield, bond yield, and margin of safety.
// PE×PB ≤ 22.5 as the combined valuation ceiling.
// ═══════════════════════════════════════════════════════════════

BookEngine.registerViz('margin-calculator', {
  render: function(scene, config) {
    return '<div class="ii-module reveal" id="marginCalc">' +
      '<div class="ii-tag">\u4E92\u52A8\u5DE5\u5177 \u00B7 Interactive</div>' +
      '<h3>\uD83D\uDEE1\uFE0F \u5B89\u5168\u8FB9\u9645\u8BA1\u7B97\u5668</h3>' +
      '<div class="ii-desc">' +
        '\u683C\u96F7\u5384\u59C6\u7684\u6838\u5FC3\u516C\u5F0F\uFF1A<b>\u5B89\u5168\u8FB9\u9645 = \u76C8\u5229\u6536\u76CA\u7387 \u2212 \u503A\u5238\u6536\u76CA\u7387</b>\u3002<br>' +
        '\u8C03\u6574\u4E0B\u65B9\u7684\u6ED1\u5757\uFF0C\u5B9E\u65F6\u89C2\u5BDF\u5B89\u5168\u8FB9\u9645\u5982\u4F55\u53D8\u5316\u3002' +
      '</div>' +
      '<div class="ms-calc">' +
        '<div class="ms-inputs">' +
          '<div class="ms-input-group">' +
            '<label>PE \u6BD4\u7387\uFF083\u5E74\u5E73\u5747\uFF09</label>' +
            '<div class="ms-input-val" id="msPeVal">15</div>' +
            '<input type="range" id="msPeSlider" min="5" max="50" value="15" step="1">' +
          '</div>' +
          '<div class="ms-input-group">' +
            '<label>PB \u6BD4\u7387</label>' +
            '<div class="ms-input-val" id="msPbVal">1.5</div>' +
            '<input type="range" id="msPbSlider" min="0.5" max="8" value="1.5" step="0.1">' +
          '</div>' +
          '<div class="ms-input-group">' +
            '<label>AAA \u503A\u5238\u6536\u76CA\u7387</label>' +
            '<div class="ms-input-val" id="msBondVal">5.0%</div>' +
            '<input type="range" id="msBondSlider" min="1" max="10" value="5" step="0.1">' +
          '</div>' +
          '<div class="ms-input-group">' +
            '<label>\u80A1\u4EF7 ($)</label>' +
            '<div class="ms-input-val" id="msPriceVal">$50</div>' +
            '<input type="range" id="msPriceSlider" min="10" max="200" value="50" step="1">' +
          '</div>' +
        '</div>' +

        '<div class="ms-gauge-wrap">' +
          '<div class="ms-gauge-label">\u5B89\u5168\u8FB9\u9645\u5F3A\u5EA6</div>' +
          '<div class="ms-gauge-bar">' +
            '<div class="ms-gauge-fill" id="msGaugeFill"></div>' +
            '<div class="ms-gauge-marker" id="msGaugeMarker" style="left:50%"></div>' +
          '</div>' +
          '<div class="ms-gauge-zones"><span>\u5371\u9669</span><span>\u8C28\u614E</span><span>\u5B89\u5168</span></div>' +
        '</div>' +

        '<div class="ms-metrics">' +
          '<div class="ms-metric-card">' +
            '<div class="ms-m-label">\u76C8\u5229\u6536\u76CA\u7387 (E/P)</div>' +
            '<div class="ms-m-value" id="msEarningsYield">6.7%</div>' +
          '</div>' +
          '<div class="ms-metric-card">' +
            '<div class="ms-m-label">PE \u00D7 PB \u4E58\u79EF</div>' +
            '<div class="ms-m-value" id="msPePb">22.5</div>' +
          '</div>' +
          '<div class="ms-metric-card">' +
            '<div class="ms-m-label">\u5B89\u5168\u8FB9\u9645</div>' +
            '<div class="ms-m-value" id="msMargin">1.7%</div>' +
          '</div>' +
          '<div class="ms-metric-card">' +
            '<div class="ms-m-label">\u6BCF\u80A1\u5185\u5728\u4EF7\u503C</div>' +
            '<div class="ms-m-value" id="msIntrinsic">$53</div>' +
          '</div>' +
        '</div>' +

        '<div class="ms-verdict" id="msVerdict"></div>' +
      '</div>' +
    '</div>';
  }
});


// ═══════════════════════════════════════════════════════════════
// INTERACTIVE MODULE INITIALIZERS
// ═══════════════════════════════════════════════════════════════

BookEngine.registerInit(function initIntelligentInvestorComponents() {

  // ── Mr. Market Simulator ──────────────────────────────────
  (function() {
    var currentRound = 0;
    var holdings = 0; // net shares: + = bought, - = sold short
    var cashFlow = 0; // cash impact of trades
    var history = [];

    var faceEl = document.getElementById('mmFace');
    var speechEl = document.getElementById('mmSpeech');
    var priceEl = document.getElementById('mmPrice');
    var dayLabel = document.getElementById('mmDayLabel');
    var actionsEl = document.getElementById('mmActions');
    var historyEl = document.getElementById('mmHistory');
    var resultEl = document.getElementById('mmResult');
    var pnlEl = document.getElementById('mmPnl');
    var lessonEl = document.getElementById('mmLesson');
    var resetBtn = document.getElementById('mmReset');

    if (!faceEl) return;

    function showRound(idx) {
      var r = MM_ROUNDS[idx];
      dayLabel.textContent = '\u7B2C ' + (idx + 1) + ' \u5929 / \u5171 6 \u5929';
      faceEl.className = 'mm-face ' + r.mood;
      faceEl.textContent = r.emoji;
      speechEl.innerHTML = r.speech;
      priceEl.innerHTML = '$' + r.price + '<span>\u5E02\u573A\u5148\u751F\u7684\u62A5\u4EF7</span>';
      // Enable buttons
      var btns = actionsEl.querySelectorAll('button');
      btns.forEach(function(b) { b.disabled = false; });
    }

    function recordAction(action) {
      var r = MM_ROUNDS[currentRound];
      if (action === 'buy') {
        holdings += 1;
        cashFlow -= r.price;
      } else if (action === 'sell') {
        holdings -= 1;
        cashFlow += r.price;
      }
      history.push({ day: currentRound + 1, mood: r.mood, price: r.price, action: action });

      // Update history display
      historyEl.style.display = 'block';
      var actionCls = action === 'buy' ? 'bought' : action === 'sell' ? 'sold' : 'ignored';
      var actionText = action === 'buy' ? '\u4E70\u5165 $' + r.price : action === 'sell' ? '\u5356\u51FA $' + r.price : '\u5FFD\u7565';
      historyEl.innerHTML += '<div class="mm-history-row">' +
        '<span>\u7B2C' + (currentRound + 1) + '\u5929 ' + r.emoji + ' $' + r.price + '</span>' +
        '<span class="mm-h-action ' + actionCls + '">' + actionText + '</span>' +
        '</div>';

      // Disable buttons during transition
      var btns = actionsEl.querySelectorAll('button');
      btns.forEach(function(b) { b.disabled = true; });

      currentRound++;
      if (currentRound < MM_ROUNDS.length) {
        setTimeout(function() { showRound(currentRound); }, 600);
      } else {
        setTimeout(showResult, 800);
      }
    }

    function showResult() {
      actionsEl.style.display = 'none';
      dayLabel.textContent = '\u6E38\u620F\u7ED3\u675F';
      faceEl.className = 'mm-face';
      faceEl.textContent = '\uD83C\uDFAD';
      speechEl.innerHTML = '\u201C\u4F60\u6700\u7EC8\u770B\u5230\u4E86\u6211\u7684\u771F\u9762\u76EE\u2014\u2014\u6211\u7684\u62A5\u4EF7\u4ECE\u6765\u4E0D\u4EE3\u8868\u4EF7\u503C\u3002\u201D';
      priceEl.innerHTML = '';

      // Calculate P&L: final value = holdings × intrinsic + cashFlow
      var finalValue = holdings * MM_INTRINSIC + cashFlow;
      var totalInvested = 0;
      history.forEach(function(h) {
        if (h.action === 'buy') totalInvested += h.price;
      });

      var pnlText = '';
      var pnlClass = 'neutral';
      if (holdings === 0 && cashFlow === 0) {
        pnlText = '\u51C0\u6536\u76CA\uFF1A$0\uFF08\u4F60\u5168\u7A0B\u65C1\u89C2\uFF09';
      } else if (finalValue > 0) {
        pnlText = '\u51C0\u6536\u76CA\uFF1A+$' + finalValue.toFixed(0) + '\uFF08\u6301\u4ED3' + holdings + '\u80A1 \u00D7 $' + MM_INTRINSIC + ' + \u73B0\u91D1$' + cashFlow.toFixed(0) + '\uFF09';
        pnlClass = 'positive';
      } else if (finalValue < 0) {
        pnlText = '\u51C0\u4E8F\u635F\uFF1A$' + finalValue.toFixed(0) + '\uFF08\u6301\u4ED3' + holdings + '\u80A1 \u00D7 $' + MM_INTRINSIC + ' + \u73B0\u91D1$' + cashFlow.toFixed(0) + '\uFF09';
        pnlClass = 'negative';
      } else {
        pnlText = '\u51C0\u6536\u76CA\uFF1A$0\uFF08\u6301\u5E73\uFF09';
      }
      pnlEl.textContent = pnlText;
      pnlEl.className = 'mm-pnl ' + pnlClass;

      // Analyze behavior
      var boughtLow = 0, boughtHigh = 0, soldLow = 0, soldHigh = 0, ignored = 0;
      history.forEach(function(h) {
        if (h.action === 'buy' && h.price < MM_INTRINSIC) boughtLow++;
        if (h.action === 'buy' && h.price > MM_INTRINSIC) boughtHigh++;
        if (h.action === 'sell' && h.price < MM_INTRINSIC) soldLow++;
        if (h.action === 'sell' && h.price > MM_INTRINSIC) soldHigh++;
        if (h.action === 'ignore') ignored++;
      });

      var lesson = '';
      if (boughtLow >= 2 && boughtHigh === 0) {
        lesson = '\u2705 <b>\u683C\u96F7\u5384\u59C6\u5F0F\u7EAA\u5F8B\uFF01</b> \u4F60\u53EA\u5728\u5E02\u573A\u5148\u751F\u6291\u90C1\u65F6\u4E70\u5165\uFF0C\u5B8C\u7F8E\u8BC0\u91CA\u4E86\u201C\u5E02\u573A\u5148\u751F\u662F\u4F60\u7684\u4EC6\u4EBA\uFF0C\u4E0D\u662F\u4F60\u7684\u5411\u5BFC\u201D\u3002\u4F60\u7684\u8D2D\u4E70\u51B3\u7B56\u57FA\u4E8E\u4EF7\u683C\u4E0E\u4EF7\u503C\u7684\u5173\u7CFB\uFF0C\u800C\u975E\u60C5\u7EEA\u3002';
      } else if (boughtHigh >= 2) {
        lesson = '\u26A0\uFE0F <b>\u4F60\u88AB\u5E02\u573A\u5148\u751F\u7684\u4E50\u89C2\u60C5\u7EEA\u4F20\u67D3\u4E86\u3002</b> \u5728\u62A5\u4EF7$82\u548C$91\u65F6\u4E70\u5165\u2014\u2014\u8FDC\u9AD8\u4E8E\u5185\u5728\u4EF7\u503C$50\u3002\u683C\u96F7\u5384\u59C6\u8B66\u544A\uFF1A\u5F53\u6240\u6709\u4EBA\u90FD\u5174\u594B\u65F6\uFF0C\u6B63\u662F\u4F60\u6700\u5E94\u8BE5\u8C28\u614E\u7684\u65F6\u5019\u3002';
      } else if (soldLow >= 1) {
        lesson = '\u274C <b>\u6050\u614C\u6027\u629B\u552E\uFF01</b> \u4F60\u5728\u5E02\u573A\u5148\u751F\u6700\u6291\u90C1\u65F6\u5356\u51FA\uFF0C\u4F4E\u4E8E\u5185\u5728\u4EF7\u503C\u2014\u2014\u8FD9\u6B63\u662F\u683C\u96F7\u5384\u59C6\u6700\u62C5\u5FC3\u7684\u884C\u4E3A\u3002\u201C\u771F\u6B63\u7684\u6295\u8D44\u8005\u51E0\u4E4E\u4ECE\u4E0D\u4F1A\u88AB\u8FEB\u5356\u51FA\u3002\u201D';
      } else if (ignored >= 5) {
        lesson = '\uD83D\uDE10 <b>\u8FC7\u5EA6\u4FDD\u5B88\u3002</b> \u5FFD\u7565\u5E02\u573A\u5148\u751F\u5F53\u7136\u4E0D\u4F1A\u4E8F\u94B1\uFF0C\u4F46\u4F60\u4E5F\u9519\u8FC7\u4E86$28\u548C$31\u7684\u4F4E\u4EF7\u4E70\u5165\u673A\u4F1A\u3002\u683C\u96F7\u5384\u59C6\u8BF4\u7684\u201C\u5229\u7528\u5E02\u573A\u5148\u751F\u201D\u4E0D\u4EC5\u662F\u5FFD\u7565\u4ED6\u2014\u2014\u800C\u662F\u5728\u4ED6\u7684\u62A5\u4EF7\u5BF9\u4F60\u6709\u5229\u65F6\u884C\u52A8\u3002';
      } else {
        lesson = '\uD83D\uDCA1 \u4F60\u7684\u7B56\u7565\u6DF7\u5408\u4E86\u7EAA\u5F8B\u548C\u60C5\u7EEA\u3002\u683C\u96F7\u5384\u59C6\u7684\u6838\u5FC3\u6559\u8BAD\uFF1A\u5E02\u573A\u5148\u751F\u6BCF\u5929\u90FD\u4F1A\u4E0A\u95E8\uFF0C\u4F46\u4F60\u6CA1\u6709\u4E49\u52A1\u8DDF\u4ED6\u4EA4\u6613\u3002\u53EA\u6709\u5F53\u4EF7\u683C\u660E\u663E\u4F4E\u4E8E\u4EF7\u503C\u65F6\u624D\u4E70\u5165\uFF0C\u660E\u663E\u9AD8\u4E8E\u4EF7\u503C\u65F6\u624D\u5356\u51FA\u2014\u2014\u5176\u4F59\u65F6\u95F4\uFF0C\u5FFD\u7565\u4ED6\u3002';
      }
      lessonEl.innerHTML = lesson;

      resultEl.classList.add('show');
      resetBtn.style.display = 'inline-flex';
    }

    // Bind action buttons
    actionsEl.addEventListener('click', function(e) {
      var btn = e.target.closest('button[data-mm-action]');
      if (!btn || btn.disabled) return;
      recordAction(btn.dataset.mmAction);
    });

    // Reset
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        currentRound = 0;
        holdings = 0;
        cashFlow = 0;
        history = [];
        historyEl.innerHTML = '';
        historyEl.style.display = 'none';
        resultEl.classList.remove('show');
        resetBtn.style.display = 'none';
        actionsEl.style.display = 'flex';
        showRound(0);
      });
    }

    // Start
    showRound(0);
  })();

  // ── Graham's 7-Criteria Screener ──────────────────────────
  (function() {
    var btnsWrap = document.getElementById('gsCompanyBtns');
    var contentWrap = document.getElementById('gsContent');
    if (!btnsWrap) return;

    function renderCompany(key) {
      var comp = GS_COMPANIES[key];
      if (!comp) return;

      // Update active button
      btnsWrap.querySelectorAll('button').forEach(function(b) {
        b.classList.toggle('active', b.dataset.gsCompany === key);
      });

      var html = '<div class="gs-grid">';
      var passCount = 0;
      GS_CRITERIA.forEach(function(c, i) {
        var d = comp.data[c.key];
        var icon = d.pass === 'pass' ? '\u2713' : d.pass === 'warn' ? '~' : '\u2717';
        if (d.pass === 'pass') passCount++;
        html += '<div class="gs-row" style="animation: fadeIn 0.3s ease ' + (i * 0.08) + 's both">' +
          '<div class="gs-criterion">' + c.name + '<small>' + c.rule + '</small></div>' +
          '<div class="gs-light ' + d.pass + '">' + icon + '</div>' +
          '<div class="gs-detail"><b>' + d.val + '</b> \u2014 ' + d.detail + '</div>' +
          '</div>';
      });
      html += '</div>';

      html += '<div class="gs-verdict ' + comp.verdict + '">' +
        '<b>' + passCount + '/7</b> \u901A\u8FC7 \u00B7 ' + comp.verdictText +
        '</div>';

      contentWrap.innerHTML = html;
    }

    btnsWrap.addEventListener('click', function(e) {
      var btn = e.target.closest('button[data-gs-company]');
      if (!btn) return;
      renderCompany(btn.dataset.gsCompany);
    });
  })();

  // ── Margin of Safety Calculator ───────────────────────────
  (function() {
    var peSlider = document.getElementById('msPeSlider');
    var pbSlider = document.getElementById('msPbSlider');
    var bondSlider = document.getElementById('msBondSlider');
    var priceSlider = document.getElementById('msPriceSlider');

    if (!peSlider) return;

    function update() {
      var pe = parseFloat(peSlider.value);
      var pb = parseFloat(pbSlider.value);
      var bondRate = parseFloat(bondSlider.value);
      var price = parseFloat(priceSlider.value);

      // Update display values
      document.getElementById('msPeVal').textContent = pe;
      document.getElementById('msPbVal').textContent = pb.toFixed(1);
      document.getElementById('msBondVal').textContent = bondRate.toFixed(1) + '%';
      document.getElementById('msPriceVal').textContent = '$' + price;

      // Calculations
      var earningsYield = (1 / pe) * 100; // E/P in %
      var pepb = pe * pb;
      var margin = earningsYield - bondRate; // safety margin in percentage points
      // Graham's intrinsic value formula (simplified): V = EPS × (8.5 + 2g)
      // Using: EPS = price/PE, g estimated from PB (higher PB → higher growth expectations)
      var eps = price / pe;
      var bv = price / pb;
      // Simplified intrinsic value: sqrt(22.5 × EPS × BV) — Graham's formula
      var intrinsic = Math.sqrt(22.5 * eps * bv);

      // Update metric cards
      var eyEl = document.getElementById('msEarningsYield');
      eyEl.textContent = earningsYield.toFixed(1) + '%';
      eyEl.className = 'ms-m-value ' + (earningsYield > bondRate * 1.5 ? 'safe' : earningsYield > bondRate ? 'caution' : 'danger');

      var pepbEl = document.getElementById('msPePb');
      pepbEl.textContent = pepb.toFixed(1);
      pepbEl.className = 'ms-m-value ' + (pepb <= 22.5 ? 'safe' : pepb <= 30 ? 'caution' : 'danger');

      var marginEl = document.getElementById('msMargin');
      marginEl.textContent = margin.toFixed(1) + '%';
      marginEl.className = 'ms-m-value ' + (margin >= 3 ? 'safe' : margin >= 0 ? 'caution' : 'danger');

      var intrinsicEl = document.getElementById('msIntrinsic');
      intrinsicEl.textContent = '$' + intrinsic.toFixed(0);
      var priceToValue = price / intrinsic;
      intrinsicEl.className = 'ms-m-value ' + (priceToValue <= 0.75 ? 'safe' : priceToValue <= 1.0 ? 'caution' : 'danger');

      // Update gauge
      // Normalize margin to 0-100 range: -5% → 0%, +8% → 100%
      var gaugePercent = Math.max(0, Math.min(100, ((margin + 5) / 13) * 100));
      var fillEl = document.getElementById('msGaugeFill');
      fillEl.style.width = gaugePercent + '%';
      fillEl.className = 'ms-gauge-fill ' + (margin >= 3 ? 'safe' : margin >= 0 ? 'caution' : 'danger');

      var markerEl = document.getElementById('msGaugeMarker');
      markerEl.style.left = gaugePercent + '%';

      // Update verdict
      var verdictEl = document.getElementById('msVerdict');
      if (margin >= 3 && pepb <= 22.5) {
        verdictEl.className = 'ms-verdict safe-zone';
        verdictEl.innerHTML = '\u2705 <b>\u5B89\u5168\u8FB9\u9645\u5145\u8DB3</b> \u2014 \u76C8\u5229\u6536\u76CA\u7387\u8D85\u8FC7\u503A\u5238' + margin.toFixed(1) + '\u4E2A\u767E\u5206\u70B9\uFF0CPE\u00D7PB=' + pepb.toFixed(1) + '\u2264 22.5\u3002\u5185\u5728\u4EF7\u503C\u2248$' + intrinsic.toFixed(0) + '\uFF0C\u5F53\u524D\u4EF7$' + price + '\u3002\u683C\u96F7\u5384\u59C6\u4F1A\u8BF4\uFF1A\u8FD9\u662F\u503C\u5F97\u8003\u8651\u7684\u6295\u8D44\u3002';
      } else if (margin >= 0 && pepb <= 30) {
        verdictEl.className = 'ms-verdict caution-zone';
        verdictEl.innerHTML = '\u26A0\uFE0F <b>\u8FB9\u9645\u5730\u5E26</b> \u2014 \u5B89\u5168\u8FB9\u9645\u4EC5' + margin.toFixed(1) + '%\uFF0CPE\u00D7PB=' + pepb.toFixed(1) + '\u3002\u683C\u96F7\u5384\u59C6\u4F1A\u8BF4\uFF1A\u4E0D\u662F\u5371\u9669\uFF0C\u4F46\u4E5F\u4E0D\u591F\u5B89\u5168\u3002\u5982\u679C\u4E70\u5165\uFF0C\u786E\u4FDD\u5206\u6563\u6301\u6709\u3002';
      } else {
        verdictEl.className = 'ms-verdict danger-zone';
        verdictEl.innerHTML = '\u274C <b>\u7F3A\u4E4F\u5B89\u5168\u8FB9\u9645</b> \u2014 ' +
          (margin < 0 ? '\u76C8\u5229\u6536\u76CA\u7387(' + earningsYield.toFixed(1) + '%)\u751A\u81F3\u4F4E\u4E8E\u503A\u5238(' + bondRate.toFixed(1) + '%)\uFF0C' : '') +
          (pepb > 30 ? 'PE\u00D7PB=' + pepb.toFixed(1) + '\u8FDC\u8D85\u4E0A\u9650\u3002' : '') +
          '\u683C\u96F7\u5384\u59C6\u4F1A\u8BF4\uFF1A\u201C\u4EF7\u683C\u5F88\u5371\u9669\u2014\u2014\u4F60\u7684\u5B89\u5168\u8FB9\u9645\u5DF2\u7ECF\u6D88\u5931\u3002\u201D';
      }
    }

    peSlider.addEventListener('input', update);
    pbSlider.addEventListener('input', update);
    bondSlider.addEventListener('input', update);
    priceSlider.addEventListener('input', update);

    // Initial calculation
    update();
  })();

});
