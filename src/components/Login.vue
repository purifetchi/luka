<script lang="ts" setup>
  import { ref } from "vue";
  import { login } from "@/api/mastodon.js";

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
  <form v-on:submit.prevent="sendLogin">
    <input v-model="username" type="text" placeholder="login" required />
    <br>
    <input v-model="password" type="password" placeholder="password" required />
    <br>
    <input type="submit" />
  </form>
</template>

<style scoped>

</style>