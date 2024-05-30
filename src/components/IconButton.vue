<script lang="ts" setup>

const props = defineProps<{
  icon: string,
  toggle?: boolean
  selected?: boolean
}>();

</script>

<template>
 <v-icon 
     :name="props.icon" 
     scale="1.5" 
     :color="!props.selected && props.toggle ? '#ffffff80' : '#ffffff'" 
     class="hover:cursor-pointer" 
 />
</template>

<style scoped>

</style>