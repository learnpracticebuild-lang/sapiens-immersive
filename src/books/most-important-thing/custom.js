// ═══════════════════════════════════════════════════════════════
// THE MOST IMPORTANT THING — Custom Components & Styles
// Howard Marks · 三个核心工具的交互式可视化
//
// Component 1: mit-risk-check  → Scene 5  · 风险定义对决
// Component 2: mit-thermometer → Scene 13 · 市场温度计
// Component 3: mit-asymmetry   → Scene 14 · 不对称性分析器
// ═══════════════════════════════════════════════════════════════

// ── CUSTOM CSS ──────────────────────────────────────────────────
const CUSTOM_CSS = `

/* ═══════════════════════════════════════════════════════
   SHARED: Interactive Module Shell
   ═══════════════════════════════════════════════════════ */
.mit-module {
  margin: 3rem 0;
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--accent-glow);
  position: relative;
  overflow: hidden;
}
.mit-module::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-dim), transparent 60%);
  pointer-events: none;
  opacity: 0.6;
}
.mit-module > * { position: relative; z-index: 1; }
.mit-module h3 {
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: var(--fg);
}
.mit-tag {
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
.mit-tag::before {
  content: '';
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: mitPulse 2s ease-in-out infinite;
}
@keyframes mitPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.3; transform: scale(0.5); }
}
.mit-desc {
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--fg-secondary);
  margin-bottom: 1.8rem;
}
.mit-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.3rem;
  border-radius: 100px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--fg-secondary);
  font-family: var(--sans);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.25s ease;
}
.mit-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-glow);
}
.mit-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

/* ═══════════════════════════════════════════════════════
   COMPONENT 1: Risk Definition Check (mit-risk-check)
   风险定义对决 · Scene 5
   ═══════════════════════════════════════════════════════ */
.rc-toggle {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.rc-toggle button {
  padding: 0.6rem 1.4rem;
  border-radius: 100px;
  border: 2px solid var(--border);
  background: transparent;
  font-family: var(--sans);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--fg);
}
.rc-toggle button:hover {
  border-color: var(--accent-mid);
  background: var(--accent-glow);
}
.rc-toggle button.rc-active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.rc-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.rc-card {
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid var(--border);
  background: var(--glass-bg);
  transition: all 0.4s ease;
  position: relative;
}
.rc-card-name {
  font-family: var(--serif);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  color: var(--fg);
}
.rc-card-sub {
  font-size: 0.72rem;
  color: var(--fg-secondary);
  margin-bottom: 1rem;
  line-height: 1.5;
}
.rc-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.78rem;
}
.rc-stat:last-child { border-bottom: none; }
.rc-stat-label { color: var(--fg-secondary); }
.rc-stat-val {
  font-weight: 700;
  font-family: var(--sans);
  font-size: 0.72rem;
}
.rc-stat-val.high  { color: #DC2626; }
.rc-stat-val.mid   { color: #D97706; }
.rc-stat-val.low   { color: #16a34a; }
.rc-rank-badge {
  position: absolute;
  top: -10px; right: 12px;
  padding: 0.2rem 0.7rem;
  border-radius: 100px;
  font-family: var(--sans);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(-4px);
  transition: all 0.4s ease;
}
.rc-rank-badge.show {
  opacity: 1;
  transform: translateY(0);
}
.rc-rank-badge.rank1 { background: #DC2626; color: #fff; }
.rc-rank-badge.rank2 { background: #D97706; color: #fff; }
.rc-rank-badge.rank3 { background: #16a34a; color: #fff; }
.rc-card.rank-1 { border-color: rgba(220,38,38,0.4); }
.rc-card.rank-2 { border-color: rgba(217,119,6,0.4); }
.rc-card.rank-3 { border-color: rgba(22,163,74,0.4); }
.rc-insight {
  margin-top: 1.5rem;
  padding: 1.2rem 1.5rem;
  border-radius: 10px;
  border-left: 3px solid var(--accent);
  background: var(--accent-dim);
  font-size: 0.88rem;
  line-height: 1.8;
  color: var(--fg);
  opacity: 0;
  transform: translateY(6px);
  transition: all 0.4s ease;
}
.rc-insight.show {
  opacity: 1;
  transform: translateY(0);
}

/* ═══════════════════════════════════════════════════════
   COMPONENT 2: Market Thermometer (mit-thermometer)
   市场温度计 · Scene 13
   ═══════════════════════════════════════════════════════ */
.th-indicators {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 2rem;
}
.th-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.5rem;
  align-items: center;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  background: var(--glass-bg);
  border: 1px solid var(--border);
  transition: background 0.3s ease;
}
.th-row.selected-left  { background: rgba(22,163,74,0.08);  border-color: rgba(22,163,74,0.25); }
.th-row.selected-right { background: rgba(220,38,38,0.08);  border-color: rgba(220,38,38,0.25); }
.th-side {
  font-size: 0.78rem;
  line-height: 1.4;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  color: var(--fg-secondary);
  border: 1.5px solid transparent;
}
.th-side:hover { background: var(--accent-glow); color: var(--fg); }
.th-side.left  { text-align: right; }
.th-side.right { text-align: left; }
.th-side.left.chosen  {
  background: rgba(22,163,74,0.12);
  border-color: rgba(22,163,74,0.4);
  color: #16a34a;
  font-weight: 600;
}
.th-side.right.chosen {
  background: rgba(220,38,38,0.12);
  border-color: rgba(220,38,38,0.4);
  color: #DC2626;
  font-weight: 600;
}
.th-divider {
  font-size: 0.6rem;
  color: var(--fg-secondary);
  text-align: center;
  letter-spacing: 0.05em;
  white-space: nowrap;
}
.th-gauge-wrap {
  margin: 1.5rem 0;
}
.th-gauge-label-row {
  display: flex;
  justify-content: space-between;
  font-family: var(--sans);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg-secondary);
  margin-bottom: 0.5rem;
}
.th-gauge-bar {
  height: 18px;
  border-radius: 100px;
  background: linear-gradient(to right, #16a34a, #84cc16, #EAB308, #F97316, #DC2626);
  position: relative;
  overflow: visible;
  border: 1px solid var(--border);
}
.th-gauge-needle {
  position: absolute;
  top: -6px;
  width: 4px;
  height: 30px;
  background: var(--fg);
  border-radius: 2px;
  transform: translateX(-50%);
  transition: left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.th-gauge-needle::after {
  content: '';
  position: absolute;
  top: -4px; left: 50%;
  transform: translateX(-50%);
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--fg);
}
.th-score-display {
  text-align: center;
  margin-top: 1.5rem;
}
.th-score-number {
  font-family: var(--serif);
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
  transition: color 0.4s ease;
}
.th-score-label {
  font-family: var(--sans);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--fg-secondary);
  margin-top: 0.3rem;
}
.th-verdict {
  margin-top: 1.2rem;
  padding: 1.2rem 1.5rem;
  border-radius: 10px;
  font-size: 0.88rem;
  line-height: 1.8;
  color: var(--fg);
  border: 1px solid var(--border);
  transition: all 0.4s ease;
  min-height: 3.5rem;
}
.th-verdict.green { background: rgba(22,163,74,0.08);  border-color: rgba(22,163,74,0.25); }
.th-verdict.amber { background: rgba(217,119,6,0.08);  border-color: rgba(217,119,6,0.25); }
.th-verdict.red   { background: rgba(220,38,38,0.08);  border-color: rgba(220,38,38,0.25); }
.th-progress {
  font-family: var(--sans);
  font-size: 0.65rem;
  color: var(--fg-secondary);
  text-align: right;
  margin-top: 0.5rem;
}

/* ═══════════════════════════════════════════════════════
   COMPONENT 3: Asymmetry Analyzer (mit-asymmetry)
   不对称性分析器 · Scene 14
   ═══════════════════════════════════════════════════════ */
.asy-sliders {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
@media (max-width: 560px) {
  .asy-sliders { grid-template-columns: 1fr; }
}
.asy-slider-group label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--sans);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--fg-secondary);
  margin-bottom: 0.5rem;
  letter-spacing: 0.04em;
}
.asy-slider-group label span {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--accent);
  font-family: var(--serif);
}
.asy-slider-group input[type=range] {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: var(--border);
  outline: none;
  cursor: pointer;
}
.asy-slider-group input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  transition: transform 0.15s ease;
}
.asy-slider-group input[type=range]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
.asy-slider-hint {
  font-size: 0.65rem;
  color: var(--fg-secondary);
  margin-top: 0.3rem;
  font-style: italic;
}
.asy-scenario-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.4rem;
  margin-bottom: 2rem;
}
@media (max-width: 480px) {
  .asy-scenario-grid { grid-template-columns: repeat(3, 1fr); }
}
.asy-year-card {
  border-radius: 8px;
  padding: 0.7rem 0.4rem;
  border: 1px solid var(--border);
  background: var(--glass-bg);
  text-align: center;
  transition: all 0.3s ease;
}
.asy-year-card.bull { background: rgba(22,163,74,0.06); border-color: rgba(22,163,74,0.2); }
.asy-year-card.bear { background: rgba(220,38,38,0.06); border-color: rgba(220,38,38,0.2); }
.asy-year-label {
  font-family: var(--sans);
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--fg-secondary);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.3rem;
}
.asy-year-mkt {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--fg-secondary);
  margin-bottom: 0.3rem;
}
.asy-year-mkt.pos { color: #16a34a; }
.asy-year-mkt.neg { color: #DC2626; }
.asy-year-port {
  font-size: 0.88rem;
  font-weight: 800;
  font-family: var(--serif);
  transition: color 0.3s ease;
}
.asy-results {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
@media (max-width: 480px) {
  .asy-results { grid-template-columns: 1fr 1fr; }
}
.asy-result-card {
  padding: 1.2rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--glass-bg);
  text-align: center;
}
.asy-result-label {
  font-family: var(--sans);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--fg-secondary);
  margin-bottom: 0.5rem;
}
.asy-result-val {
  font-family: var(--serif);
  font-size: 1.5rem;
  font-weight: 900;
  transition: color 0.3s ease;
}
.asy-verdict-box {
  padding: 1.2rem 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  font-size: 0.88rem;
  line-height: 1.8;
  transition: all 0.4s ease;
}
.asy-verdict-box.pass {
  background: rgba(22,163,74,0.08);
  border-color: rgba(22,163,74,0.3);
}
.asy-verdict-box.fail {
  background: rgba(220,38,38,0.08);
  border-color: rgba(220,38,38,0.3);
}
.asy-verdict-box.neutral {
  background: var(--accent-dim);
  border-color: var(--accent-mid);
}
`;

