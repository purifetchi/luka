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
 <div v-if="store.self_account !== null" class="space-y-3 border-[1px] border-slate-700">
  <div class="bg-cover bg-center" :style="`background-image: url(${store.self_account.header});`">
    <div class="backdrop-blur backdrop-brightness-50 flex items-center space-x-2 p-3 bg-gradient-to-b from-transparent to-slate-800">
      <FwbAvatar size="lg" :img="store.self_account.avatar" />
      <div class="space-y-1 font-medium dark:text-white">
        <b><RouterLink :to="`/user/${store.self_account.id}`">{{ store.self_account.display_name }}</RouterLink></b>
        <div class="text-sm text-gray-500 dark:text-gray-400">@{{ store.self_account.acct }}</div>
      </div>
    </div>
  </div>
  <ReplyBox />
 </div>
</template>

<style scoped>

</style>