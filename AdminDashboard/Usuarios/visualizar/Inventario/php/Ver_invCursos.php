<?php
// Lógica para conectarse a la base de datos y realizar la consulta
// ...
$servername = "localhost";
$username = "CodeBookAdmin";
$password = "1234Z";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);


$idUser = $_GET['id'];

$queryCheckUser = "SELECT cursos.*
,IC.Id AS Relacion
FROM cursos
LEFT JOIN inventario_curso IC
ON cursos.Id = IC.Id_Curso
WHERE IC.Id_Usuario = $idUser;
";

$resultCheckUser = $conn->query($queryCheckUser);

if ($resultCheckUser->num_rows > 0) {
    echo json_encode($resultCheckUser->fetch_all(MYSQLI_ASSOC));
}
