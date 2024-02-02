let edit = document.querySelectorAll(".editar");
let change = document.querySelectorAll(".change");
let texto = "";

for (let i = 0; i < edit.length; i++) {
  edit[i].addEventListener("click", editar);
  change[i].addEventListener("click", editar);
}

function editar() {
  let frase = this.textContent.split(" ");
  texto = this.textContent.split(" ");

  let page = window.open("../../edit-change/HTML/edit-phone.html");
  page.addEventListener("DOMContentLoaded", () => {
    localStorage.setItem("texto", texto);

    //SUBHEADER
    let sub_header = page.document.getElementById("sub_header");
    sub_header.innerHTML = frase.join(" ");

    //OLD
    frase[0] = "Old";
    let viejo = page.document.getElementById("viejo");
    viejo.setAttribute("placeholder", frase.join(" "));

    //NEW
    frase[0] = "New";
    let nuevo = page.document.getElementById("nuevo");
    nuevo.setAttribute("placeholder", frase.join(" "));
  });
}

if (
  location.href ==
  "http://localhost/codebook/Settings/edit-change/HTML/edit-phone.html"
) {
  console.log("entro");

  texto = localStorage.getItem("texto");

  //SUBHEADER
  console.log(texto);
  texto = texto.split(",");
  let subH = document.getElementById("sub_header");
  subH.innerHTML = texto.join(" ");

  //OLD
  texto[0] = "Old";
  let v = document.getElementById("viejo");
  v.setAttribute("placeholder", texto.join(" "));

  //NEW
  texto[0] = "New";
  let n = document.getElementById("nuevo");
  n.setAttribute("placeholder", texto.join(" "));

  //Boton edit
  let btn_edit = document.getElementById("btn_edit");
  btn_edit.addEventListener("click", () => {
    window.close();
    alert("Cambio hecho");
  });
}
