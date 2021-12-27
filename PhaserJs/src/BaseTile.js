import IsoSprite from "phaser3-plugin-isometric/src/IsoSprite";

class BaseTile extends IsoSprite {
  constructor(scene, x, y, z, key, frame) {
    super(scene, x, y, z, key, frame);
    scene.isoPhysics.world.enable(this);
    // this.body.collideWorldBounds = true;
    this.body.bounce.set(0, 0, 0);
    this.body.mass = 0;
    this.body.immovable = true;
    this.body.gravity = 0;
    this.body.scale = 0.2;
  }
}

export default BaseTile;
