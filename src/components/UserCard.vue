<script lang="ts" setup>

import { Account } from "@/api/entities/account";
import { FwbAvatar, FwbButton, FwbHeading, FwbListGroup, FwbP } from "flowbite-vue";
import { computed, onMounted, ref } from "vue";
import { Relationship } from "@/api/entities/relationship";
import { call } from "@/api/mastodon";
import { store } from "@/store/store";
import Hamburger from "@/components/Hamburger.vue";
import HamburgerButton from "@/components/HamburgerButton.vue";

const props = defineProps<{
  account: Account
}>();

const relationship = ref<Relationship>(null);
const button = ref(null);
const processing = ref<boolean>(false);

const buttonText = computed(() => {
  if (!relationship.value || store.self_account.id == props.account.id)
    return null;
  
  if (processing.value) {
    return "Processing...";
  }
  
  if (relationship.value.followed_by && relationship.value.following) {
    return "Mutuals";
  } else if (relationship.value.following) {
    return "Unfollow";
  } else if (relationship.value.followed_by) {
    return "Follow back";
  } else {
    return "Follow";
  }
});

onMounted(async () => {
  const relationships = await call<Relationship[]>(`/api/v1/accounts/relationships?id[]=${props.account.id}`);
  if (relationships !== null &&
      relationships.length > 0) {
    relationship.value = relationships[0];
  }
});

let bite = async () => {
  await call<{}>(`/api/v1/bite?id=${props.account.id}`, {});
};

let follow = async () => {
  if (relationship.value === null) {
    return;
  }
  
  processing.value = true;
  const endpoint = relationship.value.following ?
      `/api/v1/accounts/${props.account.id}/unfollow` :
      `/api/v1/accounts/${props.account.id}/follow`;

  processing.value = false;
  relationship.value = await call<Relationship>(endpoint, {});
};

</script>

<template>
  <div class="with-header bg-slate-700 bg-no-repeat bg-cover bg-center" :style="`background-image: url(${props.account.header});`">
    <div class="h-60 flex items-start justify-end">
      <div class="flex items-center m-3 bg-slate-900 bg-opacity-60 p-2 space-x-2">
        <span v-if="buttonText">
          <fwb-button size="sm" ref="button" @click.prevent="follow" :disabled="processing">{{ buttonText }}</fwb-button>
        </span>
        <Hamburger>
          <fwb-list-group>
            <HamburgerButton @click.prevent="bite">Bite</HamburgerButton>
          </fwb-list-group>
        </Hamburger>
      </div>
    </div>
    <div class="user-card backdrop-blur-xl p-2.5 backdrop-brightness-50 space-y-2">
      <div class="flex space-x-3">
        <fwb-avatar class="user-card-avatar" size="xl" :img="props.account.avatar" />
        <div class="space-y-2 max-w-full">
          <fwb-heading tag="h2">{{ props.account.display_name }}</fwb-heading>
          <span class="text-sm text-gray-400">@{{ props.account.acct }}</span>
          <fwb-p v-html="props.account.note"></fwb-p>
        </div>
      </div>
      <div class="flex flex-row justify-around">
        <div>{{ $t("account.posts_count", { count: props.account.statuses_count })}}</div>
        <div>{{ $t("account.followers_count", { count: props.account.followers_count })}}</div>
        <div>{{ $t("account.following_count", { count: props.account.following_count })}}</div>
      </div>
    </div>
  </div>
</template>

<style>
  .user-card * {
    word-break: break-word;
  }

  @media (max-width: 768px)  {
    .user-card-avatar div {
      width: 6rem !important;
      height: 6rem !important;
      max-width: 6rem;
      max-height: 6rem;
    }
    
    .user-card-avatar img {
      max-width: 6rem;
      max-height: 6rem;
    }
  }
</style>