import "./SCSS/index.scss";
import dayjs from "dayjs";

const datetimeSelector = document.querySelector(".date-time__selector");
const actionsContainer = document.querySelector(".actions-container");
const resultFormattedContainer = document.querySelector(
  ".formatted-result-container"
);
const resultJSONContainer = document.querySelector(".json-result-container");
const resultUNIXContainer = document.querySelector(".unix-result-container");

let date = dayjs();

const performAction = (action, timeType) => {
  switch (action) {
    case "reset":
      date = date.startOf(timeType);
      break;
    case "subtract":
      date = date.subtract(1, timeType);
      break;
    case "add":
    default:
      date = date.add(1, timeType);
      break;
  }
};

const handleOnChangeSelector = (event) => {
  date = dayjs(event ? event.target.value : undefined);
  if (!date.isValid()) {
    return;
  }
  updateDisplay();
};

const updateDisplay = () => {
  datetimeSelector.value = date.format("YYYY-MM-DDTHH:mm:ss.SSS");
  resultFormattedContainer.innerHTML = date.format("DD-MM-YYYY HH:mm:ss");
  resultJSONContainer.innerHTML = date.toJSON();
  resultUNIXContainer.innerHTML = date.unix();
};

actionsContainer.addEventListener("click", (event) => {
  const element = event.target;
  if (!element.classList.contains("btn-action")) {
    return;
  }
  const action = element.dataset.action;
  const timeType = element.dataset.timeType;
  performAction(action, timeType);
  updateDisplay();
});

datetimeSelector.addEventListener("change", handleOnChangeSelector);

handleOnChangeSelector();
