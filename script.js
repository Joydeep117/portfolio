(function () {
  'use strict';

  // ===== Year in footer =====
  document.getElementById('year').textContent = new Date().getFullYear();

  // ===== Navbar scroll =====
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function onScroll() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ===== Mobile menu toggle =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  function toggleMenu() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  }

  navToggle.addEventListener('click', toggleMenu);

  // Close menu when clicking a nav link
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navLinks.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // ===== Smooth scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Skill bars animation on scroll =====
  const skillFills = document.querySelectorAll('.skill-fill');

  function animateSkillBars() {
    skillFills.forEach(function (fill) {
      const level = fill.getAttribute('data-level');
      if (!level) return;
      const rect = fill.getBoundingClientRect();
      const inView = rect.top < window.innerHeight - 80;
      if (inView) {
        fill.style.setProperty('--level', level + '%');
        fill.classList.add('animated');
      }
    });
  }

  window.addEventListener('scroll', animateSkillBars);
  window.addEventListener('load', animateSkillBars);

  // ===== Optional: Fade-in sections on scroll =====
  const sections = document.querySelectorAll('.section');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
  });

  // Add CSS for in-view via style (or could add a class that's styled in CSS)
  const style = document.createElement('style');
  style.textContent = '.section.in-view { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
})();
