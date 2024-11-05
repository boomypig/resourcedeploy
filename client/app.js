console.log("connected");

let musicWrapper = document.querySelector("#song-wrapper");
let albumInput = document.querySelector("#in-album");
let titleInput = document.querySelector("#in-title");
let artistInput = document.querySelector("#in-artist");
let lengthInput = document.querySelector("#in-length");
let genreInput = document.querySelector("#in-genre");
let saveButton = document.querySelector("#save-button");


// Modal and button elements
let modalButton = document.querySelector("#modal-button");
let modalClose = document.querySelector("#close-modal"); 
let modal = document.querySelector("#modal");

let deleteModal = document.querySelector("#delete-modal");
let cancelDelete = document.querySelector("#cancel-delete");
let confirmDelete = document.querySelector("#confirm-delete");

let editID = null;

// Function to add a song entry to the DOM
function addMusicToDom(data) {

    const songContainer = document.createElement("div");
    songContainer.className = "song-entry";

    let album = document.createElement("h2");
    album.textContent = data.album;
    
    let title = document.createElement("h3");
    title.textContent = data.title;
    
    let artist = document.createElement("p");
    artist.textContent = "Artist: " + data.artist;
    
    let length = document.createElement("p");
    length.textContent = "Length: " + data.length;
    
    let genre = document.createElement("p");
    genre.textContent = "Genre: " + data.genre;

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "btn-edit-modal";

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn-delete-modal";

    //  event listeners for edit and delete
    editButton.onclick = function() {
        console.log("Editing music ID:", data.id);
        modal.style.display = "flex";
        albumInput.value = data.album;
        titleInput.value = data.title;
        artistInput.value = data.artist;
        lengthInput.value = data.length;
        genreInput.value = data.genre;
        editID = data.id;
    };

    deleteButton.onclick = function() {
        deleteMusic(data);
    };

    

    // Append elements to the wrapper
    songContainer.appendChild(album);
    songContainer.appendChild(title);
    songContainer.appendChild(artist);
    songContainer.appendChild(length);
    songContainer.appendChild(genre);
    songContainer.appendChild(editButton);
    songContainer.appendChild(deleteButton);
    songContainer.appendChild(document.createElement("hr"));
    musicWrapper.appendChild(songContainer);
}

// Fetch and load music from the server
function loadMusicFromServer() {
    fetch("http://localhost:8080/musics")
        .then(function(response) {
            return response.json();
        })
        .then(function(musics) {
            console.log("Loaded music data:", musics);
            musicWrapper.textContent = "";  // Clear existing entries
            musics.forEach(addMusicToDom);
        });
}

// Delete music entry from the server
function deleteMusic(data) {
    
    cancelDelete.onclick = function() {
        deleteModal.style.display = "none";
    };
    
    confirmDelete.onclick = function() {
      // Send delete request to server
      fetch("http://localhost:8080/musics/" + data.id, {
        method: "DELETE",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
      .then(function(response) {
        console.log("Music deleted:", response);
        musicWrapper.textContent = "";  // Clear and reload
        loadMusicFromServer();
      });
      deleteModal.style.display = "none";
    };

    deleteModal.style.display = "flex";
    
  }

function saveMusic() {
    console.log("save button clicked")
    // if (!albumInput.value || !titleInput.value || !artistInput.value) {
    //     alert("Album, title, and artist are required!");
    //     return;
    // }
    let data = "album=" + encodeURIComponent(albumInput.value);
    data += "&title=" + encodeURIComponent(titleInput.value);
    data += "&artist=" + encodeURIComponent(artistInput.value);
    data += "&length=" + encodeURIComponent(lengthInput.value);
    data += "&genre=" + encodeURIComponent(genreInput.value);
    console.log("Data:",data)
    let method = "POST";
    let URL = "http://localhost:8080/musics";
    
    if(editID){
        method = "PUT";
        URL = "http://localhost:8080/musics/" + editID;
    }
    fetch(URL, {
        method: method,
        body: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).then(function(response) {
        console.log("New music saved:", response);
        musicWrapper.textContent = "";  // Clear and reload
        modal.style.display = "none";
        loadMusicFromServer();
    });
    editID = null;
    clearInputs();
}
function clearInputs() {
    albumInput.value = "";
    titleInput.value = "";
    artistInput.value = "";
    lengthInput.value = "";
    genreInput.value = "";
}
saveButton.onclick = saveMusic;
// Modal toggle functions
modalButton.onclick = function() { 
    modal.style.display = "flex"; 
};
modalClose.onclick = function() { 
    console.log("close button clicked");    
    modal.style.display = "none"; 
    deleteModal.style.display = "none";
};


// Close modal when clicking outside of it
modal.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        clearInputs();
    }
};



// Initial load
loadMusicFromServer();
