dropdown = document.getElementById("navbarDropdown")
hello = document.getElementById("usernameHello")

var utenti = JSON.parse(localStorage.getItem("utenti"))

dropdown.innerHTML = utenti[0].Nome + " " + utenti[0].Cognome
hello.innerHTML = "Ciao " + utenti[0].Nome + "!"