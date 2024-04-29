<script lang="ts" setup>

import { Account } from "@/api/entities/account";
import Timeline from "@/components/Timeline.vue";
import { call } from "@/api/mastodon";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import UserCard from "@/components/UserCard.vue";
import PanelLayout from "@/components/layouts/PanelLayout.vue";

const route = useRoute();
const account = ref<Account>(null);

onMounted(async () => {
  account.value = await call<Account>(`/api/v1/accounts/${ route.params.id }`);
});

</script>

<template>
  <PanelLayout>
    <div v-if="account">
      <UserCard :account="account" />
      <br>
      <hr>
      <br>
      <Timeline :endpoint="`/api/v1/accounts/${account.id}/statuses`" />
    </div>  
  </PanelLayout>
</template>

<style scoped>

</style>