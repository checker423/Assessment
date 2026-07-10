// --- STUDENT PROJECT: BCA DOM ASSESSMENT ---
// DOM Elements Selection using various methods
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');

const coverImage = document.querySelector('#cover-image');
const songTitle = document.querySelector('#song-title');
const artistName = document.querySelector('#artist-name');

const playlistList = document.getElementById('playlist-list');
const searchBox = document.querySelector('#search-box');

// Variables for player state
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

// Array of objects storing song data (Requirement 4)
const songs = [
    { title: "Summer Breeze", artist: "Chill Beats", src: "songs/song1.mp3", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=400&q=80" },
    { title: "Midnight Drive", artist: "Synthwave", src: "songs/song2.mp3", cover: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&w=400&q=80" },
    { title: "Acoustic Sunset", artist: "John Doe", src: "songs/song3.mp3", cover: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80" },
    { title: "Electric Dreams", artist: "Neon Light", src: "songs/song4.mp3", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80" },
    { title: "Lofi Study", artist: "Relaxing Vibes", src: "songs/song5.mp3", cover: "https://images.unsplash.com/photo-1493225457124-a1a2a5370216?auto=format&fit=crop&w=400&q=80" },
    { title: "Rock Anthem", artist: "The Guitars", src: "songs/song6.mp3", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80" },
    { title: "Piano Melody", artist: "Classical Touch", src: "songs/song7.mp3", cover: "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=400&q=80" },
    { title: "Pop Hit 2026", artist: "Star Singer", src: "songs/song8.mp3", cover: "https://images.unsplash.com/photo-1516280440502-d2f1f0a2fbdd?auto=format&fit=crop&w=400&q=80" }
];

// Initialize the application
function init() {
    loadSavedData();
    generatePlaylist();
    loadSong(currentSongIndex);
}

// Requirement 5: Generate playlist dynamically using createElement and appendChild
function generatePlaylist() {
    // Clear existing list
    playlistList.innerHTML = '';

    songs.forEach((song, index) => {
        // Create <li> element
        const li = document.createElement('li');
        li.classList.add('playlist-item');
        // Store index using dataset
        li.dataset.index = index;

        // Use innerHTML to structure the item
        li.innerHTML = `
            <div class="playlist-icon"><i class="fas fa-music"></i></div>
            <div class="song-details">
                <div class="title">${song.title}</div>
                <div class="artist">${song.artist}</div>
            </div>
        `;

        // Requirement 6: Click to play
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });

        // Append to the UL element
        playlistList.appendChild(li);
    });
}

// Load song details into the UI
function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title; // using textContent
    artistName.textContent = song.artist;
    audio.src = song.src;
    
    // In a real scenario with actual images in an 'images' folder, 
    // it would be coverImage.src = 'images/' + song.cover
    // Here we use the placeholder URLs provided in the array
    coverImage.src = song.cover;
    
    updatePlaylistHighlight();
    saveToLocalStorage();
}

// Requirement 7: Highlight currently playing song
function updatePlaylistHighlight() {
    // Select all playlist items using querySelectorAll
    const allItems = document.querySelectorAll('.playlist-item');
    
    allItems.forEach(item => {
        // Remove 'playing' class from all
        item.classList.remove('playing');
        
        // Add to the current one
        if (parseInt(item.dataset.index) === currentSongIndex) {
            item.classList.add('playing');
        }
    });
}

// Play and Pause functions
function playSong() {
    isPlaying = true;
    audio.play().catch(e => console.log("Audio file not found, waiting for actual files in 'songs' folder."));
    // Update play button icon using innerHTML
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    // Update play button icon
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// Event listener for play/pause button
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Previous and Next functions
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    playSong();
}

function nextSong() {
    if (isShuffle) {
        // Pick a random song
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
    }
    loadSong(currentSongIndex);
    if(isPlaying) playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Requirement 9: Shuffle and Repeat buttons (using classList.toggle)
shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active-btn');
});

repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active-btn');
});

// Audio events for progress bar
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
    if (isRepeat) {
        audio.currentTime = 0;
        playSong();
    } else {
        nextSong();
    }
});

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    
    // Update progress bar value
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
        
        // Format time
        currentTimeEl.textContent = formatTime(currentTime);
        totalDurationEl.textContent = formatTime(duration);
    }
}

// Click on progress bar to seek
progressBar.addEventListener('input', (e) => {
    const seekTime = (audio.duration / 100) * e.target.value;
    audio.currentTime = seekTime;
});

// Format time in minutes and seconds
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Volume control
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
    saveToLocalStorage();
});

// Requirement 8: Search Box DOM Manipulation
searchBox.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.playlist-item');
    
    items.forEach(item => {
        const title = item.querySelector('.title').textContent.toLowerCase();
        const artist = item.querySelector('.artist').textContent.toLowerCase();
        
        // Use style.display to show/hide items
        if (title.includes(term) || artist.includes(term)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// Requirement 10: LocalStorage functions
function saveToLocalStorage() {
    localStorage.setItem('savedSongIndex', currentSongIndex);
    localStorage.setItem('savedVolume', volumeSlider.value);
}

function loadSavedData() {
    const savedIndex = localStorage.getItem('savedSongIndex');
    const savedVolume = localStorage.getItem('savedVolume');
    
    if (savedIndex !== null) {
        currentSongIndex = parseInt(savedIndex);
    }
    
    if (savedVolume !== null) {
        volumeSlider.value = savedVolume;
        audio.volume = savedVolume / 100;
    }
}

// Start app
init();
