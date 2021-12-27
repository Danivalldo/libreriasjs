import { Scene } from "phaser";
import Loader from "./Loader";
import level from "./data/level.json";
import items from "./data/items.json";

class IsoScene extends Scene {
  constructor() {
    const sceneConfig = {
      key: "IsoScene",
      mapAdd: { isoPlugin: "iso", isoPhysics: "isoPhysics" },
    };
    super(sceneConfig);
    this.loader = new Loader(this);
    this.player = undefined;
    this.cubes = 0;
    this.cubeSize = 40;
  }
  preload() {
    this.loader.loadAssets();
  }

  create() {
    this.isoGroup = this.add.group();
    this.itemsGroup = this.add.group();
    this.isoPhysics.world.gravity.setTo(0, 0, -1000);
    this.isoPhysics.projector.origin.setTo(0.5, 0.5);
    this.iso.projector.origin.setTo(0.5, 0.5);
    this.createLevel(level);
    this.createItems(items);
    this.createAnimations();
    this.createCharacter(0, this.cubeSize * 5);
    console.log(this.isoPhysics);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBackgroundColor("#d7f3f6");
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
        const tileData = levelRow[n];
        const tile = this.add.baseTile(
          tileData.pos[0] * this.cubeSize,
          tileData.pos[1] * this.cubeSize,
          i * this.cubeSize,
          tileData.type,
          this.isoGroup,
          tileData
        );
      }
    }
  }

  createItems(items) {
    for (let i = 0, j = items.length; i < j; i++) {
      const itemsRow = items[i];
      for (let n = 0, m = itemsRow.length; n < m; n++) {
        const item = itemsRow[n];
        this.add.item(
          item.pos[0] * this.cubeSize,
          item.pos[1] * this.cubeSize,
          i * this.cubeSize + 10,
          item.type,
          this.itemsGroup
        );
      }
    }
  }

  update() {
    if (!this.player) {
      return;
    }
    this.isoPhysics.world.collide(this.player, this.isoGroup, (player) => {
      if (player.body.touching.up) {
        // player.anims.play("idle", true);
      }
    });
    this.isoPhysics.world.collide(this.itemsGroup, this.isoGroup);
    this.isoPhysics.world.collide(
      this.itemsGroup,
      this.player,
      (player, item) => {
        item.delete();
        console.log(this.isoGroup);
        this.isoGroup.children.set(
          this.isoGroup.children.getArray().map((child) => {
            if (child.data && child.data.noCollide) {
              child.data.noCollide = false;
              child.enablePhysics();
            }
            return child;
          })
        );
      }
    );
    this.player.applyFriction();
  }

  createCharacter(i, j) {
    const characterTile = this.add.character(i, j, 500, "character");
    this.player = characterTile;
  }

  gameOver() {
    alert("Game Over");
  }
}

export default IsoScene;
