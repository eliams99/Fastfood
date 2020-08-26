function submitData() {
    console.log("1")
    var name = document.getElementById("nameInputText").value
    var surname = document.getElementById("surnameInputText").value
    var xhr = new window.XMLHttpRequest()
    xhr.open('POST', "http://localhost/fastfood/Utenti.json", true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    var data = JSON.stringify({ "Nome": name.value, "Cognome": surname.value });
    xhr.send(data)
    console.log("qui")
}