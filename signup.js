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

// ── Show/hide password ──
function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';

  // Toggle eye icon: open vs crossed
  icon.innerHTML = isHidden
    ? /* eye-off */ `
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      `
    : /* eye-open */ `
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      `;
}

// ── Form validation ──
function handleLogin(e) {
  e.preventDefault();
  let valid = true;

  const email = document.getElementById('email-input').value.trim();
  const password = document.getElementById('password-input').value;
  const emailErr = document.getElementById('email-error');
  const passErr = document.getElementById('password-error');

  emailErr.classList.add('hidden');
  passErr.classList.add('hidden');

  if (!email) {
    emailErr.classList.remove('hidden');
    valid = false;
  }
  if (!password) {
    passErr.classList.remove('hidden');
    valid = false;
  }

  if (valid) {
    // Simulate login — redirect to index
    window.location.href = 'index.html';
  }
}

// ── Init ──
initTheme();
