const CACHE_NAME = 'xmusic-v2'; // Code i thlak apiangin v2, v3... tiin thlak zel rawh
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  // I CSS/JS file hming dah tel rawh
];

// 1. Install Event - Assets ho Cache-ah dahna
self.addEventListener('install', event => {
  self.skipWaiting(); // Service Worker thar hi nghak lovin hmang nghal rawh a ti
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate Event - Cache hlui thianfai na
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache); // Version hlui kha a delete dawn
          }
        })
      );
    })
  );
  return self.clients.claim(); // Tab zawng zawngah a thar hi hman nghal tir rawh
});

// 3. Fetch Event - Network First Strategy (Update hriat zung zung nan)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});