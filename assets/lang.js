/* Language preference: first-visit modal + cookie memory + auto redirect.
   zh pages live at site root, en pages under en/ with identical filenames. */
(function () {
  var COOKIE = 'sspcz_lang';

  function getSaved() {
    var m = document.cookie.match(/(?:^|;\s*)sspcz_lang=(zh|en)/);
    return m ? m[1] : null;
  }
  function save(lang) {
    document.cookie = COOKIE + '=' + lang + ';path=/;max-age=31536000;samesite=lax';
  }

  var pageLang = (document.documentElement.lang || '').indexOf('en') === 0 ? 'en' : 'zh';
  var file = location.pathname.split('/').pop() || 'index.html';

  function hrefFor(lang) {
    if (lang === pageLang) return null;
    var base = lang === 'en' ? 'en/' + file : '../' + file;
    return base + location.search + location.hash;
  }

  // Header language switcher: remember the choice, then follow the link.
  document.addEventListener('click', function (e) {
    var sw = e.target.closest('[data-set-lang]');
    if (sw) save(sw.getAttribute('data-set-lang'));
  });

  var saved = getSaved();
  if (saved) {
    var target = hrefFor(saved);
    if (target) location.replace(target);
    return;
  }

  // First visit: ask.
  var overlay = document.createElement('div');
  overlay.className = 'lang-overlay';
  overlay.innerHTML =
    '<div class="lang-modal" role="dialog" aria-modal="true" aria-label="Choose a language">' +
      '<div class="lang-phi">Φ</div>' +
      '<div class="lang-title">选择语言 · Choose a Language</div>' +
      '<div class="lang-sub">您的选择将被记住 · Your choice will be remembered</div>' +
      '<div class="lang-opts">' +
        '<button type="button" class="lang-zh-btn" data-lang="zh">中文</button>' +
        '<button type="button" class="lang-en-btn" data-lang="en">English</button>' +
      '</div>' +
    '</div>';

  overlay.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-lang]');
    if (btn) {
      var lang = btn.getAttribute('data-lang');
      save(lang);
      var target = hrefFor(lang);
      if (target) location.href = target;
      else overlay.remove();
      return;
    }
    // Dismissing the backdrop keeps the current language.
    if (e.target === overlay) {
      save(pageLang);
      overlay.remove();
    }
  });

  document.addEventListener('keydown', function onEsc(e) {
    if (e.key === 'Escape' && overlay.parentNode) {
      save(pageLang);
      overlay.remove();
      document.removeEventListener('keydown', onEsc);
    }
  });

  document.body.appendChild(overlay);
})();
