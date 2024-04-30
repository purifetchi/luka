<script lang="ts" setup>

import PanelLayout from "@/components/layouts/PanelLayout.vue";
import { Status } from "@/api/entities/status";
import Post from "@/components/Post.vue";
import { useRoute, useRouter } from "vue-router";
import {computed, onMounted, ref, watch} from "vue";
import { call } from "@/api/mastodon";
import { StatusContextResponse } from "@/api/responses/statuses/status-context-response";
import { FwbSpinner } from "flowbite-vue";

const route = useRoute();
const router = useRouter();

const ascendants = ref<Status[]>(null);
const descendants = ref<Status[]>(null);
const post = ref<Status>(null);

const loaded = computed(() => {
  return ascendants.value !== null &&
      descendants.value !== null &&
      post.value !== null;
})

let loadPost = async () => {
  ascendants.value = null;
  descendants.value = null;
  
  post.value = await call<Status>(`/api/v1/statuses/${route.params.id}`);
  
  const context = await call<StatusContextResponse>(`/api/v1/statuses/${route.params.id}/context`);
  ascendants.value = context.ancestors;
  descendants.value = context.descendants;
};

onMounted(async () => {
  await loadPost();
});

watch(() => route.params.id, async newRoute => {
  await loadPost();
});

</script>

<template>
  <PanelLayout>
    <div v-if="loaded">
      <div v-for="ancestor in ascendants" class="m-3">
        <Post :status="ancestor" class="bg-slate-900 hover:cursor-pointer" @click="router.push(`/posts/${ancestor.id}`)" />
      </div>
      <Post v-if="post" :status="post" />
      <div v-for="descendant in descendants" class="m-3">
        <Post :status="descendant" class="bg-slate-900 hover:cursor-pointer" @click="router.push(`/posts/${descendant.id}`)" />
      </div>
    </div>
    <fwb-spinner v-else />
  </PanelLayout>
</template>

<style scoped>
</style>