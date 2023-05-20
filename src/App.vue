<script setup>
import VStructure from './components/VStructure.vue'
import VCursor from './components/VCursor.vue'
import Inventory from './scripts/Inventory.js'
import { ref, provide, watch } from 'vue';

const inventory = ref(new Inventory());
const audioStatus = ref({
  volume: localStorage.getItem('volume'),
  mute: localStorage.getItem('muted')
});

provide('inventory', inventory);
provide('audioStatus', audioStatus);

</script>

<template>
  <h1 class="title--notdisplayed">BOSTROM — Le jeu</h1>
  <VCursor/>
  <div class="warning">
    <p class="warning__message">L'expérience sur téléphone ou tablette n'est pas optimale. Si vous tenez malgré tout à essayer, passez en mode paysage.</p>
  </div>
  
  <VStructure/>
  <!-- <VEnigma v-if="isDeviceMobile == false"/> -->
</template>

<style lang="scss" scoped>
.title--notdisplayed{
  opacity: 0;
  height: 0;
  touch-action: none;
  user-select: none;
}

.warning{
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(13, 13, 13, .8);
  z-index: 9999;

  &__message{
    max-width: 75ch;
    text-align: center;
    padding: 16px;
  }

  @media (orientation: landscape){
    opacity: 0;
    display: none;
    touch-action: none;
    user-select: none;
    pointer-events: none;
  }
}
</style>
