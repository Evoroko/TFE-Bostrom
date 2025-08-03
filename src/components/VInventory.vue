<template>
  <div
    class="inventory"
    :class="{
      'inventory--close': inventory.opened == false,
      'inventory--inactive': isUsingItem == true,
    }"
  >
    <div class="inventory__icon">
      <div v-if="inventory.items.length > 0" class="inventory__status">
        {{ inventory.items.length }}
      </div>
      <h2 class="title title--small">Sacoche</h2>
    </div>
    <div v-if="inventory.opened" class="inventory__content">
      <ul class="inventory__items">
        <li
          v-for="(item, index) in inventory.items"
          :key="index"
          class="inventory__item"
          :class="{ 'inventory__item--active': activeIndex === index }"
          @click="setActiveIndex(index)"
        >
          <div class="item">
            <img
              class="item__img"
              :src="'./img/items/' + item.name + '.webp'"
              :srcset="
                './img/items/' +
                item.name +
                '.webp 1x, ' +
                './img/items/' +
                item.name +
                '@2x.webp 2x'
              "
              :alt="item.title"
            />
          </div>
        </li>
      </ul>
      <ul class="inventory__buttons">
        <li v-if="inventory.items.length > 0" class="inventory__button">
          <VButton
            :class="{ 'inventory__button--inactive': activeIndex == undefined }"
            @click="clickInspect()"
            >Inspecter</VButton
          >
        </li>
        <li v-if="inventory.items.length > 0" class="inventory__button">
          <VButton
            :class="{ 'inventory__button--inactive': activeIndex == undefined }"
            @click="clickUse()"
            >Utiliser</VButton
          >
        </li>
        <li
          v-if="inventory.items.length == 0"
          class="inventory__button inventory__button--empty"
        >
          Aucun objet possédé.
        </li>
      </ul>
    </div>
    <button
      class="inventory__toggle"
      :class="{ 'inventory__toggle--open': inventory.opened === true }"
    ></button>
  </div>

  <div
    v-if="activeIndex !== undefined && isUsingItem == true"
    class="useBanner"
  >
    <p>
      Sur quoi souhaitez-vous utiliser «&nbsp;{{
        inventory.items[activeIndex].title
      }}&nbsp;» ?
    </p>
    <VButton @click="cancelUse()">Annuler</VButton>
  </div>
</template>

<script setup>
import VButton from './VButton.vue';
import { ref, inject, watch, onMounted, onUnmounted } from 'vue';

const inventory = inject('inventory');
const emit = defineEmits([
  'inventoryActive',
  'clickInspect',
  'clickUse',
  'clickCancel',
]);

const activeIndex = ref(undefined);
const isUsingItem = ref(false);

let inventoryIcon;

function changeClickZoneToggle(e) {
  if (isUsingItem.value == false) {
    if (inventoryIcon.classList.contains('inventory--close')) {
      toggleInventory();
    } else if (
      e.target.classList.contains('inventory__toggle') ||
      e.target.classList.contains('inventory__icon')
    ) {
      toggleInventory();
    }
  }
}

onMounted(() => {
  inventoryIcon = document.querySelector('.inventory');
  inventoryIcon.addEventListener('click', changeClickZoneToggle);
});

onUnmounted(() => {
  inventoryIcon.removeEventListener('click', changeClickZoneToggle);
});

function cancelUse() {
  isUsingItem.value = false;
  inventory.value.setAllUnused();
  inventory.value.setAllInactive();
  emit('clickCancel');
}

function clickInspect() {
  if (activeIndex.value !== undefined) {
    emit('clickInspect');
  }
}

function clickUse() {
  if (activeIndex.value !== undefined) {
    isUsingItem.value = true;
    emit('clickUse');
  }
}

function setActiveIndex(index) {
  if (activeIndex.value == index) {
    inventory.value.setAllInactive();
    activeIndex.value = undefined;
  } else {
    activeIndex.value = index;
    inventory.value.setAllInactive();
    inventory.value.setActive(inventory.value.items[index].id);
  }
}

watch(
  inventory.value,
  () => {
    let isItemActive = false;
    for (const item of inventory.value.items) {
      if (item.status == 'active') {
        activeIndex.value = item.id - 1;
        isItemActive = true;
        emit('inventoryActive', item.name);
      }
    }
    if (isItemActive == false) {
      inventory.value.setAllInactive();
      isUsingItem.value = false;
      activeIndex.value = undefined;
      emit('inventoryActive', undefined);
    }
  },
  { immediate: true },
);

function toggleInventory() {
  inventory.value.opened = !inventory.value.opened;
  inventory.value.setAllInactive();
}
</script>

<style lang="scss">
.inventory {
  position: fixed;
  top: 0;
  left: 0;
  width: max-content;
  height: auto;
  background-color: var(--transparent-black-80);
  z-index: 100;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  user-select: none;
  clip-path: polygon(0 0, 90% 0%, 100% 50%, 90% 100%, 0 100%, 0% 50%);
  animation: 0.3s slidein;

  &__content {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  &__items {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__item {
    background-color: rgb(0, 0, 0);
    width: 48px;
    height: 48px;
    cursor: pointer;
    border: 1px solid white;
    transform: rotate(45deg);
    margin: 0 8px;
    position: relative;

    &--active {
      &::after {
        content: '';
        position: absolute;
        width: 52px;
        height: 52px;
        border: 2px solid white;
        top: -4px;
        left: -4px;
      }
    }
  }

  &__status {
    background-color: var(--c-txt);
    color: var(--grey-1000);
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    position: absolute;
    top: 16px;
    left: 32px;
    font: var(--exo-13px-medium);
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__button {
    width: 100%;
    height: 32px;
    display: block;

    .button {
      width: 129px;
    }

    &--inactive {
      opacity: 0.5;

      &.button {
        cursor: default;

        &:hover {
          filter: none;
        }
      }
    }

    &--empty {
      color: var(--grey-300);
    }
  }

  &--close {
    height: auto;
    gap: 8px;
    clip-path: polygon(0 0, 75% 0%, 100% 50%, 75% 100%, 0 100%, 0% 50%);
    cursor: pointer;
  }

  &--inactive {
    opacity: 0;
    touch-action: none;
    user-select: none;
  }

  &__icon {
    background-image: url(/img/items/bag.webp);
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center top;
    height: 96px;
    width: 96px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    cursor: pointer;

    @media (-webkit-device-pixel-ratio: 2) {
      background-image: url(/img/items/bag@2x.webp);
    }
  }

  &__toggle {
    width: 24px;
    height: 24px;
    background-color: transparent;
    background-image: url(/assets/arrow-right.svg);
    background-size: contain;
    border: none;
    cursor: pointer;

    &--open {
      background-image: url(/assets/arrow-left.svg);
    }
  }
}

.useBanner {
  width: 100%;
  background-color: black;
  position: fixed;
  top: 0;
  z-index: 1101;
  padding: 16px 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.item {
  display: flex;

  &__img {
    width: 80%;
    height: 80%;
    transform: rotate(-45deg) translateY(2px);
  }
}
</style>
