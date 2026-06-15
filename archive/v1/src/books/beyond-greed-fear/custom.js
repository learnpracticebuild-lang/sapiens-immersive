// ═══════════════════════════════════════════════════════════════
// BEYOND GREED AND FEAR · CUSTOM COMPONENTS
// 超越恐惧与贪婪 · 偏差自检器 Bias Checker Interactive
// ═══════════════════════════════════════════════════════════════

var CUSTOM_CSS = "\
/* ── Bias Checker Module ── */\n\
.bc-module {\n\
  margin: 3rem 0;\n\
  padding: 2.5rem;\n\
  border-radius: 16px;\n\
  border: 1px solid var(--border);\n\
  background: var(--accent-glow);\n\
  position: relative;\n\
  overflow: hidden;\n\
}\n\
.bc-module::before {\n\
  content: '';\n\
  position: absolute;\n\
  inset: 0;\n\
  background: linear-gradient(135deg, var(--accent-dim), transparent 60%);\n\
  pointer-events: none;\n\
  opacity: 0.5;\n\
}\n\
.bc-module > * {\n\
  position: relative;\n\
  z-index: 1;\n\
}\n\
.bc-tag {\n\
  display: inline-block;\n\
  font-size: 0.65rem;\n\
  letter-spacing: 0.15em;\n\
  text-transform: uppercase;\n\
  color: var(--accent);\n\
  border: 1px solid var(--accent);\n\
  padding: 0.2em 0.8em;\n\
  border-radius: 999px;\n\
  margin-bottom: 1rem;\n\
  font-family: var(--sans);\n\
}\n\
.bc-module h3 {\n\
  font-size: 1.3rem;\n\
  margin: 0 0 0.5rem;\n\
  font-family: var(--serif);\n\
}\n\
.bc-desc {\n\
  font-size: 0.85rem;\n\
  line-height: 1.8;\n\
  color: var(--fg-secondary);\n\
  margin-bottom: 1.5rem;\n\
}\n\
/* Decision Type Selector */\n\
.bc-type-grid {\n\
  display: grid;\n\
  grid-template-columns: repeat(4, 1fr);\n\
  gap: 0.75rem;\n\
  margin-bottom: 1.5rem;\n\
}\n\
@media (max-width: 600px) {\n\
  .bc-type-grid { grid-template-columns: repeat(2, 1fr); }\n\
}\n\
.bc-type-btn {\n\
  display: flex;\n\
  flex-direction: column;\n\
  align-items: center;\n\
  gap: 0.3rem;\n\
  padding: 1rem 0.5rem;\n\
  border-radius: 12px;\n\
  border: 1px solid var(--border);\n\
  background: var(--glass-bg);\n\
  color: var(--fg);\n\
  cursor: pointer;\n\
  transition: all 0.3s var(--ease-out);\n\
  font-family: var(--sans);\n\
  font-size: 0.8rem;\n\
}\n\
.bc-type-btn:hover {\n\
  border-color: var(--accent);\n\
  background: var(--accent-dim);\n\
}\n\
.bc-type-btn.active {\n\
  border-color: var(--accent);\n\
  background: var(--accent-dim);\n\
  box-shadow: 0 0 20px var(--accent-glow);\n\
}\n\
.bc-type-btn .bc-emoji {\n\
  font-size: 1.6rem;\n\
}\n\
/* Questions Section */\n\
.bc-questions {\n\
  display: none;\n\
  margin-top: 1.5rem;\n\
}\n\
.bc-questions.show { display: block; }\n\
.bc-q-title {\n\
  font-size: 0.9rem;\n\
  font-weight: 600;\n\
  margin-bottom: 1rem;\n\
  color: var(--fg);\n\
  font-family: var(--serif);\n\
}\n\
.bc-q-item {\n\
  display: flex;\n\
  align-items: flex-start;\n\
  gap: 0.75rem;\n\
  padding: 0.75rem 1rem;\n\
  margin-bottom: 0.5rem;\n\
  border-radius: 10px;\n\
  border: 1px solid transparent;\n\
  cursor: pointer;\n\
  transition: all 0.2s;\n\
  font-size: 0.82rem;\n\
  line-height: 1.6;\n\
  color: var(--fg-secondary);\n\
  font-family: var(--sans);\n\
}\n\
.bc-q-item:hover {\n\
  background: var(--glass-bg);\n\
  border-color: var(--border);\n\
}\n\
.bc-q-item.checked {\n\
  background: var(--accent-dim);\n\
  border-color: var(--accent);\n\
  color: var(--fg);\n\
}\n\
.bc-checkbox {\n\
  flex-shrink: 0;\n\
  width: 18px;\n\
  height: 18px;\n\
  border-radius: 4px;\n\
  border: 2px solid var(--border);\n\
  margin-top: 2px;\n\
  display: flex;\n\
  align-items: center;\n\
  justify-content: center;\n\
  transition: all 0.2s;\n\
  font-size: 0.7rem;\n\
}\n\
.bc-q-item.checked .bc-checkbox {\n\
  background: var(--accent);\n\
  border-color: var(--accent);\n\
  color: #fff;\n\
}\n\
/* Submit Button */\n\
.bc-submit {\n\
  display: none;\n\
  margin-top: 1.5rem;\n\
  padding: 0.8rem 2rem;\n\
  border-radius: 10px;\n\
  border: 1px solid var(--accent);\n\
  background: var(--accent-dim);\n\
  color: var(--accent);\n\
  cursor: pointer;\n\
  font-size: 0.85rem;\n\
  font-family: var(--sans);\n\
  font-weight: 600;\n\
  letter-spacing: 0.05em;\n\
  transition: all 0.3s;\n\
  width: 100%;\n\
}\n\
.bc-submit.show { display: block; }\n\
.bc-submit:hover {\n\
  background: var(--accent);\n\
  color: #fff;\n\
}\n\
/* Result Section */\n\
.bc-result {\n\
  display: none;\n\
  margin-top: 2rem;\n\
  padding: 1.5rem;\n\
  border-radius: 12px;\n\
  border: 1px solid var(--border);\n\
  background: var(--glass-bg);\n\
}\n\
.bc-result.show { display: block; animation: bcFadeIn 0.5s ease; }\n\
@keyframes bcFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }\n\
.bc-health {\n\
  display: inline-flex;\n\
  align-items: center;\n\
  gap: 0.5rem;\n\
  padding: 0.5rem 1.2rem;\n\
  border-radius: 999px;\n\
  font-size: 0.85rem;\n\
  font-weight: 600;\n\
  margin-bottom: 1.2rem;\n\
  font-family: var(--sans);\n\
}\n\
.bc-health.green { background: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); }\n\
.bc-health.yellow { background: rgba(234,179,8,0.15); color: #eab308; border: 1px solid rgba(234,179,8,0.3); }\n\
.bc-health.red { background: rgba(239,68,68,0.15); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }\n\
.bc-bias-card {\n\
  padding: 1rem;\n\
  margin-bottom: 0.75rem;\n\
  border-radius: 10px;\n\
  border: 1px solid var(--border);\n\
  background: var(--accent-glow);\n\
}\n\
.bc-bias-name {\n\
  font-size: 0.9rem;\n\
  font-weight: 600;\n\
  color: var(--accent);\n\
  margin-bottom: 0.3rem;\n\
  font-family: var(--serif);\n\
}\n\
.bc-bias-explain {\n\
  font-size: 0.78rem;\n\
  line-height: 1.7;\n\
  color: var(--fg-secondary);\n\
  margin-bottom: 0.5rem;\n\
  font-family: var(--sans);\n\
}\n\
.bc-bias-counter {\n\
  font-size: 0.78rem;\n\
  line-height: 1.7;\n\
  color: var(--fg);\n\
  padding: 0.5rem 0.75rem;\n\
  border-radius: 8px;\n\
  background: var(--glass-bg);\n\
  font-family: var(--sans);\n\
}\n\
.bc-bias-counter b { color: var(--accent); }\n\
.bc-no-bias {\n\
  text-align: center;\n\
  padding: 1.5rem;\n\
  font-size: 0.85rem;\n\
  color: var(--fg-secondary);\n\
  font-family: var(--sans);\n\
}\n\
/* Reset Button */\n\
.bc-reset {\n\
  display: none;\n\
  margin-top: 1rem;\n\
  padding: 0.6rem 1.5rem;\n\
  border-radius: 8px;\n\
  border: 1px solid var(--border);\n\
  background: transparent;\n\
  color: var(--fg-secondary);\n\
  cursor: pointer;\n\
  font-size: 0.8rem;\n\
  font-family: var(--sans);\n\
  transition: all 0.2s;\n\
}\n\
.bc-reset.show { display: inline-flex; }\n\
.bc-reset:hover { border-color: var(--accent); color: var(--accent); }\n\
";

