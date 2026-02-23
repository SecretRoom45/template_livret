/* ============================================
   LIVRET D'ACCUEIL — app.js
   ============================================ */

// ── CHECKLIST ──────────────────────────────
function toggle(item, listId) {
  item.classList.toggle('done');
  const box = item.querySelector('.check-box');
  box.innerHTML = item.classList.contains('done')
    ? '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>'
    : '';
  updateProgress(listId);
}

function updateProgress(listId) {
  const list = document.getElementById(listId);
  if (!list) return;
  const items = list.querySelectorAll('.check-item');
  const done  = list.querySelectorAll('.check-item.done');
  const total = items.length;
  const count = done.length;
  const pct   = total ? Math.round((count / total) * 100) : 0;

  const counter = document.getElementById('cl-count');
  const bar     = document.getElementById('cl-bar');
  if (counter) counter.textContent = `${count} / ${total} étapes complétées`;
  if (bar)     bar.style.width = `${pct}%`;
}

// ── LIGHTBOX ───────────────────────────────
function lb(src, caption) {
  const lbEl = document.getElementById('lightbox');
  const img  = document.getElementById('lb-img');
  img.src = src;
  img.alt = caption || '';
  lbEl.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLb(e) {
  if (e && e.target !== document.getElementById('lightbox') &&
      !e.target.classList.contains('lightbox-close')) return;
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── CONTACT FORM (simulé) ──────────────────
function sendMsg() {
  const btn  = document.getElementById('send-btn');
  const name = document.getElementById('f-name');
  const msg  = document.getElementById('f-msg');

  if (!name.value.trim() || !msg.value.trim()) {
    name.style.borderColor = name.value.trim() ? '' : '#E53935';
    msg.style.borderColor  = msg.value.trim()  ? '' : '#E53935';
    return;
  }

  btn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    Message envoyé !`;
  btn.classList.add('success');
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
      Envoyer`;
    btn.classList.remove('success');
    btn.disabled = false;
    name.value = '';
    msg.value  = '';
  }, 3500);
}

// ── SIDEBAR ACTIVE STATE ───────────────────
const sections = document.querySelectorAll('.section[id]');
const navLinks  = document.querySelectorAll('.sidebar-nav li a');

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-80px 0px -55% 0px', threshold: 0 });

sections.forEach(s => io.observe(s));
