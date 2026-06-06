// ===========================
//  PROPERTY BAAP — script.js
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  const onScroll = () => {
    const currentY = window.scrollY;

    if (currentY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (currentY > lastScrollY && currentY > 80) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }

    lastScrollY = currentY;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Hamburger / Mobile Menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ── Mobile accordion sub-menus ── */
  const mobileNavTitles = document.querySelectorAll('.mobile-nav-title');

  mobileNavTitles.forEach(title => {
    title.addEventListener('click', () => {
      const targetId = title.getAttribute('data-target');
      const sub = document.getElementById(targetId);
      const isOpen = sub.classList.contains('open');

      // Close all
      document.querySelectorAll('.mobile-nav-sub').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('.mobile-nav-title').forEach(t => t.classList.remove('active'));

      if (!isOpen) {
        sub.classList.add('open');
        title.classList.add('active');
      }
    });
  });

  /* ── Hero Tagline Carousel ── */
  (function () {
    const items = document.querySelectorAll('.htc-item');
    if (!items.length) return;
    let current = 0;
    setInterval(function () {
      items[current].classList.remove('active');
      current = (current + 1) % items.length;
      items[current].classList.add('active');
    }, 3000);
  })();

  /* ── Hero Sub Carousel ── */
  (function () {
    const items = document.querySelectorAll('.hero-sub-item');
    if (!items.length) return;
    let current = 0;
    setInterval(function () {
      items[current].classList.remove('active');
      current = (current + 1) % items.length;
      items[current].classList.add('active');
    }, 2000);
  })();

  /* ── Navbar Tagline: typing animation ── */
  (function () {
    const tagline = document.querySelector('.navbar-tagline-bar');
    if (!tagline) return;

    const fullText = tagline.textContent.trim();
    const SPEED    = 60;    // ms per character
    const CYCLE    = 5000;  // ms between restarts

    let i = 0;
    tagline.textContent = '';
    const t = setInterval(function () {
      tagline.textContent += fullText[i];
      i++;
      if (i >= fullText.length) clearInterval(t);
    }, SPEED);
  })();

  /* ── Hero Particles ── */
  const particleContainer = document.getElementById('particles');
  const NUM_PARTICLES = 28;

  for (let i = 0; i < NUM_PARTICLES; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 10 + 8;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -${size}px;
      opacity: 0;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    particleContainer.appendChild(p);
  }

  /* ── Intersection Observer for service cards ── */
  const cards = document.querySelectorAll('.service-card');

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute('data-delay') || 0);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach(card => cardObserver.observe(card));

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });

        // Close mobile menu if open
        if (mobileMenu.classList.contains('open')) {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });
  });

  /* ── Language Switcher ── */
  const languages = [
    { code: 'en',    flag: '🇬🇧', name: 'English'                },
    { code: 'hi',    flag: '🇮🇳', name: 'Hindi - हिन्दी'          },
    { code: 'ar',    flag: '🇸🇦', name: 'Arabic - العربية'        },
    { code: 'zh-CN', flag: '🇨🇳', name: 'Chinese - 中文'           },
    { code: 'fr',    flag: '🇫🇷', name: 'French - Français'       },
    { code: 'de',    flag: '🇩🇪', name: 'German - Deutsch'        },
    { code: 'es',    flag: '🇪🇸', name: 'Spanish - Español'       },
    { code: 'ja',    flag: '🇯🇵', name: 'Japanese - 日本語'        },
    { code: 'ko',    flag: '🇰🇷', name: 'Korean - 한국어'          },
    { code: 'ru',    flag: '🇷🇺', name: 'Russian - Русский'       },
    { code: 'pt',    flag: '🇵🇹', name: 'Portuguese - Português'  },
    { code: 'it',    flag: '🇮🇹', name: 'Italian - Italiano'      },
    { code: 'nl',    flag: '🇳🇱', name: 'Dutch - Nederlands'      },
    { code: 'tr',    flag: '🇹🇷', name: 'Turkish - Türkçe'        },
    { code: 'ur',    flag: '🇵🇰', name: 'Urdu - اردو'             },
    { code: 'bn',    flag: '🇧🇩', name: 'Bengali - বাংলা'         },
    { code: 'ta',    flag: '🇮🇳', name: 'Tamil - தமிழ்'           },
    { code: 'te',    flag: '🇮🇳', name: 'Telugu - తెలుగు'         },
    { code: 'mr',    flag: '🇮🇳', name: 'Marathi - मराठी'         },
    { code: 'gu',    flag: '🇮🇳', name: 'Gujarati - ગુજરાતી'      },
    { code: 'pa',    flag: '🇮🇳', name: 'Punjabi - ਪੰਜਾਬੀ'        },
    { code: 'ml',    flag: '🇮🇳', name: 'Malayalam - മലയാളം'      },
    { code: 'kn',    flag: '🇮🇳', name: 'Kannada - ಕನ್ನಡ'         },
    { code: 'id',    flag: '🇮🇩', name: 'Indonesian - Indonesia'  },
    { code: 'th',    flag: '🇹🇭', name: 'Thai - ไทย'              },
  ];

  const langSwitcher       = document.getElementById('langSwitcher');
  const langBtn            = document.getElementById('langBtn');
  const langSearch         = document.getElementById('langSearch');
  const langListEl         = document.getElementById('langList');
  const langLabel          = document.getElementById('langLabel');

  const mobileLangSwitcher = document.getElementById('mobileLangSwitcher');
  const mobileLangBtn      = document.getElementById('mobileLangBtn');
  const mobileLangSearch   = document.getElementById('mobileLangSearch');
  const mobileLangListEl   = document.getElementById('mobileLangList');
  const mobileLangLabel    = document.getElementById('mobileLangLabel');

  function buildLangList(listEl, filter) {
    filter = filter || '';
    listEl.innerHTML = '';
    languages
      .filter(l => l.name.toLowerCase().includes(filter.toLowerCase()))
      .forEach(l => {
        const li = document.createElement('li');
        li.dataset.code = l.code;
        li.innerHTML = '<span>' + l.flag + '</span><span>' + l.name + '</span>';
        li.addEventListener('click', function() {
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            select.value = l.code;
            select.dispatchEvent(new Event('change'));
          }
          const label = l.code.split('-')[0].toUpperCase();
          langLabel.textContent = label;
          mobileLangLabel.textContent = label;
          document.querySelectorAll('.lang-list li').forEach(function(i) { i.classList.remove('active'); });
          document.querySelectorAll('.lang-list li[data-code="' + l.code + '"]').forEach(function(i) { i.classList.add('active'); });
          langSwitcher.classList.remove('open');
          mobileLangSwitcher.classList.remove('open');
          langSearch.value = '';
          mobileLangSearch.value = '';
          buildLangList(langListEl);
          buildLangList(mobileLangListEl);
        });
        listEl.appendChild(li);
      });
  }

  buildLangList(langListEl);
  buildLangList(mobileLangListEl);

  langBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    langSwitcher.classList.toggle('open');
    if (langSwitcher.classList.contains('open')) langSearch.focus();
  });

  mobileLangBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    mobileLangSwitcher.classList.toggle('open');
    if (mobileLangSwitcher.classList.contains('open')) mobileLangSearch.focus();
  });

  langSearch.addEventListener('input', function() { buildLangList(langListEl, langSearch.value); });
  mobileLangSearch.addEventListener('input', function() { buildLangList(mobileLangListEl, mobileLangSearch.value); });

  document.addEventListener('click', function(e) {
    if (!langSwitcher.contains(e.target)) langSwitcher.classList.remove('open');
    if (!mobileLangSwitcher.contains(e.target)) mobileLangSwitcher.classList.remove('open');
  });


