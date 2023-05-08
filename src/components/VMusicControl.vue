<template>
    <div class="player">
        <audio :src="'/audio/music/'+ music + '.mp3'" autoplay loop></audio>
        <div class="volume">
            <button class="volume__mute"></button>
            <input type="range" class="volume__slider" min="0" max="1" step="0.05" value="1">
        </div>
    </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
const props = defineProps({
    music: {
        type: String,
        required: false,
        default: 'no_music'
    }
})

onMounted(() => {
    const player = document.querySelector('.player');
    const audio = player.querySelector('audio');
    const volumeSlider = player.querySelector('.volume__slider');
    const muteButton = player.querySelector('.volume__mute');

    document.addEventListener('click', musicPlay); // Chrome n'autorise plus l'autoplay sur les sites web, nécessite interaction
    function musicPlay() {
        audio.play();
        let previousVolume = Number(localStorage.getItem('volume'));
        let wasMuted = String(localStorage.getItem('muted'));
        if(previousVolume && wasMuted == 'false'){
            audio.volume = previousVolume;
            volumeSlider.value = previousVolume;
        }else if(wasMuted == 'true'){
            muteAudio();
            volumeSlider.value = 0;
        }
        document.removeEventListener('click', musicPlay);
    }

    volumeSlider.addEventListener('input', function() {
        audio.volume = volumeSlider.value;
        if(audio.volume == 0){
            muteAudio();
        }else{
            activateAudio();
        }
    });

    muteButton.addEventListener('click', function() {
        if (audio.muted) {
            activateAudio();
            volumeSlider.value = audio.volume;
        } else {
            muteAudio();
        }
    });

    const muteAudio = () => {
        audio.muted = true;
        muteButton.classList.add('volume__mute--muted');
        volumeSlider.value = 0;
        localStorage.setItem('muted', true);
    }

    const activateAudio = () => {
        muteButton.classList.remove('volume__mute--muted');
        audio.muted = false;
        localStorage.setItem('muted', false);
        localStorage.setItem('volume', audio.volume);
    }
})


</script>

<style lang="scss">

.player{
  position: fixed;
  width: 48px;
  height: 48px;
  z-index: 2000;
  top: 8px;
  right: 8px;
  overflow: hidden;

  &:hover{
    overflow: visible;

    .volume__slider{
        opacity: 1;
    }
  }
}

.volume {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__mute{
        cursor: pointer;
        width: 48px;
        height: 48px;
        border: none;
        background-image: url("/assets/volume-on.svg");
        background-size: cover;
        background-color: transparent;
        background-position: center;

        &--muted {
            background-image: url("/assets/volume-off.svg");
        }
    }

    &__slider{
        cursor: pointer;
        width: 100px;
        height: 8px;
        -webkit-appearance: none;
        background-color: var(--grey-1000);
        opacity: 0;
        transform-origin: left center;
        rotate: 90deg;
        transform: translateY(-50px);
        transition: .2s;

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            background-color: #fff;
            cursor: pointer;
            rotate: 45deg;
        }
    }
}

</style>