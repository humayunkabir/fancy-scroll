/*-----------------------------------------------
|   On page scroll for #id targets
-----------------------------------------------*/
$(document).ready(($) => {
  const { location, history } = window;
  
  $('a[data-fancyscroll]')
    .click(function scrollTo(e) {
      const $this = $(this);
      const { pathname, hostname } = location;
      const condition = pathname === $this[0].pathname && pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && hostname === this.hostname;
      if (condition) {
        e.preventDefault();
        let target = $(this.hash);
        target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
        if (target.length) {
          $('html,body')
            .animate({
              scrollTop: (target.offset().top - ($this.data('offset') || 0)),
            }, 400, 'swing', () => {
              const hash = $this.attr('href');
              history.pushState ?
                history.pushState(null, null, hash) : location.hash = hash;
            });
          return false;
        }
      }
      return true;
    });

  let { hash } = location;

  if (hash && document.getElementById(hash.slice(1))) {
    let $this = $(hash);
    $('html,body')
      .animate({
        scrollTop: $this.offset().top - $(`a[href='${hash}']`)
          .data('offset'),
      }, 400, 'swing', () => {
        history.pushState ?
          history.pushState(null, null, hash) : location.hash = hash;
      });
  }
});