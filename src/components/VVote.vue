<template>
  <div class="endscreen" v-if="hasChosen == true">
    <p class="endscreen__confirmation">Votre vote a bien été pris en compte.</p>
    <div class="endscreen__thanks">
      <h2 class="title title--big">Fin du prologue</h2>
      <div>
        <p>Merci d'avoir joué&nbsp;!</p>
        <p>
          Suivez le projet sur les réseaux sociaux pour être informé de la
          suite.
        </p>
      </div>

      <ul class="socials endscreen__socials">
        <li class="socials__el socials__el--insta">
          <a
            target="_blank"
            href="https://www.figma.com/proto/9lRxCha1xiCkgYI3r115kG/TFE?page-id=606%3A3739&type=design&node-id=606-4953&viewport=326%2C372%2C0.71&scaling=min-zoom&starting-point-node-id=606%3A4953&show-proto-sidebar=1"
            >Instagram</a
          >
        </li>
        <li class="socials__el socials__el--twitter">
          <a
            target="_blank"
            href="https://www.figma.com/proto/9lRxCha1xiCkgYI3r115kG/TFE?page-id=606%3A3739&type=design&node-id=606-5751&viewport=326%2C372%2C0.71&scaling=min-zoom&starting-point-node-id=606%3A5751&show-proto-sidebar=1"
            >Twitter</a
          >
        </li>
      </ul>
    </div>
  </div>

  <div class="bg bg--white">
    <div class="code">
      <div class="code__container">
        <h2 class="title">VOTEZ</h2>
        <ul class="vote">
          <li class="vote__option-container">
            <span class="vote__option vote__option--left"></span>
            <span class="vote__txt vote__txt--left">Uriel</span>
          </li>
          <li class="vote__option-container">
            <span class="vote__option vote__option--right"></span>
            <span class="vote__txt vote__txt--right">Socrates</span>
          </li>
        </ul>
        <VButton
          class="vote__button"
          :class="{ 'vote__button--active': isOneSelected == true }"
          @click="close()"
          >Voter</VButton
        >
        <p class="vote__disclaimer">
          Disponible jusqu'au 26/06/23 à 14h UTC+2. Passé ce délai, votre vote
          ne sera pas comptabilisé.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import VButton from './VButton.vue';

const emit = defineEmits(['closeVote']);

const isOneSelected = ref(false);
const hasChosen = ref(false);

onMounted(() => {
  const voteOptions = document.querySelectorAll('.vote__option-container');
  for (let voteOption of voteOptions) {
    voteOption.addEventListener('click', () => {
      let isAlreadySelected = false;
      if (voteOption.classList.contains('vote__option-container--active')) {
        isAlreadySelected = true;
        isOneSelected.value = false;
      }
      for (let allOptions of voteOptions) {
        allOptions.classList.remove('vote__option-container--active');
      }
      if (isAlreadySelected == false) {
        voteOption.classList.add('vote__option-container--active');
        isOneSelected.value = true;
      }
    });
  }
});
const close = () => {
  if (isOneSelected.value == true) {
    hasChosen.value = true;
  }
};
</script>

<style lang="scss">
.endscreen {
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1500;
  background-color: var(--grey-1000);
  gap: 24px;
  animation: fadeIn 1s forwards;

  &__thanks {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  &__confirmation {
    font: var(--agrandir-13px-light);
  }

  &__socials {
    margin-top: 16px;
  }
}

.socials {
  display: flex;
  gap: 32px;
  justify-content: center;

  &__el {
    width: 40px;
    height: 40px;
    overflow: hidden;
    text-indent: 100%;
    transition: 0.2s;

    &--insta {
      background-image: url(/assets/icon_insta.svg);
    }
    &--twitter {
      background-image: url(/assets/icon_twitter.svg);
    }

    &:hover {
      filter: drop-shadow(0 0 8px white);
    }

    a {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}

.vote {
  display: flex;
  height: 300px;
  width: 350px;
  gap: 32px;

  @media (max-width: 992px) {
    height: 240px;
    width: 300px;
  }

  &__option-container {
    height: 100%;
    width: 100%;
    filter: saturate(0%);
    cursor: pointer;
    transition: 0.2s;
    position: relative;

    @media (min-width: 992px) {
      &:hover {
        .vote__option {
          background-size: 400px;

          &--left {
            background-position: 35% -0%;
          }

          &--right {
            background-position: 60% -5%;
          }
        }
      }
    }

    &--active {
      filter: saturate(100%);
      transform: scale(1.1);

      .vote__option {
        background-size: 400px;

        @media (max-width: 992px) {
          background-size: 350px;
        }

        &--left {
          background-position: 35% -0%;
        }

        &--right {
          background-position: 60% -5%;
        }
      }
    }
  }

  &__option {
    display: block;
    height: 100%;
    width: 100%;
    background-size: 500px;
    background-repeat: no-repeat;
    background-color: var(--grey-1000);
    transition: 0.2s;

    @media (max-width: 992px) {
      background-size: 300px;
    }

    @media (min-width: 992px) {
      &:hover {
        .vote__option {
          background-size: 400px;

          &--left {
            background-position: 35% -0%;
          }

          &--right {
            background-position: 60% -5%;
          }
        }
      }
    }

    &--left {
      clip-path: polygon(100% 0, 100% 100%, 0 50%);
      background-image: url(/img/sprites/uriel.webp);
      @media (-webkit-device-pixel-ratio: 2) {
        background-image: url(/img/sprites/uriel@2x.webp);
      }
      background-position: 40% 9%;
    }

    &--right {
      clip-path: polygon(0 0, 0 100%, 100% 50%);
      background-image: url(/img/sprites/socrates.webp);
      @media (-webkit-device-pixel-ratio: 2) {
        background-image: url(/img/sprites/socrates@2x.webp);
      }
      background-position: 55% 0%;
    }
  }

  &__txt {
    font: var(--exo-20px-medium);
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    position: absolute;
    top: 25%;
    left: 25%;
    transform: translate(-16px, -50%) rotate(-45deg);

    @media (max-width: 992px) {
      transform: translate(-24px, -50%) rotate(-45deg);
    }

    &--right {
      left: auto;
      right: 25%;
      transform: translate(40px, -50%) rotate(45deg);

      @media (max-width: 992px) {
        transform: translate(48px, -50%) rotate(45deg);
      }
    }
  }

  &__disclaimer {
    font: var(--agrandir-13px-light);
    width: 250px;
    text-align: center;
    font-style: italic;

    @media (min-width: 992px) {
      position: absolute;
      bottom: -64px;
    }
  }

  &__button {
    opacity: 0.5;
    margin-top: 8px;
    cursor: auto;

    &--active {
      opacity: 1;
      cursor: pointer;
    }
  }
}
</style>
