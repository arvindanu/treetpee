/**
 * Tree T-Pee static site interactions. No third-party runtime dependencies.
 */
(() => {
  'use strict';

  const selectors = {
    header: '.site-header',
    menuToggle: '.menu-toggle',
    nav: '.primary-nav',
    navLinks: '.primary-nav a',
    sections: 'main section[id]',
    revealItems: '.reveal',
    faqItems: '.faq-list details',
  };

  const header = document.querySelector(selectors.header);
  const menuToggle = document.querySelector(selectors.menuToggle);
  const nav = document.querySelector(selectors.nav);
  const navLinks = [...document.querySelectorAll(selectors.navLinks)];
  const sections = [...document.querySelectorAll(selectors.sections)];

  // Mobile navigation is keyboard-friendly and closes after a destination is chosen.
  function closeMenu() {
    if (!nav || !menuToggle) return;
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !isOpen);
    });
    navLinks.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  // Coalesce scroll work to one animation frame instead of reading layout per event.
  let scrollFramePending = false;
  function updateScrollState() {
    scrollFramePending = false;
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);

    let currentSection = '';
    const scrollPosition = window.scrollY + 150;
    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) currentSection = section.id;
    });

    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${currentSection}`;
      link.classList.toggle('active', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  window.addEventListener('scroll', () => {
    if (scrollFramePending) return;
    scrollFramePending = true;
    window.requestAnimationFrame(updateScrollState);
  }, { passive: true });
  window.addEventListener('resize', closeMenu, { passive: true });
  updateScrollState();

  // Reveal once; avoid observing elements continuously after their first appearance.
  const revealItems = document.querySelectorAll(selectors.revealItems);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Keep FAQ scanning simple while preserving native details/summary keyboard behavior.
  const faqItems = [...document.querySelectorAll(selectors.faqItems)];
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
