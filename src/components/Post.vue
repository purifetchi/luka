<script lang="ts" setup>
import { Status } from "@/api/entities/status";

const props = defineProps<{
  status: Status
}>();
</script>

<template>
  <img :src="props.status.account.avatar" alt="avatar" />
  <b> {{ props.status.account.display_name }}</b>
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