//TODO: write my mark in console
const titleLabel = document.querySelector('.player-title');
const authorLabel = document.querySelector('.player-author');
const songCover = document.querySelector('.player-pic');
const playButton = document.querySelector('.play-pause');
const leftScrollButton = document.querySelector('.scroll-left');
const rightScrollButton = document.querySelector('.scroll-right');
const shuffleButton = document.querySelector('.shuffle');
const repeatButton = document.querySelector('.replay');
const muteButton = document.querySelector('.volume');
const audioTrack = document.querySelector('.player-song-time');
const volumeInput = document.querySelector('.player-song-volume');
const audioPlayer = document.querySelector('.audio-player');
const audioPlayerSource = audioPlayer.querySelector('source');
const leftTiming = document.querySelector('.left-timing'); 
const rightTiming = document.querySelector('.right-timing'); 
const volumeLabel = document.querySelector('.sound-volume'); 

let tracks = [];
let tracksLoaded = false;
let currentTrack = 0;
let isPaused = true;
let isMuted = false;
let isRepeating = false;
audioPlayer.volume = volumeInput.value;

async function fetchTracks() {
  try {
    const response = await fetch('./tracks.json'); // Adjust the path as needed
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    tracks = await response.json();
    tracksLoaded = true;
    init();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

playButton.addEventListener('click', () => Play() );
shuffleButton.addEventListener('click', () => Shuffle() );
leftScrollButton.addEventListener('click', () => ScrollLeft() );
rightScrollButton.addEventListener('click', () => ScrollRight() );
repeatButton.addEventListener('click', () => Repeat() );
muteButton.addEventListener('click', () => MuteVolume() );

audioTrack.addEventListener('click', function(){
    audioPlayer.currentTime = audioTrack.value * audioPlayer.duration;
});
audioPlayer.addEventListener('timeupdate', function() {
    const mins = Math.floor(audioPlayer.currentTime / 60);
    const secs = Math.floor(audioPlayer.currentTime % 60);
    leftTiming.textContent = `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
    let duration;
    if (isNaN(audioPlayer.duration)) duration = 1;
    else duration = audioPlayer.duration;
    audioTrack.value = audioPlayer.currentTime / duration;
});
audioPlayer.addEventListener('ended', function() {
    if (isRepeating) {
        audioPlayer.value = 0;
        audioPlayer.play();
    }
    else ScrollRight();
});

volumeInput.addEventListener('input', () => {
    if (!isMuted) audioPlayer.volume = volumeInput.value;
    else audioPlayer.volume = 0;
    volumeLabel.textContent = parseInt(volumeInput.value * 100);
});
//TODO: fix scrolling audiotrack bug
document.addEventListener("DOMContentLoaded", function(){
    fetchTracks();
});

function init() {
    RenderTrackParams();
}

function RenderTrackParams(){
    audioPlayerSource.src = tracks[currentTrack].song;
    audioPlayer.load();
}
audioPlayer.addEventListener('loadedmetadata', function() {
    titleLabel.textContent = tracks[currentTrack].title;
    authorLabel.textContent = tracks[currentTrack].author;
    songCover.src = tracks[currentTrack].img;
    audioTrack.value = 0;
    const mins = Math.floor(audioPlayer.duration / 60);
    const secs = Math.floor(audioPlayer.duration % 60);
    rightTiming.textContent = `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
});
function Play() {
    if (isPaused){
        PlayButtonOn();
    } 
    else {
        PlayButtonOff();
    }
}
function PlayButtonOn(){
    let img = playButton.querySelector('img');
    audioPlayer.play();
    isPaused = false;
    img.src = 'assets/imgs/pausefullwhite.png';
}
function PlayButtonOff(){
    let img = playButton.querySelector('img');
    audioPlayer.pause();
    isPaused = true;
    img.src = 'assets/imgs/playfullwhite.png';
}
function ScrollLeft(){
    if(!tracksLoaded) return;
    currentTrack--;
    if (currentTrack === -1){
        currentTrack = tracks.length - 1;
    }
    RenderTrackParams();
    PlayButtonOn();
}
function ScrollRight(){
    if(!tracksLoaded) return;
    currentTrack++;
    if (currentTrack === tracks.length){
        currentTrack = 0;
    }
    RenderTrackParams();
    PlayButtonOn();
}
function MuteVolume(){
    isMuted = !isMuted;
    let img = muteButton.querySelector('img');
    if (isMuted){
        img.src = 'assets/imgs/disabled-volume-icon.svg';
        audioPlayer.volume = 0;
    }
    else {
        img.src = "assets/imgs/Speaker_Icon.png";
        audioPlayer.volume = volumeInput.value;
    }
}
function Shuffle(){}
function Repeat(){
    isRepeating = !isRepeating;
    let img = repeatButton.querySelector('img');
    if (isRepeating){
        img.src = 'assets/imgs/repeatActive.png';
    }
    else {
        img.src = "assets/imgs/repeat.png";
    }
}

