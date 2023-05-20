<template>
    <button class="button" :class="{ 'button--small': small == true, 'button--big': big == true, 'button--secondary': reverse == true }">
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
    },
    big: {
        type: Boolean,
        required: false,
        default: false
    },
    reverse: {
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

    &--big{
        width: 100%;
        height: 48px;

        .button__txt{
            font: var(--exo-20px-medium);
            text-transform: uppercase;
            padding: 8px 24px;

            &::after, &::before{
                content: "";
                position: absolute;
                left: -17px;
                top: 7px;
                z-index: -1;
                width: 34px;
                height: 34px;
                transform: rotate(45deg);
                background-color: var(--c-txt);
            }

            &::after{
                left: auto;
                right: -17px;
            }
        }
    }

    &--secondary{
        .button__txt{
            background-color: var(--grey-1000);
            color: var(--c-txt);
            border-top: 1px solid var(--c-txt);
            border-bottom: 1px solid var(--c-txt);

            &::after, &::before{
                background-color: var(--grey-1000);
                box-sizing: border-box;
            }

            &::after{
                border-top: 1px solid var(--c-txt);
                border-right: 1px solid var(--c-txt);
            }

            &::before{
                border-left: 1px solid var(--c-txt);
                border-bottom: 1px solid var(--c-txt);
            }
        }
    }
}

</style>