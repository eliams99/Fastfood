dropdown = document.getElementById("navbarDropdown")
hello = document.getElementById("usernameHello")

var utenti = JSON.parse(localStorage.getItem("utenti"))

dropdown.innerHTML = utenti[0].Nome + " " + utenti[0].Cognome
<<<<<<< HEAD
hello.innerHTML = "Ciao " + utenti[0].Nome + "!"

=======
hello.innerHTMLDropdows = "Ciao " + utenti[0].Nome + "!"
>>>>>>> 143650598a2c745b1280a1ffc94317190f4d7c17
