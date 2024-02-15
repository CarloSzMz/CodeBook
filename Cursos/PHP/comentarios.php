<?php
error_reporting(E_ALL);

ini_set('display_errors', '1');

session_start();
$id_curso = $_GET['id_curso'];
$nombre = $_SESSION["nombreUsuario"];

$servername = "localhost";
$username = "CodeBookAdmin";
$password = "1234Z";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$query = "SELECT comentarios.*, usuarios.Nombre FROM comentarios LEFT JOIN usuarios on comentarios.Id_Usuario = usuarios.Id WHERE Id_curso = '$id_curso'";
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
