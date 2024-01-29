// Obtener el ID del parámetro en la URL
var urlParams = new URLSearchParams(window.location.search);
var idCurso = urlParams.get('id');
console.log("ID Recuperado: " + idCurso);

var infoCurso = [];
var episodiosCurso = [];
var comentariosCurso = [];
var divComentarios = document.getElementById("Comentarios");
var divEpisodios = document.getElementById("Episodios");


// Detalles del curso
fetch(`./verCurso.php?id=${idCurso}`)
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {
        // Manejar datos obtenidos (en este caso, imprimir en la consola)
        infoCurso = JSON.parse(JSON.stringify(data));

        console.log("Info del curso:\n");
        console.log(infoCurso);
    })

    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    })

// Episodios del curso
fetch(`./verEpisodios.php?id=${idCurso}`)
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {
        // Manejar datos obtenidos (en este caso, imprimir en la consola)
        episodiosCurso = JSON.parse(JSON.stringify(data));

        console.log("Episodios del curso:\n");
        console.log(episodiosCurso);
    })

    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    })

// Comentarios del curso
fetch(`./verComentarios.php?id=${idCurso}`)
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {
        // Manejar datos obtenidos (en este caso, imprimir en la consola)
        comentariosCurso = JSON.parse(JSON.stringify(data));

        console.log("Comentarios del curso:\n");
        console.log(comentariosCurso);
    })

    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    })