BookEngine.injectCSS(CUSTOM_CSS);

// ── Bias Definitions ──
var BIAS_DB = {
  lossAversion: {
    name: '损失厌恶 Loss Aversion',
    explain: '你对亏损的恐惧远大于对等额盈利的渴望。Kahneman和Tversky发现，亏损带来的心理痛苦约为等额盈利快感的2-2.5倍。这导致你不愿卖出亏损头寸（"割肉太痛"），或在盈利时过早锁定利润（"害怕失去"）。',
    counter: '<b>空仓测试：</b>假设你今天没有持有这只股票，以当前价格你会买入吗？如果不会，就应该卖出。把卖出亏损框架为"获得税收优惠"而非"承认失败"——重构框架可以降低心理痛苦。'
  },
  disposition: {
    name: '处置效应 Disposition Effect',
    explain: '你倾向于过早卖出盈利头寸（"见好就收"），同时过久持有亏损头寸（"等回本再说"）。Odean对10,000个账户的研究显示：投资者卖出盈利股的概率比卖出亏损股高约50%，但被卖出的盈利股后续表现往往优于被持有的亏损股。',
    counter: '<b>删除成本价显示：</b>在交易软件中关闭成本价列，只看当前价值和基本面。制定基于基本面的卖出规则——"PE超过25x减半仓"——而非基于价格涨跌百分比的规则。让规则替你承受决策的情绪负担。'
  },
  overconfidence: {
    name: '过度自信 Overconfidence',
    explain: '你高估了自己的判断准确度。研究表明，当人们说"90%确定"时，实际正确率通常只有70-75%。在投资中，过度自信的最直接表现是交易频率过高——Barber和Odean发现，交易最频繁的投资者年化回报率比最不频繁者低约7个百分点。',
    counter: '<b>记录预测精度：</b>为每个判断写下预期结果和置信度，事后回顾。强制自己把置信区间扩大50%——如果你估计回报在10%-20%之间，改为-5%到30%。每做一个决策，找3个支持反面观点的论据。'
  },
  anchoring: {
    name: '锚定效应 Anchoring',
    explain: '你的判断被最先看到的数字"锚定"了——买入价、52周高点、分析师目标价。"从高点跌了50%所以便宜了"是典型的锚定陷阱：跌50%和是否便宜毫无逻辑关系。锚定效应的力量在于它完全绕过了你的意识——你甚至不知道自己在被锚定。',
    counter: '<b>绝对值思维：</b>不问"相比高点跌了多少"，问"以当前价格买入，未来5年的预期年化回报率是多少？"同时使用PE、PB、DCF、EV/EBITDA等多个估值方法——如果结论不收敛，说明你被某个锚点主导了。'
  },
  sunkCost: {
    name: '沉没成本谬误 Sunk Cost Fallacy',
    explain: '你因为"已经投入了这么多"而继续坚持——无论是金钱、时间还是面子。"已经亏了30%，现在卖太亏了"是最常见的表现。理性的分析只考虑未来的预期回报，过去的投入是沉没成本、不可回收，不应影响决策。',
    counter: '<b>前进成本思维：</b>只问一个问题——"从此刻起，投入1元能获得多少回报？"如果这笔钱投在其他地方回报更高，就应该转移。每季度做"清零审查"：假设所有头寸归零，今天你会买什么？配多少比例？'
  },
  representativeness: {
    name: '代表性偏差 Representativeness',
    explain: '你用"像不像"替代"概率多大"来判断。"这家公司像下一个特斯拉"→买入，忽略了基础概率——在任何行业中，真正成为下一个巨头的概率不到0.1%。连续上涨的股票"看起来像"好股票，但统计上更可能回归均值。',
    counter: '<b>基础概率检查：</b>在这个行业中，新进入者5年存活率是多少？10年回报中位数是多少？对每个"成功类比"，找3个"看起来一样但失败了"的案例。把分析写成纯数字——不允许故事性描述。'
  },
  regretAversion: {
    name: '后悔厌恶 Regret Aversion',
    explain: '你的决策被"未来可能的后悔"驱动，而非最优化预期结果。你买蓝筹而非被低估的小盘股，因为"蓝筹亏了不会被笑话"。你跟随大多数人的选择，因为"大家都错了不丢人，我一个人错了很丢人"。这导致系统性地回避非共识机会。',
    counter: '<b>决策过程导向：</b>用"过程是否合理"而非"结果是否好"来评价自己。如果不确定是否卖出，先卖一半——无论涨跌你都"对了一半"，后悔降低50%。用标准化的投资检查清单来做决策，让规则替你承受后悔的重量。'
  }
};

