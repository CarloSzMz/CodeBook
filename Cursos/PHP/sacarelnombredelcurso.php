<?php

$idCurso = $_GET['id_curso'];

// Ahora puedes utilizar $idCurso en tu lógica PHP
// ...
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);
$nombre = $_SESSION["nombreUsuario"];
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$query = "SELECT Nombre FROM cursos WHERE Id = '$idCurso'";
$result = $conn->query($query);

$datos = array();

if ($result->num_rows > 0) {
  
    $row = $result->fetch_assoc();
    $datos = $row;
}

$conn->close();

echo json_encode($datos);

?>