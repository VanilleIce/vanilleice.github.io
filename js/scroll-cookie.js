$(document).ready(function () {
  const rpath = window.location.pathname + window.location.search;
  const cookieName = 'scroll-cookie';

  // Scroll-Position speichern (mit Delay)
  let scrollTimeout;
  $(window).on('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollPos = $(window).scrollTop();
      Cookies.set(cookieName, `${scrollPos}|${rpath}`, {
        expires: 365,
        path: '',
      });
    }, 250);
  });

  // Scroll-Position wiederherstellen (nur wenn Pfad passt)
  const cookieVal = Cookies.get(cookieName);
  if (cookieVal) {
    const [savedPos, savedPath] = cookieVal.split('|');
    if (savedPath === rpath && !isNaN(savedPos)) {
      $(window).scrollTop(parseInt(savedPos, 10));
    }
  }
});
