<template>

    <div class="textbox">
        <div class="textbox__name" v-if="name !== 'none'">
            <p>{{ name }}</p>
        </div>
        <p class="textbox__text" v-html="text"></p>
    </div>

</template>

<script setup>

const props = defineProps({
    name: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: false
    }
})

</script>

<style lang="scss" scoped>

.textbox{
    width: 100%;
    max-width: 800px;
    height: 144px;
    background-color: black;
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    padding: 32px;
    box-sizing: border-box;
    z-index: 100;
    user-select: none;

    &__name{
        position: absolute;
        top: -16px;
        left: 16px;
        background-color: rgb(18, 18, 18);
        padding: 8px 16px;
    }

}

</style>