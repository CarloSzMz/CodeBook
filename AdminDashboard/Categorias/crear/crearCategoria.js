// Validación de formulario
function validarFormulario() {
    
    if (!validarLenguaje()) {
        return false;
    }
    
    return true;
}

function validarLenguaje() {
    var lenguaje = document.querySelector("input#Lenguaje");
    var regex = /^[a-zA-ZñÑ0-9\s+#\-.]+$/
    
    if (regex.test(lenguaje.value)) {
        return true
    } else {
        alert(lenguaje.value + " no es un lenguaje válido.");
        return false
    }
    
}