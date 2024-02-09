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
    var regex = /^[a-zA-ZñÑ0-9]+$/      ;
    
    if (regex.test(usuario.value)) {
        return true
    } else {
        alert(usuario.value + " no es un usuario válido.");
        return false
    }
    
}

function validarCorreo() {
    var correo = document.querySelector("input#Correo");
    var regex = /^[a-zA-ZñÑ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (regex.test(correo.value)) {
        return true
    } else {
        alert(correo.value + " no es una dirección válida.");
        return false
    }
}

function validarContra() {
    var contrasenya1 = document.getElementById("Contrasenya1").value;
    var contrasenya2 = document.getElementById("Contrasenya2").value;

    if (contrasenya1 !== contrasenya2) {
        alert("Las contraseñas no coinciden. Por favor, verifica.");
        return false;
    }
    
    return true;
}