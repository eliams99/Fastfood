function setMenu() {
    setRestaurantSelect()
    restaurantSelected(document.getElementById("restaurantSelect"))
    showSuggestedDishes()
    if (sessionStorage.getItem("userType") == "ristoratore") {
        document.getElementById("addToCartButton").disabled = true      // Se sei un ristoratore non puoi aggiungere elementi al carrello
    } else {
        document.getElementById("addToCartButton").disabled = false
    }
}

function onSearchChanged() {
    clearCategories()
    let restaurantIndex = showCustomDishes(document.getElementById("restaurantSelect").value)
    showCommonDishes(restaurantIndex)
}

function setRestaurantSelect() {
    var customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti

    // Carica la select
    document.getElementById("restaurantSelect").disabled = false
    document.getElementById("restaurantSelect").innerHTML = ""
    for (var i = 0; i < customDishes.length; i++) {
        if (sessionStorage["cart"]) {   // Se c'√® il carrello significa che √® stato scelto un ristorante, quindi toglie la possibilit√† di cambiarlo ->
            if (customDishes[i].email == JSON.parse(sessionStorage.getItem("cart")).ristorante) {   // -> e aggiungere piatti di ristoranti diversi al carrello
                document.getElementById("restaurantSelect").innerHTML += "<option value='" + customDishes[i].email + "' selected> " + customDishes[i].nome + "</option>"
                disableRestaurantSelect()
            }
        } else if (customDishes[i].paniniPersonalizzati && customDishes[i].paniniPersonalizzati.length > 0
            || customDishes[i].paniniPersonalizzati && customDishes[i].paniniComuni.length > 0) {
            document.getElementById("restaurantSelect").innerHTML += "<option value='" + customDishes[i].email + "'> " + customDishes[i].nome + "</option>"
        }
    }
}

// Quando il ristorante viene selezionato, visualizza di conseguenza i panini che esso offre
function restaurantSelected(restaurant) {
    clearCategories()
    let restaurantIndex = showCustomDishes(restaurant.value)
    showCommonDishes(restaurantIndex)   // restaurantIndex serve per recuperare direttamente l'indice del ristorante senza fare di nuovo il ciclo per trovarlo
    showSuggestedDishes()
}

// Mostra i panini personalizzati del ristorante
function showCustomDishes(restaurantEmail) {
    let customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti
    let searchDish = document.getElementById("searchDishesInput").value.toLowerCase()
    for (var i = 0; i < customDishes.length; i++) {     // Scorre i ristoranti con panini personalizzati
        if (customDishes[i].email == restaurantEmail) {      // Se il risotrante √® quello selezionato, mostra i suoi panini personalizzati
            for (var j = 0; j < customDishes[i].paniniPersonalizzati.length; j++) {     // Scorre i panini personalizzati del determinato ristorante
                let lowerCaseDishName = customDishes[i].paniniPersonalizzati[j].nome.toLowerCase()
                if (searchDish == "" || lowerCaseDishName.includes(searchDish)) {   // Filtraggio in base a cosa √® stato inserito nel box di ricerca del panino
                    document.getElementById(customDishes[i].paniniPersonalizzati[j].tipologia).innerHTML += '<div class="card col-" data-toggle="modal" data-target="#modal" onclick="modalClicked(this)" >'
                        + '<input type="hidden" id="dishName" value="' + customDishes[i].paniniPersonalizzati[j].nome + '">'
                        + '<div class="card-body">'
                        + ' <img src="' + customDishes[i].paniniPersonalizzati[j].immagine + '" class="card-img-top" alt="...">'
                        + ' <div href="#" class="discover"><i class="fas fa-plus fa-3x"></i></div>'
                        + ' <h5 class="card-title">' + customDishes[i].paniniPersonalizzati[j].nome + '</h5>'
                        + ' <p class="card-text">' + customDishes[i].paniniPersonalizzati[j].descrizione + '</p>'
                        + '</div> </div>'
                    document.getElementById("restaurantEmail").value = restaurantEmail   // Serve per recuperare il ristorante nel carrello e calcolare la posizione
                }
            }
            return i
        }
    }
}

// Toglie i panini dalle relative sezioni in modo da non aggiungerli a quelli precedenti
function clearCategories() {
    document.getElementById("Panini").innerHTML = ""
    document.getElementById("Snack").innerHTML = ""
    document.getElementById("Dessert").innerHTML = ""
    document.getElementById("Bevande").innerHTML = ""
}

