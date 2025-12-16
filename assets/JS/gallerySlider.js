// Galleri slider til selve hotelværelset

//Finder sektionen i HTML
const slider = document.querySelector('.room-images');
// Kører kun koden, hvis slideren findes på siden
if (slider) {
    //finder selve img element, som skal kunne skifte billede
  const imgEl = slider.querySelector('.room-image img');
  //finder de to pile til højre og venstre
  const btnLeft = slider.querySelector('.image-arrow--left');
  const btnRight = slider.querySelector('.image-arrow--right');

  // Henter billedernes sti fra data-images attribut og laver dem om til et array
  const images = (slider.dataset.images || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  // Hvis der ikke er flere billeder, bruger vi det første som allerede er i HTMLen
  if (images.length === 0 && imgEl?.getAttribute('src')) {
    images.push(imgEl.getAttribute('src'));
  }
//Holder styr på hvilket billede der vises lige nu
  let index = 0;


  function showImage(i) {
    if (!imgEl || images.length === 0) return;

    // Hopper fra det sidste til det første og omvendt
    index = (i + images.length) % images.length;
    imgEl.src = images[index];
  }

  //klik på knapperne viser henholdsvis næste og forrige billede
  btnLeft?.addEventListener('click', () => showImage(index - 1));
  btnRight?.addEventListener('click', () => showImage(index + 1));

  // Start altid med første billede
  showImage(0);
}
