<?php
session_start();


$nombre = $_SESSION["nombreUsuario"];
require_once('database.php');

$database = new Database();

$database->conectar();

$query = "SELECT Id FROM usuarios WHERE Nombre = '$nombre'";
$resultadosJSON = $database->obtenerResultadoUnico($query);

$database->cerrarConexion();

echo $resultadosJSON;
?>