import { Donut } from "rough-viz/dist/roughviz.min.js";
import "./SCSS/index.scss";

let donut = new Donut({
  element: "#viz-container",
  data: {
    labels: ["North", "South", "East", "West"],
    values: [10, 5, 8, 3],
  },
  title: "Regions",
  width: window.innerWidth / 2,
  height: window.innerHeight / 2,
  roughness: 8,
  colors: ["red", "orange", "blue", "skyblue"],
  stroke: "black",
  strokeWidth: 1,
  fillStyle: "cross-hatch",
  fillWeight: 0.5,
});
