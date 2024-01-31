// Obtener el ID del parámetro en la URL
var urlParams = new URLSearchParams(window.location.search);
var idUser = urlParams.get('id');
console.log("ID Recuperado: " + idUser);


var divInfoUsu = document.getElementById("InfoUsuario");
var divInventario = document.getElementById("Inventario");
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
                    <h3>${element.Nombre}</h3>
                    <h3>${element.Correo}</h3>
                    <h3>Tipo Usuario: ${element.Admin}</h3>
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

        fetch(`./Inventario/php/Ver_invCursos.php?id=${idUser}`)
            .then(response => response.json()) // Parsear la respuesta como JSON
            .then((data) => {
                // Manejar datos obtenidos (en este caso, imprimir en la consola)
                cursos = JSON.parse(JSON.stringify(data));

                console.log("cursos:\n");
                console.log(cursos);

                rellenarInventario();
            })

            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
            })


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

                        <form action="#" method="post">
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


function rellenarInventario() {

    var cad = ``;

    cad += `<h4>Libros:</h4>`;
    libros.forEach(element => {
        cad += `<h6>Nombre: ${element.Nombre}</h6>
                <h6>Desc: ${element.Descripcion}</h6>
                <h6>Categoria: ${element.Id_Categoria}</h6>
                <img src="${element.Miniatura}" alt="img libro" width="80px">        
                <br>
        `;
    });
    cad += `<br><h4>Cursos</h4>`;
    cursos.forEach(element => {
        cad += `
            <h6>Nombre: ${element.Nombre}</h6>
            <h6>Desc: ${element.Descripcion}</h6>
            <h6>Categoria: ${element.Id_Categoria}</h6>
            <img src="${element.Miniatura}" alt="img curso" width="80px">        
            <br>
        `;
    });
    divInventario.innerHTML = cad;
}

function comentarios() {



}