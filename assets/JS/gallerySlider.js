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

   // Henter billedernes sti fra data-images attributten.
  // Eksempel: data-images="img1.jpg, img2.jpg, img3.jpg". Det bliver først lavet om til en tekst, så splittet ved komma og trimmet for mellemrum
  const images = (slider.dataset.images || '')
    .split(',')            // laver teksten om til et array af strings ved komma
    .map(s => s.trim())      // fjerner evt. mellemrum før/efter hver sti
    .filter(Boolean);    // fjerner tomme værdier fra arrayet


    // Hvis der ikke blev fundet nogen billedstier i data-images attributten fx hvis den mangler, er tom eller forkert udfyldt OG hvis der allerede ligger et billede i selve HTML'en, så bruger vi det billede som fallback, så slideren stadig fungerer. Det her gør slideren robust og forhindrer at den går i stykker, hvis der mangler data eller sker fejl .
  if (images.length === 0 && imgEl?.getAttribute('src')) {

    // Her gemmer vi det eksisterende billede fra HTML'en i images-arrayet,
    // så resten af slider-logikken kan arbejde videre som normalt.
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
