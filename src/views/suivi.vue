<template>
  <section class="technique-page">
    <div class="titleCard">
      <h2>Présentation et évaluation des savoir-faire de suivi de projet</h2>
      <p class="introText">
        Cette partie présente la manière dont j'ai cadré, planifié et suivi
        l'avancée du projet : du recueil du besoin jusqu'au pilotage au jour le
        jour.
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
import trelloImage from "../assets/trello-sprints.png";
import gitImage from "../assets/git-suivi.svg";

const sections = [
  {
    id: "trace1",
    label: "Trello",
    title: "Pilotage des tâches avec Trello — sprints et story points",
    skills: [
      {
        label: "recueillir le besoin du client",
        color: "red",
        keywords: ["recueillir le besoin du client"],
      },
      {
        label: "transformer le besoin en backlog",
        color: "green",
        keywords: ["transformer le besoin en backlog"],
      },
      {
        label: "découper et estimer les tâches",
        color: "orange",
        keywords: ["découper et estimer les tâches"],
      },
      {
        label: "piloter l'avancement par sprints",
        color: "blue",
        keywords: ["piloter l'avancement par sprints"],
      },
    ],
    image: trelloImage,
    imageAlt:
      "Capture du tableau Trello du projet : colonnes Bac à sable, Sprint to do / en cours / done et Récolte Sprint avec des story points",
    caption:
      "Trace 4 : tableau Trello — du backlog aux sprints, avec estimation en story points",
    frames: [
      { color: "blue", x: "0.4%", y: "3%", w: "16%", h: "94%", label: "Backlog" },
      {
        color: "orange",
        x: "18%",
        y: "2%",
        w: "56.5%",
        h: "48%",
        label: "Flux du sprint",
      },
      {
        color: "red",
        x: "75.7%",
        y: "3%",
        w: "18.3%",
        h: "94%",
        label: "Récolte Sprint 1",
      },
    ],
    intro:
      "La trace n°4 est une capture de mon tableau **Trello**, l'**outil de gestion de projet** utilisé tout au long du stage. Au-delà du développement de l'API et du site e-commerce, il fallait organiser le travail, décider quoi faire en premier et rendre compte de l'avancement à mon maître de stage : Trello a été le support de cette organisation. Le tableau se lit de gauche à droite et suit le cycle de vie d'une tâche, des besoins bruts jusqu'aux fonctionnalités terminées, comme le détaillent les encadrés de couleur ci-dessous.",
    paragraphs: [
      "Tout commence à gauche, dans l'encadré bleu, le « **Bac à sable** ». C'est là que je devais d'abord recueillir le besoin du client : chaque demande de **Marouane**, formulée à l'oral, y était notée pour ne rien perdre. Je pouvais ensuite transformer le besoin en backlog en créant une carte pour chaque fonctionnalité à développer.",
      "Avant de lancer une tâche, l'étape suivante était de découper et estimer les tâches. Le découpage passe par la **checklist** de chaque carte, qui éclate la fonctionnalité en sous-tâches concrètes ; l'estimation, elle, se lit sur les pastilles de couleur des cartes : ce sont des **story points**, inspirés de la suite de **Fibonacci**, qui mesurent l'effort de chaque tâche et évitent de surcharger un sprint.",
      "Au centre, l'encadré orange montre comment je pouvais piloter l'avancement par sprints. Une carte tirée du backlog progresse de « **Sprint to do** » à « **Sprint en cours** » puis « **Sprint done** » : ce flux donne en un coup d'œil l'état d'avancement de la semaine.",
      "À droite, l'encadré rouge correspond à la colonne « **Récolte Sprint 1** » : elle regroupe les tâches que j'ai terminées durant la première semaine de stage. Garder cette récolte d'un sprint à l'autre permet de visualiser concrètement ce qui a été livré et de mesurer la progression du projet.",
      "Je suis resté sur une utilisation volontairement légère de Trello : il m'a surtout servi de **fil conducteur** pour ne pas perdre de vue les fonctionnalités issues du **cahier des charges** et garder une trace de ce qui était fait, en cours ou à faire.",
    ],
    footer:
      "Cette trace montre comment un outil de gestion de projet, même utilisé simplement, permet de transformer un besoin en tâches estimées et d'en suivre l'avancement.",
  },
  {
    id: "trace2",
    label: "Versioning",
    title: "Versioning Git et réunions de suivi",
    skills: [
      {
        label: "versionner régulièrement le code",
        color: "red",
        keywords: ["versionner régulièrement le code"],
      },
      {
        label: "rédiger des messages de commit clairs",
        color: "green",
        keywords: ["rédiger des messages de commit clairs"],
      },
      {
        label: "recueillir un retour en réunion de suivi",
        color: "orange",
        keywords: ["recueillir un retour en réunion de suivi"],
      },
      {
        label: "ajuster le travail après un retour",
        color: "blue",
        keywords: ["ajuster le travail après un retour"],
      },
    ],
    image: gitImage,
    imageAlt:
      "Frise des 7 commits du projet APIConnection, du 29 avril au 4 juin, avec les commits du 4 mai reliés à une réunion de suivi et le dernier poussé sur GitHub",
    caption:
      "Trace 5 : historique des commits du projet, relié aux retours de réunion",
    intro:
      "La trace n°5 retrace l'historique **Git** du projet **APIConnection**. Versionner régulièrement le code et tenir des réunions de suivi font partie des mécanismes de suivi de projet attendus pendant le stage.",
    paragraphs: [
      "Chaque commit marque une étape datée et nommée poussée sur **GitHub**. Rédiger des messages de commit clairs permet de relire l'avancement comme un **journal de bord** et de retrouver à quel moment chaque fonctionnalité est arrivée.",
      "Les deux **commits du 4 mai**, en orange sur la frise, illustrent le lien entre versioning et réunions de suivi. Lors d'un point avec mon maître de stage, j'ai noté deux corrections à apporter: passer les identifiants en **session** plutôt qu'en **localStorage**, et remplacer l'envoi du mail + mot de passe par du **Basic Auth**. Recueillir un retour en réunion de suivi, puis ajuster le travail après un retour, s'est traduit directement par les commits qui ont suivi.",
      "Avec **7 commits** sur la durée du stage, mon rythme de versioning est resté modeste : j'ai eu tendance à regrouper plusieurs jours de travail dans un même commit. C'est précisément le point que je veux améliorer, comme détaillé dans le bilan.",
    ],
    footer:
      "Cette trace montre que le dépôt Git, couplé aux retours de réunion, sert de mémoire du projet : on y lit la chronologie des fonctionnalités et l'impact concret des points de suivi.",
  },
  {
    id: "bilan",
    label: "Bilan / Évaluation",
    title: "Bilan",
    intro:
      "Le bilan du suivi de projet reprend les deux savoir-faire travaillés : le pilotage des tâches avec un outil de gestion (Trello) et la participation aux mécanismes de suivi (versioning et réunions de suivi). Au-delà des outils, le fil conducteur a été de garder en permanence une trace de ce qui est fait, en cours et à faire.",
    footer:
      "Ce bilan donne une vision claire de ma compréhension des outils de suivi de projet et de la principale marge de progression : davantage de régularité dans le versioning et un suivi plus rigoureux et mieux documenté.",
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
    "Cette trace portait sur le pilotage des tâches. Avec Trello, j'ai appris à recueillir le besoin du client, à transformer le besoin en backlog, puis à découper et estimer les tâches en story points pour enfin piloter l'avancement par sprints.",
  trace2:
    "Cette trace portait sur les mécanismes de suivi. J'ai pris l'habitude de versionner régulièrement le code et de rédiger des messages de commit clairs, et surtout d'apprendre à recueillir un retour en réunion de suivi puis à ajuster le travail après un retour, comme le montrent les commits du 4 mai.",
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
    text: "Je sais  structurer un projet en backlog, sprints et story points  avec Trello. Mon utilisation est toutefois restée  légère  : je n'ai pas tenu le tableau à jour tous les jours et je n'ai pas exploité les  indicateurs  (burnup, vélocité). C'est un outil que je veux  utiliser plus rigoureusement .",
  },
  trace2: {
    level: "consolider",
    text: "Le  lien réunion de suivi → action  est clair, mais mon  rythme de commits reste trop espacé  (6 commits, des journées entières regroupées). Je veux  committer plus souvent , adopter une  convention de messages  et formaliser des  comptes-rendus de réunion datés  dans le dépôt.",
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
// (mot pour mot) et les renvois aux cadres de la capture,
// avec la même couleur que la pastille / le cadre correspondant.
const highlightSkills = (text, section) => {
  const entries = [];
  (section?.skills ?? []).forEach((skill) => {
    (skill.keywords ?? []).forEach((keyword) =>
      entries.push({ keyword, color: skill.color, plain: false }),
    );
  });
  // Les renvois aux cadres ("encadré bleu"…) sont colorés mais sans fond.
  (section?.highlights ?? []).forEach((highlight) =>
    entries.push({ keyword: highlight.text, color: highlight.color, plain: true }),
  );
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

.trace-photo__caption {
  margin-top: 0.35rem;
  text-align: center;
  font-size: 0.95rem;
  font-style: italic;
  color: var(--heading);
}

/* Trace avec cadres (Trello) : pas de cadre/padding autour pour que
   les cadres colorés s'alignent au pixel sur la capture. */
.trace-layout--framed .trace-photo__image {
  padding: 0;
  overflow: visible;
}

/* Cadres de couleur superposés sur la capture */
.trace-frame {
  position: absolute;
  border: 3px solid var(--fc, var(--heading));
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
  background: var(--fc, var(--heading));
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
.trace-frame--blue {
  --fc: #1e87c4;
}
.trace-frame--green {
  --fc: #1f9a52;
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

:deep(strong) {
  color: var(--heading);
  font-weight: 700;
}

:deep(.hl) {
  padding: 0.02rem 0.28rem;
  border-radius: 0.35rem;
  font-weight: 600;
}

/* Renvois aux cadres ("encadré bleu"…) : texte coloré sans fond. */
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
