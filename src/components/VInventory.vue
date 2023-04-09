<template>

<div class="inventory inventory--close">
    <h2>Inventaire</h2>
    <div v-if="openInventory" class="inventory__content">
        <ul class="inventory__items">
            <li class="inventory__item" v-for="(item, index) in inventory.items" :key="index" :class="{ 'inventory__item--active': activeIndex === index }" @click="setActiveIndex(index)"> {{ item.title }}</li>
        </ul>
        <button class="inventory__button--inspect" :class="{'inventory__button--inactive': activeIndex == undefined }" @click="clickInspect()">Inspecter</button>
        <button class="inventory__button--use" :class="{'inventory__button--inactive': activeIndex == undefined }" @click="clickUse()">Utiliser</button>
    </div>
    <button @click="toggleInventory" class="inventory__toggle">></button>
</div>

<div v-if="activeIndex !== undefined && isUsingItem == true" class="useBanner">
    <p>Sur quoi souhaitez-vous utiliser «&nbsp;{{ inventory.items[activeIndex].title }}&nbsp;» ?</p>
</div>

</template>

<script setup>
import { ref, inject, watch } from 'vue';

const inventory = inject('inventory');
const emit = defineEmits(['inventoryActive', 'clickInspect', 'clickUse']);

const activeIndex = ref(undefined);
const openInventory = ref(false);
const isUsingItem = ref(false);

function clickInspect(){
    if(activeIndex.value !== undefined){
        emit('clickInspect');
    }
}

function clickUse(){
    if(activeIndex.value !== undefined){
        emit('clickUse');
    }
    isUsingItem.value = true;
}

function setActiveIndex(index) {
    if(activeIndex.value == index){
        inventory.value.setAllInactive();
        activeIndex.value = undefined;
    }else{
        activeIndex.value = index;
        inventory.value.setAllInactive();
        inventory.value.setActive(inventory.value.items[index].id);
    }
}


watch(inventory.value, (newVal, oldVal) => {
        let isItemActive = false;
        for(let item of inventory.value.items){
            if(item.status == 'active'){
                activeIndex.value = item.id - 1;
                isItemActive = true;
                emit('inventoryActive', item.name);
            }
        }
        if(isItemActive == false){
            inventory.value.setAllInactive();
            isUsingItem.value = false;
            activeIndex.value = undefined;
            emit('inventoryActive', undefined);
        }
        console.log(inventory.value.items);
    },
    { immediate: true }
);

function toggleInventory(e){
    openInventory.value = !openInventory.value;
    if(openInventory.value == true){
        e.target.innerHTML = '<';
    }else{
        inventory.value.setAllInactive();
        e.target.innerHTML = '>';
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
    gap: 24px;
    user-select: none;

    &__content{
        display: flex;
        gap: 8px;
    }

    &__items{
        display: flex;
        gap: 8px;
        align-items: center;
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

    &__button{
        padding: 8px;
        width: max-content;

        &--inactive{
            opacity: 0.5;
        }
    }

    &--close{
        height: auto;
    }
}

.useBanner{
    width: 100%;
    background-color: black;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    padding: 16px 0;
    text-align: center;
}

</style>