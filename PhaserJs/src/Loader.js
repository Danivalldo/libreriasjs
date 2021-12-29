import Phaser from "phaser";
import IsoPlugin, { IsoPhysics } from "phaser3-plugin-isometric";
// import IsoPlugin, { IsoPhysics } from "./IsoPlugin";
import Character from "./Character";
import BaseTile from "./BaseTile";
import Item from "./Item";

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

Phaser.GameObjects.GameObjectFactory.register(
  "character",
  function (x, y, z, key, group, frame = 0) {
    const sprite = new Character(this.scene, x, y, z, key, frame);
    if (typeof group === "undefined") {
      this.displayList.add(sprite);
      this.updateList.add(sprite);
    } else {
      group.add(sprite, true);
    }

    return sprite;
  }
);

Phaser.GameObjects.GameObjectFactory.register(
  "baseTile",
  function (x, y, z, key, group, data) {
    const sprite = new BaseTile(this.scene, x, y, z, key, data);
    if (typeof group === "undefined") {
      this.displayList.add(sprite);
      this.updateList.add(sprite);
    } else {
      group.add(sprite, true);
    }

    return sprite;
  }
);

Phaser.GameObjects.GameObjectFactory.register(
  "item",
  function (x, y, z, key, group, data) {
    const sprite = new Item(this.scene, x, y, z, key, data);
    if (typeof group === "undefined") {
      this.displayList.add(sprite);
      this.updateList.add(sprite);
    } else {
      group.add(sprite, true);
    }

    return sprite;
  }
);

export default Loader;
