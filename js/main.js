/* =========================================
   HORNSPIRIT — 혼스피릿 · 酒之魂
   Main JavaScript
   ========================================= */

'use strict';

/* ─── Age Gate ─── */
function initAgeGate() {
  const gate = document.getElementById('ageGate');
  if (!gate) return;

  const verified = sessionStorage.getItem('hs_age_verified');
  if (verified === 'yes') {
    gate.style.display = 'none';
    return;
  }

  document.getElementById('ageYes')?.addEventListener('click', () => {
    sessionStorage.setItem('hs_age_verified', 'yes');
    gate.style.opacity = '0';
    gate.style.transition = 'opacity 0.5s ease';
    setTimeout(() => { gate.style.display = 'none'; }, 500);
  });

  document.getElementById('ageNo')?.addEventListener('click', () => {
    alert('미성년자는 주류 관련 사이트에 접근할 수 없습니다.');
    window.location.href = 'https://www.google.com';
  });
}

/* ─── Navigation ─── */
function initNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobile');

  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      const isOpen = mobileMenu.classList.contains('open');
      if (spans[0]) spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
      if (spans[1]) spans[1].style.opacity = isOpen ? '0' : '1';
      if (spans[2]) spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Active link highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ─── Scroll Animations ─── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right')
    .forEach(el => observer.observe(el));
}

/* ─── Counter Animation ─── */
function animateCounter(el, target, suffix, duration = 2000) {
  const start = performance.now();
  const isDecimal = target % 1 !== 0;

  const step = (now) => {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    const current = isDecimal
      ? (eased * target).toFixed(1)
      : Math.floor(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (elapsed < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ─── Particle Canvas (Hero) ─── */
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  const resize = () => {
    W = canvas.width  = container.offsetWidth;
    H = canvas.height = container.offsetHeight;
  };

  const rand = (min, max) => Math.random() * (max - min) + min;

  const createParticles = () => {
    particles = Array.from({ length: 60 }, () => ({
      x: rand(0, W),
      y: rand(0, H),
      r: rand(0.5, 2),
      vx: rand(-0.15, 0.15),
      vy: rand(-0.3, -0.05),
      alpha: rand(0.1, 0.6),
      da: rand(0.002, 0.006) * (Math.random() > 0.5 ? 1 : -1),
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 168, 76, ${Math.max(0, Math.min(1, p.alpha))})`;
      ctx.fill();

      p.x  += p.vx;
      p.y  += p.vy;
      p.alpha += p.da;

      if (p.alpha <= 0 || p.alpha >= 0.6) p.da *= -1;
      if (p.y < -10)  p.y = H + 10;
      if (p.x < -10)  p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
    });
    requestAnimationFrame(draw);
  };

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => { resize(); createParticles(); });
}

/* ─── Smooth Anchor Links ─── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ─── Partner Form ─── */
function initPartnerForm() {
  const form = document.getElementById('partnerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = '제출 중...';
    btn.disabled = true;

    // Simulate submit (replace with actual EmailJS or backend call)
    setTimeout(() => {
      btn.textContent = '✓ 문의가 접수되었습니다';
      btn.style.background = 'linear-gradient(135deg, #2D6A4F, #4ade80)';
      form.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }, 1200);
  });
}

/* ─── Contact Form ─── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = '전송 중...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ 메시지가 전송되었습니다';
      btn.style.background = 'linear-gradient(135deg, #2D6A4F, #4ade80)';
      form.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }, 1000);
  });
}

/* ─── Product Tab (Products Page) ─── */
function initProductTabs() {
  const tabs = document.querySelectorAll('.product-tab');
  const sections = document.querySelectorAll('.product-detail');
  if (!tabs.length) return;

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      sections.forEach((s, j) => {
        s.style.display = i === j ? 'block' : 'none';
      });
    });
  });
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  initAgeGate();
  initNav();
  initScrollAnimations();
  initCounters();
  initParticles();
  initSmoothScroll();
  initPartnerForm();
  initContactForm();
  initProductTabs();
});
