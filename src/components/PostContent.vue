<script lang="ts" setup>

import {Status, Visibility} from "@/api/entities/status";
import {FwbAvatar, FwbDropdown, FwbListGroup} from "flowbite-vue";
import AttachmentGallery from "@/components/AttachmentGallery.vue";
import PostActions from "@/components/PostActions.vue";
import {computed} from "vue";
import {formatPost} from "@/formatting/post-formatter";
import Hamburger from "@/components/Hamburger.vue";

const props = defineProps<{
  status: Status
}>();

const content = computed(() => {
  return formatPost(props.status);
});

</script>

<template>
  <div v-if="props.status.in_reply_to_id" class="text-sm text-gray-400">
    <v-icon name="ri-reply-line" scale="0.8"/> <span>{{ $t("statuses.reply") }}</span>
  </div>
  <div class="flex justify-between">
    <div class="flex items-center space-x-3 rtl:space-x-reverse">
      <FwbAvatar size="md" :img="props.status.account.avatar" />
      <div class="font-medium dark:text-white">
        <b><RouterLink :to="`/user/${props.status.account.id}`">{{ props.status.account.display_name }}</RouterLink></b>
        <div class="text-sm text-gray-500 dark:text-gray-400">@{{ props.status.account.acct }}</div>
      </div>
    </div>
    <div class="flex items-center space-x-1">
      <v-icon v-if="props.status.visibility == Visibility.Public" color="#ffffff55" name="ri-global-line" title="Public" />
      <v-icon v-else-if="props.status.visibility == Visibility.Unlisted" color="#ffffff55" name="ri-lock-unlock-line" title="Unlisted" />
      <v-icon v-else-if="props.status.visibility == Visibility.Followers" color="#ffffff55" name="ri-lock-line" title="Followers only" />
      <Hamburger>
        <fwb-list-group>
          <a :href="props.status.url ?? props.status.uri" target="_blank">{{ $t("actions.open_in_original") }}</a>
        </fwb-list-group>
      </Hamburger>
    </div>
  </div>
  <div class="space-y-2">
    <div v-html="content" class="post-content"></div>
    <AttachmentGallery :sensitive="props.status.sensitive" :attachments="props.status.media_attachments" />
    <PostActions :status="status" />
  </div>
</template>

<style scoped>
</style>