// ═══════════════════════════════════════════════════════════════
// COMPONENT 1: Risk Definition Check (mit-risk-check)
// Scene 5 · 风险的真正面目
//
// 三种投资在"波动性框架"与"马克斯框架"下的风险排名截然相反。
// 这个交互揭示：同一标的，定义不同，排名不同，决策不同。
// ═══════════════════════════════════════════════════════════════

const RC_INVESTMENTS = [
  {
    id: 'A',
    name: '投资 A',
    sub: '高波动科技股（低估值）',
    desc: '优质科技公司，市场恐慌时股价暴跌，当前 PE = 9',
    stats: {
      volatility:  { label: '年化波动率', val: '38%',  level: 'high' },
      beta:        { label: 'β 系数',    val: '1.8',   level: 'high' },
      valuation:   { label: '估值水平',   val: '便宜',  level: 'low'  },
      fundamentals:{ label: '基本面',    val: '优秀',  level: 'low'  },
    },
    traditionalRank: 1,   // 传统框架：最"危险"（波动最高）
    marksRank:       3,   // 马克斯框架：最"安全"（低价买优质）
    traditionalColor: 'rank-1',
    marksColor:       'rank-3',
  },
  {
    id: 'B',
    name: '投资 B',
    sub: '低波动公用事业股（高估值）',
    desc: '监管保护的公用事业，股价平稳，但当前 PE = 42',
    stats: {
      volatility:  { label: '年化波动率', val: '9%',   level: 'low'  },
      beta:        { label: 'β 系数',    val: '0.4',   level: 'low'  },
      valuation:   { label: '估值水平',   val: '昂贵',  level: 'high' },
      fundamentals:{ label: '基本面',    val: '一般',  level: 'mid'  },
    },
    traditionalRank: 3,   // 传统框架：最"安全"（波动最低）
    marksRank:       1,   // 马克斯框架：最"危险"（高价买平庸）
    traditionalColor: 'rank-3',
    marksColor:       'rank-1',
  },
  {
    id: 'C',
    name: '投资 C',
    sub: '中等波动消费品（合理估值）',
    desc: '稳健消费品公司，波动居中，PE = 18，接近历史均值',
    stats: {
      volatility:  { label: '年化波动率', val: '18%',  level: 'mid'  },
      beta:        { label: 'β 系数',    val: '0.9',   level: 'mid'  },
      valuation:   { label: '估值水平',   val: '合理',  level: 'mid'  },
      fundamentals:{ label: '基本面',    val: '良好',  level: 'low'  },
    },
    traditionalRank: 2,
    marksRank:       2,
    traditionalColor: 'rank-2',
    marksColor:       'rank-2',
  },
];

