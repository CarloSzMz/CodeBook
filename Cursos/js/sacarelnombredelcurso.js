let tituloCurso = document.getElementById("sub_header")
let descripcion = document.getElementById("desc")
fetch('../PHP/sacarelnombredelcurso.php?id_curso=' + idCurso2)
  .then(response => response.json())
  .then(data => {
    descripcion.textContent = data.Descripcion;
    tituloCurso.textContent = data.Nombre
  })
  .catch(error => console.error('Error:', error));