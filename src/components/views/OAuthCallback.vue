<script setup>

import { FwbHeading } from "flowbite-vue";
import { loginFromOAuthFlow } from "@/api/mastodon";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";

const router = useRouter();

onBeforeMount(async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    await loginFromOAuthFlow(urlParams.get('code'));
    
    await router.replace("/timelines/home");
  } catch (e) {
    await router.replace("/");
  }
});
</script>

<template>
  <fwb-heading>Hang on...</fwb-heading>
</template>

<style scoped>

</style>