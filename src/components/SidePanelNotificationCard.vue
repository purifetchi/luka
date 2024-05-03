<script lang="ts" setup>

import { FwbCard } from "flowbite-vue";
import { store } from "@/store/store.js";
import { Notification } from "@/api/entities/notification";
import { onMounted, ref } from "vue";
import { call } from "@/api/mastodon";
import NotificationItem from "@/components/NotificationItem.vue";

const notifs = ref<Notification[]>(null);

onMounted(async () => {
  notifs.value = await call<Notification[]>(`/api/v1/notifications`);
});

</script>

<template>
  <div class="bg-slate-700 overflow-y-scroll overflow-x-hidden max-h-[40rem] max-w-[23rem]">
    <div class="top-0 sticky backdrop-blur-3xl p-2 z-50 font-bold">
      Notifications
    </div>
  
    <div v-if="notifs" v-for="notification in notifs">
      <NotificationItem :notification="notification" class="hover:bg-slate-800" />
    </div>
  </div>
</template>

<style scoped>

</style>