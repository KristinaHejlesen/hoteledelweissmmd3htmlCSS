<script setup>
  import { ref } from 'vue';
  import { faq } from './data.js';

const visacordian = ref(null);
/*funktion hvis værdien af visaccorian er = index, så er værdien sand, sæt værdien af visaccordian til null = den lukker, ellers sæt værdien til at være lig med index og den åbner. Når der klikkes på en accordian får den sit index, <button @click="toggleaccodian(index)"*/
function toggleaccodian(index){
    // Kan også skrives således visacordian.value = visacordian.value === accodian ? null : accodian;
    if(visacordian.value === index){
      visacordian.value = null
    } else {
          visacordian.value = index
        }};
    

</script>

<template>
      <div class="liste">
            <h3>Værd at vide:</h3>
            <div class="accodian">
                <ul>
                  <!--løber igennem listen, med accodian i vores faq-->
                <li v-for="(liste, index) in faq" :key="liste.overskrift" >
                  <!-- når der klikkes på knappen gør funktionen toggleaccodian -->
                    <button @click="toggleaccodian(index)">
                        {{ liste.overskrift }}
                        <i class="fa-solid fa-caret-down"></i>
                    </button>
                    <!--  v-if her vises indholdet hvis visacordian passer med det indhold der er klikket på.-->
                    <div v-if="visacordian === index" class="accodianIndhold">
                        {{liste.beskrivelse}}
                    </div>
                    
                </li>
                </ul>


            </div>
            </div>
</template>

<style scoped>
.liste{
    grid-column: 1;
    line-height: 150%;
}

button{
    padding: 1rem;
    width: 100%;
    text-align: start;
    background-color: white;
    display: flex;
    justify-content: space-between;
  }
  li:first-child button{
    border-radius: 6px 6px 0px 0px;
  }
   li:nth-child(2) button{
  border-radius: 0px;
}
li:last-child button{
  border-radius: 0px 0px 6px;
}
li{
    list-style-type: none;
}
ul{
    padding-inline-start: 0;
}
.accodianIndhold{
    border: 0.09rem solid black;
    
}
</style>