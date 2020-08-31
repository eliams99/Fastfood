var actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
document.getElementById("nameInputText").value = actualUser.nome
document.getElementById("surnameInputText").value = actualUser.cognome
document.getElementById("inputEmail").value = actualUser.email
document.getElementById("addressInputText").value = actualUser.indirizzo
document.getElementById("municipalityInputText").value = actualUser.comune
document.getElementById("provinceInputText").value = actualUser.provincia
document.getElementById("CAPInputText").value = actualUser.CAP