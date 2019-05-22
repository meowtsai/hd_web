if ($("#back-to-top").length) {
  var scrollTrigger = 600, // px
    backToTop = function() {
      var scrollTop = $(window).scrollTop();
      if (scrollTop > scrollTrigger) {
        $("#back-to-top").fadeIn();
      } else {
        $("#back-to-top").fadeOut();
      }
    };
  backToTop();
  $(window).on("scroll", function() {
    backToTop();
  });
  $("#back-to-top").on("click", function(e) {
    e.preventDefault();
    $("html,body").animate(
      {
        scrollTop: 0
      },
      700
    );
  });
}
