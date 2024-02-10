<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();

$newName= $_POST['newName'];
$campo= $_POST['campo'];
if ($campo==="Contraseña") {
    $newName = password_hash($newName, PASSWORD_DEFAULT);
}

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

$query2 = "UPDATE `usuarios` SET `$campo` = '$newName' WHERE `Id`= '44'";
$result2 = $conn->query($query2);

$conn->close();

?>