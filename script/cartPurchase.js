/* Cart page */

var totalQuantity = 0

function addToCart() {
    var nomePanino = document.getElementById("modalName").innerHTML
    var quantity = Number(document.getElementById("quantityInput").value)
    var cart

    if (sessionStorage["cart"]) {       // Se c'è già l'elemento cart
        cart = JSON.parse(sessionStorage.getItem("cart"))   // Prende l'elemento cart
        cart.quantitàTotale += quantity                     // Aggiorna la quantità totale aggiungendo quella del panino appena aggiunto
        for (var i = 0; i < cart.piatti.length; i++) {      // Scorre i piatti già presenti nel carrello
            if (nomePanino == cart.piatti[i].nome) {             // Se il piatto è già presente 
                cart.piatti[i].quantita += quantity;                // Incrementa solamente la quantità del panino
                sessionStorage.setItem("cart", JSON.stringify(cart))// Setta il sessionStorage
                return;                                             // Ritorna, in modo da non eseguire le operazioni dopo
            }
        }
    } else {                            // Se l'elemento cart non c'è (non ci sono piatti nel carrello)
        cart = {                            // Crea l'oggetto json
            "quantitàTotale": 0,
            "prezzoTotale": 0,
            "piatti": [],
            "ristorante": ""
        }
        cart.quantitàTotale += quantity     // Aggiorna la quantità totale aggiungendo quella del panino appena aggiunto
    }
    // Le operazioni di seguito vengono eseguite se il carrello non era stato creato (else) o se viene aggiunto un nuovo elemento al carrello già esistente
    cart.piatti.push({                                                  // Aggiunge il piatto all'array dei piatti nel carrello
        "nome": nomePanino,
        "quantita": quantity,
        "prezzo": document.getElementById("modalPrice").innerHTML,
    })
    cart.ristorante = document.getElementById("restaurantEmail").value  // Setta il nome del ristorante (input hidden nel modal, settato tramite la select)
    disableRestaurantSelect()                                           // Disabilita la select in modo da non aggiungere al carrello piatti di ristoranti diversi
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
    if (sessionStorage["cart"]) {   // Se ci sono elelemnti nel carrello, mostra la tabella e gli elementi
        showCartItems()
        document.getElementById("noItemsText").style.display = "none"
        document.getElementById("purchaseButton").style.display = "block"
        document.getElementById("cartTable").style.display = "table"
    } else {                        // Altrimenti mostra il messaggio che non ci sono elementi
        document.getElementById("noItemsText").style.display = "block"
        document.getElementById("purchaseButton").style.display = "none"
    }
}

function showCartItems() {
    var cart = JSON.parse(sessionStorage.getItem('cart'))
    var totPrice = 0
    for (let i = 0; i < cart.piatti.length; i++) {
        var totPriceDish = Number(cart.piatti[i].prezzo.split('€ ').join('')) * Number(cart.piatti[i].quantita);
        let image;
        if (cart.piatti[i].immagine == undefined) {
            image = '../img/' + cart.piatti[i].nome.split(' ').join('') + '.png'
        } else {
            image = cart.piatti[i].immagine
        }
        document.getElementById('cartTableBody').innerHTML += '<tr>'
            + '    <td scope="row">'
            + '        <img src="' + image + '" class="cartImg" alt="..."> </td>'
            + '    <td class="nameCartItem">' + cart.piatti[i].nome + '</td>'
            + '        <td>' + cart.piatti[i].prezzo + '</td>'
            + '        <td>'
            + '            <input onInput="priceChange(this)" type="number" id="quantityInput" class="quantityInput" min="0" value="' + cart.piatti[i].quantita + '" step="1">'
            + '            <a href="#" onClick="removeItem(this)"> Rimuovi </a>'
            + '        </td>'
            + '        <td class="totPriceInput">€ ' + totPriceDish + '</td>'
            + '</tr>'
        totPrice += totPriceDish
    }
    document.getElementById('cartTableBody').innerHTML += '<tr id="lastRow">'
        + '        <td colspan="3" scope="row"></td>'
        + '        <td class="backgroundCart" id="totalQuantity">' + cart.quantitàTotale + '</td>'
        + '        <td class=" backgroundCart" id="totalPrice">€ ' + Math.round(totPrice * 100) / 100 + '</td>'
        + '</tr>'
    cart.prezzoTotale = Math.round(totPrice * 100) / 100
    sessionStorage.setItem("cart", JSON.stringify(cart))
}

