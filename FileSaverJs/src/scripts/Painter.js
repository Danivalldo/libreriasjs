class Painter {
  constructor(canvasContainer, brushProps = {}) {
    this.container = canvasContainer;
    this.isPointerDown = false;
    this.prevPos = {
      x: 0,
      y: 0,
    };
    this.brushProps = {
      lineWidth: brushProps.lineWidth || 10,
      color: brushProps.color || "#5B48D9",
    };
    this.canvas = document.createElement("canvas");
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resizeCanvas();
    this.addListeners();
  }

  addListeners() {
    this.canvas.addEventListener("pointerdown", this.onPointerDown.bind(this));
    this.canvas.addEventListener("pointerup", this.onPointerUp.bind(this));
    this.canvas.addEventListener("pointermove", this.onPointerMove.bind(this));
    window.addEventListener("resize", () => {
      this.resizeCanvas();
    });
  }

  resizeCanvas() {
    this.containerSize = this.container.getBoundingClientRect();
    this.canvas.width = this.containerSize.width;
    this.canvas.height = this.containerSize.height;
    this.ctx.fillStyle = "#FFF";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateBrush();
  }

  updateBrush(color, lineWidth) {
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.strokeStyle = color || this.brushProps.color;
    this.ctx.lineWidth = lineWidth || this.brushProps.lineWidth;
    this.brushProps = {
      color: this.ctx.strokeStyle,
      lineWidth: this.ctx.lineWidth,
    };
  }

  getCanvas() {
    return this.canvas;
  }

  onPointerDown(e) {
    this.isPointerDown = true;
    this.ctx.beginPath();
    this.prevPos.x = e.clientX - this.containerSize.x;
    this.prevPos.y = e.clientY - this.containerSize.y;
  }
  onPointerUp(e) {
    this.isPointerDown = false;
  }
  onPointerMove(e) {
    e.preventDefault();
    if (!this.isPointerDown) {
      return;
    }
    this.ctx.moveTo(this.prevPos.x, this.prevPos.y);
    this.ctx.lineTo(e.clientX, e.clientY - this.containerSize.y);
    this.ctx.stroke();
    this.prevPos.x = e.clientX - this.containerSize.x;
    this.prevPos.y = e.clientY - this.containerSize.y;
  }
}

export default Painter;
