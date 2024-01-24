<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (isset($_POST["mensaje"]) && isset($_POST["nombre1"]) && isset($_POST["nombre2"])) {

        $mensaje = $_POST["mensaje"];
        $nombre1 = $_POST["nombre1"];
        $nombre2 = $_POST["nombre2"];

    } else {

        echo "Error: Falta algún parámetro en la solicitud POST." . "<br>";
    }
} else {

    echo "Error: Esta página solo acepta solicitudes POST." . "<br>";
}


$conexion = new mysqli("localhost", "root", "", "BBDDProyecto");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$sql = "INSERT INTO mensajes (nombreRemitente, nombreDestinatario, mensaje) VALUES ('$nombre1', '$nombre2', '$mensaje')";

$conexion->query($sql);

$conexion->close();
header('Location: ../PHP/chat.php?usuario=' .  $nombre2);
?>

