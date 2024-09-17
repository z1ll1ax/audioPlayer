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
    audioTrack.value = audioPlayer.currentTime / audioPlayer.duration;
});
//TODO: fix scrolling audiotrack bug
document.addEventListener("DOMContentLoaded", function(){
    fetchTracks();
});

function init() {
    audioPlayerSource.src = tracks[0].song;
    titleLabel.textContent = tracks[0].title;
    authorLabel.textContent = tracks[0].author;
    songCover.src = tracks[0].img;
    const mins = Math.floor(audioPlayer.duration / 60);
    const secs = Math.floor(audioPlayer.duration % 60);
    rightTiming.textContent = `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
}
function Play() {
    if (isPaused){
        audioPlayer.play();
        isPaused = false;
        let img = playButton.querySelector('img');
        img.src = 'assets/imgs/pause.png';
    } 
    else {
        audioPlayer.pause();
        isPaused = true;
        let img = playButton.querySelector('img');
        img.src = 'assets/imgs/play.png';
    } 
}
function ScrollLeft(){
    console.log(tracks);
}
function ScrollRight(){
    console.log(tracks);
}
function MuteVolume(){}
function Shuffle(){}
function Repeat(){}

