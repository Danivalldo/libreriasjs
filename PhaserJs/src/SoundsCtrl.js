/**
 * Fluffing a Duck Kevin MacLeod (incompetech.com)
 * Licensed under Creative Commons: By Attribution 3.0 License
 * http://creativecommons.org/licenses/by/3.0/
 * Music promoted by https://www.chosic.com/free-music/all/
 */

class SoundsCtrl {
  constructor(scene) {
    this.scene = scene;
    this.soundTracks = [
      { key: "soundTrackDuck", url: "audios/Fluffing-a-Duck.mp3" },
    ];
    this.soundsData = [
      { key: "coinSound", url: "audios/coin.wav" },
      { key: "coinSound2", url: "audios/coin2.wav" },
      { key: "keySound", url: "audios/key.wav" },
    ];
    this.sounds = {};
    this.soundTrackKey = undefined;
  }
  loadSoundTrack(soundTrackKey) {
    const soundTrack = this.soundTracks.filter((soundTrackData) => {
      return soundTrackKey === soundTrackData.key;
    })[0];
    if (soundTrack) {
      this.scene.load.audio(soundTrack.key, soundTrack.url);
      this.soundTrackKey = soundTrack.key;
    }
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
    if (this.soundTrackKey) {
      this.sounds[this.soundTrackKey] = this.scene.sound.add(
        this.soundTrackKey
      );
      this.sounds[this.soundTrackKey].loop = true;
    }
  }
  play(key) {
    if (!this.sounds[key]) {
      return;
    }
    this.sounds[key].play();
  }
  playSoundTrack() {
    if (!this.soundTrackKey) {
      return;
    }
    this.play(this.soundTrackKey);
  }
  stopSoundTrack() {
    if (!this.soundTrackKey) {
      return;
    }
    this.sounds[this.soundTrackKey].stop();
  }
}

export default SoundsCtrl;
