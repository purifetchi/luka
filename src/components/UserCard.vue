<script lang="ts" setup>

import { Account } from "@/api/entities/account";
import {FwbAvatar, FwbHeading, FwbP} from "flowbite-vue";

const props = defineProps<{
  account: Account
}>();

</script>

<template>
  <div class="with-header bg-slate-700 m-2 bg-no-repeat bg-cover bg-center" :style="`background-image: url(${props.account.header});`">
    <div class="h-60">
      
    </div>
    <div class="flex space-x-3 backdrop-blur-xl p-2.5 backdrop-brightness-75">
      <fwb-avatar size="xl" :img="props.account.avatar" />
      <div class="space-y-2 max-w-full">
        <fwb-heading tag="h2">{{ props.account.display_name }}</fwb-heading>
        <div>@{{ props.account.acct }}</div>
        <fwb-p v-html="props.account.note"></fwb-p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>