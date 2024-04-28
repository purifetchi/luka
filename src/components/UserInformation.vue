<script lang="ts" setup>
  import { Account } from "@/api/entities/account";
  import { call } from "@/api/mastodon";
  import { onMounted, ref } from "vue";
  import LogoutButton from "@/components/LogoutButton.vue"; 
  
  const acc = ref<Account>(null);
  onMounted(async () => {
    acc.value = await call<Account>("/api/v1/accounts/verify_credentials");
  });
</script>

<template>
  <div v-if="acc">
    You're currently logged in as: <b>{{ acc.display_name }}</b>
    <br>
    Bio: {{ acc.note }}
    <br>
    <LogoutButton />
  </div>
  <h1 v-else>Loading account information...</h1>
</template>

<style scoped>

</style>