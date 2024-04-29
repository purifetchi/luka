<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { call } from "@/api/mastodon";
import { InstanceV1Information } from "@/api/responses/instance-v1-information";
import { FwbA, FwbHeading, FwbP } from "flowbite-vue";

const info = ref<InstanceV1Information>(null);

onMounted(async () => {
  info.value = await call<InstanceV1Information>("/api/v1/instance");
})

</script>

<template>
  <div v-if="info">
    <fwb-heading tag="h1">{{ info.title }}</fwb-heading>
    <fwb-heading tag="h4">{{ info.description }}</fwb-heading>
    <fwb-p class="mt-1.5">
      Running <fwb-a class="text-orange-500 no-underline hover:underline" href="https://github.com/purifetchi/luka">luka</fwb-a>, in development.
    </fwb-p>
  </div>
</template>

<style scoped>

</style>