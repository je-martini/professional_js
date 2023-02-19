function media_player(config) {
    this.media = config.el;
    this.plugins = config.plugins || [];
    this._init_plugins();

}

media_player.prototype._init_plugins = function(){
    this.plugins.forEach(plugin => {
        plugin.run(this);
    });
}

media_player.prototype.play = function(){
    this.media.play()
}
media_player.prototype.pause = function(){
    this.media.pause()
}

media_player.prototype.mute = function(){
    this.media.muted = true
}

media_player.prototype.unmute = function(){
    this.media.muted = false
}

export default media_player;

