<script lang="ts" setup>
import {onMounted, ref} from "vue";
import { call } from "@/api/mastodon";
import { Status } from "@/api/entities/status";
import Post from "@/components/Post.vue";

const props = defineProps<{
  endpoint: string
}>();

const statuses = ref<Status[]>(null);

onMounted(async () => {
  statuses.value = await call<Status[]>(props.endpoint);
});
</script>

<template>
  <div v-if="statuses !== null" v-for="status in statuses">
    <Post :status="status" />
    <hr>
  </div>
</template>

<style scoped>

</style>