<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./content.css" />
  </head>
  <body>
    <header>
      <p id="logo">CODE<span style="color: gold">BOOK</span></p>
      <nav>
        <img src="./Property 1=Default.jpg" />
      </nav>
    </header>
    <div id="sub_header">CONTENT</div>
    <div id="select">
      <select id="category" name="category">
        <option value="all">All</option>
        <option value="courses">Courses</option>
        <option value="books">Books</option>
      </select>
    </div>

    <main>
      <div class="lineas">
        <p id="labelCursos">Courses</p>
        <hr />
      </div>
      <div id="cursos"></div>
      <div class="lineas">
        <p id="labelLibros">Books</p>
        <hr />
      </div>
      <div id="libros"></div>
    </main>
    <footer></footer>
  </body>
  <script>

    let miSelect = document.getElementById("category")

    let labelLibros = document.getElementById("labelLibros")
    let labelCursos = document.getElementById("labelCursos")
    miSelect.addEventListener("change", function() {
       
        let selectedValue = miSelect.value;
        let divCursos = document.getElementById("cursos")
        let divLibros = document.getElementById("libros")
        if(selectedValue == "courses"){
          labelLibros.style.display = "none"
          labelCursos.style.display = "flex"
          divLibros.style.display = "none"
          divCursos.style.display = "flex"
        }else if(selectedValue == "books"){
          labelLibros.style.display = "flex"
          labelCursos.style.display = "none"
          divCursos.style.display = "none"
          divLibros.style.display = "flex"
        }else{
          divCursos.style.display = "flex"
          divLibros.style.display = "flex"
          labelLibros.style.display = "flex"
          labelCursos.style.display = "flex"
        }
    });
    // Utilizar AJAX para obtener los datos de cursos
    fetch("../PHP/sacar_cursos.php")
      .then((response) => response.json())
      .then((data) => {
        // Insertar los datos en la tabla
        const contenedorCursos = document.getElementById("cursos");

        data.forEach((curso) => {
          const divContent = document.createElement("div");
          divContent.className = "content";

          const imgMiniatura = document.createElement("img");
          imgMiniatura.src = curso.Miniatura;

          const divDescripcion = document.createElement("div");
          const pNombre = document.createElement("p");
          pNombre.textContent = curso.Nombre;

          const imgOtro = document.createElement("img");
          imgOtro.src = "../img/1";

          // Adjuntar elementos al div de contenido
          divDescripcion.appendChild(pNombre);
          divDescripcion.appendChild(imgOtro);

          divContent.appendChild(imgMiniatura);
          divContent.appendChild(divDescripcion);

          // Adjuntar el div de contenido al contenedor general
          contenedorCursos.appendChild(divContent);
        });
      })
      .catch((error) => console.error("Error al obtener los datos:", error));

      fetch("../PHP/sacar_libros.php")
      .then((response) => response.json())
      .then((data) => {
        // Insertar los datos en la tabla
        const contenedorLibros = document.getElementById("libros");

        data.forEach((libro) => {
          const divContent = document.createElement("div");
          divContent.className = "content";

          const imgMiniatura = document.createElement("img");
          imgMiniatura.src = libro.Miniatura;

          const divDescripcion = document.createElement("div");
          const pNombre = document.createElement("p");
          pNombre.textContent = libro.Nombre;

          const imgOtro = document.createElement("img");
          imgOtro.src = "../img/1";

          // Adjuntar elementos al div de contenido
          divDescripcion.appendChild(pNombre);
          divDescripcion.appendChild(imgOtro);

          divContent.appendChild(imgMiniatura);
          divContent.appendChild(divDescripcion);

          // Adjuntar el div de contenido al contenedor general
          contenedorLibros.appendChild(divContent);
        });
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  </script>
</html>
