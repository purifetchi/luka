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
  <fwb-card v-if="store.self_account !== null" class="overflow-y-scroll max-h-[40rem] p-3">
    <div v-if="notifs" v-for="notification in notifs">
      <NotificationItem :notification="notification" />
      <hr />
    </div>
  </fwb-card>
</template>

<style scoped>

</style>