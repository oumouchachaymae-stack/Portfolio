/**
 * ==========================================================================
 * CHAYMAE OUMOUCHA — DEVELOPER PORTFOLIO
 * Vanilla JavaScript Interactivity & Responsive Control
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
   * 1. Navigation & Mobile Hamburger Menu
   * ------------------------------------------------------------------------ */
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileCtaBtn = document.querySelector('.mobile-cta-btn');

  // Toggle mobile menu
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when any navigation link is clicked
    const closeMenu = () => {
      navMenu.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    if (mobileCtaBtn) {
      mobileCtaBtn.addEventListener('click', closeMenu);
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && 
          !navMenu.contains(e.target) && 
          !hamburgerBtn.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ------------------------------------------------------------------------
   * 2. Active Section Highlighting (Scroll Spy)
   * ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  /* ------------------------------------------------------------------------
   * 3. Typing Animation (Hero Section)
   * ------------------------------------------------------------------------ */
  const typingElement = document.getElementById('typingText');
  const roles = [
    'Web Developer',
    'Frontend Developer',
    'Backend Developer'
  ];

  if (typingElement) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause when full phrase is typed
        typingSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  /* ------------------------------------------------------------------------
   * 4. Animated Numerical Statistics
   * ------------------------------------------------------------------------ */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsAnimated = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      let count = 0;
      const duration = 1200;
      const interval = 40;
      const step = Math.ceil(target / (duration / interval));

      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          stat.textContent = target < 10 ? `0${target}` : target;
          clearInterval(timer);
        } else {
          stat.textContent = count < 10 ? `0${count}` : count;
        }
      }, interval);
    });
  };

  const statsSection = document.getElementById('stats');
  if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          animateStats();
          statsAnimated = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  } else {
    animateStats();
  }

  /* ------------------------------------------------------------------------
   * 5. Project Showcase Tabs & Lightbox Modal
   * ------------------------------------------------------------------------ */
  const galleryTabs = document.querySelectorAll('.gallery-tab-btn');
  const previewItems = document.querySelectorAll('.preview-item');
  const thumbBtns = document.querySelectorAll('.thumb-btn');

  const projectImages = [
    {
      src: 'assets/images/login-project.png',
      title: 'Login Page UI',
      desc: 'Page 1 of Login & Create Account UI – Modern glassmorphism authentication interface with input fields and responsive layout.'
    },
    {
      src: 'assets/images/create-account-project.png',
      title: 'Create Account Page UI',
      desc: 'Page 2 of Login & Create Account UI – Registration interface with full name, email, password, and client-side password matching validation.'
    }
  ];

  let currentProjectImageIndex = 0;

  function switchProjectView(index) {
    currentProjectImageIndex = index;

    // Update main preview items
    previewItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === index);
    });

    // Update gallery tab buttons
    galleryTabs.forEach((tab, idx) => {
      tab.classList.toggle('active', idx === index);
    });

    // Update thumbnail buttons
    thumbBtns.forEach((thumb, idx) => {
      thumb.classList.toggle('active', idx === index);
    });
  }

  galleryTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => switchProjectView(idx));
  });

  thumbBtns.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => switchProjectView(idx));
  });

  // Lightbox Modal Implementation
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const openLightboxBtns = document.querySelectorAll('.open-lightbox-btn, .gallery-preview-frame');

  function updateLightbox() {
    const item = projectImages[currentProjectImageIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;
    lightboxCounter.textContent = `${currentProjectImageIndex + 1} / ${projectImages.length}`;
  }

  function openLightbox(index = 0) {
    currentProjectImageIndex = index;
    updateLightbox();
    lightboxModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    lightboxCloseBtn.focus();
  }

  function closeLightbox() {
    lightboxModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function nextLightbox() {
    currentProjectImageIndex = (currentProjectImageIndex + 1) % projectImages.length;
    updateLightbox();
    switchProjectView(currentProjectImageIndex);
  }

  function prevLightbox() {
    currentProjectImageIndex = (currentProjectImageIndex - 1 + projectImages.length) % projectImages.length;
    updateLightbox();
    switchProjectView(currentProjectImageIndex);
  }

  openLightboxBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const requestedIndex = btn.dataset.imgIndex !== undefined ? parseInt(btn.dataset.imgIndex, 10) : currentProjectImageIndex;
      openLightbox(requestedIndex);
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightbox);

  document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    }
  });

  // Demo Notice Toast
  const demoNoticeBtn = document.getElementById('demoNoticeBtn');
  if (demoNoticeBtn) {
    demoNoticeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(0);
    });
  }

  /* ------------------------------------------------------------------------
   * 6. Contact Form Validation & Mailto Action
   * ------------------------------------------------------------------------
   *
   * FUTURE EMAIL INTEGRATION GUIDE:
   * To send actual emails directly without client-side mail clients, you can:
   * 1. Use Formspree: set form action="https://formspree.io/f/YOUR_FORM_ID" method="POST"
   * 2. Use EmailJS: import emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form)
   * 3. Use your own PHP Backend: send a fetch('api/contact.php', { method: 'POST', body: new FormData(form) })
   * ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('emailAddress');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('formStatus');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!fullNameInput.value.trim() || fullNameInput.value.trim().length < 2) {
        fullNameInput.classList.add('is-invalid');
        nameError.classList.add('visible');
        isValid = false;
      } else {
        fullNameInput.classList.remove('is-invalid');
        nameError.classList.remove('visible');
      }

      // Validate Email
      if (!validateEmail(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        emailError.classList.add('visible');
        isValid = false;
      } else {
        emailInput.classList.remove('is-invalid');
        emailError.classList.remove('visible');
      }

      // Validate Subject
      if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
        subjectInput.classList.add('is-invalid');
        subjectError.classList.add('visible');
        isValid = false;
      } else {
        subjectInput.classList.remove('is-invalid');
        subjectError.classList.remove('visible');
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageInput.classList.add('is-invalid');
        messageError.classList.add('visible');
        isValid = false;
      } else {
        messageInput.classList.remove('is-invalid');
        messageError.classList.remove('visible');
      }

      if (isValid) {
        const nameVal = encodeURIComponent(fullNameInput.value.trim());
        const emailVal = encodeURIComponent(emailInput.value.trim());
        const subjectVal = encodeURIComponent(subjectInput.value.trim());
        const messageVal = encodeURIComponent(messageInput.value.trim());

        // Display success confirmation message
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        formStatus.innerHTML = `
          <strong>Thank you, ${fullNameInput.value.trim()}!</strong><br />
          Your message is ready. Opening your email app to send it directly to <em>chaymaeoumoucha@gmail.com</em>...
        `;

        // Compose mailto URI
        const mailtoUri = `mailto:chaymaeoumoucha@gmail.com?subject=${subjectVal}&body=Name:%20${nameVal}%0D%0AEmail:%20${emailVal}%0D%0A%0D%0AMessage:%0D%0A${messageVal}`;
        
        setTimeout(() => {
          window.location.href = mailtoUri;
        }, 600);

        // Reset inputs after sending
        contactForm.reset();
      } else {
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
        formStatus.textContent = 'Please fill out all required fields correctly before submitting.';
      }
    });

    // Clear error on input
    [fullNameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('is-invalid');
          const errorElem = document.getElementById(`${input.id.replace('Address', '')}Error`);
          if (errorElem) errorElem.classList.remove('visible');
        });
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 7. Back-to-Top Button
   * ------------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
