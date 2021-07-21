let music = document.querySelector("audio");
let image = document.querySelector("img");
let play = document.getElementById("play");
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let progress = document.getElementById("progress");
let total_duration = document.getElementById("total_duration");
let currentTime = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");

let songs = [{
    name: "Baby", 
    title: "baby-baby",
    artist: "justin-bieber"
}, 
{
    name: "Cheap Thrills",
    title: "cheap-thrills",
    artist: "Sia"
}, 
{
    name: "Let Me Love You",
    title: "let me love you",
    artist: "DJ Snake"
}, 
{
    name: "Love Me Like You Do",
    title: "love me like you do",
    artist: "Ellie Goulding"
}, 
{
    name: "Waka Waka",
    title: "waka waka",
    artist: "Shakira"
}];

play.addEventListener("click", controlMusic);

let isMusicPlaying = false;

//play Music
function playMusic(){
    isMusicPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    image.classList.add("anime");
}

// pause Music
function pauseMusic() {
    isMusicPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    image.classList.remove("anime");
}

//change the control of the Music
function controlMusic() {
    if(isMusicPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

// change the songs
function loadSongs(songs){
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = `music/${songs.name}.mp3`;
    image.src = `images/${songs.name}.jpg`;
}

songIndex = 0;

function prevSong(){
    songIndex = (songIndex + 1)%songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
};

function nextSong(){
    songIndex = (songIndex - 1 + songs.length)%songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
};

// update the progress bar of the UI
music.addEventListener("timeupdate", function(Event){
    
    let { currentTime, duration } = Event.srcElement;

    let progress_Time = (currentTime/duration)*100;
    
    progress.style.width = `${progress_Time}%`;

    //update the current duration and progress duration meter
    let min_duration = Math.floor(duration/60);
    let sec_duration = Math.floor(duration%60);
    if(sec_duration < 10){
        sec_duration = `0${sec_duration}`;
    }
    if(duration){
        total_duration.textContent = `${min_duration}:${sec_duration}`;
    }
    
    // current time update
    let min_currentTime = Math.floor(currentTime/60);
    let sec_currentTime = Math.floor(currentTime%60);

    if(sec_currentTime < 10){
        sec_currentTime = `0${sec_currentTime}`;
    }
    current_time.textContent = `${min_currentTime}:${sec_currentTime}`;
});

// progress of the duration on user's click
progress_div.addEventListener("click", function(event){
    const {duration} = music;
    // var percent = event.offsetX / this.offsetWidth;
    // music.currentTime = percent * player.duration;
    // progressBar.value = percent / 100;

    // console.log(event.offsetX);
    // let move_progress =  (event.offsetX / event.srcElement.clientWidth)*duration;
    // console.log(event.srcElement.clientWidth);
    // music.currentTime = move_progress;

    //console.log(event.offsetX);
    let move_progress =  (event.offsetX / this.offsetWidth)*duration;
    console.log(event.srcElement.clientWidth);
    music.currentTime = move_progress;
});

// if the song ends, play the next one
music.addEventListener("ended", nextSong);

prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);