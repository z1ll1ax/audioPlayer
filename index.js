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


let tracks = [];
let tracksLoaded = false;
let currentTrack = 0;
let isPaused = true;
let isMuted = false;


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
//TODO: fix scrolling audiotrack bug
document.addEventListener("DOMContentLoaded", function(){
    fetchTracks();
});

function init() {
    RenderTrackParams();
}
function RenderTrackParams(){
    titleLabel.textContent = tracks[currentTrack].title;
    authorLabel.textContent = tracks[currentTrack].author;
    songCover.src = tracks[currentTrack].img;
    audioPlayerSource.src = tracks[currentTrack].song;
    volumeInput.value = 0;
    const mins = Math.floor(audioPlayer.duration / 60);
    const secs = Math.floor(audioPlayer.duration % 60);
    rightTiming.textContent = `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
}
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
    img.src = 'assets/imgs/pause.png';
}
function PlayButtonOff(){
    let img = playButton.querySelector('img');
    audioPlayer.pause();
    isPaused = true;
    img.src = 'assets/imgs/play.png';
}
function ScrollLeft(){
    if(!tracksLoaded) return;
    currentTrack -= 1;
    if (currentTrack === -1){
        currentTrack = tracks.length - 1;
    }
    RenderTrackParams();
    audioPlayer.load();
    volumeInput.value = 0;
    PlayButtonOn();
}
function ScrollRight(){
    if(!tracksLoaded) return;
    currentTrack += 1;
    if (currentTrack === tracks.length){
        currentTrack = 0;
    }
    RenderTrackParams();
    audioPlayer.load();
    volumeInput.value = 0;
    PlayButtonOn();
}
function MuteVolume(){}
function Shuffle(){}
function Repeat(){}

