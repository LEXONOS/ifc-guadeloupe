# IFC — Ice Fruits Chocolate · Site vitrine

Site web statique (HTML / CSS / JavaScript, sans étape de build) pour **IFC – Ice Fruits Chocolate**, la roulotte gourmande de Sainte-Anne en Guadeloupe : sorbet coco maison, bananes chocolat, jus locaux et eau de coco.

Le site est pensé pour être **rapide, responsive, accessible et optimisé pour le référencement (SEO)**, et pour se déployer en quelques minutes sur **GitHub + Vercel**.

---

## 1. Aperçu du contenu

6 pages publiques + 1 page d'erreur :

| Page | Fichier | URL en ligne |
|------|---------|--------------|
| Accueil | `index.html` | `/` |
| Nos produits | `nos-produits.html` | `/nos-produits` |
| Notre carte | `notre-carte.html` | `/notre-carte` |
| Événements privés | `evenements-prives.html` | `/evenements-prives` |
| Notre histoire | `notre-histoire.html` | `/notre-histoire` |
| Contact | `contact.html` | `/contact` |
| Page introuvable | `404.html` | affichée automatiquement |

> Les URL n'affichent pas le `.html` grâce au réglage `cleanUrls` de Vercel (voir `vercel.json`). En local, ouvrez directement les fichiers `.html`.

---

## 2. Structure du projet

```
ifc-guadeloupe/
├── index.html              ← Accueil
├── nos-produits.html
├── notre-carte.html
├── evenements-prives.html
├── notre-histoire.html
├── contact.html
├── 404.html                ← page d'erreur personnalisée
├── assets/
│   ├── css/styles.css      ← tout le design (couleurs, typo, mise en page)
│   ├── js/main.js          ← menu mobile, animations, galerie, formulaires
│   └── img/favicon.svg     ← icône du site
├── robots.txt              ← indexation moteurs de recherche
├── sitemap.xml             ← plan du site pour Google
├── site.webmanifest        ← nom / couleurs (ajout à l'écran d'accueil)
├── vercel.json             ← config Vercel (URLs propres)
└── README.md               ← ce fichier
```

---

## 3. Mettre le site en ligne (GitHub + Vercel)

