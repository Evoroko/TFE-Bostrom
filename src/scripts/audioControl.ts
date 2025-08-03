import { Ref } from 'vue';

export default function (
  audioStatus: Ref<{
    volume: string;
    mute: string;
  }>,
  sound: HTMLAudioElement,
) {
  sound.volume = Number(audioStatus.value.volume);
  sound.muted = audioStatus.value.mute === 'true';
  sound.currentTime = 0;
  sound.play();
}
