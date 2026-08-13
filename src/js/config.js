/**
 * config.js — Carga y gestión de configuración
 */

let config = null;

export async function loadConfig() {
  if (config) return config;
  
  try {
    const response = await fetch('./src/data/config.json');
    config = await response.json();
    return config;
  } catch (error) {
    console.error('Error loading config:', error);
    // Fallback config
    config = {
      site: { name: 'Círculo Gold', yearSelector: '[data-year]' },
      checkout: { gold: '', acero: '' },
      features: {
        stickyCta: true,
        chatAnimation: true,
        revealAnimations: true,
        magneticButtons: true,
        exitIntent: false,
        themeToggle: false,
        premiumAnimations: false
      },
      analytics: { enabled: true, dataLayerName: 'dataLayer' },
      fallbackAnchors: { gold: '#precio-gold', acero: '#circulo-acero' }
    };
    return config;
  }
}

export function getConfig() {
  return config;
}
