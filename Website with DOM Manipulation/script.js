// --- STUDENT PROJECT: BCA DOM ASSESSMENT ---
// DOM Elements Selection
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
const playlistTabs = document.querySelectorAll('.playlist-tab');

// Variables for player state
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let currentPlaylistKey = 'shiv'; // default

// Playlists Data (Mapped exactly to the files in the 'song' folder)
const allPlaylists = {
    shiv: [
        { title: "Alakh Niranjan", artist: "Har Har Mahadev", src: "song/Alakh Niranjan - Aadesh _ (अलख निरंजन) _ Epic Powerfull Version _ har har Mahadev(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1605333552044-6447814b7e8d?auto=format&fit=crop&w=400&q=80" },
        { title: "Babam Bam", artist: "Kailash Kher", src: "song/Babam Bam - Kailash Kher _ Official Video _ Kailasa Jhoomo Re _ Kailasa _ Paresh_ Naresh(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1605333552044-6447814b7e8d?auto=format&fit=crop&w=400&q=80" },
        { title: "FAITH in SHIVA", artist: "Harish Sagane", src: "song/FAITH in SHIVA Can Change Anything _ Shiv Swarnamala Stuti _ Harish Sagane(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1605333552044-6447814b7e8d?auto=format&fit=crop&w=400&q=80" },
        { title: "Parvati Boli Shankar Se", artist: "Hansraj Raghuwanshi", src: "song/Hansraj Raghuwanshi _ Parvati Boli Shankar Se - O Bholenath Ji _ Lyrical _ New Bhole Baba Song 2022(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1605333552044-6447814b7e8d?auto=format&fit=crop&w=400&q=80" },
        { title: "Damru Wale Baba", artist: "Krishna Chaturvedi", src: "song/Krishna Chaturvedi - Damru Wale Baba Tumko Aana Hoga _Shubh Jha _  Shiv Bhajan(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1605333552044-6447814b7e8d?auto=format&fit=crop&w=400&q=80" },
        { title: "Raja Ki Rajdulari", artist: "Shri Bansi Jogi", src: "song/Original तू राजा की राजदुलारी Part - 1_ 1995 _ Shri Bansi Jogi _ Remastered(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1605333552044-6447814b7e8d?auto=format&fit=crop&w=400&q=80" },
        { title: "Shiv Shiv Shankara", artist: "Hansraj Raghuwanshi", src: "song/Shiv Shiv Shankara official video __ Hansraj Raghuwanshi __ Mista Baaz __ Jamie __(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1605333552044-6447814b7e8d?auto=format&fit=crop&w=400&q=80" },
        { title: "Shiv Tandav Stotram", artist: "Sachet Parampara", src: "song/Shiv Tandav Stotram (Har Har Shiv Shankar) _Sachet Tandon_Parampara Tandon _ Bhushan Kumar _T-Series(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1605333552044-6447814b7e8d?auto=format&fit=crop&w=400&q=80" },
        { title: "Shiv Kailasho Ke Vasi", artist: "Hansraj Raghuwanshi", src: "song/Shiv kailasho ke Vasi __ Official Music Video __ Hansraj Raghuwanshi __ Baba Ji(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1605333552044-6447814b7e8d?auto=format&fit=crop&w=400&q=80" },
        { title: "Baba Ji Adesh Pukaro", artist: "Gajender Phogat", src: "song/बाबा जी आदेश पुकारो Baba ji Adesh Pukaro _ New Sawan Song __Gajender Phogat__(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1605333552044-6447814b7e8d?auto=format&fit=crop&w=400&q=80" }
    ],
    masoom: [
        { title: "Baju P e Bhola", artist: "Masoom Sharma", src: "song/Baju P e Bhola (OffIcial video) Masoom Sharma __lhhhollywoodlhhhollywood(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1571330735066-03aaa9428d89?auto=format&fit=crop&w=400&q=80" },
        { title: "Bhole Ka Pujari", artist: "Masoom Sharma", src: "song/Bhole Ka Pujari (Official Video) Masoom Sharma _ New Haryanvi Song 2025 _ New Bhole Baba Song(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1571330735066-03aaa9428d89?auto=format&fit=crop&w=400&q=80" },
        { title: "G-TOWN", artist: "Masoom Sharma", src: "song/G-TOWN (Official Video) Masoom Sharma _ Kamal Digiya _ Fiza Chaudhary _ Masoom Sharma New Song(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1571330735066-03aaa9428d89?auto=format&fit=crop&w=400&q=80" },
        { title: "Licence Ka Asla", artist: "Masoom Sharma", src: "song/Licence Ka Asla - Licence _ Masoom Sharma _ Amar Karnawal(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1571330735066-03aaa9428d89?auto=format&fit=crop&w=400&q=80" },
        { title: "Main Vohe", artist: "Masoom Sharma", src: "song/Main Vohe (Official Video) Masoom Sharma _ Amar Karnawal _ Thinker _ New Haryanvi Song 2026(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1571330735066-03aaa9428d89?auto=format&fit=crop&w=400&q=80" },
        { title: "Pistol Premi", artist: "Masoom Sharma", src: "song/Pistol Premi (Official Video) Masoom Sharma _ KP Kundu_ Sweta Chauhan _ New Haryanvi Song 2026(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1571330735066-03aaa9428d89?auto=format&fit=crop&w=400&q=80" },
        { title: "WARNING", artist: "Masoom Sharma", src: "song/WARNING (Official Video) _ Masoom Sharma _ Malika Kaliraman _ Haryanvi Songs Haryanavi 2025(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1571330735066-03aaa9428d89?auto=format&fit=crop&w=400&q=80" },
        { title: "Bhaang Ragad Ke", artist: "Randeep Hooda", src: "song/Bhaang Ragad Ke Lyrical Video Song _ LAAL RANG _ Randeep Hooda _ T-Series(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1571330735066-03aaa9428d89?auto=format&fit=crop&w=400&q=80" }
    ],
    dhanda: [
        { title: "Black Ride", artist: "Dhanda Nyoliwala", src: "song/Black Ride (Official Music Video) Dhanda Nyoliwala _ Hammy Muzic(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&w=400&q=80" },
        { title: "Boom Shaka", artist: "Dhanda Nyoliwala", src: "song/Boom Shaka (Official Music Video) _ KR_NA _  Dhanda Nyoliwala(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&w=400&q=80" },
        { title: "Dil De Baithi", artist: "Dhanda Nyoliwala", src: "song/Dhanda Nyoliwala - Dil De Baithi (Official Music Video)(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&w=400&q=80" },
        { title: "Ishq Bawla", artist: "Dhanda Nyoliwala", src: "song/Dhanda Nyoliwala - Ishq Bawla (Official Video) _ Xvir Grewal _ Coke Studio Bharat _ Haryanvi Song(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&w=400&q=80" },
        { title: "Kath Lagda", artist: "Dhanda Nyoliwala", src: "song/Kath Lagda - Navaan Sandhu ft Dhanda Nyoliwala ( Official Music Video )(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&w=400&q=80" },
        { title: "Maruti", artist: "Dhanda Nyoliwala", src: "song/Maruti (Official Video) Dhanda Nyoliwala _ Miki Malang _ Ron Likhari(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&w=400&q=80" },
        { title: "Teri Haan Pe", artist: "Dhanda Nyoliwala", src: "song/Teri Haan Pe(MP3_160K).mp3", cover: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&w=400&q=80" }
    ]
};

let songs = allPlaylists[currentPlaylistKey];

// Initialize the application
function init() {
    loadSavedData();
    updateActiveTab();
    generatePlaylist();
    loadSong(currentSongIndex);
}

// Playlist Switcher Logic
playlistTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Change Playlist
        currentPlaylistKey = tab.dataset.playlist;
        songs = allPlaylists[currentPlaylistKey];
        currentSongIndex = 0; // Reset to first song of new playlist
        
        updateActiveTab();
        generatePlaylist();
        loadSong(currentSongIndex);
        playSong();
    });
});

