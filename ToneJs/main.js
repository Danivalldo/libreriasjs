import "./style.css";
import * as Tone from "tone";
import { customSynth, piano, polySynth, clapSynth } from "./src/synths";
import StepSequencer from "./src/StepSequencer";
import SynthConfigurator from "./src/SynthConfigurator";

const { Transport, start, Destination } = Tone;

const playSongBtn = document.querySelector("#play-song-btn");
const tempoSlider = document.querySelector("#tempo");
const octaveSlider = document.querySelector("#octave");
const synthSelector = document.querySelector("#synth");

const stepSequencer = new StepSequencer("#step-sequencer-container");
const synthConfigurator = new SynthConfigurator();

let index = 0;
let tempo = 120;
let octave = 4;
let synth = polySynth;

const playNote = () => {
  clapSynth.triggerAttackRelease();
  const notes = stepSequencer.getNotesByStep(index);

  for (let i = 0, j = notes.length; i < j; i++) {
    const note = notes[i];
    synth.triggerAttackRelease(`${note}${octave}`, "4n");
    // synthConfigurator.playNote(`${note}${octave}`, "4n");
  }

  index = (index + 1) % stepSequencer.tracks;
};

const toggleSong = async () => {
  if (Transport.state === "started") {
    Transport.cancel();
    Transport.stop();
    index = 0;
    playSongBtn.innerHTML = "PLAY";
    return;
  }
  await Transport.start();
  Transport.scheduleRepeat((time) => {
    playNote();
  }, "4n");
  Transport.bpm.value = tempo; // Set the tempo
  await start();
  playSongBtn.innerHTML = "STOP";
};

const onChangeSilderTempo = (e) => {
  tempo = e.target.value;
  Transport.bpm.value = tempo;
};

const onChangeSliderOctave = (e) => {
  octave = e.target.value;
};

const onSelectSynth = (e) => {
  switch (e.target.value) {
    case "poly":
      synth = polySynth;
      return;
    case "piano":
      synth = piano;
      return;
    case "custom":
    default:
      synth = customSynth;
      return;
  }
};

playSongBtn.addEventListener("click", toggleSong);
tempoSlider.addEventListener("change", onChangeSilderTempo);
octaveSlider.addEventListener("change", onChangeSliderOctave);
synthSelector.addEventListener("change", onSelectSynth);
stepSequencer.onClickButton((note) => {
  if (Transport.state === "started") return;
  synth.triggerAttackRelease(`${note}${octave}`, "4n");
});

window.Transport = Transport;
window.synth = synth;
window.Destination = Destination;
