<script lang="ts" setup>
import {AttachmentType, MediaAttachment} from "@/api/entities/media-attachment";

const props = defineProps<{
  attachments: MediaAttachment[]
}>();
</script>

<template>
  <div v-for="attachment in props.attachments">
    <video v-if="attachment.type == AttachmentType.Video" autoplay controls>
      <source :src="attachment.url" />
    </video>
    <img v-else :src="attachment.url" class="rounded-xl" />
  </div>
</template>

<style scoped>

</style>