import "@dile/dile-menu-overlay/dile-menu-overlay";
import GanttService from "./src/GanttService";
import "./style.css";

const colWidthInput = document.querySelector("#colWidthInput");
const rowHeightInput = document.querySelector("#rowHeightInput");
const hideLabelsInput = document.querySelector("#hideLabelsInput");
const hideArrowsInput = document.querySelector("#hideArrowsInput");

const ganttSrv = new GanttService("#planner-container", [
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

colWidthInput.addEventListener("input", (e) => {
  ganttSrv.updateColumnWidth(Number(e.currentTarget.value));
});

rowHeightInput.addEventListener("input", (e) => {
  ganttSrv.updateHeight(Number(e.currentTarget.value));
});

hideLabelsInput.addEventListener("change", (e) => {
  ganttSrv.toggleLabels();
});

hideArrowsInput.addEventListener("change", (e) => {
  ganttSrv.toogleArrows();
});
