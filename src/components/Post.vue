<script lang="ts" setup>
import { Status } from "@/api/entities/status";
import { FwbAvatar } from "flowbite-vue";
import PostContent from "@/components/PostContent.vue";
import {onMounted, ref, watch} from "vue";

const props = defineProps<{
  status: Status
}>();

const emit = defineEmits<{
  postClicked: [path: Status]
}>();

const baseStatus = ref<Status>(null);

let updateBaseStatus = () => {
  baseStatus.value = props.status.reblog !== null ?
      props.status.reblog :
      props.status;
};

let clicked = (component: MouseEvent) => {
  const name = component.target.tagName.toLowerCase();
  
  // TODO: Is there some better way we can decide on whether to handle the click or not?
  if (name !== "img" && 
      name !== "a" && 
      name !== "svg" && 
      name !== "video") {
    emit("postClicked", baseStatus.value);    
  }
};

onMounted(updateBaseStatus);
watch(() => props.status, updateBaseStatus);

</script>

<template>
  <article @click="clicked" class="p-5 bg-slate-700 space-y-2" v-if="baseStatus">
    <div v-if="props.status.reblog !== null" class="flex flex-row items-center space-x-2">
      <FwbAvatar size="sm" rounded :img="props.status.account.avatar" />
      <div class="text-sm">
        <b><RouterLink :to="`/user/${props.status.account.id}`">{{ props.status.account.display_name }}</RouterLink></b>
        {{ $t("statuses.boosted") }}
      </div>
    </div>
    
    <PostContent :status="baseStatus" />
  </article>
</template>

<style scoped>
</style>