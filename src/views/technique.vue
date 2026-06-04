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

    <div v-else class="bilan">
      <div class="titleCard contentCard">
        <p class="textCard">{{ currentSection.intro }}</p>
        <p class="bilan-legend">
          <span class="bilan-legend__label">Échelle :</span>
          <span class="level level-maitrise">maîtrisé</span>
          <span class="level level-acquis">acquis</span>
          <span class="level level-consolider">à consolider</span>
        </p>
      </div>

      <article
        v-for="trace in evaluatedTraces"
        :key="trace.id"
        class="titleCard eval-card">
        <header class="eval-head">
          <h3 class="eval-head__title">{{ trace.title }}</h3>
          <div class="eval-head__rating">
            <span class="eval-meter" aria-hidden="true">
              <span
                v-for="step in 3"
                :key="step"
                class="eval-meter__seg"
                :class="[
                  `eval-meter__seg--${traceEval(trace).level}`,
                  {
                    'eval-meter__seg--on':
                      step <= levelScore[traceEval(trace).level],
                  },
                ]"></span>
            </span>
            <span class="level" :class="`level-${traceEval(trace).level}`">{{
              levels[traceEval(trace).level]
            }}</span>
          </div>
        </header>

        <p
          class="textCard"
          v-html="highlightSkills(syntheses[trace.id], trace)"></p>

        <div
          class="eval-verdict"
          :class="`eval-verdict--${traceEval(trace).level}`">
          <p class="eval-verdict__label">Mon évaluation</p>
          <p class="eval-verdict__text" v-html="traceEval(trace).text"></p>
        </div>
      </article>

      <p class="textCard muted">{{ currentSection.footer }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import trace1Image from "../assets/architecture-api.svg";
import traceDeploiement from "../assets/hero.png";
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
    label: "Multi-support",
    title: "Afficheur multi-support (Raspberry, borne, Windows)",
    skills: [
      {
        label: "déployer une même application sur plusieurs supports",
        color: "indigo",
        keywords: ["déployer une même application sur plusieurs supports"],
      },
      {
        label: "configurer un poste en mode kiosque",
        color: "cyan",
        keywords: ["configurer un poste en mode kiosque"],
      },
      {
        label: "piloter l'affichage via une configuration JSON distante",
        color: "lime",
        keywords: ["piloter l'affichage via une configuration JSON distante"],
      },
      {
        label: "automatiser le lancement au démarrage",
        color: "amber",
        keywords: ["automatiser le lancement au démarrage"],
      },
    ],
    image: traceDeploiement,
    imageAlt: "Capture du fichier JSON de configuration qui pilote l'afficheur",
    caption: "Trace 3 : fichier JSON de configuration qui pilote le contenu de l'afficheur",
    intro:
      "La trace n°3 présente un lecteur d'affichage dynamique que j'ai conçu pour diffuser un contenu en plein écran — une vidéo, un site web ou une image — sur différents postes, et dont le comportement est piloté à distance depuis un simple fichier de configuration.",
    paragraphs: [
      "Le cœur du système est un JSON récupéré au démarrage depuis un sous-domaine d'appup, le serveur de l'entreprise. Ce fichier décrit ce qui doit s'afficher : le type de média (vidéo, site ou image), l'URL ou le fichier à charger, ainsi que l'orientation portrait ou paysage. Il permet de piloter l'affichage via une configuration JSON distante : modifier ce fichier suffit à changer le contenu d'un écran, sans se déplacer ni toucher au code embarqué sur la machine.",
      "Pour que le poste reste autonome, il a fallu automatiser le lancement au démarrage : un script se déclenche au boot, va chercher la configuration à jour, prépare le média puis ouvre l'affichage en plein écran, sans aucune intervention humaine.",
      "Le même script devait pouvoir tourner sur plusieurs environnements ; j'ai donc cherché à déployer une même application sur plusieurs supports — un Raspberry Pi sous Linux, une borne tactile et un PC Windows — en n'adaptant que la couche de lancement propre à chaque système.",
      "Enfin, dans tous les cas il fallait configurer un poste en mode kiosque : un affichage plein écran sans barre de navigation ni curseur, un contenu verrouillé et une relance automatique en cas de coupure, pour qu'un écran laissé sans surveillance affiche toujours le bon contenu.",
    ],
    footer:
      "Cette trace illustre la conception d'un afficheur autonome, configurable à distance et déployable sur des supports hétérogènes à partir d'une base de code commune.",
  },
  {
    id: "bilan",
    label: "Bilan / Évaluation",
    title: "Bilan",
    intro:
      "Le bilan rassemble les acquis techniques du stage à travers les trois traces : une API REST générique, l'intégration de services tiers et un afficheur multi-support piloté à distance. Au-delà des technologies, le fil conducteur a été de concevoir des solutions réutilisables plutôt que des réponses au cas par cas.",
    paragraphs: [
      "La mise en place d'une API générique m'a obligé à anticiper les besoins futurs (nouvelles tables, nouvelles routes) plutôt que de coder au cas par cas. Cette approche m'a fait gagner du temps dès que de nouvelles fonctionnalités ont été demandées.",
      "L'intégration des services tiers (Stripe, Brevo, AWS) m'a appris à lire une documentation technique en autonomie, à isoler les configurations sensibles et à gérer les cas d'erreur d'un service que je ne maîtrise pas.",
      "L'afficheur multi-support m'a fait sortir du navigateur classique : il a fallu penser déploiement sur des environnements hétérogènes (Raspberry Pi, borne, PC Windows), configuration à distance via un simple JSON et exécution autonome au démarrage, sur des machines qui tournent sans personne devant l'écran.",
      "Ces trois traces partagent une même logique : externaliser ce qui change souvent (le schéma de base pour l'API, les clés pour les services tiers, le contenu et l'orientation pour l'afficheur) afin de modifier le comportement sans retoucher au code. C'est la principale compétence que je retiens du stage.",
      "Avec du recul, je m'y prendrais autrement sur deux points : mettre en place les webhooks Stripe dès le départ plutôt que d'attendre, et écrire des tests automatisés — pour les services générés de l'API comme pour la lecture de la configuration de l'afficheur — afin de fiabiliser ces briques réutilisées partout.",
    ],
    footer:
      "Ce bilan donne une vision claire des compétences mobilisées — architecture, intégration et déploiement — et de celles à approfondir, notamment les tests automatisés.",
  },
];

