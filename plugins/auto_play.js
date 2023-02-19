function auto_play() {

}

auto_play.prototype.run = function(video){
    video.mute();
    video.play();
}

export default auto_play;