<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
session_start();

$nombre = $_SESSION["nombreUsuario"];
$servername = "localhost";
$username = "CodeBookAdmin";
$password = "1234Z";
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

    $query2 = "SELECT * FROM favorito_cursos WHERE Id_Usuario = '$id'";
    $result2 = $conn->query($query2);

    if ($result2->num_rows > 0) {
        $cursos = array();

        while ($row2 = $result2->fetch_assoc()) {
            $idCurso = $row2["Id_Curso"];

            $queryCurso = "SELECT * FROM cursos WHERE Id = '$idCurso'";
            $resultCurso = $conn->query($queryCurso);

            if ($resultCurso->num_rows > 0) {
                while ($rowCurso = $resultCurso->fetch_assoc()) {
                    $cursos[] = $rowCurso;
                }
            }
        }

        
        echo json_encode($cursos);
    }
}

$conn->close();
?>
