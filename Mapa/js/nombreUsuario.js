let urlParams = new URLSearchParams(window.location.search);
let nombreUsu = urlParams.get('usuario');
document.getElementById("nombre1").setAttribute("value", nombreUsu)
fetch("../PHP/mostrar_mensajes.php?usuario=" + nombreUsu)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let chatContainer = document.getElementById("chatContainer");

    data.forEach((mensaje) => {
      let mensajeElement = document.createElement("div");
      mensajeElement.classList.add("mensaje");

      mensajeElement.innerHTML = `<strong>${mensaje.nombreRemitente}:</strong> ${mensaje.mensaje}`;

      chatContainer.appendChild(mensajeElement);
    });
  })
  .catch((error) => console.error("Error:", error));

