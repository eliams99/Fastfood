var actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
if (actualUser != null) {
    if(sessionStorage.getItem("userType") == "Utenti") {
        document.getElementById("accountArea").href = 'customerPage.html'
    } else {
        document.getElementById("accountArea").href = 'restaurateurPage.php'
    }
    document.getElementById('loginDropdown').style.display = "none"
    document.getElementById('accountDropdown').style.display = "initial"
    document.getElementById("displayName").innerHTML = "Ciao " + actualUser.nome
    document.getElementById('navbarDropdown').innerHTML = "<i class='fas fa-user mr-2'></i>" + actualUser.nome + " " + actualUser.cognome
}

function logout() {
    sessionStorage.clear()
    document.getElementById('loginDropdown').style.display = "initial"
    document.getElementById('accountDropdown').style.display = "none"
    document.getElementById('navbarDropdown').innerHTML = "<i class='fas fa-user mr-2'></i> Accedi"
}