function nav() {
    $(document).ready(function() {
        // executes when HTML-Document is loaded and DOM is ready


        /*
        ################
        Add navbar background color when scrolled
        */
        $(window).scroll(function() {
            if ($(window).scrollTop() > 56) {
                $(".navbar").addClass("bg-dark shadow shrink");
            } else {
                $(".navbar").removeClass("bg-dark shadow shrink");
            }
        });
        // If Mobile, add background color when toggler is clicked
        $(".navbar-toggler").click(function() {
            if (!$(".navbar-collapse").hasClass("show")) {
                $(".navbar").addClass("bg-dark shadow");
            } else {
                if ($(window).scrollTop() < 56) {
                    $(".navbar").removeClass("bg-dark shadow");
                } else {}
            }
        });
        // ############

        // document ready
    });

    $('#carousel-example').on('slide.bs.carousel', function(e) {
        /*
            CC 2.0 License Iatek LLC 2018 - Attribution required
        */
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 5;
        var totalItems = $('.carousel-item').length;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i = 0; i < it; i++) {
                // append slides to end
                if (e.direction == "left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-inner');
                } else {
                    $('.carousel-item').eq(0).appendTo('.carousel-inner');
                }
            }
        }
    });
}