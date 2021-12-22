import { Scene } from "phaser";
import IsoPlugin, { IsoPhysics } from "phaser3-plugin-isometric";

class IsoScene extends Scene {
  constructor() {
    const sceneConfig = {
      key: "IsoScene",
      mapAdd: { isoPlugin: "iso", isoPhysics: "isoPhysics" },
    };
    super(sceneConfig);
  }
  preload() {
    this.load.image("baseTile", "imgs/tiles/tile_base.png");
    this.load.scenePlugin({
      key: "IsoPlugin",
      url: IsoPlugin,
      sceneKey: "iso",
    });
    this.load.scenePlugin({
      key: "IsoPhysics",
      url: IsoPhysics,
      sceneKey: "isoPhysics",
    });
  }

  create() {
    this.isoGroup = this.add.group();
    this.iso.projector.origin.setTo(0.5, 0.5);
    this.spawnTiles();
  }

  spawnTiles() {
    let tile;
    for (let i = 0; i < 256; i += 38) {
      for (let j = 0; j < 256; j += 38) {
        tile = this.add.isoSprite(i, j, 0, "baseTile", this.isoGroup);
        tile.setInteractive();
        tile.on("pointerover", function () {
          this.setTint(0xff0000);
          this.isoZ += 38;
        });
        tile.on("pointerout", function () {
          this.clearTint();
          this.isoZ -= 38;
        });
      }
    }
  }
}

export default IsoScene;
