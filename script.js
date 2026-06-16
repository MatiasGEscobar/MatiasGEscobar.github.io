document.addEventListener('DOMContentLoaded', function () {

  // =============================================
  // MENÚ MOBILE
  // =============================================
  const smMenuBtn     = document.querySelector('.main-header__sm-scr-nav-btn');
  const smMenu        = document.querySelector('.main-header__sm-menu');
  const smMenuCloseBtn = document.querySelector('.main-header__sm-menu-close');
  const smMenuLinks   = document.querySelectorAll('.main-header__sm-menu-link');
  const smMenuLink1   = document.querySelector('.main-header__sm-menu-link--1');
  const smMenuLink2   = document.querySelector('.main-header__sm-menu-link--2');
  const smMenuLink3   = document.querySelector('.main-header__sm-menu-link--3');
  const smMenuLink4   = document.querySelector('.main-header__sm-menu-link--4');

  function openMenu() {
    smMenu.style.transitionDelay = '0s';
    smMenu.classList.add('main-header__sm-menu--active');
    [[smMenuLink1, '.5s'], [smMenuLink2, '.8s'], [smMenuLink3, '1.1s'], [smMenuLink4, '1.4s']].forEach(([el, delay]) => {
      el.style.transitionDelay = delay;
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';
    });
  }

  function closeMenu() {
    [[smMenuLink4, '0s'], [smMenuLink3, '.3s'], [smMenuLink2, '.6s'], [smMenuLink1, '.9s']].forEach(([el, delay]) => {
      el.style.transitionDelay = delay;
      el.style.transform = 'translateY(50px)';
      el.style.opacity = '0';
    });
    smMenu.style.transitionDelay = '1.2s';
    smMenu.classList.remove('main-header__sm-menu--active');
  }

  if (smMenuBtn)      smMenuBtn.addEventListener('click', openMenu);
  if (smMenuCloseBtn) smMenuCloseBtn.addEventListener('click', closeMenu);

  smMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
      const targetId = link.getAttribute('name');
      setTimeout(() => {
        const target = document.getElementById(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 1300);
    });
  });

  // =============================================
  // LOGO — volver al inicio
  // =============================================
  const headerLogo = document.querySelector('.main-header__logo-container');
  if (headerLogo) {
    headerLogo.addEventListener('click', () => { location.href = 'index.html'; });
  }

  // =============================================
  // SLIDER DE PROYECTOS
  // =============================================
  const track    = document.getElementById('proj-track');
  const dotsEl   = document.getElementById('proj-dots');
  const prevBtn  = document.getElementById('proj-prev');
  const nextBtn  = document.getElementById('proj-next');
  const counterEl = document.getElementById('proj-counter');

  if (track && dotsEl && prevBtn && nextBtn) {
    const cards   = track.querySelectorAll('.proj-card');
    const total   = cards.length;
    let visible   = getVisible();
    let steps     = total - visible;
    let current   = 0;

    function getVisible() {
      return window.innerWidth <= 900 ? 1 : 2;
    }

    function buildDots() {
      dotsEl.innerHTML = '';
      steps = total - getVisible();
      for (let i = 0; i <= steps; i++) {
        const btn = document.createElement('button');
        btn.className = 'proj-dot' + (i === 0 ? ' active' : '');
        btn.setAttribute('aria-label', 'Ir al proyecto ' + (i + 1));
        btn.addEventListener('click', () => go(i));
        dotsEl.appendChild(btn);
      }
    }

    function go(n) {
      visible = getVisible();
      steps   = total - visible;
      current = Math.max(0, Math.min(n, steps));

      const cardW = cards[0].offsetWidth + 24; // 24px = gap (2.4rem)
      track.style.transform = `translateX(-${current * cardW}px)`;

      dotsEl.querySelectorAll('.proj-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });

      if (counterEl) counterEl.textContent = `${current + 1} / ${steps + 1}`;
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === steps;
    }

    // Touch/swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) go(current + (diff > 0 ? 1 : -1));
    });

    // Keyboard support
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  go(current - 1);
      if (e.key === 'ArrowRight') go(current + 1);
    });

    prevBtn.addEventListener('click', () => go(current - 1));
    nextBtn.addEventListener('click', () => go(current + 1));

    // Rebuild on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildDots();
        go(0);
      }, 200);
    });

    // Init
    buildDots();
    go(0);
  }

  // =============================================
  // EMAILJS — FORMULARIO DE CONTACTO
  // =============================================
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: 'CqwtpBxBFpPr5CGsU' });
  }

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = form.querySelector('.contact__form-submit');
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;

      emailjs.sendForm('service_or439c5', 'template_miumfrc', this)
        .then(() => {
          alert('¡Mensaje enviado con éxito!');
          form.reset();
        })
        .catch(err => {
          console.error('EmailJS error:', err);
          alert('Error al enviar el mensaje. Por favor, intenta de nuevo más tarde.');
        })
        .finally(() => {
          submitBtn.textContent = 'Enviar mensaje';
          submitBtn.disabled = false;
        });
    });
  }

});