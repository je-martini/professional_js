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


const api_key = 'b89fc45c2067cbd33560270639722eae';

async function get_movie(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
    const response = await fetch(url)
    const data = await response.json()
    return data 
    // .then(response => response.json());

}

async function get_popular_movies() {
    const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&`
    const response = await fetch(url)
    const data = await response.json()
    return data.results
    // .then(response => response.json())
    // .then(data => data.results);
}

async function get_top_movies_ids(n = 3){
    // return get_popular_movies().then(popular_movies => 
    //     popular_movies.slice(0, n).map(movie => movie.id)
    // );
    // try{
    //     const popular_movies = await get_popular_movies()
    // } catch(error){
    //     console.log(error.message)
    // }

    const popular_movies = await get_popular_movies();
    const ids = popular_movies.slice(0, n).map(movie => movie.id    )

}



