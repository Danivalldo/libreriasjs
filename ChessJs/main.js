import "./style.sass";
import ChessGame from "./ChessGame";
import { saveAs } from "file-saver";

const exportPGNBtn = document.querySelector(".export-png-btn");

const chessGame = new ChessGame(
  document.querySelector("#board1"),
  `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`
);

chessGame.onPlayerMove(() => {
  // chessGame.setBoardOrientation(chessGame.getTurn());
  chessGame.randomMove();
});

exportPGNBtn.addEventListener("click", () => {
  const pgn = chessGame.exportPGN();
  var blob = new Blob([pgn], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `game.pgn`);
});

// const launchRandomGame = () => {
//   const totalmoves = 100;
//   let move = 0;
//   const performRandomMove = () => {
//     if (move >= totalmoves) {
//       return;
//     }
//     move++;
//     chessGame.randomMove();
//     window.setTimeout(performRandomMove, 500);
//   };
//   performRandomMove();
// };

// launchRandomGame();

window.chessGame = chessGame;

// const chess = new Chess(
//   `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1`
// );

// const chessboard = new Chessboard(document.querySelector("#board1"), {
//   responsive: true,
//   position: chess.fen(),
// });

// chessboard.setOrientation(COLOR.black);

// const inputHandler = async (event) => {
//   console.log("event", event);
//   chessboard.removeMarkers(MARKER_TYPE.dot);
//   if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
//     const moves = chess.moves({ square: event.square, verbose: true });
//     for (const move of moves) {
//       // draw dots on possible squares
//       chessboard.addMarker(MARKER_TYPE.dot, move.to);
//     }
//     return moves.length > 0;
//   }
//   if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
//     const move = {
//       from: event.squareFrom,
//       to: event.squareTo,
//       promotion: isPromoting(chess.fen(), {
//         from: event.squareFrom,
//         to: event.squareTo,
//       })
//         ? "q"
//         : undefined,
//     };
//     const result = chess.move(move);
//     if (result) {
//       chessboard.disableMoveInput();
//       chessboard.state.moveInputProcess.then(() => {
//         // wait for the move input process has finished
//         chessboard.setPosition(chess.fen(), true).then(() => {
//           // update position, maybe castled and wait for animation has finished
//           const possibleMoves = chess.moves({ verbose: true });
//           if (possibleMoves.length > 0) {
//             const randomIndex = Math.floor(
//               Math.random() * possibleMoves.length
//             );
//             const randomMove = possibleMoves[randomIndex];
//             // setTimeout(() => {
//             // smoother with 500ms delay
//             chess.move({ from: randomMove.from, to: randomMove.to });
//             chessboard.enableMoveInput(inputHandler, COLOR.black);
//             chessboard.setPosition(chess.fen(), true);
//             // }, 500);
//           }
//         });
//       });
//       return result;
//     }
//     // console.warn("invalid move", move);
//     // console.log(chess.fen());
//     // console.log(". . . .");
//     chessboard.state.moveInputProcess.then(async () => {
//       chessboard.disableMoveInput();
//       await chessboard.setPosition(chess.fen(), true);
//       chessboard.enableMoveInput(inputHandler, COLOR.black);
//       console.log("DONE!");
//     });
//   }
// };

// chessboard.enableMoveInput(inputHandler, COLOR.black);

// console.log(chessboard);
