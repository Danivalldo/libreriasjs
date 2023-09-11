import * as Tone from "tone";

const { Synth, DuoSynth, PolySynth, NoiseSynth } = Tone;

export const polySynth = new PolySynth({
  volume: 0,
  detune: 0,
  portamento: 0,
  envelope: {
    attack: 0.005,
    attackCurve: "linear",
    decay: 0.1,
    decayCurve: "exponential",
    release: 1,
    releaseCurve: "exponential",
    sustain: 0.3,
  },
  oscillator: {
    partialCount: 0,
    partials: [],
    phase: 0,
    type: "sawtooth",
  },
}).toDestination();

console.log(polySynth);

export const clapSynth = new NoiseSynth({
  volume: -20,
  noise: {
    type: "white", // Use white noise for a typical clap sound
    playbackRate: 2, // Adjust the pitch of the noise
  },
  envelope: {
    attack: 0.001, // Very short attack for a sharp transient
    // attack: 1,
    decay: 0.1, // Control the decay time to shape the sound
    sustain: 0, // Sustain at 0 to make it a short percussive sound
    release: 0.1, // Release time for tail sound
  },
}).toDestination();

export const piano = new DuoSynth({
  harmonicity: 1,
  volume: 0,
  voice0: {
    oscillator: { type: "sine" },
    envelope: {
      attack: 0.02,
      decay: 0.1,
      sustain: 0.3,
      release: 1,
    },
  },
  voice1: {
    oscillator: { type: "sine" },
    envelope: {
      attack: 0.02,
      decay: 0.1,
      sustain: 0.3,
      release: 1,
    },
  },
}).toDestination();

export const customSynth = new Synth({
  oscillator: {
    type: "sine",
  },
  // oscillator: new AMOscillator(30, "square", "square"),
  envelope: {
    attack: 0.1,
    attackCurve: "exponential",
    decay: 0.8,
    sustain: 0.2,
    release: 1,
  },
}).toDestination();
