<script setup>

import Login from "@/components/Login.vue";
import InstanceInformation from "@/components/InstanceInformation.vue";
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="flex items-center md:flex-row flex-col md:space-x-5 space-y-5">
      <InstanceInformation />
      <Login />
    </div>
  </div>
</template>

<style scoped>

</style>