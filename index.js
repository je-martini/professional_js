import media_player from './media_player.js';
import auto_play from './plugins/auto_play.js'

const video = document.querySelector("video")
const play_button = document.querySelector('.play_button');
const mute_button = document.querySelector('.mute_button');

const player = new media_player({ 
    el: video,
    plugins: [
        // new auto_play()
    ], 
});

play_button.onclick = () => {
    if(video.paused){
        player.play();
    }  else if (!video.paused){
        player.pause();
    }
}

mute_button.onclick = () => {
    if(video.muted){
        video.muted = false
    } else if(! video.muted){
        video.muted = true
    }
}

