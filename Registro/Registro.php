<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombreUsuario = $_POST["NombreUsuario"];
    $contrasenya = $_POST["Contrasenya1"];
    $correo = $_POST["Correo"];

    $hashContrasenya = password_hash($contrasenya, PASSWORD_DEFAULT);

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "codebook";

    $conn = new mysqli($servername, $username, $password, $database);

    $queryCheckUser = "SELECT * FROM usuarios WHERE Nombre = '$nombreUsuario'";
    $resultCheckUser = $conn->query($queryCheckUser);
    $queryCheckEmail = "SELECT * FROM usuarios WHERE Correo = '$correo'";
    $resultCheckEmail = $conn->query($queryCheckEmail);


    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
    if ($resultCheckUser->num_rows > 0) {
        echo "Error: El nombre de usuario ya está en uso.";
    } elseif ($resultCheckEmail->num_rows > 0) {
        echo "Error: El correo electrónico ya está en uso.";
    } else {

        $query = "INSERT INTO usuarios (Nombre, Correo, Contraseña, Admin) VALUES ('$nombreUsuario', '$correo', '$hashContrasenya', 0)";

        if ($conn->query($query) === TRUE) {
            echo "Datos insertados correctamente.";
            $_SESSION["nombreUsuario"] = $nombreUsuario;
            header("Location: ../AdminDashboard/AdminDashboard.html");
            exit();
        } else {
            echo "Error al insertar datos: " . $conn->error;
        }

        $conn->close();
        session_destroy();
    }
}
?>