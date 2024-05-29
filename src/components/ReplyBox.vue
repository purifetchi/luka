<script lang="ts" setup>

import { FwbButton, FwbCheckbox, FwbInput, FwbSelect, FwbTextarea } from "flowbite-vue";
import {onMounted, ref} from "vue";
import {Status, Visibility} from "@/api/entities/status";
import { call } from "@/api/mastodon";
import { MediaAttachment } from "@/api/entities/media-attachment";
import Attachment from "@/components/Attachment.vue";
import AttachmentGallery from "@/components/AttachmentGallery.vue";
import ReplyBoxAttachment from "@/components/ReplyBoxAttachment.vue";

const message = ref<string>("");
const sensitive = ref<boolean>(false);
const visibility = ref<string>("public");
const cw = ref<string>(null);
const fileUpload = ref<HTMLInputElement>(null);
const attachments = ref<MediaAttachment[]>([]);

const uploading = ref<boolean>(false);

const visibilities = [
  { value: Visibility.Public, name: "Public" },
  { value: Visibility.Unlisted, name: "Unlisted" },
  { value: Visibility.Followers, name: "Followers Only" },
  { value: Visibility.Direct, name: "Direct Message" }
];

const props = defineProps<{
  inReplyTo?: string,
  startingMessage?: string
}>();

onMounted(() => {
  message.value = props.startingMessage ?? "";
});

let attachFile = async () => {
  let form = new FormData();
  form.append("file", fileUpload.value.files[0]);
  
  const resp = await call<MediaAttachment>("/api/v2/media", form);
  if (resp !== undefined) {
    console.log("bah");
    attachments.value = [...attachments.value, resp];
  }
};

let sendPost = async () => {
  uploading.value = true;
  
  let params = {
    status: message.value,
    media_ids: attachments.value.map(a => a.id),
    visibility: visibility.value,
    in_reply_to_id: props.inReplyTo,
    sensitive: sensitive.value,
    spoiler_text: cw.value
  };
  
  message.value = "";
  cw.value = "";
  sensitive.value = false;
  attachments.value = [];
  
  const resp = await call<Status>("/api/v1/statuses", params);
  
  uploading.value = false;
};
</script>

<template>
  <form v-on:submit.prevent="sendPost()" class="space-y-1">
    <input ref="fileUpload" type="file" id="fileUpload" hidden :disabled="uploading" v-on:input.prevent="attachFile"/>
    <fwb-input v-if="sensitive" v-model="cw" placeholder="Content warning (optional)" />
    <fwb-textarea v-model="message" label="" placeholder="Just arrived in Shinonome Laboratories"></fwb-textarea>
    <div class="flex flex-row justify-between">
      <fwb-select :options="visibilities" v-model="visibility" required />
      <fwb-checkbox v-model="sensitive">Sensitive</fwb-checkbox>
      <fwb-button v-on:click.prevent="fileUpload.click()">Attach</fwb-button>
      <fwb-button>Post</fwb-button>
    </div>
    <div v-if="attachments.length > 0" class="p-2 w-full max-h-[20rem] overflow-y-scroll">
      <ReplyBoxAttachment :attachment="attachment" v-for="attachment in attachments" />
    </div>
  </form>
</template>

<style scoped>

</style>