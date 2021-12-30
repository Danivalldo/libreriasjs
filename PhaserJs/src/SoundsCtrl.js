class SoundsCtrl {
  constructor(scene) {
    this.scene = scene;
    this.soundsData = [
      { key: "coinSound", url: "audios/coin.wav" },
      { key: "coinSound2", url: "audios/coin2.wav" },
      { key: "keySound", url: "audios/key.wav" },
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
}

export default SoundsCtrl;
