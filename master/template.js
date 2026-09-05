(() => {
  const $ = (selector) => document.querySelector(selector);
  const links = [
    ['پروفایل استاد', 'about.html', 'هویت علمی'],['پروفایل استاد', 'education.html', 'تحصیلات'],['پروفایل استاد', 'career.html', 'سوابق علمی و اجرایی'],
    ['پژوهش و دستاوردها', 'research.html', 'پژوهش'],['پژوهش و دستاوردها', 'publications.html', 'مقالات و کتاب‌ها'],['پژوهش و دستاوردها', 'projects.html', 'پروژه‌ها'],['پژوهش و دستاوردها', 'grants.html', 'گرنت‌ها و حمایت‌ها'],['پژوهش و دستاوردها', 'lab.html', 'آزمایشگاه و گروه پژوهشی'],
    ['آموزش و راهنمایی', 'teaching.html', 'دروس و منابع'],['آموزش و راهنمایی', 'supervision.html', 'دانشجویان و پایان‌نامه‌ها'],
    ['اعتبار و حضور علمی', 'achievements.html', 'جوایز و افتخارات'],['اعتبار و حضور علمی', 'activities.html', 'فعالیت‌های علمی'],['اعتبار و حضور علمی', 'events.html', 'رویدادها و سخنرانی‌ها'],['اعتبار و حضور علمی', 'network.html', 'شبکه علمی'],
    ['رسانه و ارتباط', 'media.html', 'رسانه و گالری'],['رسانه و ارتباط', 'contact.html', 'تماس و همکاری'],['رسانه و ارتباط', 'downloads.html', 'مرکز دانلود']
  ];
  const isHome = !location.pathname.includes('/pages/');
  const make = (tag, cls, text) => { const element = document.createElement(tag); if (cls) element.className = cls; if (text) element.textContent = text; return element; };
  const addSidebar = () => {
    if ($('.master-sidebar')) return;
    const aside = make('aside', 'master-sidebar'); aside.setAttribute('aria-label', 'ناوبری اصلی پایگاه استاد');
    const title = make('div', 'sidebar-title'); title.innerHTML = '<span>پایگاه استاد</span><b>پایگاه علمی استاد</b><small>پروفایل، پژوهش، آموزش و ارتباط</small>'; aside.append(title);
    let group = '', groupIndex = 0;
    links.forEach(([section, href, text]) => {
      if (section !== group) { group = section; groupIndex += 1; const heading = make('div', 'sidebar-group'); heading.innerHTML = `<span>${String(groupIndex).padStart(2, '0')}</span><b>${section}</b>`; aside.append(heading); }
      const link = make('a', 'sidebar-link'); link.href = isHome ? `pages/${href}` : href; link.innerHTML = `<span>${text}</span><i>↙</i>`;
      if (!isHome && location.pathname.endsWith(`/${href}`)) link.classList.add('active'); aside.append(link);
    });
    document.body.append(aside);
    const tab = make('button', 'sidebar-toggle', '☰'); tab.type = 'button'; tab.setAttribute('aria-label', 'باز کردن منوی پایگاه استاد'); tab.setAttribute('aria-expanded', 'false');
    tab.addEventListener('click', () => { const open = aside.classList.toggle('open'); tab.setAttribute('aria-expanded', String(open)); }); document.body.append(tab);
    aside.addEventListener('click', (event) => { if (event.target.closest('a')) { aside.classList.remove('open'); tab.setAttribute('aria-expanded', 'false'); } });
  };
  const addBackTop = () => { if ($('.back-top')) return; const button = make('a', 'back-top', '↑'); button.href = isHome ? '#home' : '../#home'; button.setAttribute('aria-label', 'بازگشت به بالا'); document.body.append(button); const toggle = () => button.classList.toggle('show', scrollY > 420); addEventListener('scroll', toggle, { passive: true }); toggle(); };
  const addMobileNav = () => {
    if (isHome || $('.mobile-nav')) return; const nav = make('nav', 'mobile-nav');
    const items = [['../', 'خانه'],['../#about', 'استاد'],['../#research', 'پژوهش'],['../#publications', 'آثار'],['../#contact', 'تماس']]; const icons = { خانه: '⌂', استاد: '◉', پژوهش: '⌁', آثار: '▤', تماس: '✦' };
    items.forEach(([href, text]) => { const link = make('a'); link.href = href; link.innerHTML = `<span>${icons[text]}</span><b>${text}</b>`; nav.append(link); }); document.body.append(nav);
  };
  const markHomeNav = () => { if (!isHome) return; const current = location.hash || '#home'; document.querySelectorAll('header nav a').forEach((link) => { if (link.getAttribute('href') === current) link.classList.add('active'); }); };
  const persianizeHome = () => {
    if (!isHome) return;
    const replacements = {
      'PROFESSOR / RESEARCHER / ACADEMIC PROFILE':'استاد · پژوهشگر · پروفایل علمی',
      '01 / IDENTITY':'۰۱ · هویت علمی','Academic Profile':'پروفایل علمی','AI':'هوش مصنوعی','DATA':'علوم داده',
      '01 / IDENTITY':'۰۱ · هویت علمی','02 / RESEARCH':'۰۲ · پژوهش','03 / WORKS':'۰۳ · آثار','04 / NETWORK':'۰۴ · شبکه علمی','05 / CONTACT':'۰۵ · ارتباط',
      'ACADEMIC STATEMENT':'بیانیه علمی','RESEARCH 01':'پژوهش ۰۱','RESEARCH 02':'پژوهش ۰۲','RESEARCH 03':'پژوهش ۰۳','RESEARCH 04':'پژوهش ۰۴',
      'ASATID / ACADEMIC':'قالب استاد','ASATID SITE · MASTER ACADEMIC':'اساتید سایت · قالب استاد'
    };
    document.querySelectorAll('body *').forEach((el) => {
      if (el.children.length) return;
      const text = el.textContent.trim();
      if (replacements[text]) el.textContent = replacements[text];
    });
  };
  const animate = () => {
    document.querySelectorAll('.node').forEach((node, index) => node.animate([{transform:'translateY(0)'},{transform:'translateY(-7px)'},{transform:'translateY(0)'}],{duration:3000+index*450,iterations:Infinity,easing:'ease-in-out'}));
    const core = $('.core'); if (core) core.animate([{transform:'scale(1)'},{transform:'scale(1.035)'},{transform:'scale(1)'}],{duration:4200,iterations:Infinity,easing:'ease-in-out'});
    const toggle = $('[data-menu-toggle]'), drawer = $('[data-drawer]'); if (toggle && drawer) { toggle.addEventListener('click',()=>{drawer.classList.toggle('open');toggle.setAttribute('aria-expanded',drawer.classList.contains('open'));}); drawer.addEventListener('click',(event)=>{if(event.target.closest('a'))drawer.classList.remove('open');}); }
  };
  addSidebar(); addBackTop(); addMobileNav(); markHomeNav(); persianizeHome(); animate();
})();
