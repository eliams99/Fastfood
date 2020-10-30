var totalQuantity = 0

function addToCart() {
    var nomePanino = document.getElementById("modalName").innerHTML
    var quantity = Number(document.getElementById("quantityInput").value)
    var price = document.getElementById("modalPrice").innerHTML
    var cart

    if (sessionStorage["cart"]) {
        cart = JSON.parse(sessionStorage.getItem("cart"))
        cart.quantitàTotale += quantity
        for (var i = 0; i < cart.piatti.length; i++) {
            if (nomePanino == cart.piatti[i].nome) {
                cart.piatti[i].quantita += quantity;
                sessionStorage.setItem("cart", JSON.stringify(cart))
                return;
            }
        }
    } else {
        cart = {
            "quantitàTotale": 0,
            "piatti": []
        }
        cart.quantitàTotale += quantity
    }
    cart.piatti.push({
        "nome": nomePanino, "quantita": quantity, "prezzo": price
    })
    sessionStorage.setItem("cart", JSON.stringify(cart))
}

function showCartItems() {
    if (sessionStorage["cart"]) {
        document.getElementById("cartTable").style.display = "table"
        document.getElementById("noItemsText").style.display = "none"
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        var totPrice = 0
        for (var i = 0; i < cart.piatti.length; i++) {
            var totPriceDish = Number(cart.piatti[i].prezzo.split('€ ').join('')) * Number(cart.piatti[i].quantita);
            document.getElementById('cartTable').innerHTML += '<tr>'
                + '    <td><img src="../img/' + cart.piatti[i].nome.split(' ').join('') + '.png" class="cartImg" alt="..."></td>'
                + '        <td>' + cart.piatti[i].nome + '</td>'
                + '        <td>' + cart.piatti[i].prezzo + '</td>'
                + '        <td>'
                + '            <span class="input-number input-number-adaptive">'
                + '                <input onInput="priceChange(this)" type="number" id="quantityInput" class="quantityInput" min="0" value="' + cart.piatti[i].quantita + '" step="1">'
                + '                            </span>'
                + '                        </td>'
                + '            <td class="totPriceInput">€ ' + totPriceDish + '</td>'
                + '</tr>'
            totPrice += totPriceDish
        }
        document.getElementById('cartTable').innerHTML += '<tr id="lastRow">'
            + '        <td colspan="3"></td>'
            + '        <td class="total" id="totalQuantity">' + cart.quantitàTotale + '</td>'
            + '        <td class="total" id="totalPrice">€ ' + totPrice + '</td>'
            + '</tr>'
    } else {
        document.getElementById("noItemsText").style.display = "block"
    }
}

function priceChange(quantity) {
    var price = quantity.parentElement.parentElement.previousElementSibling.innerHTML.split('€ ').join('')
    quantity.parentElement.parentElement.nextElementSibling.innerHTML = "€ " + Number(quantity.value) * Number(price)
    setTotal()
}

function setTotal() {
    var quantity = document.getElementsByClassName("quantityInput")
    var price = document.getElementsByClassName("totPriceInput")
    var totQuantity = 0, totPrice = 0

    for (var i = 0; i < quantity.length; i++) {
        totQuantity += Number(quantity[i].value)
        totPrice += Number(price[i].innerHTML.split('€ ').join(''))
    }
    document.getElementById("totalQuantity").innerHTML = totQuantity
    document.getElementById("totalPrice").innerHTML = "€ " + Math.round(totPrice*100)/100
}