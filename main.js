// ── TERMINAL ANIMATION ──
(function () {
  const body = document.getElementById('terminal-body');
  if (!body) return;

  const lines = [
    '<span class="term-cmd">$ node server.js</span>',
    '',
    '<span class="term-title">  ◆ Batbold Samdan  v1.0</span>',
    '',
    '<span class="term-label">[env]     </span>loading config          <span class="term-ok">done</span>',
    '<span class="term-label">[mongodb] </span>connecting to cluster   <span class="term-ok">✓</span>',
    '<span class="term-label">[auth]    </span>JWT + refresh tokens    <span class="term-ok">ready</span>',
    '<span class="term-label">[socket]  </span>/chat namespace         <span class="term-ok">up</span>',
    '<span class="term-label">[socket]  </span>/notifications          <span class="term-ok">up</span>',
    '<span class="term-label">[server]  </span>listening on :5000      <span class="term-ok">✓</span>',
  ];

  const delays = [1200, 1400, 1500, 1600, 1850, 2150, 2450, 2750, 3050, 3350];

  lines.forEach((html, i) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 'term-line';
      div.innerHTML = html;
      if (i === lines.length - 1) {
        div.innerHTML += '<span class="term-cursor"></span>';
      }
      body.appendChild(div);
    }, delays[i]);
  });
}());

const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // ── TWEAKS ──
  const panel = document.getElementById('tweaks-panel');

  window.addEventListener('message', (e) => {
    if (e.data?.type === '__activate_edit_mode') panel.classList.add('open');
    if (e.data?.type === '__deactivate_edit_mode') panel.classList.remove('open');
  });
  window.parent.postMessage({ type: '__edit_mode_available' }, '*');

  const tweaksTrigger = document.getElementById('tweaks-trigger');
  tweaksTrigger.addEventListener('click', () => {
    panel.classList.toggle('open');
    tweaksTrigger.classList.toggle('hidden', panel.classList.contains('open'));
  });

  document.getElementById('tweaks-close').addEventListener('click', () => {
    panel.classList.remove('open');
    tweaksTrigger.classList.remove('hidden');
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  });

  // Accent
  document.querySelectorAll('.tweak-swatch').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.tweak-swatch').forEach(s => s.classList.remove('active'));
      el.classList.add('active');
      const hue = el.dataset.accent;
      document.documentElement.style.setProperty('--accent', `oklch(78% 0.2 ${hue})`);
      document.documentElement.style.setProperty('--accent2', `oklch(78% 0.2 ${+hue + 75})`);
    });
  });

  // Theme
  document.querySelectorAll('[data-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-theme]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const t = btn.dataset.theme;
      if (t === 'light') {
        document.documentElement.style.setProperty('--bg', '#f5f5f7');
        document.documentElement.style.setProperty('--bg2', '#ffffff');
        document.documentElement.style.setProperty('--bg3', '#e8e8ec');
        document.documentElement.style.setProperty('--fg', '#111114');
        document.documentElement.style.setProperty('--fg2', '#44444a');
        document.documentElement.style.setProperty('--fg3', '#888898');
        document.documentElement.style.setProperty('--border', 'rgba(0,0,0,0.1)');
        document.documentElement.style.setProperty('--card-bg', 'rgba(0,0,0,0.03)');
      } else {
        document.documentElement.style.setProperty('--bg', '#0c0c0f');
        document.documentElement.style.setProperty('--bg2', '#121217');
        document.documentElement.style.setProperty('--bg3', '#1a1a22');
        document.documentElement.style.setProperty('--fg', '#eeeef0');
        document.documentElement.style.setProperty('--fg2', '#9898a8');
        document.documentElement.style.setProperty('--fg3', '#5a5a6e');
        document.documentElement.style.setProperty('--border', 'rgba(255,255,255,0.07)');
        document.documentElement.style.setProperty('--card-bg', 'rgba(255,255,255,0.03)');
      }
    });
  });

  // Font
  const fontMap = {
    grotesk: "'Space Grotesk', sans-serif",
    serif: "'Georgia', 'Times New Roman', serif",
    mono: "'DM Mono', monospace"
  };
  document.querySelectorAll('[data-font]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-font]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.documentElement.style.setProperty('--font-head', fontMap[btn.dataset.font]);
    });
  });

  // Density
  const densityMap = { compact: '4rem', normal: '6rem', airy: '9rem' };
  document.querySelectorAll('[data-density]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-density]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('section').forEach(s => {
        s.style.paddingTop = densityMap[btn.dataset.density];
        s.style.paddingBottom = densityMap[btn.dataset.density];
      });
    });
  });