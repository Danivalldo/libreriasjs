import IsoSprite from "phaser3-plugin-isometric/src/IsoSprite";

class Item extends IsoSprite {
  constructor(scene, x, y, z, key, frame, data) {
    super(scene, x, y, z, key, frame);
    this.data = data;
    scene.isoPhysics.world.enable(this);
  }
  delete() {
    console.log("removed");
    this.scene.isoPhysics.world.bodies.entries =
      this.scene.isoPhysics.world.bodies.entries.filter((body) => {
        return body !== this.body;
      });
    this.scene.isoPhysics.world.bodies.length =
      this.scene.isoPhysics.world.bodies.entries.length;
    this.scene.itemsGroup.remove(this, true, true);
  }
}

export default Item;
