<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $servername = "localhost";
    $username = "CodeBookAdmin";
    $password = "1234Z";
    $database = "codebook";

    $conn = new mysqli($servername, $username, $password, $database);

    $nombre = $_POST["NombreCurso"];
    $desc = $_POST["Descripcion"];
    $categoria = $_POST["Categoria"];
    $miniatura = $_POST["Miniatura"];

    $query = "INSERT INTO cursos (Nombre, Descripcion, Id_Categoria, Miniatura) VALUES ('$nombre', '$desc', '$categoria','$miniatura')";

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
?>