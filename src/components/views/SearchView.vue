<script lang="ts" setup>
  
import PanelLayout from "@/components/layouts/PanelLayout.vue";
import { useRoute } from "vue-router";
import {onMounted, ref} from "vue";
import { SearchResponse } from "@/api/responses/search/search-response";
import {call} from "@/api/mastodon";
import Post from "@/components/Post.vue";
import {FwbHeading} from "flowbite-vue";

const route = useRoute();
const search = ref<SearchResponse>(null);

onMounted(async () => {
  if (typeof(route.query.query) !== "string") {
    return;
  }
  
  search.value = await call<SearchResponse>(`/api/v2/search?q=${encodeURIComponent(route.query.query)}&resolve=true`);
});

</script>

<template>
  <PanelLayout>
    <div v-if="search">
      <div class="space-y-3">
        <fwb-heading tag="h3">Accounts</fwb-heading>
        <RouterLink v-for="account in search.accounts" :to="`/user/${account.id}`">
          {{ account.display_name }} {{ account.acct }}
        </RouterLink>
      </div>
      <div class="space-y-3">
        <fwb-heading tag="h3">Posts</fwb-heading>
        <Post v-for="status in search.statuses" :status="status" />
      </div>
    </div>
  </PanelLayout>
</template>

<style scoped>

</style>