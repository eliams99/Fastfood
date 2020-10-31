function validate() {
    sessionStorage.clear()
    if (validateUsers(JSON.parse(localStorage.getItem('data')).utenti.clienti, "cliente")) {
        document.getElementById("accountArea").href = 'customerPage.html'
    } else {
        if (validateUsers(JSON.parse(localStorage.getItem('data')).utenti.ristoratori, "ristoratore")) {
            document.getElementById("accountArea").href = 'restaurateurPage.html'
        } else {
            uncorrectCredentials()
        }
    }
}

function validateUsers(users, userType) {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    for (var i = 0; i < users.length; i++) {
        if (users[i].password == password && users[i].email == email) {
            sessionStorage.setItem('userType', userType)
            sessionStorage.setItem("actualUser", JSON.stringify(users[i]))
            showUser() 
            return true
        }
    }
    return false
}

function showUser() {
    document.getElementById('loginDropdown').style.display = "none"
    document.getElementById('accountDropdown').style.display = "initial"
    var actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
    document.getElementById("displayName").innerHTML = "Ciao " + actualUser.nome
    document.getElementById('navbarDropdown').innerHTML = "<i class='fas fa-user mr-2'></i>" + actualUser.nome + " " + actualUser.cognome
    correctCredentials()
}

function correctCredentials() {
    document.getElementById("accountDanger").style.display = 'none'
    document.getElementById("email").style.border = ""
    document.getElementById("password").style.border = ""
}

function uncorrectCredentials() {
    document.getElementById("accountDanger").style.display = 'block'
    document.getElementById("accountDanger").innerHTML = "Email o password errati"
    document.getElementById("email").style.border = "1px solid #CC0000"
    document.getElementById("password").style.border = "1px solid #CC0000"
}