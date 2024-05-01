<script lang="ts" setup>

import { useRouter } from "vue-router";
import {computed, onMounted} from "vue";

const props = defineProps<{
  icon: string,
  url: string,
  name: string
}>();

const emit = defineEmits<{
  timelineChanged: [title: string]
}>();

const router = useRouter();

const style = computed(() => {
  if (window.location.pathname !== props.url) {
    return "";
  }
  
  return "bg-slate-800";
});

let moveToUrl = async () => {
  emit("timelineChanged", props.name);
  await router.push(props.url);
}

onMounted(() => {
  if (window.location.pathname === props.url) {
    emit("timelineChanged", props.name);
  }
});

</script>

<template>
  <button :class="style" @click="moveToUrl">
    <v-icon scale="1.5" :name="props.icon" />
  </button>
</template>

<style scoped>

</style>