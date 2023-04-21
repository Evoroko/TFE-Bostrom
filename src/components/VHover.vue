<template>
    <div class="popup" id="popup">
        <div class="popup__text">
            <p>
                <span>
                    <slot/>
                </span>
            </p>
            
        </div>
    </div>

</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    mouseX: {
        type: Number,
        required: true
    },
    mouseY: {
        type: Number,
        required: true
    }
})

onMounted(() => {
    const mouseFollow = document.getElementById('popup');

    const definePosition = (x, y) => {
        mouseFollow.style.cssText = `
                left: ${x + 18}px;
                top:  ${y - 40}px;
                display: block;
        `;
    }

    definePosition(props.mouseX, props.mouseY);

    document.addEventListener('mousemove', (e) => {
        definePosition(props.mouseX, props.mouseY);
    });
});



</script>

<style lang="scss">


.popup{
    position: fixed;
    touch-action: none;
    user-select: none;
    display: none;
    filter: drop-shadow(0 2px 3px rgba(13, 13, 13, .4));

    &::after{
        content: "";
        width: 24px;
        height: 1px;
        display: block;
        background-color: white;
        position: absolute;
        left: -16px;
        bottom: -17px;
        rotate: -45deg;
        z-index: -1;

        animation-name: popupLine;
        animation-duration: .2s;
        transform-origin: left top;
    }

    &__text{
        display: flex;
        // background-color: var(--transparent-black-80);
        border-bottom: 1px solid white;
        height: 24px;
        width: max-content;
        transform-origin: top left;

        animation-name: popupOpen;
        animation-duration: .2s;
        animation-delay: .1s;
        animation-fill-mode: backwards;

        p{
            background-color: var(--transparent-black-80);
            overflow: hidden;
        }

        span{
            animation-name: popupText;
            animation-duration: .2s;
            animation-delay: .2s;
            animation-fill-mode: backwards;
            display: block;
        }

        &::before, &::after{
            content: "";
            width: 16px;
            height: 100%;
        }

        &::after{
            background: linear-gradient(270deg, rgba(13, 13, 13, 0) 0%, rgba(13, 13, 13, 0.8) 100%);
        }

        &::before{
            background: linear-gradient(270deg, rgba(13, 13, 13, 0.8) 0%, rgba(13, 13, 13, 0) 100%);
        }
    }
}


@keyframes popupOpen {
    0%{
        transform: scaleX(0);
    }

    100%{
        transform: scaleX(1);
    }
}

@keyframes popupLine {
    0%{
        transform: scaleX(0);
    }

    100%{
        transform: scaleX(1);
    }
}

@keyframes popupText {
    0%{
        transform: translateY(100%);
    }

    100%{
        transform: translateY(0%);
    }
}
</style>