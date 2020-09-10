<?php 

print_r($_POST);
print_r($_GET);
foreach (getallheaders() as $name => $value) {
    echo "$name: $value\n";
}

$_POST = json_decode(file_get_contents("php://input"), true) ?: [];
echo var_dump($_POST);

?>