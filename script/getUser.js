function setActualUser() {
    var actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
    if (actualUser != null) {
        if (sessionStorage.getItem("userType") == "cliente") {
            document.getElementById("accountArea").href = 'customerPage.html'
        } else {
            document.getElementById("accountArea").href = 'restaurateurPage.php'
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
    var actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
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
    var actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
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