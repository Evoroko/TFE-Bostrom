export default function (audioStatus, sound) {
  sound.volume = audioStatus.value.volume;
  sound.muted = audioStatus.value.mute;
  sound.currentTime = 0;
  sound.play();
}
