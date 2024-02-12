//service worker to setup PWA
const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

//installing serviceworker
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

//listen for requests

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return fetch(e.request).catch(() => {
        return caches.match("offline.html");
      });
    })
  );
});
//activate  the serviceworker
self.addEventListener("activate", (e) => {
  const cacheKeepList = [];
  cacheKeepList.push(CACHE_NAME);
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheKeepList.includes(cacheName)) {
            console.log("cache name", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
