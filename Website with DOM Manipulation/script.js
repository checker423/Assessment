// --- STUDENT PROJECT: PREMIUM MUSIC PLAYER ---
// DOM Elements Selection
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');
const muteBtn = document.getElementById('mute-btn');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');

const coverImage = document.getElementById('cover-image');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const mainVisualizer = document.getElementById('main-visualizer');

const playlistList = document.getElementById('playlist-list');
const searchBox = document.getElementById('search-box');
const playlistTabs = document.querySelectorAll('.tab-btn');
const themeToggle = document.getElementById('theme-toggle');

// Variables for player state
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let currentPlaylistKey = 'shiv'; // default
let favorites = JSON.parse(localStorage.getItem('vibesFavorites')) || [];

// Playlists Data
const rawPlaylists = {
    shiv: [
        { title: "Raja Ki Rajdulari", artist: "Shri Bansi Jogi", src: "song/Original तू राजा की राजदुलारी Part - 1_ 1995 _ Shri Bansi Jogi _ Remastered(MP3_160K).mp3", cover: "images/shiv2.png" },
        { title: "Bhaang Ragad Ke", artist: "Randeep Hooda", src: "song/Bhaang Ragad Ke Lyrical Video Song _ LAAL RANG _ Randeep Hooda _ T-Series(MP3_160K).mp3", cover: "images/shiv1.png" },
        { title: "Alakh Niranjan", artist: "Har Har Mahadev", src: "song/Alakh Niranjan - Aadesh _ (अलख निरंजन) _ Epic Powerfull Version _ har har Mahadev(MP3_160K).mp3", cover: "images/shiv1.png" },
        { title: "Babam Bam", artist: "Kailash Kher", src: "song/Babam Bam - Kailash Kher _ Official Video _ Kailasa Jhoomo Re _ Kailasa _ Paresh_ Naresh(MP3_160K).mp3", cover: "images/shiv2.png" },
        { title: "FAITH in SHIVA", artist: "Harish Sagane", src: "song/FAITH in SHIVA Can Change Anything _ Shiv Swarnamala Stuti _ Harish Sagane(MP3_160K).mp3", cover: "images/shiv3.png" },
        { title: "Parvati Boli Shankar Se", artist: "Hansraj Raghuwanshi", src: "song/Hansraj Raghuwanshi _ Parvati Boli Shankar Se - O Bholenath Ji _ Lyrical _ New Bhole Baba Song 2022(MP3_160K).mp3", cover: "images/shiv4.png" },
        { title: "Damru Wale Baba", artist: "Krishna Chaturvedi", src: "song/Krishna Chaturvedi - Damru Wale Baba Tumko Aana Hoga _Shubh Jha _  Shiv Bhajan(MP3_160K).mp3", cover: "images/shiv1.png" },
        { title: "Shiv Shiv Shankara", artist: "Hansraj Raghuwanshi", src: "song/Shiv Shiv Shankara official video __ Hansraj Raghuwanshi __ Mista Baaz __ Jamie __(MP3_160K).mp3", cover: "images/shiv3.png" },
        { title: "Shiv Tandav Stotram", artist: "Sachet Parampara", src: "song/Shiv Tandav Stotram (Har Har Shiv Shankar) _Sachet Tandon_Parampara Tandon _ Bhushan Kumar _T-Series(MP3_160K).mp3", cover: "images/shiv4.png" },
        { title: "Shiv Kailasho Ke Vasi", artist: "Hansraj Raghuwanshi", src: "song/Shiv kailasho ke Vasi __ Official Music Video __ Hansraj Raghuwanshi __ Baba Ji(MP3_160K).mp3", cover: "images/shiv1.png" },
        { title: "Baba Ji Adesh Pukaro", artist: "Gajender Phogat", src: "song/बाबा जी आदेश पुकारो Baba ji Adesh Pukaro _ New Sawan Song __Gajender Phogat__(MP3_160K).mp3", cover: "images/shiv2.png" },
        { title: "Baju P e Bhola", artist: "Masoom Sharma", src: "song/Baju P e Bhola (OffIcial video) Masoom Sharma __lhhhollywoodlhhhollywood(MP3_160K).mp3", cover: "images/shiv3.png" },
        { title: "Bhole Ka Pujari", artist: "Masoom Sharma", src: "song/Bhole Ka Pujari (Official Video) Masoom Sharma _ New Haryanvi Song 2025 _ New Bhole Baba Song(MP3_160K).mp3", cover: "images/shiv4.png" },
        { title: "Bhole Shankar", artist: "Shiv Bhakt", src: "song/Bhole Shankar - Bhole Shankar (128 kbps).mp3", cover: "images/shiv1.png" },
        { title: "Mere Bhole Nath", artist: "Shiv Bhakt", src: "song/Mere Bhole Nath - Mere Bhole Nath (128 kbps).mp3", cover: "images/shiv2.png" },
        { title: "Nache Bholanath", artist: "Shiv Bhakt", src: "song/Nache Bholanath.mp3", cover: "images/shiv3.png" }
    ],
    masoom: [
        { title: "Main Vohe", artist: "Masoom Sharma", src: "song/Main Vohe (Official Video) Masoom Sharma _ Amar Karnawal _ Thinker _ New Haryanvi Song 2026(MP3_160K).mp3", cover: "images/main_vohe.png" },
        { title: "G-TOWN", artist: "Masoom Sharma", src: "song/G-TOWN (Official Video) Masoom Sharma _ Kamal Digiya _ Fiza Chaudhary _ Masoom Sharma New Song(MP3_160K).mp3", cover: "images/masoom1.png" },
        { title: "Licence Ka Asla", artist: "Masoom Sharma", src: "song/Licence Ka Asla - Licence _ Masoom Sharma _ Amar Karnawal(MP3_160K).mp3", cover: "images/masoom2.png" },
        { title: "Pistol Premi", artist: "Masoom Sharma", src: "song/Pistol Premi (Official Video) Masoom Sharma _ KP Kundu_ Sweta Chauhan _ New Haryanvi Song 2026(MP3_160K).mp3", cover: "images/masoom4.png" },
        { title: "WARNING", artist: "Masoom Sharma", src: "song/WARNING (Official Video) _ Masoom Sharma _ Malika Kaliraman _ Haryanvi Songs Haryanavi 2025(MP3_160K).mp3", cover: "images/masoom1.png" },
        { title: "Teri Haan Pe", artist: "Masoom Sharma", src: "song/Teri Haan Pe(MP3_160K).mp3", cover: "images/masoom2.png" },
        { title: "Baaghi", artist: "Masoom Sharma", src: "song/Baaghi.mp3", cover: "images/masoom3.png" },
        { title: "Jadugarni", artist: "Masoom Sharma", src: "song/Jadugarni.mp3", cover: "images/masoom4.png" },
        { title: "Jailer", artist: "Masoom Sharma", src: "song/Jailer.mp3", cover: "images/masoom1.png" },
        { title: "Madam Ji", artist: "Masoom Sharma", src: "song/Madam Ji.mp3", cover: "images/masoom2.png" },
        { title: "Mangal Sutra", artist: "Masoom Sharma", src: "song/Mangal Sutra.mp3", cover: "images/masoom3.png" },
        { title: "Yaari Dosti", artist: "Masoom Sharma", src: "song/Yaari Dosti.mp3", cover: "images/masoom4.png" },
        { title: "Yaha Ke Bahubali", artist: "Masoom Sharma", src: "song/Yaha Ke Bahubali.mp3", cover: "images/masoom1.png" }
    ],
    dhanda: [
        { title: "Ishq Bawla", artist: "Dhanda Nyoliwala", src: "song/Dhanda Nyoliwala - Ishq Bawla (Official Video) _ Xvir Grewal _ Coke Studio Bharat _ Haryanvi Song(MP3_160K).mp3", cover: "images/dhanda_top.png" },
        { title: "Black Ride", artist: "Dhanda Nyoliwala", src: "song/Black Ride (Official Music Video) Dhanda Nyoliwala _ Hammy Muzic(MP3_160K).mp3", cover: "images/dhanda1.png" },
        { title: "Boom Shaka", artist: "Dhanda Nyoliwala", src: "song/Boom Shaka (Official Music Video) _ KR_NA _  Dhanda Nyoliwala(MP3_160K).mp3", cover: "images/dhanda2.png" },
        { title: "Dil De Baithi", artist: "Dhanda Nyoliwala", src: "song/Dhanda Nyoliwala - Dil De Baithi (Official Music Video)(MP3_160K).mp3", cover: "images/dhanda3.png" },
        { title: "Kath Lagda", artist: "Dhanda Nyoliwala", src: "song/Kath Lagda - Navaan Sandhu ft Dhanda Nyoliwala ( Official Music Video )(MP3_160K).mp3", cover: "images/dhanda5.png" },
        { title: "Maruti", artist: "Dhanda Nyoliwala", src: "song/Maruti (Official Video) Dhanda Nyoliwala _ Miki Malang _ Ron Likhari(MP3_160K).mp3", cover: "images/dhanda1.png" },
        { title: "Deadly Zone", artist: "Dhanda Nyoliwala", src: "song/Deadly Zone.mp3", cover: "images/dhanda2.png" },
        { title: "Forever", artist: "Dhanda Nyoliwala", src: "song/Forever.mp3", cover: "images/dhanda3.png" },
        { title: "Intro Kohram", artist: "Dhanda Nyoliwala", src: "song/Intro Kohram.mp3", cover: "images/dhanda4.png" },
        { title: "Kaat", artist: "Dhanda Nyoliwala", src: "song/Kaat.mp3", cover: "images/dhanda5.png" },
        { title: "Kabze", artist: "Dhanda Nyoliwala", src: "song/Kabze.mp3", cover: "images/dhanda1.png" },
        { title: "Nobody Came", artist: "Dhanda Nyoliwala", src: "song/Nobody Came.mp3", cover: "images/dhanda2.png" },
        { title: "Not Guilty", artist: "Dhanda Nyoliwala", src: "song/Not Guilty.mp3", cover: "images/dhanda3.png" },
        { title: "Vomit On Paper", artist: "Dhanda Nyoliwala", src: "song/Vomit On Paper.mp3", cover: "images/dhanda4.png" },
        { title: "Whispers Wounds", artist: "Dhanda Nyoliwala", src: "song/Whispers Wounds.mp3", cover: "images/dhanda5.png" }
    ]
};

