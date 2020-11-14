var restaurant

function setMenu() {
    setRestaurantSelect()
    restaurantSelected(document.getElementById("restaurantSelect"))
    getSuggestedDishes()
}

function setRestaurantSelect() {
    var customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti
    for (var i = 0; i < customDishes.length; i++) {
        if (customDishes[i].paniniPersonalizzati && customDishes[i].paniniPersonalizzati.length > 0) {
            document.getElementById("restaurantSelect").innerHTML += "<option value='" + customDishes[i].email + "'> " + customDishes[i].nome + "</option>"
        }
    }
}

// Quando il ristorante viene selezionato, visualizza di conseguenza i panini che esso offre
function restaurantSelected(restaurantName) {
    showCustomDishes(restaurantName.value)
    showCommonDishes()
}

function showCustomDishes(restaurant) {
    document.getElementById("speciali").innerHTML = ""
    var customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti
    for (var i = 0; i < customDishes.length; i++) {     // Scorre i ristoranti con panini personalizzati
        if (customDishes[i].email == restaurant) {      // Se il risotrante è quello selezionato, mostra i suoi panini personalizzati
            for (var j = 0; j < customDishes[i].paniniPersonalizzati.length; j++) {     // Scorre i panini personalizzati del determinato ristorante
                document.getElementById("speciali").innerHTML +=
                    '<div class="card col-" data-toggle="modal" data-target="#modal" onclick="modalClicked(this)" >'
                    + '<input type="hidden" id="dishName" value="' + customDishes[i].paniniPersonalizzati[j].nome + '">'
                    + '<div class="card-body">'
                    + ' <img src="../img/' + customDishes[i].paniniPersonalizzati[j].nome.split(' ').join('') + '.png" class="img-fluid card-img-top" alt="...">'
                    + ' <div href="#" class="discover"><i class="fas fa-plus fa-3x"></i></div>'
                    + ' <h5 class="card-title">' + customDishes[i].paniniPersonalizzati[j].nome + '</h5>'
                    + ' <p class="card-text">' + customDishes[i].paniniPersonalizzati[j].descrizione + '</p>'
                    + '</div> </div>'
                document.getElementById("restaurantEmail").value = restaurant   // Serve per recuperare il ristorante nel carrello e calcolare la posizione
            }
        }
    }
}

// TODO: Mostrare solo i piatti che il ristorante selezionato offre
function showCommonDishes() {
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
}

function getSuggestedDishes() {
    var commonDishes = JSON.parse(localStorage.getItem("data")).panini.comuni
    for (var i = 0; i < 3; i++) {   // TODO: fare algoritmo che mostri i suggeriti
        if (i == 0) {
            document.getElementById("slideshowDiv").innerHTML += '<div class="carousel-item active" data-toggle="modal" data-target="#modal" onClick="modalClicked(this)">'
                + '<input type="hidden" id="dishName" value="' + commonDishes[i].nome + '">'
                + '    <img class="d-block mx-auto my-4 mb-5" src="../img/' + commonDishes[i].nome.split(' ').join('') + '.png" alt="' + commonDishes[i].nome + '">'
                + '    <div class="carousel-caption d-none d-md-block">'
                + '    <h5>' + commonDishes[i].nome + '</h5> <p>' + commonDishes[i].descrizione + '</p> </div></div>'
        } else {
            document.getElementById("slideshowDiv").innerHTML += '<div class="carousel-item" data-toggle="modal" data-target="#modal" onClick="modalClicked(this)">'
                + '<input type="hidden" id="dishName" value="' + commonDishes[i].nome + '">'
                + '    <img class="d-block mx-auto my-4 mb-5" src="../img/' + commonDishes[i].nome.split(' ').join('') + '.png" alt="' + commonDishes[i].nome + '">'
                + '    <div class="carousel-caption d-none d-md-block">'
                + '    <h5>' + commonDishes[i].nome + '</h5> <p>' + commonDishes[i].descrizione + '</p> </div></div>'
        }
    }
}

// Riempie i modal con i dati relativi al piatto che è stato cliccato. Prende il nome del piatto e cerca tra tutti i piatti quel piatto
function modalClicked(dish) {
    // Cerca tra i panini comuni
    var commonDishes = JSON.parse(localStorage.getItem("data")).panini.comuni
    for (var i = 0; i < commonDishes.length; i++) {
        if (commonDishes[i].nome == dish.firstChild.value) {    // Se il nome corrisponde a quello dell'input hidden (che è il firstChild)
            document.getElementById("modalName").innerHTML = commonDishes[i].nome
            document.getElementById("modalDescription").innerHTML = commonDishes[i].descrizione
            document.getElementById("modalPrice").innerHTML = "€ " + commonDishes[i].prezzo
            document.getElementById("modalImg").src = "../img/" + commonDishes[i].nome.split(' ').join('') + ".png"
            document.getElementById("quantityInput").value = "1"
        }
    }
    // Cerca tra i panini personalizzti
    var customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti
    for (var i = 0; i < customDishes.length; i++) {
        if (customDishes[i].email == restaurant) {
            for (var j = 0; j < customDishes[i].paniniPersonalizzati.length; j++) {
                if (customDishes[i].paniniPersonalizzati[j].nome == dish.firstChild.value) {    // Se il nome corrisponde a quello dell'input hidden
                    document.getElementById("modalName").innerHTML = customDishes[i].paniniPersonalizzati[j].nome
                    document.getElementById("modalDescription").innerHTML = customDishes[i].paniniPersonalizzati[j].descrizione
                    document.getElementById("modalPrice").innerHTML = "€ " + customDishes[i].paniniPersonalizzati[j].prezzo
                    document.getElementById("modalImg").src = "../img/" + customDishes[i].paniniPersonalizzati[j].nome.split(' ').join('') + ".png"
                    document.getElementById("quantityInput").value = "1"
                }
            }
        }
    }
}