// ═══════════════════════════════════════════════════════════════
// Sapiens — Custom Components & Styles
// Book-specific visualizations, animations, and observers
// ═══════════════════════════════════════════════════════════════

// ── CUSTOM CSS ──────────────────────────────────────────────────
const CUSTOM_CSS = `
/* ═══════════════════════════════════════════════════════
   DUNBAR CIRCLE VISUALIZATION
   ═══════════════════════════════════════════════════════ */
.dunbar-viz {
  position: relative;
  width: 100%;
  height: 320px;
  margin: 3rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dunbar-circle {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid var(--accent-mid);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1.5s var(--ease-out);
  opacity: 0;
  transform: scale(0.3);
}
.dunbar-circle.visible {
  opacity: 1;
  transform: scale(1);
}
.dunbar-circle .dc-num {
  font-family: var(--serif);
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
}
.dunbar-circle .dc-label {
  font-size: 0.55rem;
  color: var(--fg-secondary);
  letter-spacing: 0.05em;
  position: absolute;
  bottom: -1.5rem;
  white-space: nowrap;
}
.dunbar-circle.core {
  width: 80px; height: 80px;
  background: var(--accent-dim);
  z-index: 4;
}
.dunbar-circle.core .dc-num { font-size: 1.2rem; }
.dunbar-circle.band {
  width: 160px; height: 160px;
  z-index: 3;
}
.dunbar-circle.band .dc-num { font-size: 1rem; }
.dunbar-circle.limit {
  width: 260px; height: 260px;
  border-color: var(--accent);
  border-width: 2px;
  z-index: 2;
}
.dunbar-circle.limit .dc-num { font-size: 1.5rem; }
.dunbar-circle.beyond {
  width: 340px; height: 340px;
  border-style: dashed;
  border-color: var(--border);
  z-index: 1;
}
.dunbar-circle.beyond .dc-num {
  font-size: 0.9rem;
  color: var(--fg-secondary);
  opacity: 0.5;
}

/* ═══════════════════════════════════════════════════════
   EXTINCTION VISUALIZATION
   ═══════════════════════════════════════════════════════ */
.extinction-section { margin-top: 5rem; }
.extinction-region {
  margin-bottom: 3.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--border);
}
.extinction-region:last-child { border-bottom: none; }
.ext-header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.75rem;
}
.ext-region-name {
  font-family: var(--serif);
  font-size: 1.2rem;
  font-weight: 700;
}
.ext-arrival {
  font-size: 0.65rem;
  color: var(--accent);
  font-weight: 600;
  letter-spacing: 0.12em;
}
.ext-species {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 1.2rem 0;
}
.ext-species-icon {
  font-size: 1.5rem;
  position: relative;
  transition: all 0.6s var(--ease-out);
  opacity: 0.9;
}
.ext-species-icon.extinct::after {
  content: '';
  position: absolute;
  left: -3px; right: -3px;
  top: 50%;
  height: 2px;
  background: #DC2626;
  transform: rotate(-45deg);
  box-shadow: 0 0 6px rgba(220,38,38,0.5);
}
.ext-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}
.ext-bar-label {
  font-size: 0.6rem;
  color: var(--fg-secondary);
  opacity: 0.5;
  width: 3.5rem;
  flex-shrink: 0;
  letter-spacing: 0.05em;
}
.ext-bar-track {
  flex: 1;
  height: 10px;
  background: var(--border);
  border-radius: 5px;
  overflow: hidden;
}
.ext-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), #DC2626);
  border-radius: 5px;
  width: 0%;
  transition: width 2s var(--ease-out);
}
/* Extinction region — hidden until animated */
.extinction-region {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}
.extinction-region.ext-visible {
  opacity: 1;
  transform: translateY(0);
}
.ext-percent {
  font-family: var(--serif);
  font-size: 1.3rem;
  font-weight: 900;
  color: #DC2626;
  width: 3.5rem;
  text-align: right;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
}
.ext-note {
  font-size: 0.72rem;
  color: var(--fg-secondary);
  margin-top: 0.6rem;
  line-height: 1.7;
  opacity: 0.6;
}

/* ═══════════════════════════════════════════════════════
   ENHANCED: Extinction Cascade Upgrades
   ═══════════════════════════════════════════════════════ */
.ext-species-icon {
  font-size: 2rem !important;
  padding: 0.4rem;
  border-radius: 8px;
  background: var(--accent-glow);
  transition: all 0.6s var(--ease-out);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3rem;
  min-height: 3rem;
}
.ext-species-icon.extinct {
  background: rgba(220, 38, 38, 0.08);
}
.ext-species-icon.extinct::after {
  content: '\\2715';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  color: #DC2626;
  font-weight: 900;
  text-shadow: 0 0 10px rgba(220,38,38,0.6);
  animation: extSlash 0.4s var(--ease-spring) forwards;
  background: none;
  left: auto;
  right: auto;
  top: auto;
  height: auto;
  width: auto;
  transform: none;
}
@keyframes extSlash {
  0% { opacity: 0; transform: scale(2) rotate(-20deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}
/* Extinction percent red glow */
.ext-percent {
  text-shadow: 0 0 20px rgba(220,38,38,0.4);
  animation: extPulse 2s ease-in-out infinite;
}
@keyframes extPulse {
  0%, 100% { text-shadow: 0 0 20px rgba(220,38,38,0.3); }
  50% { text-shadow: 0 0 30px rgba(220,38,38,0.6); }
}
/* Body count counter */
.ext-body-count {
  position: sticky;
  top: 5rem;
  z-index: 10;
  text-align: right;
  font-family: var(--serif);
  font-size: 0.75rem;
  color: #DC2626;
  opacity: 0.8;
  padding: 0.5rem 0;
  letter-spacing: 0.05em;
}
.ext-body-count .count-num {
  font-size: 1.5rem;
  font-weight: 900;
  display: block;
  font-variant-numeric: tabular-nums;
}

/* ═══════════════════════════════════════════════════════
   STAR FIELD (Scene 18)
   ═══════════════════════════════════════════════════════ */
.star-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}
.star-field .star {
  position: absolute;
  width: 1px;
  height: 1px;
  background: #fff;
  border-radius: 50%;
  animation: starTwinkle 4s ease-in-out infinite;
  will-change: opacity;
}
@keyframes starTwinkle {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.7; }
}

/* Dark scene accent glow */
.scene.dark-scene .scene-title {
  text-shadow: 0 0 60px var(--accent-dim);
}
.scene.dark-scene .big-number {
  text-shadow: 0 0 40px var(--accent-mid), 0 0 80px var(--accent-dim);
}

/* ═══════════════════════════════════════════════════════
   TIMELINE EXPLORER
   ═══════════════════════════════════════════════════════ */
.timeline-explorer {
  padding: 5rem 2rem 4rem;
  overflow: hidden;
  position: relative;
}
.timeline-explorer-title {
  font-family: var(--sans);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: var(--accent);
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 3rem;
}
.timeline-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-mid) transparent;
  padding-bottom: 1rem;
}
.timeline-scroll::-webkit-scrollbar { height: 4px; }
.timeline-scroll::-webkit-scrollbar-track { background: transparent; }
.timeline-scroll::-webkit-scrollbar-thumb { background: var(--accent-mid); border-radius: 2px; }
.timeline-track {
  display: flex;
  align-items: center;
  position: relative;
  min-width: 1200px;
  padding: 3rem 4rem;
}
.timeline-line {
  position: absolute;
  top: 50%;
  left: 4rem;
  right: 4rem;
  height: 2px;
  background: var(--border);
  transform: translateY(-50%);
}
.timeline-line-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--accent), var(--accent-mid));
  border-radius: 1px;
  transition: width 2s var(--ease-out);
}
.timeline-milestone {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  cursor: pointer;
}
.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--accent-mid);
  transition: all 0.4s var(--ease-spring);
  position: relative;
  z-index: 2;
}
.timeline-milestone:hover .timeline-dot,
.timeline-milestone.active .timeline-dot {
  background: var(--accent);
  border-color: var(--accent);
  transform: scale(1.5);
  box-shadow: 0 0 16px var(--accent-mid);
}
.timeline-icon {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  transition: transform 0.3s var(--ease-spring);
}
.timeline-milestone:hover .timeline-icon {
  transform: scale(1.2);
}
.timeline-year {
  font-family: var(--sans);
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--accent);
  margin-top: 0.75rem;
  letter-spacing: 0.05em;
  white-space: nowrap;
}
.timeline-label {
  font-family: var(--serif);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--fg);
  margin-top: 0.3rem;
  text-align: center;
  white-space: nowrap;
}
.timeline-desc {
  position: absolute;
  top: calc(100% + 2.5rem);
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1rem 1.2rem;
  width: 240px;
  white-space: normal;
  word-break: break-all;
  font-size: 0.72rem;
  line-height: 1.7;
  color: var(--fg-secondary);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s var(--ease-out);
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  z-index: 10;
}
.timeline-milestone:first-child .timeline-desc {
  left: 0;
  transform: translateX(0) translateY(8px);
}
.timeline-milestone:first-child.active .timeline-desc,
.timeline-milestone:first-child:hover .timeline-desc {
  transform: translateX(0) translateY(0);
}
.timeline-milestone:last-child .timeline-desc {
  left: auto;
  right: 0;
  transform: translateX(0) translateY(8px);
}
.timeline-milestone:last-child.active .timeline-desc,
.timeline-milestone:last-child:hover .timeline-desc {
  transform: translateX(0) translateY(0);
}
.timeline-milestone.active .timeline-desc,
.timeline-milestone:hover .timeline-desc {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
  pointer-events: auto;
}

/* ═══════════════════════════════════════════════════════
   POPULATION COUNTER (Scene 5)
   ═══════════════════════════════════════════════════════ */
.pop-counter-section {
  margin: 4rem 0;
  padding: 3rem 0;
  position: relative;
}
.pop-counter-title {
  font-family: var(--sans);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 2rem;
}
.pop-grid-viz {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin: 1.5rem 0;
  min-height: 60px;
}
.pop-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0;
  transition: opacity 0.3s ease;
  will-change: opacity;
}
.pop-dot.visible { opacity: 0.7; }
.pop-counter-number {
  font-family: var(--serif);
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 900;
  color: var(--accent);
  text-shadow: 0 0 30px var(--accent-dim);
}
.pop-trap-bars {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}
.pop-trap-bar {
  text-align: center;
}
.pop-trap-bar-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--fg-secondary);
  margin-bottom: 0.5rem;
}
.pop-trap-bar-track {
  height: 120px;
  width: 40px;
  margin: 0 auto;
  background: var(--border);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}
.pop-trap-bar-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 4px;
  transition: height 2s var(--ease-out);
}
.pop-trap-bar-fill.up { background: var(--accent); }
.pop-trap-bar-fill.down { background: #DC2626; opacity: 0.7; }
.pop-trap-bar-val {
  font-family: var(--serif);
  font-size: 1.2rem;
  font-weight: 900;
  margin-top: 0.5rem;
}

/* ═══════════════════════════════════════════════════════
   WHEAT SPREAD VISUALIZATION
   ═══════════════════════════════════════════════════════ */
.wheat-map-section {
  margin: 4rem 0;
  padding: 3rem 0;
  position: relative;
}
.wheat-map-title {
  font-family: var(--sans);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}
.wheat-map-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
.wheat-map-container svg {
  width: 100%;
  height: auto;
}
.wheat-dot {
  fill: var(--accent);
  opacity: 0;
  transition: opacity 0.5s ease, r 0.5s ease;
}
.wheat-dot.spread { opacity: 0.6; }
.wheat-scrubber {
  width: 100%;
  margin: 1.5rem 0 0.5rem;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
.wheat-scrubber::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  box-shadow: 0 0 8px var(--accent-mid);
}
.wheat-scrubber::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  border: none;
  box-shadow: 0 0 8px var(--accent-mid);
}
.wheat-year-display {
  text-align: center;
  font-family: var(--serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--accent);
}
.wheat-coverage {
  text-align: center;
  font-size: 0.75rem;
  color: var(--fg-secondary);
  margin-top: 0.5rem;
}

/* ═══════════════════════════════════════════════════════
   VICIOUS CYCLE VISUALIZATION
   ═══════════════════════════════════════════════════════ */
.vicious-cycle-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  margin: 2rem 0;
  padding: 2rem 1rem;
}
.vc-stage {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  background: var(--accent-glow);
  border: 1px solid var(--border);
  opacity: 0;
  transform: translateY(12px);
  animation: vcFadeIn 0.5s var(--ease-out) forwards;
}
@keyframes vcFadeIn {
  to { opacity: 1; transform: translateY(0); }
}
.vc-icon { font-size: 1.3rem; }
.vc-label { font-family: var(--serif); font-size: 0.85rem; font-weight: 700; }
.vc-arrow {
  font-size: 1.1rem;
  color: var(--accent);
  font-weight: 700;
  flex-shrink: 0;
}
.vc-loop { font-size: 1.5rem; color: #DC2626; }
.vc-examples {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin: 1.5rem 0 1rem;
}
.vc-example-btn {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid var(--border);
  transition: all 0.3s var(--ease-out);
  letter-spacing: 0.05em;
}
.vc-example-btn.active {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}
.vc-example-btn:hover:not(.active) {
  border-color: var(--accent-mid);
  background: var(--accent-glow);
}
.vc-detail {
  padding: 1.2rem;
  border-radius: 10px;
  background: var(--accent-glow);
  border: 1px solid var(--border);
  font-size: 0.8rem;
  line-height: 2;
  color: var(--fg-secondary);
  min-height: 3rem;
}

/* ═══════════════════════════════════════════════════════
   TRUST STACK VISUALIZATION
   ═══════════════════════════════════════════════════════ */
.trust-stack-viz {
  display: flex;
  flex-direction: column-reverse;
  gap: 4px;
  margin: 2rem 0;
  padding: 1rem;
}
.ts-layer {
  display: grid;
  grid-template-columns: 120px 1fr 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  border-radius: 8px;
  opacity: 0;
  transform: translateY(10px);
  animation: tsFadeIn 0.5s var(--ease-out) forwards;
  cursor: default;
  transition: background 0.3s;
}
.ts-layer:hover { background: var(--accent-glow); }
@keyframes tsFadeIn {
  to { opacity: 1; transform: translateY(0); }
}
.ts-bar {
  height: 8px;
  border-radius: 4px;
  grid-column: 1 / -1;
  margin-bottom: -0.4rem;
}
.ts-label {
  font-family: var(--serif);
  font-size: 0.85rem;
  font-weight: 700;
}
.ts-desc {
  font-size: 0.72rem;
  color: var(--fg-secondary);
  opacity: 0.7;
  grid-column: 2 / -1;
}

/* ═══════════════════════════════════════════════════════
   PROGRESS PARADOX VISUALIZATION
   ═══════════════════════════════════════════════════════ */
.pp-chart {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  margin: 2rem 0;
  padding: 2rem 1rem 1rem;
  min-height: 280px;
  position: relative;
}
.pp-axis-label {
  position: absolute;
  font-family: var(--sans);
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.pp-power-label { top: 0; left: 1rem; color: var(--accent); }
.pp-happy-label { top: 0; right: 1rem; color: #8A5AA0; }
.pp-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  position: relative;
  cursor: pointer;
}
.pp-bar-power {
  width: 60%;
  background: var(--accent);
  border-radius: 4px 4px 0 0;
  transition: height 1.5s var(--ease-out);
  min-height: 2px;
}
.pp-bar-happy {
  width: 40%;
  background: #8A5AA0;
  opacity: 0.6;
  border-radius: 4px 4px 0 0;
  transition: height 1.5s var(--ease-out);
  min-height: 2px;
  position: absolute;
  bottom: 0;
  right: 5%;
}
.pp-era {
  font-family: var(--serif);
  font-size: 0.7rem;
  font-weight: 700;
  text-align: center;
  margin-top: 0.5rem;
  white-space: nowrap;
}
.pp-year {
  font-family: var(--sans);
  font-size: 0.55rem;
  color: var(--fg-secondary);
  opacity: 0.6;
}
.pp-tooltip {
  position: absolute;
  bottom: calc(100% + 1rem);
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.8rem 1rem;
  width: 220px;
  font-size: 0.7rem;
  line-height: 1.7;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s var(--ease-out);
  z-index: 10;
  white-space: normal;
}
.pp-col:hover .pp-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ═══════════════════════════════════════════════════════
   RESPONSIVE OVERRIDES (Sapiens-specific)
   ═══════════════════════════════════════════════════════ */
@media (max-width: 768px) {
  .dunbar-viz { height: 240px; }
  .dunbar-circle.beyond { width: 240px; height: 240px; }
  .dunbar-circle.limit { width: 190px; height: 190px; }
  .dunbar-circle.band { width: 120px; height: 120px; }
  .dunbar-circle.core { width: 60px; height: 60px; }
  .timeline-explorer { padding: 3rem 1rem; }
  .timeline-track { min-width: 900px; }
  .wheat-map-section { padding: 2rem 0; }
  .vicious-cycle-container { gap: 0.2rem; }
  .vc-stage { padding: 0.4rem 0.6rem; font-size: 0.75rem; }
  .pp-chart { gap: 0.4rem; min-height: 200px; }
  .pp-tooltip { width: 180px; }
  .ts-layer { grid-template-columns: 80px 1fr; }
}
`;


