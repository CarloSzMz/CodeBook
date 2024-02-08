// Registro.js

document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío predeterminado del formulario
  
    var formData = new FormData(this);
  
    fetch("php/Registro.php", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = "../../Code/content/HTML/content.html"; // Redirigir a la página de contenido si el registro es exitoso
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error("Error:", error));
  });
  