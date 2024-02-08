<?php
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
            echo json_encode(array("success" => true, "message" => "Login exitoso"));
        } else {
            echo json_encode(array("success" => false, "message" => "Error: Contraseña incorrecta."));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Error: Correo electrónico no encontrado."));
    }

    $conn->close();
}
?>
