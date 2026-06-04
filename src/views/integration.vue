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
    label: "Environnement",
    title: "Prise en main de l'environnement de travail chez APPUP",
    skills: [
      "découvrir l'organisation interne de l'entreprise",
      "configurer son poste de développement",
      "respecter les conventions de code existantes",
      "demander le bon niveau d'information au bon moment",
    ],
    image: trace1Image,
    imageAlt: "Vue de l'open space d'APPUP",
    caption: "Trace 1 : poste de travail mis à disposition chez APPUP",
    intro:
      "La première semaine a été consacrée à la prise en main de l'environnement de travail : installation des outils, accès aux ressources internes, compréhension du fonctionnement de l'entreprise et des méthodes de travail attendues.",
    paragraphs: [
      "Côté technique, j'ai installé Node.js, PostgreSQL en local, VS Code avec les extensions ESLint et Prettier, Postman pour tester l'API, et configuré Git avec le dépôt distant. J'ai aussi pris en main le terminal PowerShell sous Windows, qui est l'environnement de référence sur mon poste.",
      "Côté organisation, j'ai été accueilli par Marouane FEKKAR, fondateur d'APPUP, qui m'a expliqué le périmètre du sujet : développer une API REST réutilisable et un site e-commerce fictif qui s'appuie dessus. Une solution de connexion existait déjà en interne mais n'était pas exploitable pour mon stage, ce qui justifiait de tout repartir de zéro.",
      "L'open space partagé avec Alban CHOULET, autre étudiant de l'IUT NFC, a permis d'échanger régulièrement sur les choix techniques, de croiser les regards sur le code et de gagner en autonomie sans rester bloqué.",
    ],
    footer:
      "Cette trace montre comment j'ai posé les bases pratiques et humaines de mon stage avant d'attaquer le développement.",
  },
  {
    id: "trace2",
    label: "Communication",
    title: "Communication et points avec le maître de stage",
    skills: [
      "présenter clairement les avancées",
      "intégrer les retours rapidement",
      "justifier les choix techniques à l'oral",
      "savoir signaler un blocage tôt",
    ],
    image: trace2Image,
    imageAlt: "Capture d'une route testée sur Postman",
    caption: "Trace 2 : démonstration d'une route API à Marouane sur Postman",
    intro:
      "Tout au long du stage, j'ai mis en place un rythme régulier de points avec Marouane FEKKAR pour valider les choix d'architecture et arbitrer les priorités fonctionnelles.",
    paragraphs: [
      "Les points avaient lieu à la demande, le plus souvent à la fin d'une fonctionnalité importante (mise en place du TableBuilder, intégration Stripe, ajout des abonnements, etc.). Je préparais à chaque fois une démonstration courte : une route testée sur Postman, ou un scénario complet réalisé depuis le frontend Vue.",
      "Plusieurs choix ont été ajustés suite à ces échanges. Par exemple, l'authentification par mail + mot de passe envoyée dans le body a été remplacée par du Basic Auth standard transmis dans le header Authorization. De même, le stockage des credentials est passé de localStorage à sessionStorage pour réduire la surface d'attaque côté navigateur.",
      "Quand je rencontrais un blocage (configuration des webhooks Stripe, gestion du raw body Express pour la signature, ACL S3 sur les images uploadées), je formulais la question écrite avant de la poser : cela m'a souvent permis de trouver la réponse seul, et quand ce n'était pas le cas, l'échange avec Marouane était beaucoup plus efficace.",
    ],
    footer:
      "Cette trace illustre la mise en place d'une communication courte, régulière et orientée résultat avec le maître de stage.",
  },
  {
    id: "bilan",
    label: "Bilan",
    title: "Bilan d'intégration",
    intro:
      "L'intégration chez APPUP s'est faite progressivement, en mêlant prise en main technique, observation des pratiques internes et construction d'une relation de travail saine avec le maître de stage.",
    paragraphs: [
      "Sur le plan technique, le démarrage a été rapide grâce à un environnement déjà documenté et à un sujet clairement borné par Marouane. L'autonomie m'a été laissée très tôt, ce qui m'a obligé à structurer moi-même mon temps et à formaliser mes décisions plutôt que de les subir.",
      "Sur le plan humain, le fait d'être dans un open space restreint avec une autre étudiante (Alban) a fluidifié les échanges au quotidien : il était facile de demander un avis rapide sans interrompre le maître de stage pour des questions secondaires.",
      "Si je devais améliorer une chose, ce serait de documenter par écrit les décisions prises lors des points avec Marouane (un mini compte-rendu daté dans le repo), pour éviter de revenir plusieurs fois sur les mêmes sujets quelques semaines plus tard.",
    ],
    footer:
      "Le bilan d'intégration montre que les conditions étaient réunies pour produire un travail concret dès les premières semaines, et que la collaboration s'est appuyée sur des points courts mais réguliers.",
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
