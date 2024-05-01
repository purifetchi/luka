<script lang="ts" setup>
import { store } from "@/store/store.js";
import { call } from "@/api/mastodon";
import { onMounted } from "vue";
import { Account } from "@/api/entities/account";
import { FwbAvatar, FwbCard } from "flowbite-vue";
import ReplyBox from "@/components/ReplyBox.vue";

onMounted(async () => {
  if (store.self_account !== null) {
    return;
  }
  
  if (store.client_token == null) {
    return;
  }
  
  store.self_account = await call<Account>("/api/v1/accounts/verify_credentials");
});
</script>

<template>
 <fwb-card v-if="store.self_account !== null"
  class="space-y-2"
  img-alt="Banner"
  :img-src="store.self_account.header">
   <div class="p-3 space-y-3">
     <div class="flex items-center space-x-2 rtl:space-x-reverse">
       <FwbAvatar size="lg" :img="store.self_account.avatar" />
       <div class="space-y-1 font-medium dark:text-white">
         <b><RouterLink :to="`/user/${store.self_account.id}`">{{ store.self_account.display_name }}</RouterLink></b>
         <div class="text-sm text-gray-500 dark:text-gray-400">@{{ store.self_account.acct }}</div>
       </div>
     </div>
     <ReplyBox />
   </div>
 </fwb-card>
</template>

<style scoped>

</style>