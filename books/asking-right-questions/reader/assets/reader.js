/* ============================================================
   智识图书馆 v2 · Reader 共享 JS
   提供 Alpine factory · 主题切换 · 阅读进度 · markdown 渲染
   ============================================================ */

// Theme bootstrap (call from inline script in <head> for FOUC-free)
window.bootstrapTheme = function() {
  try {
    var saved = localStorage.getItem('reader-theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
};

// Common reader Alpine app — used by all chapter pages
window.chapterApp = function(config) {
  config = config || {};
  return {
    // Theme
    theme: document.documentElement.getAttribute('data-theme') || 'light',
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.theme);
      try { localStorage.setItem('reader-theme', this.theme); } catch(e) {}
    },

    // Reading progress
    readProgress: 0,
    activeSection: config.initialSection || 'hero',

    // Six-question tabs
    activeQ: 'Q1',
    renderedQ: '',
    sixTabs: config.sixTabs || [],

    get currentTab() {
      return this.sixTabs.find(t => t.id === this.activeQ) || this.sixTabs[0];
    },

    setActiveQ(id) {
      this.activeQ = id;
      this.renderQ();
      const sec = document.getElementById('deep-six');
      if (sec && window.scrollY > sec.offsetTop + 300) {
        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    renderQ() {
      const node = document.getElementById('md-' + this.activeQ.toLowerCase());
      if (!node || typeof marked === 'undefined') {
        this.renderedQ = '<p style="color:var(--text-tertiary)">加载中…</p>';
        return;
      }
      this.renderedQ = marked.parse(node.textContent, { breaks: false, gfm: true });
    },

    scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); },

    init() {
      // Reading progress on scroll
      window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const total = h.scrollHeight - h.clientHeight;
        this.readProgress = total > 0 ? (h.scrollTop / total) * 100 : 0;
      });

      // Section observer for side-nav active state
      const sections = config.sectionIds || [];
      if (sections.length > 0) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if (e.isIntersecting) this.activeSection = e.target.id; });
        }, { rootMargin: '-50% 0px -50% 0px' });
        sections.forEach(id => {
          const el = document.getElementById(id);
          if (el) obs.observe(el);
        });
      }

      // Reveal animations
      const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

      // Initial six-question render (waits for marked.js)
      const tryRender = () => {
        if (typeof marked !== 'undefined') {
          this.renderQ();
        } else {
          setTimeout(tryRender, 80);
        }
      };
      if (this.sixTabs.length > 0) tryRender();

      // Run any custom hook from page
      if (typeof config.onInit === 'function') config.onInit.call(this);
    }
  };
};

// Index page Alpine app — table of contents only
window.indexApp = function() {
  return {
    theme: document.documentElement.getAttribute('data-theme') || 'light',
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.theme);
      try { localStorage.setItem('reader-theme', this.theme); } catch(e) {}
    },
    init() {
      const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
    }
  };
};
