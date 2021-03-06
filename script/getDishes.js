var deleteCounter = 0   // Numero di panini in lista per essere eliminati tra i panini personalizzati (serve per togliere il bottone di conferma eliminazione)

// Mostra i panini nell'area personale del ristoratore
function showDishes() {
    let data = JSON.parse(localStorage.getItem("data"))
    showCommonDishes(data.panini.paniniRistoranti, data.panini.comuni)
    showCustomDishes(data.panini.paniniRistoranti)
    // Riempie la select di selezione della tipologia della carne (nei modal)
    setMeatTypeSelect("meatNew")
    setTypeSelect("typeNew")
}

function setTypeSelect(id, selectedValue) {
    var types = JSON.parse(localStorage.getItem("data")).panini.tipologie
    document.getElementById(id).innerHTML = ""
    for (let i = 0; i < types.length; i++) {
        if (types[i] == selectedValue) {
            document.getElementById(id).innerHTML += "<option value='" + types[i] + "' selected> " + types[i] + "</option>"
        } else {
            document.getElementById(id).innerHTML += "<option value='" + types[i] + "'> " + types[i] + "</option>"
        }
    }
}

function showCommonDishes(restaurateurs, dishes) {
    // Scorre tutti i panini comuni
    for (let j = 0; j < dishes.length; j++) {
        let dishList = '<li href="#" class="list-group-item">' + '<div class="form-check form-check-inline mt-0">'
        let dishFound = false                           // Indica se il piatto è offerto dal ristorante
        let i = getRestaurantIndex(restaurateurs)       // Prende l'indice del ristorante
        if (i != -1) {                                  // Se il ristorante è stato trovato, scorre i piatti che offre
            // Scorre i panini comuni che offre il ristorante
            let selectedDishes = restaurateurs[i].paniniComuni
            for (let a = 0; a < selectedDishes.length; a++) {
                if (dishes[j].nome == selectedDishes[a].nome) {     // Se il piatto è offerto dal ristorante, allora preseleziona la checkbox
                    dishList += '<input class="form-check-input" type="checkbox" name="dishCheckbox" value="'
                        + dishes[j].nome + '" checked>'
                    dishFound = true
                }
            }
        }
        if (!dishFound) {      // Se il piatto non è presente tra quelli offerti dal ristorante, non seleziona la checkbox
            dishList += '<input class="form-check-input" type="checkbox" name="dishCheckbox" value="'
                + dishes[j].nome + '">'
        }
        dishList += '<label class="form-check-label mx-2">'
            + dishes[j].nome + '</label></div></li>'
        document.getElementById("commonDishes").innerHTML += dishList
    }
    setHiddenValues()
}

function getRestaurantIndex(restaurateurs) {
    // Scorre i ristoranti
    for (var i = 0; i < restaurateurs.length; i++) {
        // Se il ristorante corrisponde all'utente che ha fatto l'accesso
        if (restaurateurs[i].email == JSON.parse(sessionStorage.getItem('actualUser')).email) {
            return i
        }
    }
    return -1
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
                document.getElementById("customizedDishesList").innerHTML += '<li href="#" class="list-group-item row">' +
                    '<label class="col-sm-* mx-2 my-1 align-middle">' + customDish[i].nome + '</label>' +
                    '<button class="btn btn-danger col-sm-auto mx-1 float-right" type="button" onClick="deleteButtonClicked(this)" name="delete" value="delete">' +
                    '   <i class="fas fa-trash-alt fa-fw"></i> Elimina ' +
                    '</button>' +
                    '<button class="btn btn-secondary col-sm-auto mx-1 float-right" type="button" onClick="editButtonClicked(this)" data-toggle="modal" data-target="#editDishModal" name="edit[]" value="' + customDish[i].nome + '">' +
                    '   <i class="fas fa-edit fa-fw"></i> Modifica ' +
                    '   </button>' +
                    '<input type="hidden" name="deleteValue" value="delete"/>' +
                    '</li>'
            }
            document.getElementById("customizedDishesForm").innerHTML += '<button type="button" id="deleteCustomButton" onclick="deleteCustomDish()"' +
            'value="deleteCustom" class="btn btn-danger m-2 mx-1 float-right"><i class="fas fa-check fa-fw"></i> Conferma eliminazione</button>'
            document.getElementById("customizedDishesList").innerHTML += '<input type="hidden" name="restaurantEmail" value="' +
                JSON.parse(sessionStorage.getItem('actualUser')).email + '">' +
                '<input type="hidden" name="restaurantName" value="' +
                JSON.parse(sessionStorage.getItem('actualUser')).nome + '">'
        }
    }
}

function deleteButtonClicked(button) {
    if (button.value == "undo") {
        button.innerHTML = "<i class='fas fa-trash-alt fa-fw'></i> Elimina"
        button.className = "btn btn-danger col-sm-auto mx-1 float-right"
        button.value = "delete"
        button.parentNode.childNodes[3].value = "delete"    // input type hidden deleteValue[]
        button.parentNode.childNodes[2].disabled = false    // button edit
        deleteCounter--
        if (deleteCounter == 0) {
            document.getElementById("deleteCustomButton").style.display = "none"
        }
    } else {
        button.innerHTML = "<i class='fas fa-undo fa-fw'></i> Annulla"
        button.className = "btn btn-secondary col-sm-auto mx-1 float-right"
        button.value = "undo"
        button.parentNode.childNodes[3].value = "undo"      // input type hidden deleteValue[]
        button.parentNode.childNodes[2].disabled = true     // button edit
        deleteCounter++
        document.getElementById("deleteCustomButton").style.display = "block"
    }
}

function editButtonClicked(button) {
    let index = findActualUser()
    let customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti[index].paniniPersonalizzati
    document.getElementById("editForm").innerHTML += '<input type="hidden" name="dishName" id="dishName" value="' +
        button.value + '"/>'

    for (let i = 0; i < customDishes.length; i++) {
        if (customDishes[i].nome == button.value) {
            document.getElementById("modalTitle").innerText = customDishes[i].nome
            document.getElementById("nameEdit").value = customDishes[i].nome
            setTypeSelect("typeEdit", customDishes[i].tipologia)
            document.getElementById("priceEdit").value = customDishes[i].prezzo
            setMeatTypeSelect("meatEdit", customDishes[i].tipoCarne)
            document.getElementById("descriptionEdit").value = customDishes[i].descrizione
            document.getElementById("modalImg").src =  customDishes[i].immagine
        }
    }
}

function findActualUser() {
    var customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti
    var actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
    for (var i = 0; i < customDishes.length; i++) {
        if (customDishes[i].email == actualUser.email) {
            return i
        }
    }
}