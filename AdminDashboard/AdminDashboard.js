var div = document.getElementById("infoUsers");
var infoUsers = [];
var divUsers = document.getElementById("Usuarios")

//Función que generarña las tablas para visualizar el contenido de la bbdd
function tabla(elements) {

    var cadena = ``;

    //Variable que cuenta los elementos que tiene un objeto json
    var keyCount = Object.keys(elements[0]).length - 2;

    //Variable que coge los nombres de los elementos
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
                cadena += `
                <td>${element[temp]}</td>`;
            }

        }
        cadena += `
            </tr>
        
        `;

    });
    cadena += `</tbody></table>`

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
    var select_id = document.getElementById("select_id");
    var modal = new bootstrap.Modal(document.getElementById('editModalUsers'));
    var btnEditar = document.getElementById("confirmarEdit");
    var cadOptions = ``;
    var selectedUser = '';
    var selectedId = 0;

    //hacer los selects de los id
    cadOptions += `<option selected disabled>Selecciona un Id</option>`;

    infoUsers.forEach(element => {
        cadOptions += `<option id=selectId value="${element.Id}">${element.Id}</option>`;

    });
    select_id.innerHTML = cadOptions;

    select_id.addEventListener('change', () => {
        selectedId = select_id.value;
        console.log("Id seleccionado " + selectedId);
        selectedUser = infoUsers.find(user => user.Id === selectedId);
        console.log(selectedUser.Nombre);

        document.getElementById('nombre').value = selectedUser.Nombre;
        document.getElementById('email').placeholder = selectedUser.Correo;
        document.querySelector('#editModalUsers select[name="tipo"]').value = selectedUser.Admin;


    })

    modal.show();

    btnEditar.addEventListener('click', () => {
        //Hacer el fetch con los campos y update en la bbdd
        var idUsuario = selectedId;
        var nombreEditado = document.getElementById('nombre').value;
        var tipoEditado = document.querySelector('#editModalUsers select[name="tipo"]').value;

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
    var select_id = document.getElementById("selectDeleteUsers");
    var modal = new bootstrap.Modal(document.getElementById('deleteModalUsers'));
    var btnEliminar = document.getElementById("confirmarBorradoUsers");
    var cadOptions = ``;
    var selectedUser = '';
    var selectedId = 'Selecciona un Id';

    //hacer los selects de los id

    infoUsers.forEach(element => {
        cadOptions += `<option id=selectId value="${element.Id}">${element.Id}</option>`;
    });

    select_id.innerHTML = cadOptions;

    select_id.addEventListener('change', () => {
        selectedId = select_id.value;
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







/* APARTADO CATEGORIAS*/


var divCategorias = document.getElementById("Categoria");
var infoCategorias = [];

// Hacer la solicitud al archivo PHP
fetch('./Queries/GetCategorias.php')
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {
        // Manejar los datos obtenidos (en este caso, imprimir en la consola)
        infoCategorias = JSON.parse(JSON.stringify(data));

        //llamar a la funcion que crea la tabla pasandole el arrayJSON del resultado de la query
        divCategorias.innerHTML = tabla(infoCategorias);
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });

