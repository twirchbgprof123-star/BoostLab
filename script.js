const modal = document.getElementById('orderModal');
const serviceSelect = document.getElementById('serviceSelect');
const currentLabel = document.getElementById('currentLabel');
const targetLabel = document.getElementById('targetLabel');
const currentInput = document.getElementById('currentInput');
const targetInput = document.getElementById('targetInput');
const currentRankSelect = document.getElementById('currentRankSelect');
const targetRankSelect = document.getElementById('targetRankSelect');
const fortniteModeField = document.getElementById('fortniteModeField');
const nav = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');

const wingmanRanks = [
  'Silver I', 'Silver II', 'Silver III', 'Silver IV',
  'Silver Elite', 'Silver Elite Master', 'Gold Nova I',
  'Gold Nova II', 'Gold Nova III', 'Gold Nova Master',
  'Master Guardian I', 'Master Guardian II', 'Master Guardian Elite',
  'Distinguished Master Guardian', 'Legendary Eagle',
  'Legendary Eagle Master', 'Supreme Master First Class', 'Global Elite'
];

const fortniteRanks = [
  'Bronze I', 'Bronze II', 'Bronze III',
  'Silver I', 'Silver II', 'Silver III',
  'Gold I', 'Gold II', 'Gold III',
  'Platinum I', 'Platinum II', 'Platinum III',
  'Diamond I', 'Diamond II', 'Diamond III',
  'Elite', 'Champion', 'Unreal'
];

function fillSelect(select, ranks, firstText) {
  select.innerHTML = `<option value="">${firstText}</option>`;
  ranks.forEach(rank => {
    const option = document.createElement('option');
    option.value = rank;
    option.textContent = rank;
    select.appendChild(option);
  });
}

function resetDynamicFields() {
  currentInput.hidden = true;
  targetInput.hidden = true;
  currentRankSelect.hidden = true;
  targetRankSelect.hidden = true;
  fortniteModeField.hidden = true;

  currentInput.required = false;
  targetInput.required = false;
  currentRankSelect.required = false;
  targetRankSelect.required = false;

  fortniteModeField.querySelectorAll('input[type="radio"]').forEach(input => {
    input.required = false;
  });
}

function updateRankFields() {
  const service = serviceSelect.value;
  resetDynamicFields();

  if (service === 'CS2 Premier Rating Boost') {
    currentLabel.textContent = 'Текущ Premier Rating';
    targetLabel.textContent = 'Желан Premier Rating';
    currentInput.placeholder = 'Напр. 5 000 точки';
    targetInput.placeholder = 'Напр. 10 000 точки';
    currentInput.hidden = false;
    targetInput.hidden = false;
    currentInput.required = true;
    targetInput.required = true;
    return;
  }

  if (service === 'Fortnite Ranked Boost') {
    currentLabel.textContent = 'Текущ Fortnite ранг';
    targetLabel.textContent = 'Желан Fortnite ранг';
    fillSelect(currentRankSelect, fortniteRanks, 'Избери текущ Fortnite ранг');
    fillSelect(targetRankSelect, fortniteRanks, 'Избери желан Fortnite ранг');
    currentRankSelect.hidden = false;
    targetRankSelect.hidden = false;
    currentRankSelect.required = true;
    targetRankSelect.required = true;
    fortniteModeField.hidden = false;
    const firstMode = fortniteModeField.querySelector('input[type="radio"]');
    if (firstMode) firstMode.required = true;
    return;
  }

  if (service === 'CS2 Wingman Boost') {
    currentLabel.textContent = 'Текущ Wingman ранг';
    targetLabel.textContent = 'Желан Wingman ранг';
    fillSelect(currentRankSelect, wingmanRanks, 'Избери текущ Wingman ранг');
    fillSelect(targetRankSelect, wingmanRanks, 'Избери желан Wingman ранг');
    currentRankSelect.hidden = false;
    targetRankSelect.hidden = false;
    currentRankSelect.required = true;
    targetRankSelect.required = true;
  }
}

function openOrder(service = '') {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  if (service) serviceSelect.value = service;
  updateRankFields();
  setTimeout(() => document.querySelector('#orderModal input[name="name"]')?.focus(), 70);
}

function closeOrder() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-open-order]').forEach(button => {
  button.addEventListener('click', () => openOrder());
});

document.querySelectorAll('[data-service]').forEach(button => {
  button.addEventListener('click', () => openOrder(button.dataset.service));
});

document.querySelectorAll('[data-close-order]').forEach(element => {
  element.addEventListener('click', closeOrder);
});

serviceSelect.addEventListener('change', updateRankFields);
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(nav.classList.contains('open')));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeOrder();
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
updateRankFields();
