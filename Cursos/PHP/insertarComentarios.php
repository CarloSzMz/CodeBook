<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();
$id_curso = $_GET['id_curso'];
$mensaje = $_GET['comentarios'];
$nombre = $_SESSION["nombreUsuario"];

$servername = "localhost";
$username = "CodeBookAdmin";
$password = "1234Z";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$queryUsuario = "SELECT Id FROM usuarios WHERE Nombre = '$nombre'";
$resultUsuario = $conn->query($queryUsuario);

if ($resultUsuario->num_rows > 0) {
    $rowUsuario = $resultUsuario->fetch_assoc();
    $id_usuario = $rowUsuario['Id'];

    $queryInsertar = "INSERT INTO comentarios (Id_Usuario, Id_Curso, Mensaje) VALUES ('$id_usuario', '$id_curso', '$mensaje')";

    if ($conn->query($queryInsertar) === TRUE) {
        echo "Comentario insertado correctamente";
        header("Location: ../HTML/index_cursos.html?id_curso=$id_curso");
        exit();
    } else {
        echo "Error al insertar comentario: " . $conn->error;
    }
} else {
    echo "Usuario no encontrado";
}

$conn->close();
?>
