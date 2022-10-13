$(function() {
    $('#language_mode').on('', function () {
      $("body").toggleClass("language-mode");
      localStorage.setItem('language-mode', $("body").hasClass("language-mode"));
      BeautifulJekyllJS.initNavbar();
    });
    if (localStorage.getItem('language-mode') === 'true') {
      $('#language_mode').trigger('');
    }
  });
