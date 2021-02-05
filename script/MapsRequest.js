var restAddress = getRestaurantAddress(JSON.parse(sessionStorage.getItem("cart")).ristorante)
var actualUser = JSON.parse(sessionStorage.getItem('actualUser'))
var userAddress = actualUser.indirizzo + ", " + actualUser.comune + ", " + actualUser.CAP

findCoordinates(restAddress)
    .then((data) => {
        restCoordinates = data[0] + "," + data[1]
        findCoordinates(userAddress)
            .then((userData) => {
                userCoordinates = userData[0] + "," + userData[1]
                calculateDistance(restCoordinates, userCoordinates)
                    .then((routeData) => {
                        document.getElementById("deliveryCost").innerHTML = "€ " + Math.round((routeData.distance / 1000 * 1.5) / 10)
                        document.getElementById("deliveryDuration").value = Math.round(routeData.duration / 60) + 2
                        console.log("Distanza: " + routeData.distance / 1000 + " km")
                        manageOrder(routeData.distance)
                    })
            })
    })
    .then()

function getRestaurantAddress(restaurantEmail) {
    var ristoratori = JSON.parse(localStorage.getItem("data")).utenti.ristoratori
    for (var i = 0; i < ristoratori.length; i++) {
        if (ristoratori[i].email == restaurantEmail) {
            return ristoratori[i].indirizzo + ", " + ristoratori[i].comune + ", " + ristoratori[i].CAP
        }
    }
}

async function findCoordinates(address) {
    try {
        const response = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI(address) + ".json?access_token=pk.eyJ1IjoiYW5kcmVsaW8iLCJhIjoiY2tmbnBqeXJjMGZnNDJ5bXExNTIwODI3MSJ9.EvDDudGu2KRCZfr-3tSObQ")
        if (response.ok) {
            const jsonResponse = await response.json()
            console.log(jsonResponse.features[0])
            return jsonResponse.features[0].geometry.coordinates
        }
    } catch (error) {
        console.log(error)
    }
}

async function calculateDistance(sourceCoordinates, destCoordinates) {
    try {
        const response = await fetch("https://api.mapbox.com/directions/v5/mapbox/driving/" + encodeURI(sourceCoordinates) + ";" + encodeURI(destCoordinates) + "?access_token=pk.eyJ1IjoiYW5kcmVsaW8iLCJhIjoiY2tmbnBqeXJjMGZnNDJ5bXExNTIwODI3MSJ9.EvDDudGu2KRCZfr-3tSObQ")
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse.routes[0]
        }
    } catch (error) {
        console.log(error);
    }
}

function manageOrder(distance) {
    if (distance / 1000 > 50) {
        document.getElementById("collect").checked = true
        document.getElementById("delivery").disabled = true
        document.getElementById("deliveryCostLi").setAttribute("style", "display: none !important;")
        document.getElementById("deliveryAlert").style.display = "block"
    }
}