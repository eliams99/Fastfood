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
    sessionStorage.setItem("cart", JSON.stringify(cart))
}

function loadCartItems() {
    loadSelectRestaurants()
    if (sessionStorage["cart"]) {
        showCartItems()
    } else {
        document.getElementById("cartTable").style.display = "none"
        document.getElementById("noItemsText").style.display = "block"
        document.getElementById("purchaseButton").style.display = "none"
    }
}

function loadSelectRestaurants() {
    if (JSON.parse(sessionStorage.getItem("cart")).ristorante) {
        document.getElementById("restaurantSelect").style.display = "none"
    } else {
        document.getElementById("restaurantSelect").style.display = "block"
        var customDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti
        for (var i = 0; i < customDishes.length; i++) {
            if (customDishes[i].paniniPersonalizzati && customDishes[i].paniniPersonalizzati.length > 0) {
                document.getElementById("restaurantSelect").innerHTML += "<option value='" + customDishes[i].email + "'> " + customDishes[i].nome + "</option>"
            }
        }
    }
}

function restaurantSelected(restaurantName) {
    cart = JSON.parse(sessionStorage.getItem("cart"))
    cart.ristorante = restaurantName.value
    sessionStorage.setItem("cart", JSON.stringify(cart))
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
    document.getElementById("totalQuantity").innerHTML = totQuantity
    document.getElementById("totalPrice").innerHTML = "€ " + Math.round(totPrice * 100) / 100
    document.getElementById("dot").innerHTML = totQuantity
    cart.quantitàTotale = totQuantity
    cart.prezzoTotale = Math.round(totPrice * 100) / 100
    sessionStorage.setItem("cart", JSON.stringify(cart))
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
        //$('#navbarDropdown').dropdown();
        //$('#accountDropdownLi').dropdown('toggle')
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
    }
}

function orderClicked() {
    document.getElementById("title").innerHTML = "Ordine confermato"
    document.getElementById("purchaseDiv").style.display = "none"
    document.getElementById("operationCompletedDiv").style.display = "block"
}