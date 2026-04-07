// ═══════════════════════════════════════════════════════════════
// BookEngine — Component Registry, Plugin System & Shared Components
// ═══════════════════════════════════════════════════════════════

window.BookEngine = (function() {
  // ── Registry ──
  const vizRegistry = {};
  const initQueue = [];
  const plugins = [];
  const hooks = {};

  // ── Public API ──
  const engine = {
    // Register a visualization/component renderer
    // Usage: BookEngine.registerViz('dunbar', { render: fn, init: fn })
    registerViz(type, handler) {
      vizRegistry[type] = handler;
    },

    // Register an init function to run after DOM render
    registerInit(fn) {
      initQueue.push(fn);
    },

    // Register a plugin with lifecycle hooks
    // Plugin: { name, onInit, onRender, onScroll, onModalOpen, onModalClose, onDestroy }
    registerPlugin(plugin) {
      plugins.push(plugin);
      // Register individual hooks
      ['onInit','onRender','onScroll','onModalOpen','onModalClose','onDestroy'].forEach(hook => {
        if (plugin[hook]) {
          engine.registerHook(hook, plugin[hook]);
        }
      });
    },

    // Register a lifecycle hook
    registerHook(hookName, fn) {
      if (!hooks[hookName]) hooks[hookName] = [];
      hooks[hookName].push(fn);
    },

    // Trigger all handlers for a hook
    triggerHook(hookName, ...args) {
      if (hooks[hookName]) {
        hooks[hookName].forEach(fn => {
          try { fn(...args); } catch(e) { console.warn(`[BookEngine] Hook ${hookName} error:`, e); }
        });
      }
    },

    // Render a visualization by type
    renderViz(type, scene, config) {
      const handler = vizRegistry[type];
      if (!handler) {
        console.warn(`[BookEngine] Unknown viz type: ${type}`);
        return '';
      }
      return typeof handler.render === 'function' ? handler.render(scene, config) : '';
    },

    // Initialize a visualization by type (called after DOM render)
    initViz(type) {
      const handler = vizRegistry[type];
      if (handler && typeof handler.init === 'function') {
        handler.init();
      }
    },

    // Run all init functions and plugin onInit hooks
    runInits() {
      initQueue.forEach(fn => {
        try { fn(); } catch(e) { console.warn('[BookEngine] Init error:', e); }
      });
      engine.triggerHook('onInit');
    },

    // Inject custom CSS into the document (for book-specific styles)
    injectCSS(cssString) {
      if (!cssString) return;
      const style = document.createElement('style');
      style.textContent = cssString;
      document.head.appendChild(style);
    },

    // ── Shared Component Renderers ──

    // Render comparison toggle module
    renderComparison(comp) {
      // Accept both comp.rows and comp.dimensions
      const rows = comp.rows || comp.dimensions;
      if (!comp || !rows) return '';
      const labels = comp.labels || ['采集', '农耕'];
      const modes = comp.modes || ['foraging', 'farming'];
      const triggerLabel = comp.triggerLabel || '生活质量对比 · Quality of Life';
      // Support 2 or 3 buttons (original sapiens has 3: foraging, farming, compare)
      const showCompare = comp.showCompare !== false;
      let html = `
        <div class="comparison-section reveal">
          <div class="dd-trigger-label">${triggerLabel}</div>
          <div class="comparison-toggle">
            <button class="toggle-btn active" data-mode="${modes[0]}">${comp.btnLabels?.[0] || labels[0] + '生活'}</button>
            <button class="toggle-btn" data-mode="${modes[1]}">${comp.btnLabels?.[1] || labels[1] + '生活'}</button>
            ${showCompare ? `<button class="toggle-btn" data-mode="compare">对比</button>` : ''}
          </div>
          <div class="comparison-rows">`;
      rows.forEach((row, i) => {
        html += `
            <div class="comp-row reveal reveal-delay-${Math.min(i+1,4)}" data-comp-row>
              <div class="comp-row-label">${row.label}</div>
              <div class="comp-bars">
                <div class="comp-bar-wrapper" data-bar="${modes[0]}">
                  <span class="comp-bar-tag">${labels[0]}</span>
                  <div class="comp-bar-track"><div class="comp-bar-fill amber" data-score="${row[modes[0]].score}"></div></div>
                  <span class="comp-bar-value">${row[modes[0]].score}/10</span>
                </div>
                <div class="comp-bar-wrapper" data-bar="${modes[1]}" style="display:none;">
                  <span class="comp-bar-tag">${labels[1]}</span>
                  <div class="comp-bar-track"><div class="comp-bar-fill grey" data-score="${row[modes[1]].score}"></div></div>
                  <span class="comp-bar-value">${row[modes[1]].score}/10</span>
                </div>
              </div>
              <div class="comp-text" data-text-${modes[0]}>${row[modes[0]].text}</div>
              <div class="comp-text" data-text-${modes[1]} style="display:none;">${row[modes[1]].text}</div>
            </div>`;
      });
      html += `</div></div>`;
      return html;
    },

    // Render knowledge map
    renderKnowledgeMap(map) {
      if (!map) return '';
      const centerText = map.center || map.centerNode || '';
      const centerStyle = map.centerStyle ? ` style="${map.centerStyle}"` : '';
      const branchesStyle = map.branchesStyle ? ` style="${map.branchesStyle}"` : '';
      let html = `
        <section class="knowledge-map" data-palette="${map.palette || 'hero'}">
          <div class="km-title reveal">${map.title}</div>
          <div class="km-center reveal reveal-delay-1"${centerStyle}>${centerText}</div>
          <div class="km-connector reveal reveal-delay-1"></div>
          <div class="km-branches"${branchesStyle}>`;
      map.branches.forEach((branch, i) => {
        const delay = i < 2 ? 2 : 3;
        const items = branch.leaves || branch.items || [];
        html += `
            <div class="km-branch reveal reveal-delay-${delay}">
              <div class="km-branch-title">${branch.title}</div>
              <div class="km-leaves">
                ${items.map(item => `<div class="km-leaf">${item}</div>`).join('')}
              </div>
            </div>`;
      });
      html += `</div></section>`;
      return html;
    },

    // Render mind map (multi-level tree)
    renderMindMap(map) {
      if (!map || !map.branches) return '';
      const renderL3 = (items) => {
        if (!items || items.length === 0) return '';
        return `<div class="mm-l3-list">${items.map(t => `<div class="mm-l3">${t}</div>`).join('')}</div>`;
      };
      const renderL2 = (children) => {
        if (!children || children.length === 0) return '';
        return children.map(c => {
          if (typeof c === 'string') {
            return `<div class="mm-l2"><div class="mm-l2-title">${c}</div></div>`;
          }
          return `<div class="mm-l2"><div class="mm-l2-title">${c.text}</div>${renderL3(c.children)}</div>`;
        }).join('');
      };
      let html = `<section class="mind-map" data-palette="${map.palette || 'hero'}">`;
      html += `<div class="mm-title reveal">${map.title}</div>`;
      if (map.subtitle) html += `<div class="mm-subtitle reveal">${map.subtitle}</div>`;
      html += `<div class="mm-root reveal reveal-delay-1">${map.root}</div>`;
      html += `<div class="mm-trunk reveal reveal-delay-1"></div>`;
      html += `<div class="mm-level1-wrap">`;
      map.branches.forEach((b, i) => {
        const delay = i < 2 ? 2 : 3;
        html += `<div class="mm-l1 reveal reveal-delay-${delay}">`;
        html += `<div class="mm-l1-title">${b.text}</div>`;
        html += renderL2(b.children);
        html += `</div>`;
      });
      html += `</div></section>`;
      return html;
    },

    // ── Shared Initializers ──

    // Initialize comparison toggle behavior
    initComparison() {
      document.querySelectorAll('.comparison-toggle').forEach(toggle => {
        toggle.addEventListener('click', e => {
          const btn = e.target.closest('.toggle-btn');
          if (!btn) return;
          toggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const section = toggle.closest('.comparison-section');
          engine.updateCompBars(btn.dataset.mode, section);
        });
      });
    },

    updateCompBars(mode, section) {
      const modes = [];
      section.querySelectorAll('.toggle-btn').forEach(b => {
        if (b.dataset.mode !== 'compare') modes.push(b.dataset.mode);
      });
      const isCompare = mode === 'compare';
      section.querySelectorAll('[data-comp-row]').forEach(row => {
        modes.forEach(m => {
          const bar = row.querySelector(`[data-bar="${m}"]`);
          const text = row.querySelector(`[data-text-${m}]`);
          if (bar) bar.style.display = (isCompare || m === mode) ? 'flex' : 'none';
          if (text) text.style.display = (isCompare || m === mode) ? 'block' : 'none';
        });
      });
      engine.animateCompBars(section);
    },

    animateCompBars(section) {
      (section || document).querySelectorAll('.comp-bar-fill').forEach(bar => {
        if (bar.closest('.comp-bar-wrapper').style.display === 'none') return;
        bar.style.width = '0%';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          bar.style.width = (parseInt(bar.dataset.score) / 10 * 100) + '%';
        }));
      });
    },

    // Animate counter (shared utility)
    animateCounter(el, from, to, duration, suffix) {
      const start = performance.now();
      function formatVal(val) {
        if (suffix === '万' || suffix === '%') return val;
        if (val >= 1000000) return (val / 1000000).toFixed(0) + 'M';
        if (val >= 10000 && !suffix) return Math.round(val / 1000) + 'K';
        return val;
      }
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(from + (to - from) * eased);
        el.textContent = formatVal(val) + (p >= 1 && suffix ? suffix : (p < 1 && suffix === '+' ? '' : ''));
        if (p >= 1) el.textContent = formatVal(to) + (suffix || '');
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    },

    // Animate SVG data viz bars
    animateDataViz(container) {
      const bars = container.querySelectorAll('.draw-bar');
      bars.forEach((bar, i) => {
        const targetW = parseFloat(bar.dataset.targetW);
        setTimeout(() => {
          bar.style.transition = 'width 1.5s var(--ease-out)';
          bar.style.width = targetW + 'px';
        }, i * 300);
      });
      const labels = container.querySelectorAll('.bar-label');
      labels.forEach((lbl, i) => {
        setTimeout(() => {
          lbl.style.transition = 'opacity 0.6s';
          lbl.style.opacity = '1';
        }, 800 + i * 300);
      });
    },

    // Get registered viz types
    getVizTypes() { return Object.keys(vizRegistry); },

    // Get plugins
    getPlugins() { return plugins.map(p => p.name); }
  };

  // ── Built-in Viz: comparison-table ──
  engine.registerViz('comparison-table', {
    render(scene, config) {
      const d = config.data;
      if (!d || !d.columns || !d.rows) return '';
      let html = `<div class="data-viz comparison-table-viz reveal" data-viz="comparison-table">`;
      if (config.title) html += `<h4 class="viz-title">${config.title}</h4>`;
      if (config.description) html += `<p class="viz-desc">${config.description}</p>`;
      html += `<div class="table-scroll"><table class="comp-table">`;
      html += `<thead><tr>${d.columns.map(c => `<th>${c}</th>`).join('')}</tr></thead>`;
      html += `<tbody>`;
      d.rows.forEach(row => {
        html += `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
      });
      html += `</tbody></table></div>`;
      if (d.note) html += `<p class="viz-note">${d.note}</p>`;
      html += `</div>`;
      return html;
    }
  });

  return engine;
})();