function updateActiveTab() {
    playlistTabs.forEach(tab => {
        tab.classList.remove('active');
        if(tab.dataset.playlist === currentPlaylistKey) {
            tab.classList.add('active');
        }
    });
}

// Generate playlist dynamically using createElement and appendChild
function generatePlaylist() {
    playlistList.innerHTML = '';

    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.classList.add('playlist-item');
        li.dataset.index = index;

        li.innerHTML = `
            <div class="playlist-icon"><i class="fas fa-music"></i></div>
            <div class="song-details">
                <div class="title">${song.title}</div>
                <div class="artist">${song.artist}</div>
            </div>
        `;

        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });

        playlistList.appendChild(li);
    });
}

// Load song details into the UI
function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title; 
    artistName.textContent = song.artist;
    audio.src = song.src;
    coverImage.src = song.cover;
    
    updatePlaylistHighlight();
    saveToLocalStorage();
}

// Highlight currently playing song
function updatePlaylistHighlight() {
    const allItems = document.querySelectorAll('.playlist-item');
    
    allItems.forEach(item => {
        item.classList.remove('playing');
        if (parseInt(item.dataset.index) === currentSongIndex) {
            item.classList.add('playing');
        }
    });
}

// Play and Pause functions
function playSong() {
    isPlaying = true;
    audio.play().catch(e => console.log("Audio playing..."));
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
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

// Shuffle and Repeat buttons
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
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
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

// Search Box DOM Manipulation
searchBox.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.playlist-item');
    
    items.forEach(item => {
        const title = item.querySelector('.title').textContent.toLowerCase();
        const artist = item.querySelector('.artist').textContent.toLowerCase();
        
        if (title.includes(term) || artist.includes(term)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// LocalStorage functions
function saveToLocalStorage() {
    localStorage.setItem('savedPlaylist', currentPlaylistKey);
    localStorage.setItem('savedSongIndex', currentSongIndex);
    localStorage.setItem('savedVolume', volumeSlider.value);
}

function loadSavedData() {
    const savedPlaylist = localStorage.getItem('savedPlaylist');
    const savedIndex = localStorage.getItem('savedSongIndex');
    const savedVolume = localStorage.getItem('savedVolume');
    
    if (savedPlaylist && allPlaylists[savedPlaylist]) {
        currentPlaylistKey = savedPlaylist;
        songs = allPlaylists[currentPlaylistKey];
    }
    
    if (savedIndex !== null && savedIndex < songs.length) {
        currentSongIndex = parseInt(savedIndex);
    }
    
    if (savedVolume !== null) {
        volumeSlider.value = savedVolume;
        audio.volume = savedVolume / 100;
    }
}

// Start app
init();
