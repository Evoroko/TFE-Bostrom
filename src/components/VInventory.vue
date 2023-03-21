<template>

<div class="inventory">
    <ul class="inventory__items">
        <li class="inventory__item" v-for="(item, index) in inventory.items" :key="index" :class="{ 'inventory__item--active': activeIndex === index }" @click="setActiveIndex(index)"> {{ item.name }}</li>
    </ul>
</div>

</template>

<script setup>
import { ref, inject } from 'vue';

const inventory = inject('inventory');
const emit = defineEmits(['inventoryActive']);

const activeIndex = ref(undefined);

function setActiveIndex(index) {
    if(activeIndex.value == index){
        activeIndex.value = undefined;
        inventory.value.setAllInactive(inventory.value.items[index].name);
        emit('inventoryActive', undefined);
    }else{
        activeIndex.value = index;
        inventory.value.setAllInactive(inventory.value.items[index].name);
        inventory.value.setActive(inventory.value.items[index].id);
        emit('inventoryActive', inventory.value.items[index].name);
    }
}

</script>

<style lang="scss">

.inventory{
    position: fixed;
    top: 0;
    left: 0;
    width: 64px;
    height: 100%;
    background-color: rgba(43, 43, 43, 0.519);
    z-index: 100;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;

    &__items{
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    &__item{
        background-color: rgb(0, 0, 0);
        width: 32px;
        height: 32px;
        cursor: pointer;
        border: 2px solid transparent;

        &--active{
            border: 2px solid white;
        }
    }
}

</style>