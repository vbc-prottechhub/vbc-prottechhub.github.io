/* ===========================================================
   VBC ProtTechHub — interactions
   - Mobile hamburger menu toggle
   - Smooth scroll on nav clicks (with sticky-header offset)
   - Sticky header shadow on scroll
   - Current year + demo contact form handling
   =========================================================== */
(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var nav = document.getElementById('main-nav');
  var toggle = document.getElementById('nav-toggle');

  /* ---- Mobile menu toggle ---- */
  function closeMenu() {
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ---- Smooth scroll for in-page nav links ---- */
  var links = document.querySelectorAll('a[href^="#"]');
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var headerH = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerH + 1;
      window.scrollTo({ top: top, behavior: 'smooth' });
      closeMenu();
      history.replaceState(null, '', targetId);
    });
  });

  /* ---- Sticky header shadow on scroll ---- */
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.pageYOffset > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Close menu when resizing up to desktop ---- */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 720) closeMenu();
  });

  /* ---- Close menu on outside click ---- */
  document.addEventListener('click', function (e) {
    if (!nav || !nav.classList.contains('open')) return;
    if (nav.contains(e.target) || (toggle && toggle.contains(e.target))) return;
    closeMenu();
  });

  /* ---- Current year in footer ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Demo contact form (front-end only, no backend) ---- */
  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!note) return;

      if (!form.checkValidity()) {
        note.textContent = 'Please fill in all fields with valid information.';
        note.className = 'form-note error';
        return;
      }
      note.textContent = 'Thanks! This is a demo form — no message was actually sent.';
      note.className = 'form-note success';
      form.reset();
    });
  }
})();