<template>
  <header class="menu">
    <div class="menu__bg">
      <video
        class="menu__video"
        src="/video/stock_glitch.mp4"
        autoplay
        loop
        muted
      ></video>
    </div>

    <nav class="menu__content menu__content--space">
      <div
        v-if="chapterSelect == false"
        class="menu__content menu__content--section menu__content--animBackwards"
      >
        <h2 class="menu__title">
          <span class="menu__title--txt">BOSTROM</span>
        </h2>
        <div class="options">
          <ul class="options__list">
            <li>
              <VButton :big="true" @click="selectChapter(0)">Commencer</VButton>
            </li>
            <li>
              <VButton :reverse="true" :big="true" @click="toChapterSelect"
                >Choix du niveau</VButton
              >
            </li>
          </ul>
          <a
            class="options__link link"
            href="http://nell-maissin.be/projets/tfe"
            >Retour à la page d'accueil</a
          >
        </div>
      </div>

      <div
        v-if="chapterSelect"
        class="options options--chapter menu__content menu__content--section menu__content--animBackwards"
      >
        <h3 class="title title--space">Choix du niveau</h3>
        <div class="options__list options__list--levels">
          <details open class="options__block">
            <summary class="options__category">
              <h4 class="title title--medium options__title">Prologue</h4>
            </summary>
            <ul class="options__list options__list--small">
              <li class="option" tabindex="1" @click="selectChapter(0)">
                <span>Introduction</span>
              </li>
              <li class="option" tabindex="2" @click="selectChapter(1)">
                <span>Énigme 1</span>
              </li>
              <li class="option" tabindex="3" @click="selectChapter(2)">
                <span>Rencontre du groupe</span>
              </li>
            </ul>
          </details>
          <details class="options__block">
            <summary class="options__category options__category--inactive">
              <h4 class="title title--medium options__title">
                Chapitre 1 (prochainement)
              </h4>
            </summary>
            <p class="options__txt">
              Vote en cours — Chapitre bientôt en développement
            </p>
          </details>
          <details class="options__block">
            <summary class="options__category options__category--inactive">
              <h4 class="title title--medium options__title">Chapitre 2</h4>
            </summary>
            <p class="options__txt">Pas encore disponible</p>
          </details>
          <details class="options__block">
            <summary class="options__category options__category--inactive">
              <h4 class="title title--medium options__title">Chapitre 3</h4>
            </summary>
            <p class="options__txt">Pas encore disponible</p>
          </details>
          <details class="options__block">
            <summary class="options__category options__category--inactive">
              <h4 class="title title--medium options__title">Chapitre 4</h4>
            </summary>
            <p class="options__txt">Pas encore disponible</p>
          </details>
          <details class="options__block">
            <summary class="options__category options__category--inactive">
              <h4 class="title title--medium options__title">Chapitre 5</h4>
            </summary>
            <p class="options__txt">Pas encore disponible</p>
          </details>
        </div>

        <VButton @click="toChapterSelect">Retour</VButton>
      </div>
    </nav>
  </header>
</template>

<script setup>
import VButton from './VButton.vue';
import { ref } from 'vue';
import { gsap } from 'gsap';

const emit = defineEmits(['chapterChoice']);

const chapterSelect = ref(false);

const toChapterSelect = () => {
  const displayedSection = document.querySelector('.menu__content--section');

  gsap.to(displayedSection, {
    opacity: 0,
    duration: 0.3,
  });

  setTimeout(() => {
    displayedSection.classList.remove('menu__content--animForward');
    chapterSelect.value = !chapterSelect.value;
  }, 300);
};

const selectChapter = (number) => {
  emit('chapterChoice', number);
};
</script>

<style lang="scss">
.menu {
  position: relative;
  z-index: 500;

  @media (min-width: 992px) {
    position: fixed;
    height: 100vh;
  }

  &__title {
    overflow: hidden;
    text-indent: 100%;
    color: transparent;
    height: 200px;
    width: 300px;
    background-image: url(/assets/logo.svg);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    animation: slideinUpShort 1s;
  }

  &__bg {
    position: fixed;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    opacity: 0.4;
  }

  &__video {
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    z-index: -2;
  }

  &__content {
    position: relative;
    z-index: 2;
    height: auto;

    &--space {
      margin-top: 32px;
      margin-bottom: 32px;

      @media (min-width: 992px) {
        margin-top: 0;
      }
    }

    &--animBackwards {
      animation: menuTransition 0.3s reverse;
    }

    @media (min-width: 992px) {
      position: fixed;
      height: 100vh;
    }

    width: 100%;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.6) 72.19%,
      rgba(0, 0, 0, 0) 100%
    );

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 48px;
  }
}

.options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;

  &--chapter {
    height: auto;
    overflow-y: scroll;
    max-width: 400px;

    @media (min-width: 992px) {
      height: 100vh;
      overflow: auto;
    }
  }

  &__title {
    display: inline;
    margin-left: 4px;
  }

  &__txt {
    margin-top: 12px;
  }

  &__category {
    cursor: pointer;
    background-color: var(--grey-950);
    padding: 8px;

    &--inactive {
      opacity: 0.5;
    }

    &:hover {
      background-color: var(--grey-800);
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    // align-items: center;
    gap: 16px;

    li {
      animation: fadeIn 1s backwards;
      animation-delay: 0.5s;

      &:nth-of-type(2) {
        animation-delay: 0.6s;
      }

      &:nth-of-type(3) {
        animation-delay: 0.7s;
      }
    }

    &--small {
      gap: 8px;
      align-items: stretch;
      margin-top: 16px;
    }

    &--levels {
      width: 100%;
      justify-content: flex-start;
      height: 50vh;
      overflow: scroll;
      overflow-x: hidden;
      padding: 0 8px;
      box-sizing: border-box;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--grey-500);
      }
    }
  }

  &__link {
    animation: fadeIn 1s backwards;
    animation-delay: 0.9s;
  }

  &__block {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    animation: slideinUpShort 1s backwards;
    animation-delay: 0.2s;
  }
}

.option {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  span {
    background-color: var(--grey-950);
    width: 100%;
    padding: 8px 0;
    box-sizing: border-box;
  }

  &::after,
  &::before {
    content: '';
    width: 32px;
    height: 40px;
    background: linear-gradient(
      90deg,
      #191919 1.36%,
      rgba(25, 25, 25, 0) 100.06%
    );
  }

  &::before {
    background: linear-gradient(
      -90deg,
      #191919 1.36%,
      rgba(25, 25, 25, 0) 100.06%
    );
  }

  &:hover {
    span {
      background-color: var(--c-txt);
      color: var(--grey-950);
    }

    &::after,
    &::before {
      background-color: var(--c-txt);
      background: linear-gradient(
        90deg,
        #ffffff 1.36%,
        rgba(255, 255, 255, 0) 100.06%
      );
    }

    &::before {
      background: linear-gradient(
        -90deg,
        #ffffff 1.36%,
        rgba(255, 255, 255, 0) 100.06%
      );
    }
  }
}

@keyframes menuTransition {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