// ── CUSTOM COMPONENTS ───────────────────────────────────────────
const CUSTOM_COMPONENTS = {

  // ── Brain Energy SVG Bars ──
  'brain-energy': {
    render: function(scene, config) {
      return `
      <div class="data-viz reveal">
        <div class="data-viz-title">${config.title}</div>
        <div class="svg-container" data-viz="brain-energy">
          <svg viewBox="0 0 600 200" fill="none">
            <!-- Body mass bar -->
            <text x="0" y="28" font-family="var(--sans)" font-size="10" font-weight="600" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.1em">\u4F53\u91CD\u5360\u6BD4</text>
            <rect x="80" y="16" width="500" height="20" rx="4" fill="var(--border)"/>
            <rect class="draw-bar" data-target-w="10" x="80" y="16" width="0" height="20" rx="4" fill="var(--accent)" opacity="0.4"/>
            <text class="bar-label" x="95" y="30" font-family="var(--serif)" font-size="12" font-weight="700" fill="#fff" opacity="0">2%</text>
            <!-- Energy bar -->
            <text x="0" y="78" font-family="var(--sans)" font-size="10" font-weight="600" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.1em">\u80FD\u91CF\u6D88\u8017</text>
            <rect x="80" y="66" width="500" height="20" rx="4" fill="var(--border)"/>
            <rect class="draw-bar" data-target-w="125" x="80" y="66" width="0" height="20" rx="4" fill="var(--accent)"/>
            <text class="bar-label" x="210" y="80" font-family="var(--serif)" font-size="12" font-weight="700" fill="#fff" opacity="0">25%</text>
            <!-- Divider annotation -->
            <line x1="80" y1="110" x2="580" y2="110" stroke="var(--border)" stroke-width="1" stroke-dasharray="4 4"/>
            <text x="0" y="150" font-family="var(--sans)" font-size="10" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.05em">\u5480\u56BC\u65F6\u95F4</text>
            <!-- Chewing time comparison -->
            <rect x="80" y="136" width="500" height="10" rx="3" fill="var(--border)"/>
            <rect class="draw-bar" data-target-w="416" x="80" y="136" width="0" height="10" rx="3" fill="var(--fg-secondary)" opacity="0.15"/>
            <text class="bar-label" x="500" y="146" font-family="var(--sans)" font-size="9" fill="var(--fg-secondary)" opacity="0">\u9ED1\u7329\u7329 ~5\u5C0F\u65F6/\u5929</text>
            <rect x="80" y="156" width="500" height="10" rx="3" fill="var(--border)"/>
            <rect class="draw-bar" data-target-w="83" x="80" y="156" width="0" height="10" rx="3" fill="var(--accent)" opacity="0.6"/>
            <text class="bar-label" x="168" y="166" font-family="var(--sans)" font-size="9" fill="var(--fg-secondary)" opacity="0">\u4EBA\u7C7B ~1\u5C0F\u65F6/\u5929</text>
          </svg>
        </div>
        <div class="number-grid reveal">
          <div>
            <div class="big-number" data-count-to="2">0</div>
            <div class="big-number-label">% \u4F53\u91CD\u5360\u6BD4</div>
          </div>
          <div>
            <div class="big-number" data-count-to="25">0</div>
            <div class="big-number-label">% \u80FD\u91CF\u6D88\u8017</div>
          </div>
        </div>
      </div>`;
    }
  },

  // ── Dunbar Circles ──
  'dunbar': {
    render: function(scene, config) {
      return `
      <div class="data-viz reveal">
        <div class="data-viz-title">${config.title}</div>
        <div class="dunbar-viz" data-viz="dunbar">
          <div class="dunbar-circle beyond" data-delay="1200">
            <span class="dc-num">\u221E</span>
            <span class="dc-label">\u865A\u6784\u6545\u4E8B \u2192 \u65E0\u4E0A\u9650</span>
          </div>
          <div class="dunbar-circle limit" data-delay="800">
            <span class="dc-num">150</span>
            <span class="dc-label">\u90A6\u5DF4\u6570\u5B57 \u00B7 \u751F\u7269\u6781\u9650</span>
          </div>
          <div class="dunbar-circle band" data-delay="400">
            <span class="dc-num">50</span>
            <span class="dc-label">\u4EB2\u5BC6\u670B\u53CB</span>
          </div>
          <div class="dunbar-circle core" data-delay="0">
            <span class="dc-num">5</span>
            <span class="dc-label">\u81F3\u4EB2</span>
          </div>
        </div>
        <div class="number-grid reveal" style="grid-template-columns: repeat(3, 1fr);">
          <div>
            <div class="big-number" data-count-to="150">0</div>
            <div class="big-number-label">\u4EBA \u00B7 \u90A6\u5DF4\u6570\u5B57</div>
          </div>
          <div>
            <div class="big-number" data-count-to="120">0</div>
            <div class="big-number-label">\u4EBA \u00B7 \u7F57\u9A6C\u8FDE\u961F</div>
          </div>
          <div>
            <div class="big-number" style="font-size:clamp(2rem,5vw,3.5rem);" data-count-to="1000000" data-suffix="+">\u0030</div>
            <div class="big-number-label">\u4EBA \u00B7 \u865A\u6784\u5408\u4F5C\u4E0A\u9650</div>
          </div>
        </div>
      </div>`;
    }
  },

  // ── Agriculture Trap Chart ──
  'agri-trap': {
    render: function(scene, config) {
      return `
      <div class="data-viz reveal">
        <div class="data-viz-title">${config.title}</div>
        <div class="svg-container" data-viz="agri-trap">
          <svg viewBox="0 0 600 220" fill="none">
            <text x="0" y="18" font-family="var(--sans)" font-size="10" font-weight="600" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.1em">\u4EBA\u53E3\u603B\u91CF</text>
            <rect x="80" y="8" width="500" height="22" rx="4" fill="var(--border)"/>
            <rect class="draw-bar" data-target-w="450" x="80" y="8" width="0" height="22" rx="4" fill="var(--accent)"/>
            <text class="bar-label" x="535" y="23" font-family="var(--serif)" font-size="11" font-weight="700" fill="var(--accent)" opacity="0">\u2191 5000%</text>

            <text x="0" y="62" font-family="var(--sans)" font-size="10" font-weight="600" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.1em">\u4E2A\u4F53\u751F\u6D3B\u8D28\u91CF</text>
            <rect x="80" y="52" width="500" height="22" rx="4" fill="var(--border)"/>
            <rect class="draw-bar" data-target-w="100" x="80" y="52" width="0" height="22" rx="4" fill="#DC2626" opacity="0.6"/>
            <text class="bar-label" x="185" y="67" font-family="var(--serif)" font-size="11" font-weight="700" fill="#DC2626" opacity="0">\u2193 \u6025\u5267\u4E0B\u964D</text>

            <line x1="80" y1="96" x2="580" y2="96" stroke="var(--border)" stroke-width="1" stroke-dasharray="4 4"/>
            <text x="0" y="126" font-family="var(--sans)" font-size="10" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.05em">\u6BCF\u65E5\u52B3\u52A8</text>
            <rect x="80" y="114" width="500" height="12" rx="3" fill="var(--border)"/>
            <rect class="draw-bar" data-target-w="125" x="80" y="114" width="0" height="12" rx="3" fill="var(--accent)" opacity="0.3"/>
            <text class="bar-label" x="210" y="124" font-family="var(--sans)" font-size="9" fill="var(--fg-secondary)" opacity="0">\u91C7\u96C6\u8005 3-6\u5C0F\u65F6</text>
            <rect x="80" y="134" width="500" height="12" rx="3" fill="var(--border)"/>
            <rect class="draw-bar" data-target-w="416" x="80" y="134" width="0" height="12" rx="3" fill="#DC2626" opacity="0.35"/>
            <text class="bar-label" x="500" y="144" font-family="var(--sans)" font-size="9" fill="#DC2626" opacity="0">\u519C\u6C11 10-14\u5C0F\u65F6</text>

            <text x="0" y="178" font-family="var(--sans)" font-size="10" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.05em">\u5E73\u5747\u8EAB\u9AD8</text>
            <rect x="80" y="166" width="500" height="12" rx="3" fill="var(--border)"/>
            <rect class="draw-bar" data-target-w="440" x="80" y="166" width="0" height="12" rx="3" fill="var(--accent)" opacity="0.3"/>
            <text class="bar-label" x="525" y="176" font-family="var(--sans)" font-size="9" fill="var(--fg-secondary)" opacity="0">\u91C7\u96C6\u8005 ~177cm</text>
            <rect x="80" y="186" width="500" height="12" rx="3" fill="var(--border)"/>
            <rect class="draw-bar" data-target-w="340" x="80" y="186" width="0" height="12" rx="3" fill="#DC2626" opacity="0.35"/>
            <text class="bar-label" x="425" y="196" font-family="var(--sans)" font-size="9" fill="#DC2626" opacity="0">\u519C\u6C11 ~165cm (\u219312cm)</text>
          </svg>
        </div>
        <div class="number-grid reveal" style="grid-template-columns: repeat(3, 1fr);">
          <div>
            <div class="big-number" data-count-to="225" data-suffix="\u4E07">0</div>
            <div class="big-number-label">km\u00B2 \u00B7 \u5C0F\u9EA6\u79CD\u690D\u9762\u79EF</div>
          </div>
          <div>
            <div class="big-number" style="color:#DC2626;" data-count-to="12">0</div>
            <div class="big-number-label">cm \u00B7 \u8EAB\u9AD8\u4E0B\u964D</div>
          </div>
          <div>
            <div class="big-number" data-count-to="5000" data-suffix="%">0</div>
            <div class="big-number-label">\u4EBA\u53E3\u589E\u957F\u7387</div>
          </div>
        </div>
      </div>`;
    }
  },

  // ── Two Documents Comparison ──
  'two-documents': {
    render: function(scene, config) {
      return `
      <div class="data-viz reveal">
        <div class="data-viz-title">${config.title}</div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin:2rem 0;">
          <div style="padding:1.5rem; border-radius:10px; background:var(--accent-glow); border:1px solid var(--border);">
            <div style="font-family:var(--sans); font-size:0.55rem; font-weight:700; letter-spacing:0.2em; color:var(--accent); margin-bottom:0.75rem; text-transform:uppercase;">\u516C\u5143\u524D 1776 \u5E74</div>
            <div style="font-family:var(--serif); font-size:1.1rem; font-weight:700; margin-bottom:0.75rem;">\u6C49\u8C1F\u62C9\u6BD4\u6CD5\u5178</div>
            <div style="font-size:0.8rem; line-height:1.8; opacity:0.75;">
              \u201C\u5B89\u52AA\u4E0E\u6069\u5229\u5C14\u4E8C\u795E\uFF0C\u4E3A\u4EBA\u7C7B\u798F\u7949\u8BA1\uFF0C\u547D\u4EE4\u6211\uFF0C\u8363\u8000\u800C\u656C\u795E\u7684\u541B\u4E3B\u6C49\u8C1F\u62C9\u6BD4\uFF0C<b>\u53D1\u626C\u6B63\u4E49\u4E8E\u4E16</b>\uFF0C\u706D\u9664\u4E0D\u6CD5\u90AA\u6076\u4E4B\u4EBA\uFF0C\u4F7F\u5F3A\u4E0D\u51CC\u5F31\u3002\u201D
            </div>
            <div style="margin-top:1rem; font-size:0.65rem; color:var(--fg-secondary); opacity:0.6; line-height:1.7;">
              \u6838\u5FC3\u5047\u8BBE\uFF1A\u4EBA\u7531\u795E\u521B\u9020\u4E3A\u4E0D\u540C\u7B49\u7EA7\u3002<br>\u4E0A\u7B49\u4EBA\u547D = 30\u94F6\u820D\u5BA2\u52D2<br>\u5E73\u6C11\u547D = 20\u94F6\u820D\u5BA2\u52D2<br>\u5974\u96B6 = \u8D22\u4EA7\u635F\u5931
            </div>
          </div>
          <div style="padding:1.5rem; border-radius:10px; background:var(--accent-glow); border:1px solid var(--border);">
            <div style="font-family:var(--sans); font-size:0.55rem; font-weight:700; letter-spacing:0.2em; color:var(--accent); margin-bottom:0.75rem; text-transform:uppercase;">\u516C\u5143 1776 \u5E74</div>
            <div style="font-family:var(--serif); font-size:1.1rem; font-weight:700; margin-bottom:0.75rem;">\u7F8E\u56FD\u72EC\u7ACB\u5BA3\u8A00</div>
            <div style="font-size:0.8rem; line-height:1.8; opacity:0.75;">
              \u201C\u6211\u4EEC\u8BA4\u4E3A\u4E0B\u9762\u8FD9\u4E9B\u771F\u7406\u662F\u4E0D\u8BC1\u81EA\u660E\u7684\uFF1A<b>\u4EBA\u4EBA\u751F\u800C\u5E73\u7B49</b>\uFF0C\u9020\u7269\u4E3B\u8D4B\u4E88\u4ED6\u4EEC\u82E5\u5E72\u4E0D\u53EF\u5265\u593A\u7684\u6743\u5229\uFF0C\u5176\u4E2D\u5305\u62EC\u751F\u547D\u6743\u3001\u81EA\u7531\u6743\u548C\u8FFD\u6C42\u5E78\u798F\u7684\u6743\u5229\u3002\u201D
            </div>
            <div style="margin-top:1rem; font-size:0.65rem; color:var(--fg-secondary); opacity:0.6; line-height:1.7;">
              \u6838\u5FC3\u5047\u8BBE\uFF1A\u4EBA\u7531\u9020\u7269\u4E3B\u521B\u9020\u4E3A\u5E73\u7B49\u3002<br>\u4F46\uFF1A\u4EC5\u9650\u767D\u4EBA\u6709\u4EA7\u7537\u6027<br>\u4F5C\u8005\u6770\u6590\u900A\u62E5\u6709600+\u5974\u96B6<br>\u5973\u6027\u65E0\u6295\u7968\u6743\u81F31920\u5E74
            </div>
          </div>
        </div>
        <div style="text-align:center; padding:1.5rem 0; font-family:var(--serif); font-size:0.85rem; opacity:0.6; line-height:2;">
          \u4E24\u4EFD\u6587\u4EF6\u76F8\u96943552\u5E74\uFF0C\u4F7F\u7528\u5B8C\u5168\u76F8\u540C\u7684\u4FEE\u8F9E\u7B56\u7565\uFF1A<br>\u5C06\u865A\u6784\u7684\u793E\u4F1A\u89C4\u5219\u4F2A\u88C5\u6210\u8D85\u8D8A\u4EBA\u7C7B\u7684\u5BA2\u89C2\u771F\u7406\u3002
        </div>
      </div>`;
    }
  },

  // ── Money Evolution ──
  'money-evolution': {
    render: function(scene, config) {
      var milestones = [
        {era:'\u516C\u5143\u524D3000\u5E74',item:'\u5927\u9EA6',desc:'\u82CF\u7F8E\u5C14\u6700\u65E9\u7684\u652F\u4ED8\u5A92\u4ECB\u2014\u2014\u4E00\u5B9A\u91CF\u7684\u5927\u9EA6',icon:'\uD83C\uDF3E'},
        {era:'\u516C\u5143\u524D2500\u5E74',item:'\u767D\u94F6',desc:'\u6807\u51C6\u5316\u91CD\u91CF\u7684\u91D1\u5C5E\u5757\uFF0C\u53EF\u5207\u5272\u548C\u79F0\u91CF',icon:'\uD83E\uDE99'},
        {era:'\u516C\u5143\u524D600\u5E74',item:'\u94F8\u5E01',desc:'\u5415\u5E95\u4E9A\u738B\u56FD\u53D1\u884C\u7B2C\u4E00\u6279\u6807\u51C6\u786C\u5E01',icon:'\uD83D\uDCB0'},
        {era:'\u516C\u51437\u4E16\u7EAA',item:'\u7EB8\u5E01',desc:'\u5510\u671D\u201C\u98DE\u94B1\u201D\u2014\u2014\u4E16\u754C\u4E0A\u6700\u65E9\u7684\u7EB8\u5E01',icon:'\uD83D\uDCDC'},
        {era:'1971\u5E74',item:'\u6CD5\u5B9A\u8D27\u5E01',desc:'\u5C3C\u514B\u677E\u7EC8\u7ED3\u91D1\u672C\u4F4D\uFF0C\u8D27\u5E01\u5F7B\u5E95\u53D8\u4E3A\u865A\u6784',icon:'\uD83D\uDCB5'},
        {era:'2009\u5E74',item:'\u6BD4\u7279\u5E01',desc:'\u53BB\u4E2D\u5FC3\u5316\u6570\u5B57\u8D27\u5E01\u2014\u2014\u7EAF\u7CB9\u7684\u6570\u5B66\u4FE1\u4EFB',icon:'\u20BF'}
      ];
      return `
      <div class="data-viz reveal">
        <div class="data-viz-title">${config.title}</div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:1.2rem; margin:2rem 0;">
          ${milestones.map(function(m) { return `
            <div style="padding:1.2rem; border-radius:10px; background:var(--accent-glow); border:1px solid var(--border); text-align:center;">
              <div style="font-size:2rem; margin-bottom:0.5rem;">${m.icon}</div>
              <div style="font-family:var(--sans); font-size:0.55rem; font-weight:700; letter-spacing:0.15em; color:var(--accent); margin-bottom:0.4rem;">${m.era}</div>
              <div style="font-family:var(--serif); font-size:0.9rem; font-weight:700; margin-bottom:0.4rem;">${m.item}</div>
              <div style="font-size:0.7rem; line-height:1.6; opacity:0.6;">${m.desc}</div>
            </div>
          `; }).join('')}
        </div>
        <div style="text-align:center; padding:1rem 0; font-family:var(--serif); font-size:0.8rem; opacity:0.5; line-height:2;">
          5000\u5E74\u6765\uFF0C\u8D27\u5E01\u7684\u7269\u7406\u5F62\u6001\u4E0D\u65AD\u53D8\u5316\uFF0C\u4F46\u672C\u8D28\u59CB\u7EC8\u5982\u4E00\uFF1A<br>\u5B83\u4E0D\u662F\u4E00\u79CD\u201C\u4E1C\u897F\u201D\uFF0C\u800C\u662F\u4E00\u79CD\u201C\u4FE1\u4EFB\u201D\u3002
        </div>
      </div>`;
    }
  },

  // ── Ignorance Revolution ──
  'ignorance-revolution': {
    render: function(scene, config) {
      return `
      <div class="data-viz reveal">
        <div class="data-viz-title">${config.title}</div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin:2rem 0;">
          <div style="padding:1.5rem; border-radius:10px; background:var(--accent-glow); border:1px solid var(--border);">
            <div style="font-family:var(--sans); font-size:0.55rem; font-weight:700; letter-spacing:0.2em; color:var(--fg-secondary); margin-bottom:0.75rem;">1500\u5E74\u4E4B\u524D</div>
            <div style="font-family:var(--serif); font-size:1.1rem; font-weight:700; margin-bottom:0.75rem;">\u524D\u79D1\u5B66\u8303\u5F0F</div>
            <div style="font-size:0.8rem; line-height:1.8; opacity:0.75;">
              <b>\u201C\u91CD\u8981\u7684\u4E8B\u60C5\u90FD\u5DF2\u77E5\u9053\u201D</b><br>
              \u77E5\u8BC6\u6765\u6E90\uFF1A\u7ECF\u5178\u6587\u672C\uFF08\u5723\u7ECF/\u53E4\u5170\u7ECF/\u56DB\u4E66\u4E94\u7ECF\uFF09<br>
              \u65B9\u6CD5\uFF1A\u6CE8\u91CA\u3001\u89E3\u8BFB\u3001\u6743\u5A01\u5F15\u7528<br>
              \u76EE\u7684\uFF1A\u7406\u89E3\u795E/\u5929\u7684\u610F\u5FD7<br>
              \u5BF9\u672A\u77E5\u7684\u6001\u5EA6\uFF1A\u4E0D\u91CD\u8981/\u5DF2\u6709\u7B54\u6848
            </div>
          </div>
          <div style="padding:1.5rem; border-radius:10px; background:var(--accent-glow); border:1px solid var(--border);">
            <div style="font-family:var(--sans); font-size:0.55rem; font-weight:700; letter-spacing:0.2em; color:var(--accent); margin-bottom:0.75rem;">1500\u5E74\u4E4B\u540E</div>
            <div style="font-family:var(--serif); font-size:1.1rem; font-weight:700; margin-bottom:0.75rem;">\u79D1\u5B66\u8303\u5F0F</div>
            <div style="font-size:0.8rem; line-height:1.8; opacity:0.75;">
              <b>\u201C\u6700\u91CD\u8981\u7684\u4E8B\u60C5\u5C1A\u672A\u53D1\u73B0\u201D</b><br>
              \u77E5\u8BC6\u6765\u6E90\uFF1A\u89C2\u5BDF\u4E0E\u5B9E\u9A8C<br>
              \u65B9\u6CD5\uFF1A\u5047\u8BF4\u2192\u5B9E\u9A8C\u2192\u9A8C\u8BC1/\u5426\u5B9A<br>
              \u76EE\u7684\uFF1A\u83B7\u5F97\u65B0\u7684\u80FD\u529B/\u529B\u91CF<br>
              \u5BF9\u672A\u77E5\u7684\u6001\u5EA6\uFF1A\u6838\u5FC3\u9A71\u52A8\u529B/\u7814\u7A76\u65B9\u5411
            </div>
          </div>
        </div>
        <div class="number-grid reveal" style="grid-template-columns: repeat(3, 1fr);">
          <div>
            <div class="big-number" data-count-to="1543">0</div>
            <div class="big-number-label">\u54E5\u767D\u5C3C\u300A\u5929\u4F53\u8FD0\u884C\u8BBA\u300B</div>
          </div>
          <div>
            <div class="big-number" data-count-to="20" data-suffix="\u4EBF">0</div>
            <div class="big-number-label">\u7F8E\u5143 \u00B7 \u66FC\u54C8\u987F\u8BA1\u5212\u7ECF\u8D39</div>
          </div>
          <div>
            <div class="big-number" data-count-to="500" data-suffix="+">0</div>
            <div class="big-number-label">\u5E74 \u00B7 \u79D1\u5B66\u6301\u7EED\u52A0\u901F</div>
          </div>
        </div>
      </div>`;
    }
  },

  // ── Credit Cycle ──
  'credit-cycle': {
    render: function(scene, config) {
      var steps = ['\u4FE1\u4EFB\u672A\u6765','\u2192','\u53D1\u653E\u4FE1\u8D37','\u2192','\u6295\u8D44\u751F\u4EA7','\u2192','\u7ECF\u6D4E\u589E\u957F','\u2192','\u672A\u6765\u66F4\u597D','\u2192','\u66F4\u591A\u4FE1\u4EFB','\u2192 \u2026'];
      return `
      <div class="data-viz reveal">
        <div class="data-viz-title">${config.title}</div>
        <div style="display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:0.5rem; margin:2rem auto; max-width:600px; font-family:var(--serif); font-size:0.85rem; line-height:2.5;">
          ${steps.map(function(t) {
            return (t === '\u2192' || t === '\u2192 \u2026') ?
              '<span style="color:var(--accent);font-weight:700;font-size:1.1rem;">' + t + '</span>' :
              '<span style="padding:0.4rem 1rem; border-radius:8px; background:var(--accent-glow); border:1px solid var(--border); white-space:nowrap;">' + t + '</span>';
          }).join('')}
        </div>
        <div style="text-align:center; margin:1.5rem 0; font-size:0.75rem; color:var(--fg-secondary); line-height:2; opacity:0.7;">
          \u6B63\u5FAA\u73AF\uFF1A\u4E50\u89C2 \u2192 \u4FE1\u8D37\u6269\u5F20 \u2192 \u589E\u957F \u2192 \u66F4\u4E50\u89C2<br>
          \u8D1F\u5FAA\u73AF\uFF1A\u6050\u614C \u2192 \u4FE1\u8D37\u6536\u7F29 \u2192 \u8870\u9000 \u2192 \u66F4\u6050\u614C<br>
          \u6574\u4E2A\u73B0\u4EE3\u7ECF\u6D4E\u8FD0\u884C\u5728\u8FD9\u4E24\u79CD\u5FAA\u73AF\u4E4B\u95F4
        </div>
        <div class="number-grid reveal" style="grid-template-columns: repeat(3, 1fr);">
          <div>
            <div class="big-number" data-count-to="300" data-suffix="\u4E07\u4EBF">0</div>
            <div class="big-number-label">\u7F8E\u5143 \u00B7 \u5168\u7403\u4FE1\u8D37\u603B\u989D</div>
          </div>
          <div>
            <div class="big-number" data-count-to="100" data-suffix="\u4E07\u4EBF">0</div>
            <div class="big-number-label">\u7F8E\u5143 \u00B7 \u5168\u7403GDP</div>
          </div>
          <div>
            <div class="big-number" style="color:#DC2626;" data-count-to="3">0</div>
            <div class="big-number-label">\u500D \u00B7 \u4FE1\u8D37/\u5B9E\u9645\u8D22\u5BCC</div>
          </div>
        </div>
      </div>`;
    }
  },

  // ── Happiness Paradox ──
  'happiness-paradox': {
    render: function(scene, config) {
      return `
      <div class="data-viz reveal">
        <div class="data-viz-title">${config.title}</div>
        <div class="svg-container" data-viz="happiness-paradox">
          <svg viewBox="0 0 600 200" fill="none">
            <text x="0" y="28" font-family="var(--sans)" font-size="10" font-weight="600" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.1em">\u4EBA\u5747GDP\u589E\u957F\uFF081950-2020\uFF09</text>
            <rect x="80" y="16" width="500" height="22" rx="4" fill="var(--border)"/>
            <rect class="draw-bar" data-target-w="450" x="80" y="16" width="0" height="22" rx="4" fill="var(--accent)"/>
            <text class="bar-label" x="535" y="31" font-family="var(--serif)" font-size="11" font-weight="700" fill="var(--accent)" opacity="0">\u2191 600%</text>

            <text x="0" y="74" font-family="var(--sans)" font-size="10" font-weight="600" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.1em">\u5E78\u798F\u611F\u53D8\u5316</text>
            <rect x="80" y="62" width="500" height="22" rx="4" fill="var(--border)"/>
            <rect class="draw-bar" data-target-w="15" x="80" y="62" width="0" height="22" rx="4" fill="#8A5AA0" opacity="0.6"/>
            <text class="bar-label" x="100" y="77" font-family="var(--serif)" font-size="11" font-weight="700" fill="#8A5AA0" opacity="0">\u2248 \u6301\u5E73</text>

            <line x1="80" y1="106" x2="580" y2="106" stroke="var(--border)" stroke-width="1" stroke-dasharray="4 4"/>
            <text x="0" y="136" font-family="var(--sans)" font-size="10" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.05em">\u9884\u671F\u5BFF\u547D</text>
            <rect x="80" y="124" width="500" height="12" rx="3" fill="var(--border)"/>
            <rect class="draw-bar" data-target-w="350" x="80" y="124" width="0" height="12" rx="3" fill="var(--accent)" opacity="0.3"/>
            <text class="bar-label" x="435" y="134" font-family="var(--sans)" font-size="9" fill="var(--fg-secondary)" opacity="0">48\u5C81 \u2192 73\u5C81</text>
            <text x="0" y="162" font-family="var(--sans)" font-size="10" fill="var(--fg-secondary)" opacity="0.5" letter-spacing="0.05em">\u6291\u90C1\u75C7\u53D1\u75C5\u7387</text>
            <rect x="80" y="150" width="500" height="12" rx="3" fill="var(--border)"/>
            <rect class="draw-bar" data-target-w="200" x="80" y="150" width="0" height="12" rx="3" fill="#DC2626" opacity="0.35"/>
            <text class="bar-label" x="285" y="160" font-family="var(--sans)" font-size="9" fill="#DC2626" opacity="0">\u5168\u74033.5\u4EBF\u4EBA \u2191 \u6301\u7EED\u4E0A\u5347</text>
          </svg>
        </div>
        <div class="number-grid reveal" style="grid-template-columns: repeat(3, 1fr);">
          <div>
            <div class="big-number" data-count-to="600" data-suffix="%">0</div>
            <div class="big-number-label">\u4EBA\u5747GDP\u589E\u957F</div>
          </div>
          <div>
            <div class="big-number" style="color:#8A5AA0;" data-count-to="0">0</div>
            <div class="big-number-label">% \u00B7 \u5E78\u798F\u611F\u51C0\u53D8\u5316</div>
          </div>
          <div>
            <div class="big-number" style="color:#DC2626;" data-count-to="50" data-suffix="%">0</div>
            <div class="big-number-label">\u9057\u4F20\u51B3\u5B9A\u7684\u5E78\u798F\u57FA\u7EBF</div>
          </div>
        </div>
      </div>`;
    }
  },

  // ── Extinction Visualization ──
  'extinction': {
    render: function(scene, config) {
      var ext = scene.extinction || config;
      if (!ext || !ext.regions) return '';
      var html = '<div class="extinction-section"><div class="dd-trigger-label reveal">\u706D\u7EDD\u6863\u6848 \u00B7 Extinction Record</div>' +
        '<div class="ext-body-count reveal" id="extBodyCount">\u7D2F\u8BA1\u706D\u7EDD\u7269\u79CD<span class="count-num" id="extBodyNum">0</span></div>';
      ext.regions.forEach(function(region, i) {
        html += '<div class="extinction-region" data-ext-region data-delay="' + (i*600) + '" data-percent="' + region.percentLost + '">' +
          '<div class="ext-header">' +
            '<span class="ext-region-name">' + region.name + '</span>' +
            '<span class="ext-arrival">\u667A\u4EBA\u5230\u8FBE\uFF1A' + region.arrival + '</span>' +
          '</div>' +
          '<div class="ext-species">' +
            region.species.map(function(s, j) {
              return '<span class="ext-species-icon" data-ext-species data-delay="' + (j*120) + '" title="' + s.name + ' \u00B7 ' + s.weight + '">' + s.icon + '</span>';
            }).join('') +
          '</div>' +
          '<div class="ext-bar-wrapper">' +
            '<span class="ext-bar-label">\u706D\u7EDD\u7387</span>' +
            '<div class="ext-bar-track"><div class="ext-bar-fill" data-ext-fill data-target="' + region.percentLost + '"></div></div>' +
            '<span class="ext-percent"><span class="counter" data-ext-counter data-target="' + region.percentLost + '">0</span>%</span>' +
          '</div>' +
          '<div class="ext-note">' + region.note + '</div>' +
        '</div>';
      });
      html += '</div>';
      return html;
    }
  },

  // ── Population Counter (Scene 5) ──
  'population-counter': {
    render: function(scene, config) {
      return `
    <div class="pop-counter-section reveal" data-pop-counter>
      <div class="pop-counter-title">\u4EBA\u53E3\u7206\u70B8 \u00B7 Population Explosion</div>
      <div class="pop-counter-number" id="popNumber">5,000,000</div>
      <div style="font-size:0.7rem; color:var(--fg-secondary); opacity:0.6; margin-top:0.3rem;">\u91C7\u96C6\u65F6\u4EE3 \u00B7 \u5168\u7403\u4EBA\u53E3\u5CF0\u503C</div>
      <div class="pop-grid-viz" id="popGrid">${Array.from({length:200}, function() { return '<div class="pop-dot"></div>'; }).join('')}</div>
      <div class="pop-trap-bars">
        <div class="pop-trap-bar">
          <div class="pop-trap-bar-label">\u4EBA\u53E3\u6570\u91CF \u2191</div>
          <div class="pop-trap-bar-track"><div class="pop-trap-bar-fill up" id="popBarUp" style="height:10%;"></div></div>
          <div class="pop-trap-bar-val" style="color:var(--accent);" id="popBarUpVal">500\u4E07</div>
        </div>
        <div class="pop-trap-bar">
          <div class="pop-trap-bar-label">\u4E2A\u4F53\u751F\u6D3B\u8D28\u91CF \u2193</div>
          <div class="pop-trap-bar-track"><div class="pop-trap-bar-fill down" id="popBarDown" style="height:90%;"></div></div>
          <div class="pop-trap-bar-val" style="color:#DC2626;" id="popBarDownVal">\u6781\u9AD8</div>
        </div>
      </div>
    </div>`;
    }
  },

  // ── Vicious Cycle (Scene 8) ──
  'vicious-cycle': {
    render: function(scene, config) {
      var stages = [
        {label:'\u5076\u7136\u4E8B\u4EF6', icon:'\uD83C\uDFB2', desc:'\u5F81\u670D\u3001\u5206\u5DE5\u3001\u57FA\u56E0\u7A81\u53D8\u2014\u2014\u5076\u7136\u7684\u5386\u53F2\u4E8B\u4EF6\u5728\u4EBA\u7FA4\u4E4B\u95F4\u5236\u9020\u6700\u521D\u7684\u533A\u5206'},
        {label:'\u865A\u6784\u6545\u4E8B', icon:'\uD83D\uDCDC', desc:'\u533A\u5206\u88AB\u8D4B\u4E88\u201C\u81EA\u7136\u201D\u6216\u201C\u795E\u5723\u201D\u7684\u89E3\u91CA\uFF0C\u6210\u4E3A\u6587\u5316\u53D9\u4E8B'},
        {label:'\u5236\u5EA6\u5316', icon:'\u2696\uFE0F', desc:'\u6545\u4E8B\u88AB\u7F16\u5165\u6CD5\u5F8B\u3001\u6559\u80B2\u3001\u5EFA\u7B51\u3001\u4E60\u4FD7\u4E2D'},
        {label:'\u5B9E\u9645\u5DEE\u8DDD', icon:'\uD83D\uDCC9', desc:'\u5236\u5EA6\u6027\u6B67\u89C6\u5236\u9020\u4E86\u6559\u80B2\u3001\u8D22\u5BCC\u3001\u5065\u5EB7\u7684\u771F\u5B9E\u5DEE\u8DDD'},
        {label:'\u201C\u8BC1\u5B9E\u201D\u6545\u4E8B', icon:'\uD83D\uDD04', desc:'\u5DEE\u8DDD\u53CD\u8FC7\u6765\u88AB\u7528\u4F5C\u6B67\u89C6\u7684\u201C\u8BC1\u636E\u201D\u2014\u2014\u5FAA\u73AF\u95ED\u5408'}
      ];
      return `
      <div class="data-viz reveal">
        <div class="data-viz-title">${config.title || '\u6076\u6027\u5FAA\u73AF\uFF1A\u6B67\u89C6\u5982\u4F55\u81EA\u6211\u8BC1\u660E'}</div>
        <div class="vicious-cycle-container" data-viz="vicious-cycle">
          ${stages.map(function(s, i) {
            return '<div class="vc-stage" data-vc-stage="' + i + '" style="animation-delay:' + (i*0.3) + 's">' +
              '<div class="vc-icon">' + s.icon + '</div>' +
              '<div class="vc-label">' + s.label + '</div>' +
              (i < stages.length - 1 ? '<div class="vc-arrow">\u2192</div>' : '<div class="vc-arrow vc-loop">\u21BB</div>') +
            '</div>';
          }).join('')}
        </div>
        <div class="vc-examples">
          <div class="vc-example-btn active" data-vc-ex="race">\u79CD\u65CF (\u7F8E\u56FD)</div>
          <div class="vc-example-btn" data-vc-ex="caste">\u79CD\u59D3 (\u5370\u5EA6)</div>
          <div class="vc-example-btn" data-vc-ex="hukou">\u6237\u7C4D (\u4E2D\u56FD)</div>
        </div>
        <div class="vc-detail" id="vcDetail">
          <div class="vc-detail-text" data-vc-detail="race" style="display:block;">\u5076\u7136\uFF1A17\u4E16\u7EAA\u5974\u96B6\u8D38\u6613\u662F\u7ECF\u6D4E\u51B3\u7B56 \u2192 \u865A\u6784\uFF1A\u767D\u4EBA\u81F3\u4E0A\u8BBA \u2192 \u5236\u5EA6\uFF1A\u5409\u59C6\u00B7\u514B\u52B3\u6CD5 \u2192 \u5DEE\u8DDD\uFF1A\u8D22\u5BCC\u5DEE8\u500D \u2192 \u201C\u8BC1\u636E\u201D\uFF1A\u201C\u4ED6\u4EEC\u5C31\u662F\u4E0D\u884C\u201D</div>
          <div class="vc-detail-text" data-vc-detail="caste" style="display:none;">\u5076\u7136\uFF1A\u96C5\u5229\u5B89\u5165\u4FB5\u7684\u804C\u4E1A\u5206\u5DE5 \u2192 \u865A\u6784\uFF1A\u7EAF\u6D01/\u6C61\u67D3\u7684\u5B97\u6559\u53D9\u4E8B \u2192 \u5236\u5EA6\uFF1A3000\u5E74\u7684\u79CD\u59D3\u6CD5\u89C4 \u2192 \u5DEE\u8DDD\uFF1A\u6559\u80B2\u3001\u5C31\u4E1A\u3001\u5A5A\u59FB\u5168\u9762\u53D7\u9650 \u2192 \u201C\u8BC1\u636E\u201D\uFF1A\u201C\u524D\u4E16\u4E1A\u62A5\u201D</div>
          <div class="vc-detail-text" data-vc-detail="hukou" style="display:none;">\u5076\u7136\uFF1A1958\u5E74\u4EBA\u53E3\u6D41\u52A8\u7BA1\u63A7\u9700\u6C42 \u2192 \u865A\u6784\uFF1A\u57CE\u4E61\u4E8C\u5143\u4F53\u5236\u53D9\u4E8B \u2192 \u5236\u5EA6\uFF1A\u6559\u80B2\u3001\u533B\u7597\u3001\u4F4F\u623F\u7684\u5236\u5EA6\u6027\u5DEE\u5F02 \u2192 \u5DEE\u8DDD\uFF1A\u57CE\u4E61\u6536\u5165\u6BD42.5:1 \u2192 \u201C\u8BC1\u636E\u201D\uFF1A\u201C\u519C\u6751\u4EBA\u7D20\u8D28\u4F4E\u201D</div>
        </div>
      </div>`;
    }
  },

  // ── Trust Stack (Scene 9) ──
  'trust-stack': {
    render: function(scene, config) {
      var layers = [
        {label:'\u519B\u4E8B\u529B\u91CF', color:'var(--accent)', desc:'\u7F8E\u56FD\u519B\u4E8B\u529B\u91CF\u4FDD\u62A4\u7F8E\u5143\u4F53\u7CFB'},
        {label:'\u7ECF\u6D4E\u589E\u957F', color:'var(--accent-mid)', desc:'\u7F8E\u56FD\u7ECF\u6D4E\u6301\u7EED\u589E\u957F\u7684\u9884\u671F'},
        {label:'\u653F\u5E9C\u4FE1\u7528', color:'var(--accent)', desc:'\u7F8E\u56FD\u653F\u5E9C\u5C06\u5C65\u884C\u503A\u52A1\u627F\u8BFA'},
        {label:'\u592E\u884C\u653F\u7B56', color:'var(--accent-mid)', desc:'\u7F8E\u8054\u50A8\u5C06\u7EF4\u6301\u5E01\u503C\u7A33\u5B9A'},
        {label:'\u5927\u4F17\u4FE1\u4EFB', color:'var(--accent)', desc:'\u6240\u6709\u4EBA\u90FD\u76F8\u4FE1\u522B\u4EBA\u4E5F\u63A5\u53D7\u7F8E\u5143'}
      ];
      return `
      <div class="data-viz reveal">
        <div class="data-viz-title">${config.title || '\u4FE1\u4EFB\u7684\u5C42\u7EA7\uFF1A\u8D27\u5E01\u4EF7\u503C\u7684\u201C\u4FE1\u4EFB\u6808\u201D'}</div>
        <div class="trust-stack-viz" data-viz="trust-stack">
          ${layers.map(function(l, i) {
            return '<div class="ts-layer" data-ts-layer="' + i + '" style="animation-delay:' + ((layers.length - i) * 0.2) + 's">' +
              '<div class="ts-bar" style="background:' + l.color + ';opacity:' + (0.4 + i*0.15) + '"></div>' +
              '<div class="ts-label">' + l.label + '</div>' +
              '<div class="ts-desc">' + l.desc + '</div>' +
            '</div>';
          }).join('')}
        </div>
        <div class="ts-crisis-note" style="text-align:center; padding:1.5rem 0; font-family:var(--serif); font-size:0.8rem; opacity:0.5; line-height:2;">
          \u2191 \u4EFB\u4F55\u4E00\u5C42\u65AD\u88C2\uFF0C\u4E0A\u65B9\u5168\u90E8\u5D29\u5854 \u2191<br>
          2023\u5E74SVB\u6324\u5151 = \u201C\u5927\u4F17\u4FE1\u4EFB\u201D\u5C42\u88C2\u7F1D<br>
          2008\u5E74\u91D1\u878D\u5371\u673A = \u201C\u7ECF\u6D4E\u589E\u957F\u201D\u5C42\u5D29\u584C
        </div>
      </div>`;
    }
  },

  // ── Progress Paradox (Scene 17/18) ──
  'progress-paradox': {
    render: function(scene, config) {
      var revolutions = [
        {era:'\u8BA4\u77E5\u9769\u547D', year:'7\u4E07\u5E74\u524D', power:5, happiness:50, gain:'\u865A\u6784\u80FD\u529B\u2192\u7A81\u7834150\u4EBA\u5408\u4F5C\u4E0A\u9650', cost:'\u5176\u4ED6\u4EBA\u79CD\u706D\u7EDD\u3001\u751F\u6001\u5927\u5C60\u6740'},
        {era:'\u519C\u4E1A\u9769\u547D', year:'1\u4E07\u5E74\u524D', power:15, happiness:45, gain:'\u4EBA\u53E3\u26905000%\u3001\u7CB2\u98DF\u603B\u91CF\u66B4\u589E', cost:'\u4E2A\u4F53\u66F4\u82E6\u3001\u8EAB\u9AD8\u219312cm\u3001\u75BE\u75C5\u66B4\u589E'},
        {era:'\u878D\u5408\u7EDF\u4E00', year:'3000\u5E74\u524D', power:30, happiness:48, gain:'\u91D1\u94B1\u3001\u5E1D\u56FD\u3001\u5B97\u6559\u2192\u5168\u7403\u6587\u660E', cost:'\u5730\u65B9\u6587\u5316\u88AB\u541E\u566C\u3001\u5E1D\u56FD\u66B4\u529B\u3001\u5B97\u6559\u8FEB\u5BB3'},
        {era:'\u79D1\u5B66\u9769\u547D', year:'500\u5E74\u524D', power:60, happiness:50, gain:'\u529B\u91CF\u6307\u6570\u7EA7\u589E\u957F\uFF0C\u4EA7\u51FA\u00D7240', cost:'\u6838\u6B66\u5668\u3001\u6B96\u6C11\u5265\u524A\u3001\u751F\u6001\u7834\u574F'},
        {era:'\u5DE5\u4E1A\u9769\u547D', year:'200\u5E74\u524D', power:85, happiness:50, gain:'\u751F\u4EA7\u529B\u7206\u70B8\uFF0CGDP\u2191600%', cost:'\u5BB6\u5EAD\u74E6\u89E3\u3001\u6D88\u8D39\u4E3B\u4E49\u3001\u52A8\u7269\u5DE5\u4E1A\u5316\u5C60\u5BB0'},
        {era:'AI\u9769\u547D', year:'\u5F53\u4E0B', power:98, happiness:50, gain:'\u8BA4\u77E5\u80FD\u529B\u5916\u5316\u3001\u751F\u547D\u6CD5\u5219\u53EF\u6539', cost:'\u672A\u77E5\u2014\u2014\u4F46\u8D4C\u6CE8\u6BD4\u4EFB\u4F55\u65F6\u5019\u90FD\u9AD8'}
      ];
      return `
      <div class="data-viz reveal">
        <div class="data-viz-title">${config.title || '\u8FDB\u6B65\u7684\u6096\u8BBA\uFF1A\u529B\u91CF\u2191\u221E \u5E78\u798F\u21920'}</div>
        <div class="pp-chart" data-viz="progress-paradox">
          <div class="pp-axis-label pp-power-label">\u529B\u91CF\u6307\u6570</div>
          <div class="pp-axis-label pp-happy-label">\u5E78\u798F\u611F</div>
          ${revolutions.map(function(r, i) {
            return '<div class="pp-col" data-pp-col="' + i + '">' +
              '<div class="pp-bar-power" style="height:0%" data-target="' + r.power + '"></div>' +
              '<div class="pp-bar-happy" style="height:0%" data-target="' + r.happiness + '"></div>' +
              '<div class="pp-era">' + r.era + '</div>' +
              '<div class="pp-year">' + r.year + '</div>' +
              '<div class="pp-tooltip">' +
                '<div style="color:var(--accent);font-weight:700;margin-bottom:0.3rem;">\u2191 ' + r.gain + '</div>' +
                '<div style="color:#DC2626;font-weight:600;">\u2193 ' + r.cost + '</div>' +
              '</div>' +
            '</div>';
          }).join('')}
        </div>
      </div>`;
    }
  },

  // ── Wheat Spread Map (Scene 5) ──
  'wheat-map': {
    render: function(scene, config) {
      var dots = [
        {cx:310,cy:115,year:-10000},{cx:295,cy:108,year:-9000},{cx:280,cy:105,year:-8000},
        {cx:265,cy:102,year:-7500},{cx:250,cy:100,year:-7000},{cx:320,cy:120,year:-8500},
        {cx:340,cy:118,year:-7000},{cx:360,cy:110,year:-6500},{cx:380,cy:105,year:-6000},
        {cx:400,cy:100,year:-5500},{cx:420,cy:95,year:-5000},{cx:440,cy:100,year:-4500},
        {cx:460,cy:110,year:-4000},{cx:300,cy:130,year:-7000},{cx:280,cy:140,year:-6000},
        {cx:270,cy:160,year:-5000},{cx:260,cy:180,year:-3000},{cx:255,cy:120,year:-6500},
        {cx:240,cy:115,year:-6000},{cx:250,cy:95,year:-5500},{cx:260,cy:90,year:-5000},
        {cx:270,cy:88,year:-4500},{cx:280,cy:92,year:-4000},{cx:240,cy:100,year:-5000},
        {cx:480,cy:115,year:-3500},{cx:500,cy:125,year:-3000},{cx:490,cy:140,year:-2500},
        {cx:130,cy:115,year:-1500},{cx:140,cy:120,year:-1000},{cx:100,cy:140,year:-500},
        {cx:80,cy:160,year:500},{cx:60,cy:120,year:1000},{cx:50,cy:140,year:1200},
        {cx:40,cy:160,year:1500},{cx:450,cy:210,year:1800},{cx:470,cy:220,year:1850}
      ];
      return `
    <div class="wheat-map-section reveal" data-wheat-map>
      <div class="wheat-map-title">\u5C0F\u9EA6\u5F81\u670D\u4E16\u754C \u00B7 Wheat's Global Conquest</div>
      <div class="wheat-map-container">
        <svg viewBox="0 0 600 300" fill="none" id="wheatMapSvg">
          <!-- Simplified world map outline -->
          <path d="M80,120 Q100,100 130,105 Q160,90 180,95 Q200,85 210,90 L230,88 Q250,82 270,90 Q280,85 290,88 L310,92 Q330,95 340,90 Q360,85 380,92 Q400,88 420,95 L440,92 Q460,88 480,95" stroke="var(--border)" stroke-width="1" fill="none"/>
          <path d="M100,130 Q80,150 70,180 Q65,200 80,220 L95,230 Q110,235 120,225 L130,210 Q140,195 135,180 L130,160 Q125,145 120,135Z" stroke="var(--border)" stroke-width="1" fill="var(--accent-glow)"/>
          <!-- Europe -->
          <path d="M240,90 Q250,80 270,85 L280,90 Q290,95 300,92 L310,88 Q315,100 310,110 Q305,120 295,125 L280,128 Q265,130 255,125 Q245,118 240,110Z" stroke="var(--border)" stroke-width="1" fill="var(--accent-glow)"/>
          <!-- Africa -->
          <path d="M250,130 Q260,125 275,130 L290,135 Q300,140 305,155 Q310,175 305,200 Q300,220 285,235 Q270,245 260,240 Q250,230 248,210 Q245,190 248,170 Q250,150 250,140Z" stroke="var(--border)" stroke-width="1" fill="var(--accent-glow)"/>
          <!-- Asia -->
          <path d="M310,88 Q330,80 360,78 Q390,75 420,80 L460,85 Q490,90 510,100 Q520,110 515,125 Q510,140 495,150 Q480,155 460,150 Q440,145 420,140 Q400,138 380,135 Q360,130 340,128 Q320,125 310,115Z" stroke="var(--border)" stroke-width="1" fill="var(--accent-glow)"/>
          <!-- Americas -->
          <path d="M70,100 Q60,90 50,95 Q40,100 35,115 L30,140 Q25,170 35,190 Q45,200 40,215 Q35,230 45,245 Q55,255 50,265" stroke="var(--border)" stroke-width="1" fill="none"/>
          <path d="M120,110 Q130,100 140,105 L148,110 Q155,115 152,125 L148,135 Q145,140 140,138 L130,130 Q122,120 120,115Z" stroke="var(--border)" stroke-width="1" fill="var(--accent-glow)"/>
          <!-- Australia -->
          <path d="M440,200 Q460,190 480,195 Q500,200 510,215 Q515,230 505,240 Q490,248 470,245 Q455,240 445,225 Q440,215 440,205Z" stroke="var(--border)" stroke-width="1" fill="var(--accent-glow)"/>

          <!-- Fertile Crescent marker -->
          <circle cx="310" cy="115" r="6" fill="var(--accent)" opacity="0.8"/>
          <text x="318" y="112" font-family="var(--sans)" font-size="7" fill="var(--accent)" font-weight="600">\u80A5\u6C83\u65B0\u6708\u5E26</text>

          <!-- Wheat spread dots (animated via JS) -->
          <g id="wheatDots">
            ${dots.map(function(d) {
              return '<circle class="wheat-dot" cx="' + d.cx + '" cy="' + d.cy + '" r="4" data-year="' + d.year + '"/>';
            }).join('')}
          </g>
        </svg>
      </div>
      <input type="range" class="wheat-scrubber" id="wheatScrubber" min="-10000" max="2000" value="-10000" step="100">
      <div class="wheat-year-display" id="wheatYearDisplay">\u516C\u5143\u524D 10000 \u5E74</div>
      <div class="wheat-coverage" id="wheatCoverage">\u5C0F\u9EA6\u79CD\u690D\u9762\u79EF: <b>0</b> km\u00B2</div>
    </div>`;
    }
  }
};


