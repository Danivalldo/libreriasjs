import IsoSprite from "phaser3-plugin-isometric/src/IsoSprite";

class Item extends IsoSprite {
  constructor(scene, x, y, z, key, frame) {
    super(scene, x, y, z, key, frame);
    scene.isoPhysics.world.enable(this);
    this.body.collideWorldBounds = true;
  }
}

export default Item;
