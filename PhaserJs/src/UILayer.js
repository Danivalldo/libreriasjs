import { Scene } from "phaser";

class UILayer extends Scene {
  constructor() {
    const sceneConfig = {
      key: "UIScene",
      active: true,
    };
    super(sceneConfig);
    this.coins = 0;
    this.infoCoins = undefined;
  }

  preload() {
    this.load.image("uiCoin", "imgs/items/coin.png");
    this.load.image("uiStar", "imgs/items/star.png");
  }

  updateText(newText) {
    if (!this.infoCoins) {
      return;
    }
    this.infoCoins.setText(newText);
  }

  create() {
    this.infoCoins = this.add.text(75, 37, "x0", {
      font: "30px Helvetica",
      fill: "#41737a",
    });
    this.add.image(50, 50, "uiCoin");

    const game = this.scene.get("IsoScene");

    game.events.on("addCoin", () => {
      this.coins += 1;
      this.updateText(`x${this.coins}`);
    });

    game.events.on("gameOver", () => {
      this.coins = 0;
      this.updateText(`x0`);
    });
  }
}

export default UILayer;
