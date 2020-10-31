var sourceCoordinates
var destCoordinates

findSourceCoordinates("Via Celoria 18, Milano, 20133")      //indirizzo del ristorante 
var actualUser = JSON.parse(sessionStorage.getItem('actualUser'))
address = actualUser.indirizzo + ", " + actualUser.comune + ", " + actualUser.CAP
findDestCoordinates(address)



function findSourceCoordinates(address) {
    var xhr = new window.XMLHttpRequest()

    xhr.open('GET', "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI(address) + ".json?access_token=pk.eyJ1IjoiYW5kcmVsaW8iLCJhIjoiY2tmbnBqeXJjMGZnNDJ5bXExNTIwODI3MSJ9.EvDDudGu2KRCZfr-3tSObQ", true)

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 || this.status === 200) {
            var mapResponse = JSON.parse(this.responseText)
            sourceCoordinates = mapResponse.features[0].geometry.coordinates[0] + ',' + mapResponse.features[0].geometry.coordinates[1]
        }
    };
    xhr.send()
}

function findDestCoordinates(address) {
    var xhr = new window.XMLHttpRequest()

    xhr.open('GET', "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI(address) + ".json?access_token=pk.eyJ1IjoiYW5kcmVsaW8iLCJhIjoiY2tmbnBqeXJjMGZnNDJ5bXExNTIwODI3MSJ9.EvDDudGu2KRCZfr-3tSObQ", true)

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 || this.status === 200) {
            var mapResponse = JSON.parse(this.responseText)
            destCoordinates = mapResponse.features[0].geometry.coordinates[0] + ',' + mapResponse.features[0].geometry.coordinates[1]
            calculateDistance()
        }
    };
    xhr.send()
}

function calculateDistance() {
    var url = "https://api.mapbox.com/directions/v5/mapbox/driving/" + encodeURI(sourceCoordinates) + ";" + encodeURI(destCoordinates) + "?access_token=pk.eyJ1IjoiYW5kcmVsaW8iLCJhIjoiY2tmbnBqeXJjMGZnNDJ5bXExNTIwODI3MSJ9.EvDDudGu2KRCZfr-3tSObQ"
    var xhr = new window.XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 || this.status === 200) {
            distance = JSON.parse(this.responseText).routes[0].distance
            duration = JSON.parse(this.responseText).routes[0].duration
            document.getElementById("deliveryCost").innerHTML = "€ " + Math.round((distance / 1000 * 1.5 ) / 16)
            document.getElementById("deliveryDuration").innerHTML = "Il tuo ordine arriverà tra " + (Math.round(duration / 60) + 10) + " minuti"
        };
    }
    xhr.send()
}