<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombreEditado = $_POST["nombre"];
    $descripcionEditado = $_POST["descripcion"];
    $miniaturaEditado = $_POST["miniatura"];
    $id_cursos = $_POST["id"];


    $servername = "localhost";
    $username = "CodeBookAdmin";
    $password = "1234Z";
    $database = "codebook";

    $conn = new mysqli($servername, $username, $password, $database);

    $query = "UPDATE cursos SET Nombre = '$nombreEditado', Descripcion = '$descripcionEditado', Miniatura = '$miniaturaEditado'  WHERE Id = '$id_cursos'";

    if ($conn->query($query) === TRUE) {
        echo "Datos guardados correctamente.";
        $_SESSION["nombreUsuario"] = $nombreUsuario;
        header("Location: ../../AdminDashboard.html");
        exit();
    } else {
        echo "Error al insertar datos: " . $conn->error;
    }
    $conn->close();
    session_destroy();
}
?>