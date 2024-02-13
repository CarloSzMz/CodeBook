<?php
session_start();

$nombre = $_SESSION["nombreUsuario"];
$servername = "localhost";
$username = "CodeBookAdmin";
$password = "1234Z";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$query = "SELECT * FROM cursos";
$result = $conn->query($query);

$cursos = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $cursos[] = $row;
    }
}

$conn->close();

echo json_encode($cursos);
?>
