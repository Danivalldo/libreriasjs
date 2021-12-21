import "./SCSS/index.scss";

import { Droppable } from "@shopify/draggable";

const launch = () => {
  const containers = document.querySelectorAll("#chess-board");

  if (containers.length === 0) {
    return false;
  }

  const droppable = new Droppable(containers, {
    draggable: ".Block--isDraggable",
    dropzone: ".BlockWrapper--isDropzone",
    mirror: {
      constrainDimensions: true,
    },
  });

  droppable.on("drag:start", (evt) => {
    console.log("start draggin");
  });

  droppable.on("droppable:dropped", (evt) => {
    console.log(evt);
  });
};

launch();
