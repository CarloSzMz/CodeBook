<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "prueba";

    $conn = new mysqli($servername, $username, $password, $database);


    // Recibe los datos del formulario
    $nombre = $_POST[""];
    $desc = $_POST[""];
    $fichero = $_POST[""];
    $categoria = $_POST[""];

    /*

    $query = "INSERT INTO libros (Nombre, Descripcion, Fichero, Categoria) VALUES ('$nombre', '$desc', '$fichero', '$categoria')";

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
    */
}
