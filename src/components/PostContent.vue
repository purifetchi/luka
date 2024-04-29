<script lang="ts" setup>

import { Status } from "@/api/entities/status";
import Post from "@/components/Post.vue";
import { FwbAvatar } from "flowbite-vue";

const props = defineProps<{
  status: Status
}>();

</script>

<template>
  <div class="flex items-center space-x-2 rtl:space-x-reverse">
    <FwbAvatar size="md" :img="props.status.account.avatar" />
    <div class="space-y-1 font-medium dark:text-white">
      <b><RouterLink :to="`/user/${props.status.account.id}`">{{ props.status.account.display_name }}</RouterLink></b>
      <div class="text-sm text-gray-500 dark:text-gray-400">@{{ props.status.account.acct }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>