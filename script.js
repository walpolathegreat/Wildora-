const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const backTop = document.querySelector('[data-back-top]');
const videoModal = document.querySelector('[data-video-modal]');
const storyModal = document.querySelector('[data-story-modal]');

const closeModal = (modal) => {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  const media = modal.querySelector('video');
  if (media) media.pause();
};

const openModal = (modal) => {
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const close = modal.querySelector('.modal-close');
  close?.focus();
};

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  header.classList.toggle('is-open', open);
});

document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  header?.classList.remove('is-open');
}));

const updateHeader = () => {
  header?.classList.toggle('is-solid', window.scrollY > 48);
  backTop?.classList.toggle('is-visible', window.scrollY > 650);
};
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.querySelectorAll('[data-back-top]').forEach((button) => button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })));
document.querySelectorAll('[data-video-open]').forEach((button) => button.addEventListener('click', () => openModal(videoModal)));
document.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', () => closeModal(videoModal)));

document.querySelectorAll('[data-story]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  const title = link.dataset.story;
  const heading = storyModal?.querySelector('#story-modal-title');
  if (heading) heading.textContent = title;
  openModal(storyModal);
}));
document.querySelectorAll('[data-story-close]').forEach((button) => button.addEventListener('click', () => closeModal(storyModal)));

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeModal(videoModal);
  closeModal(storyModal);
  if (nav?.classList.contains('is-open')) {
    nav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    header?.classList.remove('is-open');
  }
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) observer.unobserve(entry.target);
  entry.target.classList.toggle('is-visible', entry.isIntersecting);
}), { threshold: 0.12 });
document.querySelectorAll('[data-reveal]').forEach((element) => {
  if (!element.closest('.hero')) { element.classList.add('data-reveal'); observer.observe(element); }
});

const form = document.querySelector('[data-newsletter]');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = form.querySelector('input');
  const message = form.querySelector('.form-message');
  if (!input.checkValidity()) {
    message.textContent = 'Please enter a valid email address.';
    message.className = 'form-message is-error';
    input.focus();
    return;
  }
  message.textContent = 'Thanks — your address is validated locally. Connect a newsletter provider to activate delivery.';
  message.className = 'form-message is-success';
  form.reset();
});

document.querySelector('[data-year]')?.append(String(new Date().getFullYear()));
