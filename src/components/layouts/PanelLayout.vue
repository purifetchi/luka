<script lang="ts" setup>

import SidePanelUserCard from "@/components/SidePanelUserCard.vue";
import {FwbButton} from "flowbite-vue";
import {logout} from "@/api/mastodon";
import { router } from "@/router/router.js";

let doLogout = async () => {
  await logout();
  router.replace("/");
};
</script>

<template>
  <div class="flex flex-row justify-around">
    <aside class="hidden md:block">
      <div class="sticky top-0">
        <h1>Luka</h1>
        <br>
        <SidePanelUserCard />
        <br>
        <RouterLink to="/timelines/home">Home</RouterLink>
        <br>
        <RouterLink to="/timelines/public">Public</RouterLink>
        <br>
        <fwb-button @click="doLogout()">Logout</fwb-button>
      </div>
    </aside>
    <main class="max-w-2xl w-full">
      <slot></slot>
    </main>
    <aside class="hidden md:block">
      <div class="sticky top-0">
        wah
      </div>
    </aside>
  </div>
</template>

<style scoped>

</style>