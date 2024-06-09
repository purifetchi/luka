<script lang="ts" setup>
  // noinspection TypeScriptCheckImport
  import { store } from './store/store';
  import { onMounted } from "vue";
  // noinspection TypeScriptCheckImport
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
