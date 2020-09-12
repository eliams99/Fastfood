function submitCustomer() {
    var pagamentoRadio = document.getElementsByName("preferenzePagamento")
    var prefPagamento = ""
    for (var i = 0; i < pagamentoRadio.length; i++) {
        if (pagamentoRadio[i].type == 'radio' && pagamentoRadio[i].checked) {
            prefPagamento = pagamentoRadio[i].value
            break;
        }
    }
    var data =
    {
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
    setLocalStorage(data)
}

function setLocalStorage(jsonData) {
    var localData
    if (!localStorage["data"]) {
        getData()
        setTimeout(() => {
            localData = JSON.parse(localStorage.getItem("data"))
            localData["Clienti"].push(jsonData)
            localStorage.setItem("data", JSON.stringify(localData))
            submitData(localData)
            return
        }, 80)
    } else {
        localData = JSON.parse(localStorage.getItem("data"))
        localData["Clienti"].push(jsonData)
        localStorage.setItem("data", JSON.stringify(localData))
        submitData(localData)
    }
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
        }
    };
    xhr.send(JSON.stringify(jsonData))
}

