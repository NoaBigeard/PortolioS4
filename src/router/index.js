import { createRouter, createWebHistory } from "vue-router";
import index from "../views/index.vue";
import technique from "../views/technique.vue";
import suivi from "../views/suivi.vue";
import integration from "../views/integration.vue";

const routes = [
  { path: "/", name: "index", component: index },
  { path: "/technique", name: "technique", component: technique },
  { path: "/suivi", name: "suivi", component: suivi },
  { path: "/integration", name: "integration", component: integration },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // À chaque changement de page, on revient en haut. On respecte toutefois
  // la position mémorisée lors d'un retour/avance via les boutons du navigateur.
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { top: 0 };
  },
});

export default router;
