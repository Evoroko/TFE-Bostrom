<template>
    <button class="button" :class="{ 'button--small': small == true }">
        <span class="button__txt">
            <slot/>

        </span>
    </button>
</template>

<script setup>

const props = defineProps({
    small: {
        type: Boolean,
        required: false,
        default: false
    }
})

</script>

<style lang="scss">

.button{
    font: var(--exo-16px-medium);
    color: var(--grey-black);
    border: none;
    height: 32px;
    background-color: transparent;
    box-sizing: border-box;
    transition: .2s;
    cursor: pointer;
    // margin: 0 36px;

    &:hover{
        filter: drop-shadow(-2px -2px 0 var(--main-cyan)) drop-shadow(2px 2px 0 var(--main-magenta));
    }

    &:active{
        filter: drop-shadow(2px 2px 0 var(--main-cyan)) drop-shadow(-2px -2px 0 var(--main-magenta));
    }

    &__txt{
        background-color: var(--c-txt);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        box-sizing: border-box;
        height: 100%;
        margin: 0 16px;
        position: relative;
        z-index: 1;
    
        &::after, &::before{
            content: "";
            position: absolute;
            left: -12px;
            top: 4.5px;
            z-index: -1;
            width: 22.5px;
            height: 22.5px;
            transform: rotate(45deg);
            background-color: var(--c-txt);
        }

        &::after{
            left: auto;
            right: -12px;
        }
    }

    &--small{
        .button__txt{
            width: 0;
            padding: 0;
        }
    }
}

</style>