### Étape 1 — Créer le dépôt GitHub
1. Créez un compte sur [github.com](https://github.com) si besoin.
2. Cliquez sur **New repository**, nommez-le par exemple `ifc-guadeloupe`, laissez-le **public** ou **privé**, puis **Create repository**.
3. Téléversez **tout le contenu de ce dossier** (glissez-déposez les fichiers dans GitHub, ou utilisez Git). Important : déposez bien les fichiers **à la racine** du dépôt, pas dans un sous-dossier.

### Étape 2 — Déployer avec Vercel
1. Créez un compte sur [vercel.com](https://vercel.com) et connectez-le à GitHub.
2. **Add New… → Project**, puis importez le dépôt `ifc-guadeloupe`.
3. Vercel détecte un site statique : laissez les réglages par défaut (aucun « build command » nécessaire) et cliquez **Deploy**.
4. En une minute, votre site est en ligne sur une adresse du type `https://ifc-guadeloupe.vercel.app`.

### Étape 3 — Brancher le nom de domaine `ifc-guadeloupe.fr`
1. Dans le projet Vercel : **Settings → Domains → Add**, saisissez `ifc-guadeloupe.fr`.
2. Vercel vous indique les enregistrements DNS à créer chez votre hébergeur de domaine (un enregistrement A et/ou CNAME). Reportez-les, patientez quelques minutes, et le domaine devient actif (HTTPS automatique).

> À chaque modification poussée sur GitHub, Vercel redéploie automatiquement le site.

---

## 4. Activer les formulaires (devis & contact) — important

Les formulaires (page **Contact** et page **Événements privés**) utilisent le service gratuit **[Web3Forms](https://web3forms.com)**, qui envoie les messages directement par e-mail **sans serveur à gérer**.

**Tant que la clé n'est pas configurée**, les formulaires basculent automatiquement sur l'**ouverture du logiciel de messagerie** du visiteur (e-mail pré-rempli vers `contact@ifc-guadeloupe.fr`) — le site reste donc fonctionnel.

Pour recevoir les messages directement dans votre boîte mail :

1. Allez sur [web3forms.com](https://web3forms.com), saisissez l'adresse `contact@ifc-guadeloupe.fr` et récupérez votre **Access Key** (gratuit).
2. Dans `contact.html` **et** `evenements-prives.html`, cherchez la ligne :
   ```html
   <input type="hidden" name="access_key" value="REMPLACEZ-PAR-VOTRE-CLE-WEB3FORMS" />
   ```
3. Remplacez `REMPLACEZ-PAR-VOTRE-CLE-WEB3FORMS` par votre clé (les deux pages).
4. Sauvegardez, poussez sur GitHub : Vercel redéploie, et les messages arrivent désormais par e-mail.

> Astuce : pour changer l'adresse de réception, il suffit de changer l'adresse associée à la clé sur Web3Forms.

---

## 5. À propos des images

Les photos sont **chargées depuis le CDN d'images existant** (`assets.zyrosite.com`) via leur URL directe. Avantage : aucune image lourde à héberger, et un redimensionnement automatique.

Si vous souhaitez **héberger les images vous-même** (pour être 100 % indépendant de l'ancien hébergeur) :
1. Téléchargez chaque image depuis son URL (visible dans le code, attribut `src`).
2. Placez-les dans `assets/img/`.
3. Remplacez dans le code les URLs `https://assets.zyrosite.com/.../fichier.jpg` par des chemins locaux `/assets/img/fichier.jpg`.

---

## 6. Modifier le contenu et les couleurs

- **Textes, horaires, téléphone, e-mail** : directement dans les fichiers `.html` (le contenu est en clair).
- **Couleurs et typographie** : en haut de `assets/css/styles.css`, dans la section des variables (`:root`). La palette est volontairement crème / blanc / marron clair / chocolat (DA de la roulotte) :
  - `--coco` : le crème du fond principal,
  - `--coco-card` : le blanc chaud des cartes,
  - `--mangue` : le caramel / marron clair des boutons et accents,
  - `--lagon` : le chocolat des sections sombres,
  - `--cacao` : l'espresso du texte,
  - `--soleil` : le miel sable des surlignages.

  > Les noms de variables (`--lagon`, `--mangue`…) sont des « étiquettes » techniques : seules les valeurs comptent. Changez une valeur hexadécimale et toute la charte se met à jour d'un coup.
- **Liens réseaux sociaux** : recherchez `instagram.com/ifc.guadeloupe` et `tiktok.com/@ifc.guadeloupe`.
- **Coordonnées GPS / carte** : dans `index.html`, section « Emplacement ».

> Pensez à mettre à jour `sitemap.xml`, les balises `canonical` et les `og:url` si vous changez de nom de domaine.

---

## 7. Détails techniques

- **Aucune dépendance, aucun framework** : du HTML/CSS/JS natif. Compatible avec n'importe quel hébergement statique (Vercel, Netlify, GitHub Pages, OVH…).
- **SEO** : titres et descriptions uniques par page ciblant les recherches locales (« sorbet coco Guadeloupe », « meilleur sorbet Guadeloupe »), balises Open Graph / Twitter, données structurées JSON-LD (`IceCreamShop` avec adresse, horaires et carte, `BreadcrumbList`, `FAQPage`, `Service`…), section FAQ visible, `sitemap.xml` et `robots.txt`. Le site est en français ; une version anglaise dédiée peut être ajoutée pour viser aussi les recherches en anglais.
- **Accessibilité** : structure sémantique, navigation au clavier, focus visibles, textes alternatifs, respect de `prefers-reduced-motion`.
- **Performance** : images en chargement différé (`lazy`), polices préconnectées, CSS et JS légers.

---

*Fait avec ❤ en Guadeloupe.*
