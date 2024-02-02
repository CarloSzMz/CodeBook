var urlParams = new URLSearchParams(window.location.search);
var nombreUsu = urlParams.get('usuario');
document.getElementById("nombre1").setAttribute("value", nombreUsu)
fetch("../PHP/mostrar_mensajes.php?usuario=" + nombreUsu)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // Supongamos que tienes un elemento en el DOM con el ID "chatContainer" donde deseas mostrar los mensajes
    var chatContainer = document.getElementById("chatContainer");

    // Itera sobre cada mensaje en el array
    data.forEach((mensaje) => {
      // Crea un nuevo elemento de mensaje
      var mensajeElement = document.createElement("div");
      mensajeElement.classList.add("mensaje");

      // Agrega el contenido del mensaje al elemento
      mensajeElement.innerHTML = `<strong>${mensaje.nombreRemitente}:</strong> ${mensaje.mensaje}`;

      // Agrega el elemento de mensaje al contenedor del chat
      chatContainer.appendChild(mensajeElement);
    });
  })
  .catch((error) => console.error("Error:", error));

