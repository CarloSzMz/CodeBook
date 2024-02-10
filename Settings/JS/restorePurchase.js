let restore = document.querySelector(".restore").addEventListener("click",demanda);
function demanda(){
    let peticion = new Request(
        "/Codebook/Settings/PHP/restorePurchase.php",
        {
            method: "POST",
            headers:{"Content-type": "application/x-www-form-urlencoded"},
        }
    )
    let respuesta= fetch(peticion)
    .then((response)=>response.json)
    .then((data)=>{
        alert("Last Purchase Restore Correctly. ")
    })
    .catch((error) => console.error("Error:", error));
}