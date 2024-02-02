<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
session_start();


$servername = "localhost";
$username = "root";
$password = "";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
$idCurso = $_GET["id_curso"];
$nombre = $_SESSION["nombreUsuario"];

$query = "SELECT * FROM usuarios WHERE Nombre = '$nombre'";

$result = $conn->query($query);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $id = $row["Id"];
    }
}

$query2 = "SELECT * FROM favorito_cursos WHERE Id_Usuario = '$id' AND Id_Curso = '$idCurso'";
$result2 = $conn->query($query2);
if ($result2->num_rows > 0) {
    echo "Ya esta en la BBDD";
    $deleteQuery = "DELETE FROM favorito_cursos WHERE Id_Usuario = '$id' AND Id_Curso = '$idCurso'";
    
    if ($conn->query($deleteQuery) === TRUE) {
        echo "Eliminado correctamente de la BBDD";
    } else {
        echo "Error al eliminar de la BBDD: " . $conn->error;
    }
} else {
    echo "No esta aun en la BBDD";
    $insertQuery = "INSERT INTO favorito_cursos (Id_Usuario, Id_Curso) VALUES ('$id', '$idCurso')";
    
    if ($conn->query($insertQuery) === TRUE) {
        echo "Insertado correctamente en la BBDD";
    } else {
        echo "Error al insertar en la BBDD: " . $conn->error;
    }
}
$conn->close();


?>
