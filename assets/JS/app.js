
  /*burgermenu */
 
  const burger = document.querySelector("#menu");
 
  const mobileMenu = document.querySelector(".globalNav");

 /*når der klikkes på menu ikonen, tilføjes classen aktiv og nav indholdet vises. */
  burger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    /*tilføjer class active til burgermenu ikonet, dette bruges til at lave animationen fra tre streger til et kryds */
    burger.classList.toggle("active");
  });

  /*dropdown klik */
  /*vælger alle knapper med class dropbtn */
  const btnNav = document.querySelectorAll(".dropbtn");
  
  /*looper igennem alle knapper med class dropbtn og lytter efter click.  */
  btnNav.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      /*nextElementSibling returne det næste element, som i dette tilfælde er vores dropdownIndhold, der tilføjer vi class show */
      btn.nextElementSibling.classList.toggle("show");
    });
  });
  
  /*dropdown animation.. virker ikke!!! OBS nodelist.. skal loopes igennem!*/
  // const ikon = document.querySelectorAll(".animatepil");
  // ikon.forEach((ikon) =>{
  //   btn.addEventListener("click", () =>{
  //     ikon.classList.toggle("dropdownAnimation");

  //   });

  // });

 
