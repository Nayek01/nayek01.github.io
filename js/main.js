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
    setupStatusToggle();
    setupProductSpotRandomizer();
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

  // --- Availability Status Indicator on First 'i' of Name ---
  function setupStatusToggle() {
    const wrap = document.getElementById('status-i-toggle');
    const tittle = document.getElementById('status-tittle');
    const tooltip = document.getElementById('status-tooltip');
    const tooltipTitle = document.getElementById('status-tooltip-title');
    const tooltipSub = document.getElementById('status-tooltip-sub');
    const tooltipBadge = document.getElementById('status-tooltip-badge');

    if (!wrap || !tittle) return;

    const STATUS_KEY = 'portfolio_availability_status';
    const AVAILABILITY_STATUSES = [
      {
        name: 'Available for opportunities',
        desc: 'Open to full-time roles, contracts & high-impact projects',
        color: '#22c55e'
      },
      {
        name: 'Selectively open / Limited bandwidth',
        desc: 'Open to select consulting & advisory discussions',
        color: '#f59e0b'
      },
      {
        name: 'Closed to new commitments',
        desc: 'Fully engaged in existing projects; not accepting new offers',
        color: '#ef4444'
      },
      {
        name: 'In deep work mode / Focused on building',
        desc: 'Heads-down shipping architecture; delayed replies',
        color: '#94a3b8'
      }
    ];

    let currentIndex = parseInt(localStorage.getItem(STATUS_KEY), 10);
    if (isNaN(currentIndex) || currentIndex < 0 || currentIndex >= AVAILABILITY_STATUSES.length) {
      currentIndex = 0; // Default: Available (Green)
    }

    let hideTimeout = null;

    function applyStatus(index, isUserAction = false) {
      const status = AVAILABILITY_STATUSES[index];
      wrap.setAttribute('data-status', index);
      wrap.setAttribute('title', `Status: ${status.name} (Click to change)`);
      wrap.setAttribute('aria-label', `Status: ${status.name}. Click to change.`);

      if (tooltipTitle) tooltipTitle.textContent = status.name;
      if (tooltipSub) tooltipSub.textContent = status.desc;
      if (tooltipBadge) tooltipBadge.style.backgroundColor = status.color;

      localStorage.setItem(STATUS_KEY, index);

      if (isUserAction) {
        // Pop feedback animation
        tittle.classList.add('pop');
        setTimeout(() => tittle.classList.remove('pop'), 220);

        // Flash tooltip for touch / click feedback
        if (tooltip) {
          tooltip.classList.add('show');
          if (hideTimeout) clearTimeout(hideTimeout);
          hideTimeout = setTimeout(() => {
            tooltip.classList.remove('show');
          }, 2400);
        }
      }
    }

    applyStatus(currentIndex, false);

    wrap.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % AVAILABILITY_STATUSES.length;
      applyStatus(currentIndex, true);
    });

    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % AVAILABILITY_STATUSES.length;
        applyStatus(currentIndex, true);
      }
    });
  }

  // --- Product Spot (P-Spot) Dynamic Title Randomizer ---
  function setupProductSpotRandomizer() {
    const titleEl = document.getElementById('random-product-title');
    const subEl = document.getElementById('random-product-sub');
    const rerollBtn = document.getElementById('reroll-btn');
    const counterBadge = document.getElementById('random-product-badge');
    if (!titleEl || !subEl) return;

    const PRODUCT_VARIATIONS = [
      {
        title: "Works on My Machine",
        subtitle: "…and hopefully on yours too. Free tools, utilities, and experiments."
      },
      {
        title: "Shipped",
        subtitle: "Things pushed to production that haven't crashed yet."
      },
      {
        title: "Things I Broke",
        subtitle: "Turned accidental bugs and edge cases into actual usable utilities."
      },
      {
        title: "Midnight Oil",
        subtitle: "Caffeine-fueled tools and apps built between 1 AM and sunrise."
      },
      {
        title: "Side Quests",
        subtitle: "Main story is engineering; these are the fun distractions built along the way."
      },
      {
        title: "Free Stuff",
        subtitle: "Take them for a spin before I figure out how to add a billing page."
      },
      {
        title: "Brain Dumps",
        subtitle: "What happens when an engineer has a free weekend and zero supervision."
      },
      {
        title: "Useful (Maybe)",
        subtitle: "Built because I was too lazy to do things manually twice."
      },
      {
        title: "The Secret Lab",
        subtitle: "Prototypes, public utilities, and mad-science experiments powered by dangerous amounts of caffeine."
      },
      {
        title: "In The Wild",
        subtitle: "Code that escaped my localhost and now lives on the web."
      }
    ];

    let currentIndex = -1;

    function getRandomIndex() {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * PRODUCT_VARIATIONS.length);
      } while (nextIndex === currentIndex && PRODUCT_VARIATIONS.length > 1);
      return nextIndex;
    }

    function applyVariation(index, animate = false) {
      currentIndex = index;
      const variation = PRODUCT_VARIATIONS[index];

      if (animate) {
        titleEl.classList.add('fade-swap');
        subEl.classList.add('fade-swap');
        setTimeout(() => {
          titleEl.textContent = variation.title;
          subEl.textContent = variation.subtitle;
          if (counterBadge) {
            counterBadge.textContent = `${index + 1}/${PRODUCT_VARIATIONS.length}`;
          }
          titleEl.classList.remove('fade-swap');
          subEl.classList.remove('fade-swap');
        }, 150);
      } else {
        titleEl.textContent = variation.title;
        subEl.textContent = variation.subtitle;
        if (counterBadge) {
          counterBadge.textContent = `${index + 1}/${PRODUCT_VARIATIONS.length}`;
        }
      }
    }

    // Initial random choice on page load
    applyVariation(getRandomIndex(), false);

    if (rerollBtn) {
      rerollBtn.addEventListener('click', () => {
        rerollBtn.classList.add('rolling');
        setTimeout(() => rerollBtn.classList.remove('rolling'), 450);
        applyVariation(getRandomIndex(), true);
      });
    }
  }
})();
