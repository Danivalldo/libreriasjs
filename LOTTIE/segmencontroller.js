class SegmentController {
  constructor(animation) {
    this.animation = animation;
    this.currentSegment = null;
    this.isLooping = false;
    this.direction = "forward";
    this.segments = {
      idle: [0, 45],
      noWatch: [46, 93],
      peek: [94, 132],
      success: [133, 160],
    };
    // Listen for animation complete events
    this.animation.addEventListener("complete", () => {
      this.onSegmentComplete();
    });
  }

  playSegment(segmentName, loop = false, direction = "forward") {
    const segment = this.segments[segmentName];
    if (!segment) {
      console.error("Segment not found:", segmentName);
      return;
    }

    this.currentSegment = segmentName;
    this.isLooping = loop;
    this.direction = direction;

    this.animation.stop();

    this.animation.setDirection(direction === "backward" ? -1 : 1);

    if (direction === "backward") {
      this.animation.goToAndStop(segment[1], true);
      this.animation.playSegments([segment[1], segment[0]], true);
    } else {
      this.animation.playSegments(segment, true);
    }
  }

  onSegmentComplete() {
    if (this.isLooping && this.currentSegment) {
      const segment = this.segments[this.currentSegment];
      this.animation.setDirection(this.direction === "backward" ? -1 : 1);
      if (this.direction === "backward") {
        this.animation.goToAndStop(segment[1], true);
        this.animation.playSegments([segment[1], segment[0]], true);
      } else {
        this.animation.playSegments(segment, true);
      }
    }
  }

  stopLooping() {
    this.isLooping = false;
  }

  toggleDirection() {
    this.direction = this.direction === "forward" ? "backward" : "forward";
    if (this.currentSegment) {
      this.playSegment(this.currentSegment, this.isLooping, this.direction);
    }
  }

  playSegmentBackward(segmentName, loop = false) {
    this.playSegment(segmentName, loop, "backward");
  }

  playSegmentForward(segmentName, loop = false) {
    this.playSegment(segmentName, loop, "forward");
  }

  getAvailableSegments() {
    return Object.keys(this.segments);
  }
}
export default SegmentController;
