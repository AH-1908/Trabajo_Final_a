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

// Soptify API

async function getAccessToken() {
    const clientId = '489e275b8c0a4fe78c837086f353fa61';
    const clientSecret = '5df4bb102e2a41349cbf064fc9f4edd9';
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
}

async function searchSpotify(type) {
    const query = document.getElementById('searchQuery').value;
    const token = await getAccessToken();

    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&limit=1`;
    const response = await fetch(searchUrl, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();

    displayResults(data, type);
}

function displayResults(data, type) {
    if (type === 'artist' && data.artists.items.length > 0) {
        const artist = data.artists.items[0];
        document.getElementById('artistIframe').src = `https://open.spotify.com/embed/artist/${artist.id}`;
    } else if (type === 'artist') {
        document.getElementById('artistIframe').src = "";
    }

    if (type === 'playlist' && data.playlists.items.length > 0) {
        const playlist = data.playlists.items[0];
        document.getElementById('playlistIframe').src = `https://open.spotify.com/embed/playlist/${playlist.id}`;
    } else if (type === 'playlist') {
        document.getElementById('playlistIframe').src = "";
    }

    if (type === 'track' && data.tracks.items.length > 0) {
        const track = data.tracks.items[0];
        document.getElementById('trackIframe').src = `https://open.spotify.com/embed/track/${track.id}`;
    } else if (type === 'track') {
        document.getElementById('trackIframe').src = "";
    }
}

function searchArtist() {
    searchSpotify('artist');
}

function searchPlaylist() {
    searchSpotify('playlist');
}

function searchTrack() {
    searchSpotify('track');
}
