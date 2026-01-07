
// SLIDER

// Først finder jeg alle sliders på siden
document.querySelectorAll('.billed-slider').forEach(slider => {

  // Inde i hver slider henter jeg de elementer jeg skal bruge
  const track = slider.querySelector('.slider-track'); 
  // track er den container der faktisk scroller vandret

  const slides = slider.querySelectorAll('.slide'); 
  // slides er hvert enkelt billede i slideren

  const dots = slider.querySelectorAll('.dot'); 
  // dots er de små prikker, som viser hvilken slide man er på

  const prevBtn = slider.querySelector('.slider-pil.prev'); 
  // knap til at gå til forrige billede

  const nextBtn = slider.querySelector('.slider-pil.next'); 
  // knap til at gå til næste billede


  // Hvis der kun er ét billede, giver slideren ingen mening,
  // så hvis det er tilfældet, stoppes der her
  if (slides.length <= 1) return;

  // currentIndex holder styr på hvilket billede der vises lige nu
  let currentIndex = 0;


  // Denne funktion skifter til et bestemt slide
  function goToSlide(index) {

    // måler bredden på et slide
    const slideWidth = slides[0].offsetWidth;

    // Og scroller track-containeren til det rigtige sted
    track.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'   // giver en blød animation
    });

    // Opdaterer dots, så den aktive får klassen 'aktiv'
    dots.forEach(dot => dot.classList.remove('aktiv'));
    if (dots[index]) dots[index].classList.add('aktiv');

    // Gemmer det nye index
    currentIndex = index;
  }


  // Klik på "næste" pil
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {

      // Regner næste index ud, og starter forfra når vi når slutningen
      const nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(nextIndex);
    });
  }


  // Klik på "forrige"-pilen
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {

      // Regner forrige index ud, og hopper til sidste hvis vi går baglæns fra første
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(prevIndex);
    });
  }


  // Klik på dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);  // skifter direkte til den slide dotten repræsenterer
    });
  });


  // Når brugeren swiper eller scroller manuelt
  track.addEventListener('scroll', () => {

    // Finder ud af hvilket slide vi cirka er på
    const slideWidth = slides[0].offsetWidth;
    const index = Math.round(track.scrollLeft / slideWidth);

    // Hvis index har ændret sig, opdateres dots
    if (index !== currentIndex) {
      dots.forEach(dot => dot.classList.remove('aktiv'));
      if (dots[index]) dots[index].classList.add('aktiv');
      currentIndex = index;
    }
  });
});
