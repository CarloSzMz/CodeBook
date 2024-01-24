<?php
session_start();
$_SESSION["nombreUsuario"] = "david";
$nombre = $_SESSION["nombreUsuario"];
$servername = "localhost";
$username = "root";
$password = "";
$database = "BBDDProyecto";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$query = "SELECT * FROM cursos";
$result = $conn->query($query);

// Obtener los datos de cursos en un array
$cursos = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $cursos[] = $row;
    }
}

$conn->close();

// Devolver los datos como JSON
echo json_encode($cursos);
?>
