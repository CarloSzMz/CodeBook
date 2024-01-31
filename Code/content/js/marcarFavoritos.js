fetch('../PHP/sacar_cursos_favoritos.php?')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    var elementosP = document.querySelectorAll('p');
    data.forEach(element => {
        elementosP.forEach(p => {
            if(element.Nombre == p.textContent){
                p.nextElementSibling.src = "../img/corazonRojo.png"
            }
        });
    });
    
  })
  .catch(error => console.error('Error:', error));

  fetch('../PHP/sacar_libros_favoritos.php?')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    var elementosP = document.querySelectorAll('p');
    data.forEach(element => {
        elementosP.forEach(p => {
            if(element.Nombre == p.textContent){
                p.nextElementSibling.src = "../img/corazonRojo.png"
            }
        });
    });
    
  })
  .catch(error => console.error('Error:', error));
