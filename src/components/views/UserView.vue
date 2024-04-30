<script lang="ts" setup>

import { Account } from "@/api/entities/account";
import Timeline from "@/components/Timeline.vue";
import { call } from "@/api/mastodon";
import {onMounted, ref, watch} from "vue";
import { useRoute } from "vue-router";
import UserCard from "@/components/UserCard.vue";
import PanelLayout from "@/components/layouts/PanelLayout.vue";

const route = useRoute();
const endpoint = ref<string>("");
const account = ref<Account>(null);

let updateUserData = async () => {
  account.value = await call<Account>(`/api/v1/accounts/${ route.params.id }`);
  endpoint.value = `/api/v1/accounts/${ route.params.id }/statuses`;
};

onMounted(async () => {
  await updateUserData();
});

watch(() => route.params.id, async newId => {
  await updateUserData();
});

</script>

<template>
  <PanelLayout>
    <div v-if="account">
      <UserCard :account="account" />
      <Timeline class="m-2" :endpoint="endpoint" />
    </div>  
  </PanelLayout>
</template>

<style scoped>

</style>