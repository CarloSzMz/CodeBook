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
let aside = document.getElementById("aside")
let divMensaje = document.getElementById("sms_box")
async function obtenerComentariosCursos(idCurso) {
  try {
      const idUsuario = await obtenerIdUsuario();

       // Fetch user's name based on their ID
       const nombreResponse = await fetch(`../PHP/obtenerNombreUsuario.php?id_usuario=${idUsuario}`);
       if (!nombreResponse.ok) {
           throw new Error(`Error al obtener el nombre del usuario. Status: ${nombreResponse.status}`);
       }
       const nombreData = await nombreResponse.json();
       const nombreUsuario = nombreData.nombre;

      const response = await fetch(
          `../PHP/comentarios.php?id_curso=${idCurso}`
      );

      if (!response.ok) {
          throw new Error(
              `Error al obtener comentarios. Status: ${response.status}`
          );
      }

      const comentarios = await response.json();

      comentarios.forEach(comentario => {
         let divSect = document.getElementById("sectioncmt");
      let divTodo = document.createElement("div");
      let divInfo = document.createElement("div");
      let divCmt = document.createElement("div");

      let p1 = document.createElement("p");
      let p2 = document.createElement("p");
      let p3 = document.createElement("p");

      p1.innerHTML = "@" +  nombreUsuario;
      p2.innerHTML = comentario.created_at;
      p3.innerHTML = comentario.Mensaje;

      divInfo.appendChild(p1);
      divInfo.appendChild(p2);
      divCmt.appendChild(p3);

      divTodo.id = "allcmt";
      divInfo.id = "infocmt";
      divCmt.id = "cmt";

      divTodo.appendChild(divInfo);
      divTodo.appendChild(divCmt);
      divSect.appendChild(divTodo);
      });

      console.log(comentarios);
      

  } catch (error) {
      console.error("Error:", error);
  }
}

obtenerComentariosCursos(idCurso);
