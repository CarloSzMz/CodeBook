<?php
// Lógica para conectarse a la base de datos y realizar la consulta
// ...
$servername = "localhost";
$username = "root";
$password = "";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);

$queryCheckUser = "SELECT 
libros.Id
, libros.Nombre
, libros.Descripcion
, categorias.Lenguaje AS Categoria
, libros.Fichero
, libros.Miniatura
, libros.created_at
, libros.updated_at 
FROM libros
 LEFT JOIN categorias 
 ON libros.Id_categoria = categorias.Id;";

$resultCheckUser = $conn->query($queryCheckUser);

if ($resultCheckUser->num_rows > 0) {
    echo json_encode($resultCheckUser->fetch_all(MYSQLI_ASSOC));
}
