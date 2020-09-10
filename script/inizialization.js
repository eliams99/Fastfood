start("Utenti.json")
start("Panini.json")
start("Ristoratori.json")


function start(fileName) {
    var request = new XMLHttpRequest()
    request.open("GET", "http://localhost/FastFood/" + fileName, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.setRequestHeader("Cache-Control", "no-cache")
    request.send()
    request.onreadystatechange = function (e) {
        if (request.readyState == 4 && this.status == 200) {
            localStorage.setItem(fileName, this.response)
        }
    }
}
