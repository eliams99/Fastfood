<!doctype html>
<html lang="en">

<head>
    <title>FastFood - Modifica Piatti</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="../style/style.css" />
    <link rel="stylesheet" href="../style/registrationStyle.css" />
    <script src="../script/navbar.js" type="text/javascript"></script>
    <script src="../script/users.js" type="text/javascript"></script>
    <script src="https://kit.fontawesome.com/ae439a7c29.js" crossorigin="anonymous"></script>
</head>

<body onload="nav()">
    <nav class="navbar navbar-expand-md fixed-top navbar-dark">
        <div class="container">
            <a class="navbar-brand align-middle" href="../pages/index.html">
                <img src="../img/logo.png" width="45" height="45" class="d-inline-block align-middle mr-2"> FastFood
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="../pages/index.html"><i class="fas fa-home mr-2"></i>Home<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../pages/cart.html"><i class="fas fa-shopping-cart mr-2"></i>Carrello</a>
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
                                <a class="dropdown-item" href="../pages/registrationForm.html">Prima volta qui? Registrati</a>
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
                <h1>Modifica Piatti</h1>
            </a>
        </div>
    </header>

    <!-- form di registrazione -->
    <section class="page-section bg-light portfolio" id="form">
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
                else if ($_POST['action'] == 'custom') {
                }
                return json_encode($allDishes);
                // if ($array != null) {
                //     $datae = array(
                //         'nome' => $_POST['nome'],
                //         'cognome' => $_POST['cognome'],
                //         'indirizzo' => $_POST['indirizzo'],
                //         'comune' => $_POST['comune'],
                //         'provincia' => $_POST['provincia'],
                //         'CAP' => $_POST['CAP'],
                //         'email' => $_POST['email'],
                //         'password' => $_POST['password'],
                //         'prefCibo' => $_POST['preferenzeCibo'],
                //         'prefPagamento' => $_POST['preferenzePagamento']
                //     );
                //     array_push($array, $datae);
                //     return json_encode($array);
                // } else {
                //     $datae[] = array(
                //         'nome' => $_POST['nome'],
                //         'cognome' => $_POST['cognome'],
                //         'indirizzo' => $_POST['indirizzo'],
                //         'comune' => $_POST['comune'],
                //         'provincia' => $_POST['provincia'],
                //         'CAP' => $_POST['CAP'],
                //         'email' => $_POST['email'],
                //         'password' => $_POST['password'],
                //         'prefCibo' => $_POST['preferenzeCibo'],
                //         'prefPagamento' => $_POST['preferenzePagamento']
                //     );
                //     return json_encode($datae);
                // }
            }
            if (file_put_contents(
                "../../FastFood/Panini.json",
                get_data()
            )) {
                echo '<h2 class="page-section-heading text-center text-uppercase text-secondary">Panini modificati!</h2>';
                echo '<div class="text-center mt-4">
                    <a class="btn btn-secondary" href="../pages/index.html">
                        <i class="fas fa-home mr-2"></i> Torna alla home
                    </a>
                    </div>';
            } else {
                echo "<div class='alert alert-danger text-center' role='alert'>
                    C'è stato un errore
                  </div>";
            }
        }
        ?>
    </section>

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
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js " integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo " crossorigin="anonymous "></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js " integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1 " crossorigin="anonymous "></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js " integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM " crossorigin="anonymous "></script>
</body>

</html>