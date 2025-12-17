
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
  
/*lukker dropdown når der klikkes udenfor boksen */
/*kode lavet med hjælp fra https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_dropdown_navbar_click */
window.onclick = function(luk) {
  /*hvis det der klikkes på i winduet ikke har class dropbtn, altås vi trykker ikke på knappen, gør følgende */
  if(!luk.target.matches('.dropbtn')){
    const dropdownIndhold = document.querySelectorAll('.dropdownIndhold');
    /*for hver element med class dropdownindhold(det er vores dropdown kasse) */
    dropdownIndhold.forEach((dropdown) =>{
      /*hvis "kassen" har class=show, så skal du fjerne den, og så lukker vores dropdown "kasse" */
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      }
    });
  }
}


  /*dropdown animation.. virker ikke!!! OBS nodelist.. skal loopes igennem!*/
  // const ikon = document.querySelectorAll(".animatepil");
  // ikon.forEach((ikon) =>{
  //   btn.addEventListener("click", () =>{
  //     ikon.classList.toggle("dropdownAnimation");

  //   });

  // });

 
