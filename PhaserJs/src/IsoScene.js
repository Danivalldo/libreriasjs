import Phaser, { Scene } from "phaser";
// import IsoPlugin, { IsoPhysics } from "./IsoPlugin";
import IsoPlugin, { IsoPhysics } from "phaser3-plugin-isometric";
import level from "./data/level.json";
import Character from "./Character";

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

class IsoScene extends Scene {
  constructor() {
    const sceneConfig = {
      key: "IsoScene",
      mapAdd: { isoPlugin: "iso", isoPhysics: "isoPhysics" },
    };
    super(sceneConfig);
    this.mainCharacter = undefined;
    this.cubes = 0;
    this.cubeSize = 40;
  }
  preload() {
    // this.load.image("baseTile", "imgs/tiles/tile_base.png");
    this.load.image("baseTile", "imgs/tiles/tile_base.png");
    this.load.spritesheet(
      "character",
      "imgs/characters/character_femaleAdventurer_sheet_resized.png",
      { frameWidth: 66, frameHeight: 88 }
    );
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
    this.isoPhysics.world.gravity.setTo(0, 0, -1000);
    this.isoPhysics.projector.origin.setTo(0.5, 0.5);
    this.iso.projector.origin.setTo(0.5, 0.5);
    this.createLevel(level);
    this.createAnimations();
    this.createCharacter(0, this.cubeSize * 5);
    // this.spawnTiles();
    // window.setTimeout(() => {
    //   this.createDummyCharacter(32, 32);
    // }, 3000);
    // this.input.on("pointerdown", () => {
    //   this.createCube(this.cubeSize * this.cubes, 0, 0);
    //   this.cubes++;
    // });
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

  createLevel(level) {
    for (let i = 0, j = level.length; i < j; i++) {
      const levelRow = level[i];
      for (let n = 0, m = levelRow.length; n < m; n++) {
        const tile = levelRow[n];
        this.createCube(
          tile.pos[0] * this.cubeSize,
          tile.pos[1] * this.cubeSize,
          i * this.cubeSize
        );
      }
    }
  }

  update() {
    if (!this.mainCharacter) {
      return;
    }
    this.isoPhysics.world.collide(
      this.mainCharacter,
      this.isoGroup,
      (collision) => {
        // console.log(this);
        // console.log(collision);
        // this.mainCharacter.setCustomTouchingFloor(true);
      }
    );
    this.mainCharacter.applyFriction();
  }

  spawnTiles() {
    // for (let i = 0; i < 256; i += 96) {
    //   for (let j = 0; j < 256; j += 96) {
    //     this.createCube(i, j);
    //   }
    // }
    for (let i = 0; i < 256; i += 96) {
      for (let j = 0; j < 256; j += 96) {
        this.createCube(i, j, 0);
      }
    }
  }

  createCharacter(i, j) {
    const characterTile = this.add.character(
      i,
      j,
      500,
      "character",
      this.isoGroup
    );
    this.mainCharacter = characterTile;
  }

  gameOver() {
    alert("Game Over");
  }

  createCube(i, j, z) {
    const tile = this.add.isoSprite(i, j, z, "baseTile", this.isoGroup);
    this.isoPhysics.world.enable(tile);
    tile.body.collideWorldBounds = true;
    tile.body.bounce.set(0, 0, 0);
    tile.body.mass = 0;
    tile.body.immovable = true;
    tile.body.gravity = 0;
  }
}

export default IsoScene;
