<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Verificar si el parámetro 'nombreRemitente' está presente en la solicitud POST
   
        // Recuperar el valor de 'nombreRemitente'
        $nombreRemitente = $_GET["usuario"];
        // Ahora puedes utilizar la variable $nombreRemitente como desees
        // Por ejemplo, podrías almacenarlo en una base de datos, realizar alguna lógica de negocios, etc.

        // Envía una respuesta al cliente (puede ser un mensaje de éxito, etc.)
       
}

$nombre2 =$nombreRemitente;
echo "<bR> chat con: ".$nombre2."<br>";
$servername = "localhost";
$username = "root";
$password = "";
$database = "BBDDProyecto";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

//$nombre2 = $_SESSION["nombreUsuario"]; 
$nombre1 = "david";


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
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="post" action="../PHP/almacenar_mensajes.php">
        <input type="hidden" name="nombre1" value="<?php echo htmlspecialchars($nombre1); ?>">
        <input type="hidden" name="nombre2" value="<?php echo htmlspecialchars($nombre2); ?>">
        <input type="text" id="mensaje" name="mensaje">
        <input type="submit" value="Enviar">
    </form>
</body>
</html>