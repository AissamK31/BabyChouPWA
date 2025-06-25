// Gestion spécifique du questionnaire

// Questions fictives (seront remplacées par les vraies questions RH)
window.questionsRH = [
  {
    id: 1,
    question: "Avez-vous déjà travaillé avec des enfants ?",
    type: "radio",
    options: [
      "Oui, j'ai une expérience professionnelle",
      "Oui, j'ai une expérience personnelle (famille, baby-sitting)",
      "Non, mais je suis très motivé(e)",
      "Non, aucune expérience",
    ],
  },
  {
    id: 2,
    question: "Quelles sont vos disponibilités ?",
    type: "radio",
    options: [
      "Temps plein (35h/semaine)",
      "Temps partiel (20-30h/semaine)",
      "Quelques heures par semaine",
      "Disponibilité flexible selon les besoins",
    ],
  },
  {
    id: 3,
    question: "Possédez-vous le permis de conduire ?",
    type: "radio",
    options: [
      "Oui, avec véhicule personnel",
      "Oui, sans véhicule personnel",
      "Non, mais j'ai d'autres moyens de transport",
      "Non",
    ],
  },
  {
    id: 4,
    question: "Quelle tranche d'âge d'enfants vous intéresse le plus ?",
    type: "radio",
    options: [
      "Bébés (0-2 ans)",
      "Enfants en bas âge (2-5 ans)",
      "Enfants d'âge scolaire (6-12 ans)",
      "Toutes les tranches d'âge",
    ],
  },
  {
    id: 5,
    question:
      "Parlez-nous de votre motivation pour rejoindre Babychou Services :",
    type: "textarea",
    placeholder:
      "Expliquez en quelques lignes pourquoi vous souhaitez travailler avec nous...",
  },
];

// Variables globales pour le questionnaire
window.questionActuelle = 0;
window.reponses = {};

// Alias locaux pour compatibilité
let questionActuelle = window.questionActuelle;
let reponses = window.reponses;

// Fonctions du questionnaire
window.afficherQuestionnaire = function () {
  console.log("📋 Affichage du questionnaire");

  // Cacher la section d'accueil
  document.getElementById("page-accueil").classList.add("hidden");

  // Afficher la section questionnaire
  document.getElementById("page-questionnaire").classList.remove("hidden");

  // MAINTENANT initialiser les boutons (ils sont visibles)
  window.initialiserBoutonsQuestionnaire();

  // Afficher la première question
  window.afficherQuestion(0);
};

window.afficherQuestion = function (index) {
  console.log(`📝 Affichage question ${index + 1}`);

  const question = window.questionsRH[index];
  const titre = document.getElementById("question-titre");
  const content = document.getElementById("question-content");
  const progressFill = document.getElementById("progress-fill");
  const btnPrecedent = document.getElementById("btn-precedent");
  const btnSuivant = document.getElementById("btn-suivant");

  // Mettre à jour le titre et la progress bar
  titre.textContent = `Question ${index + 1} sur ${window.questionsRH.length}`;
  progressFill.style.width = `${
    ((index + 1) / window.questionsRH.length) * 100
  }%`;

  // Générer le contenu de la question
  let html = `<h3>${question.question}</h3>`;

  if (question.type === "radio") {
    question.options.forEach((option, i) => {
      const checked = reponses[question.id] === option ? "checked" : "";
      html += `
        <label>
          <input type="radio" name="question_${question.id}" value="${option}" ${checked}>
          ${option}
        </label>
      `;
    });
  } else if (question.type === "textarea") {
    const value = reponses[question.id] || "";
    html += `
      <textarea name="question_${question.id}" placeholder="${question.placeholder}">${value}</textarea>
    `;
  }

  content.innerHTML = html;

  // Gérer l'affichage des boutons
  btnPrecedent.style.display = index > 0 ? "block" : "none";
  btnSuivant.textContent =
    index === window.questionsRH.length - 1 ? "Terminer" : "Suivant";
};

function sauvegarderReponse() {
  const question = window.questionsRH[window.questionActuelle];

  if (question.type === "radio") {
    const selected = document.querySelector(
      `input[name="question_${question.id}"]:checked`
    );
    if (selected) {
      window.reponses[question.id] = selected.value;
    }
  } else if (question.type === "textarea") {
    const textarea = document.querySelector(
      `textarea[name="question_${question.id}"]`
    );
    if (textarea) {
      window.reponses[question.id] = textarea.value.trim();
    }
  }

  console.log("💾 Réponse sauvegardée:", window.reponses[question.id]);
}

window.questionSuivante = function () {
  console.log("🔄 Fonction questionSuivante appelée");
  console.log("📊 Question actuelle:", window.questionActuelle);

  sauvegarderReponse();

  if (window.questionActuelle < window.questionsRH.length - 1) {
    window.questionActuelle++;
    console.log("➡️ Passage à la question", window.questionActuelle + 1);
    window.afficherQuestion(window.questionActuelle);
  } else {
    // Questionnaire terminé
    console.log("✅ Questionnaire terminé, affichage récapitulatif");
    window.afficherRecapitulatif();
  }
};

