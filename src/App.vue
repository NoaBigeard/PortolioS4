<template>
  <div class="app-shell">
    <NavigationBar />
    <main class="page-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavigationBar from "./components/navigationBar.vue";
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
}

.page-content {
  padding: 2rem 1.25rem 3rem;
}

@media (min-width: 768px) {
  .page-content {
    padding: 2.5rem 2.5rem 4rem;
  }
}
</style>