const RC_INSIGHTS = {
  none: '',
  traditional: '在传统框架下，<b>波动率 = 风险</b>：投资A（38%波动）被视为"最危险"，投资B（9%波动）被视为"最安全"。这是大多数教科书、风险系统和合规部门采用的标准。',
  marks: '在马克斯框架下，<b>永久性损失概率 = 风险</b>：投资A在低估值买入，即使价格大幅波动，也有强基本面支撑，永久损失概率<em>最低</em>。投资B价格极贵，即使短期"稳定"，一旦估值回归，损失将是永久性的——风险<em>最高</em>。',
};

BookEngine.registerViz('mit-risk-check', {
  render(scene, config) {
    let cardsHtml = '';
    RC_INVESTMENTS.forEach(inv => {
      let statsHtml = '';
      Object.values(inv.stats).forEach(s => {
        statsHtml += `<div class="rc-stat">
          <span class="rc-stat-label">${s.label}</span>
          <span class="rc-stat-val ${s.level}">${s.val}</span>
        </div>`;
      });
      cardsHtml += `
        <div class="rc-card" id="rcCard${inv.id}">
          <div class="rc-rank-badge" id="rcBadge${inv.id}"></div>
          <div class="rc-card-name">${inv.name}</div>
          <div class="rc-card-sub">${inv.sub}</div>
          ${statsHtml}
        </div>`;
    });

    return `<div class="mit-module reveal" id="riskCheck">
      <div class="mit-tag">互动工具 · Interactive</div>
      <h3>⚖️ 风险定义对决：同一标的，两种排名</h3>
      <div class="mit-desc">
        选择一种视角，看看同样三种投资在不同风险框架下排名如何变化——<br>这正是马克斯对现代金融理论最根本的挑战。
      </div>
      <div class="rc-toggle">
        <button class="rc-active" id="rcBtnNone">← 选择视角</button>
        <button id="rcBtnTraditional">📐 传统框架（波动率 = 风险）</button>
        <button id="rcBtnMarks">🎯 马克斯框架（永久损失 = 风险）</button>
      </div>
      <div class="rc-cards">${cardsHtml}</div>
      <div class="rc-insight" id="rcInsight"></div>
    </div>`;
  },

  init() {
    const btnNone       = document.getElementById('rcBtnNone');
    const btnTraditional= document.getElementById('rcBtnTraditional');
    const btnMarks      = document.getElementById('rcBtnMarks');
    const insight       = document.getElementById('rcInsight');

    if (!btnNone) return;

    function applyView(view) {
      // Toggle button states
      [btnNone, btnTraditional, btnMarks].forEach(b => b.classList.remove('rc-active'));
      if (view === 'none')        btnNone.classList.add('rc-active');
      if (view === 'traditional') btnTraditional.classList.add('rc-active');
      if (view === 'marks')       btnMarks.classList.add('rc-active');

      RC_INVESTMENTS.forEach(inv => {
        const card  = document.getElementById('rcCard' + inv.id);
        const badge = document.getElementById('rcBadge' + inv.id);
        if (!card || !badge) return;

        // Clear old rank classes
        card.classList.remove('rank-1', 'rank-2', 'rank-3');
        badge.classList.remove('show', 'rank1', 'rank2', 'rank3');

        if (view === 'none') {
          badge.textContent = '';
          return;
        }

        const rank      = view === 'traditional' ? inv.traditionalRank : inv.marksRank;
        const rankLabel = rank === 1 ? '最高风险' : rank === 2 ? '中等风险' : '最低风险';
        const rankClass = 'rank' + rank;
        const cardClass = 'rank-' + rank;

        card.classList.add(cardClass);
        badge.textContent = '#' + rank + ' ' + rankLabel;
        badge.classList.add('show', rankClass);
      });

      // Insight
      insight.innerHTML = RC_INSIGHTS[view] || '';
      insight.classList.toggle('show', view !== 'none');
    }

    btnNone.addEventListener('click',        () => applyView('none'));
    btnTraditional.addEventListener('click', () => applyView('traditional'));
    btnMarks.addEventListener('click',       () => applyView('marks'));
  }
});


