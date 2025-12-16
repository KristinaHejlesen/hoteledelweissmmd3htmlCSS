
  /*burgermenu */
 
  const burger = document.querySelector("#menu");
 
  const mobileMenu = document.querySelector(".globalNav");

 /*når der klikkes på menu ikonen, tilføjes classen aktiv og nav indholdet vises. */
  burger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });