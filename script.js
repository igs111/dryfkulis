// script.js
function animateBox() {
  const box = document.getElementById('box');
  box.style.transform = `translateY(${Math.random() * 300}px) rotate(${Math.random() * 360}deg)`;
}