// ═══════════════════════════════════════════════════════════════
// COMPONENT 2: Market Thermometer (mit-thermometer)
// Scene 13 · 市场温度计与自我认知
//
// 马克斯第15章的15对双极指标，简化为10对。
// 用户为每个指标选择当前状态，实时更新温度计读数。
// 悲观端（绿）= 机会，乐观端（红）= 警觉。
// ═══════════════════════════════════════════════════════════════

const TH_INDICATORS = [
  { id: 'econ',    left: '经济形势悲观，衰退阴影浓',    right: '经济乐观，增长预期强' },
  { id: 'lend',    left: '贷款条件严苛，银行惜贷',       right: '贷款宽松，资金唾手可得' },
  { id: 'quality', left: '只有高质量发行能找到买家',     right: '低质量发行被哄抢，质量门槛消失' },
  { id: 'spread',  left: '信用利差处于历史高位',         right: '信用利差被压缩至历史低位' },
  { id: 'new',     left: '新发行市场几乎关闭',           right: '新发行市场火热，IPO一票难求' },
  { id: 'prot',    left: '债权人保护条款完整且严格',     right: '保护条款减少或消失（无条款债券盛行）' },
  { id: 'mood',    left: '媒体与投资者普遍悲观',         right: '媒体一片乐观，"这次不一样"盛行' },
  { id: 'flow',    left: '资金大量流出风险资产',         right: '资金大量涌入风险资产' },
  { id: 'pe',      left: 'PE/PB处于历史低位',           right: 'PE/PB处于历史高位，估值"溢价"被接受' },
  { id: 'lever',   left: '杠杆率低，去杠杆进行中',       right: '杠杆率高，借贷被视为明智的财务杠杆' },
];

