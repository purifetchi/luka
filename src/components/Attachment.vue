<script lang="ts" setup>

import { AttachmentType, MediaAttachment } from "@/api/entities/media-attachment";
import { computed } from "vue";

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
  <video v-if="props.attachment.type == AttachmentType.Video" class="rounded-xl w-full h-full" muted controls>
    <source :src="props.attachment.url" />
  </video>
  <a v-else :href="props.attachment.url" target="_blank">
    <div class="rounded-xl w-full h-full bg-cover bg-center" :style="`background-image: url(${props.attachment.url})`">
      <div v-if="props.sensitive" class="rounded-xl backdrop-blur-3xl hover:backdrop-blur-0 hover:opacity-0 transition-all ease-in w-full h-full flex items-center justify-center">
        <v-icon color="black" scale="3" name="ri-eye-off-line" />
      </div>
    </div>
  </a>
</template>

<style scoped>

</style>