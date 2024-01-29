//Leer las categorías existentes

var Cursos = [];
var select_cursos = document.getElementById("select_Curso");
var cadOptions = ``;

// Hacer la solicitud al archivo PHP
fetch('../../Queries/GetCursos.php')
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {
        // Manejar los datos obtenidos (en este caso, imprimir en la consola)
        Cursos = JSON.parse(JSON.stringify(data));

        //llamar a la funcion que crea los options pasandole el arrayJSON del resultado de la query
        Cursos.forEach(element => {
            cadOptions += `<option id=selectId value="${element.Id}">${element.Nombre}</option>`;
        });
        select_cursos.innerHTML = cadOptions;

    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });