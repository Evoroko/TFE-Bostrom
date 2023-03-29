<template>
    <div class="vnlayout">
        <img v-if="background != undefined" class="vnlayout__bg" :src="'/img/backgrounds/' + background + '.jpg'" alt="">

        <VTextBox
        :name="name"
        :text="text"
        />
        
        <img v-if="sprite !== 'none'" class="vnlayout__sprite" :src="'/img/sprites/' + sprite + '.webp'" alt="">
        
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
    background: {
        type: String,
        required: false
    }
})


const computed = {
  backgroundImage() {
    return {
      "background-image": `url('./img/sprites/${this.sprite}.png')`,
    };
  },
};

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