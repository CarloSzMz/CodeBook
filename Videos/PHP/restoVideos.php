<?php

$idEp = $_GET['id_episodio'];


session_start();

$servername = "localhost";
$username = "CodeBookAdmin";
$password = "1234Z";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);
$nombre = $_SESSION["nombreUsuario"];
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
$query1 = "SELECT Id_curso FROM episodios WHERE Id = '$idEp'";

$result1 = $conn->query($query1);

$datos1 = array();

if ($result1->num_rows > 0) {
  
    $row1 = $result1->fetch_assoc();
    $datos1 = $row1["Id_curso"];
    
}

$query = "SELECT * FROM episodios WHERE Id != '$idEp' AND Id_curso = '$datos1'";
$result = $conn->query($query);

$datos = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $datos[] = $row;
    }
}

$conn->close();

echo json_encode($datos);

?>