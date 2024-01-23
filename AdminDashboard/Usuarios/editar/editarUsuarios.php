<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombreEditado = $_POST["nombre"];
    $email = $_POST["email"];
    $tipoEditado = $_POST["tipo"];


    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "prueba";

    $conn = new mysqli($servername, $username, $password, $database);

    $query = "UPDATE usuarios SET Nombre = '$nombreEditado', Admin = '$tipoEditado'  WHERE Correo = '$email'";

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
