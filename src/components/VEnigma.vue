<template>
    <VDialog v-if="selectedObject" :script="script" @conversation-ended="selectedObject = null" class="dialog"/>
    <VInventory/>
    <VThreeTest @open-text-box="selectedObject = $event" class="scene"/>
</template>

<script setup>
import VThreeTest from './VThreeTest.vue';
import VInventory from './VInventory.vue';
import VDialog from './VDialog.vue';
import { ref, provide, computed } from 'vue';
import Inventory from '../scripts/Inventory.js'
import scenarioTest from '../scripts/scenario-test.js'
import clicCube from '../scripts/clic-cube.js'

const inventory = ref(new Inventory());
provide('inventory', inventory);

const showText = ref(false);

const selectedObject = ref(null);

const script = computed(() => {
  if (selectedObject.value === 'cube') {
    return scenarioTest;
  } else if (selectedObject.value === 'cube2') {
    return clicCube;
  } else {
    return '';
  }
});


</script>

<style lang="scss">
.dialog{
    position: relative;
    z-index: 1000;
}

// .scene{
//     pointer-events: none;
// }
</style>