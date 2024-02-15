<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $servername = "localhost";
    $username = "CodeBookAdmin";
    $password = "1234Z";
    $database = "codebook";

    $conn = new mysqli($servername, $username, $password, $database);


    // Recibe los datos del formulario
    $nombre = $_POST["NombreUsuario"];
    $email = $_POST["Correo"];
    $password = $_POST["Contrasenya"];
    $tipo = $_POST["Tipo"];


    $hashContrasenya = password_hash($password, PASSWORD_DEFAULT);

    $query = "INSERT INTO usuarios (Nombre, Correo, Contraseña, Admin) VALUES ('$nombre', '$email', '$hashContrasenya', '$tipo')";

    if ($conn->query($query) === TRUE) {
        echo "Datos insertados correctamente.";
        $_SESSION["nombreUsuario"] = $nombreUsuario;
        header("Location: ../../AdminDashboard.html");
        exit();
    } else {
        echo "Error al insertar datos: " . $conn->error;
    }

    $conn->close();
    session_destroy();
}
