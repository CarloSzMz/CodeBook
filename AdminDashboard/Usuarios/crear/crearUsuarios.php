<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombreUsuario = $_POST["NombreUsuario"];
    $contrasenya = $_POST["Contrasenya1"];
    $correo = $_POST["Correo"];


    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "prueba";

    $conn = new mysqli($servername, $username, $password, $database);


    // Recibe los datos del formulario
    $nombre = $_POST["nombre"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $tipo = $_POST["tipo"];


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
