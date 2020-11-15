var message;

/* Creazione account clienti e ristoratori */

function submitCustomer() {
    var localData

    localData = JSON.parse(localStorage.getItem("data"))
    if (validateEmail(localData.utenti, "inputEmail")) {
        var pagamentoRadio = document.getElementsByName("preferenzePagamento")
        var prefPagamento = ""
        for (var i = 0; i < pagamentoRadio.length; i++) {
            if (pagamentoRadio[i].type == 'radio' && pagamentoRadio[i].checked) {
                prefPagamento = pagamentoRadio[i].value
                break;
            }
        }
        var data = getCustomerData(prefPagamento)   // Prende i dati dai form e li restituisce come json

        localData.utenti.clienti.push(data)
        sessionStorage.setItem("actualUser", JSON.stringify(data))
        sessionStorage.setItem("userType", "cliente")
        message = "Utente aggiunto correttamente"
        updateData(localData)
    }
}

function submitRestaurateur() {
    var localData
    localData = JSON.parse(localStorage.getItem("data"))
    if (validateEmail(localData.utenti, "restInputEmail")) {
        var data = getRestaurateurData()
        localData.utenti.ristoratori.push(data)
        localData.panini.paniniRistoranti.push({
            "nome": document.getElementById("nameInputText").value,
            "email": document.getElementById("inputEmail").value,
            "paniniPersonalizzati": [],
            "paniniComuni": []
        })
        sessionStorage.setItem("actualUser", JSON.stringify(data))
        sessionStorage.setItem("userType", "ristoratore")
        message = "Utente aggiunto correttamente"
        updateData(localData)
    }
}

/* Modifica dati account cliente ristoratori */

function editCustomer() {
    localData = JSON.parse(localStorage.getItem("data"))
    userData = getCustomerData(JSON.parse(sessionStorage.getItem("actualUser")).prefPagamento)
    localData.utenti.clienti = editUser(localData.utenti.clienti, userData)
    updateData(localData)
    setTimeout(function () { window.location.reload() }, 2000)
}

function editRestaurateur() {
    localData = JSON.parse(localStorage.getItem("data"))
    localData.utenti.ristoratori = editUser(localData.utenti.ristoratori, getRestaurateurData())
    updateData(localData)
    setTimeout(function () { window.location.reload() }, 2000)
}

function editUser(users, userData) {
    actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == actualUser.email) {
            users[i] = userData
            sessionStorage.setItem("actualUser", JSON.stringify(users[i]))
            message = "Informazioni modificate correttamente"
            return users
        }
    }
}

function deleteCustomer() {
    localData = JSON.parse(localStorage.getItem("data"))
    localData.utenti.clienti = deleteUser(localData.utenti.clienti)
    updateData(localData)
    setTimeout(function () { window.location.replace('index.html') }, 2000)
}

function deleteRestaurateur() {
    localData = JSON.parse(localStorage.getItem("data"))
    localData.utenti.ristoratori = deleteUser(localData.utenti.ristoratori)
    updateData(localData)
    setTimeout(function () { window.location.replace('index.html') }, 2000)
}

function deleteUser(users) {
    actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == actualUser.email) {
            users.splice(users.indexOf(users[i]), 1)
            sessionStorage.removeItem("actualUser")
            sessionStorage.removeItem("userType")
            message = "Utente rimosso correttamente"
            return users
        }
    }
}

function getCustomerData(prefPagamento) {
    return {
        "nome": document.getElementById("nameInputText").value,
        "cognome": document.getElementById("surnameInputText").value,
        "indirizzo": document.getElementById("addressInputText").value,
        "comune": document.getElementById("municipalityInputText").value,
        "provincia": document.getElementById("provinceInputText").value,
        "CAP": document.getElementById("CAPInputText").value,
        "email": document.getElementById("inputEmail").value,
        "password": document.getElementById("inputPassword").value,
        "prefCibo": document.getElementById("meatTypeSelect").value,
        "prefPagamento": prefPagamento
    };
}

function getRestaurateurData() {
    return {
        "nome": document.getElementById("restNameInputText").value,
        "cognome": document.getElementById("restSurnameInputText").value,
        "indirizzo": document.getElementById("restAddressInputText").value,
        "comune": document.getElementById("restMunicipalityInputText").value,
        "provincia": document.getElementById("restProvinceInputText").value,
        "CAP": document.getElementById("restCAPInputText").value,
        "email": document.getElementById("restInputEmail").value,
        "password": document.getElementById("restInputPassword").value,
        "nomeRistorante": document.getElementById("restaurantNameInputText").value,
        "indirizzoRistorante": document.getElementById("restaurantAddressInputText").value,
        "capRistorante": document.getElementById("restaurantCAPInputText").value,
        "numeroTel": document.getElementById("phoneInputText").value,
        "partitaIVA": document.getElementById("IVAInputText").value
    };
}

function validateEmail(data, emailType) {      // Controlla se l'email è già presente nel json
    var existMessage = "<div class='alert alert-danger text-center' role='alert'>"
        + "Account già registrato"
        + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
        + "    <span aria-hidden='true'>&times;</span>"
        + "</button>"
        + "</div>"
    for (var i = 0; i < data.clienti.length; i++) {
        if (data.clienti[i].email == document.getElementById(emailType).value) {
            document.getElementById("message").innerHTML = existMessage
            return false
        }
    }
    for (var i = 0; i < data.ristoratori.length; i++) {
        if (data.ristoratori[i].email == document.getElementById(emailType).value) {
            document.getElementById("message").innerHTML = existMessage
            return false
        }
    }
    return true
}