// ═══════════════════════════════════════════════════════════════
// ANIMATION FUNCTIONS (used by observers)
// ═══════════════════════════════════════════════════════════════

var extBodyTotal = 0;

function animateExtRegion(region) {
  var delay = parseInt(region.dataset.delay) || 0;
  setTimeout(function() {
    var fill = region.querySelector('[data-ext-fill]');
    fill.style.width = fill.dataset.target + '%';
    var counter = region.querySelector('[data-ext-counter]');
    BookEngine.animateCounter(counter, 0, parseInt(counter.dataset.target), 1500, '');
    var speciesIcons = region.querySelectorAll('[data-ext-species]');
    speciesIcons.forEach(function(icon, i) {
      setTimeout(function() {
        icon.classList.add('extinct');
        extBodyTotal++;
        var bodyNum = document.getElementById('extBodyNum');
        if (bodyNum) bodyNum.textContent = extBodyTotal;
      }, 800 + (parseInt(icon.dataset.delay) || 0));
    });
  }, delay);
}

function animateDunbar(container) {
  var circles = container.querySelectorAll('.dunbar-circle');
  circles.forEach(function(c) {
    var delay = parseInt(c.dataset.delay) || 0;
    setTimeout(function() { c.classList.add('visible'); }, delay);
  });
}

