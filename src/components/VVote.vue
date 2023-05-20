<template>
    <div class="bg bg--white">
        <div class="code">
            <div class="code__container">
                <h2 class="title">VOTEZ</h2>
                <ul class="vote">
                    <li class="vote__option-container" @click="close">
                        <span class="vote__option vote__option--left"></span>
                        <span class="vote__txt vote__txt--left">Uriel</span>
                    </li>
                    <li class="vote__option-container" @click="close">
                        <span class="vote__option vote__option--right"></span>
                        <span class="vote__txt vote__txt--right">Socrates</span>
                    </li>
                </ul>
                <p class="vote__disclaimer">[Fin de la bêta ici, pas de vote possible pour le moment] Disponible jusqu'au 26/06/23 à 14h UTC+2. Passé ce délai, votre vote ne sera pas comptabilisé.</p>
            </div>
            
        </div>
    </div>


</template>

<script setup>

const emit = defineEmits(['closeVote'])

const close = () => {
    // emit('closeVote')
    console.log('Pas de vote possible pour la bêta')
}

</script>

<style lang="scss">

.vote{
    display: flex;
    height: 370px;
    width: 402px;
    gap: 32px;

    @media (max-width: 992px){
        height: 240px;
        width: 300px;
    }

    &__option-container{
        height: 100%;
        width: 100%;
        filter: saturate(0%);
        cursor: pointer;
        transition: .2s;
        position: relative;


        &:hover{
            filter: saturate(100%);
            transform: scale(1.1);

            .vote__option{
                background-size: 500px;

                @media (max-width: 992px){
                    background-size: 350px;
                }

                &--left{
                    background-position: 35% -0%;
                }

                &--right{
                    background-position: 60% -5%;
                }
            }
        }
        
    }

    &__option{
        display: block;
        height: 100%;
        width: 100%;
        background-size: 700px;
        background-repeat: no-repeat;
        background-color: var(--grey-1000);
        transition: .2s;

        @media (max-width: 992px){
            background-size: 300px;
        }

        &--left{
            clip-path: polygon(100% 0, 100% 100%, 0 50%);
            background-image: url(/img/sprites/uriel.webp);
            @media (-webkit-device-pixel-ratio: 2){
                background-image: url(/img/sprites/uriel@2x.webp);
            }
            background-position: 40% 4%;
        }

        &--right{
            clip-path: polygon(0 0, 0 100%, 100% 50%);
            background-image: url(/img/sprites/socrates.webp);
            @media (-webkit-device-pixel-ratio: 2){
                background-image: url(/img/sprites/socrates@2x.webp);
            }
            background-position: 55% 0%;
        }
    }

    &__txt{
        font: var(--exo-20px-medium);
        text-transform: uppercase;
        letter-spacing: .2rem;
        position: absolute;
        top: 25%;
        left: 25%;
        transform: translate(-8px, -50%) rotate(-45deg);

        @media (max-width: 992px){
            transform: translate(-24px, -50%) rotate(-45deg);
        }

        &--right{
            left: auto;
            right: 25%;
            transform: translate(32px, -50%) rotate(45deg);

            @media (max-width: 992px){
                transform: translate(48px, -50%) rotate(45deg);
            }
        }
    }

    &__disclaimer{
        font: var(--agrandir-13px-light);
        width: 250px;
        text-align: center;
        font-style: italic;
    }
}

</style>