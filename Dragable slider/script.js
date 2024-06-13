$(document).ready(function () {
      $(".testimonial-slider").owlCarousel({
            loop: true,
            margin: 20,
            nav: false,
            responsive: {
                  0: {
                        items: 1
                  },
                  600: {
                        items: 2
                  },
                  1000: {
                        items: 2
                  }
            }
      });

      $(".prevBtn").click(function () {
            $(".testimonial-slider").trigger('prev.owl.carousel');
      });

      $(".nextBtn").click(function () {
            $(".testimonial-slider").trigger('next.owl.carousel');
      });
});