function animateTimeline() {
  var fill = document.getElementById('timelineLineFill');
  if (fill) {
    setTimeout(function() { fill.style.width = '100%'; }, 300);
  }
  // Set initial styles
  document.querySelectorAll('.timeline-milestone').forEach(function(ms) {
    ms.style.opacity = '0';
    ms.style.transform = 'translateY(20px)';
    ms.style.transition = 'all 0.6s var(--ease-out)';
  });
  // Animate in
  document.querySelectorAll('.timeline-milestone').forEach(function(ms, i) {
    setTimeout(function() {
      ms.style.opacity = '1';
      ms.style.transform = 'translateY(0)';
    }, 300 + i * 150);
  });
  // Click to activate
  document.querySelectorAll('.timeline-milestone').forEach(function(ms) {
    ms.addEventListener('click', function() {
      document.querySelectorAll('.timeline-milestone').forEach(function(m) { m.classList.remove('active'); });
      ms.classList.toggle('active');
    });
  });
}

function animatePopCounter() {
  var popNum = document.getElementById('popNumber');
  var popGrid = document.getElementById('popGrid');
  var barUp = document.getElementById('popBarUp');
  var barDown = document.getElementById('popBarDown');
  var barUpVal = document.getElementById('popBarUpVal');
  var barDownVal = document.getElementById('popBarDownVal');
  if (!popNum) return;

  var dots = popGrid ? popGrid.querySelectorAll('.pop-dot') : [];
  var stages = [
    { pop: 5000000, label:'500\u4E07', dots: 10, barUp: 10, barDown: 90, quality:'\u6781\u9AD8' },
    { pop: 10000000, label:'1000\u4E07', dots: 30, barUp: 20, barDown: 75, quality:'\u9AD8' },
    { pop: 50000000, label:'5000\u4E07', dots: 60, barUp: 40, barDown: 55, quality:'\u4E2D\u7B49' },
    { pop: 100000000, label:'1\u4EBF', dots: 90, barUp: 55, barDown: 40, quality:'\u8F83\u4F4E' },
    { pop: 250000000, label:'2.5\u4EBF', dots: 140, barUp: 75, barDown: 25, quality:'\u4F4E' },
    { pop: 500000000, label:'5\u4EBF', dots: 180, barUp: 90, barDown: 15, quality:'\u6781\u4F4E' }
  ];

  var stageIdx = 0;
  function showStage() {
    if (stageIdx >= stages.length) return;
    var s = stages[stageIdx];
    popNum.textContent = s.label;
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('visible', i < s.dots);
    }
    if (barUp) barUp.style.height = s.barUp + '%';
    if (barDown) barDown.style.height = s.barDown + '%';
    if (barUpVal) barUpVal.textContent = s.label;
    if (barDownVal) barDownVal.textContent = s.quality;
    stageIdx++;
    if (stageIdx < stages.length) {
      setTimeout(showStage, 800);
    }
  }
  setTimeout(showStage, 500);
}

