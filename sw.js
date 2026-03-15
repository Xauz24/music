const CACHE_NAME = 'xauz-music-v1';
const STATIC_ASSETS = [
    './',
    './index.html',
    './playlist.js'
];

// Install Service Worker leh core files save na
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
    );
});

// Fetch events: Internet a awm loh pawn Cache a mi a rawn pe chhuak ang
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse; // Cache a awm sa chuan rawn play rawh
            }
            // A awm loh chuan internet atangin la la, cache ah save nghal rawh (Hla play thar te)
            return fetch(event.request).then(networkResponse => {
                if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });
                return networkResponse;
            }).catch(() => {
                console.log("Offline i ni a, he file hi a la in-download lo.");
            });
        })
    );
});