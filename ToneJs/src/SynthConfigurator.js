import * as Tone from "tone";

const { Synth } = Tone;

class SynthConfigurator {
  constructor() {
    this.synths = [];
    this.createSynths(7);
    this.addListeners();
  }
  createSynths(numSynths) {
    for (let i = 0; i < numSynths; i++) {
      this.synths.push(
        new Synth({
          oscillator: {
            type: "triangle8",
          },
          envelope: {
            attack: 0.1,
            decay: 0.1,
            sustain: 0.1,
            release: 0.1,
          },
        }).toDestination()
      );
    }
  }
  playNote(note, duration) {
    this.synths[0].triggerAttackRelease(note, duration);
  }
  playNotes(notes, duration) {
    for (let i = 0, j = notes.length; i < j; i++) {
      const note = notes[i];
      this.synths[i].triggerAttackRelease(
        `${note.noteName}${note.octave}`,
        duration
      );
    }
  }
  changeOscillatorType = (type) => {
    this.synths.forEach((synth) => {
      synth.oscillator.type = type;
    });
  };
  addListeners() {
    document
      .querySelector(".envelop-sliders")
      .addEventListener("input", (e) => {
        const slider = e.target;
        if (slider.nodeName.toLowerCase() !== "input") return;
        this.synths.forEach((synth) => {
          const envelopPropertyName = slider.name;
          const envelopPropertyValue = Number(slider.value);
          synth.envelope[envelopPropertyName] = envelopPropertyValue;
        });
      });
    document
      .querySelector("#oscillator-type")
      .addEventListener("change", (e) => {
        const type = e.target.value;
        this.changeOscillatorType(type);
      });
  }
}

export default SynthConfigurator;
