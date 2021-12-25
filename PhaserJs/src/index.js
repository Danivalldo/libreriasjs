import "./SCSS/index.scss";
import Phaser, { Game, AUTO } from "phaser";
Phaser.GROUP = "Group";
import IsoScene from "./IsoScene";
// import IsoCollisionExample from "./IsoCollisionExample";

const config = {
  type: AUTO,
  // width: 480,
  // height: 854,
  width: 1280,
  height: 720,
  pixelArt: true,
  scene: IsoScene,
  physics: { default: "arcade" },
};

const game = new Game(config);
