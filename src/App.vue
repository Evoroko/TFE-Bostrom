<script setup>
import VStructure from './components/VStructure.vue'
import VCursor from './components/VCursor.vue'
import Inventory from './scripts/Inventory.js'
import { onMounted, ref, provide, watch } from 'vue';

const isDeviceMobile = ref(true);
onMounted(() => {
  // let deviceWidth = window.innerWidth;
  if(window.innerWidth > 900){
    isDeviceMobile.value = false;
  }
})
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
  <p v-if="isDeviceMobile == true">L'expérience sur téléphone ou tablette n'est pas optimale. Si malgré tout vous tenez à essayer sur téléphone, passez en mode paysage et actualisez la page.</p>
  
  <VStructure v-if="isDeviceMobile == false"/>
  <!-- <VEnigma v-if="isDeviceMobile == false"/> -->
</template>

<style lang="scss" scoped>
.title--notdisplayed{
  opacity: 0;
  height: 0;
  touch-action: none;
  user-select: none;
}
</style>
