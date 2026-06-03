<template>
  <section class="technique-page">
    <div class="titleCard">
      <h2>Présentation et évaluation de savoir-faire technique</h2>
      <p class="introText">
        Cette partie présente les savoir-faire techniques travaillés pendant le
        stage.
      </p>
    </div>
    <nav class="internal-nav" aria-label="Navigation interne">
      <button
        v-for="section in sections"
        :key="section.id"
        type="button"
        class="internal-nav__tab"
        :class="{ 'internal-nav__tab--active': activeSection === section.id }"
        @click="activeSection = section.id">
        {{ section.label }}
      </button>
    </nav>

    <div v-if="activeSection !== 'bilan'" class="titleCard contentCard">
      <div
        class="trace-layout"
        :class="{ 'trace-layout--framed': currentSection.frames?.length }">
        <figure class="trace-photo" aria-label="Emplacement pour une photo">
          <div class="trace-photo__image">
            <img :src="currentSection.image" :alt="currentSection.imageAlt" />
            <span
              v-for="frame in currentSection.frames"
              :key="frame.color"
              class="trace-frame"
              :class="`trace-frame--${frame.color}`"
              :style="frameStyle(frame)">
              <span v-if="frame.label" class="trace-frame__tag">{{
                frame.label
              }}</span>
            </span>
          </div>
          <figcaption class="trace-photo__caption">
            {{ currentSection.caption }}
          </figcaption>
        </figure>

        <div class="trace-copy">
          <h3>{{ currentSection.title }}</h3>
          <p v-if="currentSection.skills?.length" class="textCard">
            Savoir-faire élémentaires :
            <template
              v-for="(skill, index) in currentSection.skills"
              :key="skill.label">
              <span class="pill" :class="`pill-${skill.color}`">{{
                skill.label
              }}</span
              ><span v-if="index < currentSection.skills.length - 1">, </span>
            </template>
          </p>

          <p
            class="textCard"
            v-html="highlightSkills(currentSection.intro, currentSection)"></p>

          <p
            v-for="paragraph in currentSection.paragraphs"
            :key="paragraph"
            class="textCard"
            v-html="highlightSkills(paragraph, currentSection)"></p>

          <p class="textCard muted">{{ currentSection.footer }}</p>
        </div>
      </div>
    </div>

    <div v-else class="titleCard contentCard">
      <p class="textCard">{{ currentSection.intro }}</p>

      <p
        v-for="paragraph in currentSection.paragraphs"
        :key="paragraph"
        class="textCard">
        {{ paragraph }}
      </p>

      <p class="textCard muted">{{ currentSection.footer }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import trace1Image from "../assets/architecture-api.svg";
import traceBorne from "../assets/hero.png";
import traceStripe from "../assets/stripe-webhooks.png";

const sections = [
  {
    id: "trace1",
    label: "API générique",
    title: "Mise en place d'une API REST générique",
    skills: [
      {
        label: "concevoir une architecture en couches",
        color: "red",
        keywords: ["concevoir une architecture en couches"],
      },
      {
        label: "créer des routes HTTP",
        color: "green",
        keywords: ["créer des routes HTTP"],
      },
      {
        label: "construire des requêtes SQL de façon dynamique",
        color: "orange",
        keywords: ["construire des requêtes SQL de façon dynamique"],
      },
      {
        label: "sécuriser les endpoints",
        color: "blue",
        keywords: ["sécuriser les endpoints"],
      },
    ],
    image: trace1Image,
    imageAlt: "Schéma de l'architecture en couches de l'API REST",
    caption: "Trace 1 : architecture en couches de l'API",
    intro:
      "La trace n°1 présente une API REST générique développée en Node.js, Express et PostgreSQL, conçue depuis zéro pour être réutilisable sur les futurs projets clients de l'entreprise.",
    paragraphs: [
      "Pour garder un projet maintenable, j'ai cherché à concevoir une architecture en couches, répartie en quatre responsabilités distinctes : les Routes servent à créer des routes HTTP propres à chaque table, les Controllers orchestrent la requête et la gestion d'erreur, les Services portent la logique métier (un fichier par table) et les Models accèdent à la base de données. Le point d'entrée Server.js lit information_schema pour connaître les tables autorisées, puis génère automatiquement les fichiers de service avant de démarrer le serveur.",
      "Pour éviter de réécrire les mêmes opérations CRUD sur chaque table, la classe TableBuilder permet de construire des requêtes SQL de façon dynamique : SELECT, INSERT, UPDATE et DELETE, avec gestion du where, du orderBy, de la limit et de l'offset. Chaque INSERT renseigne automatiquement creation_date et change_date, et chaque UPDATE rafraîchit change_date, pour un comportement identique sur toutes les tables.",
      "Pour sécuriser les endpoints, la sécurité s'appuie sur trois niveaux successifs. Un premier middleware vérifie l'en-tête x-api-key avant d'atteindre la moindre route HTTP. Un second lit le Basic Auth, contrôle le mot de passe avec bcrypt et compare le niveau d'accès de l'utilisateur (0 / 10 / 50 / 100) à celui requis. Enfin, toutes les requêtes passent par des paramètres $1, $2… pour fermer la porte à l'injection SQL.",
      "Les suppressions sont des soft delete : la ligne est marquée deleted = true plutôt qu'effacée, et une route de restauration permet à l'administrateur de revenir en arrière sans perdre l'historique.",
    ],
    footer:
      "Cette trace justifie les choix d'architecture pour produire une API robuste, générique et sécurisée.",
  },
  {
    id: "trace2",
    label: "APIs externes",
    title: "Intégration de services tiers (Stripe, Brevo, AWS S3)",
    skills: [
      {
        label: "lire et comprendre une documentation technique",
        color: "purple",
        keywords: ["lire et comprendre une documentation technique"],
      },
      {
        label: "intégrer une API tierce dans un projet existant",
        color: "teal",
        keywords: ["intégrer une API tierce dans un projet existant"],
      },
      {
        label: "sécuriser des clés d'API via variables d'environnement",
        color: "pink",
        keywords: ["sécuriser des clés d'API via variables d'environnement"],
      },
      {
        label: "gérer les flux asynchrones (redirections, webhooks)",
        color: "brown",
        keywords: ["gérer les flux asynchrones (redirections, webhooks)"],
      },
    ],
    image: traceStripe,
    imageAlt:
      "Capture du tableau de bord des événements Stripe après un paiement à 79,99 €",
    caption: "Trace 2 : tableau de bord des événements Stripe après un paiement",
    frames: [
      { color: "blue", x: "0.4%", y: "10%", w: "60%", h: "9%" },
      { color: "orange", x: "0.4%", y: "21%", w: "60%", h: "76%" },
      { color: "red", x: "63%", y: "22%", w: "36%", h: "75%" },
    ],
    highlights: [
      { text: "encadré bleu", color: "blue" },
      { text: "encadré orange", color: "orange" },
      { text: "encadré rouge", color: "red" },
    ],
    intro:
      "La trace n°2 ci-dessus est une capture du tableau de bord des événements Stripe, le service tiers que j'ai poussé le plus loin dans le projet e-commerce. L'enjeu était d'intégrer une API tierce dans un projet existant, puis de réagir correctement à tout ce que Stripe renvoie une fois le paiement effectué.",
    paragraphs: [
      "Quand un client règle sa commande, Stripe ne se contente pas d'un simple « payé » : il déclenche tout un enchaînement d'événements. Tout en haut, l'encadré bleu correspond à l'événement que j'ai ouvert, invoice_payment.paid (le paiement de l'abonnement à 79,99 €). En dessous, l'encadré orange regroupe la suite de la chaîne : checkout.session.completed (l'achat est terminé), invoice.payment_succeeded (le paiement a réussi) puis invoice.paid (la facture est réglée).",
      "L'encadré rouge, à droite, montre les données de cet événement (Event data) : le montant amount_paid: 7999 — soit 79,99 € —, la devise eur et le statut status: \"paid\". C'est sur ces informations que mon serveur s'appuie pour valider la commande. Comme ces événements arrivent en différé, indépendamment de ce que fait l'utilisateur dans son navigateur, il a fallu gérer les flux asynchrones (redirections, webhooks) : Stripe notifie mon serveur dès qu'un événement se produit, plutôt que d'attendre une réponse immédiate.",
      "Brancher Stripe a demandé de lire et comprendre une documentation technique dense pour repérer les bons événements à écouter, et de sécuriser des clés d'API via variables d'environnement en isolant la clé secrète et le secret du webhook dans un fichier .env plutôt que dans le code.",
      "Sur le même principe, j'ai intégré deux autres services : Brevo, pour les emails transactionnels (vérification d'inscription, réinitialisation de mot de passe), et AWS S3, pour héberger les photos d'articles.",
    ],
    footer:
      "Cette trace montre la capacité à intégrer un service tiers complexe en profondeur, tout en restant capable de brancher d'autres API sur le même modèle.",
  },
  {
    id: "trace3",
    label: "Borne",
    title: "Borne d'achat de billets en libre-service",
    skills: [
      {
        label: "adapter une interface pour un usage borne/tactile",
        color: "red",
        keywords: ["adapter une interface pour un usage borne/tactile"],
      },
      {
        label: "concevoir un parcours utilisateur rapide",
        color: "green",
        keywords: ["concevoir un parcours utilisateur rapide"],
      },
      {
        label: "sécuriser un point de vente public",
        color: "orange",
        keywords: ["sécuriser un point de vente public"],
      },
    ],
    image: traceBorne,
    imageAlt: "Capture de la borne avec le QR code affiché",
    caption: "Trace 3 : borne événementielle avec QR code de paiement",
    intro:
      "La trace n°3 présente une borne en libre-service installée lors d'un événement, qui permet aux visiteurs d'acheter leurs billets rapidement en scannant un QR code.",
    paragraphs: [
      "L'objectif était de concevoir un parcours utilisateur rapide pour réduire le temps d'attente : au lieu de passer par une caisse, le visiteur scanne le QR code affiché sur la borne et arrive directement sur la page de paiement préremplie avec son billet.",
      "L'enjeu suivant était de sécuriser un point de vente public laissé sans surveillance : le QR code est généré côté backend et pointe vers une URL signée contenant les informations du billet (type, prix, événement), de sorte que ces données ne puissent pas être modifié côté client.",
      "Enfin, il a fallu adapter une interface pour un usage borne/tactile : un affichage plein écran, des éléments de grande taille, un fond contrasté et aucune action superflue, afin que le parcours reste centré sur le QR code et utilisable sans clavier ni souris.",
    ],
    footer:
      "Cette trace illustre la conception d'une interface dédiée à un cas d'usage précis et la sécurisation d'un parcours d'achat sans interaction directe avec le serveur.",
  },
  {
    id: "bilan",
    label: "BILAN",
    title: "Bilan",
    intro:
      "Le bilan rassemble les acquis techniques du stage et la manière dont les choix d'architecture ont influencé la suite du projet.",
    paragraphs: [
      "La mise en place d'une API générique m'a obligé à anticiper les besoins futurs (nouvelles tables, nouvelles routes) plutôt que de coder au cas par cas. Cette approche m'a fait gagner du temps dès que de nouvelles fonctionnalités ont été demandées.",
      "L'intégration des services tiers (Stripe, Brevo, AWS) m'a appris à lire une documentation technique en autonomie, à isoler les configurations sensibles et à gérer les cas d'erreur d'un service que je ne maîtrise pas.",
      "La borne événementielle a été l'occasion de réfléchir à l'expérience utilisateur dans un contexte différent du web classique : pas de clavier, pas de souris, un temps d'interaction très court.",
      "Si je devais recommencer, je mettrais en place les webhooks Stripe dès le départ plutôt que d'attendre, et j'écrirais des tests automatisés pour les services générés.",
    ],
    footer:
      "Le bilan final permet d'avoir une vision claire des compétences mobilisées et de celles à approfondir.",
  },
];

const activeSection = ref("trace1");

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Surligne dans le texte la phrase exacte de chaque savoir-faire
// (mot pour mot) et les renvois aux cadres de la capture,
// avec la même couleur que la pastille / le cadre correspondant.
const highlightSkills = (text, section) => {
  const entries = [];
  (section?.skills ?? []).forEach((skill) => {
    (skill.keywords ?? []).forEach((keyword) =>
      entries.push({ keyword, color: skill.color }),
    );
  });
  (section?.highlights ?? []).forEach((highlight) =>
    entries.push({ keyword: highlight.text, color: highlight.color }),
  );
  if (!entries.length) return escapeHtml(text);

  // Les mots-clés les plus longs d'abord pour gérer les chevauchements
  // (ex. "injection SQL" avant "SQL").
  entries.sort((a, b) => b.keyword.length - a.keyword.length);

  const colorByKeyword = new Map();
  entries.forEach(({ keyword, color }) => {
    const key = keyword.toLowerCase();
    if (!colorByKeyword.has(key)) colorByKeyword.set(key, color);
  });

  const pattern = entries.map((entry) => escapeRegExp(entry.keyword)).join("|");
  const regex = new RegExp(
    `(?<![\\p{L}\\p{N}])(${pattern})(?![\\p{L}\\p{N}])`,
    "giu",
  );

  let result = "";
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    result += escapeHtml(text.slice(lastIndex, match.index));
    const color = colorByKeyword.get(match[0].toLowerCase());
    result += `<span class="hl hl-${color}">${escapeHtml(match[0])}</span>`;
    lastIndex = match.index + match[0].length;
  }
  result += escapeHtml(text.slice(lastIndex));
  return result;
};

