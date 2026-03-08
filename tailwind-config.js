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

// ── Populate DOB dropdowns ──
function populateDOB() {
  const daySelect = document.getElementById('dob-day');
  for (let d = 1; d <= 31; d++) {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = String(d).padStart(2, '0');
    daySelect.appendChild(opt);
  }

  const yearSelect = document.getElementById('dob-year');
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 13; y >= 1900; y--) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  }
}

// ── Show/hide password ──
function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  icon.innerHTML = isHidden
    ? /* eye-off */`
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      `
    : /* eye-open */`
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      `;
}

// ── Password strength indicator ──
function checkPasswordStrength(pw) {
  const seg1 = document.getElementById('seg-1');
  const seg2 = document.getElementById('seg-2');
  const seg3 = document.getElementById('seg-3');
  const label = document.getElementById('strength-label');

  // Reset segments
  [seg1, seg2, seg3].forEach(s => { s.className = 'strength-seg'; });

  if (!pw) {
    label.textContent = 'Enter a password';
    label.className = 'text-xs dark:text-gray-500 text-gray-400';
    return;
  }

  // Score: length + complexity
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) {
    // Weak
    seg1.classList.add('weak');
    label.textContent = '🔴 Weak — add numbers, symbols, or uppercase letters';
    label.className = 'text-xs text-red-400';
  } else if (score <= 2) {
    // Fair
    seg1.classList.add('fair');
    seg2.classList.add('fair');
    label.textContent = '🟡 Fair — getting better!';
    label.className = 'text-xs text-yellow-400';
  } else {
    // Strong
    seg1.classList.add('strong');
    seg2.classList.add('strong');
    seg3.classList.add('strong');
    label.textContent = '🟢 Strong — great password!';
    label.className = 'text-xs text-brand';
  }
}

// ── Clear individual errors ──
function clearError(id) {
  document.getElementById(id).classList.add('hidden');
}

// ── Form validation ──
function handleSignup(e) {
  e.preventDefault();
  let valid = true;

  const email = document.getElementById('email').value.trim();
  const confirmEmail = document.getElementById('confirm-email').value.trim();
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value.trim();
  const dobDay = document.getElementById('dob-day').value;
  const dobMonth = document.getElementById('dob-month').value;
  const dobYear = document.getElementById('dob-year').value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const terms = document.getElementById('terms-check').checked;

  // Email
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRe.test(email)) {
    document.getElementById('email-error').classList.remove('hidden');
    valid = false;
  }

  // Confirm email
  if (email !== confirmEmail) {
    document.getElementById('confirm-email-error').classList.remove('hidden');
    valid = false;
  }

  // Password length
  if (password.length < 8) {
    document.getElementById('password-error').classList.remove('hidden');
    valid = false;
  }

  // Username
  if (!username) {
    document.getElementById('username-error').classList.remove('hidden');
    valid = false;
  }

  // Date of birth
  if (!dobDay || !dobMonth || !dobYear) {
    document.getElementById('dob-error').classList.remove('hidden');
    valid = false;
  }

  // Gender
  if (!gender) {
    document.getElementById('gender-error').classList.remove('hidden');
    valid = false;
  }

  // Terms
  if (!terms) {
    document.getElementById('terms-error').classList.remove('hidden');
    valid = false;
  }

  if (valid) {
    // Simulate successful signup → redirect to login
    window.location.href = 'login.html';
  }
}

// ── Init ──
initTheme();
populateDOB();
