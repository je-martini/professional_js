import media_player from './media_player.js'

const video = document.querySelector("video")
const button = document.querySelector('button');

const player = new media_player({ el: video});

button.onclick = () => {
    if(video.paused){
        player.play();
    }  else if (!video.paused){
        player.pause();
    }
}


