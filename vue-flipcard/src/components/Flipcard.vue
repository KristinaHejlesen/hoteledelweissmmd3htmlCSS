<template>
  <!-- Kortet er ALTID synligt (mobil + desktop).
       Adfærden skifter i klikKort() -->
  <div class="flipcard" @click="klikKort">
    <div class="flipcard_indre" :class="{ er_vendt: erVendt }">
      <!-- FORSIDE -->
      <div class="flipcard_side flipcard_forside">
        <img class="flipcard_billede" :src="billede" alt="" />

        <div class="flipcard_overlay">
          <div class="flipcard_ikon">
            <!-- Ikon ligger i /public (vue) og i roden (html-site) -->
            <img class="flipcard_ikon_billede" src="/ikon-klik.svg" alt="" />
          </div>

          <h3 class="flipcard_titel">{{ titel }}</h3>
        </div>

        <div class="flipcard_info">i</div>
      </div>

      <!-- BAGSIDE (kun relevant på desktop) -->
      <div class="flipcard_side flipcard_bagside">
        <button class="flipcard_luk" @click.stop="vendKort">×</button>

        <h3 class="flipcard_bagside_titel">{{ titel }}</h3>
        <p class="flipcard_tekst">{{ beskrivelse }}</p>

        <ul class="flipcard_liste">
          <li v-for="(punkt, index) in punkter" :key="index">
            {{ punkt }}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- MODAL (kun når modalAaben=true) -->
  <div v-if="modalAaben" class="modal_overlay" @click="lukModal">
    <div class="modal_indhold" @click.stop>
      <button class="modal_luk" @click="lukModal">×</button>

      <h3 class="modal_titel">{{ titel }}</h3>
      <p class="modal_tekst">{{ beskrivelse }}</p>

      <ul class="modal_liste">
        <li v-for="(punkt, index) in punkter" :key="index">
          {{ punkt }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

defineProps({
  titel: String,
  billede: String,
  beskrivelse: String,
  punkter: Array,
});

/* Desktop: flip-state */
const erVendt = ref(false);

/* Mobil: modal-state */
const modalAaben = ref(false);

/* Breakpoint: desktop fra 900px og op */
const erDesktop = ref(false);

function opdaterBreakpoint() {
  erDesktop.value = window.matchMedia("(min-width: 900px)").matches;

  // Hvis man skifter fra desktop -> mobil: luk flip (mobil skal ikke flippe)
  if (!erDesktop.value) {
    erVendt.value = false;
  }

  // Hvis man skifter fra mobil -> desktop: luk modal (desktop bruger flip)
  if (erDesktop.value) {
    modalAaben.value = false;
  }
}

onMounted(() => {
  opdaterBreakpoint();
  window.addEventListener("resize", opdaterBreakpoint);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", opdaterBreakpoint);
});

/* Klik på kortet =
 - Desktop: flip
 - Mobil: modal */
function klikKort() {
  if (erDesktop.value) {
    vendKort();
  } else {
    aabenModal();
  }
}

function vendKort() {
  erVendt.value = !erVendt.value;
}

function aabenModal() {
  modalAaben.value = true;
}

function lukModal() {
  modalAaben.value = false;
}
</script>

<style scoped>

/* FLIPCARD (fælles for desktop og mobil) */
.flipcard {
  width: 100%;
  height: 325px;
  perspective: 1000px;
  cursor: pointer;
}

/* kortet der roterer */
.flipcard_indre {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.9s ease;
  /* preserve-3 kilde: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style */
  transform-style: preserve-3d;
  /* -webkit-transform-style bruges fordi Safari ellers driller. Bagsiden af card så helt underlig ud i safari, men ikke i chrome. fandt denne løsning. Kilde: https://stackoverflow.com/questions/42744573/backface-visibility-not-working-in-safari  */
  -webkit-transform-style: preserve-3d; 
  border-radius: 5px;
}

.flipcard_indre.er_vendt {
  transform: rotateY(180deg);
}

/* begge sider */
.flipcard_side {
  position: absolute;
  inset: 0;
  border-radius: 5px;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

/* fordi der var problemer i safari, så slrå vi helt fast hvilke z-index der skal være */
.flipcard_forside {
  z-index: 2;
}

.flipcard_bagside {
  z-index: 1;
}

.flipcard_indre.er_vendt .flipcard_forside {
  z-index: 1;
}

.flipcard_indre.er_vendt .flipcard_bagside {
  z-index: 2;
}

/* CARD FORSIDE */

.flipcard_forside {
  background: #000;
}

.flipcard_billede {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: absolute;
  inset: 0;
}

/* overlay gradient + titel */
.flipcard_overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.05)
  );
  z-index: 2;
}

/* ikon i midten */
.flipcard_ikon {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.flipcard_ikon img {
  width: 56px;
  height: 56px;
  filter: brightness(0) invert(1);
}

.flipcard_titel {
  margin: 0;
  color: white;
  font-weight: 800;
  text-transform: uppercase;
  font-size: clamp(18px, 3vw, 36px);
}

.flipcard_info {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  background: white;
  color: #000;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: bold;
}

.flipcard_indre.er_vendt .flipcard_overlay,
.flipcard_indre.er_vendt .flipcard_info {
  opacity: 0;
  pointer-events: none;
}

/* CARD BAGSIDE */

.flipcard_bagside {
  transform: rotateY(180deg);
  background: #6b6258;
  color: #fff;
  padding: 35px 30px 20px;
  position: relative;
  text-align: left;
  overflow-y: auto;
}

.flipcard_luk {
  position: absolute;
  top: -9px;
  right: 2px;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: transparent;
  border: 0;
  color: #fff;
  font-size: 34px;
  line-height: 1;
  cursor: pointer;
}

.flipcard_bagside_titel {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: 700;
}

.flipcard_tekst {
  margin: 0 0 10px;
  font-size: 14px;
  line-height: 1.6;
  max-width: 38ch;
}

.flipcard_liste {
  margin: 0;
  padding-left: 22px;
  font-size: 14px;
  line-height: 1.6;
  max-width: 38ch;
}

.flipcard_liste li {
  margin-bottom: 10px;
}

/* MOBIL: adfærden styres i JS, men vi slår flip-animation fra for sikkerhed */
@media (max-width: 899px) {
  .flipcard_indre {
    transition: none;
  }
}

/* MODAL (mobil) */

.modal_overlay {
  position: fixed;
  inset: 0;
  background: rgba(44, 25, 8, 0.55);
  display: grid;
  place-items: center;
  padding: 18px;
  z-index: 9999;
}

.modal_indhold {
  width: 100%;
  max-width: 320px;
  background: #6b6258;
  color: #fff;
  border-radius: 14px;
  padding: 24px 20px 18px;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
}

.modal_luk {
  position: absolute;
  top: -9px;
  right: 1px;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: transparent;
  border: 0;
  color: #fff;
  font-size: 34px;
  line-height: 1;
  cursor: pointer;
}

.modal_titel {
  margin: 10px 0 12px;
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
}

.modal_tekst {
  margin: 0 0 12px;
  font-size: 15px;
  line-height: 1.7;
  text-align: left;
}

.modal_liste {
  margin: 0;
  padding-left: 22px;
  font-size: 15px;
  line-height: 1.7;
}

.modal_liste li {
  margin-bottom: 10px;
  text-align: left;
}
</style>

