<script setup>
import { logout } from "@/api/mastodon";
</script>

<template>
  <button @click="logout()">Logout</button>
</template>

<style scoped>

</style>