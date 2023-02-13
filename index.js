const video = document.querySelector("video")
const button = document.querySelector('button');


function media_player(config) {
    this.media = config.el;
}

media_player.prototype.play = function(){
    this.media.play()
}
media_player.prototype.pause = function(){
    this.media.pause()
}

const player = new media_player({ el: video});

button.onclick = () => {
    if(video.paused){
        player.play();
    }  else if (!video.paused){
        player.pause();
    }
}


