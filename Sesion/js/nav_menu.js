let sub_header= document.getElementById("sub_header");

let menu_open= document.getElementById("menu_open");
let open=true;
let menu_close= document.getElementById("menu_close");

menu_open.addEventListener("click",menu);
menu_close.addEventListener("click",menu);

function menu() {
    let nav= document.getElementById("desplegable");
    if(open){
        sub_header.style.zIndex="0";
        nav.style.zIndex="1";
        nav.style.display="block";
        open=false;
    }else{
        sub_header.style.zIndex="1";
        nav.style.zIndex="0";
        nav.style.display="none";
        open=true;
    }
    
}