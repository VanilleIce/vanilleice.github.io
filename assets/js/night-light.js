$(function() {
    $('#change-skin').on('click', function () {
      $("body").toggleClass("page-dark-mode");
      localStorage.setItem('bj-dark-mode', $("body").hasClass("page-dark-mode"));
      BeautifulJekyllJS.initNavbar();
    });
    if (localStorage.getItem('bj-dark-mode') === 'true') {
      $('#change-skin').trigger('click');
    }
  });

$(function() {
    $('#change-language').on('click', function () {
      $("body").toggleClass("page-language-mode");
      localStorage.setItem('mode-language', $("body").hasClass("page-language-mode"));
      BeautifulJekyllJS.initNavbar();
    });
    if (localStorage.getItem('mode-language') === 'true') {
      $('#change-language').trigger('click');
    }
  });
