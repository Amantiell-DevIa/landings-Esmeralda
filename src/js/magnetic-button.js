/**
 * magnetic-button.js — Efecto magnético suave en botones
 */

import { throttle } from './utils.js';

export function initMagneticButtons() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) return;
  
  // Solo desktop
  if (window.innerWidth < 768) return;
  
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
  });
}

function handleMouseMove(e) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;
  
  // Limitar desplazamiento máximo a 6-10px
  const maxMove = 8;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const maxDistance = Math.max(rect.width, rect.height) / 2;
  
  const moveX = (deltaX / maxDistance) * maxMove;
  const moveY = (deltaY / maxDistance) * maxMove;
  
  btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

function handleMouseLeave(e) {
  const btn = e.currentTarget;
  btn.style.transform = '';
}
