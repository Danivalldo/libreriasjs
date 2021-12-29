import IsoSprite from "phaser3-plugin-isometric/src/IsoSprite";
// import IsoSprite from "./IsoPlugin/IsoSprite";

class Item extends IsoSprite {
  constructor(scene, x, y, z, key, data) {
    super(scene, x, y, z, key, 0);
    this.data = { ...data, destroy: () => {} };
    scene.isoPhysics.world.enable(this);
    // if (data.id) {
    //   this.id = data.id;
    // }
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
        break;
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

export default Item;
