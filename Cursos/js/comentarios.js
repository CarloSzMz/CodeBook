function obtenerValorParametro(nombreParametro) {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get(nombreParametro);
  }

  // const idCurso = obtenerValorParametro('id_curso');
  const idCurso = 6;

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

    //tratamos los comentarios
        
      
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Llama a la función para obtener los episodios
  obtenerEpisodios(idCurso);
