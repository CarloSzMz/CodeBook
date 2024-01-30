<?php

$idCurso = $_GET['id_curso'];

session_start();

require_once('database.php');

$database = new Database();

$database->conectar();

$query = "SELECT Nombre FROM cursos WHERE Id = '$idCurso'";
$resultadosJSON = $database->obtenerResultadoUnico($query);

$database->cerrarConexion();

echo $resultadosJSON;

?>