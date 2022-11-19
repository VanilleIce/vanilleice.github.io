$(function() {
    $('#change-skin').on('click', function () {
      $("nav").toggleClass("page-dark-mode");
      localStorage.setItem('bj-dark-mode', $("nav").hasClass("page-dark-mode"));
      BeautifulJekyllJS.initNavbar();
    });
    if (localStorage.getItem('bj-dark-mode') === 'true') {
      $('#change-skin').trigger('click');
    }
  });
