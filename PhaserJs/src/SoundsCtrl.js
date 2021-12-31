/**
 * Fluffing a Duck Kevin MacLeod (incompetech.com)
 * Licensed under Creative Commons: By Attribution 3.0 License
 * http://creativecommons.org/licenses/by/3.0/
 * Music promoted by https://www.chosic.com/free-music/all/
 */

class SoundsCtrl {
  constructor(scene) {
    this.scene = scene;
    this.soundsData = [
      { key: "coinSound", url: "audios/coin.wav" },
      { key: "coinSound2", url: "audios/coin2.wav" },
      { key: "keySound", url: "audios/key.wav" },
      { key: "soundTrackDuck", url: "audios/Fluffing-a-Duck.mp3" },
    ];
    this.sounds = {};
  }
  loadSounds() {
    for (let i = 0, j = this.soundsData.length; i < j; i++) {
      const soundData = this.soundsData[i];
      this.scene.load.audio(soundData.key, soundData.url);
    }
  }
  addSounds() {
    for (let i = 0, j = this.soundsData.length; i < j; i++) {
      const soundData = this.soundsData[i];
      this.sounds[soundData.key] = this.scene.sound.add(soundData.key);
    }
  }
  play(key) {
    if (!this.sounds[key]) {
      return;
    }
    this.sounds[key].play();
  }
  playSoundTrack(key) {
    this.play(key);
  }
}

export default SoundsCtrl;
