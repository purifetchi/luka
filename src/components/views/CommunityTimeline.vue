<script setup>
import Timeline from "@/components/Timeline.vue";
import TimelineLayout from "@/components/layouts/TimelineLayout.vue";
</script>

<template>
  <TimelineLayout>
    <Timeline endpoint="/api/v1/timelines/public?local=true" />
  </TimelineLayout>
</template>

<style scoped>

</style>