<template>
  <nav class="site-nav" aria-label="Navigation principale">
    <div class="brand">
      <span class="brand-mark" aria-hidden="true"></span>
      <div class="nameAndMail">
        <span>Noa BIGEARD - noabigeard@edu.univ-fcomte.fr</span>
      </div>
    </div>

    <ul class="nav-links">
      <li>
        <router-link :to="{ name: 'index' }">Accueil</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'technique' }">Technique</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'suivi' }">Suivi de projet</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'integration' }">Intégration</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.site-nav {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(245, 239, 226, 0.92);
  border-bottom: 1px solid rgba(24, 58, 42, 0.14);
  backdrop-filter: blur(10px);
}
.nameAndMail {
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.2;
  text-transform: none;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: #183a2a;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}

.brand-mark {
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 999px;
  background: #183a2a;
  box-shadow: 0 0 0 6px rgba(24, 58, 42, 0.1);
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.65rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.72rem 1rem;
  border-radius: 999px;
  text-decoration: none;
  color: #183a2a;
  font-weight: 600;
  line-height: 1;
  background: rgba(255, 250, 242, 0.9);
  border: 1px solid rgba(24, 58, 42, 0.12);
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.nav-links a:hover {
  transform: translateY(-1px);
  background: #efe0c5;
  border-color: rgba(24, 58, 42, 0.2);
}

.nav-links a.router-link-active,
.nav-links a.router-link-exact-active {
  background: #183a2a;
  color: #f7f3ea;
  border-color: #183a2a;
}

@media (max-width: 720px) {
  .site-nav {
    flex-direction: column;
    align-items: stretch;
  }

  .nav-links {
    justify-content: flex-start;
  }
}
</style>
