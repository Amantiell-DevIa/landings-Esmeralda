/**
 * main.js — Punto de entrada principal
 */

import { loadConfig } from './config.js';
import { initAnalytics, track, EVENTS } from './analytics.js';
import { initReveal } from './reveal.js';
import { initAccordions } from './accordion.js';
import { initChatSimulation } from './chat-simulation.js';
import { initStickyCta } from './sticky-cta.js';
import { initCheckoutLinks } from './checkout-links.js';
import { initMagneticButtons } from './magnetic-button.js';
import { initFooterYear } from './utils.js';

async function init() {
  // Cargar configuración
  const config = await loadConfig();
  
  // Inicializar analytics
  initAnalytics(config);
  
  // Año dinámico en footer
  initFooterYear();
  
  // Tracking de página lista
  track(EVENTS.PAGE_READY);
  
  // Inicializar módulos según features
  if (config.features.revealAnimations) {
    initReveal();
  }
  
  if (config.features.stickyCta) {
    initStickyCta(config);
  }
  
  if (config.features.chatAnimation) {
    initChatSimulation();
  }
  
  if (config.features.magneticButtons) {
    initMagneticButtons();
  }
  
  // Siempre inicializar
  initAccordions();
  initCheckoutLinks(config);
}

// Ejecutar cuando DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
