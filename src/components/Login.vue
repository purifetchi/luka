<script lang="ts" setup>
  import { ref } from "vue";
  import { login } from "@/api/mastodon.js";
  import { FwbButton, FwbInput } from "flowbite-vue";

  const username = ref("");
  const password = ref("");
  
  let sendLogin = async () => {
    try {
      await login(
          username.value,
          password.value);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<template>
  <form v-on:submit.prevent="sendLogin" class="space-y-3">
    <fwb-input size="md" v-model="username" type="text" placeholder="Your handle (eg. prefetcher)" required />
    <fwb-input size="md" v-model="password" type="password" placeholder="Your password" required />
    <fwb-button type="submit">Login</fwb-button>
  </form>
</template>

<style scoped>

</style>