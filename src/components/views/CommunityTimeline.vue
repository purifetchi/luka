<script setup>

import Timeline from "@/components/Timeline.vue";
import PanelLayout from "@/components/layouts/PanelLayout.vue";
import {onMounted} from "vue";

onMounted(() => {
  document.title = "Community timeline";
});

</script>

<template>
  <PanelLayout>
    <Timeline endpoint="/api/v1/timelines/public?local=true" />
  </PanelLayout>
</template>

<style scoped>

</style>