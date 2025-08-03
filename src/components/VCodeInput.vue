<template>
  <div class="bg bg--white">
    <div class="code">
      <div class="code__container">
        <label for="code" class="title title--medium">Entrez le code.</label>

        <div class="input">
          <input
            id="code"
            v-model="code"
            class="input__text"
            readonly
            type="text"
            name="code"
            maxlength="3"
          />
        </div>

        <ul class="keyboard">
          <template v-for="n in 10" :key="n">
            <li class="keyboard__key" @click="enterKey"></li>
          </template>
          <li class="keyboard__key keyboard__key--back" @click="enterKey">←</li>
        </ul>

        <VButton @click="closeCode()">Retour</VButton>
        <div v-if="codeResultDisplayed" class="result result--false">
          <p class="result__text">Code incorrect</p>
        </div>
        <div v-if="codeResultTrueDisplayed" class="result result--true">
          <p class="result__text">Code valide&nbsp;!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue';
import VButton from './VButton.vue';
import audioControl from '../scripts/audioControl.js';

const props = defineProps({
  keyboardKeys: {
    type: Array,
    required: false,
    default: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  },
  answer: {
    type: String,
    required: false,
    default: '',
  },
});
const emit = defineEmits(['codeAttempt', 'closeCode']);

const audioStatus = inject('audioStatus');
const incorrectSound = new Audio('./audio/sounds/warning-ui.wav');
const correctSound = new Audio('./audio/sounds/weird-buttons.wav');
const keySound = new Audio('./audio/sounds/bop.wav');

const code = ref('---');
const codeResultDisplayed = ref(false);
const codeResultTrueDisplayed = ref(false);
let isCodeCorrect = false;
let counter = 0;
let prevNum = '';

onMounted(() => {
  const keys = document.querySelectorAll('.keyboard__key');
  for (const [index, key] of keys.entries()) {
    if (index < keys.length - 1) {
      key.innerHTML = props.keyboardKeys[index];
    }
  }
});

const verifyCode = () => {
  if (code.value === props.answer) {
    isCodeCorrect = true;
  }
  emit('codeAttempt', isCodeCorrect);
};

const enterKey = (e) => {
  const input = document.querySelector('#code');
  audioControl(audioStatus, keySound);

  const reset = () => {
    input.value = null;
    code.value = '---';
    counter = 0;
    prevNum = '';
  };

  if (e.target.innerText === '←') {
    reset();
  } else {
    counter += 1;
    prevNum = prevNum + e.target.innerText;
    input.value = prevNum + '-'.repeat(3 - counter);
    code.value = input.value;

    if (counter == 3 && code.value == props.answer) {
      codeResultTrueDisplayed.value = true;
      audioControl(audioStatus, correctSound);
      setTimeout(() => {
        codeResultTrueDisplayed.value = false;
        verifyCode();
      }, 1000);
    } else if (counter == 3) {
      codeResultDisplayed.value = true;
      audioControl(audioStatus, incorrectSound);
      setTimeout(() => {
        codeResultDisplayed.value = false;
        reset();
      }, 1000);
    }
  }
};

const closeCode = () => {
  verifyCode();
  emit('closeCode');
};
</script>

<style lang="scss">
.code {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background-color: var(--transparent-black-80);
  width: 560px;
  height: 560px;
  z-index: 1000;
  font: var(--exo-16px-medium);

  &__container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 260px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 12px;
    align-items: center;

    @media (max-width: 992px) {
      gap: 16px;
      transform: translate(-50%, -50%) scale(0.8) rotate(-45deg);
    }
  }
}

.input {
  text-transform: uppercase;
  display: flex;
  align-items: center;
  height: 80px;

  &__text {
    background-color: var(--transparent-black-80);
    color: var(--c-txt);
    font: var(--exo-61px-medium);
    letter-spacing: 0.2rem;
    text-align: center;
    width: 100%;
    height: 100%;
    border: none;

    &:focus {
      outline: none;
    }
  }

  &::before,
  &::after {
    content: '';
    width: 64px;
    height: 100%;
  }

  &::after {
    background: linear-gradient(
      270deg,
      rgba(13, 13, 13, 0) 0%,
      rgba(13, 13, 13, 0.8) 100%
    );
  }

  &::before {
    background: linear-gradient(
      270deg,
      rgba(13, 13, 13, 0.8) 0%,
      rgba(13, 13, 13, 0) 100%
    );
  }
}

.keyboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: max-content;
  gap: 4px;
  background-color: var(--grey-1000);
  padding: 4px;
  user-select: none;

  &--4columns {
    grid-template-columns: repeat(4, 1fr);
  }

  &__key {
    cursor: pointer;
    // font: var(--exo-39px-medium);
    background-color: white;
    color: black;
    padding: 4px;
    width: 48px;
    height: 48px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    &--back {
      width: auto;
      grid-column: span 2;
    }

    &--full {
      grid-column-start: 1;
      grid-column-end: -1;
    }

    &--notxt {
      color: transparent;
      user-select: none;
    }
  }
}
</style>
