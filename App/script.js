function openService(evt, serviceName) {
    // Ocultar todos los elementos con la clase "tabcontent"
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remover la clase "active" de todos los elementos con la clase "tablinks"
    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar el contenido de la pestaña actual y añadir la clase "active" al botón que abrió la pestaña
    document.getElementById(serviceName).style.display = "block";
    evt.currentTarget.className += " active";
}