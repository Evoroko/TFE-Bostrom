<template>
    <div class="tutoDialog" v-if="isDisplayed">
        <div class="tutoDialog__el">
            <div class="tutoDialog__keys">
                <img src="/assets/key_enter.svg" alt="Touche entrée">
                <p>ou</p>
                <img src="/assets/key_cursor.svg" alt="Clic du curseur">
            </div>
            <p>Dialogue suivant</p>
        </div>
        <div class="tutoDialog__el">
            <div class="tutoDialog__keys">
                <img src="/assets/key_enter.svg" alt="Touche entrée">
                <p>maintenu</p>
            </div>
            <p>Passer</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const isDisplayed = ref(true);

onMounted(() => {
    const tutoDialog = document.querySelector('.tutoDialog');
    tutoDialog.addEventListener("animationend", () => {
        isDisplayed.value = false;
    })
})
</script>

<style lang="scss">

.tutoDialog{
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 2000;

    display: flex;
    gap: 48px;
    justify-content: center;
    align-items: center;

    animation: .5s fadeOut forwards;
    animation-delay: 5s;

    &__el{
        display: flex;
        flex-direction: column;
        gap: 8px;
        justify-content: center;
        align-items: center;
    }

    &__keys{
        display: flex;
        gap: 8px;
        justify-content: center;
        align-items: center;
        font-size: 13px;
    }
}

@keyframes fadeOut {
    0%{
        opacity: 1;
    }

    100%{
        opacity: 0;
    }
}

</style>