function nav() {
    $(document).ready(function() {
        // executes when HTML-Document is loaded and DOM is ready


        /*
        ################
        Add navbar background color when scrolled
        */
        $(window).scroll(function() {
            if ($(window).scrollTop() > 56) {
                $(".navbar").addClass("bg-dark shadow");
            } else {
                $(".navbar").removeClass("bg-dark shadow");
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
}