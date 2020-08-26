    var username = document.getElementById("displayName")

    var request = new XMLHttpRequest()

    request.onreadystatechange = function(e) {
        if (request.readyState == 4 && this.status == 200) {
            console.log("Response: " + this.response)
            console.log(username)
            username.innerHTML = "Ciao " + JSON.parse(this.response)[0].Nome
            localStorage.setItem("utenti", this.response)
        }
    }
    request.open("GET", "http://localhost/FastFood/Utenti.json")
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send()