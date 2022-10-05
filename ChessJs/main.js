import "./style.sass";
import "flowbite";
import ChessGame from "./ChessGame";
import { saveAs } from "file-saver";

const exportPGNBtn = document.querySelector(".export-png-btn");
const resetBtn = document.querySelector(".reset-btn");

const chessGame = new ChessGame(
  document.querySelector("#board1"),
  `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`
);

chessGame.afterMove(() => {
  // chessGame.updateBoardOrientation();
  // if (chessGame.chess.turn() === "b") {
  chessGame.randomMove();
  // }
});

exportPGNBtn.addEventListener("click", () => {
  const pgn = chessGame.exportPGN();
  var blob = new Blob([pgn], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `game.pgn`);
});

resetBtn.addEventListener("click", () => {
  chessGame.reset();
});

window.chessGame = chessGame;
