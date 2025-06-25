// Service Worker pour Babychou PWA

const CACHE_NAME = "babychou-questionnaire-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles/main.css",
  "/styles/questionnaire.css",
  "/scripts/app.js",
  "/scripts/questionnaire.js",
  "/scripts/pwa.js",
  "/manifest.json",
];

console.log("🔧 Service Worker démarré");

// Installation du Service Worker
self.addEventListener("install", (event) => {
  console.log("📦 Installation du Service Worker");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("✅ Cache ouvert");
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log("✅ Ressources mises en cache");
        return self.skipWaiting();
      })
  );
});

// Activation du Service Worker
self.addEventListener("activate", (event) => {
  console.log("🚀 Activation du Service Worker");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("🗑️ Suppression ancien cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("✅ Service Worker activé");
        return self.clients.claim();
      })
  );
});

// Interception des requêtes (stratégie Cache First)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retourner la réponse du cache si disponible
      if (response) {
        console.log("📦 Ressource servie depuis le cache:", event.request.url);
        return response;
      }

      // Sinon, faire la requête réseau
      console.log("🌐 Requête réseau:", event.request.url);
      return fetch(event.request)
        .then((response) => {
          // Vérifier si la réponse est valide
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Cloner la réponse pour la mettre en cache
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // En cas d'échec réseau, retourner une page offline basique
          if (event.request.destination === "document") {
            return caches.match("/index.html");
          }
        });
    })
  );
});

// Gestion des messages depuis l'application
self.addEventListener("message", (event) => {
  console.log("📨 Message reçu:", event.data);

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Notification de mise à jour disponible
self.addEventListener("updatefound", () => {
  console.log("🔄 Mise à jour du Service Worker détectée");
});