function showCommonDishes(restaurantIndex) {
    let commonDishes = JSON.parse(localStorage.getItem("data")).panini.comuni
    let searchDish = document.getElementById("searchDishesInput").value.toLowerCase()
    for (var i = 0; i < commonDishes.length; i++) {
        let lowerCaseDishName = commonDishes[i].nome.toLowerCase()
        if (isDishAvailable(restaurantIndex, commonDishes[i].nome) &&           // Se il piatto √® offerto dal ristorante e se il nome del panino
            (searchDish == "" || lowerCaseDishName.includes(searchDish))) {     // corrisponde a quello inserito nel box di ricerca del panino
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
}

// Ritorna true se il ristorante offre quel panino
function isDishAvailable(restaurantIndex, dishName) {
    var commonDishesAvailable = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti[restaurantIndex].paniniComuni
    for (var i = 0; i < commonDishesAvailable.length; i++) {     // Scorre i ristoranti con panini personalizzati
        if (commonDishesAvailable[i].nome == dishName) {
            return true
        }
    }
    return false
}

// Mostra nel carousel i piatti suggeriti
function showSuggestedDishes() {
    document.getElementById("slideshowDiv").innerHTML = ""
    document.getElementById("carouselIndicators").innerHTML = ""
    var commonDishes = getSuggestedDishes()     // Ottiene i piatti suggeriti
    for (var i = 0; i < commonDishes.length; i++) {
        let image
        if (commonDishes[i].immagine == undefined) {
            image = '../img/' + commonDishes[i].nome.split(' ').join('') + '.png'
        } else {
            image = commonDishes[i].immagine
        }
        if (i == 0) {       // Se √® il primo elemento lo setto come active
            document.getElementById("slideshowDiv").innerHTML += '<div class="carousel-item active" data-toggle="modal" data-target="#modal" onClick="modalClicked(this)">'
                + '<input type="hidden" id="dishName" value="' + commonDishes[i].nome + '">'
                + '    <img class="d-block mx-auto my-4 mb-5" src="' + image + '" alt="' + commonDishes[i].nome + '">'
                + '    <div class="carousel-caption d-none d-md-block">'
                + '    <h5>' + commonDishes[i].nome + '</h5> <p>' + commonDishes[i].descrizione + '</p> </div></div>'
            document.getElementById("carouselIndicators").innerHTML += '<li data-target="#demo" data-slide-to="' + i + '" class="active" role="button"></li>'
            document.getElementById("prevA").style.visibility = "hidden"
            document.getElementById("nextA").style.visibility = "hidden"
        } else {            // Altrimenti
            document.getElementById("slideshowDiv").innerHTML += '<div class="carousel-item" data-toggle="modal" data-target="#modal" onClick="modalClicked(this)">'
                + '<input type="hidden" id="dishName" value="' + commonDishes[i].nome + '">'
                + '    <img class="d-block mx-auto my-4 mb-5" src="' + image + '" alt="' + commonDishes[i].nome + '">'
                + '    <div class="carousel-caption d-none d-md-block">'
                + '    <h5>' + commonDishes[i].nome + '</h5> <p>' + commonDishes[i].descrizione + '</p> </div></div>'
            document.getElementById("carouselIndicators").innerHTML += '<li data-target="#demo" data-slide-to="' + i + '" role="button"></li>'
            document.getElementById("prevA").style.visibility = "visible"
            document.getElementById("nextA").style.visibility = "visible"
        }
    }
}

// Ritorna i piatti suggeriti in base alla preferenza sul tipo di carne dell'utente loggato
function getSuggestedDishes() {
    let userType = sessionStorage.getItem("userType")

    if (sessionStorage["actualUser"] && userType == "cliente") {     // Se l'utente √® un cliente ed √® loggato personalizza la lista di piatti
        let meatPreference = JSON.parse(sessionStorage.getItem("actualUser")).prefCibo
        let dishes = getAllDishes()
        let favDishes = new Array()
        for (let i = 0; i < dishes.length; i++) {
            if (dishes[i].tipoCarne == meatPreference) {        // Se il piatto corrisponde alla preferenza dell'utente, lo aggiunge ai piatti da restituire
                favDishes.push(dishes[i])
            }
        }
        return favDishes
    } else {                                // Altrimenti, mostra panini a caso
        return JSON.parse(localStorage.getItem("data")).panini.comuni.slice(0, 3)
    }
}

// Ritorna in un unico array tutti i panini comuni pi√Ļ i panini personalizzati del ristorante attualmente loggato
function getAllDishes() {
    let dishes = JSON.parse(localStorage.getItem("data")).panini
    let commonDishes = dishes.comuni
    let restDishes = dishes.paniniRistoranti

    for (let i = 0; i < restDishes.length; i++) {
        if (restDishes[i].email == document.getElementById("restaurantSelect").value) {
            for (let j = 0; j < restDishes[i].paniniPersonalizzati.length; j++) {
                commonDishes.push(restDishes[i].paniniPersonalizzati[j])
            }
        }
    }
    return commonDishes
}

// Riempie i modal con i dati relativi al piatto che √® stato cliccato. Prende il nome del piatto e cerca tra tutti i piatti quel piatto
function modalClicked(dish) {
    // Cerca tra i panini comuni
    var commonDishes = JSON.parse(localStorage.getItem("data")).panini.comuni
    for (var i = 0; i < commonDishes.length; i++) {
        if (commonDishes[i].nome == dish.firstChild.value) {    // Se il nome corrisponde a quello dell'input hidden (che √® il firstChild)
            document.getElementById("modalName").innerHTML = commonDishes[i].nome
            document.getElementById("modalDescription").innerHTML = commonDishes[i].descrizione
            document.getElementById("modalPrice").innerHTML = "‚ā¨ " + commonDishes[i].prezzo
            document.getElementById("modalImg").src = "../img/" + commonDishes[i].nome.split(' ').join('') + ".png"
            document.getElementById("quantityInput").value = "1"
        }
    }
    // Cerca tra i panini personalizzti
    var customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti
    for (var i = 0; i < customDishes.length; i++) {
        if (customDishes[i].email == document.getElementById("restaurantSelect").value) {
            for (var j = 0; j < customDishes[i].paniniPersonalizzati.length; j++) {
                if (customDishes[i].paniniPersonalizzati[j].nome == dish.firstChild.value) {    // Se il nome corrisponde a quello dell'input hidden
                    document.getElementById("modalName").innerHTML = customDishes[i].paniniPersonalizzati[j].nome
                    document.getElementById("modalDescription").innerHTML = customDishes[i].paniniPersonalizzati[j].descrizione
                    document.getElementById("modalPrice").innerHTML = "‚ā¨ " + customDishes[i].paniniPersonalizzati[j].prezzo
                    document.getElementById("modalImg").src = customDishes[i].paniniPersonalizzati[j].immagine
                    document.getElementById("quantityInput").value = "1"
                }
            }
        }
    }
}