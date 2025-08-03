<template>
  <div class="bg">
    <dialog open class="tuto">
      <h2 class="title title--medium">Tutoriel</h2>

      <a
        href="#"
        class="tuto__change tuto__change--next"
        :class="{ 'tuto__change--hidden': activeSlide == slides.length - 1 }"
        @click.prevent="nextSlide"
      ></a>
      <a
        href="#"
        class="tuto__change tuto__change--prev"
        :class="{ 'tuto__change--hidden': activeSlide == 0 }"
        @click.prevent="prevSlide"
      ></a>

      <div class="tuto__slide tuto__slide--active">
        <p v-if="currentLevel == 1">
          Trouvez comment ouvrir la porte en résolvant les énigmes de ce monde.
        </p>
        <p v-if="currentLevel !== 1">
          Découvrez les mystères de ce monde en interagissant avec celui-ci.
        </p>
      </div>

      <div class="tuto__slide">
        <img
          class="tuto__img"
          src="/img/tuto-1.webp"
          srcset="/img/tuto-1.webp 1x, /img/tuto-1@2x.webp 2x"
          alt="Démonstration du personnage en train de courir"
        />
        <div class="tuto__subslide">
          <p>Déplacez-vous dans le décor grâce aux touches du clavier.</p>
          <img
            src="/assets/keys.svg"
            alt="Appuyez sur Q pour aller à gauche, et sur D pour aller à droite."
          />
        </div>
      </div>

      <div class="tuto__slide">
        <img
          class="tuto__img"
          src="/img/tuto-2.webp"
          srcset="/img/tuto-2.webp 1x, /img/tuto-2@2x.webp 2x"
          alt="Démonstration de l'affichage d'un nom d'objet du décor au survol."
        />
        <p>
          Utilisez votre souris pour survoler les éléments du décor et cliquez
          dessus pour interagir avec.
        </p>
      </div>

      <div class="tuto__slide">
        <img
          class="tuto__img"
          src="/img/tuto-3.webp"
          srcset="/img/tuto-3.webp 1x, /img/tuto-3@2x.webp 2x"
          alt="Démonstration de l'utilisation du bouton « Utiliser » et « Inspecter »."
        />
        <p>
          Vous obtiendrez certains objets au cours de votre exploration. En en
          sélectionnant un, vous avez la possibilité de l’inspecter, ou de
          l’utiliser sur un élément du décor.
        </p>
      </div>

      <div class="tuto__status">
        <div
          v-for="(slide, key) in slides.length"
          class="tuto__status--index"
          :class="{ 'tuto__status--active': key == activeSlide }"
          @click="updateSlide(key)"
        ></div>
      </div>

      <VButton class="tuto__close" :small="true" @click="hideTuto">✖</VButton>
    </dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import VButton from './VButton.vue';

const emit = defineEmits(['closeTuto']);

const props = defineProps({
  currentLevel: {
    type: Number,
    required: false,
  },
});

const hideTuto = () => {
  activeSlide.value = 0;
  for (const slide of slides.value) {
    slide.classList.remove('tuto__slide--active');
  }
  slides.value[0].classList.add('tuto__slide--active');
  emit('closeTuto');
};

const listenKeys = (e) => {
  if (e.key == 'ArrowRight') {
    nextSlide();
  } else if (e.key == 'ArrowLeft') {
    prevSlide();
  }
};

const activeSlide = ref(0);
const slides = ref([]);

onMounted(() => {
  slides.value = document.querySelectorAll('.tuto__slide');

  document.addEventListener('keydown', listenKeys);
});

onUnmounted(() => {
  document.removeEventListener('keydown', listenKeys);
});

const nextSlide = () => {
  if (activeSlide.value == slides.value.length - 1) {
    return;
  }
  activeSlide.value += 1;
  const currentSlide = slides.value[activeSlide.value];
  currentSlide.classList.add('tuto__slide--active');
  currentSlide.classList.remove('tuto__slide--animLeft');
  currentSlide.classList.add('tuto__slide--animRight');
  currentSlide.addEventListener('animationend', () => {
    currentSlide.classList.remove('tuto__slide--animRight');
  });
  slides.value[activeSlide.value - 1].classList.remove('tuto__slide--active');
};

const prevSlide = () => {
  if (activeSlide.value == 0) {
    return;
  }
  activeSlide.value -= 1;
  const currentSlide = slides.value[activeSlide.value];
  const nextSlide = slides.value[activeSlide.value + 1];
  currentSlide.classList.add('tuto__slide--active');

  currentSlide.classList.remove('tuto__slide--animRight');
  currentSlide.classList.add('tuto__slide--animLeft');
  currentSlide.addEventListener('animationend', () => {
    currentSlide.classList.remove('tuto__slide--animLeft');
  });
  nextSlide.classList.remove('tuto__slide--active');
};

const updateSlide = (key) => {
  activeSlide.value = key;
  for (const slide of slides.value) {
    slide.classList.remove('tuto__slide--active');
  }
  const currentSlide = slides.value[activeSlide.value];
  currentSlide.classList.add('tuto__slide--animLeft');
  currentSlide.classList.add('tuto__slide--animRight');
  currentSlide.addEventListener('animationend', () => {
    currentSlide.classList.remove('tuto__slide--animLeft');
  });
  currentSlide.classList.add('tuto__slide--active');
};
</script>

<style lang="scss">
.tuto {
  height: 448px;
  width: 704px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border: none;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 64px 96px;
  box-sizing: border-box;
  background-image: url(/assets/plexus.svg);
  background-size: 120%;
  background-repeat: no-repeat;
  background-position: center 145%;
  clip-path: polygon(20% 0, 80% 0, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
  animation: openTuto 0.2s;

  @media (max-width: 992px) {
    height: 95%;
  }

  &__slide {
    display: none;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 32px;

    &--active {
      display: flex;
    }

    &--animLeft {
      animation: slideInLeftTuto 0.3s ease;
    }

    &--animRight {
      animation: slideInRightTuto 0.3s ease;
    }

    &--animRightReverse {
      animation: slideInRightTuto 0.3s ease reverse;
    }

    &--animLeftReverse {
      animation: slideInLeftTuto 0.3s ease reverse;
    }
  }

  &__subslide {
    display: flex;
    flex-direction: column;
    gap: 12px;

    img {
      height: 32px;
    }
  }

  &__change {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url(/assets/arrow-left.svg);

    &--next {
      background-image: url(/assets/arrow-right.svg);
      right: 16px;
      left: auto;
    }

    &--hidden {
      opacity: 0;
      user-select: none;
      touch-action: none;
      cursor: auto;
    }
  }

  &__status {
    display: flex;
    gap: calc(2px + 8px);
    position: absolute;
    bottom: 32px;

    &--index {
      width: 8px;
      height: 8px;
      border: 1px solid var(--c-txt);
      rotate: 45deg;
      cursor: pointer;
    }

    &--active {
      background-color: var(--c-txt);
    }
  }

  &__close {
    position: absolute;
    top: 16px;
    right: calc(128px + 8px);
  }

  &__img {
    height: 160px;

    @media (max-width: 992px) {
      height: 80px;
    }
  }
}

@keyframes slideInRightTuto {
  0% {
    opacity: 0;
    transform: translateX(20%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeftTuto {
  0% {
    opacity: 0;
    transform: translateX(-20%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes openTuto {
  0% {
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 0;
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}
</style>
