<?php
session_start();
$id_curso = $_GET['id_curso'];

$servername = "localhost";
$username = "CodeBookAdmin";
$password = "1234Z";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$query = "SELECT * FROM episodios WHERE Id_curso = $id_curso";
$result = $conn->query($query);


$episodios = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $episodios[] = $row;
    }
}

$conn->close();

echo json_encode($episodios);
?>
