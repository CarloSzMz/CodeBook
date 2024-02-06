<?php
session_start();

if (isset($_SESSION['nombreUsuario'])) {

    session_destroy();

    $_SESSION['nombreUsuario'] = null;

    echo "Después de destruir la sesión: " . $_SESSION['nombreUsuario'];

    setcookie(session_name(), "", time() - 3600, "/");

    header("Location: ../../Login/IniciarSesion.html");;
    exit();
} else {

    header("Location: ../../Login/IniciarSesion.html");;
    exit();
}
