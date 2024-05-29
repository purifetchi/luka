<script lang="ts" setup>

import SidePanelUserCard from "@/components/SidePanelUserCard.vue";
import SidePanelNotificationCard from "@/components/SidePanelNotificationCard.vue";
import NavbarIconLink from "@/components/NavbarIconLink.vue";
import { ref } from "vue";
import { FwbInput } from "flowbite-vue";
import SearchBox from "@/components/SearchBox.vue";

const title = ref<string>(localStorage.getItem("timeline"));

let setNavbarTitle = (text: string) => {
  title.value = text;
  localStorage.setItem("timeline", text);
};

</script>

<template>
  <div class="flex flex-row justify-center md:space-x-5">
    <aside class="hidden max-w-[20rem] w-full md:block">
      <div class="sticky top-5">
        <SidePanelUserCard />
      </div>
    </aside>
    <main class="max-w-2xl w-full">
      <nav class="mb-2 backdrop-blur-3xl sticky top-0 z-50 flex justify-between">
        <div class="flex flex-1 box-border">
          <NavbarIconLink @timelineChanged="setNavbarTitle" class="p-2.5" icon="ri-home-4-line" url="/timelines/home" name="Home timeline" />
          <NavbarIconLink @timelineChanged="setNavbarTitle" class="p-2.5" icon="ri-community-line" url="/timelines/community" name="Community timeline" />
          <NavbarIconLink @timelineChanged="setNavbarTitle" class="p-2.5" icon="ri-global-line" url="/timelines/public" name="Public timeline" />
          <NavbarIconLink @timelineChanged="setNavbarTitle" class="p-2.5" icon="ri-bookmark-line" url="/timelines/bookmarks" name="Bookmarks" />
        </div>
        <div class="font-bold flex flex-1 justify-end items-center mr-3">{{ title }}</div>
      </nav>
      <slot></slot>
    </main>
    <aside class="hidden max-w-[20rem] w-full md:block">
      <div class="sticky top-5 space-y-4">
        <SearchBox />
        <SidePanelNotificationCard />
      </div>
    </aside>
  </div>
</template>

<style scoped>

</style>