// ── Decision Type → Question mapping ──
var DECISION_TYPES = {
  buy: {
    label: '买入',
    emoji: '📈',
    questions: [
      { text: '我主要因为这家公司"看起来像"某个成功案例而买入', biases: ['representativeness'] },
      { text: '我最近几次投资都赚钱了，感觉自己判断力很好', biases: ['overconfidence'] },
      { text: '身边很多人都在买类似的，我不想错过', biases: ['regretAversion'] },
      { text: '股价已经从高点跌了很多，我觉得便宜了', biases: ['anchoring'] },
      { text: '我花了很长时间研究这只股票，不想浪费这些时间', biases: ['sunkCost'] },
      { text: '这个行业太火了，不投感觉会错过时代机会', biases: ['representativeness', 'regretAversion'] },
      { text: '我对这笔投资的预期收益有很高的确定性（>80%）', biases: ['overconfidence'] },
      { text: '我觉得市场对这个公司的定价是错的，只有我看到了真相', biases: ['overconfidence'] }
    ]
  },
  sell: {
    label: '卖出',
    emoji: '📉',
    questions: [
      { text: '股价涨了一定比例，我想"落袋为安"', biases: ['disposition', 'lossAversion'] },
      { text: '我很担心已经赚到的利润会消失', biases: ['lossAversion'] },
      { text: '卖出的主要原因是价格变化，而非基本面变化', biases: ['disposition', 'anchoring'] },
      { text: '我害怕如果不卖，将来会后悔', biases: ['regretAversion'] },
      { text: '身边的人开始卖了，我不想成为最后一个', biases: ['regretAversion'] },
      { text: '我已经持有太久了，想换点新的东西', biases: ['overconfidence'] },
      { text: '这只股票回到了我的成本价附近，终于可以"解套"了', biases: ['anchoring', 'disposition'] }
    ]
  },
  hold: {
    label: '持有',
    emoji: '✊',
    questions: [
      { text: '虽然亏损了，但我相信总会涨回来', biases: ['lossAversion', 'disposition'] },
      { text: '我已经投入了太多时间和精力研究这只股票', biases: ['sunkCost'] },
      { text: '我不想承认自己的判断是错的', biases: ['sunkCost', 'overconfidence'] },
      { text: '如果今天我没有持有它，我不会以当前价格买入', biases: ['disposition', 'sunkCost'] },
      { text: '我已经告诉过朋友/家人我买了这只股票', biases: ['sunkCost', 'regretAversion'] },
      { text: '我觉得"等回本就卖"是合理的策略', biases: ['anchoring', 'lossAversion'] },
      { text: '我多次加仓摊低了成本，不能前功尽弃', biases: ['sunkCost', 'anchoring'] }
    ]
  },
  hesitate: {
    label: '犹豫',
    emoji: '🤔',
    questions: [
      { text: '我犹豫是因为害怕做错决定后会后悔', biases: ['regretAversion'] },
      { text: '我在等一个"更好的价格"，但不确定什么是"好价格"', biases: ['anchoring'] },
      { text: '我对这个投资的信息做了很多研究，但越看越不确定', biases: ['overconfidence'] },
      { text: '我不想成为唯一一个做这个决定的人', biases: ['regretAversion'] },
      { text: '这个投资看起来太好了，让我怀疑自己是不是遗漏了什么', biases: ['representativeness'] },
      { text: '我在犹豫是因为上次类似的投资亏钱了', biases: ['representativeness', 'lossAversion'] },
      { text: '我知道应该行动，但总想"再等等看"', biases: ['lossAversion', 'regretAversion'] }
    ]
  }
};

