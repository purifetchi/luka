<script lang="ts" setup>
import { store } from "@/store/store.js";
import { call } from "@/api/mastodon";
import { onMounted, ref } from "vue";
import { Account } from "@/api/entities/account";
import { FwbAvatar, FwbButton, FwbCard, FwbTextarea } from "flowbite-vue";
import {Status} from "@/api/entities/status";

const message = ref<string>("");

onMounted(async () => {
  if (store.self_account !== null) {
    return;
  }
  
  if (store.client_token == null) {
    return;
  }
  
  store.self_account = await call<Account>("/api/v1/accounts/verify_credentials");
});

let sendPost = async () => {
  const resp = await call<Status>("/api/v1/statuses", {
    status: message.value,
    media_ids: [],
    visibility: "public"
  });
};
</script>

<template>
 <fwb-card v-if="store.self_account !== null"
  class="space-y-2"
  img-alt="Banner"
  :img-src="store.self_account.header">
   <div class="flex items-center space-x-2 rtl:space-x-reverse">
     <FwbAvatar size="lg" :img="store.self_account.avatar" />
     <div class="space-y-1 font-medium dark:text-white">
       <b><RouterLink :to="`/user/${store.self_account.id}`">{{ store.self_account.display_name }}</RouterLink></b>
       <div class="text-sm text-gray-500 dark:text-gray-400">@{{ store.self_account.acct }}</div>
     </div>
   </div>
   <form v-on:submit.prevent="sendPost()">
     <fwb-textarea v-model="message" label="" placeholder="Just arrived in Shinonome Laboratories"></fwb-textarea>
     <fwb-button>Post</fwb-button>
   </form>
 </fwb-card>
</template>

<style scoped>

</style>