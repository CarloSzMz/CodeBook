<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_comentario = $_GET["id"];
    $curso = $_GET["curso"];


    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "codebook";

    $conn = new mysqli($servername, $username, $password, $database);

    $query = "DELETE FROM comentarios WHERE Id = $id_comentario";

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
