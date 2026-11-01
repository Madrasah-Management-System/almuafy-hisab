const BASE = new URL('.', self.location.href).pathname;
const CACHE = 'almuafy-hisab-shell-v2';
const SHELL = BASE;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll([
    SHELL,
    BASE + 'manifest.webmanifest',
    BASE + 'icon.svg',
  ])));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key !== CACHE).map(key => caches.delete(key)),
  )));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(SHELL, copy));
      return response;
    }).catch(() => caches.match(SHELL)));
    return;
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok && ['script', 'style', 'image', 'font'].includes(request.destination)) {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(request, copy));
    }
    return response;
  })));
});
