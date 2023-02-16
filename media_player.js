function media_player(config) {
    this.media = config.el;
    this.plugins = config.plugins || []
}

media_player.prototype.play = function(){
    this.media.play()
}
media_player.prototype.pause = function(){
    this.media.pause()
}

export default media_player;

