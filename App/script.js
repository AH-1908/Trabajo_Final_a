function openService(evt, serviceName) {
    // Ocultar todos los elementos con la clase "tabcontent"
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Obtener todos los elementos con la clase "tablinks" y remover la clase "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar el contenedor del servicio actual y añadir la clase "active" al botón que abrió el tab
    document.getElementById(serviceName).style.display = "block";
    evt.currentTarget.className += " active";
}