"use strict";

/*-----------------------------------------------
|   On page scroll for #id targets
-----------------------------------------------*/
$(document).ready(function ($) {
  $('a[data-fancyscroll]').click(function scrollTo(e) {
    // const $this = $(e.currentTarget);
    var $this = $(this);

    if (window.location.pathname === $this[0].pathname && window.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && window.location.hostname === this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - ($this.data('offset') || 0)
        }, 400, 'swing', function () {
          var hash = $this.attr('href');
          window.history.pushState ? window.history.pushState(null, null, hash) : window.location.hash = hash;
        });
        return false;
      }
    }

    return true;
  });
  var hash = window.location.hash;

  if (hash && document.getElementById(hash.slice(1))) {
    var $this = $(hash);
    $('html,body').animate({
      scrollTop: $this.offset().top - $("a[href='" + hash + "']").data('offset')
    }, 400, 'swing', function () {
      window.history.pushState ? window.history.pushState(null, null, hash) : window.location.hash = hash;
    });
  }
});