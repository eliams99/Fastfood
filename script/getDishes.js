var request = new XMLHttpRequest()
request.open("GET", "http://localhost/FastFood/Panini.json", true)
request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
request.setRequestHeader("Cache-Control", "no-cache")
request.send()
request.onreadystatechange = function(e) {
    if (request.readyState == 4 && this.status == 200) {
        sessionStorage.setItem("users", this.response)
        var dish = JSON.parse(this.response).comuni

        for (var i = 0; i < dish.length; i++) {
            document.getElementById("commonDishes").innerHTML += '<li href="#" class="list-group-item">' +
                '<div class="form-check form-check-inline mt-0">' +
                '<input class="form-check-input" type="checkbox" checked name="dishCheckbox[]" value="' + dish[i].nome + '">' +
                '<label class="form-check-label mx-2">' + dish[i].nome + '</label>' +
                '</div></li>'
        }

        var restaurants = JSON.parse(this.response).paniniRistoranti
        for (var j = 0; j < restaurants.length; j++){
            if (restaurants[j].email == JSON.parse(sessionStorage.getItem('actualUser')).email) {
                var customDish = restaurants[j].paniniPersonalizzati
                for (var i = 0; i < customDish.length; i++) {
                    document.getElementById("customizedDishes").innerHTML += '<li href="#" class="list-group-item">' +
                        '<div class="form-check form-check-inline mt-0">' +
                        '<label class="form-check-label mx-2">' + customDish[i].nome + '</label></div>' +
                        '<button class="btn btn-danger mx-1 float-right" type="button">' +
                        '   <i class="fas fa-trash-alt fa-fw"></i> Elimina ' +
                        '</button>' +
                        '<button class="btn btn-secondary mx-1 float-right" type="button" data-toggle="modal" data-target="#editDishModal">' +
                        '   <i class="fas fa-edit fa-fw"></i> Modifica ' +
                        '   </button>' +
                        '</li>'
                    document.getElementById("modalTitle").innerText = customDish[i].nome
                    document.getElementById("nameEdit").value = customDish[i].nome
                    document.getElementById("typeEdit").value = customDish[i].tipologia
                    document.getElementById("priceEdit").value = customDish[i].prezzo
                }
            }
        }      
    }
}
