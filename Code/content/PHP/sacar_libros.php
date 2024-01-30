<?php

require_once('database.php');

$database = new Database();

$database->conectar();

$query = "SELECT * FROM libros";
$resultadosJSON = $database->obtenerResultadosJSON($query);

$database->cerrarConexion();

echo $resultadosJSON;

?>