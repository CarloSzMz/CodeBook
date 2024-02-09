//Leer carpeta Ficheros
document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencia al elemento select
    var selectElement = document.getElementById('select_Fichero');

    // Realizar una solicitud al servidor para obtener la lista de archivos
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                // Intentar parsear la respuesta JSON del servidor
                var archivosObj = JSON.parse(xhr.responseText);

                // Verificar que la respuesta es un objeto
                if (archivosObj && typeof archivosObj === 'object') {
                    // Limpiar el contenido existente del select
                    selectElement.innerHTML = "";

                    // Actualizar dinámicamente el contenido del select
                    for (var key in archivosObj) {
                        if (archivosObj.hasOwnProperty(key)) {
                            var option = document.createElement('option');
                            option.value = archivosObj[key];
                            option.text = archivosObj[key];
                            selectElement.add(option);
                        }
                    }
                } else {
                    console.error("La respuesta del servidor no es un objeto válido.");
                }
            } catch (error) {
                console.error("Error al parsear la respuesta JSON del servidor:", error);
            }
        }
    };

    // Especificar el método y la URL del servidor PHP que obtiene la lista de archivos
    xhr.open('GET', 'obtener_archivos.php', true);
    // Enviar la solicitud al servidor
    xhr.send();
});

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

    // Validación del formulario
    function validarFormulario() {
    
        if (!validarLibro()) {
            return false;
        }
        
        if (!validarDescripcion()) {
            return false;
        }
        
        if (!validarUrl()) {
            return false;
        }
        
        return true;
    }
    
    function validarLibro() {
        var libro = document.querySelector("input#NombreLibro");
        var regex = /^[a-zA-ZñÑ0-9\s]+$/
        
        if (regex.test(libro.value)) {
            return true
        } else {
            alert(libro.value + " no es un libro válido.");
            return false
        }
        
    }
    
    function validarDescripcion() {
        var descripcion = document.querySelector("input#Descripcion");
        var regex = /^[a-zA-ZñÑ0-9\s]*$/
        
        if (regex.test(descripcion.value)) {
            return true
        } else {
            alert(descripcion.value + " no es una descripción válida.");
            return false
        }
    }
    

    function validarUrl() {
        var url = document.querySelector("input#Url");
        var regex = /^(https?|ftp):\/\/.*$/
        
        if (regex.test(url.value)) {
            return true
        } else {
            alert(url.value + " no es una URL válida.");
            return false
        }
    }