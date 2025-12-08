# Page d'accueil de cours-reseaux.fr  
**Démonstration interactive, sécurisée et pédagogique**

Cette page d'accueil constitue une interface avancée et hautement dynamique destinée au site pédagogique **cours-reseaux.fr**.  
Elle combine effets visuels, animations inspirées de la demoscene, proxy applicatif, sécurité renforcée et modules interactifs pour illustrer un environnement d'apprentissage moderne en BTS SIO, Bac+3 CPI et Bac+5 Expert Cyber.

L’objectif : proposer une expérience hybride entre page professionnelle et démonstration technique immersive.

---

## Caractéristiques principales

### Animations et effets avancés
- Arrière‑plans animés (formes SVG flottantes, parallaxe, transitions fluides)
- Console interactive simulée (mini‑IDE, animations de texte, faux terminal)
- Scène « hacker demo » intégrée :  
  skull ASCII animé, texte défilant, musique synchronisable, effets pseudo‑CRT, interactions cachées
- Animation fireworks au clic en pied de page
- Word cloud dynamique et animations discrètes au survol

### Structure pédagogique
- Accès direct au DokuWiki sécurisé (BTS SIO, CPI, Expert Cyber)
- Présentation des thématiques : réseaux, cybersécurité, scripting, DevOps, ITIL, gestion de projet
- Mise en avant des parcours de formation : du BTS au Bac+5
- Introduction interactive aux pratiques professionnelles et aux scénarios réalistes

---

## Sécurité et architecture

La page utilise plusieurs mesures pour garantir une diffusion sûre des contenus pédagogiques :

- En‑têtes HTTP de sécurité :
  - X‑Frame‑Options
  - X‑Content-Type-Options
  - X‑XSS-Protection
- Content‑Security‑Policy limitative avec CDN autorisés
- Proxy PHP isolant les environnements de TP
- Infrastructure protégée par CloudFlare

Une logique simple détecte l’environnement (dev/prod) via variables d’environnement pour adapter certains comportements.

---

## Technologies utilisées

- **HTML5 / CSS3 / JavaScript**  
- **PHP 8+** (serveur, sécurité, routage)  
- **Bootstrap 5.3** + thème Bootswatch Spacelab  
- **Google Fonts et assets SVG**  
- **Animations personnalisées en JavaScript**  
- **Audio, canvas et effets visuels avancés**

---

## Fonctionnalités interactives notables

- Zones cachées déclenchant des comportements alternatifs  
- Badges interactifs, réactions au survol et au clic  
- Aide interactive via modal dynamique  
- Fenêtre Mitnick (contenus narratifs)  
- Progrès animé dans le widget « Statut »  
- Activation de la scène « hacker » via bouton dédié (console, musique, ASCII art, défilements, effets rapides)

---

## Structure générale

Le fichier comporte :

- Gestion des en‑têtes de sécurité (PHP)
- Chargement des frameworks CSS
- Header animé avec présentation du site
- Section pédagogique et parcours de formation
- Word cloud animé
- Module de statut avec progression dynamique
- Modales (Aide, Mitnick, Hacker Demo)
- Footer avec effets Canvas (fireworks)
- Script principal `index.js`

---

## Intentions pédagogiques

Cette page d'accueil sert également de support de cours :

- Montrer des techniques web modernes
- Illustrer des principes de cybersécurité
- Proposer des interactions riches pour capter l’attention
- Démontrer les capacités d’un front-end dynamique avec un back-end sécurisé
- Donner un aperçu des ateliers réseau, scripting et cybersécurité proposés sur le site

---

## Navigation

- Accès principal : `/bts_sio/doku.php/start`
- Plan du site : `/index/php/sitemap.php`
- Contact : `/index/php/contact.php`
- Mode démonstration avancée : bouton `0xH4X0`

---

## Installation

Déposer le fichier à la racine du site ou dans un répertoire public.  
Assurez-vous que :

1. Les dépendances CDN sont accessibles.  
2. Le fichier `index/css/index.css` et `index/js/index.js` existent et sont chargés correctement.  
3. Le serveur envoie bien les en‑têtes définis (sinon ajuster selon votre configuration).  
4. CloudFlare ou un autre frontal HTTPS est configuré pour servir les assets.

---

## Crédits

Développé pour **cours-reseaux.fr**, plateforme pédagogique dédiée aux filières informatiques professionnelles.  
Conçu pour offrir une expérience immersive rappelant les démonstrations techniques des scènes hacking et demoscene, tout en assurant rigueur et sécurité.
