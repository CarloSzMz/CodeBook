<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
session_start();

$nombre = $_SESSION["nombreUsuario"];
$servername = "localhost";
$username = "root";
$password = "";
$database = "codebook";

$remitente = $_SESSION["nombreUsuario"];
$destinatario = $_GET["usuario"];

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$query = "SELECT * FROM mensajes WHERE (nombreRemitente = '$remitente' AND nombreDestinatario = '$destinatario') OR (nombreRemitente = '$destinatario' AND nombreDestinatario = '$remitente')";
$result = $conn->query($query);

$rows = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo json_encode(array('mensaje' => 'No se encontraron mensajes.'));
}

$conn->close();
?>
