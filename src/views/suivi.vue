<template>
  <section class="technique-page">
    <div class="titleCard">
      <h2>Présentation et évaluation des savoir-faire de suivi de projet</h2>
      <p class="introText">
        Cette partie présente la manière dont j'ai cadré, planifié et suivi
        l'avancée du projet : du cahier des charges initial jusqu'au pilotage au
        jour le jour.
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
      <div class="trace-layout">
        <figure class="trace-photo" aria-label="Emplacement pour une photo">
          <div class="trace-photo__image">
            <img :src="currentSection.image" :alt="currentSection.imageAlt" />
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
              :key="skill">
              <span class="pill" :class="skillPillClass(index)">{{
                skill
              }}</span
              ><span v-if="index < currentSection.skills.length - 1">, </span>
            </template>
          </p>

          <p class="textCard">{{ currentSection.intro }}</p>

          <p
            v-for="paragraph in currentSection.paragraphs"
            :key="paragraph"
            class="textCard">
            {{ paragraph }}
          </p>

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
import trace1Image from "../assets/hero.png";
import trace2Image from "../assets/captureTrace1.png";

const sections = [
  {
    id: "trace1",
    label: "Cadrage",
    title: "Cadrage du sujet et rédaction du cahier des charges",
    skills: [
      "reformuler le besoin du client",
      "découper un sujet en livrables",
      "identifier les contraintes techniques",
      "prioriser les fonctionnalités",
    ],
    image: trace1Image,
    imageAlt: "Schéma du cahier des charges",
    caption: "Trace 1 : découpage initial du projet en lots fonctionnels",
    intro:
      "La première phase du stage a consisté à transformer la demande initiale (« une API de connexion + un site e-commerce ») en un cahier des charges exploitable, avec des fonctionnalités classées par priorité et un découpage en lots.",
    paragraphs: [
      "J'ai d'abord listé les besoins métier avec Marouane : inscription, connexion, gestion des produits, panier, paiement, factures, abonnement premium, espace admin, gestion des photos. Pour chaque besoin, j'ai noté la table associée (users, articles, carts, cart_items, orders, photos, etc.) et les contraintes (soft delete, niveaux d'accès, vérification mail).",
      "J'ai ensuite hiérarchisé les fonctionnalités en trois lots : (1) socle technique — API générique, authentification, CRUD ; (2) parcours utilisateur — catalogue, panier, paiement Stripe ; (3) extensions — abonnement premium, Customer Portal, lecteur d'affichage dynamique. Cette priorisation a permis d'éviter de m'éparpiller et de livrer le socle avant d'attaquer les bonus.",
      "Le cahier des charges a évolué pendant le stage : par exemple, l'idée du lecteur d'affichage dynamique déployable sur plusieurs supports (Raspberry, borne en mode kiosque, PC Windows) est apparue en cours de route et a été ajoutée au lot 3 sans remettre en cause les lots déjà livrés.",
    ],
    footer:
      "Cette trace montre qu'un découpage explicite en lots permet de mesurer l'avancement et d'absorber les nouvelles idées sans perdre la cohérence du projet.",
  },
  {
    id: "trace2",
    label: "Planning",
    title: "Planification et suivi hebdomadaire",
    skills: [
      "planifier les tâches par priorité",
      "définir des jalons hebdomadaires",
      "suivre l'avancement avec des indicateurs simples",
      "adapter le planning selon les imprévus",
    ],
    image: trace2Image,
    imageAlt: "Planning hebdomadaire du stage",
    caption: "Trace 2 : suivi hebdomadaire des tâches et jalons",
    intro:
      "Le stage de 9 semaines (7 avril – 5 juin 2026) a été organisé par jalons hebdomadaires, chaque semaine ciblant une fonctionnalité ou un service tiers à finaliser.",
    paragraphs: [
      "Les premières semaines ont été consacrées au socle : pool PostgreSQL, TableBuilder générique, génération auto des services, middleware d'auth (apiKey + Basic Auth + access_level), inscription / vérification mail / reset password. Le frontend Vue 3 (catalogue, fiche produit, panier) est arrivé en parallèle pour valider l'API par l'usage.",
      "Les semaines suivantes ont été dédiées à l'intégration des services tiers : Stripe (Checkout, Customer Portal, webhooks, abonnement premium), Brevo (templates en base, mails transactionnels), AWS S3 (multer-s3 + UUID + ACL public-read). Une semaine a aussi été réservée au lecteur d'affichage dynamique piloté par JSON, déployé en mode kiosque sur Raspberry, borne et PC Windows.",
      "Le planning a été ajusté plusieurs fois : par exemple, le passage de localStorage à sessionStorage pour les credentials, et le passage de mail+password dans le body à du Basic Auth standard, n'étaient pas prévus initialement mais ont été ajoutés suite à des remarques du maître de stage (cf. fichier « Ce qu'il faut faire.txt » du 4 mai).",
    ],
    footer:
      "Cette trace montre comment un planning court et adaptatif a permis de livrer chaque semaine quelque chose de testable, tout en absorbant les retours.",
  },
  {
    id: "trace3",
    label: "Livrables",
    title: "Gestion des livrables et points de validation",
    skills: [
      "documenter l'état des livrables",
      "préparer un compte-rendu clair",
      "prioriser les corrections avant livraison",
      "communiquer les blocages et solutions",
    ],
    image: trace2Image,
    imageAlt: "Capture Postman validant une route",
    caption: "Trace 3 : validation d'une route avant livraison",
    intro:
      "À chaque fin de lot, un point de validation était organisé avec Marouane pour valider la conformité au cahier des charges et décider de la suite.",
    paragraphs: [
      "Pour chaque livrable, je préparais une démonstration courte (5–10 min) : scénario utilisateur exécuté depuis le frontend pour les fonctionnalités visibles, ou suite de requêtes Postman pour les routes purement API. Les logs (accessLog, errorLog) étaient consultables en parallèle pour montrer le comportement côté serveur.",
      "Avant chaque démo, je passais en revue les cas d'erreur (mail déjà utilisé, mot de passe trop court, panier vide, carte refusée, ACL S3, signature webhook invalide) pour ne pas être pris au dépourvu pendant la présentation. Les corrections de dernière minute étaient triées par impact utilisateur.",
      "Quand un blocage technique ne pouvait pas être résolu seul (ex. configuration des webhooks Stripe avec le raw body Express ou la gestion du current_period_end qui a changé d'emplacement dans l'objet subscription), je l'identifiais clairement dans le compte-rendu en proposant une ou deux pistes avant d'arriver au point.",
    ],
    footer:
      "Cette trace illustre la rigueur appliquée aux points de validation : démo courte, cas d'erreur passés en revue, blocages explicités avec piste de solution.",
  },
  {
    id: "bilan",
    label: "Bilan",
    title: "Bilan du suivi de projet",
    intro:
      "Le suivi de projet pendant ce stage m'a appris à transformer un sujet large en une suite de livrables tenables, et à m'auto-piloter sur 9 semaines sans qu'un chef de projet ne séquence les tâches à ma place.",
    paragraphs: [
      "Le découpage initial en trois lots (socle, parcours utilisateur, extensions) a tenu jusqu'à la fin et a évité l'effet tunnel : à chaque fin de semaine, quelque chose était démontrable, même imparfait.",
      "La planification hebdomadaire a montré ses limites quand un service tiers prenait plus de temps que prévu (les webhooks Stripe en particulier). J'ai appris à introduire des marges et à ne pas planifier deux nouvelles intégrations la même semaine.",
      "Sur les livrables, le principal apprentissage est qu'une démo courte et préparée vaut bien mieux qu'une démo longue improvisée : elle force à filtrer ce qui est vraiment significatif et elle met en valeur le travail réalisé.",
      "Si je devais recommencer, je formaliserais davantage les comptes-rendus de point (un fichier daté commité dans le repo) pour garder une trace écrite des arbitrages.",
    ],
    footer:
      "Le bilan de suivi de projet montre une montée en autonomie sur la gestion d'un projet logiciel de bout en bout, du cadrage à la livraison.",
  },
];

const activeSection = ref("trace1");

const skillPillClass = (index) => {
  const classes = ["pill-red", "pill-green", "pill-orange", "pill-blue"];
  return classes[index % classes.length];
};

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

.trace-layout {
  display: flex;
  gap: 1.5rem;
  align-items: start;
  margin-top: 1rem;
}

.trace-photo {
  flex: 0 0 28%;
  max-width: 28%;
  min-height: 240px;
  margin: 0;
  border-radius: 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 0;
}

.trace-copy {
  flex: 1;
  min-width: 0;
}

.trace-photo__image {
  flex: 1;
  min-height: 220px;
  border-radius: 0.9rem;
  border: 2px solid rgba(24, 58, 42, 0.16);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.45);
}

.trace-photo__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.trace-photo__caption {
  margin-top: 0.35rem;
  text-align: center;
  font-size: 0.95rem;
  color: #183a2a;
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

.textCard {
  margin: 1.1rem 0 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #27483b;
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
    max-width: 100%;
    min-height: 200px;
  }

  .trace-photo__image {
    min-height: 180px;
  }
}
</style>
