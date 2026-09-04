/**
 * main.js - Core UI interactions (theme toggle, mobile nav, active link)
 */

(function () {
  'use strict';

  // --- Theme Management ---
  const THEME_KEY = 'portfolio_theme';
  const htmlEl = document.documentElement;

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
    } else {
      htmlEl.removeAttribute('data-theme');
    }
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;
    if (theme === 'light') {
      themeBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeBtn.setAttribute('title', 'Switch to dark theme');
      themeBtn.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      themeBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeBtn.setAttribute('title', 'Switch to light theme');
      themeBtn.setAttribute('aria-label', 'Switch to light theme');
    }
  }

  // Initial theme application
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // --- Mobile Navigation ---
  function setupMobileNav() {
    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const navMenu = document.getElementById('nav-menu');
    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav on outside click
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  }

  // --- Active Nav Link Indicator ---
  function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link) => {
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html') || (linkPath.includes('posts.html') && currentPath === 'post.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle button click
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      updateThemeIcon(currentTheme);
      themeBtn.addEventListener('click', () => {
        const isCurrentlyLight = htmlEl.getAttribute('data-theme') === 'light';
        const newTheme = isCurrentlyLight ? 'dark' : 'light';
        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);
      });
    }

    setupMobileNav();
    setActiveNavLink();
    setupContactForm();
  });

  // --- Contact Form Handling ---
  function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('contact-submit-btn');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim() || '';
      const email = document.getElementById('contact-email')?.value.trim() || '';
      const message = document.getElementById('contact-message')?.value.trim() || '';

      if (!email || !message) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please fill out all required fields (*).';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      // Open email client with prefilled details
      const subject = encodeURIComponent(`Portfolio Contact from ${name || 'Visitor'}`);
      const body = encodeURIComponent(`Hi Ritwik,\n\n${message}\n\nFrom: ${name} (${email})`);
      const mailtoUrl = `mailto:gameof8ballpool01234@gmail.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;

        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `✓ Thank you, <strong>${name || 'friend'}</strong>! Your email draft has been opened. Looking forward to talking!`;
        }

        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submitted!';
          setTimeout(() => {
            submitBtn.textContent = 'Submit';
          }, 3000);
        }
      }, 400);
    });
  }
})();
