class Ripple {
  constructor(s) {
    this.s = s;
    this.lifespan = -1;
    this.radius = {
      x: 0,
      y: 0,
    };
    this.radiusVelocity = s.createVector(10, 5);
    this.position = s.createVector(0, 0);
  }
  reset(postion) {
    const s = this.s;

    this.lifespan = 100;
    this.position = postion.copy();
    this.radiusVelocity = s.createVector(10, 5);
    this.radius = {
      x: 0,
      y: 0,
    };
  }
  update() {
    this.radius.x += this.radiusVelocity.x;
    this.radius.y += this.radiusVelocity.y;
    this.radiusVelocity.x =
      this.radiusVelocity.x - this.radiusVelocity.x * 0.05;
    this.radiusVelocity.y =
      this.radiusVelocity.y - this.radiusVelocity.y * 0.05;
    this.lifespan -= 2;
  }
  isDead() {
    return this.lifespan < 0;
  }
  run() {
    this.update();
    this.display();
  }
  display() {
    this.s.stroke(255, this.lifespan);
    this.s.strokeWeight(2);
    this.s.fill(0, 0);
    this.s.ellipse(
      this.position.x,
      this.position.y,
      this.radius.x,
      this.radius.y
    );
  }
}

export default Ripple;
