<?php

$idCurso = $_GET['id_curso'];


session_start();

$servername = "localhost";
$username = "CodeBookAdmin";
$password = "1234Z";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);
$nombre = $_SESSION["nombreUsuario"];
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$query = "SELECT * FROM cursos WHERE Id = '$idCurso'";
$result = $conn->query($query);

$datos = array();

if ($result->num_rows > 0) {
  
    $row = $result->fetch_assoc();
    $datos = $row;
}

$conn->close();

echo json_encode($datos);

?>