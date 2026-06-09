<template>
  <section class="home-page">
    <div class="titleCard">
      <h2>Présentation</h2>
      <p class="textCard">
        Ce site présente les savoir-faire et savoir-être que j'ai acquis tout
        au long de mon stage de BUT2 Informatique, réalisé du 7 avril au 5 juin
        2026 chez APPUP. Trois parties principales sont accessibles depuis le
        menu en haut à droite : les compétences techniques, le suivi de projet,
        et l'intégration dans l'entreprise.
      </p>
    </div>

    <div class="titleCard">
      <div class="context-head">
        <h2>Contexte</h2>
        <img
          class="appup-logo"
          :src="logoAppup"
          alt="Logo de l'entreprise APPUP" />
      </div>
      <p class="textCard">
        Le stage s'est déroulé chez <strong>APPUP</strong>, une entreprise basée
        à Montbéliard, spécialisée dans le développement de solutions web sur
        mesure. Mon maître de stage est <strong>Marouane FEKKAR</strong>,
        fondateur de l'entreprise. Pendant toute la durée du stage, j'ai
        également collaboré avec <strong>Alban CHOULET</strong>, étudiant de
        l'IUT Nord Franche-Comté, présent dans le même cadre.
      </p>
      <p class="textCard">
        APPUP dispose déjà d'une solution de gestion de connexion, développée en
        interne par le responsable. Elle n'avait toutefois pas vocation à être
        réutilisée pour ce stage : la démarche était avant tout
        <strong>pédagogique</strong>. Plutôt que de repartir de l'existant,
        l'idée était que je conçoive ma propre API d'authentification, pour en
        comprendre tous les rouages et obtenir une base que je maîtrise —
        réutilisable plus tard dans d'autres projets nécessitant un système de
        connexion.
      </p>
      <p class="textCard">
        Concrètement, le projet a consisté à <strong>concevoir et développer
        depuis zéro une API REST de connexion et un site e-commerce fictif</strong>
        qui s'appuie dessus. L'objectif est double : un apprentissage concret sur
        une stack complète (backend + frontend + services tiers) et une base
        réutilisable pour de futurs projets.
      </p>
      <p class="textCard">
        Les conditions de travail ont été très favorables : un open space calme,
        une connexion internet stable, un accès direct et permanent au maître de
        stage pour échanger sur les choix techniques, et une grande autonomie
        sur l'organisation de mon temps.
      </p>
    </div>

    <div class="titleCard">
      <h2>Synthèse</h2>
      <p class="textCard">
        Les savoir-faire mobilisés pendant ce stage couvrent à la fois la
        partie technique, l'organisation de projet et la collaboration en
        entreprise :
      </p>
      <ul>
        <li>
          Conception d'une
          <router-link
            class="skill-link"
            :to="{ name: 'technique', query: { section: 'trace1' } }"
            >API REST générique</router-link
          >
          en Node.js / Express / PostgreSQL : architecture en couches, classe
          TableBuilder réutilisable, génération automatique des services et
          authentification complète (clé d'API, Basic Auth, bcrypt).
        </li>
        <li>
          Intégration de
          <router-link
            class="skill-link"
            :to="{ name: 'technique', query: { section: 'trace2' } }"
            >trois services tiers</router-link
          >
          : <strong>Stripe</strong> (paiement, abonnements, webhooks),
          <strong>Brevo</strong> (mails transactionnels) et
          <strong>AWS S3</strong> (stockage des photos d'articles).
        </li>
        <li>
          Conception d'un
          <router-link
            class="skill-link"
            :to="{ name: 'technique', query: { section: 'trace3' } }"
            >afficheur multi-support</router-link
          >
          piloté par un fichier JSON distant (vidéo, site ou image),
          déployable en mode kiosque sur Raspberry Pi, borne tactile et PC
          Windows.
        </li>
        <li>
          <router-link
            class="skill-link"
            :to="{ name: 'suivi', query: { section: 'trace1' } }"
            >Pilotage des tâches avec Trello</router-link
          >
          : recueil du besoin, backlog, découpage en story points et
          avancement par sprints.
        </li>
        <li>
          <router-link
            class="skill-link"
            :to="{ name: 'suivi', query: { section: 'trace2' } }"
            >Versioning Git et réunions de suivi</router-link
          >
          : historique de commits relié aux retours du maître de stage et aux
          ajustements qui ont suivi.
        </li>
        <li>
          <router-link
            class="skill-link"
            :to="{ name: 'integration', query: { section: 'trace1' } }"
            >Prise en main de l'environnement</router-link
          >
          chez APPUP : préparation du projet en local, découverte de
          l'organisation interne et autonomie progressive.
        </li>
        <li>
          <router-link
            class="skill-link"
            :to="{ name: 'integration', query: { section: 'trace2' } }"
            >Communication avec le maître de stage</router-link
          >
          : démonstrations concrètes, justification des choix techniques à
          l'oral et signalement précoce des blocages.
        </li>
      </ul>

      <div class="tech-band" aria-label="Technologies utilisées">
        <p class="tech-band__label">Technologies utilisées</p>
        <ul class="tech-list">
          <li v-for="tech in technologies" :key="tech.name" class="tech-chip">
            <img :src="tech.logo" :alt="`Logo ${tech.name}`" />
            <span class="tech-chip__name">{{ tech.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import logoAppup from "../assets/LogoAppup.png";
import nodeLogo from "../assets/tech/nodejs.svg";
import expressLogo from "../assets/tech/express.svg";
import postgresLogo from "../assets/tech/postgresql.svg";
import vueLogo from "../assets/tech/vue.svg";
import viteLogo from "../assets/tech/vite.svg";
import stripeLogo from "../assets/tech/stripe.svg";
import brevoLogo from "../assets/tech/brevo.svg";
import awsLogo from "../assets/tech/aws.svg";

// Logos SVG officiels (Simple Icons / vectorlogo.zone), en couleur de marque.
const technologies = [
  { name: "Node.js", logo: nodeLogo },
  { name: "Express", logo: expressLogo },
  { name: "PostgreSQL", logo: postgresLogo },
  { name: "Vue.js", logo: vueLogo },
  { name: "Vite", logo: viteLogo },
  { name: "Stripe", logo: stripeLogo },
  { name: "Brevo", logo: brevoLogo },
  { name: "AWS", logo: awsLogo },
];
</script>

<style scoped>
.home-page {
  display: grid;
  place-items: center;
}

.titleCard {
  min-width: 1200px;
  max-width: 1200px;
  padding: 1.5rem;
  margin-bottom: 20px;
  border-radius: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  backdrop-filter: blur(8px);
}

h2 {
  margin: 0;
  font-size: 35px;
  line-height: 1.05;
  color: var(--heading);
}

/* Entête de la carte Contexte : titre à gauche, logo APPUP à droite */
.context-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.appup-logo {
  width: 170px;
  max-width: 45%;
  height: auto;
  flex-shrink: 0;
}

/* Liens vers les traces détaillées dans les autres pages :
   surbrillance légère + repère visuel cliquable. */
.skill-link {
  font-weight: 600;
  color: var(--accent-soft);
  background: rgba(37, 99, 235, 0.16);
  border-radius: 0.3rem;
  padding: 0.02rem 0.32rem;
  text-decoration: none;
  border-bottom: 1.5px solid var(--accent);
  transition:
    background-color 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease;
}

.skill-link:hover,
.skill-link:focus-visible {
  background: rgba(37, 99, 235, 0.3);
  color: #dbeafe;
  border-color: var(--accent);
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

/* ---- Bande « Technologies utilisées » (bas de la Synthèse) ---- */
.tech-band {
  margin-top: 1.6rem;
  padding-top: 1.3rem;
  border-top: 1px solid var(--border);
}

.tech-band__label {
  margin: 0 0 0.9rem;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tech-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 92px;
  padding: 0.85rem 1.1rem;
  border-radius: 0.85rem;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  box-shadow: 0 6px 16px rgba(2, 6, 23, 0.35);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.tech-chip__name {
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1;
  color: #27483b;
}

.tech-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(2, 6, 23, 0.5);
}

/* Logos alignés par la hauteur optique pour une grille homogène */
.tech-chip img {
  width: auto;
  height: auto;
  max-height: 34px;
  max-width: 130px;
  object-fit: contain;
}

ul {
  margin: 1rem 0 0;
  padding-left: 1.4rem;
  color: var(--text);
  line-height: 1.7;
  font-size: 1.05rem;
}

ul li {
  margin-top: 0.45rem;
}

ul li strong {
  color: var(--heading);
}

@media (max-width: 720px) {
  .home-page {
    min-height: auto;
  }

  .titleCard {
    min-width: 0;
    max-width: 100%;
    padding: 1.5rem;
  }
}
</style>
