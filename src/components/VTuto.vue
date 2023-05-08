<template>
    <button class="tuto__button" @click="showTuto">Aide</button>
        
    <div class="bg" v-if="tutoDisplay">
        <dialog open class="tuto">
            <h2>Bienvenue dans la démo de Bostrom&nbsp;!</h2>
            <div class="tuto__text">
                <p>Essayez d'obtenir les indices nécessaires pour sortir par la porte et vous échapper&nbsp;!</p>
                <p class="tuto__text--info">(La démo n'est pas encore aboutie. Par conséquent, il est seulement possible de tester les interactions avec le décor, il n'est pas encore possible de résoudre les énigmes pour sortir. De plus, une introduction permettant de donner du contexte à la situation des personnages sera présente dans la version finale, ainsi que des interactions plus nombreuses.)</p>
                <p>Pour déplacer la caméra à gauche ou à droite, appuyez sur Q ou D.</p>
                <p>Cliquez sur les éléments du décor pour interagir avec.</p>
                <p>Lorsque vous obtenez un objet, vous pouvez le sélectionner pour l'équiper. Cliquez à nouveau dessus pour le désélectionner. Si vous souhaitez plus d'informations, vous pouvez l'inspecter.</p>
                <p>Pour avancer dans les dialogues, vous pouvez cliquer n'importe où ou appuyer sur entrée.</p>
                <p>Pour revoir ces informations, cliquez sur le bouton «&nbsp;Aide&nbsp;» en haut à droite.</p>
                <p class="tuto__text--info">Roxy a été élue à 73.8% sur un total de 65 votes pour être mise en avant dans le premier chapitre du jeu. (<a target="_blank" href="https://docs.google.com/forms/d/1I0oc7Gmvi5-2HRK2UV9Jalrx5-oi27YoSkzQ_qyMsx0/edit#responses">Voir le vote</a> ou <a target="_blank" href="https://docs.google.com/spreadsheets/d/1uKwrwrUIPI93zuMmCOjpHwyrJ4U4EEJr50L41qGvyic/edit?usp=sharing">consulter les résultats</a>)</p>
            </div>
            <button @click="showTuto">J'ai compris</button>
            
        </dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const tutoDisplay = ref(true);

const showTuto = () => {
    tutoDisplay.value = !tutoDisplay.value;
}

</script>

<style lang="scss">

.tuto{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    border: none;
    background-color: black;
    color: white;
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    &__button{
        z-index: 1000;
        position: fixed;
        top: 0;
        right: 0;
    }

    &__text{
        width: 100%;

        & > *{
            margin-bottom: 12px;
        }

        &--info{
            font-style: italic;
            font-size: 13px;
            color: aqua;

            a{
                color: rgb(255, 172, 234);
                text-decoration: underline;
            }
        }
    }
}

</style>