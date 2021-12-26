import { Scene } from "phaser";
import IsoPlugin, { IsoPhysics } from "./IsoPlugin";
// import IsoPlugin, { IsoPhysics } from "phaser3-plugin-isometric";
import "./CharacterDummy";

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
    this.load.image("characterDummy", "imgs/tiles/tile_base.png");
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
    // this.spawnTiles();
    window.setTimeout(() => {
      this.createDummyCharacter(32, 32);
    }, 3000);
    this.input.on("pointerdown", () => {
      // this.spawnTiles();
      this.createCube(this.cubeSize * this.cubes, 0, 0);
      this.cubes++;
    });
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

  createDummyCharacter(i, j) {
    const characterTile = this.add.characterDummy(
      i,
      j,
      500,
      "characterDummy",
      this.isoGroup
    );
    this.mainCharacter = characterTile;
  }

  createCube(i, j, z) {
    const { width, height } = this.game.config;
    const tile = this.add.isoSprite(i, j, z, "baseTile", this.isoGroup);
    this.isoPhysics.world.enable(tile);
    tile.body.collideWorldBounds = true;
    // tile.body.bounce.set(1, 1, 0.5);
    tile.body.bounce.set(0, 0, 0);
    tile.body.mass = 0;
    tile.body.immovable = true;
    tile.body.gravity = 0;

    // const randomX = Math.trunc(Math.random() * 100 - 50);
    // const randomY = Math.trunc(Math.random() * 100 - 50);
    // tile.body.velocity.setTo(randomX, randomY, 0);

    // tile.setInteractive();
    // tile.on("pointerover", function () {
    //   this.setTint(0xff0000);
    //   // this.isoZ += 38;
    //   this.isoZ += 100;
    // });
    // tile.on("pointerout", function () {
    //   this.clearTint();
    //   this.isoZ -= 38;
    // });
  }
}

export default IsoScene;
