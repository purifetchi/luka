<script lang="ts" setup>

import { AttachmentType, MediaAttachment } from "@/api/entities/media-attachment";
import {computed} from "vue";

const props = defineProps<{
  attachment: MediaAttachment,
  sensitive?: boolean
}>();

const divClass = computed(() => {
  if (props.sensitive) {
    return "blur-xl hover:blur-none transition ease-in";
  } else {
    return "";
  }
})

</script>

<template>
  <div :class="divClass">
    <video v-if="props.attachment.type == AttachmentType.Video" class="rounded-xl" muted controls>
      <source :src="props.attachment.url" />
    </video>
    <a v-else :href="props.attachment.url" target="_blank">
      <div class="rounded-xl w-full h-full bg-cover bg-center" :style="`background-image: url(${props.attachment.url})`"></div>
    </a>
  </div>
</template>

<style scoped>

</style>