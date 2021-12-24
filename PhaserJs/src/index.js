import "./SCSS/index.scss";
import Phaser, { Game, AUTO } from "phaser";
Phaser.GROUP = "Group";
import IsoScene from "./IsoScene";
// import IsoCollisionExample from "./IsoCollisionExample";

const config = {
  type: AUTO,
  width: 480,
  height: 854,
  pixelArt: true,
  scene: IsoScene,
};

const game = new Game(config);
