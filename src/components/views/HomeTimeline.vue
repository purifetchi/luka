<script setup>
import Timeline from "@/components/Timeline.vue";
import PanelLayout from "@/components/layouts/PanelLayout.vue";
import {onMounted} from "vue";

onMounted(() => {
  document.title = "Home timeline";
});

</script>

<template>
  <PanelLayout>
    <Timeline endpoint="/api/v1/timelines/home" />
  </PanelLayout>
</template>

<style scoped>

</style>