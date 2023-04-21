<template>
    <div class="jumptxt">
        <svg width="200" height="200" viewBox="70 0 250 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="70.7107" y="0.707107" width="99" height="99" stroke="white"/>
            <rect x="85.3553" y="14.5786" width="72.6274" height="72.6274" fill="#FF00D6"/>
            <rect x="85.3555" y="14.5786" width="72.6274" height="72.6274" fill="#00FFB2"/>
            <rect x="85.7107" y="14.9964" width="71.6274" height="71.6274" fill="white" stroke="white"/>
        </svg>
    </div>

    


</template>

<script setup>

</script>

<style lang="scss">
.jumptxt{
    width: 16px;
    height: 16px;
    rotate: 45deg;
    display: inline-block;
    transform: scale(2) translate(4px, 4px);
    margin-left: 12px;

    svg{
        width: 100%;
        height: 100%;
    }


    rect:nth-of-type(2){
        animation: jumpMagenta .3s infinite alternate;
    }

    rect:nth-of-type(3){
        animation: jumpCyan .3s infinite alternate;
    }

    rect:nth-of-type(4){
        animation: jumpMain .3s infinite alternate;
    }
}

@keyframes jumpMagenta {
    0%{
        transform: translateX(0%) translateY(0%);
    }

    100%{
        transform: translateX(20%) translateY(0);
    }
}

@keyframes jumpCyan{
    0%{
        transform: translateX(0%) translateY(0%);
    }

    100%{
        transform: translateX(0%) translateY(20%);
    }
}

@keyframes jumpMain{
    0%{
        transform: translateX(0%) translateY(0%);
    }

    100%{
        transform: translateX(10%) translateY(10%);
    }
}
</style>