const TH_VERDICTS = [
  { min: 0,  max: 2,  cls: 'green', text: '📉 读数极低（0–2）：市场处于极度悲观区间。历史上，这样的读数往往对应最佳买入机会——尽管此刻你必须克服极大的心理压力。马克斯会说：现在是增加进攻性的时候。' },
  { min: 3,  max: 4,  cls: 'green', text: '🟢 读数偏低（3–4）：悲观情绪主导，投资者普遍谨慎。这个区间通常提供不错的风险收益比。适当增加高质量资产的配置是合理的。' },
  { min: 5,  max: 6,  cls: 'amber', text: '🟡 读数中性（5–6）：市场情绪相对均衡，既非极度乐观也非极度悲观。保持正常的风险敞口，不需要特别调整策略方向。' },
  { min: 7,  max: 8,  cls: 'red',   text: '🟠 读数偏高（7–8）：乐观情绪主导，风险溢价被压缩。这个区间需要提高对投资质量的要求，增加安全边际，减少高风险资产。' },
  { min: 9,  max: 10, cls: 'red',   text: '🔴 读数极高（9–10）：市场处于极度乐观区间——这正是马克斯反复警告的危险时刻。"当所有人相信市场很安全时，市场最为危险。"大幅提高防御性，减少风险暴露。' },
];

