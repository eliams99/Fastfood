function showDot() {
    if (sessionStorage["cart"]) {
        var totalQuantity = JSON.parse(sessionStorage.getItem("cart")).quantitàTotale
        if (totalQuantity > 0) {
            document.getElementById("dot").style.visibility = "visible"
            document.getElementById("dot").innerHTML = totalQuantity
        }
    }
}

function nav() {
    $(document).ready(function () {
        // executes when HTML-Document is loaded and DOM is ready

        // Add navbar background color when scrolled
        $(window).scroll(function () {
            if ($(window).scrollTop() > 56) {
                $(".navbar").addClass("shadow shrink")
                $(".navbar").addClass("navbar-dark")
                $(".navbar").css("backdrop-filter", "blur(15px)")
                $(".navbar").css("background-color", "rgba(66, 66, 66, 0.5)")
            } else {
                $(".navbar").removeClass("shadow shrink")
                $(".navbar").removeClass("navbar-dark")
                $(".navbar").css("backdrop-filter", "")
                $(".navbar").css("background-color", "")
            }
        });
        // If Mobile, add background color when toggler is clicked
        $(".navbar-toggler").click(function () {
            if (!$(".navbar-collapse").hasClass("show")) {
                $(".navbar").addClass("bg-dark shadow")
                $(".navbar").addClass("navbar-dark")
                $(".navbar").css("backdrop-filter", "blur(15px)")
                $(".navbar").css("background-color", "rgba(66, 66, 66, 0.5)")
            } else if ($(window).scrollTop() < 56) {
                $(".navbar").removeClass("bg-dark shadow")
                $(".navbar").removeClass("navbar-dark")
                $(".navbar").css("backdrop-filter", "")
                $(".navbar").css("background-color", "")
            }
        });
    });
}