<template>
    <VDialog
      v-if="selectedObject && isExisting == true"
      :script="script"
      @conversation-ended="selectedObject = null"
      class="dialog"/>
    <VInventory @inventory-active="inventoryActive = $event"/>
    <VThreeTest
      @open-text-box="selectedObject = $event"
      :dialogVisible="!!selectedObject"/>
</template>

<script setup>
import VThreeTest from './VThreeTest.vue';
import VInventory from './VInventory.vue';
import VDialog from './VDialog.vue';
import { ref, provide, computed, watch } from 'vue';
import Inventory from '../scripts/Inventory.js'
import lvl1Dialog from '../scripts/lvl1-dialog.js'

const inventory = ref(new Inventory());
provide('inventory', inventory);

const selectedObject = ref(null);
const isExisting = ref(false);
const inventoryActive = ref(undefined);
const specialInteraction = ref(undefined);

let defaultSpecialInteraction = [];

for(let dialog of lvl1Dialog){
  if(dialog.name == 'interaction-default'){
    defaultSpecialInteraction = dialog.text;
  }
}

watch(selectedObject, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      specialInteraction.value = undefined;
      isExisting.value = false;
      let isSpecialDialog = false;
      
      for(let dialog of lvl1Dialog){
        if(selectedObject.value === dialog.name && inventoryActive.value == undefined){
          isExisting.value = true;
        }else if(selectedObject.value === dialog.name && inventoryActive.value != undefined){ // si objet possède un dialogue quelconque et que qqch est actif dans l'inventaire
          isExisting.value = true;
          for(let specialDialog of lvl1Dialog){
            if(('interaction-' + selectedObject.value) == specialDialog.name){ // s'il existe une interaction spéciale avec l'objet sélectionné
              isSpecialDialog = true;
              if(specialDialog.object == inventoryActive.value){ // si l'interaction se fait avec l'objet actif
                specialInteraction.value = specialDialog.text;
              }else{
                specialInteraction.value = defaultSpecialInteraction;
              }
            }
          }
          // S'il n'y a pas d'interaction spéciale entre l'objet sélectionné et l'item actif :
          if(isSpecialDialog == false){
            specialInteraction.value = defaultSpecialInteraction;
          }
        }
      }

      if(isExisting.value == false){
        selectedObject.value = null;
      }
    }
},
{ immediate: true }
);

const script = computed(() => {
  for(let dialog of lvl1Dialog){
    if(selectedObject.value === dialog.name && inventoryActive.value == undefined){
      return dialog.text;
    }else if(selectedObject.value === dialog.name && inventoryActive.value){
      console.log('test')
      return specialInteraction.value;
    }
  }
});
</script>

<style lang="scss">
.dialog{
    position: relative;
    z-index: 1000;
}
</style>