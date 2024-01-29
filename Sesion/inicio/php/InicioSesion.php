<?php
session_start();
session_destroy();
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST["Correo"];
    $contrasenya = $_POST["Contrasenya1"];

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "codebook";

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $query = "SELECT * FROM usuarios WHERE Correo = '$correo'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        $hashContrasenya = $row["Contraseña"];

        if (password_verify($contrasenya, $hashContrasenya)) {

            $_SESSION["nombreUsuario"] = $row["Nombre"];
            header("Location: ../../../Code/content/HTML/content.html");
            exit();
        } else {
            echo "Error: Contraseña incorrecta.";
        }
    } else {
        echo "Error: Correo electrónico no encontrado.";
    }

    $conn->close();
}
?>