// Échelle d'auto-évaluation utilisée dans l'onglet BILAN.
const levels = {
  maitrise: "maîtrisé",
  acquis: "acquis",
  consolider: "à consolider",
};

// Synthèse de chaque trace pour le bilan. Les phrases des savoir-faire y sont
// reprises mot pour mot pour être surlignées dans leur couleur (highlightSkills).
const syntheses = {
  trace1:
    "Cette première trace portait sur le socle de l'API. Il a d'abord fallu concevoir une architecture en couches (Routes, Controllers, Services, Models) pour garder le projet maintenable, puis créer des routes HTTP propres à chaque table. Côté base de données, j'ai appris à construire des requêtes SQL de façon dynamique avec une classe réutilisable, et surtout à sécuriser les endpoints sur trois niveaux successifs (clé d'API, Basic Auth, requêtes paramétrées).",
  trace2:
    "Cette trace portait sur l'ouverture du projet vers l'extérieur. Pour brancher Stripe, Brevo et AWS S3, j'ai dû lire et comprendre une documentation technique dense, puis intégrer une API tierce dans un projet existant sans casser le reste. J'ai pris l'habitude de sécuriser des clés d'API via variables d'environnement, et l'enjeu le plus formateur a été de gérer les flux asynchrones (redirections, webhooks) déclenchés par Stripe après le paiement.",
  trace3:
    "Cette trace portait sur la diffusion d'un contenu en dehors du navigateur classique. L'objectif était de déployer une même application sur plusieurs supports (Raspberry Pi, borne, PC Windows) à partir d'une base commune. Sur chaque poste, il a fallu configurer un poste en mode kiosque puis automatiser le lancement au démarrage, tandis que le contenu reste externalisé : je peux piloter l'affichage via une configuration JSON distante récupérée depuis appup.",
};

// Nombre de segments allumés dans la jauge de niveau.
const levelScore = {
  consolider: 1,
  acquis: 2,
  maitrise: 3,
};

