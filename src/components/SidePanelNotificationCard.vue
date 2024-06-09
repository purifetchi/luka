<script lang="ts" setup>

import { Notification } from "@/api/entities/notification";
import { onMounted, ref } from "vue";
import { call } from "@/api/mastodon";
import NotificationItem from "@/components/NotificationItem.vue";
import FullPageSpinner from "@/components/FullPageSpinner.vue";

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
  
    <div v-if="notifs">
      <NotificationItem v-if="notifs.length > 0" 
                        v-for="notification in notifs" 
                        :notification="notification" class="p-3 hover:bg-slate-800" />
      <div v-else class="text-xs text-gray-400 text-center m-3">
        It's a bit empty in here, make some noise!
      </div>
    </div>
    <FullPageSpinner v-else />
  </div>
</template>

<style scoped>

</style>