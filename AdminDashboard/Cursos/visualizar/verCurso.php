<?php
// Lógica para conectarse a la base de datos y realizar la consulta
// ...
$servername = "localhost";
$username = "root";
$password = "";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);


$idCurso = $_GET['id'];

$queryCheckUser = "SELECT  
cursos.*
FROM cursos
WHERE cursos.Id = $idCurso;";

$resultCheckUser = $conn->query($queryCheckUser);

if ($resultCheckUser->num_rows > 0) {
    echo json_encode($resultCheckUser->fetch_all(MYSQLI_ASSOC));
}
