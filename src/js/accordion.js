/**
 * accordion.js — Acordeones accesibles para FAQ y objeciones
 */

import { track, EVENTS } from './analytics.js';

export function initAccordions() {
  // Inicializar acordeones de FAQ
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', handleFaqClick);
    toggle.addEventListener('keydown', handleFaqKeydown);
  });
  
  // Inicializar acordeones de objeciones (block 02)
  const objectionToggles = document.querySelectorAll('.objection-toggle');
  objectionToggles.forEach(toggle => {
    toggle.addEventListener('click', handleObjectionClick);
    toggle.addEventListener('keydown', handleObjectionKeydown);
  });
}

function handleFaqClick(e) {
  const toggle = e.currentTarget;
  const panelId = toggle.getAttribute('aria-controls');
  const panel = document.getElementById(panelId);
  const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
  
  // Cerrar todos los demás
  const allToggles = document.querySelectorAll('.faq-toggle');
  allToggles.forEach(t => {
    if (t !== toggle) {
      t.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Toggle actual
  toggle.setAttribute('aria-expanded', !isExpanded);
  
  // Tracking
  const faqItem = toggle.closest('.faq-item');
  const questionId = faqItem ? faqItem.querySelector('.faq-question-text')?.textContent?.trim() : '';
  
  track(EVENTS.FAQ_TOGGLE, {
    section: 'block-13',
    question_id: panelId,
    state: !isExpanded ? 'open' : 'closed',
    question_text: questionId
  });
}

function handleFaqKeydown(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleFaqClick(e);
  }
}

function handleObjectionClick(e) {
  const toggle = e.currentTarget;
  const panelId = toggle.getAttribute('aria-controls');
  const panel = document.getElementById(panelId);
  const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
  
  toggle.setAttribute('aria-expanded', !isExpanded);
  
  // Tracking
  const objectionId = toggle.closest('.objection-card')?.dataset?.objection || '';
  
  track(EVENTS.FAQ_OBJECTION_TOGGLE, {
    section: 'block-02',
    objection_id: objectionId,
    state: !isExpanded ? 'open' : 'closed'
  });
}

function handleObjectionKeydown(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleObjectionClick(e);
  }
}
