// Drawing with text from https://codepen.io/tholman/pen/DByKvO created by Tim Holman. Ported from Generative Design book - http://www.generative-gestaltung.de - Original licence: http://www.apache.org/licenses/LICENSE-2.0

// Application variables

class TextDrawerService {
  constructor() {
    this.position = { x: 0, y: window.innerHeight / 2 };
    this.counter = 0;
    this.minFontSize = 3;
    this.letters = "";
    this.canvas;
    this.context;
    this.mouse = { x: 0, y: 0, down: false };
    this._mouseMove = this.mouseMove.bind(this);
    this._mouseDown = this.mouseDown.bind(this);
    this._mouseUp = this.mouseUp.bind(this);
    this._mouseUp = this.mouseUp.bind(this);
    this._doubleClick = this.doubleClick.bind(this);
  }

  init() {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.canvas.addEventListener("mousemove", this._mouseMove, false);
    this.canvas.addEventListener("mousedown", this._mouseDown, false);
    this.canvas.addEventListener("mouseup", this._mouseUp, false);
    this.canvas.addEventListener("mouseout", this._mouseUp, false);
    this.canvas.addEventListener("dblclick", this._doubleClick, false);

    window.onresize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
  }

  mouseMove(event) {
    this.mouse.x = event.pageX;
    this.mouse.y = event.pageY;
    this.draw();
  }

  draw() {
    if (this.mouse.down) {
      const d = this.distance(this.position, this.mouse);
      const fontSize = this.minFontSize + d / 2;
      const letter = this.letters[this.counter];
      const stepSize = textWidth(letter, fontSize);

      if (d > stepSize) {
        const angle = Math.atan2(
          this.mouse.y - this.position.y,
          this.mouse.x - this.position.x
        );

        this.context.font = fontSize + "px Georgia";

        this.context.save();
        this.context.translate(this.position.x, this.position.y);
        this.context.rotate(angle);
        this.context.fillText(letter, 0, 0);
        this.context.restore();

        this.counter++;
        if (this.counter > this.letters.length - 1) {
          this.counter = 0;
        }

        this.position.x = this.position.x + Math.cos(angle) * stepSize;
        this.position.y = this.position.y + Math.sin(angle) * stepSize;
      }
    }
  }

  distance(pt, pt2) {
    let xs = 0;
    let ys = 0;

    xs = pt2.x - pt.x;
    xs = xs * xs;

    ys = pt2.y - pt.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
  }

  mouseDown(event) {
    this.mouse.down = true;
    this.position.x = event.pageX;
    this.position.y = event.pageY;
  }

  mouseUp() {
    this.mouse.down = false;
  }

  doubleClick() {
    this.canvas.width = this.canvas.width;
  }

  textWidth(string, size) {
    this.context.font = size + "px Georgia";

    if (this.context.fillText) {
      return this.context.measureText(string).width;
    }

    if (this.context.mozDrawText) {
      return this.context.mozMeasureText(string);
    }
  }
}

export default TextDrawerService;
