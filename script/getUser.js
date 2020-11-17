// Setta testo e azioni nel link "Account" della navbar in base al tipo di utente
function setActualUser() {
    let actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
    if (actualUser != null) {
        if (sessionStorage.getItem("userType") == "cliente") {
            document.getElementById("accountArea").href = 'customerPage.html'
        } else {
            document.getElementById("accountArea").href = 'restaurateurPage.html'
        }
        document.getElementById('loginDropdown').style.display = "none"
        document.getElementById('accountDropdown').style.display = "initial"
        document.getElementById("displayName").innerHTML = "Ciao " + actualUser.nome
        document.getElementById('navbarDropdown').innerHTML = "<i class='fas fa-user mr-2'></i>" + actualUser.nome + " " + actualUser.cognome
    }
}

// Esce dall'account e riporta il link "Account" della navbar allo stato normale e ripristina la form di login al suo interno
function logout() {
    sessionStorage.clear()
    document.getElementById('loginDropdown').style.display = "initial"
    document.getElementById('accountDropdown').style.display = "none"
    document.getElementById('navbarDropdown').innerHTML = "<i class='fas fa-user mr-2'></i> Accedi"
}

// Mette le informazioni del cliente (utente) nelle input text dell'area personale in modo che siano precompilate
function getUserInfo() {
    let actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
    document.getElementById("nameInputText").value = actualUser.nome
    document.getElementById("surnameInputText").value = actualUser.cognome
    document.getElementById("inputEmail").value = actualUser.email
    document.getElementById("addressInputText").value = actualUser.indirizzo
    document.getElementById("municipalityInputText").value = actualUser.comune
    document.getElementById("provinceInputText").value = actualUser.provincia
    document.getElementById("CAPInputText").value = actualUser.CAP
    document.getElementById("preferenzeCiboSelect").value = actualUser.prefCibo
    document.getElementById("prefPagamento").value = actualUser.prefPagamento
}

// Mette le informazioni del ristoratore nelle input text dell'area personale in modo che siano precompilate
function getRestaurateurInfo() {
    let actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
    document.getElementById("restNameInputText").value = actualUser.nome
    document.getElementById("restSurnameInputText").value = actualUser.cognome
    document.getElementById("restInputEmail").value = actualUser.email
    document.getElementById("restAddressInputText").value = actualUser.indirizzo
    document.getElementById("restMunicipalityInputText").value = actualUser.comune
    document.getElementById("restProvinceInputText").value = actualUser.provincia
    document.getElementById("restCAPInputText").value = actualUser.CAP
    document.getElementById("restaurantNameInputText").value = actualUser.nomeRistorante
    document.getElementById("restaurantAddressInputText").value = actualUser.indirizzoRistorante
    document.getElementById("restaurantCAPInputText").value = actualUser.capRistorante
    document.getElementById("phoneInputText").value = actualUser.numeroTel
    document.getElementById("IVAInputText").value = actualUser.partitaIVA
}

// Mostra gli ordini (acquisti) effettuati dall'utente
function getUserOrders() {
    let orders = JSON.parse(localStorage.getItem("data")).ordini
    let actualUser = JSON.parse(sessionStorage.getItem("actualUser"))

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].utente == actualUser.email) {
            // Stampa i dettagli generali dell'intero ordine
            document.getElementById("ordersUl").innerHTML += '<li class="d-flex px-3 pt-3 pb-1 row">'
            + '<span class="col-sm-5">'
            + ' <small class="text-muted">' + orders[i].data + '</small>'
            + ' <small class="text-mutedmy-0 mx-2"> ' +  orders[i].ora + '</small>'
            + ' <small class="text-mutedmy-0 mx-2"> ' + findRestaurant(orders[i].ristorante).nomeRistorante + '</small></span>'
            + '<span class="mx-2 col-sm-2"><small class="text-mutedmy-0"> Quantità totale: ' +  orders[i].quantitàTotale + '</small></span>'
            + '<span class="mx-2 col-sm-3"><small class="text-mutedmy-0"> Prezzo totale: € ' +  orders[i].prezzoTotale + '</small></span></li>'
            // Scorre e stampa i signoli piatti all'interno dell'ordine
            for (let j = 0; j < orders[i].piatti.length; j++) {
                document.getElementById("ordersUl").innerHTML += '<li class="list-group-item d-flex row">'
                + '<h6 class="my-0 col-sm-5" id="name">' + orders[i].piatti[j].nome + '</h6>'
                + '<small class="text-mutedmy-0 mx-2 col-sm-2"> Quantità: ' + orders[i].piatti[j].quantita + '</small>'
                + '<small class="text-mutedmy-0 mx-2 col-sm-3"> Prezzo: ' + orders[i].piatti[j].prezzo + '</small> </li>'
            }
        }
    }
}

