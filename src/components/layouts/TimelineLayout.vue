<script lang="ts" setup>

import PanelLayout from "@/components/layouts/PanelLayout.vue";
import NavbarIconLink from "@/components/NavbarIconLink.vue";
import { ref } from "vue";

const title = ref<string>(localStorage.getItem("timeline"));

let setNavbarTitle = (text: string) => {
  title.value = text;
  localStorage.setItem("timeline", text);
};

</script>

<template>
  <PanelLayout>
    <nav class="mb-2 bg-slate-700 sticky top-0 z-50 flex justify-between shadow-md shadow-slate-700">
      <div class="flex flex-1 box-border">
        <NavbarIconLink @timelineChanged="setNavbarTitle" class="p-2.5" icon="ri-home-4-line" url="/timelines/home" name="Home timeline" />
        <NavbarIconLink @timelineChanged="setNavbarTitle" class="p-2.5" icon="ri-community-line" url="/timelines/local" name="Community timeline" />
        <NavbarIconLink @timelineChanged="setNavbarTitle" class="p-2.5" icon="ri-global-line" url="/timelines/public" name="Public timeline" />
        <NavbarIconLink @timelineChanged="setNavbarTitle" class="p-2.5" icon="ri-bookmark-line" url="/timelines/bookmarks" name="Bookmarks" />
      </div>
      <div class="font-bold flex flex-1 justify-end items-center mr-3">{{ title }}</div>
    </nav>
    <slot></slot>
  </PanelLayout>
</template>

<style scoped>

</style>