let html = document.getElementsByTagName("html")[0];
let botonComprar = document.getElementById("comprar");
fetch("../PHP/estaComprado.php?id_curso=" + idCurso2)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data == "no comprado") {
      document.body.classList.toggle("difuminar");
      
      html.classList.toggle("difuminar");
      let divTemas = document.querySelectorAll(".content");
      divTemas.forEach((tema) => {
        tema.style.pointerEvents = "none";
      });
      divMensaje.style.pointerEvents = "none";
    } else {
      botonComprar.style.display = "none";
      document.body.classList.remove("difuminar");
      html.classList.remove("difuminar");
      botonComprar.classList.toggle("ocultar");
    }
  })
  .catch((error) => console.error("Error:", error));

botonComprar.addEventListener("click", () => {
  fetch("../PHP/comprar.php?id_curso=" + idCurso2)
    .then((response) => {
      if (response.ok) {
        console.log("Compra realizada con éxito");
      } else {
        console.error("Error en la solicitud de compra");
      }
      location.reload(true);
    })
    .catch((error) => {
      console.error("Error en la solicitud de compra: ", error);
      location.reload(true);
    });
});
