<script setup>

</script>

<template>
  <div class="flex flex-row justify-around">
    <aside>
      <h1>Luka</h1>
      <RouterLink to="/timelines/home">Home</RouterLink>
      <br>
      <RouterLink to="/timelines/public">Public</RouterLink>
    </aside>
    <main class="max-w-2xl">
      <slot></slot>
    </main>
    <aside>
      <h1>wah</h1>
    </aside>
  </div>
</template>

<style scoped>

</style>