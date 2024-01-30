<?php

class Database
{
    private $host = 'localhost';
    private $usuario = 'root';
    private $clave = '';
    private $base_datos = 'codebook';

    private $conexion;

    // Método para conectar a la base de datos
    public function conectar()
    {
        $this->conexion = new mysqli($this->host, $this->usuario, $this->clave, $this->base_datos);

        if ($this->conexion->connect_error) {
            die("Error de conexión: " . $this->conexion->connect_error);
        }
    }

    public function obtenerResultadoUnico($consulta)
    {
        $resultado = $this->conexion->query($consulta);

        if (!$resultado) {
            die("Error en la consulta: " . $this->conexion->error);
        }

        $fila = $resultado->fetch_assoc();

        return json_encode($fila);
    }
    // Método para ejecutar consultas y obtener resultados en formato JSON
    public function obtenerResultadosJSON($consulta)
    {
        $resultado = $this->conexion->query($consulta);

        if (!$resultado) {
            die("Error en la consulta: " . $this->conexion->error);
        }

        $datos = array();

        while ($fila = $resultado->fetch_assoc()) {
            $datos[] = $fila;
        }

        return json_encode($datos);
    }

    // Método para cerrar la conexión
    public function cerrarConexion()
    {
        $this->conexion->close();
    }
}

?>