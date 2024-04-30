<script lang="ts" setup>

import PanelLayout from "@/components/layouts/PanelLayout.vue";
import { Status } from "@/api/entities/status";
import Post from "@/components/Post.vue";
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { call } from "@/api/mastodon";
import { StatusContextResponse } from "@/api/responses/statuses/status-context-response";
import PostContent from "@/components/PostContent.vue";
import { FwbSpinner } from "flowbite-vue";

const route = useRoute();

const ascendants = ref<Status[]>(null);
const descendants = ref<Status[]>(null);
const post = ref<Status>(null);

const loaded = computed(() => {
  return ascendants.value !== null &&
      descendants.value !== null &&
      post.value !== null;
})

let loadPost = async () => {
  post.value = await call<Status>(`/api/v1/statuses/${route.params.id}`);
  
  const context = await call<StatusContextResponse>(`/api/v1/statuses/${route.params.id}/context`);
  ascendants.value = context.ancestors;
  descendants.value = context.descendants;
};

onMounted(async () => {
  await loadPost();
});

</script>

<template>
  <PanelLayout>
    <div v-if="loaded" class="space-y-2">
      <div v-for="ancestor in ascendants">
        <PostContent :status="ancestor" />
        <hr>
      </div>
      <Post v-if="post" :status="post" />
      <div v-for="descendant in descendants">
        <PostContent :status="descendant" />
        <hr>
      </div>
    </div>
    <fwb-spinner v-else />
  </PanelLayout>
</template>

<style scoped>

</style>