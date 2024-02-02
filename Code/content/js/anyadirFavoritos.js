setTimeout(function() {
    let divCursos = document.getElementById("cursos");
    let imagenesCorazon = divCursos.querySelectorAll(".corazonImagen");

    imagenesCorazon.forEach(imagen => {
        let rutaRelativa = imagen.getAttribute('src');

        imagen.addEventListener("click", (event) => {
            let padre = imagen.parentElement;
            let abuelo = padre.parentNode;
            let idAbuelo = abuelo.id;

            event.stopPropagation();
            console.log("clicado");

            fetch('../PHP/anyadirFavoritosCursos.php?id_curso=' + idAbuelo)
                .then(() => {
                    if (rutaRelativa == "../img/corazonRojo.png") {
                        imagen.src = "../img/corazon.png";
                    } else if(rutaRelativa == "../img/corazon.png") {
                        imagen.src = "../img/corazonRojo.png";
                    }
                })
                .then(() => {
                    rutaRelativa = imagen.getAttribute('src');
                })
                .catch(error => console.error('Error:', error));
        });
    });

}, 100);
setTimeout(function() {
    let divLibros = document.getElementById("libros");
    let imagenesCorazon = divLibros.querySelectorAll(".corazonImagen");

    imagenesCorazon.forEach(imagen => {
        let rutaRelativa = imagen.getAttribute('src');

        imagen.addEventListener("click", (event) => {
            let padre = imagen.parentElement;
            let abuelo = padre.parentNode;
            let idAbuelo = abuelo.id;

            event.stopPropagation();
            console.log("clicado");
            console.log(idAbuelo)
            fetch('../PHP/anyadirFavoritosLibros.php?id_libro=' + idAbuelo)
                .then(() => {
                    if (rutaRelativa == "../img/corazonRojo.png") {
                        imagen.src = "../img/corazon.png";
                    } else if(rutaRelativa == "../img/corazon.png") {
                        imagen.src = "../img/corazonRojo.png";
                    }
                })
                .then(() => {
                    rutaRelativa = imagen.getAttribute('src');
                })
                .catch(error => console.error('Error:', error));
        });
    });

}, 100);
