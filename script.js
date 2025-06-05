const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = Array.from({ length: 10 }).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  dx: (Math.random() - 0.5) * 1.5,
  dy: (Math.random() - 0.5) * 1.5,
  r: Math.floor(Math.random() * 30) + 60,
  color: Math.random() > 0.5 ? '#001ade' : '#de00ae'
}));

function drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function checkCollision(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (a.r / 4 + b.r / 4);
}

function resolveCollision(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return;

  const nx = dx / dist;
  const ny = dy / dist;
  const p = 2 * (a.dx * nx + a.dy * ny - b.dx * nx - b.dy * ny) / 2;
  a.dx -= p * nx;
  a.dy -= p * ny;
  b.dx += p * nx;
  b.dy += p * ny;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < stars.length; i++) {
    let a = stars[i];
    a.x += a.dx;
    a.y += a.dy;

    if (a.x < 0 || a.x > canvas.width) a.dx *= -1;
    if (a.y < 0 || a.y > canvas.height) a.dy *= -1;

    for (let j = i + 1; j < stars.length; j++) {
      let b = stars[j];
      if (checkCollision(a, b)) resolveCollision(a, b);
    }

    drawStar(a.x, a.y, 8, a.r, a.r / 2, a.color);
  }
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let scrollDot = document.createElement('div');
scrollDot.style.position = 'fixed';
scrollDot.style.left = '8px';
scrollDot.style.width = '10px';
scrollDot.style.height = '30px';
scrollDot.style.borderRadius = '999px';
scrollDot.style.background = 'white';
scrollDot.style.zIndex = '9999';
document.body.appendChild(scrollDot);

window.addEventListener('scroll', () => {
  const y = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const newY = y * (window.innerHeight - 30);
  scrollDot.style.top = `${newY}px`;
});
