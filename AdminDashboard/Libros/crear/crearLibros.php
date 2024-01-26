<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "codebook";

    $conn = new mysqli($servername, $username, $password, $database);


    // Recibe los datos del formulario
    $nombre = $_POST["nombre"];
    $desc = $_POST["descripcion"];
    $fichero = $_POST["Fichero"];
    $categoria = $_POST["Categoria"];
    $miniatura = $_POST["Miniatura"];

    $ruta = './Libros/Ficheros/';

    $ficheroFinal = $ruta.$fichero;

    $query = "INSERT INTO libros (Nombre, Descripcion, Fichero, Id_Categoria, Miniatura) VALUES ('$nombre', '$desc', '$ficheroFinal', '$categoria','$miniatura')";

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
