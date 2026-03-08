// ── Song data ──
const songs = [
  { title: 'ทั้งไป',               artist: 'Only Monday',     album: 'ทั้งไป',                 duration: '3:45', img: 'https://picsum.photos/200?random=1'  },
  { title: 'Rain Zone',            artist: 'Maiyarap, Z9',    album: 'Rain Zone',               duration: '4:12', img: 'https://picsum.photos/200?random=2'  },
  { title: 'Risk It All',          artist: 'Bruno Mars',      album: 'Bruno Mars',              duration: '3:58', img: 'https://picsum.photos/200?random=3'  },
  { title: 'เหนื่อยเกินไป',        artist: 'LITTLE JOHN',     album: 'เหนื่อยเกินไป',           duration: '4:02', img: 'https://picsum.photos/200?random=4'  },
  { title: 'ขอให้เราทั้งคู่โชคดี', artist: 'Tattoo Colour',  album: 'ขอให้เราทั้งคู่โชคดี',    duration: '5:10', img: 'https://picsum.photos/200?random=5'  },
  { title: 'GO',                   artist: 'BLACKPINK',       album: 'THE ALBUM',               duration: '3:12', img: 'https://picsum.photos/200?random=6'  },
  { title: 'Blinding Lights',      artist: 'The Weeknd',      album: 'After Hours',             duration: '3:20', img: 'https://picsum.photos/200?random=13' },
  { title: 'Shape of You',         artist: 'Ed Sheeran',      album: '÷ (Divide)',              duration: '3:54', img: 'https://picsum.photos/200?random=14' },
  { title: 'Levitating',           artist: 'Dua Lipa',        album: 'Future Nostalgia',        duration: '3:23', img: 'https://picsum.photos/200?random=15' },
  { title: 'Stay',                 artist: 'The Kid LAROI',   album: 'F*CK LOVE 3',             duration: '2:22', img: 'https://picsum.photos/200?random=16' },
];

let currentTrack = 0;
let isPlaying = false;
let isLiked = false;
let progressInterval = null;
let progressValue = 0;

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
  const icon = isDark ? '☀️' : '🌙';
  const el1 = document.getElementById('theme-icon');
  const el2 = document.getElementById('theme-icon-mobile');
  if (el1) el1.textContent = icon;
  if (el2) el2.textContent = icon;
}

// ── Mobile menu ──
function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

// ── Render song table ──
function renderSongTable(filter = '') {
  const tbody = document.getElementById('song-table-body');
  const lower = filter.toLowerCase();
  const filtered = songs.map((s, i) => ({ ...s, originalIndex: i }))
    .filter(s => s.title.toLowerCase().includes(lower) || s.artist.toLowerCase().includes(lower) || s.album.toLowerCase().includes(lower));

  if (filtered.length === 0) {
    tbody.innerHTML = `<div class="px-4 py-8 text-center dark:text-gray-500 text-gray-400">No songs found</div>`;
    return;
  }

  tbody.innerHTML = filtered.map((s, visIdx) => `
    <div id="row-${s.originalIndex}"
      class="song-row grid grid-cols-[40px_1fr_1fr_80px] md:grid-cols-[40px_1fr_1fr_1fr_80px] gap-3 px-4 py-2 items-center cursor-pointer
             hover:dark:bg-[#282828] hover:bg-gray-100 group ${currentTrack === s.originalIndex ? 'bg-brand/10 dark:bg-brand/10' : ''}"
      onclick="playTrack(${s.originalIndex})">
      <span class="text-center text-sm dark:text-gray-400 text-gray-500 group-hover:hidden ${currentTrack === s.originalIndex ? 'text-brand' : ''}">${visIdx + 1}</span>
      <span class="text-center hidden group-hover:flex justify-center">
        <svg class="w-4 h-4 text-brand" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </span>
      <div class="flex items-center gap-3 min-w-0">
        <img src="${s.img}" alt="${s.title}" class="w-9 h-9 rounded object-cover shrink-0"/>
        <div class="min-w-0">
          <p class="font-semibold text-sm truncate ${currentTrack === s.originalIndex ? 'text-brand' : ''}">${s.title}</p>
          <p class="text-xs dark:text-gray-400 text-gray-500 truncate">${s.artist}</p>
        </div>
      </div>
      <span class="hidden md:block text-sm dark:text-gray-400 text-gray-500 truncate">${s.album}</span>
      <span class="hidden md:block"></span>
      <span class="text-sm dark:text-gray-400 text-gray-500 text-right">${s.duration}</span>
    </div>
  `).join('');
}

