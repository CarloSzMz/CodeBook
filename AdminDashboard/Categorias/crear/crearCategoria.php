<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "prueba";

    $conn = new mysqli($servername, $username, $password, $database);


    // Recibe los datos del formulario
    $lenguaje = $_POST["lenguaje"];

    $query = "INSERT INTO categorias (Lenguaje) VALUES ('$lenguaje')";

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
