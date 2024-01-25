var div = document.getElementById("info");
var info = [];

// Hacer la solicitud al archivo PHP
fetch('./AdminDashboard.php')
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {
        // Manejar los datos obtenidos (en este caso, imprimir en la consola)
        info = JSON.parse(JSON.stringify(data));
        console.log(data);
        tabla();
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });


function tabla() {
    var cad = ``;
    info.forEach(element => {
        cad +=
            `<tr>
                <th scope="row">${element.Id}</th>`;
        if (element.Admin == 0) {
            cad += `<td>Normal User</td>`;
        } else {
            cad += `<td>Admin</td>`;
        }
        cad +=
            `
            <td>${element.Nombre}</td>
            <td>${element.Correo}</td>
            <td>
                <button class='btn'>
                    <i id="${element.Id}" onclick="editarUsuario('${element.Nombre}','${element.Correo}','${element.Admin}')" class="fa-sharp fa-solid fa-pen" style="color: #005cfa;"></i>
                </button>
                <button class='btn'>
                    <i id="${element.Id}" onclick="eliminarUsuario(${element.Id})" class="fa fa-sharp fa-solid fa-trash" style="color: #ff0000;"></i>
                </button>
            </td>
            </tr> 
            `;
    });
    console.log(cad);
    div.innerHTML = cad;
}

function eliminarUsuario(id) {
    var confirmar = confirm("¿Estás seguro de que deseas eliminar este usuario?");

    if (confirmar) {
        fetch("./Usuarios/eliminar/eliminarUsuarios.php?id=" + id)
            .then(response => response.json())
            .then(data => {

                // Actualizar la tabla solo si la eliminación se llevó a cabo
                if (data.success) {
                    // Hacer la solicitud para obtener los datos actualizados después de la eliminación
                    fetch('./AdminDashboard.php')
                        .then(response => response.json())
                        .then(updatedData => {
                            // Actualizar la variable 'info' con los nuevos datos
                            info = JSON.parse(JSON.stringify(updatedData));
                            console.log(data);
                            // Actualizar la tabla con los nuevos datos
                            tabla();
                        })
                        .catch(error => {
                            console.error('Error al obtener datos actualizados:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error en la solicitud al servidor:', error);
            });
    }
}

function editarUsuario(user, emailuser, admin) {
    var modal = new bootstrap.Modal(document.getElementById('editModal'));
    var btnEditar = document.getElementById("confirmarEdit");
    console.log(user, email, admin);

    document.getElementById('nombre').value = user;
    document.getElementById('email').placeholder = emailuser;

    // Seleccionar el option en el select
    document.querySelector('#editModal select[name="tipo"]').value = admin;

    modal.show();

    btnEditar.addEventListener('click', () => {
        //Hacer el fetch con los campos y update en la bbdd

        var nombreEditado = document.getElementById('nombre').value;
        var tipoEditado = document.querySelector('#editModal select[name="tipo"]').value;

        console.log("Nombre " + nombreEditado);
        console.log("Tipo " + tipoEditado);

        $.ajax({
            type: "POST",
            url: "./Usuarios/editar/editarUsuarios.php",
            data: {
                nombre: nombreEditado,
                email: emailuser,
                tipo: tipoEditado
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


