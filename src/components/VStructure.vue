<template>
  <main>
    <VMenu
      v-if="menuClosed == false"
      @chapter-choice="
        currentIndex = $event;
        menuClosed = true;
      "
    />
    <VEnigma
      v-if="menuClosed"
      :background3d="levelBackground"
      :level-dialogs="levelDialogs"
      :current-level="currentIndex"
      @change-level="
        currentLevelChange = $event;
        changeLevel();
      "
    />
  </main>
</template>

<script setup>
import VEnigma from './VEnigma.vue';
import structure from '../scripts/structure';
import VMenu from './VMenu.vue';
import { ref, computed } from 'vue';

const currentIndex = ref(0);
const currentLevelChange = ref(0);
const menuClosed = ref(false);

const changeLevel = () => {
  currentIndex.value = Number(currentLevelChange.value);
};

const levelBackground = computed(() => {
  return structure[currentIndex.value].background;
});

const levelDialogs = computed(() => {
  return structure[currentIndex.value].dialogs;
});
</script>

<style lang="scss"></style>
