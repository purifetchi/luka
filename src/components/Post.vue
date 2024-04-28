<script lang="ts" setup>
import { Status } from "@/api/entities/status";

const props = defineProps<{
  status: Status
}>();
</script>

<template>
  <img :src="props.status.account.avatar" alt="avatar" />
  <span>
    <b> <RouterLink :to="`/user/${props.status.account.id}`">{{ props.status.account.display_name }}</RouterLink></b> 
    <small>@{{ props.status.account.acct}}</small>
  </span>
  <div v-if="props.status.reblog !== null" class="reblog">
    <Post :status="props.status.reblog" />
  </div>
  <div v-else v-html="props.status.content"></div>
</template>

<style scoped>
  img {
    max-width: 50px;
    vertical-align: middle;
  }
  div {
    margin-top: 10px;
  }
  .reblog {
    padding: 20px;
  }
</style>