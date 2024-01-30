<?php

require_once('database.php');

$database = new Database();


$database->conectar();


$query = "SELECT * FROM cursos";
$resultadosJSON = $database->obtenerResultadosJSON($query);

$database->cerrarConexion();

echo $resultadosJSON;

?>