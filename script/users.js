var userFound

function validate() {
    sessionStorage.clear()
    validateUsers("Utenti")
    setTimeout(() => {
        if (userFound) {
            console.log("qui")
            document.getElementById("accountArea").href = 'pages/customerPage.html'
        } else {
            console.log("qui2")
            validateUsers("Ristoratori")
            if (userFound) {
                document.getElementById("accountArea").href = 'pages/restaurateurPage.html'
            } else {
                uncorrectCredentials()
            }
        }
    }, 10)

}

function validateUsers(fileName) {
    var request = new XMLHttpRequest()
    request.open("GET", "http://localhost/FastFood/" + fileName + ".json", true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send()
    request.onreadystatechange = function(e) {
        if (request.readyState == 4 && this.status == 200) {
            sessionStorage.setItem("utenti", this.response)
            getUsers()
        }
    }
}

function getUsers() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var users = JSON.parse(sessionStorage.getItem('utenti'))
    userFound = false

    for (var i = 0; i < users.length; i++) {
        if (users[i].password == password && users[i].email == email) {
            sessionStorage.setItem("actualUser", JSON.stringify(users[i]))
            showUser()
            userFound = true

            return true
        }
    };
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