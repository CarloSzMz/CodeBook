<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
$idCurso = $_GET['id_curso'];

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

$query = "SELECT Id FROM usuarios WHERE Nombre = '$nombre'";
$result = $conn->query($query);

$datos = array();

if ($result->num_rows > 0) {
  
    $row = $result->fetch_assoc();
    $datos = $row["Id"];
}

$query2 = "DELETE FROM `usuarios` WHERE `Id`= '$datos'";
$result2 = $conn->query($query2);

$conn->close();

?>