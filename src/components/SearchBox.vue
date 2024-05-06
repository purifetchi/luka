<script lang="ts" setup>

import { FwbInput } from "flowbite-vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const query = ref<string>("");

let search = async () => {
  await router.push(`/search?query=${encodeURIComponent(query.value)}`);
};

</script>

<template>
  <form @submit.prevent="search">
    <fwb-input placeholder="Enter your search query" v-model="query">
      <template #prefix>
        <v-icon name="ri-search-line" />
      </template>
    </fwb-input>
  </form>
</template>

<style scoped>

</style>