<script lang="ts" setup>
import { Status } from "@/api/entities/status";
import { FwbAvatar } from "flowbite-vue";
import PostContent from "@/components/PostContent.vue";
import {onMounted, ref, watch} from "vue";

const props = defineProps<{
  status: Status
}>();

const baseStatus = ref<Status>(null);

let updateBaseStatus = () => {
  baseStatus.value = props.status.reblog !== null ?
      props.status.reblog :
      props.status;
};

onMounted(updateBaseStatus);
watch(() => props.status, updateBaseStatus);

</script>

<template>
  <article class="p-5 bg-slate-700 space-y-2" v-if="baseStatus">
    <div v-if="props.status.reblog !== null" class="flex flex-row space-x-1">
      <FwbAvatar size="sm" rounded :img="props.status.account.avatar" />
      <div class="text-sm">{{ props.status.account.display_name }} boosted</div>
    </div>
    
    <PostContent :status="baseStatus" />
  </article>
</template>

<style scoped>
</style>