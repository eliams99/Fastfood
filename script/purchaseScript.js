/* Cart page */

var totalQuantity = 0

function addToCart() {
    var nomePanino = document.getElementById("modalName").innerHTML
    var quantity = Number(document.getElementById("quantityInput").value)
    var cart

    if (sessionStorage["cart"]) {
        cart = JSON.parse(sessionStorage.getItem("cart"))
        cart.quantitàTotale += quantity
        for (var i = 0; i < cart.piatti.length; i++) {
            if (nomePanino == cart.piatti[i].nome) {        // Se il piatto è già presente incrementarne solamente la quantità
                cart.piatti[i].quantita += quantity;
                sessionStorage.setItem("cart", JSON.stringify(cart))
                return;
            }
        }
    } else {
        cart = {
            "quantitàTotale": 0,
            "prezzoTotale": 0,
            "piatti": [],
            "ristorante": ""
        }
        cart.quantitàTotale += quantity
    }
    cart.piatti.push({
        "nome": nomePanino,
        "quantita": quantity,
        "prezzo": document.getElementById("modalPrice").innerHTML,
    })
    cart.ristorante = document.getElementById("restaurantEmail").value
    disableRestaurantSelect()
    sessionStorage.setItem("cart", JSON.stringify(cart))
}

// Disabilita la select per non far aggiungere al carrello panini da ristoranti diversi
function disableRestaurantSelect() {
    document.getElementById("restaurantSelect").disabled = true
    document.getElementById("message").innerHTML = "<div class='alert alert-warning text-center' role='alert'>"
        + "<a href='#' class='alert-link' data-dismiss='alert' onClick='deleteCart()'>Elimina i piatti dal carrello</a> per cambiare ristorante"
        + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
        + "    <span aria-hidden='true'>&times;</span>"
        + "</button>"
        + "</div>"
}

function loadCartItems() {
    if (sessionStorage["cart"]) {
        showCartItems()
    } else {
        document.getElementById("cartTable").style.display = "none"
        document.getElementById("noItemsText").style.display = "block"
        document.getElementById("purchaseButton").style.display = "none"
    }
}

function showCartItems() {
    document.getElementById("cartTable").style.display = "table"
    document.getElementById("cartTable").firstElementChild.firstChild.style.display = "table-row"
    document.getElementById("noItemsText").style.display = "none"
    var cart = JSON.parse(sessionStorage.getItem('cart'))
    var totPrice = 0
    for (var i = 0; i < cart.piatti.length; i++) {
        var totPriceDish = Number(cart.piatti[i].prezzo.split('€ ').join('')) * Number(cart.piatti[i].quantita);
        document.getElementById('cartTable').innerHTML += '<tr>'
            + '    <td><img src="../img/' + cart.piatti[i].nome.split(' ').join('') + '.png" class="cartImg" alt="..."></td>'
            + '        <td>' + cart.piatti[i].nome + '</td>'
            + '        <td>' + cart.piatti[i].prezzo + '</td>'
            + '        <td>'
            + '            <input onInput="priceChange(this)" type="number" id="quantityInput" class="quantityInput" min="0" value="' + cart.piatti[i].quantita + '" step="1">'
            + '            <a href="#" onClick="removeItem(this)"> Rimuovi </a>'
            + '        </td>'
            + '        <td class="totPriceInput">€ ' + totPriceDish + '</td>'
            + '</tr>'
        totPrice += totPriceDish
    }
    document.getElementById('cartTable').innerHTML += '<tr id="lastRow">'
        + '        <td colspan="3"></td>'
        + '        <td class="total" id="totalQuantity">' + cart.quantitàTotale + '</td>'
        + '        <td class="total" id="totalPrice">€ ' + Math.round(totPrice * 100) / 100 + '</td>'
        + '</tr>'
    cart.prezzoTotale = Math.round(totPrice * 100) / 100
    sessionStorage.setItem("cart", JSON.stringify(cart))
}

function priceChange(quantity) {
    var price = quantity.parentElement.previousElementSibling.innerHTML.split('€ ').join('')
    var cart = JSON.parse(sessionStorage.getItem("cart"))
    var index = quantity.parentElement.parentElement.rowIndex - 1
    if (quantity.value) {
        quantity.parentElement.nextElementSibling.innerHTML = "€ " + Number(quantity.value) * Number(price)
        cart.piatti[index].prezzo = "€ " + Number(quantity.value) * Number(price)
        cart.piatti[index].quantita = Number(quantity.value)
    } else {
        quantity.parentElement.nextElementSibling.innerHTML = "€ 0"
        cart.piatti.splice(index, 1)
    }
    setTotal(cart)
}

function setTotal(cart) {
    var quantity = document.getElementsByClassName("quantityInput")
    var price = document.getElementsByClassName("totPriceInput")
    var totQuantity = 0, totPrice = 0

    for (var i = 0; i < quantity.length; i++) {
        totQuantity += Number(quantity[i].value)
        totPrice += Number(price[i].innerHTML.split('€ ').join(''))
    }
    if (totQuantity == 0) {     // Se non ci sono più elementi nel carrello (quantità totale 0)
        document.getElementById("cartTable").style.display = "none"
        document.getElementById("noItemsText").style.display = "block"
        deleteCart()
    } else {                    // Se ci sono ancora elementi, aggiorna il totale nell'html e nel sessionStorage
        document.getElementById("totalQuantity").innerHTML = totQuantity
        document.getElementById("totalPrice").innerHTML = "€ " + Math.round(totPrice * 100) / 100
        document.getElementById("dot").innerHTML = totQuantity
        cart.quantitàTotale = totQuantity
        cart.prezzoTotale = Math.round(totPrice * 100) / 100
        sessionStorage.setItem("cart", JSON.stringify(cart))
    }
}

