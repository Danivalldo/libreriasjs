import Phaser from "phaser";
// import IsoSprite from "./IsoPlugin/IsoSprite";
import IsoSprite from "phaser3-plugin-isometric/src/IsoSprite";

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
    this.accelerationFactor = 500;
    this.addEvents();
  }

  update() {
    this.applyFriction();
  }

  applyFriction() {
    // if (this.body.touching.up) {
    if (this.body.velocity.x > 0) {
      this.body.velocity.x = this.body.velocity.x - 0.5;
    }
    if (this.body.velocity.y > 0) {
      this.body.velocity.y = this.body.velocity.y - 0.5;
    }
    if (this.body.velocity.y < 0) {
      this.body.velocity.y = this.body.velocity.y + 0.5;
    }
    if (this.body.velocity.y < 0) {
      this.body.velocity.y = this.body.velocity.y + 0.5;
    }
    // }
  }

  addEvents() {
    this.scene.events.on("update", () => {
      this.update();
    });

    const spaceBar = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    const leftKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    const rightKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    const upKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );
    const downKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );

    spaceBar.on("down", (key) => {
      // if (!this.body.touching.up) {
      //   return;
      // }
      this.body.velocity.setTo(this.body.velocity.x, this.body.velocity.y, 300);
      // this.body.acceleration.set(null, null, 10);
    });

    leftKey.on("down", (key) => {
      this.body.acceleration.setTo(
        this.body.acceleration.x,
        this.accelerationFactor,
        this.body.acceleration.z
      );
    });
    leftKey.on("up", (key) => {
      this.body.acceleration.setTo(
        this.body.acceleration.x,
        0,
        this.body.acceleration.z
      );
    });
    rightKey.on("down", (key) => {
      this.body.acceleration.setTo(
        this.body.acceleration.x,
        -this.accelerationFactor,
        this.body.acceleration.z
      );
    });
    rightKey.on("up", (key) => {
      this.body.acceleration.setTo(
        this.body.acceleration.x,
        0,
        this.body.acceleration.z
      );
    });

    upKey.on("down", (key) => {
      this.body.acceleration.setTo(
        this.accelerationFactor,
        this.body.acceleration.y,
        this.body.acceleration.z
      );
    });
    upKey.on("up", (key) => {
      this.body.acceleration.setTo(
        0,
        this.body.acceleration.y,
        this.body.acceleration.z
      );
    });
    downKey.on("down", (key) => {
      this.body.acceleration.setTo(
        -this.accelerationFactor,
        this.body.acceleration.y,
        this.body.acceleration.z
      );
    });
    downKey.on("up", (key) => {
      this.body.acceleration.setTo(
        0,
        this.body.acceleration.y,
        this.body.acceleration.z
      );
    });
  }
}

export default CharacterDummy;
