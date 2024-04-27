<script lang="ts" setup>
import {onMounted, ref} from "vue";
import { call } from "@/api/mastodon";
import { InstanceV1Information } from "@/api/responses/instance-v1-information";

const info = ref<InstanceV1Information>(null);

onMounted(async () => {
  info.value = await call<InstanceV1Information>("/api/v1/instance");
})

</script>

<template>
  <div v-if="info">
    <h1>{{ info.title }}</h1>
    <br>
    <h3>{{ info.description }}</h3>
  </div>
  <h1 v-else>
    Loading...
  </h1>
</template>

<style scoped>

</style>