// Auto-évaluation par savoir-faire (une trace = un savoir-faire), indexée
// par l'identifiant de la trace.
const traceEvaluations = {
  trace1: {
    level: "maitrise",
    text: "C'est <strong>le savoir-faire que je maîtrise le mieux</strong> : l'architecture en couches et l'API générique <strong>tournent en production</strong> et m'ont fait gagner beaucoup de temps. Je suis à l'aise avec le routage dynamique et les requêtes paramétrées. Il me reste à approfondir <strong>l'optimisation des requêtes complexes</strong> (jointures, gros volumes) et à ajouter des <strong>tests automatisés</strong>.",
  },
  trace2: {
    level: "acquis",
    text: "Je sais <strong>intégrer un service tiers de bout en bout</strong> en m'appuyant sur sa documentation, et j'ai <strong>reproduit la démarche sur trois services</strong> (Stripe, Brevo, AWS S3). Le point qui me demande encore de la rigueur, ce sont les <strong>flux asynchrones</strong> : les webhooks Stripe fonctionnent, mais leur <strong>fiabilité</strong> (idempotence, rejeu) reste à consolider.",
  },
  trace3: {
    level: "consolider",
    text: "C'est le <strong>savoir-faire le plus récent</strong>. Le <strong>pilotage du contenu par JSON distant</strong> est la partie la plus aboutie, mais le <strong>déploiement sur les trois supports</strong> demande encore des réglages manuels et la <strong>robustesse longue durée</strong> (reprise après coupure, configuration indisponible au démarrage) reste à fiabiliser.",
  },
};

// Les traces évaluées dans le bilan (toutes sauf le bilan lui-même).
const evaluatedTraces = sections.filter(
  (section) => section.id !== "bilan" && section.skills?.length,
);

// Renvoie l'auto-évaluation d'une trace (fallback neutre si absente).
const traceEval = (trace) =>
  traceEvaluations[trace.id] ?? { level: "acquis", text: "" };

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

.pill-indigo {
  color: #3730a3;
  background: rgba(99, 102, 241, 0.18);
}

.pill-cyan {
  color: #155e75;
  background: rgba(6, 182, 212, 0.18);
}

.pill-lime {
  color: #3f6212;
  background: rgba(132, 204, 22, 0.22);
}

.pill-amber {
  color: #854d0e;
  background: rgba(234, 179, 8, 0.22);
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

:deep(.hl-indigo) {
  color: #3730a3;
  background: rgba(99, 102, 241, 0.2);
}

:deep(.hl-cyan) {
  color: #155e75;
  background: rgba(6, 182, 212, 0.2);
}

:deep(.hl-lime) {
  color: #3f6212;
  background: rgba(132, 204, 22, 0.24);
}

:deep(.hl-amber) {
  color: #854d0e;
  background: rgba(234, 179, 8, 0.24);
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

/* ---- Onglet BILAN : cartes d'évaluation par savoir-faire ---- */
.bilan {
  display: grid;
  gap: 1rem;
}

.bilan-legend {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0 0;
}

.bilan-legend__label {
  font-weight: 700;
  color: #27483b;
}

.eval-card {
  display: grid;
  gap: 0.9rem;
}

.eval-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.eval-head__title {
  margin: 0;
  font-size: 1.3rem;
  line-height: 1.2;
  color: #183a2a;
}

.eval-head__rating {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.eval-meter {
  display: inline-flex;
  gap: 0.2rem;
}

.eval-meter__seg {
  width: 1.6rem;
  height: 0.45rem;
  border-radius: 999px;
  background: rgba(24, 58, 42, 0.12);
}

.eval-meter__seg--on.eval-meter__seg--maitrise {
  background: #2eb861;
}

.eval-meter__seg--on.eval-meter__seg--acquis {
  background: #28a6ed;
}

.eval-meter__seg--on.eval-meter__seg--consolider {
  background: #f59f0b;
}

.eval-verdict {
  margin-top: 0.25rem;
  padding: 0.85rem 1rem;
  border-radius: 0.9rem;
  background: rgba(24, 58, 42, 0.04);
  border-left: 4px solid rgba(24, 58, 42, 0.25);
}

.eval-verdict--maitrise {
  border-left-color: #2eb861;
}

.eval-verdict--acquis {
  border-left-color: #28a6ed;
}

.eval-verdict--consolider {
  border-left-color: #f59f0b;
}

.eval-verdict__label {
  margin: 0 0 0.3rem;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #183a2a;
}

.eval-verdict__text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #27483b;
}

.level {
  display: inline-block;
  padding: 0.12rem 0.6rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  white-space: nowrap;
  border: 1px solid transparent;
}

.level-maitrise {
  color: #1c5c36;
  background: rgba(46, 184, 97, 0.16);
  border-color: rgba(46, 184, 97, 0.4);
}

.level-acquis {
  color: #0f4e73;
  background: rgba(40, 166, 237, 0.16);
  border-color: rgba(40, 166, 237, 0.4);
}

.level-consolider {
  color: #8a4a09;
  background: rgba(245, 159, 11, 0.2);
  border-color: rgba(245, 159, 11, 0.45);
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