// Positionne un cadre (en %) par-dessus la capture.
const frameStyle = (frame) => ({
  left: frame.x,
  top: frame.y,
  width: frame.w,
  height: frame.h,
});

const currentSection = computed(() => {
  return (
    sections.find((section) => section.id === activeSection.value) ??
    sections[0]
  );
});
</script>

<style scoped>
.technique-page {
  display: grid;
  gap: 1rem;
}

.titleCard {
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: rgba(255, 250, 242, 0.92);
  border: 1px solid rgba(24, 58, 42, 0.14);
  box-shadow: 0 20px 50px rgba(24, 58, 42, 0.08);
  backdrop-filter: blur(8px);
}

.contentCard {
  min-width: 0;
}

.introText {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #27483b;
}

h2 {
  margin: 0;
  font-size: 35px;
  line-height: 1.05;
  color: #183a2a;
}

.trace1-intro {
  margin-top: 1rem;
  padding: 1rem 1rem 0.25rem;
  border-radius: 1rem;
  background: rgba(24, 58, 42, 0.04);
}

/* L'image (à gauche) est habillée par le texte : le texte commence à
   droite de l'image puis, dès qu'il dépasse sa hauteur, la suite passe
   sous l'image sur toute la largeur de la carte. */
.trace-layout {
  display: block;
  margin-top: 1rem;
}

