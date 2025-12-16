// Finder alle tabs inde i .rooms__tabs.
const tabs = document.querySelectorAll('.rooms__tabs .tab');

// Finder alle værelses-cards i .rooms__list - det er dem vi vil vise eller skjule, når man klikker på en tab.
const cards = document.querySelectorAll('.rooms__list .room-card');


// Gør den klikkede tab aktiv og fjerner "active" fra de andre
function setActiveTab(clickedTab) {
    //går igennnem alle tabs en for en og fjerner klassen active
  tabs.forEach(tab => tab.classList.remove('active'));
  //Giver klassen active til den tab, der blev klikket på
  clickedTab.classList.add('active');
}


// funktion der bestemmet hvilke cards der skal vises. Vi giver den et filter (standart, familie eller lejlighed). Hvis et cards data-type matcher filteret, vises det, ellers skjules det.
function filterCards(filter) {
  cards.forEach(card => {
    // Hvis cardets data-type ikke matcher filteret,
    // får det klassen "is-hidden" og bliver skjult
    //card.dataset.type læser værdien fra HTML-attributten data-type.
    //classList.toogle bruges til at styre om cardet skal skjules: Hvis (card.dataset.type !== filter) er TRUE (bliver cardet skjult), hvis FALSE - altså at de matcher (bliver cardet vist) fordi is-hidden fjernes. håber det giver mening :)
    card.classList.toggle('is-hidden', card.dataset.type !== filter);
  });
}


// Lytter efter klik på hver tab
tabs.forEach(tab => {
  tab.addEventListener('click', () => {

    // Læser hvilken kategori tabben repræsenterer
    const filter = tab.dataset.type;

    // Opdaterer active-state udseende på tab
    setActiveTab(tab);

    // Så filtrerer vi kortene baseret på den valgte kategori og viser kun dem der matcher filteret, skjuler resten
    filterCards(filter);
  });
});


// Starttilstand: vis kun standartværelser
filterCards('standart');
