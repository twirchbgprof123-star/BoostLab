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
  'Silver Elite', 'Silver Elite Master', 'Gold Nova I'
];

const fortniteRanks = [
  'Bronze I', 'Bronze II', 'Bronze III',
  'Silver I', 'Silver II', 'Silver III',
  'Gold I', 'Gold II', 'Gold III',
  'Platinum I', 'Platinum II', 'Platinum III'
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
    currentLabel.textContent = 'Current Premier Rating';
    targetLabel.textContent = 'Target Premier Rating';
    currentInput.placeholder = 'e.g. 5,000 points';
    targetInput.placeholder = 'e.g. 10,000 points';
    currentInput.hidden = false;
    targetInput.hidden = false;
    currentInput.required = true;
    targetInput.required = true;
    return;
  }

  if (service === 'Fortnite Ranked Boost') {
    currentLabel.textContent = 'Current Fortnite Rank';
    targetLabel.textContent = 'Target Fortnite Rank';
    fillSelect(currentRankSelect, fortniteRanks, 'Select current Fortnite rank');
    fillSelect(targetRankSelect, fortniteRanks, 'Select target Fortnite rank');
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
    currentLabel.textContent = 'Current Wingman Rank';
    targetLabel.textContent = 'Target Wingman Rank';
    fillSelect(currentRankSelect, wingmanRanks, 'Select current Wingman rank');
    fillSelect(targetRankSelect, wingmanRanks, 'Select target Wingman rank');
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
