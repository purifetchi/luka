<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {call} from "@/api/mastodon";
import NotificationItem from "@/components/NotificationItem.vue";
import FullPageSpinner from "@/components/FullPageSpinner.vue";
import PanelLayout from "@/components/layouts/PanelLayout.vue";
const notifs = ref<Notification[]>(null);

onMounted(async () => {
  notifs.value = await call<Notification[]>(`/api/v1/notifications`);
  document.title = "Notifications";
});

</script>

<template>
  <PanelLayout>
    <div v-if="notifs">
      <NotificationItem v-if="notifs.length > 0"
                        v-for="notification in notifs"
                        :notification="notification" class="p-3 hover:bg-slate-800" />
      <div v-else class="text-xs text-gray-400 text-center m-3">
        It's a bit empty in here, make some noise!
      </div>
    </div>
    <FullPageSpinner v-else />
  </PanelLayout>
</template>

<style scoped>

</style>