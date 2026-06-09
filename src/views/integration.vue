<template>
  <section class="technique-page">
    <div class="titleCard">
      <h2>
        Présentation et évaluation des savoir-faire d'intégration dans
        l'entreprise
      </h2>
      <p class="introText">
        Cette partie présente la manière dont je me suis intégré chez APPUP :
        prise en main de l'environnement de travail, communication avec le
        maître de stage et adoption des bonnes pratiques de l'équipe.
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
        :class="{ 'trace-layout--framed': currentSection.underlines?.length }">
        <figure class="trace-photo" aria-label="Emplacement pour une photo">
          <div class="trace-photo__image">
            <img :src="currentSection.image" :alt="currentSection.imageAlt" />
            <span
              v-for="(underline, index) in currentSection.underlines"
              :key="index"
              class="trace-underline"
              :style="underlineStyle(underline)"></span>
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
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import trace1Image from "../assets/trace6-demarrage-api.png";
import trace2Image from "../assets/notes-stage.png";

const sections = [
  {
    id: "trace1",
    label: "Environnement",
    title: "Prise en main de l'environnement de travail chez APPUP",
    skills: [
      {
        label: "préparer le projet en local",
        color: "red",
        keywords: ["préparer le projet en local"],
      },
      {
        label: "découvrir l'organisation interne de l'entreprise",
        color: "green",
        keywords: ["découvrir l'organisation interne de l'entreprise"],
      },
      {
        label: "demander le bon niveau d'information au bon moment",
        color: "orange",
        keywords: ["demander le bon niveau d'information au bon moment"],
      },
    ],
    image: trace1Image,
    imageAlt:
      "Terminal PowerShell exécutant « npm run dev » : nodemon démarre node Backend/Server.js et l'API se connecte à PostgreSQL (message « Connecté à PostgreSQL »)",
    caption:
      "Trace 6 : démarrage de l'API en local — nodemon lance le serveur et la connexion à PostgreSQL est établie",
    intro:
      "La trace n°6 est une capture du **démarrage de l'API en local** sur ma machine. Elle illustre la toute **première étape de mon intégration** : avant d'écrire la moindre ligne de code utile, il a fallu comprendre où j'arrivais, prendre connaissance du sujet et préparer le projet pour devenir **opérationnel rapidement**.",
    paragraphs: [
      "J'ai travaillé sur mon propre PC, déjà équipé des outils que j'utilise habituellement (**Node.js**, **PostgreSQL**, **VS Code**, **Git**, **Postman**) : je n'ai donc pas eu de poste à monter de zéro. Préparer le projet en local a surtout consisté à créer la base PostgreSQL, à renseigner le fichier **.env** avec les accès nécessaires et à vérifier que l'API démarrait correctement sur ma machine avant de commencer à développer.",
      "En parallèle, il a fallu découvrir l'organisation interne de l'entreprise. J'ai été accueilli par **Marouane FEKKAR**, le fondateur d'**APPUP**, qui m'a présenté l'activité de la société et le périmètre de mon sujet : développer une **API REST réutilisable** et un **site e-commerce** fictif qui s'appuie dessus. Comprendre qui fait quoi et comment circule l'information m'a permis de savoir à qui m'adresser selon le type de question.",
      "Enfin, partager l'open space avec **Alban CHOULET**, un autre étudiant de l'**IUT NFC**, m'a appris à demander le bon niveau d'information au bon moment : un avis rapide à un voisin de bureau pour une question secondaire, et les points avec Marouane réservés aux décisions structurantes. Cela m'a permis de **gagner en autonomie** sans rester bloqué ni solliciter le maître de stage pour tout.",
    ],
    footer:
      "",
  },
  {
    id: "trace2",
    label: "Communication",
    title: "Communication et points avec le maître de stage",
    skills: [
      {
        label: "présenter clairement les avancées",
        color: "purple",
        keywords: ["présenter clairement les avancées"],
      },
      {
        label: "justifier les choix techniques à l'oral",
        color: "teal",
        keywords: ["justifier les choix techniques à l'oral"],
      },
      {
        label: "intégrer les retours rapidement",
        color: "pink",
        keywords: ["intégrer les retours rapidement"],
      },
      {
        label: "savoir signaler un blocage tôt",
        color: "brown",
        keywords: ["savoir signaler un blocage tôt"],
      },
    ],
    // Soulignage tracé directement sur la capture (en % de l'image), pour
    // pointer les lignes des notes qui correspondent aux corrections
    // expliquées dans le texte (session/cookie vs localStorage, bearer → basic).
    underlines: [
      { x: "0.5%", y: "57.5%", w: "97.5%" },
      { x: "0.5%", y: "84%", w: "86.5%" },
    ],
    image: trace2Image,
    imageAlt:
      "Fichier de notes personnel listant les tâches et corrections à faire au fil du stage : vérifier le header de chaque route privée, passer en session (cookie) plutôt qu'en localStorage, utiliser le Basic Auth (mail + mot de passe encodés en base 64) plutôt que le bearer token, fonctions de vérification génériques, route d'insertion et soft delete",
    caption:
      "Trace 7 : mes notes de stage, où je consigne après chaque point oral ce qu'il faut faire et améliorer",
    intro:
      "La trace n°7 est un pense-bête que j'ai rédigé pour moi-même juste après un point avec mon maître de stage. Tous nos échanges se faisaient **à l'oral** : pour ne rien oublier, je notais aussitôt **par écrit** ce qui en ressortait. Ce fichier de notes, que j'alimentais au fil des points, reprend ainsi — parmi d'autres tâches — des corrections que Marouane FEKKAR m'a demandées de vive voix. Il illustre la relation de travail installée tout au long du stage — un **rythme régulier de points** pour valider les choix d'architecture et arbitrer les priorités fonctionnelles.",
    paragraphs: [
      "Les points avaient lieu à la fin d'une fonctionnalité importante (mise en place du **TableBuilder**, intégration de **Stripe**, ajout des abonnements…). Pour présenter clairement les avancées, je préparais à chaque fois une démonstration courte et concrète — une route testée en direct sur **Postman** ou un scénario complet déroulé depuis le **frontend Vue** — ce qui me permettait aussi de justifier les choix techniques à l'oral plutôt que par un long discours.",
      "La trace n°7 est le résultat direct de ces points. Comme tout se tenait à l'oral, j'ai pris l'habitude d'en consigner moi-même les conclusions tout de suite après. On y retrouve, parmi d'autres tâches, deux corrections demandées par Marouane : passer les identifiants en **session (cookie)** plutôt qu'en **localStorage**, et remplacer le **bearer token** par du **Basic Auth** (mail + mot de passe encodés en base 64). Garder cette liste sous les yeux m'a permis d'intégrer les retours rapidement : ces points ont été traités dans les commits qui ont suivi, comme le montre aussi l'historique **Git** de la trace n°5.",
      "Quand je rencontrais un blocage — configuration des **webhooks Stripe**, gestion du **raw body Express** pour vérifier la signature, droits **S3** sur les images uploadées — j'ai appris à savoir signaler un blocage tôt plutôt qu'à m'enliser seul. Je rédigeais d'abord ma question **par écrit** : souvent cela suffisait à trouver la réponse moi-même, et quand ce n'était pas le cas, l'échange avec Marouane était beaucoup plus efficace.",
    ],
    footer:
      "",
  },
  {
    id: "bilan",
    label: "Bilan / Évaluation",
    title: "Bilan",
    intro:
      "Le bilan d'intégration reprend les deux savoir-faire travaillés : la prise en main de l'environnement de travail chez APPUP et la communication avec le maître de stage. Au-delà des outils, le fil conducteur a été de devenir autonome rapidement tout en sachant solliciter les bonnes personnes au bon moment.",
    footer:
      "",
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
    "Cette trace portait sur mon arrivée chez APPUP. Travaillant sur mon propre PC déjà équipé, j'ai surtout eu à préparer le projet en local (base PostgreSQL, fichier .env), à découvrir l'organisation interne de l'entreprise auprès de Marouane, et à apprendre à demander le bon niveau d'information au bon moment grâce à l'open space partagé.",
  trace2:
    "Cette trace portait sur la relation de travail avec le maître de stage. J'ai pris l'habitude de présenter clairement les avancées via des démonstrations Postman, de justifier les choix techniques à l'oral et d'intégrer les retours rapidement, et surtout d'apprendre à savoir signaler un blocage tôt en formulant mes questions par écrit.",
};

// Nombre de segments allumés dans la jauge de niveau.
const levelScore = {
  consolider: 1,
  acquis: 2,
  maitrise: 3,
};

// Auto-évaluation par savoir-faire (une trace = un thème), indexée
// par l'identifiant de la trace.
const traceEvaluations = {
  trace1: {
    level: "acquis",
    text: "Je m'intègre vite dans une organisation que je découvre. Comme je travaillais sur mon propre PC déjà équipé, la mise en place technique a été immédiate ; l'essentiel a été de <strong>comprendre le contexte de l'entreprise et le sujet</strong>. Le point que je veux <strong>renforcer</strong> est la <strong>découverte structurée de l'existant</strong> : prendre le temps d'analyser ce qui est déjà en place avant de produire.",
  },
  trace2: {
    level: "maitrise",
    text: "C'est un <strong>point fort du stage</strong> : le <strong>rythme de points courts appuyés sur des démonstrations concrètes</strong> a très bien fonctionné et a permis d'ajuster vite les choix techniques. Je suis bien plus à l'aise qu'avant pour <strong>justifier mes décisions à l'oral</strong>. La seule chose à <strong>améliorer</strong> est de <strong>garder une trace écrite</strong> des décisions prises (un compte-rendu daté dans le dépôt).",
  },
};

// Les traces évaluées dans le bilan (toutes sauf le bilan lui-même).
const evaluatedTraces = sections.filter(
  (section) => section.id !== "bilan" && section.skills?.length,
);

// Renvoie l'auto-évaluation d'une trace (fallback neutre si absente).
const traceEval = (trace) =>
  traceEvaluations[trace.id] ?? { level: "acquis", text: "" };

// La trace ouverte peut être imposée par l'URL (?section=trace2),
// notamment via les liens de la page d'accueil.
const route = useRoute();
const sectionIds = sections.map((section) => section.id);
const resolveSection = (value) =>
  sectionIds.includes(value) ? value : "trace1";

const activeSection = ref(resolveSection(route.query.section));

watch(
  () => route.query.section,
  (value) => {
    activeSection.value = resolveSection(value);
  },
);

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Surligne dans le texte la phrase exacte de chaque savoir-faire
// (mot pour mot), avec la même couleur que la pastille correspondante.
const highlightSkills = (text, section) => {
  const entries = [];
  (section?.skills ?? []).forEach((skill) => {
    (skill.keywords ?? []).forEach((keyword) =>
      entries.push({ keyword, color: skill.color, plain: false }),
    );
  });
  if (!entries.length) return escapeHtml(text);

  // Les mots-clés les plus longs d'abord pour gérer les chevauchements.
  entries.sort((a, b) => b.keyword.length - a.keyword.length);

  const infoByKeyword = new Map();
  entries.forEach(({ keyword, color, plain }) => {
    const key = keyword.toLowerCase();
    if (!infoByKeyword.has(key)) infoByKeyword.set(key, { color, plain });
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
    const info = infoByKeyword.get(match[0].toLowerCase());
    const plainClass = info.plain ? " hl--plain" : "";
    result += `<span class="hl hl-${info.color}${plainClass}">${escapeHtml(
      match[0],
    )}</span>`;
    lastIndex = match.index + match[0].length;
  }
  result += escapeHtml(text.slice(lastIndex));
  // **gras** -> <strong>gras</strong> (les ** ne sont pas échappés par escapeHtml)
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return result;
};

// Positionne un trait de soulignage (en %) par-dessus la capture.
const underlineStyle = (underline) => ({
  left: underline.x,
  top: underline.y,
  width: underline.w,
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
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  backdrop-filter: blur(8px);
}

.contentCard {
  min-width: 0;
}

.introText {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
}

h2 {
  margin: 0;
  font-size: 35px;
  line-height: 1.05;
  color: var(--heading);
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
  width: 60%;
  max-width: 60%;
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
  border: 2px solid var(--border-strong);
  overflow: hidden;
  background: rgba(148, 163, 184, 0.06);
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.12);
}

.trace-photo__image img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 0.4rem;
}

/* Capture avec annotations : pas de padding pour que les traits de
   soulignage s'alignent au pixel sur l'image. */
.trace-layout--framed .trace-photo__image {
  padding: 0;
  overflow: visible;
}

/* Trait de soulignage tracé par-dessus la capture (positionné en %). */
.trace-underline {
  position: absolute;
  height: 0;
  border-bottom: 1.5px solid rgba(245, 159, 11, 0.7);
  border-radius: 2px;
  pointer-events: none;
}

.trace-photo__caption {
  margin-top: 0.35rem;
  text-align: center;
  font-size: 0.95rem;
  font-style: italic;
  color: var(--heading);
}

.trace-copy h3 {
  margin: 0 0 0.75rem;
  font-size: 1.4rem;
  line-height: 1.2;
  color: var(--heading);
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
  color: #fca5a5;
  background: rgba(225, 43, 53, 0.15);
}

.pill-green {
  color: #86efac;
  background: rgba(46, 184, 97, 0.14);
}

.pill-orange {
  color: #fcd34d;
  background: rgba(245, 159, 11, 0.2);
}

.pill-blue {
  color: #7dd3fc;
  background: rgba(40, 166, 237, 0.16);
}

.pill-purple {
  color: #c4b5fd;
  background: rgba(124, 58, 237, 0.15);
}

.pill-teal {
  color: #5eead4;
  background: rgba(13, 148, 136, 0.16);
}

.pill-pink {
  color: #f9a8d4;
  background: rgba(219, 39, 119, 0.14);
}

.pill-brown {
  color: #d6b08c;
  background: rgba(146, 99, 55, 0.18);
}

:deep(strong) {
  color: var(--heading);
  font-weight: 700;
}

:deep(.hl) {
  padding: 0.02rem 0.28rem;
  border-radius: 0.35rem;
  font-weight: 600;
}

:deep(.hl--plain) {
  padding-left: 0;
  padding-right: 0;
  background: transparent;
}

:deep(.hl-red) {
  color: #fca5a5;
  background: rgba(225, 43, 53, 0.15);
}

:deep(.hl-green) {
  color: #86efac;
  background: rgba(46, 184, 97, 0.16);
}

:deep(.hl-orange) {
  color: #fcd34d;
  background: rgba(245, 159, 11, 0.2);
}

:deep(.hl-blue) {
  color: #7dd3fc;
  background: rgba(40, 166, 237, 0.16);
}

:deep(.hl-purple) {
  color: #c4b5fd;
  background: rgba(124, 58, 237, 0.15);
}

:deep(.hl-teal) {
  color: #5eead4;
  background: rgba(13, 148, 136, 0.16);
}

:deep(.hl-pink) {
  color: #f9a8d4;
  background: rgba(219, 39, 119, 0.14);
}

:deep(.hl-brown) {
  color: #d6b08c;
  background: rgba(146, 99, 55, 0.18);
}

.textCard {
  margin: 1.1rem 0 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text);
}

