import "./SCSS/index.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const datetimeSelector = document.querySelector(".date-time__selector");

const handleOnChangeSelector = (event) => {
  const birthDay = dayjs(event.target.value);
  if (!birthDay.isValid()) {
    return;
  }
  console.log(birthDay.toNow(true));
};

datetimeSelector.addEventListener("change", handleOnChangeSelector);
