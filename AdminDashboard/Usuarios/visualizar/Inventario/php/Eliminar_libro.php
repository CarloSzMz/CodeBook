<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_libro = $_GET["id"];
    $user = $_GET["user"];


    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "codebook";

    $conn = new mysqli($servername, $username, $password, $database);

    $query = "DELETE FROM inventario_libros WHERE Id_Libro = $id_libro AND Id_Usuario = $user";

    if ($conn->query($query) === TRUE) {
        echo "Datos eliminados correctamente.";
        $_SESSION["nombreUsuario"] = $nombreUsuario;
        header("Location: ../../verCurso.html?id=$curso");
        exit();
    } else {
        echo "Error al insertar datos: " . $conn->error;
    }
    $conn->close();
    session_destroy();
}
