"use strict";

/*-----------------------------------------------
|   On page scroll for #id targets
-----------------------------------------------*/
$(document).ready(function ($) {
  var _window = window,
      location = _window.location,
      history = _window.history;
  $('a[data-fancyscroll]').click(function scrollTo(e) {
    var _this = this;

    var $this = $(this);
    var pathname = location.pathname,
        hostname = location.hostname;

    var condition = function condition() {
      var condition1 = pathname === $this[0].pathname;

      var condition2 = pathname.replace(/^\//, '') === _this.pathname.replace(/^\//, '');

      var condition3 = hostname === _this.hostname;
      return condition1 && condition2 && condition3;
    };

    if (condition()) {
      e.preventDefault();
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - ($this.data('offset') || 0)
        }, 400, 'swing', function () {
          var hash = $this.attr('href');
          history.pushState ? history.pushState(null, null, hash) : location.hash = hash;
        });
        return false;
      }
    }

    return true;
  });
  var hash = location.hash;

  if (hash && document.getElementById(hash.slice(1))) {
    var $this = $(hash);
    $('html,body').animate({
      scrollTop: $this.offset().top - $("a[href='" + hash + "']").data('offset')
    }, 400, 'swing', function () {
      history.pushState ? history.pushState(null, null, hash) : location.hash = hash;
    });
  }
});