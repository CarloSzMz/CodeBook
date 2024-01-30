<?php

$idEp = $_GET['id_episodio'];

session_start();

require_once('database.php');

$database = new Database();

$database->conectar();

$query = "SELECT * FROM episodios WHERE Id = '$idEp'";
$resultadosJSON = $database->obtenerResultadoUnico($query);

$database->cerrarConexion();

echo $resultadosJSON;

?>