let sub_header= document.getElementById("sub_header");

let menu_open= document.getElementById("menu_open");
let open=true;
let menu_close= document.getElementById("menu_close");

menu_open.addEventListener("click",menu);
menu_close.addEventListener("click",menu);

function menu() {
    let nav= document.getElementById("desplegable");
    if(open){
        sub_header.style.zIndex="0";
        nav.style.zIndex="1";
        nav.style.display="block";
        open=false;
    }else{
        sub_header.style.zIndex="1";
        nav.style.zIndex="0";
        nav.style.display="none";
        open=true;
    }
    
}

fetch("../PHP/sacar_inventario_cursos.php")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const contenedorCursos = document.getElementById("cursos");

        data.forEach((curso) => {
          const divContent = document.createElement("div");
          divContent.className = "content";
          divContent.id = curso.Id;

          const imgMiniatura = document.createElement("img");
          imgMiniatura.src = curso.Miniatura;

          const divDescripcion = document.createElement("div");
          const pNombre = document.createElement("p");
          pNombre.textContent = curso.Nombre;

          const imgOtro = document.createElement("img");
          imgOtro.src = "../img/corazon.png";
          imgOtro.style.maxHeight = "30px";
          imgOtro.style.maxWidth = "30px";
          imgOtro.setAttribute("id", "corazonImagen");

          divDescripcion.appendChild(pNombre);
          divDescripcion.appendChild(imgOtro);

          divContent.appendChild(imgMiniatura);
          divContent.appendChild(divDescripcion);

          contenedorCursos.appendChild(divContent);
          clicar();
          function clicar() {
            divContent.addEventListener("click", () => {
              let variableAEnviar = curso.Id;
              let nuevaURL = `../../Cursos/HTML/index_cursos.html?id_curso=${encodeURIComponent(
                variableAEnviar
              )}`;
              window.location.href = nuevaURL;
            });
          }
        });
      })
      .catch((error) => console.error("Error al obtener los datos:", error));

      fetch("../PHP/sacar_inventario_libros.php")
      .then((response) => response.json())
      .then((data) => {
        const contenedorlibros = document.getElementById("libros");

        data.forEach((libro) => {
          const divContent = document.createElement("div");
          divContent.className = "content";
          divContent.id = libro.Id;

          const imgMiniatura = document.createElement("img");
          imgMiniatura.src = libro.Miniatura;

          const divDescripcion = document.createElement("div");
          const pNombre = document.createElement("p");
          pNombre.textContent = libro.Nombre;

          const imgOtro = document.createElement("img");
          imgOtro.src = "../img/corazon.png";
          imgOtro.style.maxHeight = "30px";
          imgOtro.style.maxWidth = "30px";
          imgOtro.setAttribute("id", "corazonImagen");

          divDescripcion.appendChild(pNombre);
          divDescripcion.appendChild(imgOtro);

          divContent.appendChild(imgMiniatura);
          divContent.appendChild(divDescripcion);

          contenedorlibros.appendChild(divContent);

          clicar();
          function clicar() {
            divContent.addEventListener("click", () => {
              let variableAEnviar = libro.Id;
              let nuevaURL = `../../Libros/HTML/libros.html?id_libro=${encodeURIComponent(
                variableAEnviar
              )}`;
              window.location.href = nuevaURL;
            });
          }
        });
      })
      .catch((error) => console.error("Error al obtener los datos:", error));