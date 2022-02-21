import { Scene } from "phaser";
import level from "./data/level1.json";

class UILayer extends Scene {
  constructor() {
    const sceneConfig = {
      key: "UIScene",
      active: true,
    };
    super(sceneConfig);
    this.coins = 0;
    this.infoCoins = undefined;
    this.musicBtn = undefined;
  }

  preload() {
    this.load.image("uiCoin", "imgs/items/coin.png");
    this.load.image("uiStar", "imgs/items/star.png");
    this.load.image("uiMusicOn", "imgs/ui/audioOn.png");
    this.load.image("uiMusicOff", "imgs/ui/audioOff.png");
  }

  updateText(newText) {
    if (!this.infoCoins) {
      return;
    }
    this.infoCoins.setText(newText);
  }

  switchMusic() {
    if (this.musicBtn.texture.key == "uiMusicOn") {
      this.musicBtn.setTexture("uiMusicOff");
      this.scene.get("IsoScene").soundsCtrl.stopSoundTrack();
    } else {
      this.musicBtn.setTexture("uiMusicOn");
      this.scene.get("IsoScene").soundsCtrl.playSoundTrack();
    }
  }

  create() {
    const { configuration } = level;
    this.infoCoins = this.add.text(75, 37, "x0", {
      font: "30px Helvetica",
      fill: "#41737a",
    });
    this.add.image(50, 50, "uiCoin");
    this.musicBtn = this.add
      .image(50, 100, configuration.playSoundTrack ? "uiMusicOn" : "uiMusicOff")
      .setInteractive();
    this.musicBtn.on("pointerup", () => {
      this.switchMusic();
    });

    const game = this.scene.get("IsoScene");

    game.events.on("addCoin", () => {
      this.coins += 1;
      this.updateText(`x${this.coins}`);
    });

    game.events.on("gameOver", () => {
      // this.coins = 0;
      // this.updateText(`x0`);
      // this.musicBtn = this.add.image(
      //   50,
      //   100,
      //   configuration.playSoundTrack ? "uiMusicOn" : "uiMusicOff"
      // );
      this.scene.restart();
    });
  }
}

export default UILayer;
