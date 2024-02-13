<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (isset($_POST["mensaje"]) && isset($_POST["nombre1"])) {

        $mensaje = $_POST["mensaje"];
        $destinatario = $_POST["nombre1"];

    } else {

        echo "Error: Falta algún parámetro en la solicitud POST." . "<br>";
    }
} else {

    echo "Error: Esta página solo acepta solicitudes POST." . "<br>";
}

$remitente = $_SESSION["nombreUsuario"];
$conexion = new mysqli("localhost", "root", "", "codebook");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$sql = "INSERT INTO mensajes (nombreRemitente, nombreDestinatario, mensaje) VALUES ('$remitente', '$destinatario', '$mensaje')";

$conexion->query($sql);

$conexion->close();
header('Location: ../HTML/chat.html?usuario=' .  $destinatario);
?>

