import Gantt from "frappe-gantt";
import { createSVG } from "frappe-gantt/src/svg_utils";
import dayjs from "dayjs";

const defaultOptions = {
  language: "es",
  bar_height: 30,
  header_height: 50,
  column_width: 30,
};

const defaultEmptyTask = {
  id: "Empty task",
  name: "",
  start: "2023-04-19",
  end: "2023-04-21",
  progress: 0,
  dependencies: "",
  custom_class: "hidden",
  type: "workOrder",
};

class GanttService {
  constructor(containerSelector, tasks, options) {
    this.currentAction = null;
    this.eventTriggers = {};
    this.displacedTask = null;
    this._onPointerDown = this.onPointerDown.bind(this);
    this._onPointerUp = this.onPointerUp.bind(this);
    this._onPointerLeave = this.onPointerLeave.bind(this);
    this._onClick = this.onClick.bind(this);

    this.gantt = new Gantt(containerSelector, tasks, {
      ...defaultOptions,
      ...options,
      on_date_change: (task, start, end) => {
        if (!this.displacedTask) {
          if (typeof this.eventTriggers["taskresized"] === "function") {
            this.eventTriggers["taskresized"]({
              taskId: task.id,
              start,
              end,
            });
          }
          return;
        }

        if (this.displacedTask.taskId === task.id) {
          const diffSecondsStart = dayjs(start).diff(task.start, "seconds");
          this.displacedTask.seconds = diffSecondsStart;
        }

        if (
          this.displacedTask.seconds !== 0 &&
          typeof this.eventTriggers["taskmoved"] === "function"
        ) {
          this.eventTriggers["taskmoved"]({
            taskId: task.id,
            seconds: this.displacedTask.seconds,
          });
        }
      },
    });
    this.makeGridWeekendHighlights();
    this.gantt.$svg.addEventListener("pointerdown", this._onPointerDown);
    this.gantt.$svg.addEventListener("pointerup", this._onPointerUp);
    this.gantt.$svg.addEventListener("pointerleave", this._onPointerLeave);
    this.gantt.$svg.addEventListener("dblclick", this._onClick);
  }

  onPointerDown(e) {
    if (this.currentAction || !e.target) return;
    this.displacedTask = null;
    const taskEl = e.target.closest("[data-id]");
    if (!taskEl) {
      e.preventDefault();
      return e.stopPropagation();
    }
    const taskId = taskEl.dataset.id;
    if (e.target.classList.contains("handle")) {
      if (e.target.classList.contains("progress")) {
        this.currentAction = { action: "isDraggingProgress", taskId };
        return;
      }
      this.currentAction = { action: "isDraggingTaskSize", taskId };
      return;
    }
    this.currentAction = { action: "isMovingTask", taskId };
  }

  onPointerUp(e) {
    if (!this.currentAction) return;
    const taskEl = this.gantt.$svg.querySelector(
      `[data-id="${this.currentAction.taskId}"]`
    );
    switch (this.currentAction.action) {
      case "isDraggingProgress":
        const barContainer = taskEl.querySelector(".bar-group");
        const widthBar = Number(
          barContainer.querySelector(".bar").getAttribute("width")
        );
        const widthBarProgress = Number(
          barContainer.querySelector(".bar-progress").getAttribute("width")
        );
        const percentage = Math.floor((widthBarProgress / widthBar) * 100);
        if (typeof this.eventTriggers["changeprogress"] === "function") {
          this.eventTriggers["changeprogress"]({
            taskId: this.currentAction.taskId,
            progress: percentage,
          });
        }
        break;
      case "isDraggingTaskSize":
        break;
      case "isMovingTask":
        const actionTask = this.gantt.tasks.find(
          (task) => task.id === this.currentAction.taskId
        );
        if (!actionTask) return;
        this.displacedTask = {
          taskId: this.currentAction.taskId,
          seconds: 0,
        };
        break;
    }
    this.currentAction = null;
  }

  onPointerLeave(e) {}

  onClick(e) {
    if (this.currentAction || !e.target) return;
    const taskEl = e.target.closest("[data-id]");
    if (!taskEl) {
      e.preventDefault();
      return e.stopPropagation();
    }
    if (e.target.classList.contains("handle")) {
      return;
    }
    if (typeof this.eventTriggers["clicktask"] === "function") {
      const taskId = taskEl.dataset.id;
      this.eventTriggers["clicktask"](taskId);
    }
  }

  on(eventId, callback) {
    this.eventTriggers[eventId] = callback;
  }

  updateTasks(tasks = []) {
    this.gantt.refresh(tasks.length > 0 ? tasks : [{ ...defaultEmptyTask }]);
    this.makeGridWeekendHighlights();
  }

  changeView(viewMode) {
    this.gantt.change_view_mode(viewMode);
    this.updateGantt();
  }

  updateHeight(barHeight) {
    this.gantt.options.bar_height = barHeight;
    this.updateGantt();
  }

  updateColumnWidth(columnWidth) {
    this.gantt.options.column_width = columnWidth;
    this.updateGantt();
  }

  updateHeaderHeight(headerHeight) {
    this.gantt.options.header_height = headerHeight;
    this.updateGantt();
  }

  updateLanguage(lang) {
    this.gantt.options.language = lang;
    this.updateGantt();
  }

  updateCustomPopup(customPopup) {
    this.gantt.options.custom_popup_html = customPopup;
    this.gantt.popup = undefined;
  }

  updateGantt() {
    this.gantt.render();
    this.makeGridWeekendHighlights();
  }

  makeGridWeekendHighlights = () => {
    if (this.gantt.view_is("Day")) {
      const width = this.gantt.options.column_width;
      const height =
        (this.gantt.options.bar_height + this.gantt.options.padding) *
          this.gantt.tasks.length +
        this.gantt.options.header_height +
        this.gantt.options.padding / 2;

      let x = 0;

      for (let date of this.gantt.dates) {
        const isWeekend = date.getDay() == 0 || date.getDay() == 6;
        if (isWeekend) {
          createSVG("rect", {
            x,
            y: 0,
            width,
            height,
            class: "weekend-highlight",
            append_to: this.gantt.layers.grid,
          });
        }
        x += this.gantt.options.column_width;
      }
    }
  };

  toggleLabels() {
    this.gantt.$svg.classList.toggle("hide-labels");
  }

  toogleArrows() {
    this.gantt.$svg.classList.toggle("hide-arrows");
  }

  destroy() {
    this.currentAction = null;
    this.eventTriggers = {};
    this.gantt.$svg.removeEventListener("pointerdown", this._onPointerDown);
    this.gantt.$svg.removeEventListener("pointerup", this._onPointerUp);
    this.gantt.$svg.removeEventListener("pointerleave", this._onPointerLeave);
    this.gantt.$svg.removeEventListener("dblclick", this._onClick);
    this.gantt.clear();
  }
}

export default GanttService;
