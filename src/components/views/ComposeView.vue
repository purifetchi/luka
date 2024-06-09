<script lang="ts" setup>
import PanelLayout from "@/components/layouts/PanelLayout.vue";
import ReplyBox from "@/components/ReplyBox.vue";
import { useRouter } from "vue-router";
import { Status } from "@/api/entities/status";
import {onMounted} from "vue";

onMounted(() => {
  document.title = "Compose a post";
});

const router = useRouter();

let onPostSubmitted = async (status: Status) => {
  await router.push(`/posts/${status.id}`);
}
</script>

<template>
  <PanelLayout>
    <ReplyBox v-on:submitted="onPostSubmitted"/>
  </PanelLayout>
</template>

<style scoped>

</style>