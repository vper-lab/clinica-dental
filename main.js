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

document.querySelector('.form-card')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  if (!button) return;
  const text = button.textContent;
  button.textContent = 'Recibido';
  button.disabled = true;
  setTimeout(() => {
    button.textContent = text;
    button.disabled = false;
    event.currentTarget.reset();
  }, 1800);
});
