<template>
  <div v-if="isDisplayed" class="tutoDialog">
    <div class="tutoDialog__el">
      <div class="tutoDialog__keys">
        <img src="/assets/key_enter.svg" alt="Touche entrée" />
        <p>ou</p>
        <img src="/assets/key_cursor.svg" alt="Clic du curseur" />
      </div>
      <p>Dialogue suivant</p>
    </div>
    <div class="tutoDialog__el">
      <div class="tutoDialog__keys">
        <p>Maintenir</p>
        <img src="/assets/key_enter.svg" alt="Touche entrée" />
      </div>
      <p>Passer</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const isDisplayed = ref(true);

let vnlayout;
const removeTuto = () => {
  isDisplayed.value = false;
  vnlayout.removeEventListener('click', removeTuto);
};
const removeTutoEnter = (e) => {
  if (e.key == 'Enter') {
    isDisplayed.value = false;
    document.removeEventListener('keydown', removeTutoEnter);
  }
};

onMounted(() => {
  vnlayout = document.querySelector('.vnlayout');
  vnlayout.addEventListener('click', removeTuto);
  document.addEventListener('keydown', removeTutoEnter);
});
</script>

<style lang="scss">
.tutoDialog {
  position: absolute;
  top: 16px;
  left: 50%;
  z-index: 2000;
  transform: translateX(-50%);

  display: flex;
  gap: 48px;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: rgba(13, 13, 13, 0.4);

  // animation: .5s fadeOut forwards;
  // animation-delay: 8s;

  &__el {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }

  &__keys {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    font-size: 13px;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