let songs = rawPlaylists[currentPlaylistKey];

// =========================================
// INITIALIZATION
// =========================================
function init() {
    loadSavedData();
    updateThemeIcon();
    updateActiveTab();
    generatePlaylist();
    if(songs.length > 0) loadSong(currentSongIndex);
}

// =========================================
// PLAYLIST & UI GENERATION
// =========================================
playlistTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        currentPlaylistKey = tab.dataset.target;
        
        if (currentPlaylistKey === 'favorites') {
            songs = favorites;
        } else {
            songs = rawPlaylists[currentPlaylistKey];
        }
        
        currentSongIndex = 0; 
        updateActiveTab();
        generatePlaylist();
        
        if(songs.length > 0) {
            loadSong(currentSongIndex);
            if(isPlaying) playSong();
        }
    });
});

function updateActiveTab() {
    playlistTabs.forEach(tab => {
        tab.classList.remove('active');
        if(tab.dataset.target === currentPlaylistKey) {
            tab.classList.add('active');
        }
    });
}

function generatePlaylist() {
    playlistList.innerHTML = '';

    if (songs.length === 0) {
        playlistList.innerHTML = '<li style="text-align:center; padding: 20px; color: var(--text-secondary);">No songs here yet.</li>';
        return;
    }

    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.classList.add('playlist-item');
        li.dataset.index = index;
        
        const isFav = favorites.some(fav => fav.src === song.src);

        li.innerHTML = `
            <div class="item-thumb-container">
                <img src="${song.cover}" class="item-thumb" alt="Cover">
                <div class="item-eq">
                    <div class="item-eq-bar"></div>
                    <div class="item-eq-bar"></div>
                    <div class="item-eq-bar"></div>
                </div>
            </div>
            <div class="item-details">
                <div class="item-title">${song.title}</div>
                <div class="item-artist-sub">${song.artist}</div>
            </div>
            <div class="item-artist-col">${song.artist}</div>
            <div class="item-duration">3:45</div>
            <div class="item-menu ${isFav ? 'favorited' : ''}" title="Toggle Favorite">
                <i class="fas fa-heart"></i>
            </div>
        `;

        // Click song to play
        li.addEventListener('click', (e) => {
            // Prevent play if clicking favorite button
            if(e.target.closest('.item-menu')) return;
            
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });

        // Click favorite button
        const favBtn = li.querySelector('.item-menu');
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(song, favBtn);
        });

        playlistList.appendChild(li);
    });
}

