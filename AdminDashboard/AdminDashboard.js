var div = document.getElementById("infoUsers");
var infoUsers = [];
var divUsers = document.getElementById("Usuarios")

// Función que generará las tablas para visualizar el contenido de la bbdd
function tabla(elements) {

    var cadena = ``;

    // Variable que cuenta los elementos que tiene un objeto json
    var keyCount = Object.keys(elements[0]).length - 2;

    // Variable que coge los nombres de los elementos
    var names = Object.keys(elements[0]);

    cadena = `
            <table class="table table-dark table-hover">
                <thead>
                    <tr>`;

    for (let i = 0; i < keyCount; i++) {
        cadena += `
                <th scope="col">
                    ${names[i]}
                </th>
        `;
    }

    cadena += `
            </tr>
        </thead>
        <tbody>
    `;

    elements.forEach(element => {
        cadena += `<tr>`;

        for (let i = 0; i < keyCount; i++) {
            var temp = names[i];
            if (i == 0) {
                cadena += `
                    <th scope="row">${element[temp]}</th>`;
            } else {
                //Filtro por si la tabla tiene miniaturas de imagen
                if (temp == 'Miniatura') {
                    cadena += `<td><img src="${element[temp]}" alt="Imagen del libro" style="width: 30px; border-radius: 150px;"></td>`;
                } else if (temp == 'Admin') {
                    if (element[temp] == 1) {
                        cadena += `<td>Si</td>`
                    } else {
                        cadena += `<td>No</td>`
                    }
                }
                else {
                    cadena += `
                        <td>${element[temp]}</td>`;
                }
            }
        }
        cadena += `
            </tr>
        `;

    });
    cadena += `</tbody></table>`

    return cadena;

}


//Funcion asincrona especifica utilizada para poder descargar el libro
async function tablaLibros(elements) {

    var cadena = ``;

    // Variable que cuenta los elementos que tiene un objeto json
    var keyCount = Object.keys(elements[0]).length - 2;

    // Variable que coge los nombres de los elementos
    var names = Object.keys(elements[0]);

    cadena = `
        <table class="table table-dark table-hover">
            <thead>
                <tr>`;

    for (let i = 0; i < keyCount; i++) {
        cadena += `
            <th scope="col">
                ${names[i]}
            </th>
        `;
    }

    cadena += `
            </tr>
        </thead>
        <tbody>
    `;

    for (const element of elements) {
        cadena += `<tr>`;

        for (let i = 0; i < keyCount; i++) {
            var temp = names[i];
            if (i == 0) {
                cadena += `
                    <th scope="row">${element[temp]}</th>`;
            } else {
                if (temp == 'Fichero') {
                    // Verificar si el campo es 'Fichero', descargar el contenido y crear Blob
                    const response = await fetch(element[temp]);
                    if (response.ok) {
                        //crear objeto blob con la url del fichero
                        const blob = await response.blob();
                        const blobLink = `<a href="${URL.createObjectURL(blob)}" download="documento.pdf">Descargar</a>`;
                        cadena += `<td>${blobLink}</td>`;
                    } else {
                        cadena += `<td>Error al descargar el archivo</td>`;
                    }
                } else if (temp == 'Miniatura') {
                    cadena += `<td><img src="${element[temp]}" alt="Imagen del libro" style="width: 30px; border-radius: 150px;"></td>`
                } else {
                    cadena += `
                        <td>${element[temp]}</td>`;
                }
            }
        }
        cadena += `
            </tr>
        `;
    }
    cadena += `</tbody></table>`;

    return cadena;
}


// Obtener todos los datos de la tabla usuarios
fetch('./Queries/GetUsers.php')
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {
        // Manejar los datos obtenidos (en este caso, imprimir en la consola)
        infoUsers = JSON.parse(JSON.stringify(data));

        //Llama a la funcion que crea la tabla
        divUsers.innerHTML = tabla(infoUsers);
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });


function editarUsuario() {
    var select_user = document.getElementById("select_usuarios");
    var modal = new bootstrap.Modal(document.getElementById('editModalUsuarios'));
    var btnEditar = document.getElementById("confirmarEditUsuarios");
    var cadOptions = ``;
    var selectedUser = '';
    var selectedId = 0;

    // Hacer los selects de los id
    cadOptions += `<option selected disabled>Selecciona un Id</option>`;

    infoUsers.forEach(element => {
        cadOptions += `<option id=selectId value="${element.Id}">${element.Id}</option>`;

    });

    select_user.innerHTML = cadOptions;

    select_user.addEventListener('change', () => {
        selectedId = select_user.value;
        console.log("Id seleccionado " + selectedId);
        selectedUser = infoUsers.find(user => user.Id === selectedId);
        console.log(selectedUser.Nombre);

        document.getElementById('nombre_usuarios').value = selectedUser.Nombre;
        document.getElementById('email_usuarios').placeholder = selectedUser.Correo;
        document.querySelector('#editModalUsuarios select[name="tipo"]').value = selectedUser.Admin;

    });

    modal.show();

    btnEditar.addEventListener('click', () => {

        //Hacer el fetch con los campos y update en la bbdd
        var idUsuario = selectedId;
        var nombreEditado = document.getElementById('nombre_usuarios').value;
        var tipoEditado = document.querySelector('#editModalUsuarios select[name="tipo"]').value;

        console.log("id " + idUsuario);
        console.log("Nombre " + nombreEditado);
        console.log("Tipo " + tipoEditado);

        $.ajax({
            type: "POST",
            url: "./Usuarios/editar/editarUsuarios.php",
            data: {
                id: idUsuario,
                nombre: nombreEditado,
                tipo: tipoEditado
            },
            success: function (response) {
                console.log("exito");
                tabla(infoUsers);
                window.location.replace('./AdminDashboard.html');
            },
            error: function (error) {
                console.error(error);
            }
        });
    })
}

function eliminarUsuario() {
    var select_user = document.getElementById("selectDeleteUsuarios");
    var modal = new bootstrap.Modal(document.getElementById('deleteModalUsuarios'));
    var btnEliminar = document.getElementById("confirmarBorradoUsuarios");
    var cadOptions = ``;
    var selectedUser = '';
    var selectedId = 'Selecciona un Id';

    //hacer los selects de los id
    cadOptions += `<option selected disabled>Selecciona un Id</option>`;
    infoUsers.forEach(element => {
        cadOptions += `<option id=selectId value="${element.Id}">${element.Id}</option>`;
    });

    select_user.innerHTML = cadOptions;

    select_user.addEventListener('change', () => {
        selectedId = select_user.value;
        console.log("Id seleccionado " + selectedId);
        selectedUser = infoUsers.find(user => user.Id === selectedId);
        console.log(selectedUser.Nombre);
    })

    modal.show();

    btnEliminar.addEventListener('click', () => {

        //Hacer el fetch con los campos y update en la bbdd
        var idUsuario = selectedId;

        console.log("id " + idUsuario);

        $.ajax({
            type: "POST",
            url: "./Usuarios/eliminar/eliminarUsuarios.php",
            data: {
                id: idUsuario,
            },
            success: function (response) {
                console.log("exito");
                window.location.replace('./AdminDashboard.html');
            },
            error: function (error) {
                console.error(error);
            }
        });
    })
}


function verUsuario() {
    var select_user = document.getElementById("selectVerUsuarios");
    var modal = new bootstrap.Modal(document.getElementById('verModalUsuarios'));
    var btnVerUsers = document.getElementById("confirmarVerUsuarios");
    var cadOptions = ``;
    var selectedUser = '';
    var selectedId = 'Selecciona un Id';

    // Hacer los selects de los id
    cadOptions += `<option selected disabled>Selecciona un Nombre</option>`;
    infoUsers.forEach(element => {
        cadOptions += `<option id=selectId value="${element.Id}">${element.Nombre}</option>`;
    });

    select_user.innerHTML = cadOptions;

    select_user.addEventListener('change', () => {
        selectedId = select_user.value;
        console.log("Id seleccionado " + selectedId);
        selectedUser = infoUsers.find(user => user.Id === selectedId);
        console.log(selectedUser.Nombre);
    });

    modal.show();

    btnVerUsers.addEventListener('click', () => {

        // Hacer el fetch con los campos y update en la bbdd
        var idUser = selectedId;

        console.log("id " + idUser);
        window.location.replace(`./Usuarios/visualizar/verUsuario.html?id=${idUser}`);
    });
}


/* APARTADO CATEGORIAS*/

var divCategorias = document.getElementById("Categoria");
var infoCategorias = [];

// Hacer la solicitud al archivo PHP
fetch('./Queries/GetCategorias.php')
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {

        // Manejar los datos obtenidos (en este caso, imprimir en la consola)
        infoCategorias = JSON.parse(JSON.stringify(data));

        //Llamar a la funcion que crea la tabla pasandole el arrayJSON del resultado de la query
        divCategorias.innerHTML = tabla(infoCategorias);
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });

function eliminarCategoria() {
    var select_categorias = document.getElementById("selectDeleteCategorias");
    var modal = new bootstrap.Modal(document.getElementById('deleteModalCategorias'));
    var btnEliminar = document.getElementById("confirmarBorradoCategorias");
    var cadOptions = ``;
    var selectedCategoria = '';
    var selectedId = 'Selecciona un Id';

    // Hacer los selects de los id
    cadOptions += `<option selected disabled>Selecciona un Id</option>`;
    infoCategorias.forEach(element => {
        cadOptions += `<option id=selectId value="${element.Id}">${element.Id}</option>`;
    });

    select_categorias.innerHTML = cadOptions;

    select_categorias.addEventListener('change', () => {
        selectedId = select_categorias.value;
        console.log("Id seleccionado " + selectedId);
        selectedCategoria = infoCategorias.find(categoria => categoria.Id === selectedId);
        console.log(selectedCategoria.Lenguaje);
    })

    modal.show();

    btnEliminar.addEventListener('click', () => {

        // Hacer el fetch con los campos y update en la bbdd
        var idCategoria = selectedId;
        console.log("id " + idCategoria);

        $.ajax({
            type: "POST",
            url: "./Categorias/eliminar/eliminarCategoria.php",
            data: {
                id: idCategoria,
            },
            success: function (response) {
                console.log("exito");
                window.location.replace('./AdminDashboard.html');
            },
            error: function (error) {
                console.error(error);
            }
        });
    });
}


/*APARTADO LIBROS*/

var divLibros = document.getElementById("Libros");
var infoLibros = [];

// Hacer la solicitud al archivo PHP
fetch('./Queries/GetLibros.php')
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {

        // Manejar los datos obtenidos (en este caso, imprimir en la consola)
        infoLibros = JSON.parse(JSON.stringify(data));
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });

async function obtenerYMostrarTabla(jsonURL) {
    try {
        const response = await fetch(jsonURL);
        const data = await response.json();

        const infoLibros = JSON.parse(JSON.stringify(data));

        // Llama a la función asincrónica tablaLibros y espera a que se resuelva la promesa
        const tablaHtml = await tablaLibros(infoLibros);

        // Imprime en la consola y asigna al div
        divLibros.innerHTML = tablaHtml;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}

// Llamada a la función que obtiene y muestra la tabla con un JSON específico
obtenerYMostrarTabla('./Queries/GetLibros.php');

function editarLibro() {
    var select_libros = document.getElementById("select_libros");
    var modal = new bootstrap.Modal(document.getElementById('editModalLibros'));
    var btnEditar = document.getElementById("confirmarEditLibros");
    var cadOptions = ``;
    var selectedLibro = '';
    var selectedId = 0;

    // Hacer los selects de los id
    cadOptions += `<option selected disabled>Selecciona un Id</option>`;

    infoLibros.forEach(element => {
        cadOptions += `<option id=selectId value="${element.Id}">${element.Id}</option>`;

    });

    select_libros.innerHTML = cadOptions;

    select_libros.addEventListener('change', () => {
        selectedId = select_libros.value;
        console.log("Id seleccionado " + selectedId);
        selectedLibro = infoLibros.find(libro => libro.Id === selectedId);
        console.log(selectedLibro.Nombre);

        document.getElementById('nombre_libros').placeholder = selectedLibro.Nombre;
        document.getElementById('descripcion_libros').placeholder = selectedLibro.Descripcion;
        document.getElementById('miniatura_libros').placeholder = selectedLibro.Miniatura;

        document.getElementById('nombre_libros').value = selectedLibro.Nombre;
        document.getElementById('descripcion_libros').value = selectedLibro.Descripcion;
        document.getElementById('miniatura_libros').value = selectedLibro.Miniatura;


    });

    modal.show();

    btnEditar.addEventListener('click', () => {

        //Hacer el fetch con los campos y update en la bbdd
        var idLibro = selectedId;
        var nombreEditado = document.getElementById('nombre_libros').value;
        var descripcionEditado = document.getElementById('descripcion_libros').value;
        var miniaturaEditado = document.getElementById('miniatura_libros').value;

        console.log("id " + idLibro);
        console.log("Nombre " + nombreEditado);
        console.log("Descripción " + descripcionEditado);
        console.log("Miniatura " + miniaturaEditado);

        $.ajax({
            type: "POST",
            url: "./Libros/editar/editarLibros.php",
            data: {
                id: idLibro,
                nombre: nombreEditado,
                descripcion: descripcionEditado,
                miniatura: miniaturaEditado
            },
            success: function (response) {
                console.log("exito");
                tabla(infoUsers);
                window.location.replace('./AdminDashboard.html');
            },
            error: function (error) {
                console.error(error);
            }
        });
    })
}

function eliminarLibro() {
    var select_libros = document.getElementById("selectDeleteLibros");
    var modal = new bootstrap.Modal(document.getElementById("deleteModalLibros"));
    var btnEliminar = document.getElementById("confirmarBorradoLibros");
    var cadOptions = ``;
    var selectedLibro = '';
    var selectedId = 'Selecciona un Id';

    // Hacer los selects de los id
    cadOptions += `<option selected disabled>Selecciona un Id</option>`;
    infoLibros.forEach(element => {
        cadOptions += `<option id=selectId value="${element.Id}">${element.Id}</option>`;
    });

    select_libros.innerHTML = cadOptions;

    select_libros.addEventListener('change', () => {
        selectedId = select_libros.value;
        console.log("Id seleccionado " + selectedId);
        selectedLibro = infoLibros.find(libro => libro.Id === selectedId);
        console.log(selectedLibro.Nombre);
    });

    modal.show();

    btnEliminar.addEventListener('click', () => {

        // Hacer el fetch con los campos y update en la bbdd
        var idLibro = selectedId;
        console.log("id " + idLibro);

        $.ajax({
            type: "POST",
            url: "./Libros/eliminar/eliminarLibros.php",
            data: {
                id: idLibro,
            },
            success: function (response) {
                console.log("exito");
                window.location.replace('./AdminDashboard.html');
            },
            error: function (error) {
                console.error(error);
            }
        });
    });
}


/*APARTADO CURSOS*/

var divCursos = document.getElementById("Cursos");
var infoCursos = [];

// Hacer la solicitud al archivo PHP
fetch('./Queries/GetCursos.php')
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {

        // Manejar datos obtenidos (en este caso, imprimir en la consola)
        infoCursos = JSON.parse(JSON.stringify(data));

        // Llamar a la función que crea la tabla pasandole el arrayJSON del resultado de la query
        divCursos.innerHTML = tabla(infoCursos);
    })

    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    })