function deleteCart() {
    document.getElementById("dot").innerHTML = 0
    sessionStorage.removeItem("cart")       // Rimuovi il carrello dal sessionStorage
    setRestaurantSelect()
}

function removeItem(element) {
    element.previousElementSibling.value = 0
    priceChange(element)
    var rowIndex = element.parentElement.parentElement.rowIndex
    document.getElementById("cartTable").deleteRow(rowIndex)
}

function purchaseClick() {
    if (JSON.parse(sessionStorage.getItem("actualUser"))) {
        window.location.href = 'purchasePage.html'
    } else {
        document.getElementById("accountWarning").style.display = "block"
        document.getElementById("accountWarning").innerHTML = "Accedi o registrati per proseguire con l'acquisto"
        $("#accountDropdownLi").addClass("show")
        $("#accountDropdowDiv").addClass("show")
        $("#accountButton").attr("aria-expanded", "true")
    }
}

/* Purchase page */

function loadPurchaseData() {
    showCartItemsPurchase()
    getSummaryInfo()
    getPaymentPreferences()
}

function showCartItemsPurchase() {
    if (sessionStorage["cart"]) {
        var cart = JSON.parse(sessionStorage.getItem('cart'))
        document.getElementById("totalCartQuantity").innerHTML = cart.quantitàTotale
        var oldInnerHtml = document.getElementById("cartPurchase").innerHTML
        document.getElementById("cartPurchase").innerHTML = ""
        for (var i = 0; i < cart.piatti.length; i++) {
            document.getElementById("cartPurchase").innerHTML += '<li class="list-group-item d-flex justify-content-between lh-condensed">'
                + '<div> <h6 class="my-0">' + cart.piatti[i].nome + '</h6>'
                + '<small class="text-muted">Quantità: ' + cart.piatti[i].quantita + '</small> </div>'
                + '<span class="text-muted">' + cart.piatti[i].prezzo + '</span> </li>'
        }
        document.getElementById("cartPurchase").innerHTML += oldInnerHtml + '<li class="list-group-item d-flex justify-content-between">'
            + '<span>Totale</span> <strong>€ ' + cart.prezzoTotale + '</strong> </li>'
    }
}

function getSummaryInfo() {
    var user = JSON.parse(sessionStorage.getItem('actualUser'))
    document.getElementById("name").innerHTML = user.nome
    document.getElementById("surname").innerHTML = user.cognome
    document.getElementById("emailSum").innerHTML = user.email
    document.getElementById("address").innerHTML = user.indirizzo + ", " + user.comune + " (" + user.provincia + ") " + user.CAP
    document.getElementById("restaurateurAddress").innerHTML = getRestaurantAddress(JSON.parse(sessionStorage.getItem("cart")).ristorante)
}

function getRestaurantAddress(restaurantEmail) {
    var ristoratori = JSON.parse(localStorage.getItem("data")).utenti.ristoratori
    for (var i = 0; i < ristoratori.length; i++) {
        if (ristoratori[i].email == restaurantEmail) {
            return ristoratori[i].indirizzo + ", " + ristoratori[i].comune + ", " + ristoratori[i].CAP
        }
    }
}

function getPaymentPreferences() {
    var user = JSON.parse(sessionStorage.getItem('actualUser'))
    if (user.prefPagamento == "contanti") {
        document.getElementById("cash").checked = true
        document.getElementById("creditCardPaymentDiv").style.display = "none"
        document.getElementById("cashPaymentDiv").style.display = "true"
    } else if (user.prefPagamento == "carta") {
        document.getElementById("credit").checked = true
        document.getElementById("creditCardPaymentDiv").style.display = "block"
        document.getElementById("cashPaymentDiv").style.display = "none"
    }
}

function paymentMethodChanged(radio) {
    if (radio.id == "cash") {
        document.getElementById("creditCardPaymentDiv").style.display = "none"
        document.getElementById("cashPaymentDiv").style.display = "block"
    } else if (radio.id == "credit") {
        document.getElementById("creditCardPaymentDiv").style.display = "block"
        document.getElementById("cashPaymentDiv").style.display = "none"
    }
}

function deliveryMethodChanged(radio) {
    if (radio.id == "delivery") {
        document.getElementById("deliveryCostLi").setAttribute("style", "display: flex !important;")
    } else if (radio.id == "collect") {
        document.getElementById("deliveryCostLi").setAttribute("style", "display: none !important;")
        document.getElementById("deliveryDuration").style.display = "none"
    }
}

function orderClicked() {
    document.getElementById("title").innerHTML = "Ordine confermato"
    document.getElementById("purchaseDiv").style.display = "none"
    document.getElementById("operationCompletedDiv").style.display = "block"
    var duration = calculatePreparationDuration()
    var deliveryDuration = document.getElementById("deliveryDuration").value
    var totDuration = parseInt(duration) + parseInt(deliveryDuration)
    console.log(duration + ", " + deliveryDuration)
    document.getElementById("deliveryDurationMessage").innerHTML = "Il tuo ordine arriverà tra " +
        + totDuration + " minuti"
}

function calculatePreparationDuration() {
    var orders = JSON.parse(localStorage.getItem("data")).ordini
    var restaurant = JSON.parse(sessionStorage.getItem("cart")).ristorante
    var duration = 0            // Tempo di preparazione totale
    var dishPreparation = 3     // Tempo di preparazione per piatto

    for (var i = 0; i < orders.length; i++) {
        if (orders[i].ristorante == restaurant && orders[i].evaso == false) {
            duration += parseInt(orders[i].quantitàTotale) * dishPreparation
        }
    }

    return duration
}