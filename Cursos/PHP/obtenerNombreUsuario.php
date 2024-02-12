<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$id_usuario = $_GET['id_usuario'];

$servername = "localhost";
$username = "root";
$password = "";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT `Nombre` FROM `usuarios` WHERE `Id` = $id_usuario";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $nombreUsuario = $row["Nombre"];
    
    echo json_encode(array('nombre' => $nombreUsuario));
} else {
    echo json_encode(array('error' => 'User not found'));
}

// Close connection
$conn->close();
?>