.trace-layout::after {
  content: "";
  display: block;
  clear: both;
}

.trace-photo {
  float: left;
  width: 65%;
  max-width: 65%;
  margin: 0.25rem 1.5rem 0.75rem 0;
  border-radius: 0.9rem;
  display: flex;
  flex-direction: column;
  border: 0;
}

.trace-copy {
  min-width: 0;
}

.trace-photo__image {
  position: relative;
  padding: 0.6rem;
  border-radius: 0.9rem;
  border: 2px solid rgba(24, 58, 42, 0.16);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.45);
}

.trace-photo__image img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 0.4rem;
}

.trace-photo__caption {
  margin-top: 0.35rem;
  text-align: center;
  font-size: 0.95rem;
  font-style: italic;
  color: #183a2a;
}

/* Trace avec cadres (trace 2) : pas de cadre/padding autour pour que
   les cadres colorés s'alignent au pixel sur la capture. */
.trace-layout--framed .trace-photo__image {
  padding: 0;
  overflow: visible;
}

/* Cadres de couleur superposés sur la capture */
.trace-frame {
  position: absolute;
  border: 3px solid var(--fc, #183a2a);
  border-radius: 8px;
  pointer-events: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.55);
}

.trace-frame__tag {
  position: absolute;
  top: -0.95rem;
  left: -3px;
  padding: 0.05rem 0.45rem;
  border-radius: 0.4rem;
  background: var(--fc, #183a2a);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
}

.trace-frame--orange {
  --fc: #c2750a;
}
.trace-frame--red {
  --fc: #d11f29;
}
.trace-frame--purple {
  --fc: #7c3aed;
}
.trace-frame--teal {
  --fc: #0d9488;
}
.trace-frame--blue {
  --fc: #1e87c4;
}
.trace-frame--green {
  --fc: #1f9a52;
}
.trace-frame--pink {
  --fc: #db2777;
}
.trace-frame--brown {
  --fc: #8a5a30;
}

.trace-copy h3 {
  margin: 0 0 0.75rem;
  font-size: 1.4rem;
  line-height: 1.2;
  color: #183a2a;
}

.pill {
  display: inline-block;
  padding: 0.12rem 0.5rem;
  border-radius: 999px;
  font-size: 0.94rem;
  font-weight: 600;
  line-height: 1.45;
}

.pill-red {
  color: #7d171b;
  background: rgba(225, 43, 53, 0.15);
}

.pill-green {
  color: #1c5c36;
  background: rgba(46, 184, 97, 0.14);
}

.pill-orange {
  color: #8a4a09;
  background: rgba(245, 159, 11, 0.2);
}

.pill-blue {
  color: #0f4e73;
  background: rgba(40, 166, 237, 0.16);
}

.pill-purple {
  color: #6d28d9;
  background: rgba(124, 58, 237, 0.15);
}

.pill-teal {
  color: #0f766e;
  background: rgba(13, 148, 136, 0.16);
}

.pill-pink {
  color: #be185d;
  background: rgba(219, 39, 119, 0.14);
}

.pill-brown {
  color: #7a4a2b;
  background: rgba(146, 99, 55, 0.18);
}

:deep(.hl) {
  padding: 0.02rem 0.28rem;
  border-radius: 0.35rem;
  font-weight: 600;
}

:deep(.hl-red) {
  color: #7d171b;
  background: rgba(225, 43, 53, 0.15);
}

:deep(.hl-green) {
  color: #1c5c36;
  background: rgba(46, 184, 97, 0.16);
}

:deep(.hl-orange) {
  color: #8a4a09;
  background: rgba(245, 159, 11, 0.2);
}

:deep(.hl-blue) {
  color: #0f4e73;
  background: rgba(40, 166, 237, 0.16);
}

:deep(.hl-purple) {
  color: #6d28d9;
  background: rgba(124, 58, 237, 0.15);
}

:deep(.hl-teal) {
  color: #0f766e;
  background: rgba(13, 148, 136, 0.16);
}

:deep(.hl-pink) {
  color: #be185d;
  background: rgba(219, 39, 119, 0.14);
}

:deep(.hl-brown) {
  color: #7a4a2b;
  background: rgba(146, 99, 55, 0.18);
}

.textCard {
  margin: 1.1rem 0 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #27483b;
}

.capturesTitle {
  margin: 0;
  font-weight: 700;
}

.captureList {
  margin: 0.45rem 0 0;
  padding-left: 1.2rem;
}

.captureList li {
  margin-top: 0.25rem;
}

.textCard.muted {
  color: rgba(39, 72, 59, 0.78);
}

.internal-nav {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.internal-nav__tab {
  border: 0;
  padding: 0.9rem 1.1rem;
  border-radius: 0.65rem 0.65rem 0 0;
  background: rgba(255, 255, 255, 0.08);
  color: #183a2a;
  font-weight: 700;
  cursor: pointer;
}

.internal-nav__tab--active {
  background: rgba(255, 250, 242, 0.92);
  color: #183a2a;
}

@media (max-width: 720px) {
  .titleCard {
    padding: 1.2rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  .textCard {
    font-size: 1rem;
  }

  .trace-layout {
    flex-direction: column;
  }

  .trace-photo {
    float: none;
    width: 100%;
    max-width: 100%;
    margin: 0 0 0.75rem;
  }
}
</style>
