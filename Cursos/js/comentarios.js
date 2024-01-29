async function obtenerComentariosCuros(idCurso) {
    try {
      const response = await fetch(
        `../PHP/comentarios.php?id_curso=${idCurso}`
      );

      if (!response.ok) {
        throw new Error(
          `Error al obtener episodios. Status: ${response.status}`
        );
      }

      const comentarios = await response.json();
      console.log(comentarios)
      //falta tratar los comentarios para mostrarlos como si fuera un array asociativo;
      
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Llama a la función para obtener los episodios
  obtenerComentariosCuros(idCurso);
