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

function logout() {
    sessionStorage.clear()
    document.getElementById('loginDropdown').style.display = "initial"
    document.getElementById('accountDropdown').style.display = "none"
    document.getElementById('navbarDropdown').innerHTML = "<i class='fas fa-user mr-2'></i> Accedi"
}

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

function getUserOrders() {
    let orders = JSON.parse(localStorage.getItem("data")).ordini
    let actualUser = JSON.parse(sessionStorage.getItem("actualUser"))

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].utente == actualUser.email) {
            document.getElementById("ordersUl").innerHTML += '<li class="d-flex px-3 pt-3 pb-1 row">'
            + '<span class="col-5">'
            + ' <small class="text-muted">' + orders[i].data + '</small>'
            + ' <small class="text-mutedmy-0 mx-2"> ' +  orders[i].ora + '</small>'
            + ' <small class="text-mutedmy-0 mx-2"> ' + findRestaurant(orders[i].ristorante).nomeRistorante + '</small></span>'
            + '<span class="mx-2 col-2"><small class="text-mutedmy-0"> Quantità totale: ' +  orders[i].quantitàTotale + '</small></span>'
            + '<span class="mx-2 col-3"><small class="text-mutedmy-0"> Prezzo totale: €' +  orders[i].prezzoTotale + '</small></span></li>'
            for (let j = 0; j < orders[i].piatti.length; j++) {
                document.getElementById("ordersUl").innerHTML += '<li class="list-group-item d-flex row">'
                + '<h6 class="my-0 col-5" id="name">' + orders[i].piatti[j].nome + '</h6>'
                + '<small class="text-mutedmy-0 mx-2 col-2"> Quantità: ' + orders[i].piatti[j].quantita + '</small>'
                + '<small class="text-mutedmy-0 mx-2 col-3"> Prezzo: ' + orders[i].piatti[j].prezzo + '</small> </li>'
            }
        }
    }
}

function findRestaurant(restaurateurEmail) {
    let restaurateurs = JSON.parse(localStorage.getItem('data')).utenti.ristoratori
    // Scorre i ristoranti
    for (var i = 0; i < restaurateurs.length; i++) {
        if (restaurateurs[i].email == restaurateurEmail) {
            return restaurateurs[i]
        }
    }
}