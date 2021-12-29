import IsoSprite from "phaser3-plugin-isometric/src/IsoSprite";
// import IsoSprite from "./IsoPlugin/IsoSprite";

class BaseTile extends IsoSprite {
  constructor(scene, x, y, z, key, data) {
    super(scene, x, y, z, key, 0);
    this.data = {
      ...data,
      destroy: () => {},
    };
    this.addEvents();
    this.scene.isoPhysics.world.enable(this);
    this.body.immovable = true;
    this.body.moves = false;
    this.body.allowGravity = false;
  }

  enablePhysics(reset) {
    this.body.enable = true;
    this.body.prev = {
      x: 0,
      y: 0,
      z: 0,
    };
    this.body._dx = 0;
    this.body.deltaMax = 0;
    // this.body.bounce.set(0, 0, 0);
    // this.body.mass = 1;
    this.body.immovable = true;
    // this.body.moves = false;
    // this.body.gravity = 0;
    // this.body.allowGravity = false;
    // this.body.scale = 0.2;
  }

  disablePhysics() {
    this.body.enable = false;
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
