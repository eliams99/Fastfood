function showCharts() {
    dishesBarplot()
    timeLineplot()
    categoryPie()
}

function dishesBarplot() {
    let ctx = document.getElementById("dishesBarplot")
    let data = getDishesData()
    let myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: "Numero di ordini",
                data: data.data,
                backgroundColor: generateColors(),
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Piatti venduti'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        max: Math.max(...data.data) + 2
                    }
                }]
            }
        }
    });
}

function timeLineplot() {
    let ctx = document.getElementById("timeLineplot")
    let data = getOrders()
    let myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: "Numero di ordini",
                data: data.data,
                backgroundColor: ["#D88C00"]
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Piatti venduti per orario'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        max: Math.max(...data.data) + 2
                    }
                }]
            }
        }
    });
}

function categoryPie() {
    let ctx = document.getElementById("categoryPie")
    let data = getStructuredOrdersCategory()
    let myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                label: "Categoria",
                data: data.data,
                backgroundColor: generateColors()
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Piatti venduti per categoria'
            },
            scales: {
                yAxes: [{
                    ticks: {
                    }
                }]
            }
        }
    });
}

function generateColors() {
    return [
        "#3e95cd",
        "#8e5ea2",
        "#3cba9f",
        "#e8c3b9",
        "#c45850",
        "#6D545D",
        "#756D54",
        "#8B9556",
        "#ABB557",
        "#BED558",
        "#8AC6D0",
        "#B8F3FF",
        "#DBCBD8",
        "#34562C",
        "#EBBAB9",
    ]
}

/* Barplot singoli panini */
// Dati i panini, li struttura in data per essere visualizzati nel grafico, rimuovendo
//  le ripetizioni dei panini e sommando la loro quantità quando si ripetono
function getDishesData() {
    let data = {
        labels: [],
        data: []
    }
    let orders = JSON.parse(localStorage.getItem("data")).ordini
    let dishes = getOnlyDishes(orders)
    let dishesNoRep = getDishesWithoutDishRepetitions(dishes)

    for (let i = 0; i < dishes.length; i++) {
        if (dishesNoRep[i].ripetizione == false) {
            data.labels.push(dishes[i].nome)
            data.data.push(dishes[i].quantita)
        }
    }
    return data
}


// Ritorna tutti i piatti negli ordini senza ripetizioni del panino
function getDishesWithoutDishRepetitions(dishes) {
    for (let i = 0; i < dishes.length; i++) {
        for (let j = i + 1; j < dishes.length; j++) {
            if (dishes[i].nome == dishes[j].nome) {
                dishes[i].quantita += dishes[j].quantita         // Accumulta la quantità
                dishes[j].ripetizione = true                     // Marca la ripetizione
            }
        }
    }
    return dishes
}

// Ritorna solo i piatti contenuti negli ordini in un unico array
function getOnlyDishes(orders) {
    let dishesOrder = new Array()

    for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].piatti.length; j++) {
            orders[i].piatti[j].ripetizione = false       // Serve per raggruppare i panini dopo
            dishesOrder.push(orders[i].piatti[j])
        }
    }
    return dishesOrder
}

/* Lineplot orari */
// Dati gli ordini con l'ora ordinata, li struttura in data per essere visualizzati nel grafico
function getOrders() {
    let data = {
        labels: [],
        data: []
    }
    let orders = JSON.parse(localStorage.getItem("data")).ordini
    orders = splitTime(orders)

    for (let i = 0; i < orders.length; i++) {
        data.labels.push(orders[i].ora)
        data.data.push(orders[i].quantitàTotale)
        for (let j = i + 1; j < orders.length; j++) {
            if (orders[i].ora == orders[j].ora) {
                data.data[i] += orders[j].quantitàTotale
                orders.splice(orders.indexOf(orders[j]), 1)
            }
        }
    }
    return data
}

// Restituisce l'array con solo l'ora numerica (toglie i minuti) ordinato
function splitTime(orders) {
    for (let i = 0; i < orders.length; i++) {
        orders[i].ora = Number(orders[i].ora.split(":")[0])     // Mantiene solo l'ora e la converte in num
    }
    orders.sort(sortFunction)   // Ordinamento in base all'ora
    return orders
}

// Ordina ogni singolo elemento dell'array in base all'ora
function sortFunction(order1, order2) {
    if (order1.ora === order2.ora) {
        return 0;
    }
    else {
        return (order1.ora < order2.ora) ? -1 : 1
    }
}

/* Pie tipologia piatti */
//
function getStructuredOrdersCategory() {
    console.log()
    let data = {
        labels: [],
        data: []
    }
    let orders = getOnlyActualRestaurantOrders(JSON.parse(localStorage.getItem("data")).ordini)
    let dishes = getOrdersCategory(orders)
    let dishesNoRep = getDishesWithoutCategoryRepetitions(dishes)

    for (let i = 0; i < dishesNoRep.length; i++) {
        if (dishes[i].ripetizione == false) {
            data.labels.push(dishes[i].tipologia)
            data.data.push(dishes[i].quantita)
        }
    }
    return data
}

// Ritorna tutti i piatti negli ordini senza ripetizioni della categoria
function getDishesWithoutCategoryRepetitions(dishes) {
    for (let i = 0; i < dishes.length; i++) {
        for (let j = i + 1; j < dishes.length; j++) {
            if (dishes[i].tipologia == dishes[j].tipologia) {
                dishes[i].quantita += dishes[j].quantita         // Accumulta la quantità
                dishes[j].ripetizione = true            // Marca la ripetizione
            }
        }
    }
    return dishes
}

// Ritorna tutti i piatti negli ordini con la relativa categoria
function getOrdersCategory(orders) {
    let dishes = getOnlyDishes(orders)  // Ritorna solo i piatti negli ordini

    for (let i = 0; i < dishes.length; i++) {
        dishes[i].tipologia = getCategory(dishes[i].nome)   // Aggiunge la tipologia
        dishes[i].ripetizione = false       // Serve per raggruppare le categorie dopo
    }
    return dishes
}

// Dato un nome di piatto ritorna la sua tipologia
function getCategory(dishName) {
    let dishes = JSON.parse(localStorage.getItem("data")).panini.comuni
    dishes = getCommonCustomDishes(dishes)

    for (let i = 0; i < dishes.length; i++) {
        if (dishes[i].nome == dishName) {
            return dishes[i].tipologia
        }
    }
}

// Ritorna in un unico array tutti i panini comuni più i panini personalizzati del ristorante attualmente loggato
function getCommonCustomDishes(dishes) {
    let restDishes = JSON.parse(localStorage.getItem("data")).panini.paniniRistoranti

    for (let i = 0; i < restDishes.length; i++) {
        if (restDishes[i].email == JSON.parse(sessionStorage.getItem("actualUser")).email) {
            for (let j = 0; j < restDishes[i].paniniPersonalizzati.length; j++) {
                dishes.push(restDishes[i].paniniPersonalizzati[j])
            }
        }
    }
    return dishes
}

// Ritorna solo gli ordini del ristorante attualmente loggato
function getOnlyActualRestaurantOrders(orders) {
    for (let i = 0; i < orders.length; i++) {
        // Se il ristorante di quell'ordine non è quello attualmente loggato lo toglie dall'array
        if (orders[i].ristorante != JSON.parse(sessionStorage.getItem("actualUser")).email) {
            orders.splice(orders.indexOf(orders[i]), 1)
        }
    }
    return orders
}