import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import '@shoelace-style/shoelace/dist/components/range/range.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
// import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

// Set the base path to the folder you copied Shoelace's assets to
// setBasePath('/path/to/shoelace/dist');

import GanttService from "./src/GanttService";
import "./style.css";

const colWidthInput = document.querySelector("#colWidthInput");
const rowHeightInput = document.querySelector("#rowHeightInput");
const hideLabelsInput = document.querySelector("#hideLabelsInput");
const hideArrowsInput = document.querySelector("#hideArrowsInput");

const ganttSrv = new GanttService("#gantt-container", [
  {
    id: "Task 1",
    name: "Task 1",
    start: "2023-04-19",
    end: "2023-04-21",
    progress: 50,
    dependencies: "",
    custom_class: "hidden",
    type: "workOrder",
  },
  {
    id: "Task 2",
    name: "Task 2",
    start: "2023-04-30",
    end: "2023-05-05",
    progress: 50,
    dependencies: "Task 1",
    custom_class: "hidden",
    type: "workOrder",
  },
]);

window.addEventListener('load', () => {
  ganttSrv.updateGantt();
})

colWidthInput.addEventListener("input", (e) => {
  ganttSrv.updateColumnWidth(Number(e.currentTarget.value));
});

rowHeightInput.addEventListener("input", (e) => {
  ganttSrv.updateHeight(Number(e.currentTarget.value));
});

hideLabelsInput.addEventListener("sl-change", (e) => {
  ganttSrv.toggleLabels();
});

hideArrowsInput.addEventListener("sl-change", (e) => {
  ganttSrv.toogleArrows();
});
