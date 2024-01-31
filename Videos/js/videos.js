var urlParams = new URLSearchParams(window.location.search);
var idEpisodio2 = urlParams.get('id_episodio');
console.log(idEpisodio2)
const contenedor = document.getElementById('temas')
let i = 1;

let reproductor = document.getElementById("reproductor");
let video = document.getElementById("videito");
fetch('../PHP/videos.php?id_episodio=' + idEpisodio2)
  .then(response => response.json())
  .then(data => {
    reproductor.src = data.URL
    video.load();
  })
  .catch(error => console.error('Error:', error));


  fetch('../PHP/restoVideos.php?id_episodio='+idEpisodio2)
  .then(response => response.json())
  .then(data => {
   
    console.log(data);
    data.forEach(episodio => {
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
      imagen.src = `..${episodio.Miniatura}`; 
      nuevaEstructura.appendChild(imagen);

      const divTexto = document.createElement('div');
      const parrafo = document.createElement('p');
      parrafo.textContent = episodio.Nombre; 
      divTexto.appendChild(parrafo);
      let pDescripcion = document.createElement("p")
      pDescripcion.textContent = episodio.Descripcion
      divTexto.appendChild(pDescripcion)

      nuevaEstructura.appendChild(divTexto);
      contenedor.appendChild(nuevaEstructura)
      nuevaEstructura.addEventListener("click", ()=>{
        window.location.href = "../../Videos/HTML/videos.html?id_episodio=" + encodeURIComponent(episodio.Id);
      })
      contenedor.appendChild(nuevaEstructura)
    });
    

  })
  .catch(error => console.error('Error:', error));