$(document).ready(function () {
  const $footer = $('#footer');
  const $container = $('.container');

  function updateFooterPosition() {
    const extraHeight = $footer.data('fixed') ? $footer.outerHeight(true) : 0;
    const totalHeight = $container.outerHeight(true) + extraHeight;

    if (totalHeight < window.innerHeight) {
      $footer
        .css({ position: 'fixed', bottom: 0, left: 0, right: 0 })
        .data('fixed', true);
    } else {
      $footer
        .removeAttr('style')
        .removeData('fixed');
    }
  }

  updateFooterPosition();
//  $(window).on('resize scroll', updateFooterPosition);
});
