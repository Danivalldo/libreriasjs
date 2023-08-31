import "@shoelace-style/shoelace/dist/themes/light.css";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/split-panel/split-panel.js";
import "@shoelace-style/shoelace/dist/components/range/range.js";
import "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js";
import "@shoelace-style/shoelace/dist/components/checkbox/checkbox.js";
import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";
import "@shoelace-style/shoelace/dist/components/select/select.js";
import "@shoelace-style/shoelace/dist/components/option/option.js";
import Litepicker from "litepicker";
import "litepicker/dist/plugins/mobilefriendly";
import dayjs from "dayjs";
import GanttService from "./src/GanttService";
import { v4 as uuid } from "uuid";

import "./style.css";

const colWidthInput = document.querySelector("#colWidthInput");
const rowHeightInput = document.querySelector("#rowHeightInput");
const hideLabelsInput = document.querySelector("#hideLabelsInput");
const hideArrowsInput = document.querySelector("#hideArrowsInput");
const createTaskBtn = document.querySelector("#create-task-btn");
const dialog = document.querySelector("#dialog");
const keyFilterInput = document.querySelector("#keyFilterInput");
const viewModeSelect = document.querySelector("#select-view-mode");

let tasks = [
  {
    id: "task-1",
    name: "Task 1",
    start: "2023-04-19",
    end: "2023-04-21",
    progress: 50,
    dependencies: "",
    type: "workOrder",
  },
  {
    id: "task-2",
    name: "Task 2",
    start: "2023-04-30",
    end: "2023-05-05",
    progress: 50,
    dependencies: "task-1",
    type: "workOrder",
  },
];

const filters = {
  filterKey: "",
  dateStartFilter: undefined,
  dateEndFilter: undefined,
};

const ganttSrv = new GanttService("#gantt-container", tasks);

ganttSrv.on("clicktask", (taskId) => {
  const task = tasks.find((task) => task.id === taskId);
  dialog.setAttribute("label", `Edit ${task.name}`);
  const dependencySelect = dialog.querySelector(
    'sl-select[name="dependencies"]'
  );
  dependencySelect.value = task.dependencies.concat(" ");
  dialog.querySelector('sl-input[name="name"]').value = task.name;
  dialog.querySelector("#createBtn").classList.add("d-none");
  dialog.querySelector("#updateBtn").classList.remove("d-none");
  dialog.querySelector("#deleteBtn").classList.remove("d-none");
  dialog.querySelector("form").setAttribute("data-task-id", taskId);
  dialog.show();
});

ganttSrv.on("changeprogress", (taskId, progress) => {});

ganttSrv.on("changedate", () => {
  debugger;
});

const picker = new Litepicker({
  plugins: ["mobilefriendly"],
  element: document.getElementById("date-filters-input"),
  resetButton: true,
  singleMode: false,
});

const applyFilters = () => {
  const dStartFilter = dayjs(filters.dateStartFilter);
  const dEndFilter = dayjs(filters.dateEndFilter);
  return tasks
    .filter((task) => task.name.includes(filters.filterKey))
    .filter((task) => {
      if (!filters.dateStartFilter || !filters.dateStartFilter) return true;
      const dStartTask = dayjs(task.start);
      const dEndTask = dayjs(task.end);
      return dStartFilter.isBefore(dEndTask) && dEndFilter.isAfter(dStartTask);
    });
};

const updateSelectDependencies = () => {
  const dependencySelect = dialog.querySelector(
    'sl-select[name="dependencies"]'
  );
  dependencySelect.innerHTML = "";
  for (let i = 0, j = tasks.length; i < j; i++) {
    const task = tasks[i];
    const option = document.createElement("sl-option");
    option.setAttribute("value", task.id);
    option.innerHTML = task.name;
    dependencySelect.appendChild(option);
  }
};

picker.on("selected", (date1, date2) => {
  filters.dateStartFilter = date1.dateInstance;
  filters.dateEndFilter = date2.dateInstance;
  ganttSrv.updateTasks(applyFilters());
});

picker.on("clear:selection", () => {
  filters.dateStartFilter = undefined;
  filters.dateEndFilter = undefined;
  ganttSrv.updateTasks(applyFilters());
});

keyFilterInput.addEventListener("sl-input", (e) => {
  filters.filterKey = e.target.value;
  ganttSrv.updateTasks(applyFilters());
});

window.addEventListener("load", () => {
  ganttSrv.updateGantt();
});

colWidthInput.addEventListener("sl-input", (e) => {
  ganttSrv.updateColumnWidth(Number(e.currentTarget.value));
});

rowHeightInput.addEventListener("sl-input", (e) => {
  ganttSrv.updateHeight(Number(e.currentTarget.value));
});

hideLabelsInput.addEventListener("sl-change", (e) => {
  ganttSrv.toggleLabels();
});

hideArrowsInput.addEventListener("sl-change", (e) => {
  ganttSrv.toogleArrows();
});

dialog.addEventListener("sl-hide", (e) => {
  if (!e.target.classList.contains("dialog-overview")) return;
  dialog.querySelector("#createBtn").classList.remove("d-none");
  dialog.querySelector("#updateBtn").classList.add("d-none");
  dialog.querySelector("#deleteBtn").classList.add("d-none");
  dialog.querySelector("form").removeAttribute("data-task-id");
  updateSelectDependencies();
});

dialog.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const taskId = e.target.dataset.taskId;
  const taskName = e.target.querySelector('[name="name"]').value;
  const taskDependencies = e.target.querySelector(
    '[name="dependencies"]'
  ).value;
  if (taskId) {
    tasks = tasks.map((task) => ({
      ...task,
      name: taskName,
      dependencies: taskDependencies.join(","),
    }));
  } else {
    tasks = [
      ...tasks,
      {
        id: uuid(),
        name: taskName,
        start: "2023-04-19",
        end: "2023-04-21",
        progress: 0,
        dependencies: taskDependencies.join(","),
        type: "workOrder",
      },
    ];
  }
  ganttSrv.updateTasks(applyFilters());
  return dialog.hide();
});

dialog.querySelector("#deleteBtn").addEventListener("click", (e) => {
  const taskId = e.target.closest("[data-task-id]").dataset.taskId;
  tasks = tasks
    .filter((task) => task.id !== taskId)
    .map((task) => ({
      ...task,
      dependencies: task.dependencies
        .map((dep) => dep.trim())
        .filter((dep) => dep !== taskId)
        .join(","),
    }));
  ganttSrv.updateTasks(applyFilters());
  dialog.hide();
});

createTaskBtn.addEventListener("click", () => {
  dialog.setAttribute("label", "Create new task");
  const dependencySelect = dialog.querySelector(
    'sl-select[name="dependencies"]'
  );
  dependencySelect.value = "";
  dialog.querySelector('sl-input[name="name"]').value = "";
  dialog.show();
});

viewModeSelect.addEventListener("sl-change", (e) => {
  const viewMode = e.target.value;
  ganttSrv.changeView(viewMode);
});

updateSelectDependencies();