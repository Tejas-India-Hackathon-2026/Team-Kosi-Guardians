// Service Worker for KosiManthan Offline Disaster Resilience
const CACHE_NAME = 'kosimanthan-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './src/index.css',
  './src/app.js',
  './src/data/mockData.js',
  './src/data/translations.js',
  './src/services/storageService.js',
  './src/services/damageAiService.js',
  './src/services/soilAiService.js',
  './src/services/logisticsService.js',
  './src/services/authService.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[KosiManthan SW] Pre-caching offline disaster management assets');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[KosiManthan SW] Partial cache failure (safe to ignore for remote CDNs):', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[KosiManthan SW] Removing obsolete cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network first with offline fallback for APIs, Cache first for assets
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(
          JSON.stringify({ offline: true, message: 'Serving local offline synced emergency data.' }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).catch(() => {
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
      })
    );
  }
});