// ── Render Component ──
BookEngine.registerViz('bias-checker', {
  render: function(scene, config) {
    // Build type buttons
    var typeBtns = '';
    var types = ['buy', 'sell', 'hold', 'hesitate'];
    for (var i = 0; i < types.length; i++) {
      var t = DECISION_TYPES[types[i]];
      typeBtns += '<button class="bc-type-btn" data-bc-type="' + types[i] + '">' +
        '<span class="bc-emoji">' + t.emoji + '</span>' +
        '<span>' + t.label + '</span>' +
      '</button>';
    }

    return '<div class="bc-module" id="biasCheckerModule">' +
      '<div class="bc-tag">偏差自检 · Bias Checker</div>' +
      '<h3>投资决策偏差诊断器</h3>' +
      '<div class="bc-desc">' +
        '选择你最近面对的决策类型，然后诚实回答诊断问题。<br>' +
        '系统将分析你的回答中可能隐藏的认知偏差，并提供针对性的对抗策略。' +
      '</div>' +
      '<div class="bc-type-grid" id="bcTypeGrid">' + typeBtns + '</div>' +
      '<div class="bc-questions" id="bcQuestions">' +
        '<div class="bc-q-title" id="bcQTitle"></div>' +
        '<div id="bcQList"></div>' +
      '</div>' +
      '<button class="bc-submit" id="bcSubmit">诊断我的偏差</button>' +
      '<div class="bc-result" id="bcResult"></div>' +
      '<button class="bc-reset" id="bcReset">↻ 重新诊断</button>' +
    '</div>';
  }
});