.textCard.muted {
  color: var(--text-muted);
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
  color: var(--text);
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
  color: var(--heading);
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
  background: rgba(148, 163, 184, 0.16);
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
  background: rgba(148, 163, 184, 0.08);
  border-left: 4px solid var(--border-strong);
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
  color: var(--heading);
}

.eval-verdict__text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
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
  color: #86efac;
  background: rgba(46, 184, 97, 0.16);
  border-color: rgba(46, 184, 97, 0.4);
}

.level-acquis {
  color: #7dd3fc;
  background: rgba(40, 166, 237, 0.16);
  border-color: rgba(40, 166, 237, 0.4);
}

.level-consolider {
  color: #fcd34d;
  background: rgba(245, 159, 11, 0.2);
  border-color: rgba(245, 159, 11, 0.45);
}

.internal-nav {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.internal-nav__tab {
  position: relative;
  border: 0;
  padding: 0.9rem 1.1rem;
  border-radius: 0.65rem 0.65rem 0 0;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
  font-weight: 700;
  opacity: 0.75;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
}

.internal-nav__tab:hover {
  background: rgba(255, 255, 255, 0.12);
  color: var(--heading);
  opacity: 1;
}

.internal-nav__tab--active {
  background: var(--surface);
  color: var(--heading);
  opacity: 1;
  box-shadow: inset 0 3px 0 0 var(--accent), 0 -4px 12px rgba(37, 99, 235, 0.25);
}

.internal-nav__tab--active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 3px;
  background: var(--surface);
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

  .trace-photo {
    float: none;
    width: 100%;
    max-width: 100%;
    margin: 0 0 0.75rem;
  }
}
</style>
