<?php
$carpeta = '../Ficheros';
$archivos = array_diff(scandir($carpeta), array('..', '.'));

// Devolver la lista de archivos como JSON
echo json_encode($archivos);
//json_encode($archivos->fetch_all(MYSQLI_ASSOC));
