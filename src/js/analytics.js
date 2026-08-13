/**
 * analytics.js — Sistema de tracking con dataLayer
 */

export function initAnalytics(config) {
  const dataLayerName = config?.analytics?.dataLayerName || 'dataLayer';
  window[dataLayerName] = window[dataLayerName] || [];
}

export function track(event, props = {}) {
  const dataLayer = window.dataLayer || (window.dataLayer = []);
  
  const eventData = {
    event,
    ...props,
    timestamp: Date.now(),
    path: window.location.pathname,
    url: window.location.href
  };
  
  dataLayer.push(eventData);
  
  // Si existe gtag, enviar también a GA4
  if (typeof gtag === 'function') {
    gtag('event', event, props);
  }
  
  // Debug en desarrollo
  if (window.location.hostname === 'localhost') {
    console.log('[Analytics]', event, props);
  }
}

// Eventos predefinidos
export const EVENTS = {
  PAGE_READY: 'page_ready',
  BLOCK_VIEW: 'block_view',
  CTA_CLICK: 'cta_click',
  CHECKOUT_CLICK: 'checkout_click',
  CHECKOUT_URL_MISSING: 'checkout_url_missing',
  FAQ_TOGGLE: 'faq_toggle',
  FAQ_OBJECTION_TOGGLE: 'faq_objection_toggle',
  CHAT_VIEW: 'chat_view',
  STICKY_CTA_VIEW: 'sticky_cta_view',
  STICKY_CTA_CLICK: 'sticky_cta_click',
  TRANSFORMATION_VIEW: 'transformation_view',
  TESTIMONIALS_VIEW: 'testimonials_view'
};
