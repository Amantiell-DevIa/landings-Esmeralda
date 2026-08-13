/**
 * utils.js — Utilidades generales
 */

export function initFooterYear() {
  const yearElements = document.querySelectorAll('[data-year]');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
}

export function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
