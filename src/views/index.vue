<template>
  <section class="home-page">
    <div class="titleCard">
      <h2>Présentation</h2>
      <p class="textCard">
        Ce site présente les savoir-faire et savoirs-être que j'ai acquis tout
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
        Les conditions de travail ont été très favorables : un open space calme,
        une connexion internet stable, un accès direct et permanent au maître de
        stage pour échanger sur les choix techniques, et une grande autonomie
        sur l'organisation de mon temps.
      </p>
      <p class="textCard">
        Une solution de gestion de connexion existe déjà au sein d'APPUP,
        développée en interne par le responsable. Cependant, elle n'est pas
        directement réutilisable dans le cadre du sujet de stage. Le projet
        consiste donc à <strong>concevoir et développer depuis zéro une API
        REST de connexion et un site e-commerce fictif</strong> qui s'appuie
        dessus. L'objectif est double : produire un apprentissage concret sur
        une stack complète (backend + frontend + services tiers), et obtenir une
        base réutilisable pour de futurs projets.
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
          en Node.js / Express / PostgreSQL avec un TableBuilder maison pour les
          requêtes SQL paramétrées et une génération automatique des services à
          partir des tables autorisées.
        </li>
        <li>
          Mise en place d'un
          <router-link
            class="skill-link"
            :to="{ name: 'technique', query: { section: 'trace1' } }"
            >système d'authentification</router-link
          >
          complet : Basic
          Auth, clé d'API par header, niveaux d'accès,
          inscription avec code de vérification par mail, réinitialisation du mot de passe par
          token, hashage bcrypt.
        </li>
        <li>
          Intégration de
          <router-link
            class="skill-link"
            :to="{ name: 'technique', query: { section: 'trace2' } }"
            >trois services tiers majeurs</router-link
          >
          : <strong>Stripe</strong> (paiement, abonnements, Customer Portal,
          webhooks), <strong>Brevo</strong> (mails transactionnels avec
          templates en base) et <strong>AWS S3</strong> (stockage des photos
          d'articles via multer-s3).
        </li>
        <li>
          Développement d'un site e-commerce en <strong>Vue 3 / Vite</strong> :
          catalogue, panier persistant, espace utilisateur, tableau de bord
          admin (gestion des produits, utilisateurs, configuration globale) et
          tarif réduit pour les membres premium.
        </li>
        <li>
          Conception d'un
          <router-link
            class="skill-link"
            :to="{ name: 'technique', query: { section: 'trace3' } }"
            >lecteur d'affichage dynamique</router-link
          >
          piloté par un
          fichier JSON distant (vidéo, site ou image, orientation
          configurable), déployable en mode kiosque sur Raspberry Pi, borne
          tactile et PC Windows.
        </li>
        <li>
          <router-link
            class="skill-link"
            :to="{ name: 'suivi', query: { section: 'trace1' } }"
            >Organisation autonome du travail</router-link
          >
          (planification, jalons hebdomadaires), gestion d'un cahier des charges
          évolutif et points réguliers avec le maître de stage.
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
