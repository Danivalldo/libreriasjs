import Phaser from "phaser";
// import IsoSprite from "./IsoPlugin/IsoSprite";
import IsoSprite from "phaser3-plugin-isometric/src/IsoSprite";

Phaser.GameObjects.GameObjectFactory.register(
  "characterDummy",
  function (x, y, z, key, group, frame = 0) {
    const sprite = new CharacterDummy(this.scene, x, y, z, key, frame);
    // sprite.setTint(0xff0000);
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
    this.body.bounce.set(0, 0, 0.2);
    this.body.mass = 0.3;
    this.accelerationFactor = 2000;
    this.fricctionFactor = 0.08;
    this.maxVelocity = 500;
    this.addEvents();
    this.customTouchingFloor = false;
  }

  update() {
    // console.log(this.body.velocity.x, this.body.velocity.y);
    this.applyVelocityLimit();
    this.applyFriction();
  }

  applyVelocityLimit() {
    if (Math.abs(this.body.velocity.x) > this.maxVelocity) {
      this.body.velocity.x = Math.round(
        Math.sign(this.body.velocity.x) * this.maxVelocity
      );
    }
    if (Math.abs(this.body.velocity.y) > this.maxVelocity) {
      this.body.velocity.y = Math.round(
        Math.sign(this.body.velocity.y) * this.maxVelocity
      );
    }
  }

  applyFriction() {
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      return;
    }
    let velX =
      this.body.velocity.x - this.body.velocity.x * this.fricctionFactor;
    let velY =
      this.body.velocity.y - this.body.velocity.y * this.fricctionFactor;
    velX = Math.abs(velX) < 0.5 ? 0 : velX;
    velY = Math.abs(velY) < 0.5 ? 0 : velY;
    this.body.velocity.setTo(velX, velY, this.body.velocity.z);
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
    });

    leftKey.on("down", (key) => {
      if (Math.abs(this.body.velocity.x) > this.maxVelocity) {
        return;
      }
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
      if (Math.abs(this.body.velocity.y) > this.maxVelocity) {
        return;
      }
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

  setCustomTouchingFloor(touching = false) {
    this.customTouchingFloor = touching;
  }
}

export default CharacterDummy;
