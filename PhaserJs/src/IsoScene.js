import { Scene } from "phaser";
import Loader from "./Loader";
import Player from "./Player";
import BaseTile from "./BaseTile";
import Item from "./Item";
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
    this.gridSize = 40;
  }
  preload() {
    const { configuration } = level;
    this.loader.loadAssets();
    this.soundsCtrl.loadSounds();
    if (configuration.soundTrack) {
      this.soundsCtrl.loadSoundTrack(configuration.soundTrack);
    }
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
      player.pos[0] * this.gridSize,
      player.pos[1] * this.gridSize,
      player.pos[2] * this.gridSize
    );
    if (configuration.cameraFollow) {
      this.cameras.main.startFollow(this.player);
    }
    if (configuration.soundTrack && configuration.playSoundTrack) {
      this.soundsCtrl.playSoundTrack(configuration.soundTrack);
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
        this.add.baseTile(
          tileData.pos[0] * this.gridSize +
            (tileData.offset ? tileData.offset[0] : 0),
          tileData.pos[1] * this.gridSize +
            (tileData.offset ? tileData.offset[1] : 0),
          i * this.gridSize + (tileData.offset ? tileData.offset[2] : 0),
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
        this.add.item(
          itemData.pos[0] * this.gridSize,
          itemData.pos[1] * this.gridSize,
          i * this.gridSize + 10,
          itemData.type,
          this.itemsGroup,
          itemData
        );
      }
    }
  }

  createPlayer(x, y, z = 500) {
    this.player = this.add.player(x, y, z, "character");
  }

  update() {
    if (!this.player) {
      return;
    }
    this.isoPhysics.world.collide(this.player, this.tilesGroup, (player) => {});
    this.isoPhysics.world.collide(this.itemsGroup, this.tilesGroup);
    this.isoPhysics.world.collide(
      this.player,
      this.itemsGroup,
      (player, item) => {
        item.onGet();
      }
    );
  }

  gameOver() {
    this.soundsCtrl.stopSoundTrack();
    this.player.delete();
    this.events.emit("gameOver");
    this.scene.restart();
  }
}

export default IsoScene;
