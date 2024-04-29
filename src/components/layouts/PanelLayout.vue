<script setup>

</script>

<template>
  <div class="flex flex-row justify-around">
    <aside>
      <div class="sticky top-0">
        <h1>Luka</h1>
        <br>
        <RouterLink to="/timelines/home">Home</RouterLink>
        <br>
        <RouterLink to="/timelines/public">Public</RouterLink>
      </div>
    </aside>
    <main class="max-w-2xl">
      <slot></slot>
    </main>
    <aside>
      <div class="sticky top-0">
        wah
      </div>
    </aside>
  </div>
</template>

<style scoped>

</style>