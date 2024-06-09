<script setup>
  import {onBeforeUnmount, onMounted, ref} from "vue";

  const emit = defineEmits(["intersected"]);
  const trigger = ref(null);

  let handleIntersection = (entry) => {
    if (entry.isIntersecting) {
      emit('intersected');
    }
  };
  
  let observer;
  onMounted(() => {
    observer = new IntersectionObserver(entries => {
      handleIntersection(entries[0]);      
    }, {
      type: Object,
      default: {
        root: null,
        threshold: "0"
      }
    });
    
    observer.observe(trigger.value);
  });
  
  onBeforeUnmount(() => {
    observer.disconnect();
  })
</script>

<template>
  <span ref="trigger"></span>
</template>

<style scoped>

</style>