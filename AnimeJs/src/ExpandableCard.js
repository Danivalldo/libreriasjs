//https://codepen.io/tt9/pen/NeZmwO?editors=1010

import anime from "animejs";

const duration = 250;
const leaveDuration = 250;

class ExpandableCard {
  constructor(node) {
    this.backdropEl = document.createElement("div");
    this.backdropEl.className = "expanding-card--backdrop";
    this.backdropEl.addEventListener("click", () => {
      this.collapse();
    });
    this.hostEl = node;
    this.initialHeight = 0;
    this.placeholderEl = document.createElement("div");
    this.placeholderEl.className = "expanding-card--placeholder";
    this.hostEl.appendChild(this.placeholderEl);
    this.cardContentEl = node.querySelector("[cardContent]");
    this.collapsedContentEl = node.querySelector("[collapsedContent]");
    this.expandedContentEl = node.querySelector("[expandedContent]");
    this.expanded = false;
    this.animatingFlag = false;
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
    const expandedContentHeight = this.staticHeight(this.expandedContentEl);
    // const toHeight = fromHeight + expandedContentHeight - 24;
    const toHeight = window.innerHeight - 32;

    const targetBoundingRect = {
      left: 16,
      top: 16,
      width: window.innerWidth - 32,
      height: toHeight,
    };
    const promises = [
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
        delay: 100,
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
      this.animating = false;
      this.expanded = true;
    });
  }

  collapse() {
    if (!this.expanded || this.animating) {
      return;
    }
    this.animating = true;

    const placeholderRect = this.placeholderEl.getBoundingClientRect();
    const cardContentRect = this.cardContentEl.getBoundingClientRect();
    const expandedContentHeight = this.expandedContentEl.offsetHeight;
    // const fromHeight = cardContentRect.height;
    const fromHeight = window.innerHeight - 32;
    // const toHeight = fromHeight - expandedContentHeight;
    const toHeight = this.initialHeight;
    const promises = [
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
    });
  }

  staticHeight(node) {
    const height = node.offsetHeight;
    node.style.height = `${height}px`;
    return height;
  }
}

export default ExpandableCard;
