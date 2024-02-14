function demanda() {
  let campo= queCambiar();
  console.log(campo);
  let newName = document.getElementById("nuevo"); // Define newName here
  
  let peticion = new Request("/Codebook/Settings/PHP/cambiarDatosCuenta.php", {
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    body: "newName=" + newName.value + "&campo=" + campo + "&nocache=" + Math.random(),
  });

  fetch(peticion)
    .then((response) => response.json()) // Call response.json() to parse JSON
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error:", error));
}


function queCambiar(){
  let sub= document.getElementById("sub_header").textContent;
  if(sub.split(" ")[1] == "Phone"){
    return "telefono";
  }

  if(sub.split(" ")[1] == "Email"){
    return "Correo";
  }

  if(sub.split(" ")[1] == "Password"){
    return "Contraseña";
  }

  if(sub.split(" ")[1] == "User"){
    return "Nombre";
  }
  
}

window.onload = function () {
  //Boton edit
  let btn_edit = document.getElementById("btn_edit");
  btn_edit.addEventListener("click", () => {
    demanda();
    alert("Cambio hecho");
    window.close();
  });
};

