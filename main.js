const sections = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

sections.forEach((section) => observer.observe(section));

const modal = document.querySelector('#reserva-modal');
const openButtons = document.querySelectorAll('[data-open-reserva-modal]');
const closeButtons = document.querySelectorAll('[data-close-reserva-modal]');
const tabs = document.querySelectorAll('.modal-tab');
const panels = document.querySelectorAll('.modal-content');

const openModal = () => {
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

openButtons.forEach((button) => {
  button.addEventListener('click', openModal);
});

closeButtons.forEach((button) => {
  button.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('is-open')) {
    closeModal();
  }
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.tabTarget;
    tabs.forEach((button) => {
      button.classList.remove('is-active');
      button.setAttribute('aria-selected', 'false');
    });
    panels.forEach((panel) => {
      const isTarget = panel.id === targetId;
      panel.classList.toggle('is-active', isTarget);
      panel.hidden = !isTarget;
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
  });
});

document.querySelector('.lead-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  if (!button) return;
  const originalText = button.textContent;
  button.textContent = 'Solicitud enviada';
  button.disabled = true;
  setTimeout(() => {
    event.currentTarget.reset();
    button.textContent = originalText;
    button.disabled = false;
    closeModal();
  }, 1500);
});
