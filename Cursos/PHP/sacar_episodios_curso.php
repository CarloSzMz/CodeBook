<?php
session_start();
$id_curso = $_GET['id_curso'];

require_once('database.php');

$database = new Database();

$database->conectar();

$query = "SELECT * FROM episodios WHERE Id_curso = $id_curso";
$resultadosJSON = $database->obtenerResultadosJSON($query);

$database->cerrarConexion();

echo $resultadosJSON;
?>