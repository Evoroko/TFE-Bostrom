<template>
    <div class="cursor__container" :style="cursorPos">
        <div class="cursor">
            <div class="cursor__effect cursor__effect--anim"></div>
        </div>
    </div>

</template>

<script setup>
import { onUnmounted, onMounted, ref } from 'vue';

const mouseX = ref(0)
const mouseY = ref(0)

const cursorPos = ref({
  transform: `translate(${mouseX.value}px, ${mouseY.value}px)`
})

// Update cursor position on mouse move
const onMouseMove = (event) => {
  mouseX.value = event.clientX
  mouseY.value = event.clientY

  cursorPos.value = {
    transform: `translate(${mouseX.value - 10}px, ${mouseY.value - 10}px)`
  }
}

// Add event listener to update cursor position
window.addEventListener('mousemove', onMouseMove)

// Remove event listener when component is unmounted
onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})

onMounted(() => {
    const cursor = document.querySelector('.cursor');
    const cursorEffect = document.querySelector('.cursor__effect');

    document.addEventListener('mousemove', (e) => {
        const cursorStyle = getComputedStyle(e.target).cursor;
        if (cursorStyle === 'pointer') {
            cursor.classList.add('cursor--pointer')
        }else{
            cursor.classList.remove('cursor--pointer');
        }
    })

    document.addEventListener('click', () => {
        if(cursorEffect.classList.contains('cursor__effect--anim')){
            cursorEffect.classList.remove('cursor__effect--anim');
        }
        setTimeout(() => {
            cursorEffect.classList.add('cursor__effect--anim');
        }, 1)
    })
})
</script>

<style lang="scss">
.cursor{

  &__container{
    position: absolute;
    z-index: 3000;
    user-select: none;
    touch-action: none;
    pointer-events: none;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
  }

  rotate: 45deg;
  transform: scale(.5);
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: cursorAnim2 6s infinite linear;

  &::after{
    content: "";
    width: 16px;
    height: 16px;
    background-color: var(--c-txt);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::before{
    content: "";
    width: 24px;
    height: 24px;
    position: absolute;
    box-shadow: 0 0 0 1px var(--transparent-black-80);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__effect{
    width: 20px;
    height: 20px;
    border: 1px solid var(--c-txt);

    &--anim{
      animation: cursorAnim .3s forwards;
    }
  }

  &--pointer{
    animation: cursorPointer .2s forwards;
  }
}

@keyframes cursorAnim {
  0%{
    transform: scale(.5);
    opacity: .9;
  }
  50%{
    opacity: .3;
  }
  100%{
    transform: scale(4);
    opacity: 0;
  }
}

@keyframes cursorAnim2 {
  0%{
    transform: rotate(360deg) scale(.5);
  }
  100%{
    transform: rotate(0deg) scale(.5);
  }
}

@keyframes cursorPointer {
  0%{
    transform: scale(360deg) scale(.5);
  }
  100%{
    transform: rotate(0deg) scale(.7);
  }
}
</style>