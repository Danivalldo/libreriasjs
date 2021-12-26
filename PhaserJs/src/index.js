import "./SCSS/index.scss";
import Phaser, { Game, AUTO } from "phaser";
Phaser.GROUP = "Group";
import IsoScene from "./IsoScene";
// import IsoCollisionExample from "./IsoCollisionExample";

// 500 / 70

// 74px -> 37unitats
// 500px -> 277.02unitats
// 1000px -> 554.05unitats

const config = {
  type: AUTO,
  // width: 480,
  // height: 854,
  width: 500,
  height: 500,
  // pixelArt: true,
  scene: IsoScene,
  physics: { default: "arcade" },
};

const game = new Game(config);
