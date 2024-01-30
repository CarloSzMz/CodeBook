//Leer las categorías existentes

var Categorias = [];
var select_categorias = document.getElementById("select_Categoria");
var cadOptions = ``;

// Hacer la solicitud al archivo PHP
fetch('../../Queries/GetCategorias.php')
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then((data) => {
        // Manejar los datos obtenidos (en este caso, imprimir en la consola)
        Categorias = JSON.parse(JSON.stringify(data));

        //llamar a la funcion que crea los options pasandole el arrayJSON del resultado de la query
        Categorias.forEach(element => {
            cadOptions += `<option id=selectId value="${element.Id}">${element.Lenguaje}</option>`;
        });
        select_categorias.innerHTML = cadOptions;

    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });