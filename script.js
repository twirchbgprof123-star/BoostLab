
const modal = document.getElementById('orderModal');
const serviceSelect = document.getElementById('serviceSelect');
const currentLabel = document.getElementById('currentLabel');
const targetLabel = document.getElementById('targetLabel');
const currentInput = document.getElementById('currentInput');
const targetInput = document.getElementById('targetInput');
const nav = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');

function updateRankFields() {
    const service = serviceSelect.value;

    if (service === 'CS2 Premier Rating Boost') {
        currentLabel.textContent = 'Текущ Premier Rating';
        targetLabel.textContent = 'Желан Premier Rating';

        currentInput.placeholder = 'Напр. 5 000 точки';
        targetInput.placeholder = 'Напр. 10 000 точки';
    }
    else if (service === 'Fortnite Ranked Boost') {
        currentLabel.textContent = 'Текущ Fortnite ранг';
        targetLabel.textContent = 'Желан Fortnite ранг';

        currentInput.placeholder = 'Напр. Gold II';
        targetInput.placeholder = 'Напр. Unreal';
    }
    else {
        currentLabel.textContent = 'Текущ Wingman ранг';
        targetLabel.textContent = 'Желан Wingman ранг';

        currentInput.placeholder = 'Напр. Gold Nova 2';
        targetInput.placeholder = 'Напр. Master Guardian';
    }
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
