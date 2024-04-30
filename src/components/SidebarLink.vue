<script lang="ts" setup>

import {computed} from "vue";

const props = defineProps<{
  href: String
}>();

const isCurrentAddress = computed(() => {
  return props.href == document.location.pathname;
})

</script>

<template>
  <div class="p-2 hover:bg-slate-900">
    <RouterLink :to="`${props.href}`">
      <b v-if="isCurrentAddress">
        <slot></slot>
      </b>
      <slot v-else></slot>
    </RouterLink>  
  </div>
</template>

<style scoped>

</style>