function showToast(message, iconClass = 'fa-info-circle') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas ${iconClass}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if(container.contains(toast)) container.removeChild(toast);
        }, 300);
    }, 3000);
}

function toggleFavorite(song, btnEl) {
    const exists = favorites.some(fav => fav.src === song.src);
    if (exists) {
        favorites = favorites.filter(fav => fav.src !== song.src);
        btnEl.classList.remove('favorited');
        showToast('Removed from Favorites', 'fa-heart-broken');
    } else {
        favorites.push(song);
        btnEl.classList.add('favorited');
        showToast('Added to Favorites', 'fa-heart');
    }

    
    localStorage.setItem('vibesFavorites', JSON.stringify(favorites));
    
    // Refresh if currently on favorites tab
    if (currentPlaylistKey === 'favorites') {
        songs = favorites;
        generatePlaylist();
    }
}

// =========================================
// PLAYER LOGIC
// =========================================
function loadSong(index) {
    if (!songs[index]) return;
    const song = songs[index];
    
    // Update data immediately to prevent audio lag
    songTitle.textContent = song.title; 
    artistName.textContent = song.artist;
    audio.src = song.src;

    // Fade effect logic for image only
    coverImage.style.opacity = '0';
    setTimeout(() => {
        coverImage.src = song.cover;
        coverImage.style.opacity = '1';
    }, 200);
    
    updatePlaylistHighlight();
    saveToLocalStorage();
}

