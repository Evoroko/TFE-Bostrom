<template>
  <div class="cursor__container" :style="cursorPos">
    <div class="cursor">
      <div class="cursor__effect cursor__effect--anim"></div>
    </div>
    <div v-if="itemUsed" class="inventory__item cursor__img">
      <div class="item">
        <img
          class="item__img"
          :src="'./img/items/' + itemUsed.name + '.webp'"
          :srcset="
            './img/items/' +
            itemUsed.name +
            '.webp 1x, ' +
            './img/items/' +
            itemUsed.name +
            '@2x.webp 2x'
          "
          :alt="itemUsed.title"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, onMounted, ref, inject, watch } from 'vue';

const itemUsed = ref(undefined);

const inventory = inject('inventory');

watch(inventory.value, (newVal, oldVal) => {
  let isItemUsed = false;
  if (inventory.value) {
    for (let item of inventory.value.items) {
      if (item.isUsed == true) {
        itemUsed.value = item;
        isItemUsed = true;
      }
    }
  }

  if (isItemUsed == false) {
    itemUsed.value = undefined;
  }
});

const mouseX = ref(0);
const mouseY = ref(0);

const cursorPos = ref({
  transform: `translate(${mouseX.value}px, ${mouseY.value}px)`,
});

// Update cursor position on mouse move
const onMouseMove = (event) => {
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;

  cursorPos.value = {
    transform: `translate(${mouseX.value - 10}px, ${mouseY.value - 10}px)`,
  };
};

// Add event listener to update cursor position
window.addEventListener('mousemove', onMouseMove);

// Remove event listener when component is unmounted
onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
});

onMounted(() => {
  const cursor = document.querySelector('.cursor');
  const cursorEffect = document.querySelector('.cursor__effect');

  document.addEventListener('mousemove', (e) => {
    const cursorStyle = getComputedStyle(e.target).cursor;
    if (cursorStyle === 'pointer') {
      cursor.classList.add('cursor--pointer');
    } else {
      cursor.classList.remove('cursor--pointer');
    }
  });

  document.addEventListener('click', () => {
    if (cursorEffect.classList.contains('cursor__effect--anim')) {
      cursorEffect.classList.remove('cursor__effect--anim');
    }
    setTimeout(() => {
      cursorEffect.classList.add('cursor__effect--anim');
    }, 1);
  });
});
</script>

<style lang="scss">
.cursor {
  &__container {
    position: absolute;
    z-index: 3000;
    user-select: none;
    touch-action: none;
    pointer-events: none;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;

    display: none;

    @media (min-width: 992px) {
      display: block;
    }
  }

  rotate: 45deg;
  transform: scale(0.5);
  pointer-events: none;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  animation: cursorAnim2 6s infinite linear;

  &::after {
    content: '';
    width: 16px;
    height: 16px;
    background-color: var(--c-txt);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    content: '';
    width: 24px;
    height: 24px;
    position: absolute;
    box-shadow: 0 0 0 1px var(--transparent-black-80);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__effect {
    width: 20px;
    height: 20px;
    border: 1px solid var(--c-txt);

    &--anim {
      animation: cursorAnim 0.3s forwards;
    }
  }

  &--pointer {
    animation: cursorPointer 0.2s forwards;
  }

  &__img {
    transform: rotate(45deg) scale(0.7);
    position: absolute;
    right: 0px;
    bottom: 8px;
  }
}

@keyframes cursorAnim {
  0% {
    transform: scale(0.5);
    opacity: 0.9;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

@keyframes cursorAnim2 {
  0% {
    transform: rotate(360deg) scale(0.5);
  }
  100% {
    transform: rotate(0deg) scale(0.5);
  }
}

@keyframes cursorPointer {
  0% {
    transform: scale(360deg) scale(0.5);
  }
  100% {
    transform: rotate(0deg) scale(0.7);
  }
}
</style>
