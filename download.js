/* Smooth theme transitions */
*, *::before, *::after {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

/* Social button hover lift */
.social-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.3); }

/* Password strength bar segments */
.strength-seg {
  height: 4px;
  border-radius: 2px;
  flex: 1;
  background: #3e3e3e;
  transition: background 0.3s ease;
}
.strength-seg.weak   { background: #e53e3e; }
.strength-seg.fair   { background: #ecc94b; }
.strength-seg.strong { background: #1DB954; }

/* Custom radio style */
.gender-radio input[type="radio"] { accent-color: #1DB954; }

/* Custom select style */
.sw-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  -webkit-appearance: none;
  appearance: none;
}
