import { Scene } from "phaser";

class UILayer extends Scene {
  constructor() {
    const sceneConfig = {
      key: "UIScene",
      active: true,
    };
    super(sceneConfig);
    this.coins = 0;
  }

  preload() {
    this.load.image("coin", "imgs/items/coin.png");
    this.load.image("star", "imgs/items/star.png");
  }

  create() {
    console.log("create UI LAYER");
    const info = this.add.text(75, 37, "x0", {
      font: "30px Helvetica",
      fill: "#41737a",
    });
    this.add.image(50, 50, "coin");

    const game = this.scene.get("IsoScene");

    game.events.on(
      "addCoin",
      function () {
        this.coins += 1;

        info.setText(`x${this.coins}`);
      },
      this
    );
  }
}

export default UILayer;
