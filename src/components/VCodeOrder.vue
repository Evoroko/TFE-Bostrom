<template>
    <div class="bg">
        <div class="code" @submit.prevent="verifyCode">
            <p>Pavé distributeur :</p>
            <ul class="keyboard keyboard--4columns">
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">1</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">2</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">3</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">4</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">5</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">6</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">7</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">8</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">9</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">10</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">11</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">12</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">13</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">14</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">15</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--notxt">16</li>
                <li @click="activateKey" class="keyboard__key keyboard__key--full">Réinitialiser</li>
            </ul>

            <button>Valider</button>
            <div class="result" v-if="codeResultDisplayed">
                <p class="result__text">Code incorrect.</p>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { ref, onMounted } from 'vue'
const emit = defineEmits(['codeAttempt']);
let countSelected = 0;
const codeResultDisplayed = ref(false);
// const code = ref('')
// let isCodeCorrect = false;

// const verifyCode = () => {
//     if(code.value === 100){
//         isCodeCorrect = true;
//     }
//     emit('codeAttempt', isCodeCorrect);
// }

let keys;

onMounted(() => {
    keys = document.querySelectorAll('.keyboard__key');
})

const activateKey = (e) => {
    countSelected += 1;
    if(e.target.innerText === "Réinitialiser" || countSelected >= 4){
        // Reset
        countSelected = 0;
        for(let key of keys){
            key.classList.remove('keyboard__key--active');
            codeResultDisplayed.value = true;
            setTimeout(() => {
                codeResultDisplayed.value = false;
            }, 1000)
        }
    }else{
        e.target.classList.add('keyboard__key--active');
    }
}

</script>

<style lang="scss" scoped>

.keyboard__key--active{
    border: 1px solid red;
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
    100%{
        opacity: 1
    }
}

</style>