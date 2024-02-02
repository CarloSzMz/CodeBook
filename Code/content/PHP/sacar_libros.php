<?php
session_start();

$nombre = $_SESSION["nombreUsuario"];
$servername = "localhost";
$username = "root";
$password = "";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$query = "SELECT * FROM libros";
$result = $conn->query($query);

$libros = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $libros[] = $row;
    }
}

$conn->close();

echo json_encode($libros);
?>
