'use strict';
(() => {
  const dialog = document.querySelector('#wf-image-dialog');
  const img = document.querySelector('#wf-image-dialog-img');
  const title = document.querySelector('#wf-image-dialog-title');
  const close = document.querySelector('#wf-image-dialog-close');
  if (!dialog || !img || !title || !close) return;
  const thumbs = Array.from(document.querySelectorAll('.wf-gallery-tile'));
  let opener = null;
  function show(tile) {
    const src = tile.getAttribute('data-gallery-image');
    if (!src || !/^assets\/(?:dashboard|sales|profit-loss)\.png$/.test(src)) return;
    opener = tile;
    img.src = src;
    img.alt = tile.getAttribute('data-gallery-title') || 'لقطة من برنامج WafaPro';
    title.textContent = img.alt;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    close.focus();
  }
  function hide() {
    if (dialog.open && typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }
  thumbs.forEach(tile => tile.addEventListener('click', () => show(tile)));
  close.addEventListener('click', hide);
  dialog.addEventListener('click', e => { if (e.target === dialog) hide(); });
  dialog.addEventListener('close', () => { if (opener) opener.focus(); opener = null; });
})();
