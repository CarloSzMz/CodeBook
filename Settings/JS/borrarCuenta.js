let borrar = document.querySelector(".delete");
borrar.addEventListener("click",()=>{
    fetch("/Codebook/Settings/PHP/borrarCuenta.php")
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
    })
    .catch((error) => console.error("Error:", error));
    alert("Account Deleted");
    window.location.href= "../../Sesion/inicio/inicio.html";
});