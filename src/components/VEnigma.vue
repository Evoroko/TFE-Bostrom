<template>
  <VTutoDialog/>
  <VVote 
    v-if="openVote == true"
    @close-vote="openVote = false"
  />
  <div class="topfunctions">
    <VMusicControl :music="playedMusic"/>
    <VButton class="tuto__openBtn" @click="openTuto = true" v-if="hideHover == false">Tutoriel</VButton>
  </div>
  <VTuto
    @closeTuto="openTuto = false"
    v-if="openTuto == true"
    :current-level="currentLevel"
  />
  <VCodeOrder
    v-if="canEnterCodeOrder == true"
    @closeCode="canEnterCodeOrder = false"
    :valid-code="[10, 16, 3, 7]"
    @code-correct="verifyCodeOrder"
  />
  <VCodeInput
    v-if="canEnterCode == true"
    @closeCode="canEnterCode = false"
    @code-attempt="{attemptedCode = $event; verifyCode()}"
    :keyboardKeys="codeData.keyboardKeys"
    :answer="codeData.answer"
  />
  <Transition name="test" mode="out-in">
    <VDialog
      v-if="selectedObject && isExisting == true"
      :script="script"
      @conversation-ended="selectedObject = null; loadOutro();"
      @input-code="codeData = $event; inputCode()"
      @input-code-order="inputCodeOrder()"
      @showTuto="openTuto = true"
      @showVote="openVote = true"
      @changeLevel="changeLevelIndex = $event; changeLevel()"
      @change-music="playedMusic = $event;"
      @activate-switch="currentlyAddedSwitch = $event;activateSwitch();"
      class="dialog"
    />
  </Transition>
  
  <VInventory
    v-if="hideHover == false"
    @inventory-active="inventoryActive = $event"
    @click-inspect="inspectItem"
    @click-use="useSelectedItem()"
    @clickCancel="isUsingItem = false"
  />
  <VThree
    v-if="background3d"
    @open-text-box="selectedObject = $event"
    :dialogVisible="hideHover"
    :dialogList="levelDialogs"
    :background="background3d"
    @loadingFinished="loadIntro()"
    :activatedSwitches="activatedSwitches"
  />
</template>

<script setup>
import VThree from './VThree.vue';
import VInventory from './VInventory.vue';
import VDialog from './VDialog.vue';
import VCodeInput from './VCodeInput.vue';
import VCodeOrder from './VCodeOrder.vue';
import VMusicControl from './VMusicControl.vue';
import VButton from './VButton.vue';
import VTuto from './VTuto.vue'
import VTutoDialog from './VTutoDialog.vue'
import VVote from './VVote.vue'
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
const canEnterCodeOrder = ref(false);
const attemptedCode = ref(undefined);
const changeLevelIndex = ref(undefined);
const isUsingItem = ref(false);
const playedMusic = ref('no_music');
const codeData = ref({});
const activatedSwitches = ref([]);
const currentlyAddedSwitch = ref();
const openTuto = ref(false);
const openVote = ref(false);
const preventClickBg = ref(false);

const hideHover = computed(() => {
  if(openTuto.value == false && !!selectedObject.value == false && canEnterCode.value == false && canEnterCodeOrder.value == false && preventClickBg.value == false && openVote.value == false){
    return false;
  }

  return true;
})

const useSelectedItem = () => {
  isUsingItem.value = true;
  inventory.value.isUsing();
}

let defaultSpecialInteraction = [];
let introDialog = [];

const loadDefaultInteraction = () => {
  for(let dialog of props.levelDialogs){
    if(dialog.name == 'interaction-default'){
      defaultSpecialInteraction = dialog.text;
    }
  }
}
const loadIntro = () => {
  for(let dialog of props.levelDialogs){
    if(dialog.name == 'intro'){
      dialog.checked = false;
    }
  }
  selectedObject.value = 'intro';
}

const loadOutro = () => {
  let countOutro = 0;

  for(let activatedSwitch of activatedSwitches.value){
    if(activatedSwitch.includes('convo')){
      countOutro += 1;
    }
  }

  if(countOutro == 4){
    preventClickBg.value = true;
    setTimeout(() => {
      selectedObject.value = 'outro';
      preventClickBg.value = false;
    }, 300);
    
    activatedSwitches.value = [];
  }  
}


loadDefaultInteraction();
loadIntro();




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
              if(specialDialog.object == inventoryActive.value){ // si l'interaction spéciale se fait bien avec l'objet actif
                if(specialDialog.conditions){ // Y a-t-il un dialogue différent si on a déjà interagi avec certaines choses ?
                  let conditionsMet = 0;
                  for(let condition of specialDialog.conditions.requires){ // Pour chaque condition d'activation, vérifie ce qui a été activé ou non
                    if(activatedSwitches.value[0]){
                      for(let activatedSwitch of activatedSwitches.value){
                        if(activatedSwitch == condition){
                          conditionsMet += 1;
                        }
                      }
                    }
                  }
                  if(conditionsMet == specialDialog.conditions.requires.length){ // Si tout ce qui devait être activé pour le dialogue nécessitant des conditions, renvoie le dialogue approprié
                    specialInteraction.value = specialDialog.conditions.text;
                  }else{
                    specialInteraction.value = specialDialog.text;
                  }
                }else{
                  specialInteraction.value = specialDialog.text;
                }
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

      const returnDialog = () => {
        if(dialog.checked == true){
          return dialog.defaultText;
        }
        dialog.checked = true;
        return dialog.text;
      }

      if(dialog.conditions){
        let conditionsMet = 0;
        for(let condition of dialog.conditions.requires){
          if(activatedSwitches.value[0]){
            for(let activatedSwitch of activatedSwitches.value){
              if(condition == activatedSwitch){
                conditionsMet += 1;
              }
            }
          }
        }
        if(conditionsMet == dialog.conditions.requires.length){
          if(dialog.conditions.checked == true){
            return dialog.conditions.defaultText;
          }
          dialog.conditions.checked = true;
          return dialog.conditions.text;
        }else{
          return returnDialog();
        }
      }else{
        return returnDialog();
      }

    }else if(selectedObject.value === dialog.name && isUsingItem.value == true){
      inventory.value.setAllInactive();
      isUsingItem.value = false;
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

const inputCodeOrder = () => {
  canEnterCodeOrder.value = true;
}

const verifyCode = () => {
  canEnterCode.value = false;
  if(attemptedCode.value == true){
    selectedObject.value = 'code-true-' + codeData.value.name;
  }else{
    selectedObject.value = 'code-false-' + codeData.value.name;
  }
}

const verifyCodeOrder = () => {
  canEnterCodeOrder.value = false;
  selectedObject.value = 'code-order-true'  
}

const changeLevel = () => {
  emit('changeLevel', changeLevelIndex.value);
}

const activateSwitch = () => {
  let alreadyExists = false;

  for(let activatedSwitch of activatedSwitches.value){
    if(activatedSwitch == currentlyAddedSwitch.value){
      alreadyExists = true;
    }
  }

  if(alreadyExists == false){
    activatedSwitches.value.push(currentlyAddedSwitch.value);
  }

  
}


watch(() => props.levelDialogs, () => {
  loadDefaultInteraction();
  for(let dialog of props.levelDialogs){
    dialog.checked = false;
    if(dialog.conditions){
      dialog.conditions.checked = false;
    }
  }
})
</script>

<style lang="scss">
.dialog{
    position: relative;
    z-index: 1000;
}

.topfunctions{
  position: fixed;
  z-index: 1100;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;
  align-items: center;
}

.tuto__openBtn{
  animation: .3s slideinLeft;
}
</style>