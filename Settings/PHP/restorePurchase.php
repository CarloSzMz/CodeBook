<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "codebook";

$conn = new mysqli($servername, $username, $password, $database);
$nombre = $_SESSION["nombreUsuario"];

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$query = "SELECT Id FROM usuarios WHERE Nombre = '$nombre'";
$result = $conn->query($query);

$datos = array();

if ($result->num_rows > 0) {
  
    $row = $result->fetch_assoc();
    $datos = $row["Id"];
}

$query2 = "SELECT * FROM `inventario_curso` WHERE `Id_Usuario`= '$datos'";
$result2 = $conn->query($query2);

if ($result2) {
    // Delete the last row if there's at least one row
    if ($result2->num_rows > 0) {
        // Move the pointer to the last row
        $result2->data_seek($result2->num_rows - 1);
        $last_row = $result2->fetch_assoc();

        // Delete the last row using its primary key 
        $id_to_delete = $last_row['Id'];
        $delete_query = "DELETE FROM `inventario_curso` WHERE `Id` = '$id_to_delete'";
        $delete_result = $conn->query($delete_query);
        if ($delete_result) {
            echo "Last row deleted successfully.";
        } else {
            echo "Error deleting last row: " . $conn->error;
        }
    } else {
        echo "No rows to delete.";
    }
} else {
    echo "Error in inventory query: " . $conn->error;
}

$conn->close();
?>
