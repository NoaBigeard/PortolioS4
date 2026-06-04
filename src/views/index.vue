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
      <h2>Contexte</h2>
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
        base réutilisable pour de futurs projets clients.
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
          Conception d'une <strong>API REST générique</strong> en Node.js /
          Express / PostgreSQL avec un TableBuilder maison pour les requêtes SQL
          paramétrées et une génération automatique des services à partir des
          tables autorisées.
        </li>
        <li>
          Mise en place d'un système d'authentification complet : Basic Auth,
          clé d'API par header, niveaux d'accès (0 / 10 / 50 / 100), inscription
          avec code de vérification par mail, reset password par token, hashage
          bcrypt.
        </li>
        <li>
          Intégration de trois services tiers majeurs :
          <strong>Stripe</strong> (paiement, abonnements, Customer Portal,
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
          Conception d'un <strong>lecteur d'affichage dynamique</strong> piloté
          par un fichier JSON distant (vidéo, site ou image, orientation
          configurable), déployable en mode kiosque sur Raspberry Pi, borne
          tactile et PC Windows.
        </li>
        <li>
          Organisation autonome du travail (planification, jalons
          hebdomadaires), gestion d'un cahier des charges évolutif et points
          réguliers avec le maître de stage.
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup></script>

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
  background: rgba(255, 250, 242, 0.92);
  border: 1px solid rgba(24, 58, 42, 0.14);
  box-shadow: 0 20px 50px rgba(24, 58, 42, 0.08);
  backdrop-filter: blur(8px);
}

h2 {
  margin: 0;
  font-size: 35px;
  line-height: 1.05;
  color: #183a2a;
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

ul {
  margin: 1rem 0 0;
  padding-left: 1.4rem;
  color: #27483b;
  line-height: 1.7;
  font-size: 1.05rem;
}

ul li {
  margin-top: 0.45rem;
}

ul li strong {
  color: #183a2a;
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
