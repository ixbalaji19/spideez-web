/* =========================================================
   SPIDEEZ — script.js
   Modular vanilla JS. Each feature lives in its own init function.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initActiveNavIndicator();
  initBackToTop();
});

/**
 * Adds a "scrolled" class to the navbar once the page scrolls past a
 * threshold, used to trigger the blurred background style.
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 40;

  const handleScroll = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Controls the mobile hamburger menu: toggling the open state,
 * updating ARIA attributes, and closing on link click or outside click.
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  const closeMenu = () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  };

  hamburger.addEventListener('click', toggleMenu);

  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/**
 * Smoothly scrolls to in-page anchor targets, accounting for the
 * fixed navbar height.
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  const navbar = document.getElementById('navbar');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/**
 * Uses IntersectionObserver to reveal elements with the `.reveal`
 * or `.process-step` class as they enter the viewport.
 */
function initScrollAnimations() {
  const targets = document.querySelectorAll('.reveal, .process-step');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/**
 * Highlights the nav link matching the section currently in view.
 */
function initActiveNavIndicator() {
  const sections = document.querySelectorAll('main section[id], main[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const linkById = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute('href')?.replace('#', '');
    if (id) linkById.set(id, link);
  });

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkById.get(entry.target.id);
        if (!link) return;

        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active-link'));
          link.classList.add('active-link');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Shows a back-to-top button after scrolling down, and scrolls
 * smoothly to the top when clicked.
 */
function initBackToTop() {
  const button = document.getElementById('backToTop');
  if (!button) return;

  const SCROLL_THRESHOLD = 480;

  const handleScroll = () => {
    button.classList.toggle('visible', window.scrollY > SCROLL_THRESHOLD);
  };

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}
