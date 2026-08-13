/**
 * sticky-cta.js — Barra sticky CTA para móvil
 */

import { track, EVENTS } from './analytics.js';
import { throttle } from './utils.js';

export function initStickyCta(config) {
  const container = document.querySelector('[data-sticky-cta]');
  if (!container) return;
  
  const fallbackAnchor = config?.fallbackAnchors?.gold || '#precio-gold';
  
  // Crear botón sticky
  container.innerHTML = `
    <a href="${fallbackAnchor}" class="btn btn-primary btn-block magnetic-btn" data-checkout-plan="gold" data-checkout-section="global" data-price="297" data-currency="USD">
      QUIERO ENTRAR A CÍRCULO GOLD — $297 →
    </a>
  `;
  
  const stickyBtn = container.querySelector('a');
  if (stickyBtn) {
    stickyBtn.setAttribute('aria-label', 'Ir a la compra de Círculo Gold');
    
    stickyBtn.addEventListener('click', () => {
      track(EVENTS.STICKY_CTA_CLICK, {
        cta: 'sticky_buy_gold',
        plan: 'gold',
        section: 'global',
        price: 297,
        currency: 'USD'
      });
    });
  }
  
  // Observar secciones para mostrar/ocultar
  const hideSections = ['#precio-gold', '#circulo-acero', '#cierre'];
  const heroSection = document.querySelector('#inicio');
  
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -40% 0px',
    threshold: 0
  };
  
  let hasPassedHero = false;
  let isInSectionToHide = false;
  
  const updateVisibility = throttle(() => {
    if (hasPassedHero && !isInSectionToHide) {
      container.classList.add('is-visible');
      container.setAttribute('aria-hidden', 'false');
      track(EVENTS.STICKY_CTA_VIEW, {});
    } else {
      container.classList.remove('is-visible');
      container.setAttribute('aria-hidden', 'true');
    }
  }, 100);
  
  // Observer para hero
  if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          hasPassedHero = true;
        } else {
          hasPassedHero = false;
        }
        updateVisibility();
      });
    }, { threshold: 0 });
    
    heroObserver.observe(heroSection);
  }
  
  // Observers para secciones de ocultamiento
  hideSections.forEach(selector => {
    const section = document.querySelector(selector);
    if (section) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isInSectionToHide = entry.isIntersecting;
          updateVisibility();
        });
      }, observerOptions);
      
      sectionObserver.observe(section);
    }
  });
}
