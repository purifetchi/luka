<script lang="ts" setup>
  const props = defineProps<{
    sensitive: boolean,
    spoiler_text: string
  }>();
</script>

<template>
  <details v-if="props.sensitive">
    <summary>{{ props.spoiler_text }}</summary>
    <slot></slot>
  </details>
  <slot v-else></slot>
</template>

<style scoped>

</style>