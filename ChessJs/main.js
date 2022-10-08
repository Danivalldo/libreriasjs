import "./style.sass";
import "flowbite";
import { saveAs } from "file-saver";
import ChessGame from "./ChessGame";

const exportPGNBtn = document.querySelector(".export-png-btn");
const resetBtn = document.querySelector(".reset-btn");
const rotateBoardBtn = document.querySelector(".rotate-board-btn");
const startGameBtn = document.querySelector(".start-game-btn");

let vsMode = "vs-computer";

const chessGame = new ChessGame(
  document.querySelector("#board1"),
  `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`
);

chessGame.afterMove(() => {
  const gameOver = chessGame.isGameOver();
  if (gameOver) {
    return alert("Game over!");
  }
  if (vsMode === "vs-computer") {
    chessGame.randomMove();
    if (gameOver) {
      alert("Game over!");
    }
  }
});

exportPGNBtn.addEventListener("click", () => {
  if (chessGame.getIsReplaying()) {
    return;
  }
  const pgn = chessGame.exportPGN();
  var blob = new Blob([pgn], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `game.pgn`);
});

resetBtn.addEventListener("click", () => {
  if (chessGame.getIsReplaying()) {
    return;
  }
  chessGame.reset();
});

startGameBtn.addEventListener("click", () => {
  if (chessGame.getIsReplaying()) {
    return;
  }

  vsMode = document.querySelector('input[name="game-vs"]:checked').value;
  const pgnInputLoader = document.querySelector('[name="png-input-loader"]');

  if (pgnInputLoader.value) {
    const validPGN = chessGame.loadPGN(pgnInputLoader.value);
    if (!validPGN) {
      return;
    }
    exportPGNBtn.classList.add("opacity-25", "cursor-not-allowed");
    resetBtn.classList.add("opacity-25", "cursor-not-allowed");
    return chessGame.replayGameFromHistory(() => {
      exportPGNBtn.classList.remove("opacity-25", "cursor-not-allowed");
      resetBtn.classList.remove("opacity-25", "cursor-not-allowed");
      if (chessGame.getTurn() === "b") {
        chessGame.randomMove();
      }
    });
  }
  chessGame.reset();
});

rotateBoardBtn.addEventListener("click", () => {
  chessGame.changeBoardOrientation();
});
