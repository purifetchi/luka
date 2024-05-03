<script lang="ts" setup>

import SidePanelUserCard from "@/components/SidePanelUserCard.vue";
import { FwbButton } from "flowbite-vue";
import {logout} from "@/api/mastodon";
import { router } from "@/router/router.js";
import SidebarLink from "@/components/SidebarLink.vue";
import SidePanelNotificationCard from "@/components/SidePanelNotificationCard.vue";

let doLogout = async () => {
  await logout();
  router.replace("/");
};
</script>

<template>
  <div class="flex flex-row justify-center md:space-x-5">
    <aside class="hidden md:block">
      <div class="sticky top-0">
        <h1>Luka</h1>
        <br>
        <SidePanelUserCard />
        <SidebarLink href="/timelines/home">🏠 Home</SidebarLink>
        <SidebarLink href="/timelines/public">🌐 Public</SidebarLink>
        <fwb-button @click="doLogout()">Logout</fwb-button>
      </div>
    </aside>
    <main class="max-w-2xl w-full">
      <slot></slot>
    </main>
    <aside class="hidden md:block">
      <div class="sticky top-0">
        <SidePanelNotificationCard />
      </div>
    </aside>
  </div>
</template>

<style scoped>

</style>