function initWheatScrubber() {
  var scrubber = document.getElementById('wheatScrubber');
  var yearDisplay = document.getElementById('wheatYearDisplay');
  var coverage = document.getElementById('wheatCoverage');
  if (!scrubber) return;

  function updateWheatMap(year) {
    // Update year display
    if (year < 0) {
      yearDisplay.textContent = '\u516C\u5143\u524D ' + Math.abs(year) + ' \u5E74';
    } else {
      yearDisplay.textContent = '\u516C\u5143 ' + year + ' \u5E74';
    }

    // Show/hide dots based on year
    var visibleCount = 0;
    document.querySelectorAll('.wheat-dot').forEach(function(dot) {
      var dotYear = parseInt(dot.dataset.year);
      if (dotYear <= year) {
        dot.classList.add('spread');
        dot.setAttribute('r', '5');
        visibleCount++;
      } else {
        dot.classList.remove('spread');
        dot.setAttribute('r', '4');
      }
    });

    // Calculate approximate coverage area
    var maxArea = 2250000; // 225万 km²
    var totalDots = document.querySelectorAll('.wheat-dot').length;
    var area = Math.round(maxArea * visibleCount / totalDots);
    if (coverage) {
      coverage.innerHTML = '\u5C0F\u9EA6\u79CD\u690D\u9762\u79EF: <b>' + area.toLocaleString() + '</b> km\u00B2';
    }
  }

  scrubber.addEventListener('input', function() {
    updateWheatMap(parseInt(scrubber.value));
  });
  updateWheatMap(-10000);
}


