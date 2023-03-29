<script setup>
import VEnigma from './components/VEnigma.vue'
import VTuto from './components/VTuto.vue'
import { onMounted, ref } from 'vue';

const isDeviceMobile = ref(true);
onMounted(() => {
  // let deviceWidth = window.innerWidth;
  if(window.innerWidth > 900){
    isDeviceMobile.value = false;
  }
})
</script>

<template>
  <p v-if="isDeviceMobile == true">L'expérience sur téléphone ou tablette n'est pas optimale. Veuillez utiliser un ordinateur pour accéder à cette page. (ou actualiser si vous avez réduit la taille de la fenêtre ou du viewport)</p>
  <VTuto v-if="isDeviceMobile == false"/>
  <VEnigma v-if="isDeviceMobile == false"/>
</template>

<style scoped>
</style>
