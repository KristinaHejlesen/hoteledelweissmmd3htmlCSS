// Filterfunktion til værelsessiden og tabs //

const tabs = document.querySelectorAll('.rooms__tabs .tab');
const cards = document.querySelectorAll('.rooms__list .room-card');

function setActiveTab(clickedTab) {
  tabs.forEach(tab => tab.classList.remove('active'));
  clickedTab.classList.add('active');
}

function filterCards(filter) {
  cards.forEach(card => {
    card.classList.toggle('is-hidden', card.dataset.type !== filter);
  });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.type;  
    setActiveTab(tab);
    filterCards(filter);
  });
});


filterCards('standart');

