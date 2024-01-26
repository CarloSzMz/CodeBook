let select = document.getElementById("category");
    function AnyadirTemas() {
      for (let i = 0; i <= 5; i++) {
        let option = document.createElement("option");
        let value = document.createAttribute("value");
        value.value = "Tema" + (i + 1);
        option.innerHTML = "Tema " + (i + 1);
        option.setAttributeNode(value);
        select.appendChild(option);
      }
    }
    AnyadirTemas();

    function obtenerValorParametro(nombreParametro) {
      const parametros = new URLSearchParams(window.location.search);
      return parametros.get(nombreParametro);
    }

    // const idCurso = obtenerValorParametro('id_curso');
    const idCurso = 6;

    async function obtenerEpisodios(idCurso) {
      try {
        const response = await fetch(
          `../PHP/sacar_episodios_curso.php?id_curso=${idCurso}`
        );

        if (!response.ok) {
          throw new Error(
            `Error al obtener episodios. Status: ${response.status}`
          );
        }

        const episodios = await response.json();
        // Haz algo con los datos de los episodios, por ejemplo, mostrarlos en la consola
        console.log(episodios);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    // Llama a la función para obtener los episodios
    obtenerEpisodios(idCurso);