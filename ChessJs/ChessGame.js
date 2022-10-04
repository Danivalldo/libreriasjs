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
    this.board.setOrientation(this.chess.turn());
    this.board.enableMoveInput(this.inputHandler.bind(this), this.chess.turn());
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

  async clear() {
    this.chess.clear();
    await this.board.setPosition(this.chess.fen(), true);
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
        promotion: this.isPromotingMove(this.chess.fen(), {
          from: event.squareFrom,
          to: event.squareTo,
        })
          ? "q"
          : undefined,
      };
      const result = this.chess.move(move);
      //if (result) {
      this.board.disableMoveInput();
      this.board.state.moveInputProcess.then(async () => {
        await this.board.setPosition(this.chess.fen(), true);
        this.board.enableMoveInput(
          this.inputHandler.bind(this),
          this.chess.turn()
        );
        // this.board.setOrientation(this.chess.turn());
      });
      return result;
      //}
      // this.board.state.moveInputProcess.then(async () => {
      //   this.board.disableMoveInput();
      //   await this.board.setPosition(this.chess.fen(), true);
      //   this.board.enableMoveInput(
      //     this.inputHandler.bind(this),
      //     this.chess.turn()
      //   );
      // });
    }
  }
}

export default ChessGame;