// ═══════════════════════════════════════════════════════════════
// REGISTER OBSERVERS & INITS
// ═══════════════════════════════════════════════════════════════

// Register book-specific IntersectionObservers
BookEngine.registerObserver(function setupExtinctionObserver() {
  var extObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('ext-visible');
        setTimeout(function() { animateExtRegion(e.target); }, 400);
        extObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-ext-region]').forEach(function(el) { extObs.observe(el); });
});

BookEngine.registerObserver(function setupDunbarObserver() {
  var dunbarObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { animateDunbar(e.target); dunbarObs.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.dunbar-viz').forEach(function(el) { dunbarObs.observe(el); });
});

BookEngine.registerObserver(function setupTimelineObserver() {
  var tlObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { animateTimeline(); tlObs.unobserve(e.target); }
    });
  }, { threshold: 0.2 });
  var tlEl = document.getElementById('timelineTrack');
  if (tlEl) tlObs.observe(tlEl);
});

BookEngine.registerObserver(function setupPopulationObserver() {
  var popObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { animatePopCounter(); popObs.unobserve(e.target); }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('[data-pop-counter]').forEach(function(el) { popObs.observe(el); });
});

// Register init for wheat scrubber and new components
BookEngine.registerInit(function initSapiensComponents() {
  initWheatScrubber();
  initViciousCycle();
  initProgressParadox();
});

function initViciousCycle() {
  var btns = document.querySelectorAll('.vc-example-btn');
  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      btns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var key = btn.dataset.vcEx;
      document.querySelectorAll('.vc-detail-text').forEach(function(d) {
        d.style.display = d.dataset.vcDetail === key ? 'block' : 'none';
      });
    });
  });
}

function initProgressParadox() {
  var ppObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.pp-bar-power').forEach(function(bar) {
          bar.style.height = bar.dataset.target + '%';
        });
        e.target.querySelectorAll('.pp-bar-happy').forEach(function(bar) {
          bar.style.height = bar.dataset.target + '%';
        });
        ppObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.pp-chart').forEach(function(el) { ppObs.observe(el); });
}
