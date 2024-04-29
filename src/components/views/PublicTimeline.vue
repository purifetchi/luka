<script setup>

import PanelLayout from "@/components/layouts/PanelLayout.vue";
import Timeline from "@/components/Timeline.vue";
</script>

<template>
  <PanelLayout>
    <Timeline endpoint="/api/v1/timelines/public" />
  </PanelLayout>
</template>

<style scoped>

</style>