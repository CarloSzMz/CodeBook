<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombreEditado = $_POST["nombre"];
    $tipoEditado = $_POST["tipo"];
    $id_usuario = $_POST["id"];


    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "prueba";

    $conn = new mysqli($servername, $username, $password, $database);

    $query = "UPDATE usuarios SET Nombre = '$nombreEditado', Admin = '$tipoEditado'  WHERE Id = '$id_usuario'";

    if ($conn->query($query) === TRUE) {
        echo "Datos guardados correctamente.";
        $_SESSION["nombreUsuario"] = $nombreUsuario;
        header("Location: ../../AdminDashboard.html");
        exit();
    } else {
        echo "Error al insertar datos: " . $conn->error;
    }
    $conn->close();
    session_destroy();
}
