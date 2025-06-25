console.log("🔥 JavaScript loaded!");
console.log("🔍 Testing DOM:", document.readyState);

// 🚀 Babychou PWA - Gestion du formulaire candidat
console.log("🎯 Application Babychou démarrée !");

// Variable globale pour les données candidat
window.donneesCandidat = {
  nom: "",
  email: "",
  telephone: "",
  dateDebut: null,
};

// Fonctions utilitaires pour les messages
function afficherMessage(texte, type = "error") {
  console.log(`📢 Tentative d'affichage message: ${texte} (type: ${type})`);

  const container = document.getElementById("message-container");
  if (!container) {
    console.error("❌ Container de messages introuvable !");
    return;
  }

  console.log("✅ Container trouvé, création du message...");

  const message = document.createElement("div");
  message.className = `message message-${type}`;
  message.textContent = texte;

  // Supprimer les anciens messages
  container.innerHTML = "";
  container.appendChild(message);

  console.log("📝 Message ajouté au DOM, classes:", message.className);

  // Afficher avec animation
  setTimeout(() => {
    message.classList.add("show");
    console.log("✨ Animation show ajoutée");
  }, 10);

  // Masquer après 5 secondes
  setTimeout(() => {
    message.classList.remove("show");
    setTimeout(() => {
      if (container.contains(message)) {
        container.removeChild(message);
      }
    }, 300);
  }, 5000);
}

function afficherErreurChamp(champId, messageTexte) {
  console.log(`🔍 Affichage erreur champ: ${champId} - ${messageTexte}`);

  const champ = document.getElementById(champId);
  const erreurDiv = document.getElementById(`error-${champId}`);

  if (erreurDiv && champ) {
    erreurDiv.textContent = messageTexte;
    champ.classList.add("error");
    console.log(`✅ Erreur affichée pour ${champId}`);
  } else {
    console.error(`❌ Éléments introuvables pour le champ: ${champId}`);
    console.error("Champ:", champ);
    console.error("ErreurDiv:", erreurDiv);
  }
}

function effacerErreurs() {
  console.log("🧹 Effacement des erreurs...");

  const erreursDiv = document.querySelectorAll(".error-message");
  const champsErreur = document.querySelectorAll("input.error");

  console.log(
    `Trouvé ${erreursDiv.length} divs d'erreur et ${champsErreur.length} champs en erreur`
  );

  erreursDiv.forEach((div) => (div.textContent = ""));
  champsErreur.forEach((champ) => champ.classList.remove("error"));
}

// Attendre que la page soit chargée
document.addEventListener("DOMContentLoaded", function () {
  console.log("📱 Page chargée - Initialisation...");

  const formulaire = document.querySelector("#form-candidat");

  if (formulaire) {
    console.log("✅ Formulaire trouvé !");

    formulaire.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("📝 Formulaire soumis !");

      // Effacer les erreurs précédentes
      effacerErreurs();

      const nom = document.getElementById("nom").value.trim();
      const email = document.getElementById("email").value.trim();
      const telephone = document.getElementById("telephone").value.trim();

      console.log("📋 Données récupérées:", { nom, email, telephone });

      let erreurs = false;

      // Validation du nom
      if (!nom) {
        console.log("❌ Erreur nom détectée");
        afficherErreurChamp("nom", "Le nom et prénom sont obligatoires");
        erreurs = true;
      }

      // Validation de l'email
      if (!email) {
        console.log("❌ Email vide détecté");
        afficherErreurChamp("email", "L'email est obligatoire");
        erreurs = true;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        console.log("❌ Email invalide détecté");
        afficherErreurChamp("email", "Veuillez saisir un email valide");
        erreurs = true;
      }

      // Si erreurs, afficher message global et arrêter
      if (erreurs) {
        console.log("⚠️ Erreurs détectées, affichage du message global");
        afficherMessage("Veuillez corriger les erreurs ci-dessous", "error");
        return;
      }

      // Succès - sauvegarder les données
      window.donneesCandidat = {
        nom: nom,
        email: email,
        telephone: telephone,
        dateDebut: new Date(),
      };

      console.log("✅ Données sauvegardées:", window.donneesCandidat);

      // Sauvegarder en localStorage
      localStorage.setItem(
        "candidat-babychou",
        JSON.stringify(window.donneesCandidat)
      );

      // Passer au questionnaire
      afficherMessage("✅ Informations enregistrées avec succès !", "success");

      setTimeout(() => {
        afficherQuestionnaire();
      }, 1500);
    });

    console.log("✅ Event listener ajouté au formulaire !");
  } else {
    console.error("❌ Formulaire introuvable !");
  }

  // Initialiser le questionnaire
  if (typeof initialiserQuestionnaire === "function") {
    initialiserQuestionnaire();
    console.log("✅ Questionnaire initialisé !");
  } else {
    console.error("❌ Fonction initialiserQuestionnaire non trouvée !");
  }
});
