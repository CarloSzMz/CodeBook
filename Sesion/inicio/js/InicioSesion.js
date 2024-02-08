document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch("php/InicioSesion.php", {
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