// ── Init Logic ──
BookEngine.registerInit(function() {
  (function() {
    var typeGrid = document.getElementById('bcTypeGrid');
    var questionsEl = document.getElementById('bcQuestions');
    var qTitleEl = document.getElementById('bcQTitle');
    var qListEl = document.getElementById('bcQList');
    var submitBtn = document.getElementById('bcSubmit');
    var resultEl = document.getElementById('bcResult');
    var resetBtn = document.getElementById('bcReset');

    if (!typeGrid) return;

    var selectedType = null;
    var checkedIndices = {};

    // Step 1: Select decision type
    typeGrid.addEventListener('click', function(e) {
      var btn = e.target.closest('.bc-type-btn');
      if (!btn) return;
      var type = btn.dataset.bcType;
      selectedType = type;
      checkedIndices = {};

      // UI: highlight selected
      var allBtns = typeGrid.querySelectorAll('.bc-type-btn');
      for (var i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.toggle('active', allBtns[i] === btn);
      }

      // Build questions
      var dt = DECISION_TYPES[type];
      qTitleEl.textContent = '以下哪些描述符合你的情况？（' + dt.label + '决策）';
      var html = '';
      for (var j = 0; j < dt.questions.length; j++) {
        html += '<div class="bc-q-item" data-bc-q="' + j + '">' +
          '<span class="bc-checkbox"></span>' +
          '<span>' + dt.questions[j].text + '</span>' +
        '</div>';
      }
      qListEl.innerHTML = html;
      questionsEl.classList.add('show');
      submitBtn.classList.remove('show');
      resultEl.classList.remove('show');
      resetBtn.classList.remove('show');
    });

    // Step 2: Toggle questions
    questionsEl.addEventListener('click', function(e) {
      var item = e.target.closest('.bc-q-item');
      if (!item) return;
      var idx = parseInt(item.dataset.bcQ);
      if (checkedIndices[idx]) {
        delete checkedIndices[idx];
        item.classList.remove('checked');
        item.querySelector('.bc-checkbox').textContent = '';
      } else {
        checkedIndices[idx] = true;
        item.classList.add('checked');
        item.querySelector('.bc-checkbox').textContent = '✓';
      }

      // Show submit if at least 1 checked
      var count = Object.keys(checkedIndices).length;
      submitBtn.classList.toggle('show', count > 0);
    });

    // Step 3: Submit & diagnose
    submitBtn.addEventListener('click', function() {
      if (!selectedType) return;
      var dt = DECISION_TYPES[selectedType];
      var biasCount = {};
      var indices = Object.keys(checkedIndices);

      for (var i = 0; i < indices.length; i++) {
        var q = dt.questions[parseInt(indices[i])];
        for (var b = 0; b < q.biases.length; b++) {
          var key = q.biases[b];
          biasCount[key] = (biasCount[key] || 0) + 1;
        }
      }

      // Sort biases by count desc
      var sorted = Object.keys(biasCount).sort(function(a, b) {
        return biasCount[b] - biasCount[a];
      });

      // Health rating
      var totalChecked = indices.length;
      var totalQ = dt.questions.length;
      var ratio = totalChecked / totalQ;
      var healthClass, healthLabel, healthEmoji;
      if (ratio <= 0.2) {
        healthClass = 'green'; healthEmoji = '🟢'; healthLabel = '决策健康度：良好';
      } else if (ratio <= 0.5) {
        healthClass = 'yellow'; healthEmoji = '🟡'; healthLabel = '决策健康度：需关注';
      } else {
        healthClass = 'red'; healthEmoji = '🔴'; healthLabel = '决策健康度：高风险';
      }

      var html = '<div class="bc-health ' + healthClass + '">' + healthEmoji + ' ' + healthLabel + '</div>';

      if (sorted.length === 0) {
        html += '<div class="bc-no-bias">未检测到明显偏差倾向。但请记住：最危险的偏差是你没有意识到的偏差。<br>Shefrin称之为"偏差盲点"——认为自己不受偏差影响，本身就是一种偏差。</div>';
      } else {
        html += '<div style="font-size:0.8rem;color:var(--fg-secondary);margin-bottom:1rem;font-family:var(--sans);">检测到 ' + sorted.length + ' 种可能的认知偏差：</div>';
        for (var s = 0; s < sorted.length; s++) {
          var bias = BIAS_DB[sorted[s]];
          var intensity = biasCount[sorted[s]] >= 3 ? '强' : biasCount[sorted[s]] >= 2 ? '中' : '弱';
          html += '<div class="bc-bias-card">' +
            '<div class="bc-bias-name">' + bias.name + ' <span style="font-size:0.7rem;opacity:0.7;">（信号强度：' + intensity + '）</span></div>' +
            '<div class="bc-bias-explain">' + bias.explain + '</div>' +
            '<div class="bc-bias-counter">' + bias.counter + '</div>' +
          '</div>';
        }

        // Cross-book insight
        html += '<div style="margin-top:1.2rem;padding:1rem;border-radius:10px;border:1px solid var(--border);background:var(--glass-bg);font-size:0.78rem;line-height:1.7;color:var(--fg-secondary);font-family:var(--sans);">' +
          '<b style="color:var(--accent);">跨书联结</b><br>' +
          'Kahneman《思考，快与慢》会说：这些偏差来自你的系统1——快速、自动、不受意识控制。<br>' +
          'Graham《聪明的投资者》会说：市场先生正在利用你的情绪——做他的主人而非仆人。<br>' +
          'Marks《投资最重要的事》会说：你需要第二层思维——问"大多数人在想什么，他们哪里想错了？"<br>' +
          'Shefrin的独特贡献：不要依赖意志力，设计制度让犯错变得困难。' +
        '</div>';
      }

      resultEl.innerHTML = html;
      resultEl.classList.add('show');
      submitBtn.classList.remove('show');
      resetBtn.classList.add('show');
    });

    // Reset
    resetBtn.addEventListener('click', function() {
      selectedType = null;
      checkedIndices = {};
      var allBtns = typeGrid.querySelectorAll('.bc-type-btn');
      for (var i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.remove('active');
      }
      questionsEl.classList.remove('show');
      submitBtn.classList.remove('show');
      resultEl.classList.remove('show');
      resetBtn.classList.remove('show');
      qListEl.innerHTML = '';
    });
  })();
});
