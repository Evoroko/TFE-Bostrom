<template>

<div v-if="isUsingItem == false" class="inventory inventory--close">
    <div class="inventory__icon">
        <h2 class="title title--small">Sacoche</h2>
    </div>
    <div v-if="openInventory" class="inventory__content">
        <ul class="inventory__items">
            <li class="inventory__item" v-for="(item, index) in inventory.items" :key="index" :class="{ 'inventory__item--active': activeIndex === index }" @click="setActiveIndex(index)">
                <div class="item">
                    <!-- {{ item.title }} -->
                    <img class="item__img" :src="'/img/items/' + item.name + '.png'" :alt="item.title">
                </div>
            </li>
        </ul>
        <ul class="inventory__buttons">
            <li class="inventory__button">
                <VButton
                    :class="{'inventory__button--inactive': activeIndex == undefined }"
                    @click="clickInspect()"
                >Inspecter</VButton>
            </li>
            <li class="inventory__button">
                <VButton
                    :class="{'inventory__button--inactive': activeIndex == undefined }"
                    @click="clickUse()"
                >Utiliser</VButton>
            </li>
        </ul>
        
        
    </div>
    <button @click="toggleInventory" class="inventory__toggle" :class="{ 'inventory__toggle--open': openInventory === true }"></button>
</div>

<div v-if="activeIndex !== undefined && isUsingItem == true" class="useBanner">
    <p>Sur quoi souhaitez-vous utiliser «&nbsp;{{ inventory.items[activeIndex].title }}&nbsp;» ?</p>
    <VButton @click="isUsingItem = false; inventory.setAllUnused()">Annuler</VButton>
</div>

</template>

<script setup>
import VButton from './VButton.vue'
import { ref, inject, watch } from 'vue';
import Inventory from '../scripts/Inventory.js'

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
    },
    { immediate: true }
);

function toggleInventory(e){
    openInventory.value = !openInventory.value;
}

</script>

<style lang="scss">

.inventory{
    position: fixed;
    top: 0;
    left: 0;
    width: max-content;
    height: 100%;
    background-color: var(--transparent-black-80);
    z-index: 100;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 32px;
    user-select: none;

    &__content{
        display: flex;
        gap: 16px;
        align-items: center;
    }

    &__items{
        display: flex;
        gap: 12px;
        align-items: center;
    }

    &__item{
        background-color: rgb(0, 0, 0);
        width: 48px;
        height: 48px;
        cursor: pointer;
        border: 1px solid white;
        transform: rotate(45deg);
        margin: 0 8px;
        position: relative;

        &--active{

            &::after{
                content: "";
                position: absolute;
                width: 52px;
                height: 52px;
                border: 2px solid white;
                top: -4px;
                left: -4px;
            }
        }
    }

    &__buttons{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    &__button{
        width: 100%;
        height: 32px;
        display: block;

        .button{
            width: 129px;
        }

        &--inactive{
            opacity: 0.5;

            &.button{
                cursor: default;

                &:hover{
                    filter: none;
                }
            }
        }
    }

    &--close{
        height: auto;
    }

    &__icon{
        background-image: url(/img/items/bag.png);
        background-size: 70%;
        background-repeat: no-repeat;
        background-position: center top;
        height: 96px;
        width: 96px;
        display: flex;
        align-items: flex-end;
        justify-content: center;

        @media(-webkit-device-pixel-ratio: 2){
            background-image: url(/img/items/bag@2x.png);
        }
    }

    &__toggle{
        width: 24px;
        height: 24px;
        background-color: transparent;
        background-image: url(/assets/arrow-right.svg);
        background-size: contain;
        border: none;
        cursor: pointer;

        &--open{
            background-image: url(/assets/arrow-left.svg)
        }
    }
}

.useBanner{
    width: 100%;
    background-color: black;
    position: fixed;
    top: 0;
    z-index: 1000;
    padding: 16px 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
}

.item{
    display: flex;

    &__img{
        width: 80%;
        height: 80%;
        transform: rotate(-45deg) translateY(2px);
    }
}

</style>