function updatePlaylistHighlight() {
    const allItems = document.querySelectorAll('.playlist-item');
    allItems.forEach(item => {
        item.classList.remove('playing');
        if (parseInt(item.dataset.index) === currentSongIndex) {
            item.classList.add('playing');
        }
    });
}

function playSong() {
    if(songs.length === 0) return;
    isPlaying = true;
    audio.play().catch(e => console.log("Audio playing..."));
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    
    coverImage.classList.add('spinning');
    mainVisualizer.classList.add('active');
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    
    coverImage.classList.remove('spinning');
    mainVisualizer.classList.remove('active');
}

playBtn.addEventListener('click', () => {
    if (isPlaying) pauseSong();
    else playSong();
});

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    if(isPlaying) playSong();
}

function nextSong() {
    if (isShuffle) {
        let newIndex = currentSongIndex;
        while(newIndex === currentSongIndex && songs.length > 1) {
            newIndex = Math.floor(Math.random() * songs.length);
        }
        currentSongIndex = newIndex;
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

shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active-btn');
});

repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active-btn');
});

// =========================================
// PROGRESS BAR & TIME
// =========================================
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
    if (isRepeat) {
        audio.currentTime = 4; // Skip the 4-second silence on repeat
        playSong();
    } else {
        nextSong();
    }
});
// Set total duration metadata
audio.addEventListener('loadedmetadata', () => {
    totalDurationEl.textContent = formatTime(audio.duration);
    
    // Attempt to update the duration in the playlist item
    const currentItem = document.querySelector('.playlist-item.playing .item-duration');
    if(currentItem) currentItem.textContent = formatTime(audio.duration);
    
    // Automatically skip the first 4 seconds of silence/intro
    if(audio.currentTime < 4) {
        audio.currentTime = 4;
    }
});

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.textContent = formatTime(currentTime);
    }
}

