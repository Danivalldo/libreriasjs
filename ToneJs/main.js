import "./style.css";
import * as Tone from "tone";
import { customSynth, piano, polySynth, clapSynth } from "./src/synths";
import StepSequencer from "./src/StepSequencer";

const { Transport, start, Destination } = Tone;

const playNoteBtn = document.querySelector("#play-note-btn");
const playSongBtn = document.querySelector("#play-song-btn");
const stopSongBtn = document.querySelector("#stop-song-btn");
const clapBtn = document.querySelector("#clap-btn");
const intervalSlider = document.querySelector("#interval");
const tempoSlider = document.querySelector("#tempo");
const synthSelector = document.querySelector("#synth");

// Create a musical sequence
// const melody = [
//   { note: "C4", duration: "4n" },
//   { note: "D4", duration: "4n" },
//   { note: "E4", duration: "4n" },
//   { note: "C4", duration: "4n" },
//   { note: "F4", duration: "4n" },
//   { note: "E4", duration: "4n" },
//   { note: "D4", duration: "4n" },
//   { note: "G4", duration: "4n" },
// ];

const stepSequencer = new StepSequencer("#step-sequencer-container");

// Play the melody
let index = 0;
let tempo = 120;
let interval = "4n";
let synth = polySynth;

const playNote = () => {
  clapSynth.triggerAttackRelease();
  const notes = stepSequencer.getNotesByStep(index);

  for (let i = 0, j = notes.length; i < j; i++) {
    const note = notes[i];
    synth.triggerAttackRelease(`${note}`, "4n");
  }
  // const { note, duration } = melody[index];

  // synth.triggerAttackRelease(note, duration);

  index = (index + 1) % stepSequencer.tracks;
};

const playSong = async () => {
  if (Transport.state === "started") return;
  // await start();
  await Transport.start();
  // Schedule the melody to play
  Transport.scheduleRepeat((time) => {
    playNote();
  }, interval);

  // Start the transport (metronome)
  Transport.bpm.value = tempo; // Set the tempo
  await start();
};

const stopSong = () => {
  Transport.cancel();
  Transport.stop();
  index = 0;
};

const playCustomNote = async () => {
  const now = Tone.now();
  synth.triggerAttackRelease("C4", "5n", now);
};

const playClap = async () => {
  clapSynth.triggerAttackRelease();
};

const onChangeSilderInterval = (e) => {
  // console.log();
  stopSong();
  interval = `${e.target.value}n`;
  playSong();
};

const onChangeSilderTempo = (e) => {
  tempo = e.target.value;
  Transport.bpm.value = tempo;
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

playSongBtn.addEventListener("click", playSong);
playNoteBtn.addEventListener("click", playCustomNote);
stopSongBtn.addEventListener("click", stopSong);
intervalSlider.addEventListener("change", onChangeSilderInterval);
tempoSlider.addEventListener("change", onChangeSilderTempo);
synthSelector.addEventListener("change", onSelectSynth);
clapBtn.addEventListener("click", playClap);

window.Transport = Transport;
window.synth = synth;
window.Destination = Destination;
