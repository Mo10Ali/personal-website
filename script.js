(() => {
  // ===== Helpers =====
  const $ = (id) => document.getElementById(id);

  const root = document.documentElement;

  const ui = {
    brand: $('brand'),
    themeBtn: $('themeBtn'),
    langSwitch: $('langSwitch'),
    langBtn: $('langBtn'),
    langMenu: $('langMenu'),
    langLabel: $('langLabel'),
    menuBtn: $('menuBtn'),
    mobileNav: $('mobileNav'),

    navHome: $('nav-home'),
    navSkills: $('nav-skills'),
    navContact: $('nav-contact'),

    mNavHome: $('m-nav-home'),
    mNavSkills: $('m-nav-skills'),
    mNavContact: $('m-nav-contact'),

    heroTitle: $('hero-title'),
    heroText: $('hero-text'),
    skillsTitle: $('skills-title'),
    skillsHint: $('skills-hint'),
    contactTitle: $('contact-title'),
    lnkLinkedin: $('lnk-linkedin'),
    lnkGithub: $('lnk-github'),
    lnkEmail: $('lnk-email'),
    footer: $('footer'),
    menuLabel: $('menuLabel'),
  };

  const translations = {
    ar: {
      brand: 'محمد العبيد',
      navHome: 'الرئيسية',
      navSkills: 'المهارات',
      navContact: 'التواصل',

      heroTitle: 'مرحباً، أنا محمد العبيد',
      heroText: 'مهتم بتقنية المعلومات وتطوير البرمجيات، أسعى دائماً لتعلم أحدث التقنيات وبناء حلول تقنية مبتكرة.',

      skillsTitle: 'مهاراتي',
      skillsHint: 'اسحب يمين/يسار لاستعراض المهارات',
      contactTitle: 'تواصل معي',

      linkedin: 'لينكدإن',
      github: 'جيت هب',
      email: 'البريد',

      footer: '© 2025 محمد العبيد. جميع الحقوق محفوظة.',

      themeDark: 'وضع ليلي',
      themeLight: 'وضع نهاري',

      langButton: 'اللغة',
      menu: 'القائمة',
    },
    en: {
      brand: 'Mohammed Al-Obaid',
      navHome: 'Home',
      navSkills: 'Skills',
      navContact: 'Contact',

      heroTitle: 'Hello, I am Mohammed Al-Obaid',
      heroText: 'I am passionate about IT and software development. I always strive to learn the latest technologies and build innovative solutions.',

      skillsTitle: 'My Skills',
      skillsHint: 'Swipe left/right to browse skills',
      contactTitle: 'Contact Me',

      linkedin: 'LinkedIn',
      github: 'GitHub',
      email: 'Email',

      footer: '© 2025 Mohammed Al-Obaid. All rights reserved.',

      themeDark: 'Dark Mode',
      themeLight: 'Light Mode',

      langButton: 'Language',
      menu: 'Menu',
    }
  };

  function getSavedLang() {
    try { return localStorage.getItem('site_lang') === 'en' ? 'en' : 'ar'; }
    catch { return root.lang === 'en' ? 'en' : 'ar'; }
  }

  function getSavedTheme() {
    try { return localStorage.getItem('theme_mode') === 'dark' ? 'dark' : 'light'; }
    catch { return root.classList.contains('dark') ? 'dark' : 'light'; }
  }

  function setTheme(mode) {
    const isDark = mode === 'dark';
    root.classList.toggle('dark', isDark);

    // aria-pressed + label
    ui.themeBtn.setAttribute('aria-pressed', String(isDark));
    const lang = root.lang === 'en' ? 'en' : 'ar';
    ui.themeBtn.textContent = isDark ? translations[lang].themeLight : translations[lang].themeDark;

    try { localStorage.setItem('theme_mode', isDark ? 'dark' : 'light'); } catch {}
  }

  function setLang(lang) {
    const newLang = lang === 'en' ? 'en' : 'ar';
    const t = translations[newLang];

    root.lang = newLang;
    root.dir = newLang === 'en' ? 'ltr' : 'rtl';

    ui.brand.textContent = t.brand;

    ui.navHome.textContent = t.navHome;
    ui.navSkills.textContent = t.navSkills;
    ui.navContact.textContent = t.navContact;

    ui.mNavHome.textContent = t.navHome;
    ui.mNavSkills.textContent = t.navSkills;
    ui.mNavContact.textContent = t.navContact;

    ui.heroTitle.textContent = t.heroTitle;
    ui.heroText.textContent = t.heroText;

    ui.skillsTitle.textContent = t.skillsTitle;
    ui.skillsHint.textContent = t.skillsHint;
    ui.contactTitle.textContent = t.contactTitle;

    ui.lnkLinkedin.textContent = t.linkedin;
    ui.lnkGithub.textContent = t.github;
    ui.lnkEmail.textContent = t.email;

    ui.footer.textContent = t.footer;

    ui.langLabel.textContent = t.langButton;
    ui.menuLabel.textContent = t.menu;

    // Update active state
    document.querySelectorAll('.lang-item').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === newLang);
    });

    // Re-apply theme button label based on current theme + lang
    setTheme(getSavedTheme());

    try { localStorage.setItem('site_lang', newLang); } catch {}
  }

  // ===== Language menu open/close =====
  function openLangMenu() {
    ui.langMenu.classList.add('open');
    ui.langBtn.setAttribute('aria-expanded', 'true');
  }
  function closeLangMenu() {
    ui.langMenu.classList.remove('open');
    ui.langBtn.setAttribute('aria-expanded', 'false');
  }
  function toggleLangMenu() {
    const isOpen = ui.langMenu.classList.contains('open');
    isOpen ? closeLangMenu() : openLangMenu();
  }

  // ===== Mobile nav open/close =====
  function openMobileNav() {
    ui.mobileNav.hidden = false;
    ui.menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeMobileNav() {
    ui.mobileNav.hidden = true;
    ui.menuBtn.setAttribute('aria-expanded', 'false');
  }
  function toggleMobileNav() {
    ui.mobileNav.hidden ? openMobileNav() : closeMobileNav();
  }

  // ===== Events (Pointer Events to avoid click+touch duplication) =====
  ui.themeBtn.addEventListener('pointerup', (e) => {
    e.preventDefault();
    const next = root.classList.contains('dark') ? 'light' : 'dark';
    setTheme(next);
  });

  ui.langBtn.addEventListener('pointerup', (e) => {
    e.preventDefault();
    toggleLangMenu();
  });

  document.querySelectorAll('.lang-item').forEach(btn => {
    btn.addEventListener('pointerup', (e) => {
      e.preventDefault();
      setLang(btn.getAttribute('data-lang'));
      closeLangMenu();
    });
  });

  // close lang menu if click outside
  document.addEventListener('pointerup', (e) => {
    if (!ui.langSwitch.contains(e.target)) closeLangMenu();
  });

  // Esc closes menus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLangMenu();
      closeMobileNav();
    }
  });

  // Mobile menu button
  ui.menuBtn.addEventListener('pointerup', (e) => {
    e.preventDefault();
    toggleMobileNav();
  });

  // Close mobile nav when tapping a link
  ui.mobileNav.addEventListener('pointerup', (e) => {
    const link = e.target.closest('[data-close="mobileNav"]');
    if (link) closeMobileNav();
  });

  // ===== Skills scroller drag/swipe (Pointer Events + prevent accidental clicks) =====
  const scroller = document.getElementById('skillsList');
  let isDown = false, startX = 0, scrollLeft = 0, hasMoved = false, pointerId = null;

  const start = (x, id) => {
    isDown = true;
    pointerId = id;
    startX = x;
    scrollLeft = scroller.scrollLeft;
    hasMoved = false;
    scroller.classList.add('dragging');
    scroller.setPointerCapture?.(id);
  };

  const move = (x) => {
    if (!isDown) return;
    const dx = x - startX;
    if (Math.abs(dx) > 3) hasMoved = true;
    scroller.scrollLeft = scrollLeft - dx;
  };

  const end = () => {
    isDown = false;
    pointerId = null;
    scroller.classList.remove('dragging');
  };

  scroller.addEventListener('pointerdown', (e) => {
    // Only left click / primary touch
    if (e.button !== undefined && e.button !== 0) return;
    start(e.pageX, e.pointerId);
  });

  scroller.addEventListener('pointermove', (e) => move(e.pageX));
  scroller.addEventListener('pointerup', end);
  scroller.addEventListener('pointercancel', end);
  scroller.addEventListener('pointerleave', end);

  // Prevent accidental clicks while dragging inside scroller
  scroller.addEventListener('click', (e) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // ===== Init =====
  setLang(getSavedLang());
  setTheme(getSavedTheme());
})();
