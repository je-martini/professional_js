class auto_pause{
    constructor(){  
        this.threshold = 0.35
        this.handle_intersection = this.handle_intersection.bind(this)
        this.handle_visibility_change = this.handle_visibility_change.bind(this)
    }

    run(player){
        this.player = player;

        const observer = new IntersectionObserver(this.handle_intersection, {
        threshold: this.threshold
    })

    observer.observe(this.player.media)
    
    document.addEventListener('visibilitychange', this.handle_visibility_change)
    }

    handle_intersection(entries){
        const entry = entries[0];
        
        const is_visible = entry.intersectionRatio > this.threshold

        if(is_visible){
            this.player.play()
        } else {
            this.player.pause()
        }
    }

    handle_visibility_change(){
        const is_hidden = document.visibilityState === "hidden"
        
        if(is_hidden){
            console.log(document.visibilityState)
            this.player.pause()
        } else {
            console.log(document.visibilityState)
            this.player.play()

        }
    }
}

export default auto_pause