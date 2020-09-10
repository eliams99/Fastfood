var userFound

function validate() {
    sessionStorage.clear()
    getUsers("Utenti", false)
    setTimeout(() => {
        if (userFound) {
            document.getElementById("accountArea").href = 'customerPage.html'
        } else {
            getUsers("Ristoratori", false)
            setTimeout(() => {
                if (userFound) {
                    document.getElementById("accountArea").href = 'restaurateurPage.php'
                } else {
                    uncorrectCredentials()
                }
            }, 40)
        }
    }, 40)
}

function getUsers(fileName, updateUser) {
    var request = new XMLHttpRequest()
    request.open("GET", "http://localhost/FastFood/" + fileName + ".json", true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.setRequestHeader("Cache-Control", "no-cache")
    request.send()
    request.onreadystatechange = function(e) {
        if (request.readyState == 4 && this.status == 200) {
            if (updateUser) { // Se le credenziali devono essere aggiornate dopo una modifica di esse
                sessionStorage.setItem("oldUsers", sessionStorage.getItem("users"))
                sessionStorage.removeItem("users")
                sessionStorage.setItem("users", this.response)
                updateUsers()
            } else {
                sessionStorage.setItem("users", this.response)
                validateUsers(fileName)
            }
        }
    }
}

function updateUsers() {
    var users = JSON.parse(sessionStorage.getItem('users'))
    var oldUsers = JSON.parse(sessionStorage.getItem('oldUsers'))
    var actualUser = JSON.parse(sessionStorage.getItem("actualUser"))

    for (var i = 0; i < users.length; i++) {
        if (actualUser.password == oldUsers[i].password && actualUser.email == oldUsers[i].email) {
            sessionStorage.setItem("actualUser", JSON.stringify(users[i]))
        }
    }
    sessionStorage.removeItem("oldUsers")
}

function validateUsers(fileName) {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var users = JSON.parse(sessionStorage.getItem('users'))
    userFound = false

    for (var i = 0; i < users.length; i++) {
        if (users[i].password == password && users[i].email == email) {
            sessionStorage.setItem('userType', fileName)
            sessionStorage.setItem("actualUser", JSON.stringify(users[i]))
            showUser()
            userFound = true
            return true
        }
    }
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

