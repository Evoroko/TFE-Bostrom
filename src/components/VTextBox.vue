<template>

    <div class="textbox">
        <div class="textbox__name" v-if="name !== 'none' && name && name != 'Anaëlle'">
            <p>{{ name }}</p>
        </div>
        <div class="textbox__content">
            <div class="textbox__text">
                <p v-html="text"></p>
                <VJumpText v-if="isDialogFull"/>

            </div>
        </div>
    </div>
    
    <p class="textbox__skip">Maintenir ⏎ pour passer.</p>
    
    <div v-if="name !== 'none' && name && name == 'Anaëlle'" class="textbox__name textbox__name--prota">
            <p>{{ name }}</p>
    </div>

</template>

<script setup>
import VJumpText from './VJumpText.vue'
const props = defineProps({
    name: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: false
    },
    isDialogFull: {
        type: Boolean,
        required: false
    }
})

</script>

<style lang="scss">

.textbox{
    width: 100%;
    height: 144px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    user-select: none;
    animation: slideinUp .3s;

    &__skip{
        position: absolute;
        left: 16px;
        top: 16px;
        font: var(--exo-13px-medium);
        color: var(--c-txt);
        border: none;
        padding: 4px;
        background-color: var(--transparent-black-60);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    &__content{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 160px;
        background-color: var(--transparent-black-80);
        padding: 32px;
        box-sizing: border-box;
        overflow: hidden;
    }

    &__name{
        position: absolute;
        height: 48px;
        top: -64px;
        left: 0;
        background-color: var(--transparent-black-80);
        padding: 8px 32px;
        @media (min-width: 864px){
            padding: 8px 16px 8px 0;
        }
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font: var(--exo-20px-bold);

        &::before{
            content: "";
            height: 48px;
            width: calc((100vw - 800px) / 2);
        }

        &--prota{
            position: fixed;
            left: 0;
            bottom: 160px;
            top: auto;
            padding: 8px 32px;
            @media(min-width: 864px){
                padding: 8px 16px 8px 0;
            }

            @media(min-width: 1200px){
                right: 0;
                left: auto;
                padding: 8px 0 8px 16px;
                z-index: 102;

                &::before{
                    content: none;
                }

                &::after{
                    content: "";
                    height: 48px;
                    width: calc((100vw - 800px) / 2);
                }
            }
            


        }
    }

    &__text{
        width: 800px;
        height: 90px;
        display: block;
        position: relative;

        &::after{
            content: "";
            position: absolute;
            width: 700px;
            height: 170px;
            left: -320px;
            top: 0;
            rotate: 20deg;
            background-image: url(/assets/plexus.svg);
            background-repeat: no-repeat;
            background-size: contain;
        }

        p{
            display: inline;
        }
    }

}

</style>