<!doctype html>
<html lang="en">

<head>
    <title>FastFood - Area ristoratore</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="../style/style.css" />
    <link rel="stylesheet" href="../style/registrationStyle.css" />
    <link rel="stylesheet" href="../style/restaurateurStyle.css" />
    <script src="../script/navbar.js" type="text/javascript"></script>
    <script src="../script/users.js" type="text/javascript"></script>
    </script>
    <script type="text/javascript">
        function submit() {
            document.getElementById("addForm").submit()
        }
    </script>
    <script src="https://kit.fontawesome.com/ae439a7c29.js" crossorigin="anonymous"></script>
</head>

<body onload="nav()">
    <nav class="navbar navbar-expand-md fixed-top navbar-dark">
        <div class="container">
            <a class="navbar-brand align-middle" href="index.html">
                <img src="../img/logo.png" width="45" height="45" class="d-inline-block align-middle mr-2"> FastFood
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html"><i class="fas fa-home mr-2"></i>Home<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="Cart.html"><i class="fas fa-shopping-cart mr-2"></i>Carrello</a>
                    </li>
                    <li class="nav-item dropdown active">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-user"></i> Accedi
                        </a>
                        <!-- Login -->
                        <div class="dropdown-menu">
                            <div id="loginDropdown">
                                <form class="px-4 py-3">
                                    <div class="alert alert-danger" role="alert" id="accountDanger">
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleDropdownFormEmail1">Indirizzo email</label>
                                        <input type="email" class="form-control" id="email" placeholder="email@dominio.com">
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleDropdownFormPassword1">Password</label>
                                        <input type="password" value="" class="form-control" id="password" placeholder="Password">
                                    </div>
                                    <div class="form-group">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="dropdownCheck">
                                            <label class="form-check-label" for="dropdownCheck">
                                                Ricordami
                                            </label>
                                        </div>
                                    </div>
                                    <button type="button" onclick='validate()' class="btn btn-primary">Accedi</button>
                                </form>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="registrationForm.html">Prima volta qui? Registrati</a>
                            </div>
                            <div id="accountDropdown">
                                <span class="dropdown-item-text">
                                    <h3 id="displayName"> </h3>
                                </span>
                                <a class="dropdown-item" id="accountArea">Accedi alla tua area riservata</a>
                                <a class="dropdown-item" onclick="logout()">Logout</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Masthead -->
    <header class="masthead text-white text-center">
        <div class="container d-flex align-items-center flex-column">

            <!-- Masthead Heading -->
            <a href="#form" class="masthead-heading text-uppercase">
                <h1>Area ristoratore</h1>
            </a>
        </div>
    </header>

    <!-- Gestione profilo -->
    <section class="page-section bg-light portfolio justify-content-center" id="form">
        <div class="row">
            <div class="col-3 justify-content-center">
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class="nav-link active" id="v-pills-personalData-tab" data-toggle="pill" href="#v-pills-personalData" role="tab" aria-controls="v-pills-personalData" aria-selected="true">Dati personali</a>
                    <a class="nav-link" id="v-pills-menuManagement-tab" data-toggle="pill" href="#v-pills-menuManagement" role="tab" aria-controls="v-pills-menuManagement" aria-selected="false">Gestione menù</a>
                    <a class="nav-link" id="v-pills-statistics-tab" data-toggle="pill" href="#v-pills-statistics" role="tab" aria-controls="v-pills-statistics" aria-selected="false">Statistiche</a>
                </div>
            </div>
            <div class="col-9">

                <!-- PHP AGGIUNTA/RIMOZIONE/MODIFICA PANINI -->
                <?php

                if ($_SERVER['REQUEST_METHOD'] == 'POST') {


                    function get_data()
                    {
                        $allDishes = json_decode(file_get_contents("../../FastFood/Panini.json"), true);
                        $restaurants = $allDishes["paniniRistoranti"];

                        // Aggiunta/rimozione panini comuni
                        if ($_POST['action'] == 'common') {
                            $restaurantFound = false;

                            // Controlla se il ristorante è già nel json
                            foreach ($restaurants as &$restaurant) {
                                // Se il ristorante è presente nel json
                                if ($restaurant["email"] == $_POST["restaurantEmail"]) {
                                    $restaurantFound = true;
                                    $commonDishes = array();
                                    if (isset($_POST["dishCheckbox"])) {
                                        foreach ($_POST["dishCheckbox"] as $commonDish) {
                                            $dish = array(
                                                "nome" => $commonDish
                                            );
                                            array_push($commonDishes, $dish);
                                        }
                                    }
                                    $restaurant["paniniComuni"] = $commonDishes;
                                }
                            }
                            // Se il ristorante non è nel json (nuovo utente che non ha mai aggiunto/rimosso panini)
                            if (!$restaurantFound) {
                                $newRestaurant = array(
                                    "nome" => $_POST["restaurantName"],
                                    "email" => $_POST["restaurantEmail"],
                                    "paniniPersonalizzati" => array(),
                                    "paniniComuni" => array()
                                );
                                $commonDishes = array();
                                foreach ($_POST["dishCheckbox"] as $commonDish) {
                                    $dish = array(
                                        "nome" => $commonDish
                                    );
                                    array_push($commonDishes, $dish);
                                }
                                $newRestaurant["paniniComuni"] = $commonDishes;
                                array_push($restaurants, $newRestaurant);
                            }
                            $allDishes["paniniRistoranti"] = $restaurants;
                        }  // Aggiunta/rimozione/modifica panini personalizzati
                        else if ($_POST['action'] == 'addCustom') {

                            
                            foreach ($restaurants as &$restaurant) {
                                // Se il ristorante è presente nel json
                                if ($restaurant["email"] == $_POST["restaurantEmail"]) {
                                    $datae = array(
                                        'nome' => $_POST['name'],
                                        'tipologia' => $_POST['type'],
                                        'prezzo' => $_POST['price'],
                                        'descrizione' => $_POST['description']
                                    );
                                    array_push($restaurant["paniniPersonalizzati"], $datae);
                                    $allDishes["paniniRistoranti"] = $restaurants;
                                    return json_encode($allDishes);
                                }
                            }
                        }
                        return json_encode($allDishes);
                    }
                    if (file_put_contents(
                        "../../FastFood/Panini.json",
                        get_data()
                    )) {
                        echo "<div class='alert alert-success text-center' role='alert'>
                            Panini modificati!
                            <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                            </div>";
                    } else {
                        echo "<div class='alert alert-danger text-center' role='alert'>
                            C'è stato un errore
                            <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                            </div>";
                    }
                }
                ?>
                <div class="tab-content" id="v-pills-tabContent">
                    <!-- DATI PERSONALI -->
                    <div class="tab-pane fade show active" id="v-pills-personalData" role="tabpanel" aria-labelledby="v-pills-personalData-tab">
                        <form action="../php/editDeleteRestaurateur.php" method="POST">

                            <!-- Section Heading -->
                            <h4 class="page-section-heading text-center text-uppercase text-secondary">Modifica i tuoi dati</h4>

                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md">
                                        <label for="nameInputText">Nome</label>
                                        <input type="text" class="form-control" name="nome" id="nameInputText" placeholder="Es. Mario" required>
                                    </div>
                                    <div class="col-md">
                                        <label for="surnameInputText">Cognome</label>
                                        <input type="text" class="form-control" name="cognome" id="surnameInputText" placeholder="Es. Rossi" required>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md">
                                        <label for="address">Indirizzo</label>
                                        <input type="text" class="form-control" name="indirizzo" id="addressInputText" placeholder="Es. via Verdi 8" required>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="municipality">Comune</label>
                                        <input type="text" class="form-control" name="comune" id="municipalityInputText" placeholder="Es. Milano" required>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="province">Provincia</label>
                                        <input type="text" class="form-control" name="provincia" id="provinceInputText" placeholder="Es. MI" required>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="CAP">CAP</label>
                                        <input type="text" class="form-control" name="CAP" id="CAPInputText" placeholder="Es. 20121" required>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md">
                                        <label for="inputEmail">Indirizzo email</label>
                                        <input type="email" class="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" placeholder="Es. email@dominio.com" required>
                                    </div>
                                    <div class="col-md">
                                        <label for="inputPassword">Password</label>
                                        <input type="password" class="form-control" name="password" id="inputPassword" placeholder="Inserisci Password" required>
                                    </div>
                                </div>
                            </div>

                            <!--Sezione di registrazione del ristorante-->
                            <h4 class="page-section-heading text-center text-uppercase text-secondary">Modifica i dati del ristorante</h4>
                            <div id="registrazione_ristorante">
                                <label for="restaurNameInputText">Nome del ristorante</label>
                                <input type="text" class="form-control" name="nomeRistorante" id="restaurNameInputText" placeholder="Es. FastFood delle Rose" required>
                                <div class="row">
                                    <div class="col-md">
                                        <label for="restaurAddressInputText">Indirizzo del ristorante</label>
                                        <input type="text" name="indirizzoRistorante" id="restaurAddressInputText" class="form-control" placeholder="Es. Via Verdi 8, Milano" required>
                                    </div>
                                    <div class="col-md">
                                        <label for="restaurCAPInputText">CAP del ristorante</label>
                                        <input type="text" name="capRistorante" id="restaurCAPInputText" class="form-control" placeholder="Es. 20121" required>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md">
                                        <label for="restaurPhoneInputText">Numero di telefono del ristorante</label>
                                        <input type="text" name="numeroTel" id="restaurPhoneInputText" class="form-control" placeholder="Es. 0331123123" required>
                                    </div>
                                    <div class="col-md">
                                        <label for="partitaIVAInputText">Numero di partita IVA</label>
                                        <input type="text" name="partitaIVA" id="partitaIVAInputText" class="form-control" placeholder="Es. 0764352056C" required>
                                    </div>
                                </div>

                            </div>
                            <div id="bottone_cancellati">
                                <button type="submit" name="action" value="edit" class="btn btn-primary mb-2">Modifica i tuoi dati</button>
                                <button type="submit" name="action" value="delete" class="btn btn-secondary mb-2">Elimina la tua iscrizione</button>
                            </div>
                        </form>
                    </div>

                    <!-- GESTIONE MENU -->
                    <div class="tab-pane fade" id="v-pills-menuManagement" role="tabpanel" aria-labelledby="v-pills-menuManagement-tab">
                        <!-- Panini comuni-->
                        <h4 class="page-section-heading text-center text-uppercase text-secondary">Panini comuni</h4>
                        <form method="POST">
                            <table>
                                <div class="list-group" id="commonDishes">
                                </div>
                            </table>
                            <button type="submit" name="action" value="common" class="btn btn-primary m-2">
                                <i class="fas fa-check fa-fw"></i>
                                Conferma modifiche
                            </button>
                        </form>

                        <!-- Panini personalizzati -->
                        <h4 class="page-section-heading text-center text-uppercase text-secondary mt-4">Panini personalizzati</h4>
                        <div>
                            <button type="button" class="btn btn-secondary m-2" data-toggle="modal" data-target="#newDishModal1">
                                <i class="fas fa-plus fa-fw"></i>
                                Aggiungi piatto
                            </button>
                            <table>
                                <div class="list-group" id="customizedDishes">
                                </div>
                            </table>
                        </div>
                    </div>

                    <!-- STATISTICHE -->
                    <div class="tab-pane fade" id="v-pills-statistics" role="tabpanel" aria-labelledby="v-pills-statistics-tab">Da fare</div>
                </div>
            </div>
        </div>
        </div>
    </section>

    <!-- Modal - Modifica piatto -->
    <div class="editDish-modal modal fade" id="editDishModal" tabindex="-1" role="dialog" aria-labelledby="editDishModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-l" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">
                        <i class="fas fa-times float-right m-3"></i>
                    </span>
                </button>
                <div class="modal-body text-center">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <!-- Modal - Title -->
                                <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0" id="modalTitle"></h2>
                                <!-- Icon Divider -->
                                <div class="divider-custom d-flex justify-content-center">
                                    <hr class="divider-custom-line my-auto flex-grow-0">
                                    <div class="divider-custom-icon">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <hr class="divider-custom-line my-auto flex-grow-0">
                                </div>
                                <form method="POST">
                                    <!-- Modal - Image -->
                                    <div class="imageDiv">
                                        <img class="img-fluid rounded" src="../img/doublecheese.png" alt="">
                                        <button class="btn btn-secondary mb-5 float-right" type="button">
                                            <i class="fas fa-edit fa-fw"></i>
                                            Cambia immagine
                                        </button>
                                    </div>

                                    <div class="form-group">
                                        <label for="inputPassword4">Nome</label>
                                        <input type="text" class="form-control" name="nameEdit" id="nameEdit" placeholder="es. Double Cheeseburger">
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-7">
                                            <label for="inputEmail4">Tipologia</label>
                                            <input type="text" class="form-control" name="typeEdit" id="typeEdit" placeholder="es. Hamburger">
                                        </div>

                                        <div class="form-group col-md-5">
                                            <label for="inputAddress">Prezzo</label>
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">€</div>
                                                </div>
                                                <input type="text" class="form-control" name="priceEdit" id="priceEdit" placeholder="7.50" size="5">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="inputAddress2">Descrizione</label>
                                        <textarea class="form-control" name="description" id="descriptionEdit" rows="3" placeholder="es. Due gustosi hamburger avvolti da uno strato di formaggio cremoso"></textarea>
                                    </div>

                                    <button type="submit" class="btn btn-primary" name="action" value="editCustom" data-dismiss="modal">
                                        <i class="fas fa-edit fa-fw"></i>
                                        Conferma modifiche
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal - Aggiungi piatto personalizzato -->
    <div class="portfolio-modal modal fade" id="newDishModal1" tabindex="-1" role="dialog" aria-labelledby="newDishModal1Label" aria-hidden="true">
        <div class="modal-dialog modal-l" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">
                        <i class="fas fa-times float-right m-3"></i>
                    </span>
                </button>
                <div class="modal-body text-center">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <!-- Modal - Title -->
                                <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Aggiungi piatto</h2>
                                <!-- Icon Divider -->
                                <div class="divider-custom d-flex justify-content-center">
                                    <hr class="divider-custom-line my-auto flex-grow-0">
                                    <div class="divider-custom-icon">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <hr class="divider-custom-line my-auto flex-grow-0">
                                </div>
                                <form method="POST" id="addForm">
                                    <!-- Modal - Image -->
                                    <div class="form-group">
                                        <button class="btn btn-secondary" type="button">
                                            <i class="fas fa-plus fa-fw"></i>
                                            Aggiungi immagine
                                        </button>
                                    </div>

                                    <div class="form-group">
                                        <label for="inputPassword4">Nome</label>
                                        <input type="text" class="form-control" name="name" id="nameNew" placeholder="es. Double Cheeseburger">
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-7">
                                            <label for="inputEmail4">Tipologia</label>
                                            <input type="text" class="form-control" name="type" id="typeNew" placeholder="es. Hamburger">
                                        </div>

                                        <div class="form-group col-md-5">
                                            <label for="inputAddress">Prezzo</label>
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">€</div>
                                                </div>
                                                <input type="text" class="form-control" name="price" id="priceNew" placeholder="7.50" size="5">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="inputAddress2">Descrizione</label>
                                        <textarea class="form-control" id="descriptionNew" name="description" rows="3" placeholder="es. Due gustosi hamburger avvolti da uno strato di formaggio cremoso"></textarea>
                                    </div>

                                    <input type="hidden" name="action" value="addCustom">

                                    <button type="submit" class="btn btn-primary" onclick="submit()" data-dismiss="modal">
                                        <i class="fas fa-check fa-fw"></i>
                                        Aggiungi piatto
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="footer text-center text-light">
        <div class="container ">
            <div class="row ">

                <!-- Footer Location -->
                <div class="col-lg-4 mb-5 mb-lg-0"></div>
                <div class="col-lg-4 mb-5 mb-lg-0">
                    <h4 class="text-uppercase mb-4">Dove siamo</h4>
                    <p class="lead mb-0">Via Celoria 18
                        <br>20133 Milano, MI </p>
                </div>
            </div>
        </div>
    </footer>
    <!-- Optional JavaScript -->
    <script src="../script/getUser.js" type="text/javascript"></script>
    <script src="../script/restaurateurInformation.js" type="text/javascript"></script>
    <script src="../script/getDishes.js" type="text/javascript"></script>
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js " integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo " crossorigin="anonymous "></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js " integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1 " crossorigin="anonymous "></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js " integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM " crossorigin="anonymous "></script>
</body>

</html>