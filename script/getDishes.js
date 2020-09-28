
data = JSON.parse(localStorage.getItem("data"))
showCommonDishes(data.panini.paniniRistoranti, data.panini)
showCustomDishes(data.panini.paniniRistoranti)

function showCommonDishes(restaurateur, allDishes) {
    var i = findRestaurant(restaurateur)
    var dish = allDishes.comuni
    // Scorre tutti i panini comuni
    for (var j = 0; j < dish.length; j++) {
        var dishList = '<li href="#" class="list-group-item">' + '<div class="form-check form-check-inline mt-0">'
        var dishFound = false
        if (i) {
            // Scorre i panini comuni del ristorante
            selectedDishes = restaurateur[i].paniniComuni
            for (var a = 0; a < selectedDishes.length; a++) {
                if (dish[j].nome == selectedDishes[a].nome) {
                    dishList += '<input class="form-check-input" type="checkbox" name="dishCheckbox" value="'
                        + dish[j].nome + '" checked>'
                    dishFound = true
                }
            }
        }
        if (!dishFound) {
            dishList += '<input class="form-check-input" type="checkbox" name="dishCheckbox" value="'
                + dish[j].nome + '">'
        }
        dishList += '<label class="form-check-label mx-2">'
            + dish[j].nome + '</label></div></li>'
        document.getElementById("commonDishes").innerHTML += dishList
    }
    setHiddenValues()
}

function findRestaurant(restaurateur) {
    // Scorre i ristoranti
    for (var i = 0; i < restaurateur.length; i++) {
        // Se il ristorante corrisponde all'utente che ha fatto l'accesso
        if (restaurateur[i].email == JSON.parse(sessionStorage.getItem('actualUser')).email) {
            return i
        }
    }
    return false
}

function setHiddenValues() {
    document.getElementById("commonDishes").innerHTML += '<input type="hidden" name="restaurantEmail" value="' +
        JSON.parse(sessionStorage.getItem('actualUser')).email + '"/>' +
        '<input type="hidden" name="restaurantName" value="' +
        JSON.parse(sessionStorage.getItem('actualUser')).nome + '"/>'
    document.getElementById("addForm").innerHTML += '<input type="hidden" name="restaurantEmail" value="' +
        JSON.parse(sessionStorage.getItem('actualUser')).email + '"/>' +
        '<input type="hidden" name="restaurantName" value="' +
        JSON.parse(sessionStorage.getItem('actualUser')).nome + '"/>'
    document.getElementById("editForm").innerHTML += '<input type="hidden" name="restaurantEmail" value="' +
        JSON.parse(sessionStorage.getItem('actualUser')).email + '"/>' +
        '<input type="hidden" name="restaurantName" value="' +
        JSON.parse(sessionStorage.getItem('actualUser')).nome + '"/>'
}

function showCustomDishes(restaurants) {
    // Scorre i ristoranti
    for (var j = 0; j < restaurants.length; j++) {
        if (restaurants[j].email == JSON.parse(sessionStorage.getItem('actualUser')).email) {
            var customDish = restaurants[j].paniniPersonalizzati
            // Scorre i panini personalizzati del ristorante
            for (var i = 0; i < customDish.length; i++) {
                document.getElementById("customizedDishes").innerHTML += '<li href="#" class="list-group-item">' +
                    '<label class="form-check-label mx-2">' + customDish[i].nome + '</label>' +
                    '<button class="btn btn-danger mx-1 float-right" type="button" onClick="deleteButtonClicked(this)" name="delete" value="delete">' +
                    '   <i class="fas fa-trash-alt fa-fw"></i> Elimina ' +
                    '</button>' +
                    '<button class="btn btn-secondary mx-1 float-right" type="button" onClick="editButtonClicked(this)" data-toggle="modal" data-target="#editDishModal" name="edit[]" value="' + customDish[i].nome + '">' +
                    '   <i class="fas fa-edit fa-fw"></i> Modifica ' +
                    '   </button>' +
                    '<input type="hidden" name="deleteValue[]" value="delete"/>' +
                    '</li>'
            }
            document.getElementById("customizedDishes").innerHTML += '<input type="hidden" name="restaurantEmail" value="' +
                JSON.parse(sessionStorage.getItem('actualUser')).email + '">' +
                '<input type="hidden" name="restaurantName" value="' +
                JSON.parse(sessionStorage.getItem('actualUser')).nome + '">'
        }
    }
}

function deleteButtonClicked(button) {
    if (button.value == "undo") {
        button.innerHTML = "<i class='fas fa-trash-alt fa-fw'></i> Elimina"
        button.className = "btn btn-danger mx-1 float-right"
        button.value = "delete"
        button.parentNode.childNodes[3].value = "delete"    // input type hidden deleteValue[]
        button.parentNode.childNodes[2].disabled = false    // button edit
        document.getElementById("deleteCustomButton").remove()
    } else {
        button.innerHTML = "<i class='fas fa-undo fa-fw'></i> Annulla"
        button.className = "btn btn-secondary mx-1 float-right"
        button.value = "undo"
        button.parentNode.childNodes[3].value = "undo"      // input type hidden deleteValue[]
        button.parentNode.childNodes[2].disabled = true     // button edit
        button.parentNode.parentNode.parentNode.innerHTML += '<button type="submit" id="deleteCustomButton" name="action" value="deleteCustom" class="btn btn-danger m-2 mx-1 float-right">' +
            + '</button>'
        document.getElementById("deleteCustomButton").innerHTML = '<i class="fas fa-check fa-fw"></i> Conferma eliminazione'
    }

}

function editButtonClicked(button) {
    document.getElementById("editForm").innerHTML += '<input type="hidden" name="dishName" value="' +
        button.value + '"/>'

    var restaurants = JSON.parse(sessionStorage.getItem("dishes")).paniniRistoranti
    for (var j = 0; j < restaurants.length; j++) {
        if (restaurants[j].email == JSON.parse(sessionStorage.getItem('actualUser')).email) {
            var customDish = restaurants[j].paniniPersonalizzati
            // Scorre i panini personalizzati del ristorante
            for (var i = 0; i < customDish.length; i++) {
                if (customDish[i].nome == button.value) {
                    document.getElementById("modalTitle").innerText = customDish[i].nome
                    document.getElementById("nameEdit").value = customDish[i].nome
                    document.getElementById("typeEdit").value = customDish[i].tipologia
                    document.getElementById("priceEdit").value = customDish[i].prezzo
                    document.getElementById("descriptionEdit").value = customDish[i].descrizione
                }
            }
        }
    }
}