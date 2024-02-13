<?php
// Lógica para conectarse a la base de datos y realizar la consulta
// ...
$servername = "localhost";
$username = "root";
$password = "";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);

$queryCheckUser = "SELECT  
episodios.Id
,episodios.Nombre
,episodios.Descripcion
,cursos.Nombre AS Curso
,episodios.URL
,cursos.created_at
,cursos.updated_at
FROM episodios
LEFT JOIN cursos 
 ON episodios.Id_curso = cursos.Id;";
$resultCheckUser = $conn->query($queryCheckUser);

if ($resultCheckUser->num_rows > 0) {
    echo json_encode($resultCheckUser->fetch_all(MYSQLI_ASSOC));
}
