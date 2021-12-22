import "./SCSS/index.scss";
import { Game, AUTO } from "phaser";
import IsoScene from "./IsoScene";

const config = {
  type: AUTO,
  width: 480,
  height: 854,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
    },
  },
  scene: IsoScene,
};

const game = new Game(config);