// Mostra gli ordini ricevuti dal ristorante
function getRestaurateurOrders() {
    checkProcessedOrders()
    document.getElementById("ordersUl").innerHTML += '<h5>Ordini da evadere </h5>'
    getPartialOrders(false, "Non ci sono ordini da evadere")    // Mostra solo gli ordini ancora da evadere
    document.getElementById("ordersUl").innerHTML += '<h5 class="mt-3 mb-0">Ordini già evasi</h5>'
    getPartialOrders(true, "Non ci sono ordini già evasi")     // Mostra solo gli ordini già evasi
}

function getPartialOrders(processed, message) {
    let orders = JSON.parse(localStorage.getItem("data")).ordini
    let actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
    let noOrders = true     // Per stampare un messaggio se non ci sono ordini

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].ristorante == actualUser.email && orders[i].evaso == processed) {
            // Stampa i dettagli generali dell'intero ordine
            document.getElementById("ordersUl").innerHTML += '<li class="d-flex px-3 pt-3 pb-1 row">'
            + '<span class="col-sm-5">'
            + ' <small class="text-muted">' + orders[i].data + '</small>'
            + ' <small class="text-mutedmy-0 mx-2"> ' +  orders[i].ora + '</small>'
            + ' <small class="text-mutedmy-0 mx-2"> ' + orders[i].utente + '</small></span>'
            + '<span class="mx-2 col-sm-2"><small class="text-mutedmy-0"> Quantità totale: ' +  orders[i].quantitàTotale + '</small></span>'
            + '<span class="mx-2 col-sm-3"><small class="text-mutedmy-0"> Prezzo totale: € ' +  orders[i].prezzoTotale + '</small></span></li>'
            // Scorre e stampa i signoli piatti all'interno dell'ordine
            for (let j = 0; j < orders[i].piatti.length; j++) {
                document.getElementById("ordersUl").innerHTML += '<li class="list-group-item d-flex row">'
                + '<h6 class="my-0 col-sm-5" id="name">' + orders[i].piatti[j].nome + '</h6>'
                + '<small class="text-mutedmy-0 mx-2 col-sm-2"> Quantità: ' + orders[i].piatti[j].quantita + '</small>'
                + '<small class="text-mutedmy-0 mx-2 col-sm-3"> Prezzo: ' + orders[i].piatti[j].prezzo + '</small> </li>'
            }
            noOrders = false
        }
    }
    // Mostra il messaggio che non ci sono ordini se non ci sono ordini (noOrders == true)
    if (noOrders) {
        document.getElementById("ordersUl").innerHTML += '<li class="d-flex px-4 pt-1 pb-3 row">' + message + '</li>'
    }
}

// Scorre i ristoranti e trova quello con quella determinata email (serve per ottenerne il nome, visto che negli ordini c'è solo l'email)
function findRestaurant(restaurateurEmail) {
    let restaurateurs = JSON.parse(localStorage.getItem('data')).utenti.ristoratori
    // Scorre i ristoranti
    for (var i = 0; i < restaurateurs.length; i++) {
        if (restaurateurs[i].email == restaurateurEmail) {
            return restaurateurs[i]
        }
    }
}