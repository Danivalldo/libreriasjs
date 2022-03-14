//Exercise based on https://codepen.io/tt9/pen/NeZmwO?editors=1010

import anime from "animejs";

let duration = 300;
let leaveDuration = 250;

export const toggleAnimation = () => {
  duration = duration === 0 ? 300 : 0;
  leaveDuration = leaveDuration === 0 ? 250 : 0;
};

class ExpandableCard {
  constructor(node) {
    this.backdropEl = document.createElement("div");
    this.backdropEl.className = "expanding-card--backdrop";
    this.hostEl = node;
    this.placeholderEl = document.createElement("div");
    this.placeholderEl.className = "expanding-card--placeholder";
    this.hostEl.appendChild(this.placeholderEl);
    this.cardContentEl = node.querySelector("[cardContent]");
    this.collapsedContentEl = node.querySelector("[collapsedContent]");
    this.expandedContentEl = node.querySelector("[expandedContent]");

    this.initialHeight = 0;
    this.windowResized = false;
    this.expanded = false;
    this.animatingFlag = false;

    this.backdropEl.addEventListener("click", () => {
      this.collapse();
    });
    this.hostEl.addEventListener("click", () => {
      this.expand();
    });
  }

  expand() {
    if (this.expanded || this.animating) {
      return;
    }
    this.animating = true;

    this.backdropEl.style.position = "fixed";
    this.backdropEl.style.top = "0px";
    this.backdropEl.style.left = "0px";
    this.backdropEl.style.right = "0px";
    this.backdropEl.style.bottom = "0px";
    this.backdropEl.style.opacity = "0";
    this.backdropEl.style.zIndex = 9;

    document.body.appendChild(this.backdropEl);

    const cardBoundingRect = this.cardContentEl.getBoundingClientRect();

    this.placeholderEl.style.height = `${cardBoundingRect.height}px`;
    this.cardContentEl.style.position = "fixed";
    this.cardContentEl.style.zIndex = 10;
    this.cardContentEl.style.top = `${0}px`;
    this.cardContentEl.style.left = `${0}px`;
    this.cardContentEl.style.width = null;
    this.cardContentEl.style.height = null;
    this.cardContentEl.style.transform = `translate(${cardBoundingRect.left}px), ${cardBoundingRect.top}px)`;
    this.expandedContentEl.style.visibility = "visible";

    const fromHeight = this.staticHeight(this.cardContentEl);
    this.initialHeight = fromHeight;
    const toHeight = 300;

    const targetBoundingRect = {
      left: 16,
      top: 16,
      width: window.innerWidth - 32,
      height: toHeight,
    };

    const promises = [
      anime({
        targets: this.cardContentEl.querySelector(".bg-card"),
        opacity: [0, 1],
        duration: duration,
      }).finished,
      anime({
        targets: this.cardContentEl.querySelector(
          ".expandable-card--profile-image"
        ),
        translateX: [0, 0],
        duration: duration,
        scale: [1, 3],
      }).finished,
      anime({
        targets: this.cardContentEl.querySelector(
          ".expandable-card--profile-image img"
        ),
        opacity: [0, 1],
        scale: [1, 0.5],
        duration: duration,
        easing: "easeOutCubic",
      }).finished,
      anime({
        targets: this.cardContentEl.querySelector(
          ".expandable-card--right-col"
        ),
        opacity: [1, 0],
        duration: duration,
        easing: "easeOutCubic",
      }).finished,
      anime({
        targets: this.cardContentEl,
        height: [fromHeight, toHeight],
        width: [cardBoundingRect.width, targetBoundingRect.width],
        translateX: [cardBoundingRect.left, targetBoundingRect.left],
        translateY: [cardBoundingRect.top, targetBoundingRect.top],
        boxShadow:
          "0 0 1px 0 rgba(33,43,54,.08), 0 8px 10px 0 rgba(33,43,54,.2)",
        duration: duration,
        easing: "easeOutCubic",
      }).finished,
      anime({
        targets: this.expandedContentEl,
        translateY: [16, 0],
        opacity: [0, 1],
        delay: 200,
        duration: duration,
        easing: "easeOutCubic",
      }).finished,
      anime({
        targets: this.backdropEl,
        opacity: [0, 0.33],
        duration: duration,
        easing: "easeOutCubic",
      }),
    ];

    return Promise.all(promises).then(() => {
      window.addEventListener("resize", this.handleWindowResize);
      this.animating = false;
      this.expanded = true;
    });
  }

  handleWindowResize() {
    this.windowResized = true;
  }

  collapse() {
    if (!this.expanded || this.animating) {
      return;
    }
    this.animating = true;

    const placeholderRect = this.placeholderEl.getBoundingClientRect();
    const cardContentRect = this.cardContentEl.getBoundingClientRect();
    const expandedContentHeight = this.expandedContentEl.offsetHeight;
    const fromHeight = 300;
    const toHeight = !this.windowResized
      ? this.initialHeight
      : fromHeight - expandedContentHeight;
    const promises = [
      anime({
        targets: this.cardContentEl.querySelector(".bg-card"),
        opacity: [1, 0],
        duration: leaveDuration,
        easing: "easeInQuad",
      }).finished,
      anime({
        targets: this.cardContentEl.querySelector(
          ".expandable-card--profile-image"
        ),
        translateX: [0, 0],
        duration: leaveDuration,
        scale: [3, 1],
        easing: "easeInQuad",
      }).finished,
      anime({
        targets: this.cardContentEl.querySelector(
          ".expandable-card--profile-image img"
        ),
        opacity: [1, 0],
        scale: [0.5, 1],
        duration: leaveDuration,
        easing: "easeInQuad",
      }).finished,
      anime({
        targets: this.cardContentEl.querySelector(
          ".expandable-card--right-col"
        ),
        opacity: [0, 1],
        duration: leaveDuration,
        easing: "easeInQuad",
      }).finished,
      anime({
        targets: this.cardContentEl,
        height: [fromHeight, toHeight],
        translateX: [cardContentRect.left, placeholderRect.left],
        translateY: [cardContentRect.top, placeholderRect.top],
        width: [cardContentRect.width, placeholderRect.width],
        boxShadow: "0 2px 2px 1px rgba(0, 0, 0, 0.1)",
        duration: leaveDuration,
        delay: 0,
        easing: "easeInQuad",
      }).finished,
      anime({
        targets: this.expandedContentEl,
        translateY: [0, 16],
        opacity: [1, 0],
        duration: leaveDuration,
        easing: "easeInQuad",
      }).finished,
      anime({
        targets: this.backdropEl,
        opacity: [0.33, 0],
        duration: leaveDuration,
        easing: "easeInQuad",
      }),
    ];
    return Promise.all(promises).then(() => {
      this.animating = false;
      this.expanded = false;

      this.placeholderEl.style.height = "0px";
      this.cardContentEl.style.position = "relative";
      this.cardContentEl.style.zIndex = null;
      this.cardContentEl.style.top = null;
      this.cardContentEl.style.left = null;
      this.cardContentEl.style.width = null;
      this.cardContentEl.style.height = null;
      this.cardContentEl.style.transform = null;
      this.expandedContentEl.style.visibility = "hidden";
      document.body.removeChild(this.backdropEl);
      this.windowResized = false;
      window.removeEventListener("resize", this.handleWindowResize);
    });
  }

  staticHeight(node) {
    const height = node.offsetHeight;
    node.style.height = `${height}px`;
    return height;
  }
}

export default ExpandableCard;
