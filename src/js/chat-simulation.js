/**
 * chat-simulation.js — Simulación visual del chat de comunidad
 */

import { track, EVENTS } from './analytics.js';

export function initChatSimulation() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Si prefiere movimiento reducido, mostrar mensajes estáticos
    document.querySelectorAll('.chat-message').forEach(msg => {
      msg.classList.add('is-revealed');
    });
    return;
  }
  
  const chatMessages = document.querySelectorAll('.chat-message');
  
  if (chatMessages.length === 0) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Tracking de vista del chat
        track(EVENTS.CHAT_VIEW, { section: 'block-06' });
        
        // Revelar mensajes con stagger
        chatMessages.forEach((msg, index) => {
          const delay = parseInt(msg.dataset.revealDelay, 10) || (index * 300);
          setTimeout(() => {
            msg.classList.add('is-revealed');
          }, delay);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const chatInterface = document.querySelector('.chat-interface');
  if (chatInterface) {
    observer.observe(chatInterface);
  }
}