/* Gestione panini */

function checkCommonDishes() {
    var localData = JSON.parse(localStorage.getItem("data"))
    var index = findActualUser()
    var commonDishes = new Array()
    checkBoxes = document.getElementsByName("dishCheckbox")
    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            commonDishes.push({ "nome": checkBoxes[i].value })
        }
    }
    localData.panini.paniniRistoranti[index].paniniComuni = commonDishes
    message = "Panini comuni aggiornati"
    updateData(localData)
}

function addCustomDish() {
    var localData = JSON.parse(localStorage.getItem("data"))
    var index = findActualUser()

    localData.panini.paniniRistoranti[index].paniniPersonalizzati.push(
        {
            "nome": document.getElementById("nameNew").value,
            "tipologia": document.getElementById("typeNew").value,
            "prezzo": document.getElementById("priceNew").value,
            "descrizione": document.getElementById("descriptionNew").value
        }
    )
    message = document.getElementById("nameNew").value + " aggiunto"
    updateData(localData)
    setTimeout(function () { window.location.reload() }, 2000)
}

function editCustomDish() {
    var localData = JSON.parse(localStorage.getItem("data"))
    var index = findActualUser()
    var dishName = document.getElementById("dishName").value

    for (var i = 0; i < localData.panini.paniniRistoranti[index].paniniPersonalizzati.length; i++) {
        if (localData.panini.paniniRistoranti[index].paniniPersonalizzati[i].nome == dishName) {
            localData.panini.paniniRistoranti[index].paniniPersonalizzati[i] = {
                "nome": document.getElementById("nameEdit").value,
                "tipologia": document.getElementById("typeEdit").value,
                "prezzo": document.getElementById("priceEdit").value,
                "descrizione": document.getElementById("descriptionEdit").value
            }
            message = document.getElementById("nameEdit").value + " modificato"
            updateData(localData)
            setTimeout(function () { window.location.reload() }, 2000)
            return
        }
    }
}

function deleteCustomDish() {
    var localData = JSON.parse(localStorage.getItem("data"))
    var buttons = document.getElementsByName("deleteValue")
    var index = findActualUser()

    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].value == "undo") {
            localData.panini.paniniRistoranti[index].paniniPersonalizzati.splice(i, 1)
        }
    }
    message = "Panini personalizzati eliminati"
    updateData(localData)
    setTimeout(function () { window.location.reload() }, 2000)
}

/* Gestione ordini */
function addOrder() {
    var cart = JSON.parse(sessionStorage.getItem("cart"))
    var data = JSON.parse(localStorage.getItem("data"))
    var date = new Date()
    cart.utente = JSON.parse(sessionStorage.getItem("actualUser")).email
    cart.oraMill = date.getTime()
    cart.ora = date.getHours() + ":" + date.getMinutes()
    cart.data = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    cart.evaso = false
    data.ordini.push(cart)
    message = "Ordine confermato"
    updateData(data)
}

function checkProcessedOrders() {
    var data = JSON.parse(localStorage.getItem("data"))
    var dishPreparation = 3     // Tempo di preparazione per piatto

    for (var i = 0; i < data.ordini.length; i++) {
        var date = new Date()
        if (data.ordini[i].evaso == false && date.getTime() > data.ordini[i].oraMill + (dishPreparation * 60000)) {
            data.ordini[i].evaso = true
        }
    }
    message = "Ordini aggiornati"
    updateData(data)
}

/* Altro */

function findActualUser() {
    var customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti
    var actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
    for (var i = 0; i < customDishes.length; i++) {
        if (customDishes[i].email == actualUser.email) {
            return i
        }
    }
}

/* Invio dei dati al server e aggiornamento localStorage */

function setLocalStorage() {
    if (!localStorage["data"]) {
        getData()
    }
}

function updateData(data) {
    localStorage.setItem("data", JSON.stringify(data))     // Aggiorna il localStorage
    submitData(data)                                       // Aggiorna il file json sul server
}

function getData() {
    var xhr = new window.XMLHttpRequest()
    xhr.open('GET', "http://localhost/FastFood/", true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 || this.status === 200) {
            localStorage.setItem("data", this.responseText)
        }
    };
    xhr.send()
}

function submitData(jsonData) {
    var xhr = new window.XMLHttpRequest()
    xhr.open('POST', "http://localhost/FastFood/", true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 || this.status === 200) {
            console.log(this.responseText);             // echo da php
            if (this.responseText) {
                document.getElementById("message").innerHTML = "<div class='alert alert-success text-center' role='alert' style='display : block;'>"
                    + message
                    + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                    + "    <span aria-hidden='true'>&times;</span>"
                    + "</button> "
                    + "</div>"
            }
        } else {
            document.getElementById("message").innerHTML = "<div class='alert alert-danger text-center' role='alert'>"
                + "C'è stato un errore"
                + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                + "    <span aria-hidden='true'>&times;</span>"
                + "</button>"
                + "</div>"
        }
    };
    xhr.send(JSON.stringify(jsonData))
}