async function obtenerIdUsuario() {
  try {
      const response = await fetch('../PHP/sacarIdUsuarioActual.php');
      if (!response.ok) {
          throw new Error(`Error al obtener Id_Usuario. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      return data.Id;
  } catch (error) {
      console.error('Error al obtener Id_Usuario:', error);
      return null;
  }
}

async function obtenerComentariosCursos(idCurso) {
  try {
      const idUsuario = await obtenerIdUsuario();

      const response = await fetch(
          `../PHP/comentarios.php?id_curso=${idCurso}`
      );

      if (!response.ok) {
          throw new Error(
              `Error al obtener comentarios. Status: ${response.status}`
          );
      }

      const comentarios = await response.json();

      // Asignar clase diferente a los comentarios según el Id_Usuario
      comentarios.forEach(comentario => {
          if (comentario.Id_Usuario == idUsuario) {
              // Asignar una clase específica para los comentarios del usuario actual
              comentario.clase = 'comentario-usuario-actual';
          } else {
              // Asignar una clase diferente para otros comentarios
              comentario.clase = 'otro-comentario';
          }
      });

      // Hacer algo con los comentarios, por ejemplo, mostrarlos en la consola
      console.log(comentarios);
      
      // Puedes manipular el DOM para mostrar los comentarios con las clases asignadas
      // Ejemplo: renderizarComentarios(comentarios);

  } catch (error) {
      console.error("Error:", error);
  }
}

// Llamada inicial para obtener los comentarios
obtenerComentariosCursos(idCurso);
