import * as Tone from "tone";

const { Synth } = Tone;

class SynthConfigurator {
  constructor() {
    this.synths = [];
    this.createSynths();
  }
  createSynths() {
    this.synths.push(
      new Synth({
        oscillator: { type: "square8" },
      })
    );
    // this.synths.push(
    //   new Synth({
    //     oscillator: { type: "square8" },
    //   })
    // );
    // this.synths.push(
    //   new Synth({
    //     oscillator: { type: "square8" },
    //   })
    // );
    // this.synths.push(
    //   new Synth({
    //     oscillator: { type: "square8" },
    //   })
    // );
  }
  playNote(note, duration) {
    console.log(note, duration);
    this.synths.forEach((synth) => {
      synth.triggerAttackRelease(note, duration);
    });
  }
}

export default SynthConfigurator;
