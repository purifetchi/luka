<script lang="ts" setup>

import SidePanelUserCard from "@/components/SidePanelUserCard.vue";
import SidePanelNotificationCard from "@/components/SidePanelNotificationCard.vue";
import NavbarIconLink from "@/components/NavbarIconLink.vue";
import {onMounted, onUnmounted, ref} from "vue";
import SearchBox from "@/components/SearchBox.vue";
import { FwbAvatar } from "flowbite-vue";
import { store } from "@/store/store";
import { useRouter } from "vue-router";

const router = useRouter();
const title = ref<string>(localStorage.getItem("timeline"));

onMounted(() => {
  window.addEventListener("resize", onResize);
  onResize();
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});

let onResize = () => {
  const { offsetWidth } = document.getElementById("app");
  const panel = document.getElementById("right-panel");
  const leftAsidePanel = document.getElementById("left-aside-responsive-container");
  const rightAsidePanel = document.getElementById("right-aside-responsive-container");
  const rightAside = document.getElementById("right-aside");
  
  console.log(offsetWidth);
  
  if (offsetWidth < 1030) {
    leftAsidePanel.appendChild(panel);
    rightAside.style.display = "none";
  } else {
    rightAsidePanel.appendChild(panel);
    rightAside.style.display = "block";
  }
};

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
        <div id="left-aside-responsive-container"></div>
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
      <section class="min-h-screen">
        <slot></slot>
      </section>
      <nav class="md:hidden mb-2 backdrop-blur-3xl sticky bottom-0 z-50 flex justify-around">
        <NavbarIconLink @timelineChanged="setNavbarTitle" class="p-2.5" icon="ri-quill-pen-line" url="/compose" name="Compose" />
        <NavbarIconLink @timelineChanged="setNavbarTitle" class="p-2.5" icon="ri-notification-2-line" url="/notifications" name="Notifications" />
        <NavbarIconLink @timelineChanged="setNavbarTitle" class="p-2.5" icon="ri-search-line" url="/search" name="Search" />
        <fwb-avatar 
            class="p-2.5 hover:cursor-pointer" 
            v-if="store.self_account !== null" 
            v-on:click="router.push(`/user/${store.self_account.id}`)"
            :img="store.self_account.avatar" />
      </nav>
    </main>
    <aside id="right-aside" class="hidden max-w-[20rem] w-full md:block">
      <div id="right-aside-responsive-container" class="sticky top-5">
        <div id="right-panel" class="space-y-4">
          <SearchBox />
          <SidePanelNotificationCard />
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>

</style>