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
        <option value="courses">All</option>
        <option value="courses">Courses</option>
        <option value="books">Books</option>
      </select>
    </div>

    <main>
      <div class="lineas">
        <p>Courses</p>
        <hr />
      </div>
      <div id="cursos"></div>
      <div class="lineas">
        <p>Books</p>
        <hr />
      </div>
      <div id="libros"></div>
    </main>
    <footer></footer>
  </body>
  <script>
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
  </script>
</html>
