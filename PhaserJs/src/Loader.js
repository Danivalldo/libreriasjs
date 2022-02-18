import IsoPlugin, { IsoPhysics } from "phaser3-plugin-isometric";

class Loader {
  constructor(scene) {
    this.scene = scene;
  }
  loadAssets() {
    this.scene.load.image("baseTile", "imgs/tiles/tile_base.png");
    this.scene.load.image("underBaseTile", "imgs/tiles/tile_under_base.png");
    this.scene.load.image("keyHoleCube", "imgs/tiles/key_hole_cube.png");
    this.scene.load.image("shadow", "imgs/characters/shadow.png");
    this.scene.load.image("key", "imgs/items/key.png");
    this.scene.load.image("coin", "imgs/items/coin.png");
    this.scene.load.image("star", "imgs/items/star.png");

    this.scene.load.spritesheet(
      "character",
      "imgs/characters/character_femaleAdventurer_sheet_resized.png",
      { frameWidth: 66, frameHeight: 88 }
    );
    this.scene.load.scenePlugin({
      key: "IsoPlugin",
      url: IsoPlugin,
      sceneKey: "iso",
    });
    this.scene.load.scenePlugin({
      key: "IsoPhysics",
      url: IsoPhysics,
      sceneKey: "isoPhysics",
    });
  }
}

export default Loader;
