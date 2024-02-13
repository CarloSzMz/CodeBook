<?php
session_start();
$nombreUsuario = $_SESSION["nombreUsuario"];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

$latitud = $_POST['latitud'];
$longitud = $_POST['longitud'];
}


$conexion = new mysqli("localhost", "root", "", "codebook");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$sql = "UPDATE usuarios SET latitud='$latitud', longitud='$longitud' WHERE nombre='$nombreUsuario'";

$conexion->query($sql);

$conexion->close();

?>
