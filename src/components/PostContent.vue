<script lang="ts" setup>

import { Status } from "@/api/entities/status";
import { FwbAvatar } from "flowbite-vue";
import AttachmentGallery from "@/components/AttachmentGallery.vue";

const props = defineProps<{
  status: Status
}>();

</script>

<template>
  <div class="flex items-center space-x-2 rtl:space-x-reverse">
    <FwbAvatar size="md" :img="props.status.account.avatar" />
    <div class="space-y-1 font-medium dark:text-white">
      <b><RouterLink :to="`/user/${props.status.account.id}`">{{ props.status.account.display_name }}</RouterLink></b>
      <div class="text-sm text-gray-500 dark:text-gray-400">@{{ props.status.account.acct }}</div>
    </div>
  </div>
  <div class="space-y-2">
    <div v-html="props.status.content"></div>
    <AttachmentGallery :sensitive="props.status.sensitive" :attachments="props.status.media_attachments" />
    <div class="flex flex-row justify-around">
      <div class="hover:cursor-pointer">
        <v-icon name="ri-reply-line" />  {{ props.status.replies_count }}
      </div>
      <div class="hover:cursor-pointer">
        <v-icon name="ri-heart-3-line" /> {{ props.status.favourites_count  }}
      </div>
      <div class="hover:cursor-pointer">
        <v-icon name="ri-repeat-line" />  {{ props.status.reblogs_count }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>