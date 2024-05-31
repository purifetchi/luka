<script lang="ts" setup>
  
import PanelLayout from "@/components/layouts/PanelLayout.vue";
import { useRoute } from "vue-router";
import {onMounted, ref, watch} from "vue";
import { SearchResponse } from "@/api/responses/search/search-response";
import { call } from "@/api/mastodon";
import Post from "@/components/Post.vue";
import { FwbHeading } from "flowbite-vue";
import FullPageSpinner from "@/components/FullPageSpinner.vue";
import SearchBox from "@/components/SearchBox.vue";

const route = useRoute();
const search = ref<SearchResponse>(null);

let doSearch = async () => {
  if (typeof(route.query.query) !== "string") {
    return;
  }

  search.value = await call<SearchResponse>(`/api/v2/search?q=${encodeURIComponent(route.query.query)}&resolve=true`);
};

onMounted(doSearch);

watch(
    () => route.query.query,
    doSearch
);

</script>

<template>
  <PanelLayout>
    <SearchBox class="md:hidden" />
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
    <FullPageSpinner v-else />
  </PanelLayout>
</template>

<style scoped>

</style>