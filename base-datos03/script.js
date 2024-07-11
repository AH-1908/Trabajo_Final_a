function buscarCancion() {
    const songIndex = document.getElementById('songIndex').value;
    const resultadoDiv = document.getElementById('resultado');

    fetch('basedatosmusicatop.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const song = lines[songIndex - 1]; // Ajuste para la indexación basada en 1

            if (song) {
                const [posicion, nombre, artista, enlaceYoutube] = song.split(',');

                resultadoDiv.innerHTML = `
                    <h2>${nombre} - ${artista}</h2>
                    <a href="${enlaceYoutube}" target="_blank">Ver en YouTube</a>
                `;
            } else {
                resultadoDiv.innerHTML = '<p>No se encontró la canción.</p>';
            }
        })
        .catch(error => {
            console.error('Error al leer el archivo CSV:', error);
            resultadoDiv.innerHTML = '<p>Error al cargar los datos.</p>';
        });
}
