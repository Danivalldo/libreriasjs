import {
  Application,
  Graphics,
  RenderTexture,
  Sprite,
  filters,
  Texture,
} from "pixi.js";

class ScratchCardService {
  constructor() {
    this.app = undefined;
    this.stage = undefined;
    this.container = undefined;
    this.brush = undefined;
    this.dragging = false;
    this.renderTexture = undefined;
    this.background = undefined;
    this.imageToReveal = undefined;
    this.renderTextureSprite = undefined;
    this.listerens = {
      scratchstart: undefined,
      scratchend: undefined,
      scratching: undefined,
    };
    this.handleOnResize = this.onReize.bind(this);
    this.handleOnPointerDown = this.pointerDown.bind(this);
    this.handleOnPointerUp = this.pointerUp.bind(this);
    this.handleOnPointerMove = this.pointerMove.bind(this);
  }
  launch(container, { frontImage, backImage, radius = 50 }) {
    this.container = container;
    const containerSize = this.container.getBoundingClientRect();
    this.app = new Application({
      width: containerSize.width,
      height: containerSize.height,
      resizeTo: container,
    });
    this.stage = this.app.stage;
    this.setBrush(radius);

    this.container.appendChild(this.app.view);
    this.renderTexture = RenderTexture.create({
      width: this.app.screen.width,
      height: this.app.screen.height,
    });
    this.background = new Sprite(Texture.from(backImage));
    this.stage.addChild(this.background);
    this.imageToReveal = new Sprite(Texture.from(frontImage));
    this.stage.addChild(this.imageToReveal);
    this.renderTextureSprite = new Sprite(this.renderTexture);
    this.stage.addChild(this.renderTextureSprite);

    this.onReize();
    this.imageToReveal.mask = this.renderTextureSprite;

    this.stage.interactive = true;
    this.stage.on("pointerdown", this.handleOnPointerDown);
    this.stage.on("pointerup", this.handleOnPointerUp);
    this.stage.on("pointermove", this.handleOnPointerMove);
    window.addEventListener("resize", this.handleOnResize);
  }
  updateImages(frontImage, backImage) {
    this.background.texture = Texture.from(frontImage);
    this.imageToReveal.texture = Texture.from(backImage);
  }
  on(eventKey, cb) {
    if (typeof cb !== "function") {
      return;
    }
    this.listerens[eventKey] = cb;
  }
  setBrush(radius) {
    this.brush = new Graphics();
    this.brush.beginFill(0xffffff);
    this.brush.drawCircle(0, 0, radius);
    this.brush.filters = [new filters.BlurFilter(5)];
    this.brush.endFill();
  }
  pointerMove(event, first) {
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
      if (this.listerens["scratching"] && !first) {
        this.listerens["scratching"](event);
      }
    }
  }
  pointerDown(event) {
    this.dragging = true;
    this.pointerMove(event, true);
    if (this.listerens["scratchstart"]) {
      this.listerens["scratchstart"](event);
    }
  }
  pointerUp(event) {
    this.dragging = false;
    if (this.listerens["scratchend"]) {
      this.listerens["scratchend"](event);
    }
  }
  onReize() {
    this.app.resize();
    this.background.width = this.app.screen.width;
    this.background.height = this.app.screen.height;
    this.imageToReveal.width = this.app.screen.width;
    this.imageToReveal.height = this.app.screen.height;
    this.renderTexture.resize(
      this.app.screen.width,
      this.app.screen.height,
      true
    );
    this.renderTextureSprite.width = this.app.screen.width;
    this.renderTextureSprite.height = this.app.screen.height;
  }
  destroy() {
    window.removeEventListener("resize", this.handleOnResize);
    this.stage.off("pointerdown", this.handleOnPointerDown);
    this.stage.off("pointerup", this.handleOnPointerUp);
    this.stage.off("pointermove", this.handleOnPointerMove);
    this.app.destroy();
    this.app = undefined;
    this.stage = undefined;
    this.container = undefined;
    this.brush = undefined;
    this.dragging = false;
    this.renderTexture = undefined;
    this.background = undefined;
    this.imageToReveal = undefined;
    this.renderTextureSprite = undefined;
    this.listerens = {
      scratchstart: undefined,
      scratchend: undefined,
      scratching: undefined,
    };
  }
}

export default ScratchCardService;
