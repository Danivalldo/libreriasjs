class RainDrop {
  constructor(s) {
    this.s = s;
    this.position;
    this.acceleration;
    this.velocity;
    this.deadAtTop;
    this.reset();
  }
  reset() {
    const s = this.s;

    this.lifespan = 255;
    this.position = s.createVector(s.random(s.width), s.height / 2);
    this.acceleration = s.createVector(0, s.random(-0.5, 0.5));
    this.velocity = s.createVector(0, s.random(-0.3, 0.3));
    this.deadAtTop = s.random(s.height - s.height / 5, s.height);
    this.deadAtBottom = s.random(0, s.height / 5);
    this.color = "#fff";
  }
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }
  isDead() {
    return (
      this.position.y > this.deadAtTop || this.position.y < this.deadAtBottom
    );
  }
  run() {
    this.update();
    this.display();
  }
  display() {
    this.s.fill(this.color);
    this.s.ellipse(
      this.position.x,
      Math.abs(this.position.y),
      1,
      Math.abs(this.velocity.y) + 5
    );
  }
}

export default RainDrop;
