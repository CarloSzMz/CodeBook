<?php
// Lógica para conectarse a la base de datos y realizar la consulta
// ...
$servername = "localhost";
$username = "root";
$password = "";
$database = "prueba";

$conn = new mysqli($servername, $username, $password, $database);

// Comprobación del parámetro ID en la URL
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Query para la eliminación del usuario
    $queryEliminarUsuario = "DELETE FROM usuarios WHERE Id = $id";
    $resultEliminarUsuario = $conn->query($queryEliminarUsuario);

    if ($resultEliminarUsuario) {
        // Enviar una respuesta JSON al cliente
        echo json_encode(['success' => true, 'message' => 'Usuario eliminado correctamente']);
    } else {
        // Enviar una respuesta JSON al cliente en caso de error
        echo json_encode(['success' => false, 'message' => 'Error al eliminar el usuario']);
    }
} else {
    // Enviar una respuesta JSON al cliente si no se proporciona el parámetro "id"
    echo json_encode(['success' => false, 'message' => 'ID de usuario no proporcionado']);
}

$conn -> close();
?>