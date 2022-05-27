import { Application, Graphics, RenderTexture, Sprite } from "pixi.js";

class ScratchCardService {
  constructor() {
    this.app = undefined;
    this.stage = undefined;
    this.container = undefined;
    this.brush = undefined;
    this.dragging = false;
    this.renderTexture = undefined;
  }
  launch(container) {
    const containerSize = container.getBoundingClientRect();
    this.app = new Application({
      width: containerSize.width,
      height: containerSize.height,
    });
    this.stage = this.app.stage;
    this.brush = new Graphics();
    this.brush.beginFill(0xffffff);
    this.brush.drawCircle(0, 0, 50);
    this.brush.endFill();
    this.container = container;
    this.container.appendChild(this.app.view);
    this.loadResources();
    this.renderTexture = RenderTexture.create({
      width: this.app.screen.width,
      height: this.app.screen.height,
    });
    this.stage.interactive = true;
    this.stage.on("pointerdown", this.pointerDown.bind(this));
    this.stage.on("pointerup", this.pointerUp.bind(this));
    this.stage.on("pointermove", this.pointerMove.bind(this));
    this.dragging = false;
    this.app.loader.load(this.setup.bind(this));
  }
  loadResources() {
    this.app.loader.add("t1", "textures/bg_grass.jpeg");
    this.app.loader.add("t2", "textures/bg_rotate.jpeg");
  }
  updateImages(frontImage, backImage) {}
  setup(loader, resources) {
    const background = new Sprite(resources.t1.texture);

    this.stage.addChild(background);
    background.width = this.app.screen.width;
    background.height = this.app.screen.height;

    const imageToReveal = new Sprite(resources.t2.texture);
    this.stage.addChild(imageToReveal);
    imageToReveal.width = this.app.screen.width;
    imageToReveal.height = this.app.screen.height;

    const renderTextureSprite = new Sprite(this.renderTexture);
    this.stage.addChild(renderTextureSprite);
    imageToReveal.mask = renderTextureSprite;
  }
  pointerMove(event) {
    if (!event || !this.renderTexture) {
      return;
    }
    if (this.dragging) {
      this.brush.position.copyFrom(event.data.global);
      this.app.renderer.render(this.brush, {
        renderTexture: this.renderTexture,
        clear: false,
        transform: null,
        skipUpdateTransform: false,
      });
    }
  }
  pointerDown(event) {
    this.dragging = true;
    this.pointerMove(event);
  }
  pointerUp(event) {
    this.dragging = false;
  }
}

export default ScratchCardService;
