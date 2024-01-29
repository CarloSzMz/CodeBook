<?php
error_reporting(E_ALL);

ini_set('display_errors', '1');

session_start();
//$id_curso = $_GET['id_curso'];
//$nombre = $_SESSION["nombreUsuario"];
$id_curso = 6;
$nombre = "david";
$servername = "localhost";
$username = "root";
$password = "";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$query = "SELECT * FROM comentarios WHERE Id_curso = '$id_curso'";
$result = $conn->query($query);


$comentarios = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $comentarios[] = $row;
    }
}

$conn->close();

echo json_encode($comentarios);
?>
