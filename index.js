import media_player from './media_player.js';
import auto_play from './plugins/auto_play.js'
import auto_pause from './plugins/auto_pause.js'


const video = document.querySelector("video")
const play_button = document.querySelector('.play_button');
const mute_button = document.querySelector('.mute_button');
const movies_sequence = document.querySelector('.movies_sequence')
const movies_in_parallel = document.querySelector('.movies_in_parallel')
const faster_movie = document.querySelector('.faster_movie')


const player = new media_player({ 
    el: video,
    plugins: [
        new auto_play(),
        new auto_pause(),
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

async function get_top_movies_in_sequence(){
    const ids = await get_top_movies_ids()
    const movies = []
    
    for (const id of ids){
        const movie = await get_movie(id)
        movies.push(movie)
    }

    return movies
}

async function get_top_movies_in_parallel(){
    const ids = await get_top_movies_ids()
    const movie_promises = ids.map(id => get_movie(id))
    
    const movies = await Promise.all(movie_promises)
    
    return movies
}
async function get_faster_top_movie(){
    const ids = await get_top_movies_ids()
    const movie_promises = ids.map(id => get_movie())
    
    const first_movie = await Promise.race(movie_promises)

    return first_movie
}

movies_sequence.onclick = async function() {
    const movies = await get_top_movies_in_sequence()
    render_movies(movies)
}

movies_in_parallel.onclick = async function() {
    const movies = await get_top_movies_in_parallel();
    render_movies(movies)

}

faster_movie.onclick = async function() {
    const movie = await get_faster_top_movie()
    render_movies([movie])
}

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service_workers.js').catch(error => {
        console.log(error.message)
    })
}



