<?php
// Lógica para conectarse a la base de datos y realizar la consulta
// ...
$servername = "localhost";
$username = "CodeBookAdmin";
$password = "1234Z";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);

$queryCheckUser = "SELECT  
cursos.Id
,cursos.Nombre
,cursos.Descripcion
,categorias.Lenguaje AS Categoria
,cursos.Miniatura
,cursos.created_at
,cursos.updated_at
FROM cursos
LEFT JOIN categorias 
 ON cursos.Id_Categoria = categorias.Id;";
$resultCheckUser = $conn->query($queryCheckUser);

if ($resultCheckUser->num_rows > 0) {
    echo json_encode($resultCheckUser->fetch_all(MYSQLI_ASSOC));
}
?>