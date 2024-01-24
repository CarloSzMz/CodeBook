<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Verificar si el parámetro 'nombreRemitente' está presente en la solicitud POST
    if (isset($_POST["nombreRemitente"])) {
        // Recuperar el valor de 'nombreRemitente'
        $nombreRemitente = $_POST["nombreRemitente"];
        // Ahora puedes utilizar la variable $nombreRemitente como desees
        // Por ejemplo, podrías almacenarlo en una base de datos, realizar alguna lógica de negocios, etc.

        // Envía una respuesta al cliente (puede ser un mensaje de éxito, etc.)
        echo "Datos recibidos correctamente. Nombre del remitente: " . $nombreRemitente . "<br>";
    } else {
        // Si 'nombreRemitente' no está presente en la solicitud POST
        echo "Error: Falta el parámetro 'nombreRemitente' en la solicitud POST.". "<br>";;
    }
} else {
    // Si la solicitud no es de tipo POST
    echo "Error: Esta página solo acepta solicitudes POST.". "<br>";;
}

$nombre1 ="pepe";
    
$servername = "localhost";
$username = "root";
$password = "";
$database = "BBDDProyecto";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$nombre2 = $_SESSION["nombreUsuario"]; 


$query = "SELECT * FROM mensajes WHERE (nombreRemitente = '$nombre1' AND nombreDestinatario = '$nombre2') OR (nombreRemitente = '$nombre2' AND nombreDestinatario = '$nombre1')";

$result = $conn->query($query);

if (!$result) {
    die("Error en la consulta: " . $conn->error);
}


if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

        $mensajeId = $row['Id'];
        $remitenteId = $row['nombreRemitente'];
        $destinatarioId = $row['nombreDestinatario'];
        $contenido = $row['mensaje'];


        echo "$remitenteId: $contenido <br>";
    }
} else {
    echo "No se encontraron mensajes para el usuario con ID $idUsuario";
}

$conn->close();
?>