// Funzione chiamata quando viene modificata la quantità di un prodotto nel carrello
function priceChange(quantity) {        // quantity è il link "rimuovi" che ha generato l'evento
    var price = quantity.parentElement.previousElementSibling.innerHTML.split('€ ').join('')    // Prende il prezzo del singolo prodotto (colonna prece)
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

// Calcola il totale in base ai cambiamenti effettuati, contenuti nel parametro cart
function setTotal(cart) {
    var quantity = document.getElementsByClassName("quantityInput")
    var price = document.getElementsByClassName("totPriceInput")
    console.log(quantity)
    var totQuantity = 0, totPrice = 0

    for (var i = 0; i < quantity.length; i++) {
        totQuantity += Number(quantity[i].value)
        totPrice += Number(price[i].innerHTML.split('€ ').join(''))
    }
    if (totQuantity == 0) {     // Se non ci sono più elementi nel carrello (quantità totale 0)
        document.getElementById("cartTable").style.display = "none"
        document.getElementById("purchaseButton").style.display = "none"
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
}

// Funzione chiamata quando si preme su "rimuovi" nel carrello
function removeItem(element) {
    element.previousElementSibling.value = 0
    priceChange(element)
    var rowIndex = element.parentElement.parentElement.rowIndex
    document.getElementById("cartTable").deleteRow(rowIndex)
}

// Funzione chiamata quando si preme "Prosegui all'ordine"
function purchaseClick() {
    if (JSON.parse(sessionStorage.getItem("actualUser"))) {
        window.location.href = 'purchasePage.html'
    } else {        // Se l'utente non ha ancora effettuato il login, visualizza il dropdown di login invece di farlo proseguire
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

// Mostra il carrello nell'apposita sezione
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

// Mostra le informazioni principali dell'utente e l'indirizzo del ristorante nell'apposita sezione
function getSummaryInfo() {
    var user = JSON.parse(sessionStorage.getItem('actualUser'))
    document.getElementById("name").innerHTML = user.nome
    document.getElementById("surname").innerHTML = user.cognome
    document.getElementById("emailSum").innerHTML = user.email
    document.getElementById("address").innerHTML = user.indirizzo + ", " + user.comune + " (" + user.provincia + ") " + user.CAP
    document.getElementById("restaurateurAddress").innerHTML = getRestaurantAddress(JSON.parse(sessionStorage.getItem("cart")).ristorante)
}

// Ritorna l'indirizzo del ristorante data in input l'email
function getRestaurantAddress(restaurantEmail) {
    var ristoratori = JSON.parse(localStorage.getItem("data")).utenti.ristoratori
    for (var i = 0; i < ristoratori.length; i++) {
        if (ristoratori[i].email == restaurantEmail) {
            return ristoratori[i].indirizzo + ", " + ristoratori[i].comune + ", " + ristoratori[i].CAP
        }
    }
}

// Preseleziona il radio button in base a quanto l'utente ha dichiarato di preferire al momento della registrazione
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

// Gestione dell'evento di cambio del radio button contanti/carta
function paymentMethodChanged(radio) {
    if (radio.id == "cash") {
        document.getElementById("creditCardPaymentDiv").style.display = "none"
        document.getElementById("cashPaymentDiv").style.display = "block"
        document.getElementById("payButton").style.display = "none"
    } else if (radio.id == "credit") {
        document.getElementById("creditCardPaymentDiv").style.display = "block"
        document.getElementById("cashPaymentDiv").style.display = "none"
        document.getElementById("payButton").style.display = "block"
    }
}

// Gestione dell'evento di cambio del radio button consegna/ritiro
function deliveryMethodChanged(radio) {
    if (radio.id == "delivery") {
        document.getElementById("deliveryCostLi").setAttribute("style", "display: flex !important;")
        document.getElementById("paymentInfo").innerHTML = "Pagherai al momento della consegna"
    } else if (radio.id == "collect") {
        document.getElementById("deliveryCostLi").setAttribute("style", "display: none !important;")
        document.getElementById("deliveryDuration").style.display = "none"
        document.getElementById("paymentInfo").innerHTML = "Pagherai al ristorante"
    }
}

// Gestione dell'evento di click sul bottone acquista/ordine
function orderClicked(orderType) {
    // Cambio visualizzazione
    document.getElementById("title").innerHTML = "Ordine confermato"
    document.getElementById("purchaseDiv").style.display = "none"
    document.getElementById("operationCompletedDiv").style.display = "block"
    // Calcolo durata
    var duration = calculatePreparationDuration()
    console.log("Preparazione: " + duration + " min, Spedizione: " + deliveryDuration + " min")
    if (orderType == "delivery") {
        var deliveryDuration = document.getElementById("deliveryDuration").value    // Prende la durata precedentemente calcolata con mapBox
    var totDuration = parseInt(duration) + parseInt(deliveryDuration)
        document.getElementById("deliveryDurationMessage").innerHTML = "Il tuo ordine arriverà tra " +
            + totDuration + " minuti"
    } else {
        document.getElementById("deliveryDurationMessage").innerHTML = "Il tuo ordine sarà pronto tra " +
            duration + " minuti"
    }
    deleteCart()
}

// Calcola la durata in base agli ordini in coda
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