<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $servername = "localhost";
    $username = "CodeBookAdmin";
    $password = "1234Z";
    $database = "codebook";

    $conn = new mysqli($servername, $username, $password, $database);

    $nombre = $_POST["nombre"];
    $desc = $_POST["descripcion"];
    $curso = $_POST["curso"];
    $URL = $_POST["URL"];

    $query = "INSERT INTO episodios (Nombre, Descripcion, Id_curso, URL) VALUES ('$nombre', '$desc', '$curso','$URL')";

    if ($conn->query($query) === TRUE) {
        echo "Datos insertados correctamente.";
        $_SESSION["nombreUsuario"] = $nombreUsuario;
        header("Location: ../../verCurso.html?id=$curso");
        exit();
    } else {
        echo "Error al insertar datos: " . $conn->error;
    }

    $conn->close();
    session_destroy();
}
