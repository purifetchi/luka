<script lang="ts" setup>

import { Account } from "@/api/entities/account";

const props = defineProps<{
  account: Account
}>();

</script>

<template>
  <img :src="props.account.avatar" alt="avatar" />
  <br>
  <b>{{ props.account.display_name }}</b>
  <div v-html="props.account.note"></div>
</template>

<style scoped>
  img {
    max-width: 100px;
  }
</style>