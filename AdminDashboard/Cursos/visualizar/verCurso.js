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


// Detalles del curso
fetch(`./verCurso.php?id=${idCurso}`)
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {
        // Manejar datos obtenidos (en este caso, imprimir en la consola)
        infoCurso = JSON.parse(JSON.stringify(data));

        console.log("Info del curso:\n");
        console.log(infoCurso);

        divCurso.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${infoCurso[0].Miniatura}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${infoCurso[0].Nombre}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${infoCurso[0].Categoria}</h6>
          <p class="card-text">${infoCurso[0].Descripcion}</p>
        </div>
      </div>`;
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

        divEpisodios.innerHTML = tablaEpisodios(episodiosCurso);
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
            // Personalización de estilos
            "pagingType": "full_numbers", // Añade numeración de páginas
            "lengthMenu": [10, 25, 50, 75, 100], // Define el número de registros por página
            "order": [[3, "desc"]], // Ordena la tabla por la cuarta columna (created_at) de forma descendente
            "language": {
                "lengthMenu": "Mostrar _MENU_ registros por página",
                "zeroRecords": "No se encontraron registros",
                "info": "Mostrando página _PAGE_ de _PAGES_",
                "infoEmpty": "No hay registros disponibles",
                "infoFiltered": "(filtrado de _MAX_ registros totales)",
                "search": "Buscar:",
                "paginate": {
                    "first": "Primero",
                    "last": "Último",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            }
        });


    })

    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    })


function tablaEpisodios(elements) {
    var cadenaEpisodios = ``;
    cadenaEpisodios += `
    <table  class="table table-dark table-hover"> 
        <thead> 
            <tr> 
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripcion</th>
                <th>Miniatura</th>
                <th>Opciones</th>
            </tr>
        <thead>
        <tbody>
    `;
    elements.forEach(element => {
        cadenaEpisodios += `
        <tr>
            <td>${element.Id}</td>
            <td>${element.Nombre}</td>
            <td>${element.Descripcion}</td>
            <td><img src="${element.Miniatura}" alt="Imagen del episodio" style="width: 30px; border-radius: 150px;"></td>
            <td>
                <button id="${element.Id}" class="btn btn-info">Editar</button>
                <button id="${element.Id}" class="btn btn-danger">Borrar</button>
            </td>
        </tr>
        `;
    });
    cadenaEpisodios += `</tbody></table>
    <button id="btnAddEpisodio" class="btn btn-info">Añadir Episodio</button>
    `;

    return cadenaEpisodios;
}
