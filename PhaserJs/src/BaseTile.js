import IsoSprite from "phaser3-plugin-isometric/src/IsoSprite";

class BaseTile extends IsoSprite {
  constructor(scene, x, y, z, key, data) {
    super(scene, x, y, z, key, 0);
    this.data = {
      ...data,
      destroy: () => {},
    };
    this.addEvents();
    this.enablePhysics();
  }

  enablePhysics(reset) {
    this.scene.isoPhysics.world.enable(this);

    // this.body.bounce.set(0, 0, 0);
    // this.body.mass = 1;
    this.body.moves = false;
    this.body.immovable = true;
    // this.body.gravity = 0;
    this.body.allowGravity = false;
    // this.body.position.setTo(
    //   this.body.position.x,
    //   this.body.position.y,
    //   this.body.position.z
    // );
    // this.body.prev = {
    //   x: this.body.position.x,
    //   y: this.body.position.y,
    //   z: this.body.position.z,
    // };
    // this.body.scale = 0.2;
  }

  disablePhysics() {
    this.scene.isoPhysics.world.bodies.entries =
      this.scene.isoPhysics.world.bodies.entries.filter((body) => {
        return body !== this.body;
      });
    this.scene.isoPhysics.world.bodies.length =
      this.scene.isoPhysics.world.bodies.entries.length;
    this.body = null;
  }

  update() {
    if (this.marked) {
    }
  }

  addEvents() {
    this.scene.events.on("update", () => {
      this.update();
    });
  }

  delete() {
    this.disablePhysics();
    this.scene.isoGroup.remove(this, true, true);
  }
}

export default BaseTile;
