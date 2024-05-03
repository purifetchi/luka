<script setup>

import Timeline from "@/components/Timeline.vue";
import PanelLayout from "@/components/layouts/PanelLayout.vue";

</script>

<template>
  <PanelLayout>
    <Timeline endpoint="/api/v1/timelines/public?local=true" />
  </PanelLayout>
</template>

<style scoped>

</style>