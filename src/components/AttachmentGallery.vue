<script lang="ts" setup>
import { MediaAttachment } from "@/api/entities/media-attachment";
import Attachment from "@/components/Attachment.vue";

const props = defineProps<{
  attachments: MediaAttachment[],
  sensitive: boolean
}>();
</script>

<template>
  <!-- TODO: This is fucking ugly, can we make it look somehow nicer? -->
  <div v-if="props.attachments.length > 0" class="attachment-gallery">
    <Attachment v-if="props.attachments.length == 1" :sensitive="props.sensitive" :attachment="props.attachments[0]" />
    <div v-else-if="props.attachments.length == 2" class="grid grid-cols-2 grid-rows-1 gap-2">
      <Attachment v-for="attachment in attachments" :sensitive="props.sensitive" :attachment="attachment" />
    </div>
    <div v-else-if="props.attachments.length == 3" class="grid grid-cols-2 grid-rows-2 gap-2">
      <Attachment :attachment="props.attachments[0]" :sensitive="props.sensitive" />
      <Attachment :attachment="props.attachments[1]" :sensitive="props.sensitive" />
      <Attachment :attachment="props.attachments[2]" :sensitive="props.sensitive" />
    </div>
    <div v-else class="grid grid-cols-2 grid-rows-2 gap-2">
      <Attachment :attachment="props.attachments[0]" :sensitive="props.sensitive" />
      <Attachment :attachment="props.attachments[1]" :sensitive="props.sensitive" />
      <Attachment :attachment="props.attachments[2]" :sensitive="props.sensitive" />
      <Attachment v-if="props.attachments.length == 4" :attachment="props.attachments[3]" :sensitive="props.sensitive" />
      <div v-else class="flex justify-center items-center bg-slate-900 rounded-xl">
        +{{ props.attachments.length - 3 }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .attachment-gallery {
    height: 500px;
  }
  .attachment-gallery > * {
    height: 100%;
  }
</style>