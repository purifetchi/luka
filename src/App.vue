<script setup>
</script>

<template>
  <nav>
    <ul>
      <li><RouterLink to="/">Index</RouterLink></li>
      <li><RouterLink to="/info">Instance information</RouterLink></li>
    </ul>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
