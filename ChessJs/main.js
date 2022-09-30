import "./style.sass";
import { Chess } from "chess.js";
import { Chessboard } from "cm-chessboard";
import {
  COLOR,
  MARKER_TYPE,
  INPUT_EVENT_TYPE,
} from "cm-chessboard/src/cm-chessboard/Chessboard";

const chess = new Chess();

const chessboard = new Chessboard(document.querySelector("#board1"), {
  responsive: true,
  position: chess.fen(),
});

const inputHandler = async (event) => {
  console.log("event", event);
  event.chessboard.removeMarkers(MARKER_TYPE.dot);
  if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
    const moves = chess.moves({ square: event.square, verbose: true });
    for (const move of moves) {
      // draw dots on possible squares
      event.chessboard.addMarker(MARKER_TYPE.dot, move.to);
    }
    return moves.length > 0;
  } else if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
    const move = { from: event.squareFrom, to: event.squareTo };
    const result = chess.move(move);
    if (result) {
      event.chessboard.disableMoveInput();

      chessboard.state.moveInputProcess.then(() => {
        // wait for the move input process has finished
        chessboard.setPosition(chess.fen(), true).then(() => {
          // update position, maybe castled and wait for animation has finished
          const possibleMoves = chess.moves({ verbose: true });
          if (possibleMoves.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * possibleMoves.length
            );
            const randomMove = possibleMoves[randomIndex];
            setTimeout(() => {
              // smoother with 500ms delay
              chess.move({ from: randomMove.from, to: randomMove.to });
              event.chessboard.enableMoveInput(inputHandler, COLOR.white);
              event.chessboard.setPosition(chess.fen(), true);
            }, 500);
          }
        });
      });
    } else {
      console.warn("invalid move", move);
    }
    return result;
  }
};

chessboard.enableMoveInput(inputHandler, COLOR.white);

console.log(chessboard);