/* ── Hero Service Swiper ── */
  new Swiper('.hero-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 14,
    centeredSlides: true,
    loop: true,
    speed: 650,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  });

  /* ── Hero Video Autoplay ── */
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    heroVideo.muted = true;
    const playAttempt = heroVideo.play();
    if (playAttempt !== undefined) {
      playAttempt.catch(() => {
        // Autoplay blocked by browser — hide video so image slider shows through
        heroVideo.style.display = 'none';
        const resumeVideo = () => {
          heroVideo.style.display = '';
          heroVideo.play();
        };
        document.addEventListener('click', resumeVideo, { once: true });
        document.addEventListener('touchstart', resumeVideo, { once: true });
      });
    }
  }

  /* ── Hero Image Slider ── */
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;

  function advanceSlide() {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    const next = heroSlides[currentSlide];
    next.style.animation = 'none';
    void next.offsetWidth; // force reflow to restart Ken Burns
    next.style.animation = '';
    next.classList.add('active');
  }

  if (heroSlides.length > 1) {
    setInterval(advanceSlide, 6000);
  }

  /* ── Careers Form ── */
  const careersForm = document.getElementById('careersForm');
  if (careersForm) {
    careersForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = careersForm.querySelector('.careers-submit');
      const original = btn.textContent;
      btn.textContent = 'SENDING…';
      btn.disabled = true;

      try {
        const res = await fetch('mailer.php', {
          method: 'POST',
          body: new FormData(careersForm),
        });
        const data = await res.json();
        if (data.success) {
          careersForm.reset();
          btn.textContent = 'SUBMITTED ✓';
          btn.style.background = 'linear-gradient(135deg,#3a7d44,#52b069)';
          setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
            btn.disabled = false;
          }, 4000);
        } else {
          alert(data.message || 'Something went wrong. Please try again.');
          btn.textContent = original;
          btn.disabled = false;
        }
      } catch {
        alert('Network error. Please try again.');
        btn.textContent = original;
        btn.disabled = false;
      }
    });
  }

  /* ── Connect Footer Accordion ── */
  document.querySelectorAll('.connect-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.connect-question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.style.maxHeight = null;
      });

      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ── About Section Accordion ── */
  document.querySelectorAll('.about-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all others (skip current if we're about to open it)
      document.querySelectorAll('.about-question').forEach(b => {
        if (!isOpen && b === btn) return;
        b.setAttribute('aria-expanded', 'false');
        const sib = b.nextElementSibling;
        // If sib has max-height:none we must first set a px value so CSS can animate to 0
        if (sib.style.maxHeight === 'none') {
          sib.style.maxHeight = sib.scrollHeight + 'px';
          requestAnimationFrame(() => requestAnimationFrame(() => { sib.style.maxHeight = null; }));
        } else {
          sib.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        // After open animation: remove constraint and scroll first content into view
        answer.addEventListener('transitionend', () => {
          if (btn.getAttribute('aria-expanded') === 'true') {
            answer.style.maxHeight = 'none';
            const target = answer.querySelector('h3, p');
            if (target) {
              const navOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 96;
              const top = target.getBoundingClientRect().top + window.scrollY - navOffset - 16;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          }
        }, { once: true });
      }
    });
  });

  /* ── BAAP Promise Tab → scroll to & open accordion ── */
  const baapTab        = document.getElementById('baapPromiseTab');
  const baapWrapper    = document.getElementById('baapPromiseWrapper');
  const promiseBtn     = document.querySelector('.about-question--promise');
  const promiseItem    = document.querySelector('.about-item--promise');

  /* ── BAAP Tab slide toggle ── */
  const baapTabToggle = document.getElementById('baapTabToggle');
  if (baapTabToggle && baapWrapper) {
    baapTabToggle.addEventListener('click', () => {
      baapWrapper.classList.toggle('tab-visible');
    });
  }

  const promiseRejectBtn = document.querySelector('.promise-cta-reject');
  if (promiseRejectBtn && promiseBtn) {
    promiseRejectBtn.addEventListener('click', () => {
      if (promiseBtn.getAttribute('aria-expanded') === 'true') {
        promiseBtn.click();
      }
    });
  }

  if (baapTab && promiseBtn) {
    baapTab.addEventListener('click', () => {
      if (promiseBtn.getAttribute('aria-expanded') !== 'true') {
        promiseBtn.click();
      }
      const navOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 96;
      const top = promiseBtn.getBoundingClientRect().top + window.scrollY - navOffset - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }

  if (baapWrapper && promiseItem) {
    const promiseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          baapWrapper.style.opacity    = entry.isIntersecting ? '0' : '';
          baapWrapper.style.pointerEvents = entry.isIntersecting ? 'none' : '';
        });
      },
      { threshold: 0.15 }
    );
    promiseObserver.observe(promiseItem);
  }

  // /* ── Exit Intent Popup (back button) ── */
  // const exitOverlay    = document.getElementById('exitPopupOverlay');
  // const exitSecureBtn  = document.getElementById('exitSecureBtn');
  // const exitAlreadyBtn = document.getElementById('exitAlreadyBtn');
  // const exitRejectBtn  = document.getElementById('exitRejectBtn');

  // if (exitOverlay) {
  //   let leavingForReal = false;

  //   const pushExitGuard = () => {
  //     history.pushState({ exitGuard: true }, '', location.href);
  //   };

  //   // Push guard immediately and again after window load (covers bfcache restore)
  //   pushExitGuard();
  //   window.addEventListener('load', pushExitGuard);

  //   // pageshow fires when restored from Chrome's back-forward cache
  //   window.addEventListener('pageshow', (e) => {
  //     if (e.persisted) {
  //       leavingForReal = false;
  //       pushExitGuard();
  //     }
  //   });

  //   window.addEventListener('popstate', (e) => {
  //     if (leavingForReal) return;
  //     // Only show popup if we just left a guard state (i.e., user pressed back)
  //     exitOverlay.classList.add('active');
  //     // Re-arm so the next back press also shows popup
  //     pushExitGuard();
  //   });

  //   if (exitSecureBtn) {
  //     exitSecureBtn.addEventListener('click', (e) => {
  //       e.preventDefault();
  //       const msg = encodeURIComponent('Hello Property Baap, I want to lock-in my Baap Promise.');
  //       window.open('https://wa.me/918800505050?text=' + msg, '_blank');
  //       exitOverlay.classList.remove('active');
  //     });
  //   }

  //   if (exitAlreadyBtn) {
  //     exitAlreadyBtn.addEventListener('click', () => {
  //       leavingForReal = true;
  //       exitOverlay.classList.remove('active');
  //       window.location.href = 'https://www.google.com/';
  //               // window.close();
  //          // fallback if browser blocks window.close() on user-opened tabs
  //           // setTimeout(() => { window.location.href = 'https://www.google.com/'; }, 300);
  //     });
  //   }

  //   if (exitRejectBtn) {
  //     exitRejectBtn.addEventListener('click', () => {
  //       exitOverlay.classList.remove('active');
  //     });
  //   }
  // }
  /* ── Exit Intent Popup ── */

  const exitOverlay    = document.getElementById('exitPopupOverlay');
  const exitSecureBtn  = document.getElementById('exitSecureBtn');
  const exitAlreadyBtn = document.getElementById('exitAlreadyBtn');
  const exitRejectBtn  = document.getElementById('exitRejectBtn');

  if (exitOverlay) {

    let _scrollY = 0;

    const showExitPopup = () => {
      _scrollY = window.scrollY;
      exitOverlay.classList.add('active');
      // Freeze page scroll under the popup (iOS-safe technique)
      document.body.style.position = 'fixed';
      document.body.style.top = `-${_scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    };

    const hideExitPopup = () => {
      exitOverlay.classList.remove('active');
      // Restore page scroll and position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, _scrollY);
    };

    // Trigger only on browser / mobile back button
    history.pushState({ exitGuard: true }, '', location.href);

    window.addEventListener('popstate', () => {
      showExitPopup();
      history.pushState({ exitGuard: true }, '', location.href);
    });

    // Close on overlay background click
    exitOverlay.addEventListener('click', (e) => {
      if (e.target === exitOverlay) hideExitPopup();
    });

    /* ── WhatsApp Button ── */
    if (exitSecureBtn) {
      exitSecureBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const msg = encodeURIComponent('Hello Property Baap, I want to lock-in my Baap Promise.');
        window.open('https://wa.me/918800505050?text=' + msg, '_blank');
        hideExitPopup();
      });
    }

    /* ── Already Secured Button ── */
    if (exitAlreadyBtn) {
      exitAlreadyBtn.addEventListener('click', () => {
        window.close();
        window.location.href = 'https://www.google.com';
      });
    }

    /* ── Reject / Close Button ── */
    if (exitRejectBtn) {
      exitRejectBtn.addEventListener('click', () => {
        hideExitPopup();
      });
    }

  }

  /* ── Subtle navbar logo pulse on page load ── */
  const logoWrapper = document.querySelector('.logo-wrapper');
  if (logoWrapper) {
    logoWrapper.animate(
      [
        { filter: 'drop-shadow(0 0 0px rgba(201,168,76,0))' },
        { filter: 'drop-shadow(0 0 14px rgba(201,168,76,0.6))' },
        { filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.3))' },
      ],
      { duration: 1800, delay: 600, fill: 'forwards', easing: 'ease-out' }
    );
  }

});
