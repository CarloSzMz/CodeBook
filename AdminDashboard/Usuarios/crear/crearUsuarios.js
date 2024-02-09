// Validación del formulario
function validarFormulario() {
    
    if (!validarUsuario()) {
        return false;
    }
    
    if (!validarCorreo()) {
        return false;
    }
    
    if (!validarContra()) {
        return false;
    }
    
    return true;
}

function validarUsuario() {
    var usuario = document.querySelector("input#NombreUsuario");
    var regex = /^[a-zA-ZñÑ0-9\s]+$/
    
    if (regex.test(usuario.value)) {
        return true
    } else {
        alert(usuario.value + " no es un usuario válido.");
        return false
    }
    
}

function validarCorreo() {
    var correo = document.querySelector("input#Correo");
    var regex = /^[a-zA-ZñÑ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
    if (regex.test(correo.value)) {
        return true
    } else {
        alert(correo.value + " no es una dirección válida.");
        return false
    }
}


function validarContra() {
    var contra = document.querySelector("input#Contrasenya");
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/

    if (regex.test(contra.value)) {
        return true
    } else {
        alert(contra.value + " no es una contraseña válida.");
        return false
    }
}