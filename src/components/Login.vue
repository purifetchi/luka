<script lang="ts" setup>
  import { ref } from "vue";
  import { login, getDomain, getScopes } from "@/api/mastodon.js";
  import { FwbButton, FwbInput } from "flowbite-vue";
  import { router } from "@/router/router";
  import { config } from "@/config/config";
  import { store } from "@/store/store";

  const username = ref("");
  const password = ref("");
  
  let sendLogin = async () => {
    try {
      await login(
          username.value,
          password.value);
      
      router.replace("/timelines/home");
    } catch (e) {
      console.error(e);
    }
  };
  
  let sendTokenRequest = async () => {
    const scopes = await getScopes();
    const path = `/oauth/authorize?response_type=code&client_id=${store.client_id}&redirect_uri=${encodeURIComponent(window.location.protocol + "//" + window.location.host + "/auth_callback")}&scope=${scopes}`;
    window.location.href = `${getDomain()}${path}`;
  };
</script>

<template>
  <form v-if="config.token_flow === 'password'" v-on:submit.prevent="sendLogin" class="space-y-3">
    <fwb-input size="md" v-model="username" type="text" placeholder="Your handle (eg. prefetcher)" required />
    <fwb-input size="md" v-model="password" type="password" placeholder="Your password" required />
    <fwb-button type="submit">Login</fwb-button>
  </form>
  <fwb-button v-else @click="sendTokenRequest">Sign in via {{ getDomain() }}</fwb-button>
</template>

<style scoped>

</style>