<script lang="ts" setup>

import {FwbButton, FwbCheckbox, FwbInput, FwbSelect, FwbTextarea} from "flowbite-vue";
import { ref } from "vue";
import { Status } from "@/api/entities/status";
import { call } from "@/api/mastodon";

const message = ref<string>("");
const sensitive = ref<boolean>(false);

const visibilities = [
  { value: "public", name: "Public" },
  { value: "unlisted", name: "Unlisted" },
  { value: "private", name: "Followers Only" } 
];

const visibility = ref<string>("public");

const props = defineProps<{
  inReplyTo?: string
}>();

let sendPost = async () => {
  let params = {
    status: message.value,
    media_ids: [],
    visibility: visibility.value,
    in_reply_to_id: props.inReplyTo,
    sensitive: sensitive.value
  };
  
  const resp = await call<Status>("/api/v1/statuses", params);
};
</script>

<template>
  <form v-on:submit.prevent="sendPost()">
    <fwb-input v-if="sensitive" placeholder="Content warning (optional)" />
    <fwb-textarea v-model="message" label="" placeholder="Just arrived in Shinonome Laboratories"></fwb-textarea>
    <div class="flex flex-row justify-between">
      <fwb-select :options="visibilities" v-model="visibility" required />
      <fwb-checkbox v-model="sensitive">Sensitive</fwb-checkbox>
      <fwb-button>Post</fwb-button>
    </div>
  </form>
</template>

<style scoped>

</style>