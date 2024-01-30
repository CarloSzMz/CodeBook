<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_libros = $_POST["id"];

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "codebook";

    $conn = new mysqli($servername, $username, $password, $database);

    $query = "DELETE FROM libros WHERE Id = $id_libros";

    if ($conn->query($query) === TRUE) {
        echo "Datos eliminados correctamente.";
        $_SESSION["nombreUsuario"] = $nombreUsuario;
        header("Location: ../../AdminDashboard.html");
        exit();
    } else {
        echo "Error al insertar datos: " . $conn->error;
    }
    $conn->close();
    session_destroy();
}