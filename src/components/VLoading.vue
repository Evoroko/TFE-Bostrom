<template>
    <div class="loading">
        <p>Chargement…</p>
        <p class="loading__percentage">{{ percentage }}%</p>
        <div class="loadingBar__container">
            <div class="loadingBar">
                <div class="loadingBar__progress--left"></div>
                <div class="loadingBar__progress"></div>
                <div class="loadingBar__progress--right"></div>
            </div>
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
    position: fixed;
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
    top: 0;
    left: 0;
    
    & > * {
        user-select: none;
        touch-action: none;
    }
    

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
        // border: 1px solid var(--c-txt);
        border-left: none;
        border-right: none;
        background-color: var(--grey-1000);
        padding: 4px;
        position: relative;
        display: flex;

        &__container{
            filter: drop-shadow(0 1px 0 var(--c-txt)) drop-shadow(0 -1px 0 var(--c-txt)) drop-shadow(1px 0 0 var(--c-txt)) drop-shadow(-1px 0 0 var(--c-txt));
        }
        
        &::after, &::before{
            content: "";
            position: absolute;
            left: -32px;
            top: 0;
            z-index: -1;
            width: 32px;
            height: 100%;
            border-top: 1px solid var(--c-txt);
            border-bottom: 1px solid var(--c-txt);
            box-sizing: border-box;
            background-color: var(--grey-1000);
            clip-path: polygon(50% 50%, 100% 100%, 100% 0);
        }

        &::after{
            left: auto;
            right: -32px;
            clip-path: polygon(50% 50%, 0 100%, 0 0);
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
                left: -16px;
                top: 0;
                z-index: -1;
                height: 100%;
                width: 16px;
                // transform: rotate(45deg);
                background-color: var(--c-txt);
                clip-path: polygon(50% 50%, 100% 100%, 100% 0);
            }

            &::after{
                left: auto;
                right: -16px;
                clip-path: polygon(50% 50%, 0 100%, 0 0);
            }
        }
    }
}

</style>