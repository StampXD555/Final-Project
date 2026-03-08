// ── Theme ──
function initTheme() {
  const saved = localStorage.getItem('sw-theme');
  const html = document.documentElement;
  if (saved === 'light') {
    html.classList.remove('dark');
  } else {
    html.classList.add('dark');
  }
  updateThemeIcon();
}

function toggleTheme() {
  const html = document.documentElement;
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('sw-theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('sw-theme', 'dark');
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.documentElement.classList.contains('dark');
  document.getElementById('theme-icon').textContent = isDark ? '☀️' : '🌙';
}

// ── Init ──
initTheme();
