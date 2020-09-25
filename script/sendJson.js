var message;

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
        var data = getCustomerData(prefPagamento)

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
        sessionStorage.setItem("actualUser", JSON.stringify(data))
        sessionStorage.setItem("userType", "ristoratore")
        message = "Utente aggiunto correttamente"
        updateData(localData)
    }
}

function editCustomer() {
    localData = JSON.parse(localStorage.getItem("data"))
    actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
    for (var i = 0; i < localData.utenti.clienti.length; i++) {
        if (localData.utenti.clienti[i].email == actualUser.email) {
            localData.utenti.clienti.splice(localData.utenti.clienti.indexOf(actualUser.email), 1)
            sessionStorage.setItem("actualUser", JSON.stringify(localData.utenti.clienti[i]))
            message = "Informazioni modificate correttamente"
            updateData(localData)
            return
        }
    }
}

function deleteCustomer() {
    localData = JSON.parse(localStorage.getItem("data"))
    actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
    for (var i = 0; i < localData.utenti.clienti.length; i++) {
        console.log("qui")
        if (localData.utenti.clienti[i].email == actualUser.email) {
            delete localData.utenti.clienti[i]
            sessionStorage.removeItem("actualUser")
            sessionStorage.removeItem("userType")
            message = "Utente rimosso correttamente"
            updateData(localData)
            return
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
        "prefCibo": document.getElementById("preferenzeCiboSelect").value,
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
    var existMmessage = "<div class='alert alert-danger text-center' role='alert'>"
        + "Account già registrato"
        + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
        + "    <span aria-hidden='true'>&times;</span>"
        + "</button>"
        + "</div>"
    for (var i = 0; i < data.clienti.length; i++) {
        if (data.clienti[i].email == document.getElementById(emailType).value) {
            document.getElementById("message").innerHTML = existMmessage
            return false
        }
    }
    for (var i = 0; i < data.ristoratori.length; i++) {
        if (data.ristoratori[i].email == document.getElementById(emailType).value) {
            document.getElementById("message").innerHTML = existMmessage
            return false
        }
    }
    return true
}

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
            console.log(this.responseText); // echo from php
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