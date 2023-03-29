<template>
    <div class="bg">
        <form class="code" @submit.prevent="verifyCode">
            <label for="code">Code (3 chiffres) :</label>

            <input type="number" id="code" name="code" min="0" max="999" v-model="code" maxlength="3">

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

</script>

<style lang="scss">

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

</style>