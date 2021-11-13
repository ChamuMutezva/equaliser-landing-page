// Choose a cache name
const cacheName = 'cache-v1';
//List the files to precache
const precacheResources = [
    './',
    './index.html',
    './styles.css',
    './assets/bg-main-desktop.png',
    './assets/bg-main-mobile.png',
    './assets/bg-main-tablet.png',
    './assets/bg-pattern-1.svg',
    './assets/bg-pattern-2.svg',
    './assets/favicon-32x32.png',
    './assets/icon-android.svg',
    './assets/icon-apple.svg',
    './assets/icon-facebook.svg',
    './assets/icon-instagram.svg',
    './assets/icon-twitter.svg',
    './assets/illustration-app.png',
    './assets/logo.svg'
];


// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
    console.log('Service worker install event!');
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        }),
    );
});
