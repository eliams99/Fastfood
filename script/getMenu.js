function getDishes() {
    var commonDishes = JSON.parse(localStorage.getItem("data")).panini.comuni
    for (var i = 0; i < commonDishes.length; i++) {
        document.getElementById(commonDishes[i].tipologia).innerHTML +=
        '<div class="card col-" style="width: 18rem;" data-toggle="modal" data-target="#modal" onclick="modalClicked(this)" >'
        + ' <input type="hidden" id="dishName" value="' + commonDishes[i].nome + '">'
        + ' <img src="../img/' + commonDishes[i].nome.split(' ').join('') + '.png" class="img-fluid card-img-top" alt="...">'
        + ' <div href="#" class="discover"><i class="fas fa-plus fa-3x"></i></div>'
        + ' <div class="card-body">'
        + '     <h5 class="card-title">' + commonDishes[i].nome + '</h5>'
        + '     <p class="card-text">' + commonDishes[i].descrizione + '</p>'
        + '</div> </div>'
    }

    var customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti
    for (var i = 0; i < customDishes.length; i++) {
        document.getElementById("restaurantSelect").innerHTML += "<option value='" + customDishes[i].email + "'> " + customDishes[i].nome + "</option>"
    }
}

function restaurantSelected(restaurant) {
    var customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti
    for (var i = 0; i < customDishes.length; i++) {
        if (customDishes[i].email == restaurant.value) {
            for (var j = 0; i < customDishes[i].paniniPersonalizzati.length; j++) {
                document.getElementById("speciali").innerHTML +=
                '<div class="card col-" style="width: 18rem;" data-toggle="modal" data-target="#modal1" onclick="modalClicked(this)" >'
                + ' <input type="hidden" id="dishName" value="' + customDishes[i].paniniPersonalizzati[j].nome + '">'
                + ' <img src="../img/' + customDishes[i].paniniPersonalizzati[j].nome.split(' ').join('') + '.png" class="img-fluid card-img-top" alt="...">'
                + ' <div href="#" class="discover"><i class="fas fa-plus fa-3x"></i></div>'
                + ' <div class="card-body">'
                + '     <h5 class="card-title">' + customDishes[i].paniniPersonalizzati[j].nome + '</h5>'
                + '     <p class="card-text">' + customDishes[i].paniniPersonalizzati[j].descrizione + '</p>'
                + '</div> </div>'
            }
        }
    }
}

function modalClicked(dish) {
    var commonDishes = JSON.parse(localStorage.getItem("data")).panini.comuni
    for (var i = 0; i < commonDishes.length; i++) {
        if (commonDishes[i].nome == dish.firstChild.nextSibling.value) {
            document.getElementById("modalName").innerHTML = commonDishes[i].nome
            document.getElementById("modalDescription").innerHTML = commonDishes[i].descrizione
            document.getElementById("modalPrice").innerHTML = "€ " + commonDishes[i].prezzo
            document.getElementById("modalImg").src = "../img/" + commonDishes[i].nome.split(' ').join('') +".png"
        }
    }
}