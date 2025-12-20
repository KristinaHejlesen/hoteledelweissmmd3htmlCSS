<template>
  <section class="grid">
    <flipcard
      v-for="card in cards"
      :key="card.id"
      :titel="card.titel"
      :billede="card.billede"
      :beskrivelse="card.beskrivelse"
      :punkter="card.punkter"
    />
  </section>
</template>

<script setup>
import flipcard from "./Flipcard.vue";

defineProps({
  cards: Array,
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 1fr));
  gap: 14px;
}
</style>
