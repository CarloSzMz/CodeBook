// Registro.js

document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
  
    var formData = new FormData(this);
  
    fetch("php/Registro.php", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = "../../Code/content/HTML/content.html"; 
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error("Error:", error));
  });
  