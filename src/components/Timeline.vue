<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { call } from "@/api/mastodon";
import { Status } from "@/api/entities/status";
import Post from "@/components/Post.vue";
import {FwbSpinner} from "flowbite-vue";
import { useRouter } from "vue-router";
import Intersector from "@/components/Intersector.vue";

const router = useRouter();

const props = defineProps<{
  endpoint: string
}>();

const statuses = ref<Status[]>(null);

onMounted(async () => {
  statuses.value = await call<Status[]>(props.endpoint);
});

watch(() => props.endpoint, async () => {
  statuses.value = await call<Status[]>(props.endpoint);
});

let loadMore = async () => {
  if (statuses.value === null) {
    return;
  }
  
  const more = await call<Status[]>(`${props.endpoint}?max_id=${statuses.value[statuses.value.length - 1].id}`);
  statuses.value = statuses.value.concat(more);
};
</script>

<template>
  <div v-if="statuses !== null" class="space-y-2.5">
    <Post v-for="status in statuses" :status="status" class="hover:cursor-pointer" @click="router.push(`/posts/${status.reblog !== null ? status.reblog.id : status.id}`)" />
    <Intersector @intersected="loadMore()" />
  </div>
  <fwb-spinner v-else size="12" />
</template>

<style scoped>

</style>