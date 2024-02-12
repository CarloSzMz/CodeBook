<?php
// Lógica para conectarse a la base de datos y realizar la consulta
// ...
$servername = "localhost";
$username = "root";
$password = "";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);


$idUser = $_GET['id'];

$queryCheckUser = "SELECT 
comentarios.Id
,comentarios.Mensaje
,cursos.Nombre as Curso
,comentarios.created_at
FROM comentarios
LEFT JOIN cursos
ON comentarios.Id_Curso = cursos.Id
WHERE comentarios.Id_Usuario = $idUser;
";

$resultCheckUser = $conn->query($queryCheckUser);

if ($resultCheckUser->num_rows > 0) {
    echo json_encode($resultCheckUser->fetch_all(MYSQLI_ASSOC));
}
