# 📋 Questionnaire PWA - Babychou Services

## 🎯 Objectif du Projet
Créer une **Progressive Web App (PWA)** pour Babychou Services permettant aux candidats de répondre à un questionnaire de recrutement sur tablette, avec envoi automatique des résultats par email au RH.

---

## 🏗️ Architecture Technique Choisie

### **Option B : PWA + Netlify Functions (Serverless)**
- **Frontend :** HTML/CSS/JavaScript pur (PWA)
- **Backend :** Netlify Functions (serverless gratuit)
- **Email :** Service d'emailing sécurisé via backend
- **PDF :** Génération côté serveur
- **Hébergement :** Netlify (gratuit)
- **Base de données :** Pas nécessaire pour v1

### Pourquoi cette architecture ?
- ✅ **Gratuite** (Netlify offre 125k appels/mois)
- ✅ **Sécurisée** (credentials email cachés)
- ✅ **Évolutive** (facile d'ajouter des fonctionnalités)
- ✅ **Moderne** (approche serverless)

---

## 📚 Ce Que Tu Vas Apprendre

### **Phase 1 : Fondamentaux Web**
- [ ] Structure HTML sémantique
- [ ] CSS moderne (Flexbox/Grid)
- [ ] JavaScript ES6+ (promises, async/await)
- [ ] Concepts PWA de base

### **Phase 2 : PWA Avancée**
- [ ] Service Workers
- [ ] Manifest.json
- [ ] Cache API
- [ ] Installation sur écran d'accueil

### **Phase 3 : Backend Serverless**
- [ ] Netlify Functions
- [ ] Variables d'environnement
- [ ] Appels API (fetch)
- [ ] Gestion des erreurs

### **Phase 4 : Intégration**
- [ ] EmailJS ou Nodemailer
- [ ] Génération PDF (jsPDF ou Puppeteer)
- [ ] Déploiement automatique

---

## 🔧 Technologies Utilisées

| Technologie | Usage | Niveau |
|-------------|-------|---------|
| **HTML5** | Structure des pages | Débutant |
| **CSS3** | Styles et responsive | Débutant |
| **JavaScript** | Logique applicative | Débutant+ |
| **PWA APIs** | Fonctionnalités natives | Intermédiaire |
| **Netlify Functions** | Backend serverless | Intermédiaire |
| **Git/GitHub** | Versioning et déploiement | Débutant |

---

## 📋 Plan de Développement

### **Étape 1 : Setup Projet (Jour 1)**
- [ ] Créer repository GitHub
- [ ] Structure de dossiers
- [ ] HTML de base avec charte Babychou
- [ ] CSS responsive
- [ ] Premier déploiement Netlify

### **Étape 2 : Interface Questionnaire (Jour 2-3)**
- [ ] Formulaire dynamique
- [ ] Navigation entre questions
- [ ] Validation des réponses
- [ ] Stockage local temporaire

### **Étape 3 : PWA Features (Jour 4)**
- [ ] Manifest.json
- [ ] Service Worker basique
- [ ] Installation sur tablette
- [ ] Mode offline (optionnel)

### **Étape 4 : Backend Functions (Jour 5-6)**
- [ ] Première Netlify Function
- [ ] Configuration environnement
- [ ] API d'envoi email
- [ ] Génération PDF

### **Étape 5 : Intégration Finale (Jour 7)**
- [ ] Connexion front-end/backend
- [ ] Tests sur tablette
- [ ] Optimisations performances
- [ ] Documentation utilisateur

---

## 🎨 Design - Charte Graphique Babychou

### **Couleurs Principales**
- **Bleu principal :** `#2E86AB`
- **Orange accent :** `#F24236`
- **Gris texte :** `#333333`
- **Blanc :** `#FFFFFF`

### **Typographie**
- **Titres :** Arial/Helvetica, bold
- **Texte :** Arial/Helvetica, regular
- **Taille base :** 16px

---

## 📂 Structure de Dossiers

```
questionnaire-pwa/
├── public/
│   ├── index.html              # Page principale
│   ├── styles/
│   │   ├── main.css           # Styles principaux
│   │   └── questionnaire.css  # Styles spécifiques
│   ├── scripts/
│   │   ├── app.js             # Logique principale
│   │   ├── questionnaire.js   # Gestion questionnaire
│   │   └── pwa.js             # Service Worker
│   ├── images/
│   │   └── logo-babychou.png  # Logo
│   ├── manifest.json          # Manifest PWA
│   └── sw.js                  # Service Worker
├── netlify/
│   └── functions/
│       ├── envoyer-resultats.js  # Function email
│       └── generer-pdf.js         # Function PDF
├── .gitignore
├── netlify.toml               # Configuration Netlify
└── README.md                  # Ce fichier
```

---

## 🚀 Commandes Importantes

### **Git (avec tes alias)**
```bash
# Initialiser le projet
git init
git add .
gcam "feat(init): initial project setup"

# Workflow quotidien
gst                    # Voir le statut
gcam "type(scope): description"  # Commit
gp                     # Push
```

### **Développement Local**
```bash
# Serveur local simple
python -m http.server 8000
# ou
npx http-server

# Avec Netlify CLI (pour tester les functions)
npm install -g netlify-cli
netlify dev
```

---

## 📝 Fonctionnalités Attendues

### **v1.0 - MVP (Minimum Viable Product)**
- [ ] Questionnaire une question par page
- [ ] Saisie nom/email candidat
- [ ] Génération PDF des réponses
- [ ] Envoi email au RH
- [ ] Compatible tablette
- [ ] Installation PWA

### **v1.1 - Améliorations**
- [ ] Mode offline
- [ ] Animations de transition
- [ ] Calcul score automatique
- [ ] Templates email personnalisés

---

## 🎓 Ressources d'Apprentissage

### **PWA**
- [MDN - Progressive Web Apps](https://developer.mozilla.org/fr/docs/Web/Progressive_web_apps)
- [web.dev - PWA](https://web.dev/progressive-web-apps/)

### **Netlify Functions**
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Netlify Functions Examples](https://functions.netlify.com/examples/)

### **JavaScript Moderne**
- [javascript.info](https://javascript.info/)
- [MDN JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)

---

## 📞 Support & Questions

**Mentor :** Claude (Assistant IA)
**Approche :** Apprentissage par la pratique
**Règle :** Tu codes, je guide étape par étape

---

## 📊 Progression

- [ ] **Phase 1 :** Setup et structure de base
- [ ] **Phase 2 :** Interface questionnaire
- [ ] **Phase 3 :** Fonctionnalités PWA
- [ ] **Phase 4 :** Backend serverless
- [ ] **Phase 5 :** Déploiement et tests

**Début du projet :** [Date]
**Objectif livraison :** [Date + 7 jours]

---

*Last updated: [Date]*
*Version: 1.0* 