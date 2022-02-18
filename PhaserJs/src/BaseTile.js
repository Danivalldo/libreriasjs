import Phaser from "phaser";
import IsoSprite from "phaser3-plugin-isometric/src/IsoSprite";

class BaseTile extends IsoSprite {
  constructor(scene, x, y, z, key, data) {
    super(scene, x, y, z, key, 0);
    this.data = {
      ...data,
      destroy: () => {},
    };
    this.addEvents();
    this.applyPhysics();
    if (data.id) {
      this.id = data.id;
    }
    if (data.tint) {
      this.setTint(data.tint);
    }
    if (typeof data.alpha === "number") {
      this.setAlpha(data.alpha);
    }
  }

  applyPhysics() {
    this.scene.isoPhysics.world.enable(this);
    this.body.immovable = true;
    this.body.allowGravity = false;
    // this.body.bounce.set(0, 0, 0);
    // this.body.mass = 1;
    // this.body.moves = false;
    // this.body.gravity = 0;
  }

  enablePhysics(reset) {
    this.body.enable = true;
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
    this.scene.tilesGroup.remove(this, true, true);
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "baseTile",
  function (x, y, z, key, group, data) {
    const sprite = new BaseTile(this.scene, x, y, z, key, data);
    if (typeof group === "undefined") {
      this.displayList.add(sprite);
      this.updateList.add(sprite);
    } else {
      group.add(sprite, true);
    }

    return sprite;
  }
);

export default BaseTile;
