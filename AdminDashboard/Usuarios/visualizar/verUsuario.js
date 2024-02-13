// Obtener el ID del parámetro en la URL
var urlParams = new URLSearchParams(window.location.search);
var idUser = urlParams.get('id');
console.log("ID Recuperado: " + idUser);


var divInfoUsu = document.getElementById("InfoUsuario");
var divInventarioCursos = document.getElementById("Inventario_Cursos");
var divInventarioLibros = document.getElementById("Inventario_Libros");
var datosUser = [];
var libros = [];
var cursos = [];
var comentarios = [];


fetch(`./verUsuario.php?id=${idUser}`)
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {
        // Manejar datos obtenidos (en este caso, imprimir en la consola)
        datosUser = JSON.parse(JSON.stringify(data));
        console.log("User:\n");
        console.log(datosUser);

        datosUser.forEach(element => {
            divInfoUsu.innerHTML += `
                    <h3 class="card-title">Nombre: </h3><h6 class="card-text">${element.Nombre}</h6>
                    <h3 class="card-title">Correo: </h3><h6 class="card-text">${element.Correo}</h6>
                `;
        });

    })

    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    })

fetch(`./Inventario/php/Ver_invLibros.php?id=${idUser}`)
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {
        // Manejar datos obtenidos (en este caso, imprimir en la consola)
        libros = JSON.parse(JSON.stringify(data));

        console.log("Libros:\n");
        console.log(libros);
        rellenarInventarioLibros();
    })

    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    })

fetch(`./Inventario/php/Ver_invCursos.php?id=${idUser}`)
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {
        // Manejar datos obtenidos (en este caso, imprimir en la consola)
        cursos = JSON.parse(JSON.stringify(data));

        console.log("cursos:\n");
        console.log(cursos);

        rellenarInventarioCursos();
    })

    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    })

fetch(`./Comentarios/Ver_Comentarios.php?id=${idUser}`)
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {
        // Manejar datos obtenidos (en este caso, imprimir en la consola)
        comentarios = JSON.parse(JSON.stringify(data));
        console.log("Comentarios:\n");
        console.log(comentarios);

        // Construir la tabla utilizando DataTables
        $('#tablaComments').DataTable({
            data: comentarios,
            columns: [
                { data: 'Id', title: 'Id' },
                { data: 'Curso', title: 'Curso' },
                { data: 'Mensaje', title: 'Mensaje' },
                { data: 'created_at', title: 'Fecha Creación' },
                {
                    // Columna adicional para el botón de eliminación
                    data: null,
                    title: 'Acciones',
                    render: function (data, type, row) {
                        return `

                        <form action="./Comentarios/eliminarComentario.php?id=${row.Id}&user=${idUser}" method="post">
                            <button type="submit" class="btn" data-id="${row.Id}"> 
                                <i class="fas fa-trash text-danger fa-lg"></i>
                            </button>
                        </form>
                        `;
                    }
                },

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

function rellenarInventarioLibros() {
    var cad = ``;

    libros.forEach(element => {
        cad += `
        <div class="col-md-4">
            <div class="card" style="width: 15rem;">
                <img class="card-img-top" src="${element.Miniatura}" alt="Imagen Curso">
                <div class="card-body">
                    <h5 class="card-title">${element.Nombre}</h5>
                    <h4 class="card-subtitle mb-2 text-muted">${element.Id_Categoria}</h4>
                    <p class="card-text">${element.Descripcion}</p>
                    <form action="./Inventario/php/Eliminar_libro.php?id=${element.Relacion}&user=${idUser}" method="post">
                        <button type="submit" title="Quitar Libro" class="btn">
                            <i class="fas fa-trash text-danger fa-lg"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
        `;
    });
    divInventarioLibros.innerHTML = cad;

}

function rellenarInventarioCursos() {
    var cad = ``;

    cursos.forEach(element => {
        cad += `
        <div class="col-md-4">
            <div class="card" style="width: 15rem;">
                <img class="card-img-top" src="${element.Miniatura}" alt="Imagen Curso">
                <div class="card-body">
                    <h5 class="card-title">${element.Nombre}</h5>
                    <h4 class="card-subtitle mb-2 text-muted">${element.Id_Categoria}</h4>
                    <p class="card-text">${element.Descripcion}</p>
                    <form action="./Inventario/php/Eliminar_curso.php?id=${element.Relacion}&user=${idUser}" method="post">
                        <a class="btn" onclick=VerCurso(${element.Id}); title="Ver Curso">
                            <i class="fas fa-eye text-primary fa-lg"></i>
                        </a>
                        <button type="submit" title="Quitar Curso" class="btn">
                            <i class="fas fa-trash text-danger fa-lg"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
        `;
    });
    divInventarioCursos.innerHTML = cad;
}

function VerCurso(IdCurso) {
    console.log(IdCurso);
    window.location.replace(`../../Cursos/visualizar/verCurso.html?id=${IdCurso}`);
}