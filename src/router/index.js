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
  history: createWebHistory(),
  routes,
});

export default router;
