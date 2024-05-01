<script lang="ts" setup>

import { Status } from "@/api/entities/status";
import { store } from "@/store/store";
import { call } from "@/api/mastodon";
import {onBeforeMount, ref} from "vue";

const props = defineProps<{
  status: Status
}>();

const status = ref<Status>(null);

onBeforeMount(() => {
  status.value = props.status;
});

let doSwitchableAction = async (toggle, positiveAction, negativeAction) => {
  if (store.self_account === null) {
    return;
  }

  const endpoint = toggle === true ?
      `/api/v1/statuses/${props.status.id}/${negativeAction}` :
      `/api/v1/statuses/${props.status.id}/${positiveAction}`;

  const resp = await call<Status>(endpoint, {});
  if (resp !== undefined && resp !== null) {
    status.value = resp;
  }
};

</script>

<template>
  <div class="flex flex-row justify-around">
    <div class="hover:cursor-pointer">
      <v-icon name="ri-reply-line" />  {{ status.replies_count }}
    </div>
    <div class="hover:cursor-pointer" @click="() => doSwitchableAction(props.status.favourited, 'favourite', 'unfavourite')">
      <v-icon v-if="status.favourited" name="ri-heart-3-fill" />
      <v-icon v-else name="ri-heart-3-line" />
      {{ status.favourites_count  }}
    </div>
    <div class="hover:cursor-pointer" @click="() => doSwitchableAction(props.status.reblogged, 'reblog', 'unreblog')">
      <v-icon v-if="status.favourited" name="ri-repeat-fill" />
      <v-icon v-else name="ri-repeat-line" />
      {{ status.reblogs_count }}
    </div>
  </div>
</template>

<style scoped>

</style>