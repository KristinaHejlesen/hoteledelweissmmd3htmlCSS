import { createApp } from "vue";
import FlipcardGrid from "./components/FlipcardGrid.vue";
import { sommer } from "./data/sommer";
import { vinter } from "./data/vinter";

const mountEl = document.querySelector("#flipcards");

if (mountEl) {
  const saeson = mountEl.dataset.saeson; // "sommer" eller "vinter"
  const cards = saeson === "vinter" ? vinter : sommer;

  createApp(FlipcardGrid, { cards }).mount(mountEl);
}
