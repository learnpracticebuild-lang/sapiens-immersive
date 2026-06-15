// ═══════════════════════════════════════════════════════════════
// Immersive Book Engine — Core Rendering & Interaction System
// ═══════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ── DOM References ──
  const app = document.getElementById('app');
  const sceneNav = document.getElementById('sceneNav');

  // ── Palette System ──
  // Unified superset: 13 color variables
  const PALETTE_KEYS = [
    ['bg',          '--bg'],
    ['bgSecondary', '--bg-secondary'],
    ['fg',          '--fg'],
    ['fgSecondary', '--fg-secondary'],
    ['accent',      '--accent'],
    ['accentDim',   '--accent-dim'],
    ['accentMid',   '--accent-mid'],
    ['accentGlow',  '--accent-glow'],
    ['border',      '--border'],
    ['glassBg',     '--glass-bg'],
    ['glassBorder', '--glass-border'],
    ['cardBg',      '--card-bg'],
    ['mutedFg',     '--muted-fg']
  ];

  function applyPalette(name) {
    const p = PALETTES[name];
    if (!p) return;
    const s = document.documentElement.style;
    PALETTE_KEYS.forEach(([key, prop]) => {
      // Fallback: cardBg → glassBg, mutedFg → fgSecondary, etc.
      const val = p[key]
        || (key === 'cardBg' ? p.glassBg : null)
        || (key === 'mutedFg' ? p.fgSecondary : null)
        || (key === 'bgSecondary' ? p.bg : null)
        || (key === 'glassBorder' ? p.border : null);
      if (val) s.setProperty(prop, val);
    });
    document.body.style.backgroundColor = p.bg;
    document.body.style.color = p.fg;
  }

  // ── Render Engine ──
  function renderApp() {
    const { meta, scenes } = CONTENT_DATA;
    const parts = meta.parts || [];
    const knowledgeMaps = CONTENT_DATA.knowledgeMaps || [];
    const mindMaps = CONTENT_DATA.mindMaps || [];
    const aiReflection = CONTENT_DATA.aiReflection || null;
    let html = '';

    // Hero
    html += `
      <section class="hero" id="hero">
        <div class="hero-overline">${meta.author || meta.authorEn || ''} · ${meta.titleEn || meta.bookSub || ''}</div>
        <h1 class="hero-title" id="heroTitle">${meta.title || meta.book || ''}</h1>
        <p class="hero-subtitle">${meta.subtitle || meta.partTitle || ''}</p>
        <div class="hero-part">${meta.badge || (meta.part ? meta.part + (meta.partSub ? ' · ' + meta.partSub : '') : '')}</div>
        <div class="hero-scroll-hint">
          <span>向下滚动</span>
          <div class="scroll-arrow">↓</div>
          <div class="scroll-line"></div>
        </div>
      </section>`;

    // Hero extra content (e.g., timeline explorer for sapiens)
    if (typeof CONTENT_DATA.renderHeroExtra === 'function') {
      html += CONTENT_DATA.renderHeroExtra();
    }

    // Determine dark scenes from data or palette analysis
    const darkScenes = CONTENT_DATA.darkScenes || [];

    // Render scenes
    scenes.forEach((scene, idx) => {
      const isDark = darkScenes.includes(scene.palette);

      // Part divider BEFORE scene (declarative)
      const partBefore = parts.find(p => p.beforeScene === scene.id);
      if (partBefore && partBefore.number > 1) {
        // Knowledge map for the previous part
        const kmBefore = knowledgeMaps.find(km => km.afterPart === partBefore.number - 1);
        if (kmBefore) {
          html += BookEngine.renderKnowledgeMap(kmBefore);
        }
        // Mind map for the previous part
        const mmBefore = mindMaps.find(mm => mm.afterPart === partBefore.number - 1);
        if (mmBefore) {
          html += BookEngine.renderMindMap(mmBefore);
        }
        // Part intro
        const prevScene = idx > 0 ? scenes[idx - 1] : null;
        const introPalette = scene.palette;
        html += `
          <section class="hero" id="part${partBefore.number}-intro" data-palette="${introPalette}" style="min-height:80vh;">
            <div class="hero-overline reveal" style="animation:none;">第${numberToChinese(partBefore.number)}部分</div>
            <h1 class="hero-title reveal reveal-delay-1" style="animation:none; font-size:clamp(2.5rem,9vw,5.5rem);">${partBefore.title}</h1>
            <p class="hero-subtitle reveal reveal-delay-2" style="animation:none;">${partBefore.titleEn || ''}</p>
          </section>`;
      }

      // Scene section
      html += `<section class="scene${isDark ? ' dark-scene' : ''}" id="${scene.id}" data-palette="${scene.palette}"><div class="scene-inner" style="position:relative;z-index:1;">`;

      // Dark mode particles
      if (isDark && !scene.starField) {
        html += `<div class="dark-particles">${Array.from({length:20}, (_,i) => {
          const x = Math.random()*100, y = Math.random()*100, d = 8+Math.random()*16, delay = Math.random()*10;
          return `<div class="particle" style="left:${x}%;top:${y}%;animation-duration:${d}s;animation-delay:${delay}s;"></div>`;
        }).join('')}</div>`;
      }
      // Star field
      if (scene.starField) {
        html += `<div class="star-field">${Array.from({length:50}, (_,i) => {
          const x = Math.random()*100, y = Math.random()*100, size = 1+Math.random()*2, delay = Math.random()*6, dur = 3+Math.random()*4;
          return `<div class="star" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s;"></div>`;
        }).join('')}</div>`;
      }

      // Scene header
      html += `
        <div class="reveal scene-number">${scene.number || ('场景 ' + String(idx+1).padStart(2,'0'))}</div>
        <h2 class="reveal scene-title reveal-delay-1">${scene.title}</h2>
        <div class="reveal scene-subtitle reveal-delay-2">${scene.subtitle || ''}</div>`;

      // Hero Quote
      if (scene.heroQuote) {
        html += `
        <div class="hero-quote-wrap reveal-wipe">
          <span class="quote-deco quote-deco-open">「</span>
          <span class="quote-deco quote-deco-close">」</span>
          <blockquote class="hero-quote"><span class="hero-quote-highlight">${scene.heroQuote}</span></blockquote>
        </div>`;
      }

      // Narrative (with keyTerm highlighting)
      if (scene.narrative?.length) {
        const kt = CONTENT_DATA.meta.keyTerms || [];
        html += `<div class="narrative">`;
        scene.narrative.forEach((p, pi) => {
          let text = p;
          if (kt.length) {
            kt.forEach(k => {
              const escaped = k.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              text = text.replace(new RegExp(`(?:<[^>]*>.*?<\\/[^>]*>)|(?:${escaped})`, 'g'), match => {
                if (match.startsWith('<')) return match; // inside HTML tag, skip
                return `<span class="key-term" title="${k.definition}">${match}</span>`;
              });
            });
          }
          const cls = pi === 0 ? ' drop-cap-p' : '';
          html += `<p class="reveal${cls}">${text}</p>`;
        });
        html += `</div>`;
      }

      // Extended Reading (collapsible background panel)
      if (scene.extendedReading?.length) {
        html += `
          <details class="extended-reading reveal">
            <summary class="extended-reading-toggle">📖 展开深度背景</summary>
            <div class="extended-reading-content">
              ${scene.extendedReading.map(p => `<p>${p}</p>`).join('')}
            </div>
          </details>`;
      }

      // Data Viz — dispatch to registry
      if (scene.dataViz) {
        const vizType = typeof scene.dataViz === 'string' ? scene.dataViz : scene.dataViz.type;
        const vizConfig = typeof scene.dataViz === 'string' ? { type: vizType } : scene.dataViz;
        html += BookEngine.renderViz(vizType, scene, vizConfig);
      }

      // Extra renderers for this scene (book-specific injections)
      if (scene.extraRender) {
        scene.extraRender.forEach(fn => {
          if (typeof fn === 'function') html += fn(scene);
          else if (typeof fn === 'string') html += fn;
        });
      }

      // Comparison
      if (scene.comparison) {
        html += BookEngine.renderComparison(scene.comparison);
      }

      // Interactive module — dispatch to registry
      if (scene.interactive) {
        const intType = scene.interactive.type;
        html += BookEngine.renderViz(intType, scene, scene.interactive);
      }

      // Deep Dives
      if (scene.deepDives?.length) {
        html += `<div class="dd-trigger-section reveal"><div class="dd-trigger-label">深度解析 · Deep Dive</div><div class="dd-trigger-grid">`;
        scene.deepDives.forEach((dd, i) => {
          html += `
            <div class="dd-trigger reveal reveal-delay-${Math.min(i+1, 4)}" data-dd-idx="${idx}-${i}">
              <span class="dd-trigger-icon">${dd.icon}</span>
              <div class="dd-trigger-content">
                <div class="dd-trigger-title">${dd.title}</div>
                <div class="dd-trigger-hint">点击展开完整论证链</div>
              </div>
              <span class="dd-trigger-arrow">→</span>
            </div>`;
        });
        html += `</div></div>`;
      }

      // Key Takeaway
      if (scene.keyTakeaway) {
        html += `<div class="reveal" style="margin-top:3rem;padding:1.5rem;background:var(--accent-glow);border-left:3px solid var(--accent);border-radius:0 8px 8px 0;font-size:0.85rem;line-height:1.8;color:var(--fg-secondary);">
          <strong style="color:var(--accent);font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;">核心收获</strong><br>${scene.keyTakeaway}</div>`;
      }

      html += `</div></section>`; // end scene-inner + scene
    });

    // Final knowledge map (after last part)
    const lastPart = parts.length > 0 ? Math.max(...parts.map(p => p.number)) : 0;
    knowledgeMaps.filter(km => km.afterPart >= lastPart || km.afterPart === 'final').forEach(km => {
      html += BookEngine.renderKnowledgeMap(km);
    });

    // Final mind maps (after last part)
    mindMaps.filter(mm => mm.afterPart >= lastPart || mm.afterPart === 'final').forEach(mm => {
      html += BookEngine.renderMindMap(mm);
    });

    // AI Reflection / Epilogue
    if (aiReflection) {
      const epiloguePalette = aiReflection.palette || (scenes.length > 0 ? scenes[scenes.length - 1].palette : 'hero');
      html += `
        <section class="scene epilogue-section" id="epilogue" data-palette="${epiloguePalette}" style="min-height:auto; padding: clamp(4rem,10vw,8rem) 0;">
          <div class="scene-inner">
            <div class="reveal scene-number" style="opacity:0.4;">${aiReflection.label || '写在最后'}</div>
            <h2 class="reveal scene-title reveal-delay-1" style="font-size:clamp(1.8rem,5vw,3rem);">${aiReflection.title}</h2>
            <div class="reveal scene-subtitle reveal-delay-2">${aiReflection.subtitle || ''}</div>
            ${aiReflection.heroQuote ? `
            <div class="hero-quote-wrap reveal-wipe">
              <blockquote class="hero-quote" style="font-size:clamp(1rem,2.5vw,1.4rem);">${aiReflection.heroQuote}</blockquote>
            </div>` : ''}
            <div class="narrative">
              ${(aiReflection.paragraphs || []).map(p => `<p class="reveal">${p}</p>`).join('')}
            </div>
          </div>
        </section>`;
    }

    // Glossary floating button (only if keyTerms exist)
    if (CONTENT_DATA.meta.keyTerms?.length) {
      html += `<button class="glossary-fab" id="glossaryFab" title="术语表">📖 术语表</button>`;
    }

    // Footer
    html += `
      <footer class="footer" data-palette="hero">
        <div class="reveal footer-title">${CONTENT_DATA.footer?.title || '全书 · 终'}</div>
        <p class="reveal footer-text reveal-delay-1">${CONTENT_DATA.footer?.text || ''}</p>
        ${CONTENT_DATA.footer?.note ? `<div class="reveal footer-next reveal-delay-2" style="opacity:0.4;margin-top:3rem;font-size:0.7rem;">${CONTENT_DATA.footer.note}</div>` : ''}
        <a href="../index.html" class="footer-bookshelf reveal reveal-delay-3"><span class="arrow">←</span> 返回书架</a>
      </footer>`;

    app.innerHTML = html;

    // Build nav dots
    let navHtml = '';
    scenes.forEach(s => {
      navHtml += `<a href="#${s.id}" data-scene="${s.id}" data-label="${s.title}"></a>`;
    });
    sceneNav.innerHTML = navHtml;

    // Trigger hook
    BookEngine.triggerHook('onRender');

    // Init systems
    initScrollSystem();
    initDeepDiveModal();
    BookEngine.initComparison();
    BookEngine.runInits();
  }

  // ── Scroll System ──
  function initScrollSystem() {
    const scenes = document.querySelectorAll('.scene');
    const navLinks = document.querySelectorAll('.scene-nav a');
    const progressBar = document.getElementById('progressBar');
    const nav = document.getElementById('sceneNav');

    // Reveal observer
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-wipe').forEach(el => revealObs.observe(el));

    // Data viz observer
    const vizObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          BookEngine.animateDataViz(e.target);
          vizObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('[data-viz]').forEach(el => vizObs.observe(el));

    // Big number counter observer
    const countObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = parseInt(e.target.dataset.countTo);
          const suffix = e.target.dataset.suffix || '';
          BookEngine.animateCounter(e.target, 0, target, 2000, suffix);
          countObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count-to]').forEach(el => countObs.observe(el));

    // Comparison observer
    const compObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          BookEngine.animateCompBars();
          compObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.comparison-section').forEach(el => compObs.observe(el));

    // Custom observers (registered by books)
    if (BookEngine._customObservers) {
      BookEngine._customObservers.forEach(obs => obs());
    }

    // Scroll handler — palette + progress + nav
    let currentPalette = 'hero';
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = (scrollTop / docHeight * 100) + '%';
        nav.classList.toggle('visible', scrollTop > window.innerHeight * 0.5);

        // Hero parallax
        const heroTitle = document.getElementById('heroTitle');
        if (heroTitle && scrollTop < window.innerHeight) {
          heroTitle.style.transform = `translateY(${scrollTop * 0.15}px)`;
        }

        // Determine active palette
        const viewMid = scrollTop + window.innerHeight * 0.45;
        let newPalette = 'hero';
        document.querySelectorAll('[data-palette]').forEach(s => {
          if (viewMid >= s.offsetTop && viewMid <= s.offsetTop + s.offsetHeight) {
            newPalette = s.dataset.palette;
          }
        });
        // Nav active dot
        scenes.forEach(s => {
          if (viewMid >= s.offsetTop && viewMid <= s.offsetTop + s.offsetHeight) {
            navLinks.forEach(l => l.classList.toggle('active', l.dataset.scene === s.id));
          }
        });
        // Footer reset
        const footer = document.querySelector('.footer');
        if (footer && viewMid >= footer.offsetTop) newPalette = 'hero';

        if (newPalette !== currentPalette) {
          currentPalette = newPalette;
          applyPalette(newPalette);
        }

        // Plugin scroll hook
        BookEngine.triggerHook('onScroll', { scrollTop, viewMid, currentPalette });

        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Deep Dive Modal ──
  function initDeepDiveModal() {
    const overlay = document.getElementById('modalOverlay');
    const backdrop = document.getElementById('modalBackdrop');
    const closeBtn = document.getElementById('modalClose');
    const body = document.getElementById('modalBody');

    function openModal(sceneIdx, ddIdx) {
      const dd = CONTENT_DATA.scenes[sceneIdx].deepDives[ddIdx];
      if (!dd) return;

      const hasQ = !!dd.triggerQuestion;
      const s = (n) => `modal-stagger modal-stagger-${n}`;
      const chainOffset = hasQ ? 1 : 0;

      body.innerHTML = `
        <div class="modal-icon ${s(1)}">${dd.icon}</div>
        <h3 class="modal-title ${s(2)}">${dd.title}</h3>
        ${hasQ ? `
        <div class="trigger-question ${s(3)}">
          <div class="trigger-question-label">主动回忆 · Active Recall</div>
          <p class="trigger-question-text">${dd.triggerQuestion}</p>
          <button class="recall-reveal-btn" id="recallReveal">💡 揭晓作者逻辑</button>
        </div>` : ''}
        <div class="logic-chain-modal${hasQ ? ' chain-masked' : ''}">
          <div class="chain-step-modal ${s(3 + chainOffset)}">
            <div class="chain-label-modal">前 提</div>
            <div class="chain-text-modal">${dd.chain.premise}</div>
          </div>
          <div class="chain-step-modal ${s(4 + chainOffset)}">
            <div class="chain-label-modal">证 据</div>
            <div class="chain-text-modal">${dd.chain.evidence}</div>
          </div>
          <div class="chain-step-modal ${s(5 + chainOffset)}">
            <div class="chain-label-modal">结 论</div>
            <div class="chain-text-modal">${dd.chain.conclusion}</div>
          </div>
        </div>`;
      body.offsetHeight; // force reflow
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';

      if (hasQ) {
        const revealBtn = document.getElementById('recallReveal');
        if (revealBtn) {
          revealBtn.addEventListener('click', () => {
            body.querySelector('.logic-chain-modal').classList.remove('chain-masked');
            revealBtn.style.display = 'none';
          });
        }
      }
      BookEngine.triggerHook('onModalOpen', { sceneIdx, ddIdx, dd });
    }

    function openGlossary() {
      const keyTerms = CONTENT_DATA.meta.keyTerms;
      if (!keyTerms?.length) return;
      body.innerHTML = `
        <div class="glossary-header modal-stagger modal-stagger-1">
          <div class="glossary-label">术语表 · Glossary</div>
          <h3 class="modal-title">${CONTENT_DATA.meta.title} · 关键术语</h3>
          <p style="font-size:0.8rem;color:var(--fg-secondary);margin-top:0.5rem;line-height:1.6;">以下术语按作者在书中的<strong>特定定义</strong>整理，可能与日常含义不同。</p>
        </div>
        <div class="glossary-list">
          ${keyTerms.map((kt, i) => `
            <div class="glossary-item modal-stagger modal-stagger-${Math.min(i + 2, 5)}">
              <div class="glossary-term">${kt.term}</div>
              <div class="glossary-definition">${kt.definition}</div>
            </div>
          `).join('')}
        </div>`;
      body.offsetHeight;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      BookEngine.triggerHook('onModalClose');
    }

    document.addEventListener('click', e => {
      const trigger = e.target.closest('[data-dd-idx]');
      if (trigger) {
        const [sIdx, dIdx] = trigger.dataset.ddIdx.split('-').map(Number);
        openModal(sIdx, dIdx);
        trigger.classList.add('clicked');
      }
      if (e.target.closest('#glossaryFab')) {
        openGlossary();
      }
    });
    backdrop.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  // ── Keyboard Navigation ──
  function initKeyboardNav() {
    const kbHint = document.getElementById('kbHint');
    let hintDismissed = false;

    function dismissHint() {
      if (!hintDismissed) {
        hintDismissed = true;
        kbHint.classList.add('hidden');
        window.removeEventListener('wheel', dismissHint);
        window.removeEventListener('touchstart', dismissHint);
      }
    }
    window.addEventListener('wheel', dismissHint, { passive: true, once: true });
    window.addEventListener('touchstart', dismissHint, { passive: true, once: true });

    function getAnchors() {
      const anchors = [document.getElementById('hero')];
      CONTENT_DATA.scenes.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) anchors.push(el);
      });
      return anchors;
    }

    function currentIdx(anchors) {
      const scrollMid = window.scrollY + window.innerHeight * 0.4;
      let idx = 0;
      for (let i = anchors.length - 1; i >= 0; i--) {
        if (scrollMid >= anchors[i].offsetTop) { idx = i; break; }
      }
      return idx;
    }

    document.addEventListener('keydown', e => {
      if (document.getElementById('modalOverlay').classList.contains('open')) return;
      const anchors = getAnchors();
      const cur = currentIdx(anchors);

      if (e.key === 'ArrowDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        const next = Math.min(cur + 1, anchors.length - 1);
        anchors[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
        dismissHint();
      } else if (e.key === 'ArrowUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        const prev = Math.max(cur - 1, 0);
        anchors[prev].scrollIntoView({ behavior: 'smooth', block: 'start' });
        dismissHint();
      }
    });
  }

  // ── Utility: Number to Chinese ──
  function numberToChinese(n) {
    const map = ['零','一','二','三','四','五','六','七','八','九','十'];
    return n <= 10 ? map[n] : String(n);
  }

  // ── Register observer for book-specific elements ──
  BookEngine._customObservers = [];
  BookEngine.registerObserver = function(setupFn) {
    BookEngine._customObservers.push(setupFn);
  };

  // ── Main init (called by template after all scripts load) ──
  BookEngine.init = function() {
    // Inject custom CSS if defined
    if (typeof CUSTOM_CSS !== 'undefined') {
      BookEngine.injectCSS(CUSTOM_CSS);
    }

    // Register custom components if defined
    if (typeof CUSTOM_COMPONENTS !== 'undefined') {
      Object.entries(CUSTOM_COMPONENTS).forEach(([type, handler]) => {
        BookEngine.registerViz(type, handler);
      });
    }

    // Render
    renderApp();
    initKeyboardNav();
  };

  // Expose applyPalette for external use
  BookEngine.applyPalette = applyPalette;

})();
