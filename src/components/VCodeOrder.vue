<template>
    <div class="bg bg--white">
        <div class="code">
            <div class="code__container">
                <p class="title title--medium">Tapez sur le clavier du distributeur</p>
                <ul class="keyboard keyboard--4columns">
                    <li @click="activateKey" class="keyboard__key" data-index="1"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="2"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="3"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="4"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="5"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="6"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="7"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="8"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="9"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="10"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="11"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="12"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="13"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="14"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="15"></li>
                    <li @click="activateKey" class="keyboard__key" data-index="16"></li>
                    <li @click="activateKey" class="keyboard__key keyboard__key--back keyboard__key--full">Réinitialiser</li>
                </ul>

                <VButton @click="closeCode()">Retour</VButton>
                <div class="result result--false" v-if="codeResultDisplayed">
                    <p class="result__text">Code incorrect</p>
                </div>
                <div class="result result--true" v-if="codeResultTrueDisplayed">
                    <p class="result__text">Code valide&nbsp;!</p>
                </div>
            </div>
            
        </div>
    </div>
    
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import VButton from './VButton.vue';
import audioControl from '../scripts/audioControl.js'
const emit = defineEmits(['codeCorrect', 'closeCode']);
const props = defineProps({
    validCode: {
        type: Array,
        required: true
    }
})

const audioStatus = inject('audioStatus');
let incorrectSound = new Audio('./audio/sounds/warning-ui.wav');
let correctSound = new Audio('./audio/sounds/weird-buttons.wav');
let keySound = new Audio('./audio/sounds/bop.wav');

let countSelected = 0;
const codeResultDisplayed = ref(false);
const codeResultTrueDisplayed = ref(false);
let keys;
let lastSelected;
let lastSelectedNumber;
let enteredCode = [];

onMounted(() => {
    keys = document.querySelectorAll('.keyboard__key');
})

const activateKey = (e) => {
    countSelected += 1;
    let alreadySelected = false;
    audioControl(audioStatus, keySound);

    for(let entry of enteredCode.entries()){
        if(entry == e.target.dataset.index){
            alreadySelected = true;
            countSelected -= 1;
        }
    }

    if(e.target.innerText === "Réinitialiser"){
        resetCode();
    }else if(alreadySelected == false && codeResultDisplayed.value == false){
        e.target.classList.add('keyboard__key--active');
        enteredCode.push(Number(e.target.dataset.index));
        lastSelectedNumber = e.target.dataset.index;
        e.target.innerHTML = countSelected;
        lastSelected = e.target;
    }

    if(countSelected >= 4){
        let validEntries = 0;
        for(let [index, codePart] of props.validCode.entries()){
            if(codePart == enteredCode[index]){
                validEntries += 1;
            }
        }

        if(validEntries == 4){
            codeResultTrueDisplayed.value = true;
            audioControl(audioStatus, correctSound);
            setTimeout(() => {
                emit('codeCorrect');
                codeResultTrueDisplayed.value = false;
                resetCode();
            }, 1000)
        }else{
            codeResultDisplayed.value = true;
            audioControl(audioStatus, incorrectSound);
            setTimeout(() => {
                resetCode();
                codeResultDisplayed.value = false;
            }, 1000)
        }
    }
}

const resetCode = () => {
    lastSelected = undefined;
    countSelected = 0;
    enteredCode = [];
    for(let [index, key] of keys.entries()){
        if(index !== keys.length - 1){
            key.classList.remove('keyboard__key--active');
            key.innerHTML = '';
        }
    }
}

const closeCode = () => {
    emit('closeCode');
}

</script>

<style lang="scss">

.keyboard__key--active{
    position: relative;
    
    &::after{
        content: "";
        width: 24px;
        height: 24px;
        border: 1px solid var(--grey-1000);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
    }
}
.result{
    font: var(--exo-61px-medium);
    text-transform: uppercase;
    position: fixed;
    top: 50%;
    left: 50%;
    height: 96px;
    transform: translate(-50%, -50%);
    width: max-content;
    display: flex;
    animation: codeResult 1s;
    user-select: none;
    
    &__text{
        background-color: var(--transparent-black-80);
        display: flex;
        align-items: center;
    }

    &::before, &::after{
        content: "";
        width: 64px;
        height: 100%;
    }

    &::after{
        background: linear-gradient(270deg, rgba(13, 13, 13, 0) 0%, rgba(13, 13, 13, 0.8) 100%);
    }

    &::before{
        background: linear-gradient(270deg, rgba(13, 13, 13, 0.8) 0%, rgba(13, 13, 13, 0) 100%);
    }
}

@keyframes codeResult {
    0%{
        opacity: 0
    }
    20%{
        opacity: 1
    }
    80%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}

</style>