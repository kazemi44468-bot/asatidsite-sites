# Professor Websites

این پوشه محل سایت‌های مستقل استادانی است که با زیرساخت AsatidSite تولید می‌شوند.

هر استاد باید پوشه مستقل، assets مستقل و هویت بصری مستقل داشته باشد.

الگوی پیشنهادی:

```text
professors/
└── professor-slug/
    ├── index.html
    ├── style.css
    ├── script.js
    ├── data/
    └── assets/
```

هسته معماری و Template در مخزن اصلی `asatidsite` توسعه می‌یابد؛ خروجی نهایی هر استاد در این مخزن مستقل نگهداری و Deploy می‌شود.