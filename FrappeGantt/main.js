import GanttService from "./src/GanttService";
import "./style.css";

const colWidthInput = document.querySelector("#colWidthInput");
const rowHeightInput = document.querySelector("#rowHeightInput");

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
]);

colWidthInput.addEventListener("input", (e) => {
  ganttSrv.updateColumnWidth(Number(e.currentTarget.value));
});

rowHeightInput.addEventListener("input", (e) => {
  ganttSrv.updateHeight(Number(e.currentTarget.value));
});
