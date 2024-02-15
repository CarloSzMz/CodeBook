<?php
// Lógica para conectarse a la base de datos y realizar la consulta
// ...
$servername = "localhost";
$username = "CodeBookAdmin";
$password = "1234Z";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);


$idCurso = $_GET['id'];

$queryCheckUser = "SELECT  
comentarios.*
,usuarios.Nombre
FROM comentarios
LEFT JOIN usuarios
ON comentarios.Id_Usuario = usuarios.Id
WHERE comentarios.Id_Curso = $idCurso


;";

$resultCheckUser = $conn->query($queryCheckUser);

if ($resultCheckUser->num_rows > 0) {
    echo json_encode($resultCheckUser->fetch_all(MYSQLI_ASSOC));
}

?>