<script setup>

import Login from "@/components/Login.vue";
import { store } from "@/store/store.js";
import UserInformation from "@/components/UserInformation.vue";

</script>

<template>
  <h1>Luka: The Toki Frontend</h1>
  <p>Something will be here, I promise.</p>
  <br>
  <Login v-if="store.client_token === null"/>
  <UserInformation v-else />
</template>

<style scoped>

</style>