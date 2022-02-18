import Phaser from "phaser";
import IsoSprite from "phaser3-plugin-isometric/src/IsoSprite";

class Item extends IsoSprite {
  constructor(scene, x, y, z, key, data) {
    super(scene, x, y, z, key, 0);
    this.data = { ...data, destroy: () => {} };
    scene.isoPhysics.world.enable(this);
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

  onGet() {
    if (!this.data.onGet) {
      return;
    }
    for (let i = 0, j = this.data.onGet.length; i < j; i++) {
      const action = this.data.onGet[i];
      this.handleOnGetAction(action);
    }
  }

  handleOnGetAction(action) {
    switch (action.action) {
      case "delete":
        const target = action.target;
        if (target === "self") {
          this.delete();
          return;
        }
        this.scene.children.getChildren().forEach((child) => {
          if (child.data && child.data.id === target) {
            child.delete();
          }
        });
        return;
      case "add_coin":
        this.scene.events.emit("addCoin");
        return;
      case "play_sound":
        this.scene.soundsCtrl.play(action.sound);
        return;
      default:
        return;
    }
  }

  delete() {
    this.scene.isoPhysics.world.bodies.entries =
      this.scene.isoPhysics.world.bodies.entries.filter((body) => {
        return body !== this.body;
      });
    this.scene.isoPhysics.world.bodies.length =
      this.scene.isoPhysics.world.bodies.entries.length;
    this.scene.itemsGroup.remove(this, true, true);
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "item",
  function (x, y, z, key, group, data) {
    const sprite = new Item(this.scene, x, y, z, key, data);
    if (typeof group === "undefined") {
      this.displayList.add(sprite);
      this.updateList.add(sprite);
    } else {
      group.add(sprite, true);
    }

    return sprite;
  }
);

export default Item;
