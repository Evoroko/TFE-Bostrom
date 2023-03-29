<template>
    <div class="canvas__indicator" id="popup">
        <slot/>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    const mouseFollow = document.getElementById('popup');
    document.addEventListener('mousemove', (e) => {
        mouseFollow.style.cssText = `
            left: ${e.clientX}px;
            top:  ${e.clientY - 31}px;
        `;
    });
});



</script>

<style lang="scss">
.canvas__indicator{
    height: 30px;
    width: max-content;
    background-color: black;
    position: fixed;
    touch-action: none;
    user-select: none;
}
</style>