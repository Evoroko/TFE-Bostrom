<template>

<div class="inventory">
    <h2>Inventaire</h2>
    <button class="inventory__inspect" :class="{'inventory__inspect--inactive': activeIndex == undefined }">Inspecter</button>
    <ul class="inventory__items">
        <li class="inventory__item" v-for="(item, index) in inventory.items" :key="index" :class="{ 'inventory__item--active': activeIndex === index }" @click="setActiveIndex(index)"> {{ item.title }}</li>
    </ul>
</div>

</template>

<script setup>
import { ref, inject, onMounted } from 'vue';

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
    width: max-content;
    height: 100%;
    background-color: rgba(43, 43, 43, 0.519);
    z-index: 100;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;

    &__items{
        display: flex;
        flex-direction: column;
        gap: 16px;
        height: 100%;
    }

    &__item{
        background-color: rgb(0, 0, 0);
        width: 100%;
        height: 32px;
        cursor: pointer;
        border: 2px solid transparent;

        &--active{
            border: 2px solid white;
        }
    }

    &__inspect{
        padding: 8px;
        width: max-content;
        margin: 8px 0;

        &--inactive{
            opacity: 0.5;
        }
    }
}

</style>