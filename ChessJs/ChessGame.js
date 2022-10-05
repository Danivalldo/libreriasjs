import { Chess } from "chess.js";
import { Chessboard } from "cm-chessboard";
import {
  COLOR,
  MARKER_TYPE,
  INPUT_EVENT_TYPE,
} from "cm-chessboard/src/cm-chessboard/Chessboard";

class ChessGame {
  constructor(element, fen) {
    this.chess = new Chess(fen);
    this.board = new Chessboard(element, {
      responsive: true,
      position: this.chess.fen(),
    });
    this.onPlayerMoveCb = undefined;
    this.board.setOrientation(this.chess.turn());
    this.enablePlayerMove();
  }

  isPromotingMove(move) {
    const piece = this.chess.get(move.from);
    if (piece?.type !== "p") {
      return false;
    }
    if (piece.color !== this.chess.turn()) {
      return false;
    }
    if (!["1", "8"].some((it) => move.to.endsWith(it))) {
      return false;
    }
    return this.chess
      .moves({ square: move.from, verbose: true })
      .map((it) => it.to)
      .includes(move.to);
  }

  playGameFromHistory() {
    const history = this.chess.history();
    this.disablePlayerMove();
    this.chess.reset();
    this.board.setPosition(this.chess.fen(), true);
    const recursiveFunction = (pointer) => {
      const nextMove = history[pointer];
      console.log(nextMove);
      if (!nextMove) {
        this.enablePlayerMove();
        return;
      }
      this.chess.move(nextMove);
      this.board.setPosition(this.chess.fen(), true);
      window.setTimeout(recursiveFunction.bind(this, ++pointer), 500);
    };
    recursiveFunction(0);
  }

  onPlayerMove(cb) {
    this.onPlayerMoveCb = cb;
  }

  enablePlayerMove() {
    this.board.enableMoveInput(this.inputHandler.bind(this), this.chess.turn());
  }

  disablePlayerMove() {
    this.board.disableMoveInput();
  }

  reset() {
    this.chess.reset();
    this.board.setPosition(this.chess.fen(), true);
  }

  async clear() {
    this.chess.clear();
    await this.board.setPosition(this.chess.fen(), true);
  }

  exportPGN() {
    return this.chess.pgn();
  }

  loadPGN(pgn) {
    this.chess.loadPgn(pgn);
    this.board.setPosition(this.chess.fen(), true);
  }

  randomMove() {
    this.disablePlayerMove();
    const possibleMoves = this.chess.moves({ verbose: true });
    if (possibleMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      const randomMove = possibleMoves[randomIndex];
      this.chess.move({ from: randomMove.from, to: randomMove.to });
      this.board.setPosition(this.chess.fen(), true);
    }
    this.enablePlayerMove();
  }

  setBoardOrientation(color = COLOR.white) {
    this.board.setOrientation(color);
  }

  getTurn() {
    return this.chess.turn();
  }

  async inputHandler(event) {
    this.board.removeMarkers(MARKER_TYPE.dot);
    if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
      const moves = this.chess.moves({ square: event.square, verbose: true });
      for (const move of moves) {
        this.board.addMarker(MARKER_TYPE.dot, move.to);
      }
      return moves.length > 0;
    }
    if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
      const move = {
        from: event.squareFrom,
        to: event.squareTo,
        promotion: this.isPromotingMove({
          from: event.squareFrom,
          to: event.squareTo,
        })
          ? "q"
          : undefined,
      };
      const result = this.chess.move(move);
      this.disablePlayerMove();
      this.board.state.moveInputProcess.then(async () => {
        await this.board.setPosition(this.chess.fen(), true);
        if (typeof this.onPlayerMoveCb === "function" && result) {
          this.onPlayerMoveCb();
        }
        this.enablePlayerMove();
      });
      return result;
    }
  }
}

export default ChessGame;
