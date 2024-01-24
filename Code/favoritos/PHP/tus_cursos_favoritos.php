<?php
error_reporting(E_ALL);

ini_set('display_errors', '1');
    session_start();

    $_SESSION["nombreUsuario"] = "david";

    $nombre = $_SESSION["nombreUsuario"];
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "BBDDProyecto";
    
    $conn = new mysqli($servername, $username, $password, $database);
    
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
    
    $query = "SELECT Id FROM usuarios WHERE Nombre = '$nombre'";

    $result = $conn->query($query);

    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $id = $row['Id'];
        echo "User ID: $id";
    }

    $query2 = "SELECT Id_Curso FROM favorito_cursos WHERE Id_Usuario = '$id' ";

    $result2 = $conn->query($query2);

    
    if ($result2->num_rows > 0) {
        echo "Cursos: ";

    while ($row = $result2->fetch_assoc()) {
        $idCurso = $row["Id_Curso"];
        echo "$idCurso ";
    }
}
    $conn->close();
    
?>