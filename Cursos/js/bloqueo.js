document.body.classList.toggle("difuminar");
let html = document.getElementsByTagName("html")[0];
html.classList.toggle("difuminar");

let div = document.getElementById("comprar");
div.addEventListener("click", difuminar);
function difuminar() {
  document.body.classList.remove("difuminar");
  html.classList.remove("difuminar");
  div.classList.toggle("ocultar");
}
