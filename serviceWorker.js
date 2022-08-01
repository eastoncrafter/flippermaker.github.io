self.addEventListener("install", function(event) {
    event.waitUntil(preLoad());
  });
  
  var preLoad = function(){
    console.log("Installing web app");
    return caches.open("offline").then(function(cache) {
      console.log("caching index and important routes");
      return cache.addAll(["/index.html"]);
    });
  };
  
  self.addEventListener("fetch", function(event) {
    event.respondWith(checkResponse(event.request).catch(function() {
      return returnFromCache(event.request);
    }));
    event.waitUntil(addToCache(event.request));
  });