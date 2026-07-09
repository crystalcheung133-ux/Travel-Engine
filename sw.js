const CACHE_NAME = 'ccmv-travel-engine-stage3c-full-day-migration';
const ASSETS = ["./", "./index.html", "./styles.css", "./script.js", "./data.js", "./manifest.json", "./place.html", "./day.html", "./offline.html", "./icon-192.png", "./icon-512.png", "./logo-watermark-monogram.png", "./logo-monogram-transparent.png", "./splash-logo.png", "./ccmv-logo-calibrated.png", "./day1.html", "./day2.html", "./day3.html", "./day4.html", "./day5.html", "./guide.html", "./itinerary.html", "./memory.html", "./moments.html", "./expenses.html", "./trip.html"];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached ||
      fetch(e.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, copy));
        return response;
      }).catch(() => caches.match('./offline.html'))
    )
  );
});
