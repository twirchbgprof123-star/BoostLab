
const modal = document.getElementById('orderModal');
const serviceSelect = document.getElementById('serviceSelect');
const currentLabel = document.getElementById('currentLabel');
const targetLabel = document.getElementById('targetLabel');
const currentInput = document.getElementById('currentInput');
const targetInput = document.getElementById('targetInput');
const nav = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');

function updateRankFields() {
  const premier = serviceSelect.value === 'CS2 Premier Rating Boost';
  currentLabel.textContent = premier ? 'Текущ Premier Rating' : 'Текущ ранг';
  targetLabel.textContent = premier ? 'Желан Premier Rating' : 'Желан ранг';
  currentInput.placeholder = premier ? 'Напр. 5 000 точки' : 'Напр. Gold Nova 2';
  targetInput.placeholder = premier ? 'Напр. 10 000 точки' : 'Напр. Master Guardian';
}

function openOrder(service='') {
  modal.classList.add('open');
  document.body.style.overflow='hidden';
  if(service) serviceSelect.value=service;
  updateRankFields();
}
function closeOrder(){modal.classList.remove('open');document.body.style.overflow='';}

document.querySelectorAll('[data-open-order]').forEach(b=>b.addEventListener('click',()=>openOrder()));
document.querySelectorAll('[data-service]').forEach(b=>b.addEventListener('click',()=>openOrder(b.dataset.service)));
document.querySelectorAll('[data-close-order]').forEach(b=>b.addEventListener('click',closeOrder));
serviceSelect.addEventListener('change',updateRankFields);
menuToggle.addEventListener('click',()=>nav.classList.toggle('open'));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeOrder();});
