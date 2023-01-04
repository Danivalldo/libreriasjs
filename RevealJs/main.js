import "./style.sass";
import Reveal from "reveal.js";
// import Markdown from "reveal.js/plugin/markdown/markdown.esm";
import Notes from "reveal.js/plugin/notes/notes.esm";

const deck = new Reveal({
  plugins: [Notes],
  hash: true,
  respondToHashChanges: true,
  history: true,
  // controlsTutorial: true,
});

deck.initialize();
