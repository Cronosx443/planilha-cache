const CACHE_NAME = 'planilha-cache-v1';
const urlsToCache = [
  '/planilha-cache/',
  '/planilha-cache/index.html',
  '/planilha-cache/manifest.json',
  '/planilha-cache/icon-192.png',
  '/planilha-cache/icon-512.png'
];

// Instala o service worker e guarda os arquivos em cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve os arquivos do cache quando offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Remove caches antigos quando atualizar
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
