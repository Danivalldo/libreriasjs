import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import '@shoelace-style/shoelace/dist/components/range/range.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import Litepicker from 'litepicker';
import 'litepicker/dist/plugins/mobilefriendly';
import dayjs from "dayjs";
import GanttService from "./src/GanttService";

import "./style.css";

const colWidthInput = document.querySelector("#colWidthInput");
const rowHeightInput = document.querySelector("#rowHeightInput");
const hideLabelsInput = document.querySelector("#hideLabelsInput");
const hideArrowsInput = document.querySelector("#hideArrowsInput");
const createTaskBtn = document.querySelector('#create-task-btn');
const dialog = document.querySelector('#dialog');
const keyFilterInput = document.querySelector('#keyFilterInput');
const viewModeSelect = document.querySelector('#select-view-mode');


const tasks = [
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
];

const ganttSrv = new GanttService("#gantt-container", tasks);

ganttSrv.on('clicktask', () => {
  dialog.show();
})

const picker = new Litepicker({
  plugins: ['mobilefriendly'],
  element: document.getElementById('date-filters-input'),
  resetButton: true,
  singleMode: false,
});

picker.on('selected', (date1, date2) => {
  const dStartFilter = dayjs(date1.dateInstance);
  const dEndFilter = dayjs(date2.dateInstance);
  const filteredTasks = tasks.filter((task) => {
    const dStartTask = dayjs(task.start);
    const dEndTask = dayjs(task.end);
    return dStartFilter.isBefore(dEndTask) && dEndFilter.isAfter(dStartTask);
  });
  ganttSrv.updateTasks(filteredTasks);
});

picker.on('clear:selection', () => {
  ganttSrv.updateTasks([...tasks]);
});

window.addEventListener('load', () => {
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

createTaskBtn.addEventListener('click', () => {
  dialog.show();
});

keyFilterInput.addEventListener('sl-input', (e) => {
  const filterKey = e.target.value;
  ganttSrv.updateTasks(tasks.filter(task => task.name.includes(filterKey)))
});

viewModeSelect.addEventListener('sl-change', (e) => {
  const viewMode = e.target.value;
  ganttSrv.changeView(viewMode);
})