BookEngine.registerViz('mit-thermometer', {
  render(scene, config) {
    let rowsHtml = '';
    TH_INDICATORS.forEach((ind, i) => {
      rowsHtml += `
        <div class="th-row" id="thRow${ind.id}">
          <div class="th-side left"  data-th-id="${ind.id}" data-th-side="left">${ind.left}</div>
          <div class="th-divider">vs</div>
          <div class="th-side right" data-th-id="${ind.id}" data-th-side="right">${ind.right}</div>
        </div>`;
    });

    return `<div class="mit-module reveal" id="marketThermometer">
      <div class="mit-tag">互动工具 · Interactive</div>
      <h3>🌡️ 当前市场温度计</h3>
      <div class="mit-desc">
        根据马克斯《投资最重要的事》第15章的10对双极指标，点击每行<b>左侧</b>（悲观/机会端）或<b>右侧</b>（乐观/警觉端）来标注当前市场状况——<br>
        温度计会实时告诉你，现在适合进攻还是防守。
      </div>
      <div class="th-indicators">${rowsHtml}</div>
      <div class="th-gauge-wrap">
        <div class="th-gauge-label-row">
          <span>🟢 悲观端（机会）</span>
          <span>🔴 乐观端（警觉）</span>
        </div>
        <div class="th-gauge-bar">
          <div class="th-gauge-needle" id="thNeedle" style="left: 50%"></div>
        </div>
      </div>
      <div class="th-score-display">
        <div class="th-score-number" id="thScore">—</div>
        <div class="th-score-label">已标注 <span id="thAnswered">0</span>/<span>${TH_INDICATORS.length}</span> 项</div>
      </div>
      <div class="th-verdict" id="thVerdict">← 点击上方指标来标注当前市场状态</div>
    </div>`;
  },

  init() {
    const needle    = document.getElementById('thNeedle');
    const scoreEl   = document.getElementById('thScore');
    const verdictEl = document.getElementById('thVerdict');
    const answeredEl= document.getElementById('thAnswered');
    if (!needle) return;

    const state = {};  // id → 'left' | 'right'

    function update() {
      const answered   = Object.keys(state).length;
      const rightCount = Object.values(state).filter(v => v === 'right').length;

      answeredEl.textContent = answered;

      if (answered === 0) {
        needle.style.left = '50%';
        scoreEl.textContent = '—';
        scoreEl.style.color = 'var(--fg-secondary)';
        verdictEl.className = 'th-verdict';
        verdictEl.textContent = '← 点击上方指标来标注当前市场状态';
        return;
      }

      // Score: 0–10 based on answered items
      const score     = Math.round((rightCount / answered) * 10);
      const pct       = (score / 10) * 100;

      needle.style.left = pct + '%';
      scoreEl.textContent = score;

      // Color
      if (score <= 4)      scoreEl.style.color = '#16a34a';
      else if (score <= 6) scoreEl.style.color = '#D97706';
      else                 scoreEl.style.color = '#DC2626';

      // Verdict
      const v = TH_VERDICTS.find(r => score >= r.min && score <= r.max);
      if (v) {
        verdictEl.className = 'th-verdict ' + v.cls;
        verdictEl.textContent = v.text;
      }
    }

    document.querySelectorAll('[data-th-id]').forEach(el => {
      el.addEventListener('click', function() {
        const id   = this.dataset.thId;
        const side = this.dataset.thSide;
        const row  = document.getElementById('thRow' + id);
        if (!row) return;

        // If same selection, deselect
        if (state[id] === side) {
          delete state[id];
          row.classList.remove('selected-left', 'selected-right');
          row.querySelectorAll('.th-side').forEach(s => s.classList.remove('chosen'));
        } else {
          state[id] = side;
          row.classList.remove('selected-left', 'selected-right');
          row.classList.add('selected-' + side);
          row.querySelectorAll('.th-side').forEach(s => {
            s.classList.toggle('chosen', s.dataset.thSide === side);
          });
        }

        update();
      });
    });
  }
});


