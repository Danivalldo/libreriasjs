import Phaser from "phaser";
import IsoSprite from "phaser3-plugin-isometric/src/IsoSprite";

class Player extends IsoSprite {
  constructor(scene, x, y, z, key, frame) {
    super(scene, x, y, z, key, frame);
    this.jumping = false;
    this.applyPhysics();
    this.addEvents();
  }

  applyPhysics() {
    this.scene.isoPhysics.world.enable(this);
    this.body.onWorldBounds = true;
    this.body.bounce.set(0, 0, 0);
    this.body.mass = 1;
    this.accelerationFactor = 1300;
    this.fricctionFactor = 0.08;
    this.maxVelocity = 500;
  }

  update() {
    this.applyVelocityLimit();
    this.applyFriction();
    if (this.isoZ < -200) {
      this.scene.gameOver();
    }
  }

  postUpdate() {
    this.applyFriction();
    if (this.jumping && this.body.touching.up) {
      this.jumping = false;
      this.anims.play("idle", true);
    }
  }

  respawn() {
    this.body.velocity.setTo(0, 0, 0);
    this.body.position.setTo(0, this.scene.cubeSize * 5, 500);
    this.body.acceleration.setTo(0, 0, 0);
  }

  applyVelocityLimit() {
    if (!this.body) {
      return;
    }
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
    if (!this.body) {
      return;
    }
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

    this.scene.events.on("postupdate", () => {
      this.postUpdate();
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
      if (!this.body.touching.up) {
        return;
      }
      this.jumping = true;
      this.body.velocity.setTo(this.body.velocity.x, this.body.velocity.y, 300);
      this.anims.play("jump", true);
    });

    leftKey.on("down", (key) => {
      if (Math.abs(this.body.velocity.x) > this.maxVelocity) {
        return;
      }
      this.flipX = true;
      this.body.acceleration.setTo(
        this.body.acceleration.x,
        this.accelerationFactor,
        this.body.acceleration.z
      );
      this.anims.play("walk", true);
    });

    leftKey.on("up", (key) => {
      this.body.acceleration.setTo(
        this.body.acceleration.x,
        0,
        this.body.acceleration.z
      );
      this.anims.play("idle", true);
    });

    rightKey.on("down", (key) => {
      this.flipX = false;
      this.body.acceleration.setTo(
        this.body.acceleration.x,
        -this.accelerationFactor,
        this.body.acceleration.z
      );
      this.anims.play("walk", true);
    });

    rightKey.on("up", (key) => {
      this.body.acceleration.setTo(
        this.body.acceleration.x,
        0,
        this.body.acceleration.z
      );
      this.anims.play("idle", true);
    });

    downKey.on("down", (key) => {
      this.flipX = false;
      this.body.acceleration.setTo(
        this.accelerationFactor,
        this.body.acceleration.y,
        this.body.acceleration.z
      );
      this.anims.play("walk", true);
    });

    downKey.on("up", (key) => {
      this.body.acceleration.setTo(
        0,
        this.body.acceleration.y,
        this.body.acceleration.z
      );
      this.anims.play("idle", true);
    });

    upKey.on("down", (key) => {
      this.flipX = true;
      this.body.acceleration.setTo(
        -this.accelerationFactor,
        this.body.acceleration.y,
        this.body.acceleration.z
      );
      this.anims.play("walk", true);
    });

    upKey.on("up", (key) => {
      this.body.acceleration.setTo(
        0,
        this.body.acceleration.y,
        this.body.acceleration.z
      );
      this.anims.play("idle", true);
    });
  }

  removeEvents() {
    this.scene.events.off("update");
    this.scene.events.off("postupdate");
  }

  delete() {
    this.removeEvents();
    this.destroy();
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "player",
  function (x, y, z, key, group, frame = 0) {
    const sprite = new Player(this.scene, x, y, z, key, frame);
    if (typeof group === "undefined") {
      this.displayList.add(sprite);
      this.updateList.add(sprite);
    } else {
      group.add(sprite, true);
    }

    return sprite;
  }
);

export default Player;
