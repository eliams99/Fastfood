<?php 
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST') { 
          
        function get_data() { 
            $datae = array(); 
            $datae[] = array( 
                'Nome' => $_POST['nome'], 
                'Cognome' => $_POST['cognome'], 
                'Indirizzo' => $_POST['indirizzo'], 
            ); 
            return json_encode($datae); 
        } 
          
       
        if(file_put_contents( 
            "../../FastFood/Utenti.json", get_data(), FILE_APPEND)) { 
                echo'File created';
            } 
        else { 
            echo 'There is some error'; 
        } 
    } 
?> 