// ── Play a track ──
function playTrack(index) {
  currentTrack = index;
  const s = songs[index];

  // Update player UI
  document.getElementById('player-thumb').src = s.img;
  document.getElementById('player-title').textContent = s.title;
  document.getElementById('player-artist').textContent = s.artist;
  document.getElementById('total-time').textContent = s.duration;

  // Reset progress
  progressValue = 0;
  document.getElementById('progress-bar').value = 0;
  document.getElementById('current-time').textContent = '0:00';

  isPlaying = true;
  updatePlayIcon();
  startProgress(s.duration);
  renderSongTable(document.getElementById('search-input').value);
}

// ── Toggle play/pause ──
function togglePlay() {
  isPlaying = !isPlaying;
  updatePlayIcon();
  if (isPlaying) {
    startProgress(songs[currentTrack].duration);
  } else {
    clearInterval(progressInterval);
  }
}

function updatePlayIcon() {
  const icon = document.getElementById('play-icon');
  icon.innerHTML = isPlaying
    ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'   // pause icon
    : '<path d="M8 5v14l11-7z"/>';                      // play icon
}

// ── Progress simulation ──
function startProgress(durationStr) {
  clearInterval(progressInterval);
  const [m, s] = durationStr.split(':').map(Number);
  const totalSec = m * 60 + s;
  const step = 100 / totalSec;

  progressInterval = setInterval(() => {
    if (!isPlaying) return;
    progressValue = Math.min(progressValue + step, 100);
    document.getElementById('progress-bar').value = progressValue;
    updateProgressBar(progressValue);

    const elapsed = Math.round((progressValue / 100) * totalSec);
    document.getElementById('current-time').textContent =
      `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`;

    if (progressValue >= 100) {
      clearInterval(progressInterval);
      nextTrack();
    }
  }, 1000);
}

function updateProgressBar(val) {
  const bar = document.getElementById('progress-bar');
  bar.style.background = `linear-gradient(to right, #1DB954 ${val}%, #535353 ${val}%)`;
}

function seekTrack(val) {
  progressValue = parseFloat(val);
  updateProgressBar(progressValue);
  const s = songs[currentTrack];
  const [m, sec] = s.duration.split(':').map(Number);
  const totalSec = m * 60 + sec;
  const elapsed = Math.round((progressValue / 100) * totalSec);
  document.getElementById('current-time').textContent =
    `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`;
}

// ── Prev / Next ──
function prevTrack() {
  currentTrack = (currentTrack - 1 + songs.length) % songs.length;
  playTrack(currentTrack);
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % songs.length;
  playTrack(currentTrack);
}

// ── Volume ──
function setVolume(val) { /* UI only — no real audio */ }

// ── Heart / Like ──
function toggleHeart() {
  isLiked = !isLiked;
  const icon = document.getElementById('heart-icon');
  if (isLiked) {
    icon.setAttribute('fill', '#1DB954');
    icon.setAttribute('stroke', '#1DB954');
  } else {
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', 'currentColor');
  }
}

// ── Filter trending cards & artist cards ──
function filterCards(filter) {
  const lower = filter.toLowerCase();

  // Filter trending song cards
  document.querySelectorAll('#trending-scroll .song-card').forEach(card => {
    const title = card.querySelector('p.font-bold')?.textContent.toLowerCase() || '';
    const artist = card.querySelector('p.text-xs')?.textContent.toLowerCase() || '';
    card.style.display = (title.includes(lower) || artist.includes(lower)) ? '' : 'none';
  });

  // Filter artist cards
  document.querySelectorAll('#artists-scroll .artist-card').forEach(card => {
    const name = card.querySelector('p.font-bold')?.textContent.toLowerCase() || '';
    card.style.display = name.includes(lower) ? '' : 'none';
  });
}

// ── Search filter ──
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderSongTable();

  document.getElementById('search-input').addEventListener('input', e => {
    renderSongTable(e.target.value);
    filterCards(e.target.value);
  });

  // Horizontal scroll with mousewheel for trending and artists
  ['trending-scroll', 'artists-scroll'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('wheel', e => {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }, { passive: false });
    }
  });
});
