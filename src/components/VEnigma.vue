<template>
    <VCodeOrder/>
    <VCodeInput v-if="canEnterCode == true" @code-attempt=" {attemptedCode = $event; verifyCode()}"/>
    <VDialog
      v-if="selectedObject && isExisting == true"
      :script="script"
      @conversation-ended="selectedObject = null"
      @input-code="inputCode()"
      @changeLevel="changeLevelIndex = $event; changeLevel()"
      class="dialog"/>
    <VInventory @inventory-active="inventoryActive = $event" @click-inspect="inspectItem" @click-use="useSelectedItem()"/>
    <VThree
      @open-text-box="selectedObject = $event"
      :dialogVisible="!!selectedObject"
      :dialogList="levelDialogs"
      :background="background3d"/>
</template>

<script setup>
import VThree from './VThree.vue';
import VInventory from './VInventory.vue';
import VDialog from './VDialog.vue';
import VCodeInput from './VCodeInput.vue';
import VCodeOrder from './VCodeOrder.vue';
import { ref, inject, computed, watch } from 'vue';
import itemsList from '../scripts/items.js'

const props = defineProps({
  background3d: {
    type: String,
    required: false
  },
  levelDialogs: {
    type: Array,
     required: false
  },
  currentLevel: {
    type: Number,
     required: false
  }
})


const inventory = inject('inventory');
const emit = defineEmits(['changeLevel']);

const selectedObject = ref(null);
const isExisting = ref(false);
const inventoryActive = ref(undefined);
const specialInteraction = ref(undefined);
const canEnterCode = ref(false);
const attemptedCode = ref(undefined);
const changeLevelIndex = ref(undefined);
const isUsingItem = ref(false);

const useSelectedItem = () => {
  isUsingItem.value = true;
  inventory.value.isUsing();
}

let defaultSpecialInteraction = [];

const loadDefaultInteraction = () => {
  for(let dialog of props.levelDialogs){
    if(dialog.name == 'interaction-default'){
      defaultSpecialInteraction = dialog.text;
    }
  }
}

loadDefaultInteraction();



watch(selectedObject, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      specialInteraction.value = undefined;
      isExisting.value = false;
      let isSpecialDialog = false;
      
      for(let dialog of props.levelDialogs){
        if(selectedObject.value === dialog.name && isUsingItem.value == false){
          isExisting.value = true;
        }else if(selectedObject.value === dialog.name && isUsingItem.value == true){ // si objet possède un dialogue quelconque et que qqch est actif dans l'inventaire
          isExisting.value = true;
          for(let specialDialog of props.levelDialogs){
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

      if(selectedObject.value){
        if(selectedObject.value.includes('description-')){
          isExisting.value = true;
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
  for(let dialog of props.levelDialogs){
    if(selectedObject.value === dialog.name && isUsingItem.value == false){
      if(dialog.checked == true){
        return dialog.defaultText;
      }
      dialog.checked = true;
      return dialog.text;
    }else if(selectedObject.value === dialog.name && isUsingItem.value == true){
      inventory.value.setAllInactive();
      isUsingItem.value = false;
      console.log("valeur specialInteraction avant d'être renvoyé comme dialogue :") // Pb ici, quand j'ai 2 niveaux, specialInteraction est vide
      console.log(specialInteraction.value) // Pb ici, quand j'ai 2 niveaux, specialInteraction est vide
      return specialInteraction.value;
    }
  }

  if(selectedObject.value.includes('description-')){
    let selectedObjectInspect = selectedObject.value.replace('description-', '');
    for(let item of itemsList){
      if(selectedObjectInspect == item.name){
        return item.description;
      }
    }
  }
});

const inspectItem = () => {
  selectedObject.value = 'description-' + inventoryActive.value;
}

const inputCode = () => {
  canEnterCode.value = true;
}

const verifyCode = () => {
  canEnterCode.value = false;
  if(attemptedCode.value == true){
    selectedObject.value = 'code-true'
  }else{
    selectedObject.value = 'code-false'
  }
}

const changeLevel = () => {
  emit('changeLevel', changeLevelIndex.value);
}

watch(() => props.levelDialogs, () => {
  loadDefaultInteraction();
})
</script>

<style lang="scss">
.dialog{
    position: relative;
    z-index: 1000;
}
</style>