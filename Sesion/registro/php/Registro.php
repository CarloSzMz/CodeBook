<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombreUsuario = $_POST["NombreUsuario"];
    $contrasenya = $_POST["Contrasenya1"];
    $correo = $_POST["Correo"];
    $numero = $_POST["numero"];

    $hashContrasenya = password_hash($contrasenya, PASSWORD_DEFAULT);

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "codebook";

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $queryCheckUser = "SELECT * FROM usuarios WHERE Nombre = '$nombreUsuario'";
    $resultCheckUser = $conn->query($queryCheckUser);
    $queryCheckEmail = "SELECT * FROM usuarios WHERE Correo = '$correo'";
    $resultCheckEmail = $conn->query($queryCheckEmail);

    if ($resultCheckUser->num_rows > 0) {
        echo json_encode(array("success" => false, "message" => "Error: El nombre de usuario ya está en uso."));
    } elseif ($resultCheckEmail->num_rows > 0) {
        echo json_encode(array("success" => false, "message" => "Error: El correo electrónico ya está en uso."));
    } else {
        $query = "INSERT INTO usuarios (Nombre, Correo, Contraseña, Admin, Telefono) VALUES ('$nombreUsuario', '$correo', '$hashContrasenya', 0, $numero)";

        if ($conn->query($query) === TRUE) {
            $_SESSION["nombreUsuario"] = $nombreUsuario;
            echo json_encode(array("success" => true, "message" => "Registro exitoso"));
        } else {
            echo json_encode(array("success" => false, "message" => "Error al insertar datos: " . $conn->error));
        }
    }

    $conn->close();
}
?>
