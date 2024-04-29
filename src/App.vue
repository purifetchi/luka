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
  <RouterView />
</template>

<style scoped>

</style>
