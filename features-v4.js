'use strict';
(() => {
  const features = Array.from(document.querySelectorAll('.wf-accordion[data-feature]'));
  if (!features.length) return;

  // Native <details> keeps every feature accessible to mouse, keyboard, and
  // assistive technology even when JavaScript is unavailable.
  document.querySelector('#wf-open-all')?.addEventListener('click', () => {
    features.forEach(feature => { feature.open = true; });
  });
  document.querySelector('#wf-close-all')?.addEventListener('click', () => {
    features.forEach(feature => { feature.open = false; });
  });

  // Opening a feature by a direct URL (#reports / #returns) also expands it.
  function revealHash() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = features.find(feature => feature.id === id);
    if (target) target.open = true;
  }
  revealHash();
  window.addEventListener('hashchange', revealHash);

  // A search applies only to the 16 named reports; the accounting explanations
  // in other sections are unaffected.
  const search = document.querySelector('#wf-report-search');
  if (!search) return;
  const cards = Array.from(document.querySelectorAll('[data-report]'));
  const groups = Array.from(document.querySelectorAll('[data-report-group]'));
  const counter = document.querySelector('#wf-report-count');
  const empty = document.querySelector('#wf-report-empty');
  const simplify = s => s.normalize('NFKC').replace(/[ًٌٍَُِّْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').toLocaleLowerCase('ar').trim();
  search.addEventListener('input', () => {
    const term = simplify(search.value);
    let hits = 0;
    cards.forEach(card => {
      const match = !term || simplify(card.textContent).includes(term);
      card.hidden = !match;
      if (match) hits++;
    });
    groups.forEach(group => {
      group.hidden = !group.querySelector('[data-report]:not([hidden])');
    });
    if (counter) counter.textContent = hits === 1 ? 'تقرير واحد' : `${hits} تقريراً`;
    if (empty) empty.hidden = hits !== 0;
  });
})();
