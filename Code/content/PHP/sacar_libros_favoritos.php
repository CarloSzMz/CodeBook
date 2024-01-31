<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
session_start();

$nombre = $_SESSION["nombreUsuario"];
$servername = "localhost";
$username = "root";
$password = "";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
$query = "SELECT Id FROM usuarios WHERE Nombre = '$nombre'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $id = $row['Id'];

    $query2 = "SELECT * FROM favorito_libros WHERE Id_Usuario = '$id'";
    $result2 = $conn->query($query2);

    if ($result2->num_rows > 0) {
        $Libros = array();

        while ($row2 = $result2->fetch_assoc()) {
            $idLibro = $row2["Id_Libro"];

            $queryLibro = "SELECT * FROM libros WHERE Id = '$idLibro'";
            $resultLibro = $conn->query($queryLibro);

            if ($resultLibro->num_rows > 0) {
                while ($rowLibro = $resultLibro->fetch_assoc()) {
                    $Libros[] = $rowLibro;
                }
            }
        }

        
        echo json_encode($Libros);
    }
}

$conn->close();
?>
