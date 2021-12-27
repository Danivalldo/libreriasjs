import IsoSprite from "phaser3-plugin-isometric/src/IsoSprite";

class BaseTile extends IsoSprite {
  constructor(scene, x, y, z, key, data) {
    super(scene, x, y, z, key, 0);
    this.data = data;
    const { noCollide } = data;
    if (!noCollide) {
      this.enablePhysics();
    }
  }

  enablePhysics() {
    this.scene.isoPhysics.world.enable(this);
    this.body.bounce.set(0, 0, 0);
    this.body.mass = 1;
    this.body.immovable = true;
    this.body.gravity = 0;
    this.body.allowGravity = false;
    this.body.scale = 0.2;
    console.log(this);
  }

  disablePhysics() {
    this.scene.isoPhysics.world.bodies.entries =
      this.scene.isoPhysics.world.bodies.entries.filter((body) => {
        return body !== this.body;
      });
    this.scene.isoPhysics.world.bodies.length =
      this.scene.isoPhysics.world.bodies.entries.length;
  }

  delete() {
    this.disablePhysics();
    this.scene.itemsGroup.remove(this, true, true);
  }
}

export default BaseTile;
