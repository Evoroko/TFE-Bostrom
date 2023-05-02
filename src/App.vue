<script setup>
import VEnigma from './components/VEnigma.vue'
import VStructure from './components/VStructure.vue'
import VCursor from './components/VCursor.vue'
import VTuto from './components/VTuto.vue'
import Inventory from './scripts/Inventory.js'
import { onMounted, ref, provide } from 'vue';

const isDeviceMobile = ref(true);
onMounted(() => {
  // let deviceWidth = window.innerWidth;
  if(window.innerWidth > 900){
    isDeviceMobile.value = false;
  }
})
const inventory = ref(new Inventory());
provide('inventory', inventory);
</script>

<template>
  <VCursor/>
  <p v-if="isDeviceMobile == true">L'expérience sur téléphone ou tablette n'est pas optimale. Veuillez utiliser un ordinateur pour accéder à cette page. (ou actualiser si vous avez réduit la taille de la fenêtre ou du viewport)</p>
  <!-- <VTuto v-if="isDeviceMobile == false"/> -->
  <VStructure v-if="isDeviceMobile == false"/>
  <!-- <VEnigma v-if="isDeviceMobile == false"/> -->
</template>

<style lang="scss" scoped>

</style>
