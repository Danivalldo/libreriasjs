import Phaser from "phaser";
import IsoSprite from "./IsoPlugin/IsoSprite";

Phaser.GameObjects.GameObjectFactory.register(
  "characterDummy",
  function (x, y, z, key, group, frame = 0) {
    const sprite = new CharacterDummy(this.scene, x, y, z, key, frame);
    sprite.setTint(0xff0000);
    if (typeof group === "undefined") {
      this.displayList.add(sprite);
      this.updateList.add(sprite);
    } else {
      group.add(sprite, true);
    }

    return sprite;
  }
);

class CharacterDummy extends IsoSprite {
  constructor(scene, x, y, z, key, frame) {
    super(scene, x, y, z, key, frame);
    scene.isoPhysics.world.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(0, 0, 0.5);
    this.body.mass = 0.3;
    this.addEvents();
  }

  addEvents() {
    const spaceBar = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    const leftKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    const rightKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    spaceBar.on("down", (key) => {
      if (!this.body.touching.up) {
        return;
      }
      this.body.velocity.setTo(this.body.velocity.x, this.body.velocity.y, 300);
    });
    // spaceBar.on("up", (key) => {

    // });
    leftKey.on("down", (key) => {
      // this.body.velocity.setTo(this.body.velocity.x, 300, this.body.velocity.z);
      this.body.velocity.set(null, 100);
    });
    leftKey.on("up", (key) => {
      // this.body.velocity.setTo(this.body.velocity.x, 300, this.body.velocity.z);
      this.body.velocity.set(null, 0);
    });
    rightKey.on("down", (key) => {
      // this.body.velocity.setTo(this.body.velocity.x, 300, this.body.velocity.z);
      this.body.velocity.set(100, -100);
    });
    rightKey.on("up", (key) => {
      // this.body.velocity.setTo(this.body.velocity.x, 300, this.body.velocity.z);
      this.body.velocity.set(0, 0);
    });
  }
}

export default CharacterDummy;
