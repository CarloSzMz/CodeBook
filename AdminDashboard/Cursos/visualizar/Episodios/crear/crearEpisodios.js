// Obtener el ID del parámetro en la URL
var urlParams = new URLSearchParams(window.location.search);
var idCurso = urlParams.get('id');
console.log("ID Recuperado: " + idCurso);
var enlace_volver = document.getElementById("volver")

var input_curso = document.getElementById("curso");


enlace_volver.href = `../../verCurso.html?id=${idCurso}`;
input_curso.value = idCurso;

console.log(input_curso.value);
