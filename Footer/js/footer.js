let peticion = new XMLHttpRequest();
peticion.open("GET", "/CodeBook/Footer/HTML/footer.html", true);
peticion.send(null);
peticion.onreadystatechange = function () {
  let footer = document.querySelector("footer") || "no hay footer";
  if (peticion.status == 200 && peticion.readyState == 4) {
    document.head.innerHTML+='<link rel="stylesheet" href="/codebook/Footer/style/footer.css"></link>';
    footer.innerHTML = peticion.response;
  }
};

