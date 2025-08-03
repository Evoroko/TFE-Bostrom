<template>
  <VVNLayout
    @click="nextText"
    :name="currentName"
    :text="typedText"
    :sprite="currentSprite"
    :spriteProta="currentSpriteProta"
    :displayedItem="displayedItem"
    :background="currentBg"
    :is-dialog-full="isDialogFull"
  />
</template>

<script setup>
import { ref, computed, watch, inject, onUnmounted } from 'vue';
import VVNLayout from './VVNLayout.vue';
import audioControl from '../scripts/audioControl.js';

const inventory = inject('inventory');
const audioStatus = inject('audioStatus');
let bopSound = new Audio('./audio/sounds/bop.wav');
let getItemSound = new Audio('./audio/sounds/confusion-blip-6-3.wav');

const props = defineProps({
  script: {
    type: Array,
    required: false,
  },
});
const emit = defineEmits([
  'conversation-ended',
  'inputCode',
  'changeLevel',
  'inputCodeOrder',
  'changeMusic',
  'activateSwitch',
  'showTuto',
  'showVote',
]);

const texts = ref(props.script);
const isDialogFull = ref(false);

const currentDialogIndex = ref(0);
const i = ref(0);
const typedText = computed(() => {
  const currentText = texts.value[currentDialogIndex.value];
  if (currentText && currentText.text) {
    return currentText.text.slice(0, i.value + 1);
  } else {
    return '';
  }
});
const currentName = computed(() => texts.value[currentDialogIndex.value].name);

const previousSprite = ref('');
const currentSprite = computed(() => {
  return testExisting(
    texts.value[currentDialogIndex.value].sprite,
    previousSprite,
  );
});

const previousSpriteProta = ref('');
const currentSpriteProta = computed(() => {
  return testExisting(
    texts.value[currentDialogIndex.value].spriteProta,
    previousSpriteProta,
  );
});

const previousBg = ref('');
const currentBg = computed(() => {
  return testExisting(
    texts.value[currentDialogIndex.value].background,
    previousBg,
  );
});

const displayedItem = computed(() => {
  return texts.value[currentDialogIndex.value].displayedItem;
});

function testExisting(tested, previous) {
  let test = tested;
  if (test == undefined && previous.value) {
    test = previous.value;
    return test;
  } else if (test == undefined && !previous.value) {
    test = 'none';
    return test;
  } else {
    previous.value = test;
    return test;
  }
}

watch(
  i,
  (newVal, oldVal) => {
    if (newVal !== oldVal && texts.value[currentDialogIndex.value].text) {
      if (newVal < texts.value[currentDialogIndex.value].text.length) {
        setTimeout(() => {
          i.value++;
        }, 10);
      } else {
        i.value = texts.value[currentDialogIndex.value].text.length;
        isDialogFull.value = true;
      }
    }
  },
  { immediate: true },
);

const enterKey = (e) => {
  if (e.keyCode === 13) {
    nextText();
  }
};

window.addEventListener('keydown', enterKey);

onUnmounted(() => {
  window.removeEventListener('keydown', enterKey);
});

let isItACode = false;
let isItACodeOrder = false;
let isItATuto = false;
let isItAVote = false;
let codeData;

const nextText = () => {
  if (texts.value[currentDialogIndex.value].text) {
    if (i.value === texts.value[currentDialogIndex.value].text.length) {
      if (texts.value[currentDialogIndex.value + 1]) {
        if (texts.value[currentDialogIndex.value + 1].inventory) {
          if (texts.value[currentDialogIndex.value + 1].inventory == 'add') {
            audioControl(audioStatus, getItemSound);
            inventory.value.addItem(
              texts.value[currentDialogIndex.value + 1].targetItem,
            );
          } else if (
            texts.value[currentDialogIndex.value + 1].inventory == 'remove'
          ) {
            inventory.value.removeItem(
              texts.value[currentDialogIndex.value + 1].targetItem,
            );
          }
        }
      }

      if (texts.value[currentDialogIndex.value].activateSwitch) {
        emit(
          'activateSwitch',
          texts.value[currentDialogIndex.value].activateSwitch,
        );
      }

      if (texts.value[currentDialogIndex.value].specialAction) {
        if (texts.value[currentDialogIndex.value].specialAction == 'code') {
          isItACode = true;
          codeData = texts.value[currentDialogIndex.value].code;
        } else if (
          texts.value[currentDialogIndex.value].specialAction == 'code-order'
        ) {
          isItACodeOrder = true;
        } else if (
          texts.value[currentDialogIndex.value].specialAction == 'showTuto'
        ) {
          isItATuto = true;
        } else if (
          texts.value[currentDialogIndex.value].specialAction == 'showVote'
        ) {
          isItAVote = true;
        }
      }

      if (texts.value[currentDialogIndex.value].music) {
        emit('changeMusic', texts.value[currentDialogIndex.value].music);
      }

      if (currentDialogIndex.value < texts.value.length) {
        isDialogFull.value = false;
        currentDialogIndex.value++;
        i.value = 0;

        audioControl(audioStatus, bopSound);
      }
    } else {
      i.value = texts.value[currentDialogIndex.value].text.length;
    }
  } else {
    isDialogFull.value = false;
    currentDialogIndex.value++;
  }

  if (currentDialogIndex.value >= texts.value.length) {
    if (isItACode == true) {
      emit('inputCode', codeData);
    } else if (isItACodeOrder == true) {
      emit('inputCodeOrder');
    } else if (isItATuto == true) {
      emit('showTuto');
    } else if (isItAVote == true) {
      emit('showVote');
    }
    emit('conversation-ended');
    currentDialogIndex.value = 0;
  }

  if (texts.value[currentDialogIndex.value].jump) {
    emit('changeLevel', texts.value[currentDialogIndex.value].jump);
    nextText();
  }
};
</script>