// ═══════════════════════════════════════════════════════════════
// COMPONENT 3: Asymmetry Analyzer (mit-asymmetry)
// Scene 14 · 防御投资与不对称性
//
// 马克斯的不对称性标准：真正的投资技能 = 牛市超额 + 熊市保护。
// 用户调整两个参数，观察5年模拟结果，判断是否达到不对称性标准。
// ═══════════════════════════════════════════════════════════════

// 5-year scenario: benchmark annual returns
const ASY_YEARS = [
  { label: '第1年', mkt: 0.28, type: 'bull' },  // Bull
  { label: '第2年', mkt: 0.18, type: 'bull' },  // Bull
  { label: '第3年', mkt: -0.38, type: 'bear' }, // Bear (2008-like)
  { label: '第4年', mkt: 0.22, type: 'bull' },  // Bull
  { label: '第5年', mkt: -0.12, type: 'bear' }, // Bear
];

BookEngine.registerViz('mit-asymmetry', {
  render(scene, config) {
    let yearCardsHtml = '';
    ASY_YEARS.forEach((y, i) => {
      const mktPct = (y.mkt >= 0 ? '+' : '') + Math.round(y.mkt * 100) + '%';
      const mktCls = y.mkt >= 0 ? 'pos' : 'neg';
      yearCardsHtml += `
        <div class="asy-year-card ${y.type}" id="asyYear${i}">
          <div class="asy-year-label">${y.label}</div>
          <div class="asy-year-mkt ${mktCls}">市场 ${mktPct}</div>
          <div class="asy-year-port" id="asyPort${i}">—</div>
        </div>`;
    });

    return `<div class="mit-module reveal" id="asymmetryAnalyzer">
      <div class="mit-tag">互动工具 · Interactive</div>
      <h3>📊 不对称性检验器</h3>
      <div class="mit-desc">
        马克斯的不对称性标准：<b>牛市参与市场上涨</b>的同时，<b>熊市损失少于市场</b>。<br>
        调整两个滑块，模拟5年（3牛2熊）的投资组合表现——看看哪种参数组合能通过不对称性检验。
      </div>

      <div class="asy-sliders">
        <div class="asy-slider-group">
          <label>
            🐂 牛市参与率
            <span id="asyBullVal">85%</span>
          </label>
          <input type="range" id="asyBullSlider" min="40" max="120" value="85" step="5">
          <div class="asy-slider-hint">基准 = 100%（完全跟随市场）</div>
        </div>
        <div class="asy-slider-group">
          <label>
            🐻 熊市保护率
            <span id="asyBearVal">60%</span>
          </label>
          <input type="range" id="asyBearSlider" min="20" max="100" value="60" step="5">
          <div class="asy-slider-hint">越低 = 熊市损失越少（越好）</div>
        </div>
      </div>

      <div class="asy-scenario-grid">${yearCardsHtml}</div>

      <div class="asy-results">
        <div class="asy-result-card">
          <div class="asy-result-label">组合终值（¥100起）</div>
          <div class="asy-result-val" id="asyPortFinal">—</div>
        </div>
        <div class="asy-result-card">
          <div class="asy-result-label">市场终值（¥100起）</div>
          <div class="asy-result-val" id="asyMktFinal">—</div>
        </div>
        <div class="asy-result-card">
          <div class="asy-result-label">超额收益</div>
          <div class="asy-result-val" id="asyAlpha">—</div>
        </div>
      </div>

      <div class="asy-verdict-box neutral" id="asyVerdict">调整滑块查看模拟结果</div>
    </div>`;
  },

  init() {
    const bullSlider = document.getElementById('asyBullSlider');
    const bearSlider = document.getElementById('asyBearSlider');
    const bullVal    = document.getElementById('asyBullVal');
    const bearVal    = document.getElementById('asyBearVal');
    if (!bullSlider) return;

    function calc() {
      const bullCapture = parseInt(bullSlider.value) / 100;   // e.g. 0.85
      const bearCapture = parseInt(bearSlider.value) / 100;   // e.g. 0.60

      bullVal.textContent = Math.round(bullCapture * 100) + '%';
      bearVal.textContent = Math.round(bearCapture * 100) + '%';

      let portValue = 100;
      let mktValue  = 100;

      ASY_YEARS.forEach((y, i) => {
        const mktReturn  = y.mkt;
        const portReturn = y.type === 'bull'
          ? mktReturn * bullCapture         // Bull: participate at bullCapture%
          : mktReturn * bearCapture;        // Bear: bear losses at bearCapture%

        portValue *= (1 + portReturn);
        mktValue  *= (1 + mktReturn);

        const portEl = document.getElementById('asyPort' + i);
        const portPct = (portReturn >= 0 ? '+' : '') + (portReturn * 100).toFixed(1) + '%';
        if (portEl) {
          portEl.textContent = portPct;
          portEl.style.color = portReturn >= 0 ? '#16a34a' : '#DC2626';
        }
      });

      const portFinalEl = document.getElementById('asyPortFinal');
      const mktFinalEl  = document.getElementById('asyMktFinal');
      const alphaEl     = document.getElementById('asyAlpha');
      const verdictEl   = document.getElementById('asyVerdict');

      const alpha = portValue - mktValue;

      if (portFinalEl) {
        portFinalEl.textContent = '¥' + portValue.toFixed(0);
        portFinalEl.style.color = portValue >= mktValue ? '#16a34a' : '#DC2626';
      }
      if (mktFinalEl) {
        mktFinalEl.textContent = '¥' + mktValue.toFixed(0);
        mktFinalEl.style.color = 'var(--fg)';
      }
      if (alphaEl) {
        const alphaPct = ((portValue / mktValue - 1) * 100).toFixed(1);
        alphaEl.textContent = (alpha >= 0 ? '+' : '') + alphaPct + '%';
        alphaEl.style.color = alpha >= 0 ? '#16a34a' : '#DC2626';
      }

      // Asymmetry test
      // Pass = bullCapture ≥ 0.80 AND bearCapture ≤ 0.70
      const bullPass = bullCapture >= 0.80;
      const bearPass = bearCapture <= 0.70;
      const asymPass = bullPass && bearPass;

      if (verdictEl) {
        if (asymPass) {
          verdictEl.className = 'asy-verdict-box pass';
          verdictEl.innerHTML = `✅ <b>通过不对称性检验</b>——牛市参与${Math.round(bullCapture*100)}%，熊市仅承受市场跌幅的${Math.round(bearCapture*100)}%。这正是马克斯定义的真实技能：既有上行参与，又有下行保护。5年累计超额收益<b>${(alpha >= 0 ? '+' : '') + alpha.toFixed(0)}</b>元。`;
        } else if (!bullPass && !bearPass) {
          verdictEl.className = 'asy-verdict-box fail';
          verdictEl.innerHTML = `❌ <b>两项指标均未达标</b>——牛市参与率偏低（${Math.round(bullCapture*100)}%，需≥80%），熊市保护也不足（${Math.round(bearCapture*100)}%，需≤70%）。这种组合缺乏真正的不对称优势。`;
        } else if (!bullPass) {
          verdictEl.className = 'asy-verdict-box neutral';
          verdictEl.innerHTML = `⚠️ <b>熊市保护达标，但牛市参与不足</b>（${Math.round(bullCapture*100)}%，需≥80%）。过于保守可能意味着高β的替代品，而非真实的主动技能。试着把牛市参与率提高到80%以上。`;
        } else {
          verdictEl.className = 'asy-verdict-box neutral';
          verdictEl.innerHTML = `⚠️ <b>牛市参与达标，但熊市保护不足</b>（${Math.round(bearCapture*100)}%，需≤70%）。在熊市中损失太多，意味着组合整体可能只是高β暴露——而非真正的α能力。试着把熊市保护率降到70%以下。`;
        }
      }
    }

    bullSlider.addEventListener('input', calc);
    bearSlider.addEventListener('input', calc);
    calc(); // Initial render
  }
});
