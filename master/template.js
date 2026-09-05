(() => {
  const $ = (selector) => document.querySelector(selector);

  const links = [
    ['هویت علمی', 'about.html', 'معرفی'],
    ['', 'education.html', 'تحصیلات'],
    ['', 'career.html', 'سوابق علمی و اجرایی'],
    ['پژوهش و آثار', 'research.html', 'پژوهش'],
    ['', 'publications.html', 'مقالات و کتاب‌ها'],
    ['', 'projects.html', 'پروژه‌ها'],
    ['', 'grants.html', 'گرنت‌ها'],
    ['', 'lab.html', 'آزمایشگاه و گروه پژوهشی'],
    ['آموزش', 'teaching.html', 'دروس و منابع'],
    ['', 'supervision.html', 'راهنمایی و دانشجویان'],
    ['اعتبار علمی', 'achievements.html', 'جوایز و افتخارات'],
    ['', 'activities.html', 'فعالیت‌های علمی'],
    ['', 'events.html', 'رویدادها و سخنرانی‌ها'],
    ['', 'network.html', 'شبکه علمی'],
    ['ارتباط و رسانه', 'media.html', 'رسانه و اخبار'],
    ['', 'contact.html', 'تماس و همکاری'],
    ['', 'downloads.html', 'مرکز دانلود']
  ];

  const isHome = !location.pathname.includes('/pages/');

  const make = (tag, cls, text) => {
    const element = document.createElement(tag);
    if (cls) element.className = cls;
    if (text) element.textContent = text;
    return element;
  };

  const addSidebar = () => {
    if ($('.master-sidebar')) return;

    const aside = make('aside', 'master-sidebar');
    aside.setAttribute('aria-label', 'ناوبری وب‌سایت');

    const title = make('div', 'sidebar-title');
    title.innerHTML = '<span>MASTER</span><b>ACADEMIC</b>';
    aside.append(title);

    let group = '';

    links.forEach(([section, href, text]) => {
      if (section && section !== group) {
        group = section;
        aside.append(make('div', 'sidebar-group', section));
      }

      const link = make('a', 'sidebar-link');
      link.href = isHome ? `pages/${href}` : href;
      link.textContent = text;

      if (!isHome && location.pathname.endsWith(`/${href}`)) {
        link.classList.add('active');
      }

      aside.append(link);
    });

    document.body.append(aside);

    const tab = make('button', 'sidebar-toggle', '☰');
    tab.type = 'button';
    tab.setAttribute('aria-label', 'نمایش منوی کناری');
    tab.addEventListener('click', () => aside.classList.toggle('open'));
    document.body.append(tab);

    aside.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        aside.classList.remove('open');
      }
    });
  };

  const addBackTop = () => {
    if ($('.back-top')) return;

    const button = make('a', 'back-top', '↑');
    button.href = isHome ? '#home' : '../#home';
    button.setAttribute('aria-label', 'بازگشت به بالا');
    document.body.append(button);

    const toggle = () => button.classList.toggle('show', scrollY > 420);
    addEventListener('scroll', toggle, { passive: true });
    toggle();
  };

  const addMobileNav = () => {
    if (isHome || $('.mobile-nav')) return;

    const nav = make('nav', 'mobile-nav');
    const items = [
      ['../', 'خانه'],
      ['../#about', 'استاد'],
      ['../#research', 'پژوهش'],
      ['../#publications', 'آثار'],
      ['../#contact', 'تماس']
    ];

    const icons = {
      خانه: '⌂',
      استاد: '◉',
      پژوهش: '⌁',
      آثار: '▤',
      تماس: '✦'
    };

    items.forEach(([href, text]) => {
      const link = make('a');
      link.href = href;
      link.innerHTML = `<span>${icons[text]}</span>${text}`;
      nav.append(link);
    });

    document.body.append(nav);
  };

  const animate = () => {
    document.querySelectorAll('.node').forEach((node, index) => {
      node.animate(
        [
          { transform: 'translateY(0)' },
          { transform: 'translateY(-7px)' },
          { transform: 'translateY(0)' }
        ],
        {
          duration: 3000 + index * 450,
          iterations: Infinity,
          easing: 'ease-in-out'
        }
      );
    });

    const core = $('.core');
    if (core) {
      core.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(1.035)' },
          { transform: 'scale(1)' }
        ],
        {
          duration: 4200,
          iterations: Infinity,
          easing: 'ease-in-out'
        }
      );
    }

    const toggle = $('[data-menu-toggle]');
    const drawer = $('[data-drawer]');

    if (toggle && drawer) {
      toggle.addEventListener('click', () => {
        drawer.classList.toggle('open');
        toggle.setAttribute(
          'aria-expanded',
          drawer.classList.contains('open')
        );
      });

      drawer.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
          drawer.classList.remove('open');
        }
      });
    }
  };

  addSidebar();
  addBackTop();
  addMobileNav();
  animate();
})();
