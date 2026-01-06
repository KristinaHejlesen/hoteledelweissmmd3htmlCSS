// 
// MINI SLIDER 
// 
document.querySelectorAll('.billed-slider').forEach(slider => {
  const track = slider.querySelector('.slider-track');
  const slides = slider.querySelectorAll('.slide');
  const dots = slider.querySelectorAll('.dot');
  const prevBtn = slider.querySelector('.slider-pil.prev');
  const nextBtn = slider.querySelector('.slider-pil.next');
  // Hvis der kun er ét billede, gør vi ingenting
  if (slides.length <= 1) return;
  let currentIndex = 0;
  function goToSlide(index) {
    const slideWidth = slides[0].offsetWidth;
    track.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'
    });
    dots.forEach(dot => dot.classList.remove('aktiv'));
    if (dots[index]) dots[index].classList.add('aktiv');
    currentIndex = index;
  }
  // Næste
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(nextIndex);
    });
  }
  // Forrige
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const prevIndex =
        (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(prevIndex);
    });
  }
  // Dots klik
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });
  // Opdater dot når man swiper manuelt
  track.addEventListener('scroll', () => {
    const slideWidth = slides[0].offsetWidth;
    const index = Math.round(track.scrollLeft / slideWidth);
    if (index !== currentIndex) {
      dots.forEach(dot => dot.classList.remove('aktiv'));
      if (dots[index]) dots[index].classList.add('aktiv');
      currentIndex = index;
    }
  });
});

