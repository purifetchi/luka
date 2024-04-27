<script lang="ts" setup>
import { Status } from "@/api/entities/status";

const props = defineProps<{
  status: Status
}>();
</script>

<template>
  <img :src="props.status.account.avatar" alt="avatar" />
  <b> {{ props.status.account.display_name }}</b>
  <div v-html="props.status.content"></div>
</template>

<style scoped>
  img {
    max-width: 50px;
    vertical-align: middle;
  }
  div {
    margin-top: 10px;
  }
</style>