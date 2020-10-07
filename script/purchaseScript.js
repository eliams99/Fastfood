function addToCart() {
    var nomePanino = document.getElementById("modalName").innerHTML;
    var quantity = Number(document.getElementById("quantityInput").value);
    var price = document.getElementById("modalPrice").innerHTML;
    var cart = new Array();

    if (sessionStorage["cart"]) {
        cart = JSON.parse(sessionStorage.getItem("cart"));
        for (var i = 0; i < cart.length; i++) {
            if (nomePanino == cart[i].nome) {
                cart[i].quantita += quantity;
                sessionStorage.setItem("cart", JSON.stringify(cart))
                return;
            }
        }
    }
    cart.push({
        "nome": nomePanino, "quantita": quantity, "prezzo": price
    })
    sessionStorage.setItem("cart", JSON.stringify(cart));
}

function showCartItems() {
    var cart = JSON.parse(sessionStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
        tot = Number(cart[i].prezzo.split('€ ').join('')) * Number(cart[i].quantita);
        document.getElementById('cartTable').innerHTML += '<tr>'
            + '    <td><img src="../img/' + cart[i].nome.split(' ').join('') + '.png" class="img-fluid card-img-top" alt="..."></td>'
            + '        <td>' + cart[i].nome + '</td>'
            + '        <td>' + cart[i].prezzo + '</td>'
            + '        <td>'
            + '            <span class="input-number input-number-adaptive">'
            + '                <input onInput = "priceChange(this)" type="number" id="quantityInput" name="quantityInput" value="' + cart[i].quantita + '" step="1">'
            + '                            </span>'
            + '                        </td>'
            + '            <td>€' + tot  + '</td>'
            + '</tr>'
    }
}

function priceChange(quantity) {
    var price = quantity.parentElement.parentElement.previousElementSibling.innerHTML.split('€ ').join('');
    quantity.parentElement.parentElement.nextElementSibling.innerHTML = Number(quantity.value) * Number(price);
}