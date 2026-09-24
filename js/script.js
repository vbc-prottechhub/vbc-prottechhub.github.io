/* ===========================================================
   VBC ProtTechHub — interactions
   - Mobile hamburger menu toggle
   - Smooth scroll on nav clicks (with sticky-header offset)
   - Sticky header shadow on scroll
   - Current year + contact form (sends email via FormSubmit)
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

  /* ---- Contact form (sends a real email via FormSubmit) ---- */
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

      var btn = form.querySelector('button[type="submit"]');
      var btnText = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending\u2026'; }
      note.textContent = 'Sending your message\u2026';
      note.className = 'form-note';

      function fieldVal(id) { var el = form.querySelector(id); return el ? el.value : ''; }

      var payload = {
        name: fieldVal('#cf-name'),
        email: fieldVal('#cf-email'),
        message: fieldVal('#cf-message'),
        _subject: 'New enquiry from the Proteomics Tech Hub website',
        _cc: 'karl.mechtler@imp.ac.at',
        _template: 'table',
        _captcha: 'false'
      };

      fetch('https://formsubmit.co/ajax/manuel.matzinger@imp.ac.at', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && (data.success === true || String(data.success) === 'true')) {
            note.textContent = 'Thank you! Your message has been sent.';
            note.className = 'form-note success';
            form.reset();
          } else {
            throw new Error('send failed');
          }
        })
        .catch(function () {
          note.textContent = 'Sorry, your message could not be sent. Please email us directly at karl.mechtler@imp.ac.at.';
          note.className = 'form-note error';
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.textContent = btnText; }
        });
    });
  }
})();
