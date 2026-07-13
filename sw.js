const CACHE = 'mengxia-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open(CACHE).then(cache => cache.match(e.request).then(hit => {
      const net = fetch(e.request).then(res => {
        try { if (res && res.ok) cache.put(e.request, res.clone()); } catch (x) {}
        return res;
      }).catch(() => hit);
      return hit || net;
    }))
  );
});
