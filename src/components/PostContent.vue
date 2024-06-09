<script lang="ts" setup>

import { Status, Visibility } from "@/api/entities/status";
import { FwbAvatar } from "flowbite-vue";
import AttachmentGallery from "@/components/AttachmentGallery.vue";
import PostActions from "@/components/PostActions.vue";
import { computed, ref } from "vue";
import { formatPost } from "@/formatting/post-formatter";
import Hamburger from "@/components/Hamburger.vue";
import HamburgerButton from "@/components/HamburgerButton.vue";
import SensitiveWrapper from "@/components/SensitiveWrapper.vue";
import { store } from "@/store/store";
import { call, Method } from "@/api/mastodon";
import {replaceEmojisInText} from "@/formatting/post-formatter";

const deleted = ref<boolean>(false);

const props = defineProps<{
  status: Status
}>();

const content = computed(() => {
  return formatPost(props.status);
});

let deletePost = async () => {
  const resp = await call<{}>(`/api/v1/statuses/${props.status.id}`, {}, Method.DELETE);
  if (resp !== undefined && resp !== null) {
    deleted.value = true;
  }
};

</script>

<template>
  <div v-if="deleted">
    {{ $t("statuses.post_has_been_deleted") }}
  </div>
  <div class="space-y-2" v-else>
    <div v-if="props.status.in_reply_to_id" class="text-sm text-gray-400">
      <v-icon name="ri-reply-line" scale="0.8"/> <span>{{ $t("statuses.reply") }}</span>
    </div>
    <div class="flex justify-between">
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <FwbAvatar size="md" :img="props.status.account.avatar" />
        <div class="font-medium dark:text-white">
          <b>
            <RouterLink :to="`/user/${props.status.account.id}`">
              <span v-html="replaceEmojisInText(props.status.account.display_name, props.status.account)" />
            </RouterLink>
          </b>
          <div class="text-sm text-gray-500 dark:text-gray-400">@{{ props.status.account.acct }}</div>
        </div>
      </div>
      <div class="flex items-center space-x-1">
        <v-icon v-if="props.status.visibility == Visibility.Public" color="#ffffff55" name="ri-global-line" title="Public" />
        <v-icon v-else-if="props.status.visibility == Visibility.Unlisted" color="#ffffff55" name="ri-lock-unlock-line" title="Unlisted" />
        <v-icon v-else-if="props.status.visibility == Visibility.Followers" color="#ffffff55" name="ri-lock-line" title="Followers only" />
        <v-icon v-else color="#ffffff55" name="ri-mail-line" title="Followers only" />
        <Hamburger>
          <HamburgerButton :href="props.status.url ?? props.status.uri" target="_blank">{{ $t("actions.open_in_original") }}</HamburgerButton>
          <HamburgerButton v-if="store.self_account.id == props.status.account.id" v-on:click="deletePost">{{ $t("actions.delete_post") }}</HamburgerButton>
        </Hamburger>
      </div>
    </div>
    <div class="space-y-2">
      <SensitiveWrapper :sensitive="props.status.spoiler_text !== ''" :spoiler_text="props.status.spoiler_text">
        <div v-html="content" class="post-content"></div>
        <AttachmentGallery :sensitive="props.status.sensitive" :attachments="props.status.media_attachments" />
      </SensitiveWrapper>
      <PostActions :status="status" />
    </div>
  </div>
</template>

<style>
  .post-content a {
    color: rgb(191 219 254);
  }
  
  .mention {
    font-weight: bold;  
  }
  
  .post-content {
    word-break: break-all;
  }

  .post-content * {
    word-break: break-all;
  }
  
  .post-content a:hover {
    text-decoration: underline;
  }
</style>