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
  <div class="space-y-2.5">
    <Post v-if="statuses !== null" v-for="status in statuses" :status="status" />
  </div>
</template>

<style scoped>

</style>