var urlParams = new URLSearchParams(window.location.search);
var idEpisodio2 = urlParams.get('id_episodio');
console.log(idEpisodio2)
fetch('../PHP/videos.php?id_episodio='+idEpisodio2)
  .then(response => response.json())
  .then(data => {
    // Manejar la respuesta del servidor (si es necesario)
    console.log(data);

  })
  .catch(error => console.error('Error:', error));