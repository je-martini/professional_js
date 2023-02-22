const version = 'v1'

self.addEventListener('install', event => {
    event.waitUntil(precache())
})

self.addEventListener('fetch', event => {
    const request = event.request;

    if(request.method !== 'GET'){
        return;
    }

    event.respondWith(cached_response(request))

    event.waitUntil(update_cache(request))
})

async function precache() {
    const cache = await caches.open(version)
    
    return cache.addAll([
        '/',
        '/index.html',
        '/index.js',
        '/media_player.js',
        '/plugins/auto_play.js',
        '/plugins/auto_pause.js',
        '/style.css',
        '/media/BigBuckBunny_512kb.mp4',
    ])
}

async function cached_response(request) {
    const cache = await caches.open(version)
    const response = await cache.match(request)

    return response || fetch(request)
}

async function waitUntil(request){
    const cache = await caches.open(version)
    const response = await fetch(request)
    return cache.put(request, response)
}