window.questionPrecedente = function () {
  console.log("🔄 Fonction questionPrecedente appelée");
  console.log("📊 Question actuelle:", window.questionActuelle);

  sauvegarderReponse();

  if (window.questionActuelle > 0) {
    window.questionActuelle--;
    console.log("⬅️ Retour à la question", window.questionActuelle + 1);
    window.afficherQuestion(window.questionActuelle);
  }
};

window.afficherRecapitulatif = function () {
  console.log("📋 Affichage récapitulatif");

  // Cacher le questionnaire
  document.getElementById("page-questionnaire").classList.add("hidden");

  // Afficher le récapitulatif
  document.getElementById("page-recapitulatif").classList.remove("hidden");

  // Générer le contenu du récapitulatif
  const recapContent = document.getElementById("recap-content");
  let html = "";

  // Informations candidat
  html += `
    <div class="recap-item">
      <h4>Informations personnelles</h4>
      <p><strong>Nom et prénom :</strong> ${window.donneesCandidat.nom}</p>
      <p><strong>Email :</strong> ${window.donneesCandidat.email}</p>
      <p><strong>Téléphone :</strong> ${
        window.donneesCandidat.telephone || "Non renseigné"
      }</p>
    </div>
  `;

  // Réponses aux questions
  window.questionsRH.forEach((question) => {
    const reponse = window.reponses[question.id] || "Non renseigné";
    html += `
      <div class="recap-item">
        <h4>${question.question}</h4>
        <p>${reponse}</p>
      </div>
    `;
  });

  recapContent.innerHTML = html;
};

// Fonction appelée au chargement de la page (setup général)
function initialiserQuestionnaire() {
  console.log("🔧 Setup initial du questionnaire...");
  // Cette fonction peut rester vide ou faire du setup général
}

// Fonction appelée quand on affiche le questionnaire (boutons actifs)
window.initialiserBoutonsQuestionnaire = function () {
  console.log("🔧 Initialisation des boutons du questionnaire...");

  // Boutons navigation questionnaire
  const btnSuivant = document.getElementById("btn-suivant");
  const btnPrecedent = document.getElementById("btn-precedent");
  const btnModifier = document.getElementById("btn-modifier");
  const btnEnvoyer = document.getElementById("btn-envoyer");

  console.log("🔍 Boutons trouvés:", {
    btnSuivant: !!btnSuivant,
    btnPrecedent: !!btnPrecedent,
    btnModifier: !!btnModifier,
    btnEnvoyer: !!btnEnvoyer,
  });

  if (btnSuivant) {
    // Nettoyer complètement en clonant l'élément
    const nouveauBtn = btnSuivant.cloneNode(true);
    btnSuivant.parentNode.replaceChild(nouveauBtn, btnSuivant);

    // Récupérer la nouvelle référence
    const btnSuivantNouveau = document.getElementById("btn-suivant");

    // Ajouter l'event listener
    btnSuivantNouveau.addEventListener("click", window.questionSuivante);
    console.log("✅ Event listener ajouté au bouton Suivant");
  } else {
    console.error("❌ Bouton Suivant introuvable !");
  }

  if (btnPrecedent) {
    // Même traitement pour le bouton précédent
    const nouveauBtnPrec = btnPrecedent.cloneNode(true);
    btnPrecedent.parentNode.replaceChild(nouveauBtnPrec, btnPrecedent);

    const btnPrecedentNouveau = document.getElementById("btn-precedent");
    btnPrecedentNouveau.addEventListener("click", window.questionPrecedente);
  }

  if (btnModifier) {
    btnModifier.addEventListener("click", () => {
      // Retour au questionnaire
      document.getElementById("page-recapitulatif").classList.add("hidden");
      document.getElementById("page-questionnaire").classList.remove("hidden");
      window.afficherQuestion(window.questionActuelle);
    });
  }

  if (btnEnvoyer) {
    btnEnvoyer.addEventListener("click", () => {
      // Sauvegarder toutes les données
      const donneesCompletes = {
        candidat: window.donneesCandidat,
        reponses: window.reponses,
        dateEnvoi: new Date(),
      };

      localStorage.setItem(
        "questionnaire-babychou",
        JSON.stringify(donneesCompletes)
      );

      console.log("📤 Questionnaire complet:", donneesCompletes);

      afficherMessage(
        "✅ Questionnaire envoyé avec succès ! Merci pour votre candidature.",
        "success"
      );

      // Retour à l'accueil après 3 secondes
      setTimeout(() => {
        location.reload();
      }, 3000);
    });
  }
};
