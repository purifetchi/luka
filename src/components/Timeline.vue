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

let postClicked = async (post: Status) => {
  await router.push(`/posts/${post.id}`);
}
</script>

<template>
  <div v-if="statuses !== null" class="space-y-2.5">
    <Post v-for="status in statuses" :status="status" @postClicked="postClicked" class="hover:cursor-pointer" />
    <Intersector @intersected="loadMore()" />
  </div>
  <div v-else class="flex justify-center items-center h-screen">
    <fwb-spinner size="12" />
  </div>
</template>

<style scoped>

</style>