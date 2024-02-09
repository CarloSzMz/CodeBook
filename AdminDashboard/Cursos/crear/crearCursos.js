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
    
        if (!validarCurso()) {
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
    
    function validarCurso() {
        var curso = document.querySelector("input#NombreCurso");
        var regex = /^[a-zA-ZñÑ0-9\s]+$/
        
        if (regex.test(curso.value)) {
            return true
        } else {
            alert(curso.value + " no es un curso válido.");
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