function editarCurso() {
    var select_cursos = document.getElementById("select_cursos");
    var modal = new bootstrap.Modal(document.getElementById('editModalCursos'));
    var btnEditar = document.getElementById("confirmarEditCursos");
    var cadOptions = ``;
    var selectedCurso = '';
    var selectedId = 0;

    // Hacer los selects de los id
    cadOptions += `<option selected disabled>Selecciona un Id</option>`;

    infoCursos.forEach(element => {
        cadOptions += `<option id=selectId value="${element.Id}">${element.Id}</option>`;

    });

    select_cursos.innerHTML = cadOptions;

    select_cursos.addEventListener('change', () => {
        selectedId = select_cursos.value;
        console.log("Id seleccionado " + selectedId);
        selectedCurso = infoCursos.find(Curso => Curso.Id === selectedId);
        console.log(selectedCurso.Nombre);

        document.getElementById('nombre_cursos').placeholder = selectedCurso.Nombre;
        document.getElementById('descripcion_cursos').placeholder = selectedCurso.Descripcion;
        document.getElementById('miniatura_cursos').placeholder = selectedCurso.Miniatura;

        document.getElementById('nombre_cursos').value = selectedCurso.Nombre;
        document.getElementById('descripcion_cursos').value = selectedCurso.Descripcion;
        document.getElementById('miniatura_cursos').value = selectedCurso.Miniatura;


    });

    modal.show();

    btnEditar.addEventListener('click', () => {

        //Hacer el fetch con los campos y update en la bbdd
        var idCurso = selectedId;
        var nombreEditado = document.getElementById('nombre_cursos').value;
        var descripcionEditado = document.getElementById('descripcion_cursos').value;
        var miniaturaEditado = document.getElementById('miniatura_cursos').value;

        console.log("id " + idCurso);
        console.log("Nombre " + nombreEditado);
        console.log("Descripción " + descripcionEditado);
        console.log("Miniatura " + miniaturaEditado);

        $.ajax({
            type: "POST",
            url: "./Cursos/editar/editarCursos.php",
            data: {
                id: idCurso,
                nombre: nombreEditado,
                descripcion: descripcionEditado,
                miniatura: miniaturaEditado
            },
            success: function (response) {
                console.log("exito");
                tabla(infoUsers);
                window.location.replace('./AdminDashboard.html');
            },
            error: function (error) {
                console.error(error);
            }
        });
    })
}


function eliminarCurso() {
    var select_cursos = document.getElementById("selectDeleteCursos");
    var modal = new bootstrap.Modal(document.getElementById('deleteModalCursos'));
    var btnEliminarCursos = document.getElementById("confirmarBorradoCursos");
    var cadOptions = ``;
    var selectedCursos = '';
    var selectedId = 'Selecciona un Id';
    
    // Hacer los selects de los id
    cadOptions += `<option selected disabled>Selecciona un Nombre</option>`;
    infoCursos.forEach(element => {
        cadOptions += `<option id=selectId value="${element.Id}">${element.Nombre}</option>`;
    });
    
    select_cursos.innerHTML = cadOptions;
    
    select_cursos.addEventListener('change', () => {
        selectedId = select_cursos.value;
        console.log("Id seleccionado " + selectedId);
        selectedCursos = infoCursos.find(curso => curso.Id === selectedId);
        console.log(selectedCursos.Nombre);
    });
    
    modal.show();
    
    btnEliminarCursos.addEventListener('click', () => {
        
        // Hacer el fetch con los campos y update en la bbdd
        var idCurso = selectedId;
        console.log("id " + idCurso);
        
        $.ajax({
            type: "POST",
            url: "./Cursos/eliminar/eliminarCursos.php",
            data: {
                id: idCurso,
            },
            success: function (response) {
                console.log("exito");
                window.location.replace('./AdminDashboard.html');
            },
            error: function (error) {
                console.error(error);
            }
        });
    });
}

function verCurso() {
    var select_cursos = document.getElementById("selectVerCursos");
    var modal = new bootstrap.Modal(document.getElementById('verModalCursos'));
    var btnVerCursos = document.getElementById("confirmarVerCursos");
    var cadOptions = ``;
    var selectedCursos = '';
    var selectedId = 'Selecciona un Id';

    // Hacer los selects de los id
    cadOptions += `<option selected disabled>Selecciona un Nombre</option>`;
    infoCursos.forEach(element => {
        cadOptions += `<option id=selectId value="${element.Id}">${element.Nombre}</option>`;
    });

    select_cursos.innerHTML = cadOptions;

    select_cursos.addEventListener('change', () => {
        selectedId = select_cursos.value;
        console.log("Id seleccionado " + selectedId);
        selectedCursos = infoCursos.find(curso => curso.Id === selectedId);
        console.log(selectedCursos.Nombre);
    });

    modal.show();

    btnVerCursos.addEventListener('click', () => {

        // Hacer el fetch con los campos y update en la bbdd
        var idCurso = selectedId;

        console.log("id " + idCurso);
        window.location.replace(`./Cursos/visualizar/verCurso.html?id=${idCurso}`);
    });
}

// Toggle Button

$("#sidebarToggle").click(function(e) {
    e.preventDefault();
    $("#menuAdmin-navbar").toggleClass("toggled");
});