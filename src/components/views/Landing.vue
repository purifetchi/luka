<script setup>

import Login from "@/components/Login.vue";
import InstanceInformation from "@/components/InstanceInformation.vue";
import { store } from "@/store/store.js";
import { router } from "@/router/router.js";
import { onBeforeMount } from "vue";

onBeforeMount(() => {
  // If the client is logged in, skip to the home timeline.
  if (store.client_token !== null) {
    router.replace("/timelines/home");
  }
});

</script>

<template>
  <main class="h-screen flex items-center justify-center">
    <div class="flex items-center md:flex-row flex-col md:space-x-5 space-y-5">
      <InstanceInformation />
      <Login />
    </div>
  </main>
</template>

<style scoped>

</style>