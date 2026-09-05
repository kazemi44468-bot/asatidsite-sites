(() => {
  const root = document.querySelector('.intro');
  if (!root) return;

  const track = root.querySelector('.intro-track');
  const slides = [...root.querySelectorAll('.intro-slide')];
  const dots = [...root.querySelectorAll('.intro-dot')];
  const thumbs = [...root.querySelectorAll('.profile-thumb')];
  const portrait = root.querySelector('.intro-portrait-image');
  const mark = root.querySelector('.intro-slide-mark strong');
  const prev = root.querySelector('[data-intro-prev]');
  const next = root.querySelector('[data-intro-next]');

  const portraits = [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=88'
  ];

  let index = 0;
  let startX = 0;
  let deltaX = 0;
  let dragging = false;
  let timer;

  const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

  const render = () => {
    track.style.transform = `translate3d(${index * -100}%, 0, 0)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    if (mark) mark.textContent = fa(index + 1);
  };

  const setPortrait = (i) => {
    if (!portrait) return;

    portrait.style.backgroundImage = `url('${portraits[i]}')`;
    thumbs.forEach((thumb, n) => thumb.classList.toggle('active', n === i));
  };

  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => go(index + 1), 6200);
  };

  const go = (i) => {
    index = (i + slides.length) % slides.length;
    render();
    restart();
  };

  prev?.addEventListener('click', () => go(index - 1));
  next?.addEventListener('click', () => go(index + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => go(i));
  });

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => setPortrait(i));
  });

  track.addEventListener('pointerdown', (event) => {
    dragging = true;
    startX = event.clientX;
    deltaX = 0;
    track.setPointerCapture?.(event.pointerId);
  });

  track.addEventListener('pointermove', (event) => {
    if (dragging) deltaX = event.clientX - startX;
  });

  const end = () => {
    if (!dragging) return;

    dragging = false;

    if (Math.abs(deltaX) > 55) {
      go(index + (deltaX < 0 ? 1 : -1));
    }

    deltaX = 0;
  };

  track.addEventListener('pointerup', end);
  track.addEventListener('pointercancel', end);

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') go(index - 1);
    if (event.key === 'ArrowRight') go(index + 1);
  });

  setPortrait(0);
  render();
  restart();
})();
