let select = document.getElementById("category");
    function AnyadirTemas(cantidad) {
      for (let i = 0; i < cantidad; i++) {
        let option = document.createElement("option");
        let value = document.createAttribute("value");
        value.value = "Tema" + (i + 1);
        option.innerHTML = "Tema " + (i + 1);
        option.setAttributeNode(value);
        select.appendChild(option);
      }
    }
    

    function obtenerValorParametro(nombreParametro) {
      const parametros = new URLSearchParams(window.location.search);
      return parametros.get(nombreParametro);
    }

    const idCurso = obtenerValorParametro('id_curso');

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
        let NumeroEpisodios = episodios.length
        console.log(episodios);
        const contenedor = document.getElementById('temas')
        let i = 1;
        AnyadirTemas(NumeroEpisodios);
        episodios.forEach(episodio => {
         
          const divLinea = document.createElement('div');
          divLinea.classList.add('lineas');
          let p = document.createElement("p")
          p.classList.add("labelCursos")
          p.textContent = "Tema "+i;
          i++
          divLinea.appendChild(p)
          let hr = document.createElement("hr")
          divLinea.appendChild(hr)
          contenedor.appendChild(divLinea)
          const nuevaEstructura = document.createElement('div');
          nuevaEstructura.classList.add('content');
    
          const imagen = document.createElement('img');
          imagen.src = `../img/${episodio.Miniatura}`; 
          nuevaEstructura.appendChild(imagen);
    
          const divTexto = document.createElement('div');
          const parrafo = document.createElement('p');
          parrafo.textContent = episodio.Nombre; 
          divTexto.appendChild(parrafo);
          let pDescripcion = document.createElement("p")
          pDescripcion.textContent = episodio.Descripcion
          divTexto.appendChild(pDescripcion)
          nuevaEstructura.appendChild(divTexto);
    
          nuevaEstructura.addEventListener("click", ()=>{
            window.location.href = "../../Videos/HTML/videos.html?id_episodio=" + encodeURIComponent(episodio.Id);
          })
          contenedor.appendChild(nuevaEstructura);
          
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }

    obtenerEpisodios(idCurso);
