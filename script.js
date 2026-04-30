// ===========================
//  PROPERTY BAAP — script.js
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  const goTopBtn = document.getElementById('goTopBtn');

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (window.scrollY > 300) {
      goTopBtn.classList.add('visible');
    } else {
      goTopBtn.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  goTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

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

  /* ── Logo image: show fallback if upload not found ── */
  const logoImg = document.getElementById('logoImg');
  const logoFallback = document.getElementById('logoFallback');

  if (logoImg) {
    // If already broken (cached error)
    if (!logoImg.complete || logoImg.naturalWidth === 0) {
      logoImg.style.display = 'none';
      logoFallback.style.display = 'flex';
    }

    logoImg.addEventListener('error', () => {
      logoImg.style.display = 'none';
      logoFallback.style.display = 'flex';
    });
  }

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
