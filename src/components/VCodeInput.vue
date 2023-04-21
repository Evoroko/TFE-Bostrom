<template>
    <div class="bg">
        <form class="code" @submit.prevent="verifyCode">
            <label for="code">Code (3 chiffres) :</label>

            <input type="number" id="code" name="code" min="0" max="999" v-model="code" maxlength="3">

            <div class="keyboard">
                <ul class="keyboard__row">
                    <li @click="enterKey" class="keyboard__key">1</li>
                    <li @click="enterKey" class="keyboard__key">2</li>
                    <li @click="enterKey" class="keyboard__key">3</li>
                </ul>
                <ul class="keyboard__row">
                    <li @click="enterKey" class="keyboard__key">4</li>
                    <li @click="enterKey" class="keyboard__key">5</li>
                    <li @click="enterKey" class="keyboard__key">6</li>
                </ul>
                <ul class="keyboard__row">
                    <li @click="enterKey" class="keyboard__key">7</li>
                    <li @click="enterKey" class="keyboard__key">8</li>
                    <li @click="enterKey" class="keyboard__key">9</li>
                </ul>
                <ul class="keyboard__row">
                    <li @click="enterKey" class="keyboard__key">0</li>
                    <li @click="enterKey" class="keyboard__key keyboard__key--small">←</li>
                </ul>
            </div>

            <button type="submit">Valider</button>
        </form>
    </div>
    
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['codeAttempt']);
const code = ref('')
let isCodeCorrect = false;

const verifyCode = () => {
    if(code.value === 100){
        isCodeCorrect = true;
    }
    emit('codeAttempt', isCodeCorrect);
}

const enterKey = (e) => {
    const input = document.querySelector('#code');
    if(e.target.innerText === "←"){
        input.value = null;
        code.value = null;
    }else{
        input.value = input.value + e.target.innerText;
        code.value = Number(input.value);
    }
}

</script>

<style lang="scss" scoped>

.code{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: black;
    padding: 12px;
}

.keyboard{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;

    &__row{
        display: flex;
        gap: 8px;        
    }

    &__key{
        flex-grow: 1;
        cursor: pointer;
        background-color: white;
        color: black;

        &--small{
            flex-grow: .5;
        }
    }
}

</style>