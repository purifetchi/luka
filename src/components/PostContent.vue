<script lang="ts" setup>

import { Status } from "@/api/entities/status";
import { FwbAvatar } from "flowbite-vue";
import AttachmentGallery from "@/components/AttachmentGallery.vue";
import PostActions from "@/components/PostActions.vue";
import {computed} from "vue";
import {formatPost} from "@/formatting/post-formatter";

const props = defineProps<{
  status: Status
}>();

const content = computed(() => {
  return formatPost(props.status);
});

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
    <div v-html="content"></div>
    <AttachmentGallery :sensitive="props.status.sensitive" :attachments="props.status.media_attachments" />
    <PostActions :status="status" />
  </div>
</template>

<style scoped>
</style>