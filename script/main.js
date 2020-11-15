function showDot() {
    if (sessionStorage["cart"]) {
        var totalQuantity = JSON.parse(sessionStorage.getItem("cart")).quantitàTotale
        if (totalQuantity > 0) {
            document.getElementById("dot").style.visibility = "visible"
            document.getElementById("dot").innerHTML = totalQuantity
        }
    }
}

function setMeatTypeSelect(id, selectedValue) {
    var meatTypes = JSON.parse(localStorage.getItem("data")).panini.tipoCarne
    for (let i = 0; i < meatTypes.length; i++) {
        if (meatTypes[i] == selectedValue) {
            document.getElementById(id).innerHTML += "<option value='" + meatTypes[i] + "' selected> " + meatTypes[i] + "</option>"
        } else {
            document.getElementById(id).innerHTML += "<option value='" + meatTypes[i] + "'> " + meatTypes[i] + "</option>"
        }
    }
}

// Rimpicciolisce la navbar quando si scrolla e cambia di conseguenza colore, ombra e trasparenza
function nav() {
    $(document).ready(function () {
        // executes when HTML-Document is loaded and DOM is ready

        // Add navbar background color when scrolled
        $(window).scroll(function () {
            if ($(window).scrollTop() > 56) {
                if ($(".navbar").attr("id") == "indexNavbar") {     // Nell'index la nav ha testo bianco
                    $(".navbar").addClass("navbar-dark")
                } else {
                    $(".navbar").addClass("navbar-light")
                }
                $(".navbar").addClass("shadow shrink")
                $(".navbar").css("backdrop-filter", "blur(15px)")
                $(".navbar").css("background-color", "rgba(66, 66, 66, 0.5)")
            } else {
                if ($(".navbar").attr("id") == "indexNavbar") {     // Nell'index la nav ha testo bianco
                    $(".navbar").removeClass("navbar-dark")
                } else {
                    $(".navbar").removeClass("navbar-light")
                }
                $(".navbar").removeClass("shadow shrink")
                $(".navbar").css("backdrop-filter", "")
                $(".navbar").css("background-color", "")
            }
        });
        // If Mobile, add background color when toggler is clicked
        $(".navbar-toggler").click(function () {
            if (!$(".navbar-collapse").hasClass("show")) {
                if ($(".navbar").attr("id") == "indexNavbar") {
                    $(".navbar").addClass("navbar-dark")
                } else {
                    $(".navbar").addClass("navbar-light")
                }
                $(".navbar").addClass("bg-dark shadow")
                $(".navbar").css("backdrop-filter", "blur(15px)")
                $(".navbar").css("background-color", "rgba(66, 66, 66, 0.5)")
            } else if ($(window).scrollTop() < 56) {
                if ($(".navbar").attr("id") == "indexNavbar") {     // Nell'index la nav ha testo bianco
                    $(".navbar").removeClass("navbar-dark")
                } else {
                    $(".navbar").removeClass("navbar-light")
                }
                $(".navbar").removeClass("bg-dark shadow")
                $(".navbar").css("backdrop-filter", "")
                $(".navbar").css("background-color", "")
            }
        });
    });
}