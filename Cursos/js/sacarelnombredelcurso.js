let tituloCurso = document.getElementById("sub_header")
fetch('../PHP/sacarelnombredelcurso.php?id_curso=' + idCurso2)
  .then(response => response.json())
  .then(data => {
    // Manejar la respuesta del servidor (si es necesario)
    console.log(data);
    tituloCurso.textContent = data.Nombre
  })
  .catch(error => console.error('Error:', error));