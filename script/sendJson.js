function submitData() {
    var name = document.getElementById("nameInputText").value
    var surname = document.getElementById("surnameInputText").value
    var address = document.getElementById("addressInputText").value
    var xhr = new window.XMLHttpRequest()
    xhr.open('POST', "http://localhost/fast-food/php/Prova.php", true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    var data = JSON.stringify({ "nome": name, "cognome": surname, "indirizzo": address });
    console.log(data)
    xhr.send(data)
}

