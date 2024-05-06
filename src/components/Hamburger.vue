<script lang="ts" setup>

import {FwbDropdown, FwbListGroup} from "flowbite-vue";

</script>

<template>
  <fwb-dropdown>
    <template #trigger>
      <v-icon class="p-2 hover:cursor-pointer hover:bg-slate-800 transition ease-in duration-75 rounded" scale="2" name="ri-menu-line" />
    </template>
    <fwb-list-group>
      <slot></slot>
    </fwb-list-group>
  </fwb-dropdown>
</template>

<style scoped>

</style>