<script lang="ts" setup>

import { Notification, NotificationType } from "@/api/entities/notification";
import { FwbAvatar } from "flowbite-vue";
import PostContent from "@/components/PostContent.vue";

const props = defineProps<{
  notification: Notification
}>();

</script>

<template>
  <div v-if="props.notification.type === NotificationType.Mention" class="p-2">
    <PostContent :status="props.notification.status" />
  </div>
  <div v-else class="p-2 space-y-3">
    <div class="flex flex-row space-x-2">
      <FwbAvatar size="sm" rounded :img="props.notification.account.avatar" class="align-middle" />
      <div class="text-sm space-y-2 max-h-16 overflow-y-hidden hover:max-h-fit">
        <div class="font-bold">{{$t(`notification.${props.notification.type}`, { actor: props.notification.account.display_name })}}</div>
        <div v-if="props.notification.status" v-html="props.notification.status.content" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>