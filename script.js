// --- Star Animation with Collision, Mobile Optimized, Cursor Repel ---
let STAR_COLORS = ['#001ade', '#de00ae'];
let STAR_COUNT = 10;
let STAR_MIN_RADIUS = 60;
let STAR_MAX_RADIUS = 110;
const STAR_POINTS = 13;
const STAR_SHARPNESS = 0.45;
const stars = [];
const canvas = document.getElementById('star-bg');
const ctx = canvas.getContext('2d');
let mouse = {x: -1000, y: -1000};
function isMobile() {
  return window.innerWidth < 600;
}
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (isMobile()) {
    STAR_MIN_RADIUS = 28;
    STAR_MAX_RADIUS = 48;
    STAR_COUNT = 7;
  } else {
    STAR_MIN_RADIUS = 60;
    STAR_MAX_RADIUS = 110;
    STAR_COUNT = 10;
  }
}
function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}
function createStar() {
  const r = randomBetween(STAR_MIN_RADIUS, STAR_MAX_RADIUS);
  const x = randomBetween(r, window.innerWidth - r);
  const y = randomBetween(r, window.innerHeight - r);
  const vx = randomBetween(-0.7, 0.7) || 0.4;
  const vy = randomBetween(-0.7, 0.7) || 0.4;
  const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
  return { x, y, vx, vy, r, color, angle: randomBetween(0, Math.PI*2), spin: randomBetween(-0.003, 0.003) };
}
function drawStar(s) {
  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.rotate(s.angle);
  ctx.beginPath();
  for (let i = 0; i < STAR_POINTS * 2; i++) {
    const isSpike = i % 2 === 0;
    const rad = isSpike ? s.r : s.r * STAR_SHARPNESS;
    const theta = (i / (STAR_POINTS * 2)) * Math.PI * 2;
    ctx.lineTo(Math.cos(theta) * rad, Math.sin(theta) * rad);
  }
  ctx.closePath();
  ctx.fillStyle = s.color;
  ctx.globalAlpha = 0.85;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();
}
function handleCollisions() {
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const a = stars[i], b = stars[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const minDist = a.r + b.r - 18;
      if (dist < minDist && dist > 0) {
        const angle = Math.atan2(dy, dx);
        const totalMass = a.r + b.r;
        const va = a.vx * Math.cos(angle) + a.vy * Math.sin(angle);
        const vb = b.vx * Math.cos(angle) + b.vy * Math.sin(angle);
        const vaNew = ((a.r - b.r) * va + 2 * b.r * vb) / totalMass;
        const vbNew = ((b.r - a.r) * vb + 2 * a.r * va) / totalMass;
        a.vx += (vaNew - va) * Math.cos(angle);
        a.vy += (vaNew - va) * Math.sin(angle);
        b.vx += (vbNew - vb) * Math.cos(angle);
        b.vy += (vbNew - vb) * Math.sin(angle);
        const overlap = minDist - dist;
        a.x -= Math.cos(angle) * (overlap/2);
        a.y -= Math.sin(angle) * (overlap/2);
        b.x += Math.cos(angle) * (overlap/2);
        b.y += Math.sin(angle) * (overlap/2);
      }
    }
  }
}
function repelFromCursor(s) {
  const dx = s.x - mouse.x;
  const dy = s.y - mouse.y;
  const dist = Math.sqrt(dx*dx + dy*dy);
  const minDist = s.r + 60;
  if (dist < minDist && dist > 0) {
    // Delikatne odpychanie
    const force = (minDist - dist) * 0.04;
    s.vx += (dx/dist) * force;
    s.vy += (dy/dist) * force;
    // Ogranicz prędkość
    s.vx = Math.max(Math.min(s.vx, 2), -2);
    s.vy = Math.max(Math.min(s.vy, 2), -2);
  }
}
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    s.x += s.vx;
    s.y += s.vy;
    s.angle += s.spin;
    // Bounce off edges
    if (s.x - s.r < 0) { s.x = s.r; s.vx = Math.abs(s.vx); }
    if (s.x + s.r > canvas.width) { s.x = canvas.width - s.r; s.vx = -Math.abs(s.vx); }
    if (s.y - s.r < 0) { s.y = s.r; s.vy = Math.abs(s.vy); }
    if (s.y + s.r > canvas.height) { s.y = canvas.height - s.r; s.vy = -Math.abs(s.vy); }
    repelFromCursor(s);
  }
  handleCollisions();
  for (const s of stars) drawStar(s);
  requestAnimationFrame(animateStars);
}
function initStars() {
  stars.length = 0;
  for (let i = 0; i < STAR_COUNT; i++) stars.push(createStar());
}
function reinitStars() {
  resizeCanvas();
  initStars();
}
window.addEventListener('resize', reinitStars);
reinitStars();
animateStars();
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
  mouse.x = -1000; mouse.y = -1000;
});
// --- Scroll Slider usunięty ---
// --- Wężowa animacja liter nagłówka ---
const headerText = 'dryf kulis';
const header = document.getElementById('header');
header.innerHTML = '';
for (let i = 0; i < headerText.length; i++) {
  const span = document.createElement('span');
  span.className = 'header-letter';
  span.textContent = headerText[i] === ' ' ? '\u00A0' : headerText[i];
  header.appendChild(span);
}
const headerLetters = document.querySelectorAll('.header-letter');
function animateHeaderLetters(t) {
  for (let i = 0; i < headerLetters.length; i++) {
    const phase = t/600 + i*0.32;
    const y = Math.sin(phase) * (isMobile() ? 5 : 10);
    const rot = Math.sin(phase) * (isMobile() ? 6 : 12);
    headerLetters[i].style.transform = `translateY(${y}px) rotate(${rot}deg)`;
  }
  requestAnimationFrame(animateHeaderLetters);
}
animateHeaderLetters(0);
// --- Social links: delikatny wobbly i powiększenie ---
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.fontWeight = 'bold';
    link.style.transition = 'color 0.2s, font-weight 0.2s, transform 0.18s cubic-bezier(.36,.07,.19,.97), background 0.2s, box-shadow 0.2s';
  });
  link.addEventListener('mouseleave', () => {
    link.style.fontWeight = '600';
  });
});
// --- Grain/Noise Texture ---
const grainCanvas = document.getElementById('grain');
function drawGrain() {
  const w = window.innerWidth, h = window.innerHeight;
  grainCanvas.width = w;
  grainCanvas.height = h;
  const gctx = grainCanvas.getContext('2d');
  const imageData = gctx.createImageData(w, h);
  for (let i = 0; i < w * h; i++) {
    const shade = Math.floor(Math.random() * 32);
    imageData.data[i*4+0] = shade;
    imageData.data[i*4+1] = shade;
    imageData.data[i*4+2] = shade;
    imageData.data[i*4+3] = 18; // alpha
  }
  gctx.putImageData(imageData, 0, 0);
}
drawGrain();
window.addEventListener('resize', drawGrain);
setInterval(drawGrain, 500);