progressBar.addEventListener('input', (e) => {
    const seekTime = (audio.duration / 100) * e.target.value;
    audio.currentTime = seekTime;
});

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// =========================================
// VOLUME & THEME
// =========================================
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
    saveToLocalStorage();
    
    if(audio.volume === 0) muteBtn.className = 'fas fa-volume-mute volume-icon';
    else if(audio.volume < 0.5) muteBtn.className = 'fas fa-volume-down volume-icon';
    else muteBtn.className = 'fas fa-volume-up volume-icon';
});

muteBtn.addEventListener('click', () => {
    if(audio.volume > 0) {
        audio.volume = 0;
        volumeSlider.value = 0;
        muteBtn.className = 'fas fa-volume-mute volume-icon';
    } else {
        audio.volume = 1;
        volumeSlider.value = 100;
        muteBtn.className = 'fas fa-volume-up volume-icon';
    }
});

// Dark/Light Mode
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    updateThemeIcon();
    localStorage.setItem('vibesTheme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

function updateThemeIcon() {
    if(document.body.classList.contains('light-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// =========================================
// SEARCH & KEYBOARD SHORTCUTS
// =========================================
searchBox.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.playlist-item');
    
    items.forEach(item => {
        const title = item.querySelector('.item-title').textContent.toLowerCase();
        const artist = item.querySelector('.item-artist-col').textContent.toLowerCase();
        
        if (title.includes(term) || artist.includes(term)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

document.addEventListener('keydown', (e) => {
    // Ignore if typing in search box
    if(e.target.tagName === 'INPUT') return;
    
    if (e.code === 'Space') {
        e.preventDefault(); // Prevent scrolling
        if (isPlaying) pauseSong();
        else playSong();
    } else if (e.code === 'ArrowRight') {
        nextSong();
    } else if (e.code === 'ArrowLeft') {
        prevSong();
    } else if (e.code === 'KeyS') {
        shuffleBtn.click();
    } else if (e.code === 'KeyR') {
        repeatBtn.click();
    }
});

// =========================================
// LOCAL STORAGE
// =========================================
function saveToLocalStorage() {
    localStorage.setItem('savedPlaylist', currentPlaylistKey);
    localStorage.setItem('savedSongIndex', currentSongIndex);
    localStorage.setItem('savedVolume', volumeSlider.value);
}

function loadSavedData() {
    const savedPlaylist = localStorage.getItem('savedPlaylist');
    const savedIndex = localStorage.getItem('savedSongIndex');
    const savedVolume = localStorage.getItem('savedVolume');
    const savedTheme = localStorage.getItem('vibesTheme');
    
    if(savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    
    if (savedPlaylist && (rawPlaylists[savedPlaylist] || savedPlaylist === 'favorites')) {
        currentPlaylistKey = savedPlaylist;
        if(currentPlaylistKey === 'favorites') songs = favorites;
        else songs = rawPlaylists[currentPlaylistKey];
    }
    
    if (savedIndex !== null && savedIndex < songs.length) {
        currentSongIndex = parseInt(savedIndex);
    }
    
    if (savedVolume !== null) {
        volumeSlider.value = savedVolume;
        audio.volume = savedVolume / 100;
        if(audio.volume === 0) muteBtn.className = 'fas fa-volume-mute volume-icon';
        else if(audio.volume < 0.5) muteBtn.className = 'fas fa-volume-down volume-icon';
        else muteBtn.className = 'fas fa-volume-up volume-icon';
    }
}

// Start App
init();
