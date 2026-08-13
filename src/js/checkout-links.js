/**
 * checkout-links.js — Gestión de enlaces de checkout con fallback y tracking
 */

import { track, EVENTS } from './analytics.js';

export function initCheckoutLinks(config) {
  const checkoutGold = config?.checkout?.gold || '';
  const checkoutAcero = config?.checkout?.acero || '';
  const fallbackGold = config?.fallbackAnchors?.gold || '#precio-gold';
  const fallbackAcero = config?.fallbackAnchors?.acero || '#circulo-acero';
  
  const checkoutButtons = document.querySelectorAll('[data-checkout-plan]');
  
  checkoutButtons.forEach(btn => {
    const plan = btn.dataset.checkoutPlan;
    const section = btn.dataset.checkoutSection || 'unknown';
    const price = btn.dataset.price || '0';
    const currency = btn.dataset.currency || 'USD';
    
    // Asignar href según plan
    if (plan === 'gold') {
      if (checkoutGold) {
        btn.href = checkoutGold;
      } else {
        btn.href = fallbackGold;
      }
    } else if (plan === 'acero') {
      if (checkoutAcero) {
        btn.href = checkoutAcero;
      } else {
        btn.href = fallbackAcero;
      }
    }
    
    // Intercept click para tracking
    btn.addEventListener('click', (e) => {
      const hasUrl = (plan === 'gold' && checkoutGold) || (plan === 'acero' && checkoutAcero);
      
      if (!hasUrl) {
        track(EVENTS.CHECKOUT_URL_MISSING, {
          cta: `buy_${plan}`,
          plan: plan,
          section: section,
          price: parseInt(price, 10),
          currency: currency
        });
        // Permitir navegación al fallback anchor
      }
      
      track(EVENTS.CHECKOUT_CLICK, {
        cta: `buy_${plan}`,
        plan: plan,
        section: section,
        price: parseInt(price, 10),
        currency: currency
      });
    });
  });
}
