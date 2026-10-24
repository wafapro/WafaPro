'use strict';
const menuButton=document.querySelector('.mobile-menu');
const mainNav=document.querySelector('.navigation');
if(menuButton&&mainNav){
  menuButton.addEventListener('click',()=>{const open=mainNav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة');});
  mainNav.addEventListener('click',e=>{if(e.target.closest('a')){mainNav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){mainNav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}});
}
const shots={dashboard:['assets/dashboard.png','الواجهة الرئيسية'],sales:['assets/sales.png','فاتورة المبيعات'],profit:['assets/profit-loss.png','تقرير الأرباح والخسائر']};
const dialog=document.querySelector('#preview-dialog');
if(dialog&&typeof dialog.showModal==='function'){
  document.querySelectorAll('[data-preview]').forEach(button=>{
    button.setAttribute('tabindex','0');button.setAttribute('role','button');button.setAttribute('aria-label','تكبير '+shots[button.dataset.preview][1]);
    const open=()=>{const shot=shots[button.dataset.preview];if(!shot)return;document.querySelector('#preview-image').src=shot[0];document.querySelector('#preview-image').alt=shot[1];document.querySelector('#preview-caption').textContent=shot[1];dialog.showModal();};
    button.addEventListener('click',open);
    button.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
  });
  document.querySelector('#close-preview').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
}
const copyButton=document.querySelector('#copy-request');
if(copyButton){copyButton.addEventListener('click',async()=>{
  const value=document.querySelector('#request-message')?.value||'';
  if(!value.trim())return;
  try{await navigator.clipboard.writeText(value);copyButton.textContent='تم نسخ نص الطلب';}catch{const area=document.querySelector('#request-message');area.focus();area.select();copyButton.textContent='حددنا النص؛ انسخه بواسطة Ctrl+C';}
});}
const intent=new URLSearchParams(location.search).get('intent');
if(intent==='request')document.querySelector('#request-message')?.focus();
