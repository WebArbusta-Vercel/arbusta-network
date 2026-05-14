// Scroll-triggered fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Match stat label width to stat number width
function matchStatWidths() {
  const num0 = document.getElementById('stat-num-0');
  const lbl0 = document.getElementById('stat-lbl-0');
  if (!num0 || !lbl0) return;

  // Binary search font-size for label 0 to match number 0 width
  const targetWidth = num0.getBoundingClientRect().width;
  let lo = 6, hi = 48, mid, iterations = 0;
  lbl0.style.fontSize = hi + 'px';
  while (hi - lo > 0.25 && iterations < 30) {
    mid = (lo + hi) / 2;
    lbl0.style.fontSize = mid + 'px';
    const w = lbl0.getBoundingClientRect().width;
    if (w < targetWidth) lo = mid;
    else hi = mid;
    iterations++;
  }
  const finalSize = lo + 'px';
  lbl0.style.fontSize = finalSize;

  // Labels 1 and 2 get the same font-size as label 0
  const lbl1 = document.getElementById('stat-lbl-1');
  const lbl2 = document.getElementById('stat-lbl-2');
  if (lbl1) lbl1.style.fontSize = finalSize;
  if (lbl2) lbl2.style.fontSize = finalSize;
}

// Run after fonts load and on resize
if (document.fonts) {
  document.fonts.ready.then(matchStatWidths);
} else {
  window.addEventListener('load', matchStatWidths);
}
window.addEventListener('resize', matchStatWidths);