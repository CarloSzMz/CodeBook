<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_relacion = $_GET["id"];
    $user = $_GET["user"];


    $servername = "localhost";
    $username = "CodeBookAdmin";
    $password = "1234Z";
    $database = "codebook";

    $conn = new mysqli($servername, $username, $password, $database);

    $query = "DELETE FROM inventario_libros WHERE Id = $id_relacion;";

    if ($conn->query($query) === TRUE) {
        echo "Datos eliminados correctamente.";
        $_SESSION["nombreUsuario"] = $nombreUsuario;
        header("Location: ../../verUsuario.html?id=$user");
        exit();
    } else {
        echo "Error al insertar datos: " . $conn->error;
    }
    $conn->close();
    session_destroy();
}
