<script setup>

import Timeline from "@/components/Timeline.vue";
import PanelLayout from "@/components/layouts/PanelLayout.vue";
import {onMounted} from "vue";

onMounted(() => {
  document.title = "Public timeline";
});

</script>

<template>
  <PanelLayout>
    <Timeline endpoint="/api/v1/timelines/public" />
  </PanelLayout>
</template>

<style scoped>

</style>