<script lang="ts" setup>
  import { store } from './store/store';
  import { onMounted } from "vue";
  import { registerApp } from "@/api/mastodon";
  
  onMounted(async () => {
    if (store.client_id === null) {
      await registerApp();
    }
  });
</script>

<template>
  <nav>
    <ul>
      <li><RouterLink to="/">Index</RouterLink></li>
      <li><RouterLink to="/info">Instance information</RouterLink></li>
      <li v-if="store.client_token !== null"><RouterLink to="/home">Home timeline</RouterLink></li>
    </ul>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
