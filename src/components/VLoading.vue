<template>
    <div class="loading">
        <p>Chargement…</p>
        <p class="loading__percentage">{{ percentage }}%</p>
        <div class="loadingBar">
            <div class="loadingBar__progress--left"></div>
            <div class="loadingBar__progress"></div>
            <div class="loadingBar__progress--right"></div>
        </div>
    </div>

</template>

<script setup>
import { onMounted, watch } from 'vue';
const props = defineProps({
    percentage: {
        type: Number,
        required: false
    }
})

onMounted(() => {
    const progressBar = document.querySelector('.loadingBar__progress');
    watch(() => props.percentage, (first, second) => {
        progressBar.style.transform = `scaleX(${props.percentage / 100})`
    })
})

</script>

<style lang="scss">


.loading{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--grey-1000);
    user-select: none;
    touch-action: none;
    pointer-events: none;
    opacity: 0;
    transition: .3s;
    z-index: 1000;
    font: var(--exo-31px-medium);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    
    &--hide{
        opacity: 1;
        user-select: all;
        touch-action: all;
        pointer-events: all;
    }

    &__percentage{
        position: absolute;
        font-size: 186px;
        letter-spacing: .4rem;
        background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        opacity: .3;
    }

    &Bar{
        height: 20px;
        width: 400px;
        border: 1px solid var(--c-txt);
        border-left: none;
        border-right: none;
        background-color: var(--grey-1000);
        padding: 4px;
        position: relative;
        display: flex;
        
        &::after, &::before{
            content: "";
            position: absolute;
            left: -10px;
            top: 3.5px;
            z-index: -1;
            width: 20px;
            height: 20px;
            transform: rotate(45deg);
            border: 1px solid var(--c-txt);
        }

        &::after{
            left: auto;
            right: -10px;
        }

        &__progress{
            background-color: var(--c-txt);
            width: 100%;
            height: 100%;
            transform-origin: left;
            transition: .1s;

            &::after, &::before{
                content: "";
                position: absolute;
                left: -7px;
                top: 3.5px;
                z-index: -1;
                width: 14px;
                height: 14px;
                transform: rotate(45deg);
                background-color: var(--c-txt);
            }

            &::after{
                left: auto;
                right: -7px;
            }
        }
    }
}

</style>