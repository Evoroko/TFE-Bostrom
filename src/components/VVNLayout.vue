<template>
    <div class="vnlayout" :class="{'vnlayout--blurbg': name != undefined && name != 'none'}">
        <img v-if="background != undefined && background != 'none'" class="vnlayout__bg" :src="'/img/backgrounds/' + background + '.jpg'" alt="">

        <VTextBox
        :name="name"
        :text="text"
        :is-dialog-full="isDialogFull"
        />
        
        <img v-if="sprite !== 'none'" class="vnlayout__sprite" :src="'/img/sprites/' + sprite + '.webp'" :alt="'Sprite de ' + name">
        <div v-if="displayedItem" class="vnlayout__item">
            <img :src="'/img/items/' + displayedItem + '.png'" :alt="'Item nommé ' + displayedItem">
        </div>
        <img v-if="spriteProta !== 'none'" class="vnlayout__prota" :src="'/img/sprites/' + spriteProta + '.webp'" alt="Sprite de la protagoniste, Anaëlle.">
        
    </div>
    
</template>

<script setup>
import VTextBox from '../components/VTextBox.vue';
const props = defineProps({
    name: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: false
    },
    sprite: {
        type: String,
        required: false
    },
    spriteProta: {
        type: String,
        required: false
    },
    displayedItem: {
        type: String,
        required: false
    },
    background: {
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
.vnlayout{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    user-select: none;

    &--blurbg{
        backdrop-filter: blur(2px);
    }

    &__sprite{
        height: 80vh;
        object-fit: cover;
        object-position: top;
        animation: slidein 0.3s ease-in-out;
    }

    &__item{
        position: absolute;
        height: 400px;
        width: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: scaleOpen .3s;


        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        background-color: var(--transparent-black-60);

        img{
            height: 80%;
        }

    }
    
    &__bg{
        position: fixed;
        z-index: -100;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__prota{
        position: fixed;
        right: 0;
        bottom: 0;
        z-index: 101;
        max-width: calc((100vw - 650px) / 2);
        max-height: 60vh;
        background-image: url(/img/backgrounds/background-prota.png);
        background-size: cover;
        background-position: center left;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 33% 100%);
        animation: slideinLeft 0.3s ease-in-out;

    }
}


@keyframes scaleOpen {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

</style>