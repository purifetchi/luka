<script lang="ts" setup>
  import { ref } from "vue";
  import { call } from "@/api/mastodon.js";
  import { TokenResponse } from "@/api/responses/oauth/token-response";
  import { store } from "@/store/store";

  const login = ref("");
  const password = ref("");
  
  let sendLogin = async () => {
    const resp = await call<TokenResponse>("/oauth/token", {
      grant_type: "password",
      client_id: store.client_id,
      client_secret: store.client_secret,
      redirect_uri: "urn:ietf:wg:oauth:2.0:oob",
      
      username: login.value,
      password: password.value
    });
    
    store.client_token = resp.access_token;
    localStorage.setItem("client_token", resp.access_token);
  }
</script>

<template>
  <form v-on:submit.prevent="sendLogin">
    <input v-model="login" type="text" placeholder="login" required />
    <br>
    <input v-model="password" type="password" placeholder="password" required />
    <br>
    <input type="submit" />
  </form>
</template>

<style scoped>

</style>