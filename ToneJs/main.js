import "./style.scss";
import * as Tone from "tone";
import { clapSynth } from "./src/synths";
import StepSequencer from "./src/StepSequencer";
import SynthConfigurator from "./src/SynthConfigurator";

const { Transport, start, Destination } = Tone;

const playSongBtn = document.querySelector("#play-song-btn");
const clearSongBtn = document.querySelector("#clear-song-btn");
const oscillatorTypeSelect = document.querySelector("#oscillator-type");
const tempoSlider = document.querySelector("#tempo");

const stepSequencer = new StepSequencer("#step-sequencer-container");
const synthConfigurator = new SynthConfigurator();

window.synthConfigurator = synthConfigurator;

let index = 0;
let tempo = 120;

const playColumn = (time) => {
  const notes = stepSequencer.getNotesByStep(index);
  stepSequencer.updateButtonsStepState(index);
  synthConfigurator.playNotes(notes, "8n");
  index = (index + 1) % stepSequencer.tracks;
};

const toggleSong = async () => {
  if (Transport.state === "started") {
    Transport.cancel();
    Transport.stop();
    index = 0;
    playSongBtn.classList.add("active-play");
    stepSequencer.updateButtonsStepState(-1);
    return;
  }
  await Transport.start();
  Transport.scheduleRepeat(playColumn, "8n");
  Transport.bpm.value = tempo;
  start();
  Destination.volume.rampTo(-10, 0.001);
  playSongBtn.classList.remove("active-play");
};

const onChangeSilderTempo = (e) => {
  tempo = e.target.value;
  Transport.bpm.value = tempo;
};

playSongBtn.addEventListener("click", toggleSong);
clearSongBtn.addEventListener("click", stepSequencer.clear.bind(stepSequencer));
tempoSlider.addEventListener("change", onChangeSilderTempo);
oscillatorTypeSelect.addEventListener("change", (e) => {
  const type = e.target.value;
  synthConfigurator.changeOscillatorType(type);
});
stepSequencer.onClickButton((note, active) => {
  if (Transport.state === "started" || active) return;
  Destination.volume.rampTo(-10, 0.001);
  synthConfigurator.playNote(`${note}`, "4n");
});
