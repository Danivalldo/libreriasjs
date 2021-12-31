import { Scene } from "phaser";
import Loader from "./Loader";
import SoundsCtrl from "./SoundsCtrl";
import level from "./data/level1.json";

class IsoScene extends Scene {
  constructor() {
    const sceneConfig = {
      key: "IsoScene",
      mapAdd: { isoPlugin: "iso", isoPhysics: "isoPhysics" },
    };
    super(sceneConfig);
    this.soundsCtrl = new SoundsCtrl(this);
    this.loader = new Loader(this);
    this.player = undefined;
    this.cubeSize = 40;
  }
  preload() {
    this.loader.loadAssets();
    this.soundsCtrl.loadSounds();
  }

  create() {
    const { configuration, player, items, tiles } = level;

    this.soundsCtrl.addSounds();
    this.tilesGroup = this.add.group();
    this.itemsGroup = this.add.group();
    this.isoPhysics.world.gravity.setTo(0, 0, -1000);
    this.isoPhysics.projector.origin.setTo(0.5, 0.5);
    this.iso.projector.origin.setTo(0.5, 0.5);
    this.createTiles(tiles);
    this.createItems(items);
    this.createAnimations();
    this.createPlayer(
      player.pos[0] * this.cubeSize,
      player.pos[1] * this.cubeSize
    );
    if (configuration.cameraFollow) {
      this.cameras.main.startFollow(this.player);
    }
    this.cameras.main.setBackgroundColor(
      configuration.backgroundColor || "#d7f3f6"
    );
  }

  createAnimations() {
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("character", {
        start: 36,
        end: 43,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "idle",
      frames: [{ key: "character", frame: 0 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "jump",
      frames: [{ key: "character", frame: 8 }],
      frameRate: 20,
    });
  }

  createTiles(tiles) {
    for (let i = 0, j = tiles.length; i < j; i++) {
      const tilesRow = tiles[i];
      for (let n = 0, m = tilesRow.length; n < m; n++) {
        const tileData = tilesRow[n];
        const tile = this.add.baseTile(
          tileData.pos[0] * this.cubeSize +
            (tileData.offset ? tileData.offset[0] : 0),
          tileData.pos[1] * this.cubeSize +
            (tileData.offset ? tileData.offset[1] : 0),
          i * this.cubeSize + (tileData.offset ? tileData.offset[2] : 0),
          tileData.type,
          this.tilesGroup,
          tileData
        );
      }
    }
  }

  createItems(items) {
    for (let i = 0, j = items.length; i < j; i++) {
      const itemsRow = items[i];
      for (let n = 0, m = itemsRow.length; n < m; n++) {
        const itemData = itemsRow[n];
        console.log(itemData);
        this.add.item(
          itemData.pos[0] * this.cubeSize,
          itemData.pos[1] * this.cubeSize,
          i * this.cubeSize + 10,
          itemData.type,
          this.itemsGroup,
          itemData
        );
      }
    }
  }

  createPlayer(i, j) {
    const characterTile = this.add.player(i, j, 500, "character");
    this.player = characterTile;
  }

  update() {
    if (!this.player) {
      return;
    }
    this.isoPhysics.world.collide(this.player, this.tilesGroup, (player) => {});
    this.isoPhysics.world.collide(this.itemsGroup, this.tilesGroup);
    this.isoPhysics.world.collide(
      this.itemsGroup,
      this.player,
      (player, item) => {
        item.onGet();
      }
    );
    this.player.applyFriction();
  }

  gameOver() {
    this.player.delete();
    this.events.emit("gameOver");
    this.scene.restart();
  }
}

export default IsoScene;
