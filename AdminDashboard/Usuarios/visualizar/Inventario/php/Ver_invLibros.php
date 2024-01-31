<?php
// Lógica para conectarse a la base de datos y realizar la consulta
// ...
$servername = "localhost";
$username = "root";
$password = "";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);


$idUser = $_GET['id'];

$queryCheckUser = "SELECT libros.* FROM libros
LEFT JOIN inventario_libros IL
ON libros.Id = IL.Id_Libro
WHERE IL.Id_Usuario = $idUser;
";

$resultCheckUser = $conn->query($queryCheckUser);

if ($resultCheckUser->num_rows > 0) {
    echo json_encode($resultCheckUser->fetch_all(MYSQLI_ASSOC));
}
