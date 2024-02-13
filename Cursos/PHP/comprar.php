<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
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

$query = "SELECT Id FROM usuarios WHERE Nombre = '$nombre'";
$result = $conn->query($query);

$datos = array();

if ($result->num_rows > 0) {
  
    $row = $result->fetch_assoc();
    $datos = $row["Id"];
}

$query2 = "INSERT INTO inventario_curso (Id_Curso, Id_Usuario) VALUES ('$idCurso', '$datos')";
$result2 = $conn->query($query2);

$datos2 = array();

$conn->close();


?>