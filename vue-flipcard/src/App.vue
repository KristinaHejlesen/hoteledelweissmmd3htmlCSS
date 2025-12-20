<template>
  <main class="side">
    <h1 class="overskrift">Sommeroplevelser i Alperne</h1>

    <FlipcardGrid :cards="sommer" />
  </main>
</template>

<script setup>
import FlipcardGrid from "./components/FlipcardGrid.vue";
import { sommer } from "./data/sommer.js";
</script>

<style scoped>
.side {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 16px;
}

.overskrift {
  font-size: 48px;
  margin: 0 0 24px;
  color: white;
}
</style>
