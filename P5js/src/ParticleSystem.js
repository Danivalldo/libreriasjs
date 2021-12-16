import RainDrop from "./RainDrop";
import Ripple from "./Ripple";

class ParticleSystem {
  constructor(s) {
    this.s = s; //instance of p5 sketch
    this.particles = [];
    this.ripples = [];
  }
  addParticle() {
    this.particles.push(new RainDrop(this.s));
  }
  addRipple() {
    this.ripples.push(new Ripple(this.s));
  }
  fillSystem(num) {
    for (let i = 0; i < num; i++) {
      this.addParticle();
      this.addRipple();
    }
  }
  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].run();
      if (this.particles[i].isDead()) {
        for (let r = this.ripples.length - 1; r >= 0; r--) {
          const ripple = this.ripples[r];
          if (ripple.isDead()) {
            ripple.reset(this.particles[i].position);
            break;
          }
        }
        this.particles[i].reset();
      }
      this.ripples[i].run();
    }
  }
}

export default ParticleSystem;
