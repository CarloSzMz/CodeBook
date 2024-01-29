// Obtener el ID del parámetro en la URL
var urlParams = new URLSearchParams(window.location.search);
var idCurso = urlParams.get('id');
console.log("ID Recuperado: " + idCurso);

var infoCurso = [];
var episodiosCurso = [];
var comentariosCurso = [];
var divCurso = document.getElementById("infoCurso");
var divComentarios = document.getElementById("Comentarios");
var divEpisodios = document.getElementById("Episodios");

var cadCurso = ``;

// Detalles del curso
fetch(`./verCurso.php?id=${idCurso}`)
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {
        // Manejar datos obtenidos (en este caso, imprimir en la consola)
        infoCurso = JSON.parse(JSON.stringify(data));

        console.log("Info del curso:\n");
        console.log(infoCurso);
        cadCurso += `
        <h2>${infoCurso[0].Nombre}</h2>
        <h2>${infoCurso[0].Descripcion}</h2>
        <h2>${infoCurso[0].Categoria}</h2>
        <img src="${infoCurso[0].Miniatura}" style="width: 80px;" alt="Img Curso">
        `;
        divCurso.innerHTML = cadCurso;
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


        // Construir la tabla utilizando DataTables
        $('#TablaComments').DataTable({
            data: comentariosCurso,
            columns: [
                { data: 'Id', title: 'Id' },
                { data: 'Nombre', title: 'Usuario' },
                { data: 'Mensaje', title: 'Mensaje' },
                { data: 'created_at', title: 'Fecha Creación' },

                // Agrega más columnas según sea necesario
            ],
            // Puedes configurar DataTables según tus necesidades
        });


    })

    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    })

