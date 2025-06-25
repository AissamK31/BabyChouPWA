// Gestion PWA - Installation et Service Worker

console.log("🔧 PWA Module chargé");

// Enregistrement du Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("✅ Service Worker enregistré:", registration.scope);
      })
      .catch((error) => {
        console.log("❌ Échec enregistrement Service Worker:", error);
      });
  });
}

// Gestion de l'installation PWA
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("📱 Événement beforeinstallprompt déclenché");

  // Empêcher l'affichage automatique
  e.preventDefault();

  // Stocker l'événement pour l'utiliser plus tard
  deferredPrompt = e;

  // Afficher un bouton d'installation personnalisé
  afficherBoutonInstallation();
});

function afficherBoutonInstallation() {
  // Créer un bouton d'installation discret
  const btnInstall = document.createElement("button");
  btnInstall.textContent = "📱 Installer l'app";
  btnInstall.className = "btn-install";
  btnInstall.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #2E86AB, #F24236);
    color: white;
    border: none;
    padding: 12px 16px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(46, 134, 171, 0.3);
    z-index: 1000;
    font-size: 14px;
  `;

  btnInstall.addEventListener("click", installerPWA);
  document.body.appendChild(btnInstall);

  console.log("📱 Bouton installation ajouté");
}

async function installerPWA() {
  if (!deferredPrompt) {
    console.log("❌ Pas d'événement d'installation disponible");
    return;
  }

  // Afficher la boîte de dialogue d'installation
  deferredPrompt.prompt();

  // Attendre la réponse de l'utilisateur
  const { outcome } = await deferredPrompt.userChoice;

  if (outcome === "accepted") {
    console.log("✅ PWA installée");
  } else {
    console.log("❌ Installation PWA refusée");
  }

  // Réinitialiser la variable
  deferredPrompt = null;

  // Supprimer le bouton d'installation
  const btnInstall = document.querySelector(".btn-install");
  if (btnInstall) {
    btnInstall.remove();
  }
}

// Détecter si l'app est déjà installée
window.addEventListener("appinstalled", (evt) => {
  console.log("✅ PWA installée avec succès");

  // Supprimer le bouton d'installation
  const btnInstall = document.querySelector(".btn-install");
  if (btnInstall) {
    btnInstall.remove();
  }
});

// Gestion du mode standalone (app installée)
function estModeStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone ||
    document.referrer.includes("android-app://")
  );
}

if (estModeStandalone()) {
  console.log("📱 Application en mode standalone");
  document.body.classList.add("standalone-mode");
}

// Gestion de la connectivité
window.addEventListener("online", () => {
  console.log("🌐 Connexion rétablie");
  document.body.classList.remove("offline-mode");
});

window.addEventListener("offline", () => {
  console.log("📵 Mode hors ligne");
  document.body.classList.add("offline-mode");
});
