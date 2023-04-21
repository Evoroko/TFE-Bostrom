<template>
    <div class="vnlayout">
        <img v-if="background != undefined && background != 'none'" class="vnlayout__bg" :src="'/img/backgrounds/' + background + '.jpg'" alt="">

        <VTextBox
        :name="name"
        :text="text"
        :is-dialog-full="isDialogFull"
        />
        
        <img v-if="sprite !== 'none'" class="vnlayout__sprite" :src="'/img/sprites/' + sprite + '.webp'" alt="">
        <img v-if="spriteProta !== 'none'" class="vnlayout__prota" :src="'/img/sprites/' + spriteProta + '.webp'" alt="">
        
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

    &__sprite{
        height: 80vh;
        object-fit: cover;
        object-position: top;
        animation: slidein 0.3s ease-in-out;
    }
    
    &__bg{
        position: fixed;
        z-index: -100;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__prota{
      height: 40vh;
      position: fixed;
      right: 0;
      bottom: 0;
      z-index: 101;
    }
}

@keyframes slidein {
  0% {
    transform: translateX(-20%);
    opacity: 0;
  }

  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}

</style>