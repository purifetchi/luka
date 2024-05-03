<script lang="ts" setup>

import { Notification, NotificationType } from "@/api/entities/notification";
import { FwbAvatar } from "flowbite-vue";
import PostContent from "@/components/PostContent.vue";

const props = defineProps<{
  notification: Notification
}>();

</script>

<template>
  <PostContent v-if="props.notification.type === NotificationType.Mention" :status="props.notification.status" />
  <div v-else class="p-2">
    <div class="flex flex-row">
      <FwbAvatar size="sm" rounded :img="props.notification.account.avatar" />
      <div class="text-sm">{{$t(`notification.${props.notification.type}`, { actor: props.notification.account.display_name })}}</div>
    </div>
    <div v-if="props.notification.status" v-html="props.notification.status.content" />
  </div>
</template>

<style scoped>

</style>