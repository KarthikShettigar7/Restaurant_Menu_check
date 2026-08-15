/* Minimal service worker: saves this test page on first visit, then serves
 * the saved copy on every visit after - including with no network at all. */

const CACHE = 'pwa-test-v1';
const FILES = ['pwa-test.html', 'pwa-sw.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request)),
  );
});
