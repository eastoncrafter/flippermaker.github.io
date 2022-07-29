const staticDevflippermaker = "dev-flippermaker-site-v1"
const assets = [
  "/",
  "/index.html",
  "/flipperLogo.jpg",
  "/images/coffee2.jpg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevflippermaker).then(cache => {
      cache.addAll(assets)
    })
  )
})
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })