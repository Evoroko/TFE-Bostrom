<template>
    <VVNLayout
      @click="nextText"
      :name="currentName"
      :text="typedText"
      :sprite="currentSprite"
      :background="currentBg"
    />
</template>

<script setup>
import { ref, computed, watch, inject } from 'vue';
import VVNLayout from './VVNLayout.vue'

const inventory = inject('inventory');

const props = defineProps({
    script: {
        type: Array,
        required: false
    }
})
const emit = defineEmits(['conversation-ended', 'inputCode']);

const texts = ref(props.script);

const currentDialogIndex = ref(0);
const i = ref(0);
const typedText = computed(() =>
    texts.value[currentDialogIndex.value].text.slice(0, i.value + 1)
);
const currentName = computed(() => texts.value[currentDialogIndex.value].name);
const currentSprite = computed(() => texts.value[currentDialogIndex.value].sprite);

let previousBg = '';
const currentBg = computed(() => {
let bg = texts.value[currentDialogIndex.value].background;
if(bg == undefined && previousBg){
    bg = previousBg;
    return bg;
}else{
    previousBg = bg;
    return bg;
}
})


watch(i, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        if (newVal < texts.value[currentDialogIndex.value].text.length) {
            setTimeout(() => {
            i.value++;
            }, 10);
        } else {
            i.value = texts.value[currentDialogIndex.value].text.length;
        }
    }
},
{ immediate: true }
);

window.addEventListener('keydown', (e) => {
    if(e.keyCode === 13){
        nextText();
    }
})

let isItACode = false;

const nextText = () => {
    if (i.value === texts.value[currentDialogIndex.value].text.length) {
        if(texts.value[currentDialogIndex.value].specialAction){
            if(texts.value[currentDialogIndex.value].specialAction == 'code'){
                isItACode = true;
            }
        }

        currentDialogIndex.value++;
        i.value = 0;
    } else {
        i.value = texts.value[currentDialogIndex.value].text.length;
    }

    if (currentDialogIndex.value >= texts.value.length) {
        setTimeout(() => {
            if(isItACode == true){
                emit('inputCode');
            }
            emit('conversation-ended');
        }, 1) // Délai car sinon le dernier clic qui ferme le dialogue en déclenche un autre immédiatement / cause des conflits
        currentDialogIndex.value = 0;
    }

    if(texts.value[currentDialogIndex.value].inventory){
        if(texts.value[currentDialogIndex.value].inventory == 'add'){
            inventory.value.addItem(texts.value[currentDialogIndex.value].itemAdded);
        }
    }

};

</script>