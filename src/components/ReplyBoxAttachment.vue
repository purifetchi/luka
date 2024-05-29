<script lang="ts" setup>
  import {MediaAttachment} from "@/api/entities/media-attachment";
  import Attachment from "@/components/Attachment.vue";
  import {FwbInput} from "flowbite-vue";
  import {ref} from "vue";
  import {call, Method} from "@/api/mastodon";

  const cw = ref<string>("");
  
  const props = defineProps<{
    attachment: MediaAttachment
  }>();
  
  let updateData = async () => {
    let params = {
      id: props.attachment.id,
      description: cw.value
    };
    
    const resp = call<MediaAttachment>(
        `/api/v1/media/${params.id}`, 
        params,
        Method.PUT);
  };
</script>

<template>
  <div class="space-y-2 p-3 border-slate-700 border-[1px]">
    <Attachment class="h-[10rem] block" :attachment="props.attachment" />
    <fwb-input v-model="cw" placeholder="Description.." v-on:input.prevent="updateData"></fwb-input>    
  </div>
</template>

<style scoped>

</style>