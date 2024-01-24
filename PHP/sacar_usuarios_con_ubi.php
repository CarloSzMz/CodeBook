<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "BBDDProyecto";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$queryUsuariosUbicacion = "SELECT * FROM usuarios WHERE longitud IS NOT NULL";

$resultadoUsuariosUbicacion = $conn->query($queryUsuariosUbicacion);

if($resultadoUsuariosUbicacion->num_rows > 0){

    echo json_encode($resultadoUsuariosUbicacion->fetch_all(MYSQLI_ASSOC));
}

$conn->close();
?>