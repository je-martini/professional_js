import media_player from './media_player.js';
import auto_play from './plugins/auto_play.js'

const video = document.querySelector("video")
const play_button = document.querySelector('.play_button');
const mute_button = document.querySelector('.mute_button');
const movies_sequence = document.querySelector('.movies_sequence')


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


const api_key = 'b89fc45c2067cbd33560270639722eae';

async function get_movie(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
    const response = await fetch(url)
    const data = await response.json()
    return data 

}

async function get_popular_movies() {
    const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;
    const response = await fetch(url)
    const data = await response.json()
    return data.results
}

async function get_top_movies_ids(n = 3){
    

    const popular_movies = await get_popular_movies();
    const ids = popular_movies.slice(0, n).map(movie => movie.id    )
    return ids
}
console.log(get_top_movies_ids)
console.log('h')

async function get_top_movies_in_sequence(){
    const ids = await get_top_movies_ids()
    const movies = []
    
    for (const id of ids){
        const movie = await get_movie(id)
        movies.push(movie)
    }

    return movies
}

movies_sequence.onclick = async function() {
    const movies = await get_top_movies_in_sequence()
    // render_movies(movies)
}




