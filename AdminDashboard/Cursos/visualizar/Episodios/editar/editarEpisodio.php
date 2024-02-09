<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Id = $_POST["id"];
    $Nombre = $_POST["nombre"];
    $Desc = $_POST["descripcion"];
    $Mini = $_POST["miniatura"];
    $curso = $_POST["curso"];


    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "codebook";

    $conn = new mysqli($servername, $username, $password, $database);

    $query = "UPDATE episodios 
    SET Nombre = '$Nombre'
    ,Descripcion = '$Desc'  
    ,Miniatura = '$Mini'
    WHERE Id = '$Id'";

    if ($conn->query($query) === TRUE) {
        echo "Datos guardados correctamente.";
        header("Location: ../../verCurso.html?id=$curso");
        exit();
    } else {
        echo "Error al insertar datos: " . $conn->error;
    }
    $conn->close();
    session_destroy();
}
