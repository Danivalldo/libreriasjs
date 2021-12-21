class RainDrop {
  constructor(s) {
    this.s = s; //instance of p5 sketch
    this.position;
    this.acceleration;
    this.velocity;
    this.deadAtTop;
    this.deadAtBottom;
    this.color;
    this.reset();
  }
  reset() {
    const s = this.s;

    this.position = s.createVector(s.random(s.width), s.height / 2);
    this.acceleration = s.createVector(0, s.random(-0.5, 0.5));
    this.velocity = s.createVector(0, s.random(-0.3, 0.3));
    this.deadAtBottom = s.random(s.height - s.height / 5, s.height);
    this.deadAtTop = s.random(0, s.height / 5);
    this.color = "#fff";
  }
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }
  isDead() {
    return (
      this.position.y > this.deadAtBottom || this.position.y < this.deadAtTop
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
      this.position.y,
      1,
      Math.abs(this.velocity.y * 1.5) + 5
    );
  }
}

export default RainDrop;
