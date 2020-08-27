<?php 
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST') { 
          
        function get_data() { 
            $datae = array(); 
            
            $array = json_decode(file_get_contents("../../FastFood/Utenti.json"), true);
            if ($array != null) {
                $datae = array( 
                    'nome' => $_POST['nome'], 
                    'cognome' => $_POST['cognome'], 
                    'indirizzo' => $_POST['indirizzo'],
                    'comune' => $_POST['comune'],
                    'provincia' => $_POST['provincia'],
                    'CAP' => $_POST['CAP'],
                    'email' => $_POST['email'],
                    'password' => $_POST['password'],
                    'prefCibo' => $_POST['preferenzeCibo'],
                    'prefPagamento' => $_POST['preferenzePagamento']
                );
                array_push($array, $datae);
                return json_encode($array);
            } else {
                $datae[] = array( 
                    'nome' => $_POST['nome'], 
                    'cognome' => $_POST['cognome'], 
                    'indirizzo' => $_POST['indirizzo'],
                    'comune' => $_POST['comune'],
                    'provincia' => $_POST['provincia'],
                    'CAP' => $_POST['CAP'],
                    'email' => $_POST['email'],
                    'password' => $_POST['password'],
                    'prefCibo' => $_POST['preferenzeCibo'],
                    'prefPagamento' => $_POST['preferenzePagamento']
                );
                return json_encode($datae); 
            }
        } 
       
        if(file_put_contents( 
            "../../FastFood/Utenti.json", get_data())) { 
                echo'File created';
            } 
        else { 
            echo 'There is some error'; 
        } 
    } 
?>