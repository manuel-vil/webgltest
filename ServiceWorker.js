const cacheName = "VIL-AI-ollama-0.1.0";
const contentToCache = [
    "Build/ea8361a5109b5aca8ec5de2a8f32488b.loader.js",
    "Build/7ff44499aaca1c18fd734a9a838de46d.framework.js",
    "Build/ed9d5030d10b61c4829f7dcc6ab8192c.data",
    "Build/665a40633b2475b13da706db1817fb5e.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
