<?php
error_reporting(E_ALL);

ini_set('display_errors', '1');

session_start();
$id_curso = $_GET['id_curso'];
$nombre = $_SESSION["nombreUsuario"];
require_once('database.php');

$database = new Database();


$database->conectar();


$query = "SELECT * FROM comentarios WHERE Id_curso = '$id_curso'";
$resultadosJSON = $database->obtenerResultadosJSON($query);

$database->cerrarConexion();

echo $resultadosJSON;

?>