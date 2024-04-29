<script setup>
import Timeline from "@/components/Timeline.vue";
import PanelLayout from "@/components/layouts/PanelLayout.vue";
</script>

<template>
  <PanelLayout>
    <Timeline endpoint="/api/v1/timelines/home" />
  </PanelLayout>
</template>

<style scoped>

</style>