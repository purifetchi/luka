<script lang="ts" setup>
import { Status } from "@/api/entities/status";
import { FwbAvatar } from "flowbite-vue";

const props = defineProps<{
  status: Status
}>();
</script>

<template>
  <article class="p-5 bg-slate-700 space-y-2">
    <div class="flex items-center space-x-2 rtl:space-x-reverse">
      <FwbAvatar size="md" :img="props.status.account.avatar" />
      <div class="space-y-1 font-medium dark:text-white">
        <b><RouterLink :to="`/user/${props.status.account.id}`">{{ props.status.account.display_name }}</RouterLink></b>
        <div class="text-sm text-gray-500 dark:text-gray-400">@{{ props.status.account.acct }}</div>
      </div>
    </div>
    
    <Post v-if="props.status.reblog !== null" class="reblog" :status="props.status.reblog" />
    <div v-else class="space-y-2">
      <div v-html="props.status.content"></div>
      <div class="flex flex-row justify-around">
        <div>{{ props.status.replies_count }} comments</div>
        <div>{{ props.status.favourites_count  }} likes</div>
        <div>{{ props.status.reblogs_count }} boosts</div>
      </div>
    </div>
  </article>
</template>

<style scoped>
</style>