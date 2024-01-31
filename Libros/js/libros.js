let enlaceDescarga = document.getElementById("descargarPdf");

enlaceDescarga.addEventListener('click', function() {
    fetch('../PHP/libros.php?id_libro=' + idLibro)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(dataArray => {
       
            var data = dataArray[0];

            if (data && data.Fichero) {
                var enlace = document.createElement('a');
                enlace.href = data.Fichero;
                enlace.download = data.Nombre;

                enlace.addEventListener('load', function() {
      
                    if (document.body.contains(enlace)) {
                        document.body.removeChild(enlace);
                    }
                });

                enlace.click();
            } else {
                console.error('La propiedad "Fichero" es undefined en la respuesta del servidor.');
            }
        })
        .catch(error => console.error('Error:', error));
});
