var restaurant

function getDishes() {
    var commonDishes = JSON.parse(localStorage.getItem("data")).panini.comuni
    for (var i = 0; i < commonDishes.length; i++) {
        document.getElementById(commonDishes[i].tipologia).innerHTML +=
        '<div class="card col-" data-toggle="modal" data-target="#modal" onclick="modalClicked(this)" >'
        + '<input type="hidden" id="dishName" value="' + commonDishes[i].nome + '">'
        + '<div class="card-body">'
        + ' <img src="../img/' + commonDishes[i].nome.split(' ').join('') + '.png" class="img-fluid card-img-top" alt="...">'
        + ' <div href="#" class="discover"><i class="fas fa-plus fa-3x"></i></div>'
        + ' <h5 class="card-title">' + commonDishes[i].nome + '</h5>'
        + ' <p class="card-text">' + commonDishes[i].descrizione + '</p>'
        + '</div> </div>'
    }

    var customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti
    for (var i = 0; i < customDishes.length; i++) {
        if (customDishes[i].paniniPersonalizzati && customDishes[i].paniniPersonalizzati.length > 0) {
            document.getElementById("restaurantSelect").innerHTML += "<option value='" + customDishes[i].email + "'> " + customDishes[i].nome + "</option>"
        }
    }
}

function getSuggestedDishes() {
    var commonDishes = JSON.parse(localStorage.getItem("data")).panini.comuni
    for (var i = 0; i < 3; i++) {   // TODO: fare algoritmo che mostri i suggeriti
        document.getElementById("suggestedDishesDiv").innerHTML +=
        '<div class="col-md-6 col-lg-4" data-toggle="modal" data-target="#modal" onClick="modalClicked(this)">'
        + '<input type="hidden" id="dishName" value="' + commonDishes[i].nome + '">'
        + '<div class="portfolio-item mx-auto">'
        + '     <img src="../img/' + commonDishes[i].nome.split(' ').join('') + '.png" class="img-fluid card-img-top" alt="...">'
        + '</div>'
        + '</div>'
    }
}

function restaurantSelected(restaurantName) {
    document.getElementById("speciali").innerHTML = ""

    restaurant = restaurantName.value
    var customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti
    for (var i = 0; i < customDishes.length; i++) {
        if (customDishes[i].email == restaurant) {
            for (var j = 0; j < customDishes[i].paniniPersonalizzati.length; j++) {
                document.getElementById("speciali").innerHTML +=
                '<div class="card col-" data-toggle="modal" data-target="#modal" onclick="modalClicked(this)" >'
                + '<input type="hidden" id="dishName" value="' + customDishes[i].paniniPersonalizzati[j].nome + '">'
                + '<div class="card-body">'
                + ' <img src="../img/' + customDishes[i].paniniPersonalizzati[j].nome.split(' ').join('') + '.png" class="img-fluid card-img-top" alt="...">'
                + ' <div href="#" class="discover"><i class="fas fa-plus fa-3x"></i></div>'
                + ' <h5 class="card-title">' + customDishes[i].paniniPersonalizzati[j].nome + '</h5>'
                + ' <p class="card-text">' + customDishes[i].paniniPersonalizzati[j].descrizione + '</p>'
                + '</div> </div>'
            }
        }
    }
}

function modalClicked(dish) {
    var commonDishes = JSON.parse(localStorage.getItem("data")).panini.comuni
    for (var i = 0; i < commonDishes.length; i++) {
        if (commonDishes[i].nome == dish.firstChild.value) {
            document.getElementById("modalName").innerHTML = commonDishes[i].nome
            document.getElementById("modalDescription").innerHTML = commonDishes[i].descrizione
            document.getElementById("modalPrice").innerHTML = "€ " + commonDishes[i].prezzo
            document.getElementById("modalImg").src = "../img/" + commonDishes[i].nome.split(' ').join('') +".png"
            document.getElementById("quantityInput").value = "1"
        }
    }
    var customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti
    for (var i = 0; i < customDishes.length; i++) {
        if (customDishes[i].email == restaurant) {
            console.log(customDishes[i].nome)
            for (var j = 0; j < customDishes[i].paniniPersonalizzati.length; j++) {
                if (customDishes[i].paniniPersonalizzati[j].nome == dish.firstChild.value) {
                    document.getElementById("modalName").innerHTML = customDishes[i].paniniPersonalizzati[j].nome
                    document.getElementById("modalDescription").innerHTML = customDishes[i].paniniPersonalizzati[j].descrizione
                    document.getElementById("modalPrice").innerHTML = "€ " + customDishes[i].paniniPersonalizzati[j].prezzo
                    document.getElementById("modalImg").src = "../img/" + customDishes[i].paniniPersonalizzati[j].nome.split(' ').join('') +".png"
                    document.getElementById("quantityInput").value = "1"
                }
            }
        }
    }
}