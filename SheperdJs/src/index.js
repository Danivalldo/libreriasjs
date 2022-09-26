import "./SASS/index.sass";
import Shepherd from "shepherd.js";

const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    classes: "shadow-md bg-purple-dark",
    scrollTo: true,
  },
});

tour.addSteps([
  {
    id: "step-1",
    text: "This step is attached to the bottom of the <code>.example-css-selector</code> element.",
    attachTo: {
      element: ".menu",
      on: "right",
    },
    buttons: [
      {
        text: "Next",
        action: tour.next,
      },
      {
        text: "More info",
        action: () => {
          alert("cosas!");
        },
      },
    ],
  },
  {
    id: "step-2",
    text: "This is the second step",
    attachTo: {
      element: ".take-screenshot-card",
      on: "bottom",
    },
    buttons: [
      {
        text: "Next",
        action: tour.next,
      },
      {
        text: "Prev",
        action: tour.back,
      },
    ],
  },
]);

window.addEventListener("load", () => {
  tour.start();
});
