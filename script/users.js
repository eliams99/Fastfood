function validate() {
    if(!validateUsers("Utenti")) {
        if(validateUsers("Ristoratori")) {
            document.getElementById("accountArea").href = 'pages/restaurateurPage.html'
        }
    } else {
        document.getElementById("accountArea").href = 'pages/customerPage.html'
    }
}

function validateUsers(fileName) {
    var request = new XMLHttpRequest()

    request.onreadystatechange = function (e) {
        if (request.readyState == 4 && this.status == 200) {
            sessionStorage.setItem("utenti", this.response)
        }
    }
    request.open("GET", "http://localhost/FastFood/"+fileName+".json")
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send()

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var users = JSON.parse(sessionStorage.getItem('utenti'))

    for (var i = 0; i < users.length; i++) {
        if (users[i].password == password && users[i].email == email) {
            sessionStorage.setItem("actualUser", JSON.stringify(users[i]))
            document.getElementById('loginDropdown').style.display = "none"
            document.getElementById('accountDropdown').style.display = "initial"
            showUser()
            return true
        }
    };
    return false
}

function showUser() {
    var username = document.getElementById("displayName")
    var actualUser = JSON.parse(sessionStorage.getItem("actualUser"))
    console.log(actualUser)
    username.innerHTML = "Ciao " + actualUser.nome
    document.getElementById('navbarDropdown').innerHTML = actualUser.nome + " " + actualUser.cognome
}

function logout() {
    sessionStorage.clear()
    document.getElementById('loginDropdown').style.display = "initial"
    document.getElementById('accountDropdown').style.display = "none"
    document.getElementById('navbarDropdown').innerHTML = 'Account'
}