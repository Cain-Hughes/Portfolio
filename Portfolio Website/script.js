/* =============================================
   script.js — Portfolio interactions
   ============================================= */

(function () {
  'use strict';

  /* -----------------------------------------
     THEME TOGGLE
     ----------------------------------------- */

  const themeToggle = document.getElementById('themeToggle');

  themeToggle.addEventListener('click', function () {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });

  /* -----------------------------------------
     HAMBURGER MENU
     ----------------------------------------- */

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  hamburger.addEventListener('click', function () {
    if (hamburger.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* -----------------------------------------
     SCROLLSPY — active nav link on scroll
     ----------------------------------------- */

  const sections = document.querySelectorAll('main section[id]');
  const navItems = document.querySelectorAll('.nav-links a[data-section]');

  function updateScrollspy() {
    var scrollPos = window.scrollY + window.innerHeight / 3;
    var currentId = '';

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navItems.forEach(function (item) {
      if (item.getAttribute('data-section') === currentId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateScrollspy, { passive: true });
  updateScrollspy();

  /* -----------------------------------------
     FADE-IN ON SCROLL (IntersectionObserver)
     ----------------------------------------- */

  var fadeEls = document.querySelectorAll('.fade');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }
})();
