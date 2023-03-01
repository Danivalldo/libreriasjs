import { Calendar } from "@fullcalendar/core";
import LocaleEs from "@fullcalendar/core/locales/es";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventManager from "./scripts/EventManager";
import listPlugin from "@fullcalendar/list";
import "@dile/dile-modal/dile-modal";
import "./style.css";

const container = document.querySelector(".calendar-container");
const eventModal = document.querySelector("#event-modal");
const form = eventModal.querySelector("form");

let selectedInfo = null;
let selectedEvent = null;
const eventManager = new EventManager();

const handleOnSelect = (info) => {
  console.log("selected " + info.startStr + " to " + info.endStr);
  selectedInfo = info;
  eventModal.open();
};

const handleOnClickEvent = (data) => {
  form.querySelector('[name="title"]').value = data.event.title;
  form.querySelector('[name="description"]').value =
    data.event.extendedProps.description;
  selectedEvent = data.event;
  eventModal.querySelector(".delete-event-btn").classList.remove("d-none");
  eventModal.querySelector("button[type='submit']").innerHTML = "Editar";
  eventModal.open();
};

const handleOnSubmitForm = (e) => {
  e.preventDefault();
  const title = e.target.querySelector('[name="title"]').value;
  const description = e.target.querySelector('[name="description"]').value;
  if (!title.trim() || !description.trim()) {
    return;
  }

  if (selectedEvent) {
    selectedEvent.setProp("title", title);
    selectedEvent.setExtendedProp("description", description);
    eventManager.updateEvent({ title, description }, selectedEvent.id);
  } else {
    const event = {
      id: `${Date.now()}`,
      title,
      extendedProps: {
        description,
      },
      start: selectedInfo.startStr,
      end: selectedInfo.endStr,
    };
    eventManager.saveEvent(event);
    calendar.addEvent(event);
  }
  eventModal.close();
};

eventModal.querySelector(".delete-event-btn").addEventListener("click", () => {
  eventManager.deleteEvent(selectedEvent.id);
  selectedEvent.remove();
  eventModal.close();
});

form.addEventListener("submit", handleOnSubmitForm);

eventModal.addEventListener("dile-modal-closed", () => {
  form.querySelector('[name="title"]').value = "";
  form.querySelector('[name="description"]').value = "";
  eventModal.querySelector(".delete-event-btn").classList.add("d-none");
  eventModal.querySelector("button[type='submit']").innerHTML = "Guardar";
  selectedInfo = null;
  selectedEvent = null;
});

const calendar = new Calendar(container, {
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  longPressDelay: 100,
  locale: LocaleEs,
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,listWeek",
  },
  selectable: true,
  events: eventManager.getEvents(),
  eventClick: handleOnClickEvent,
  select: handleOnSelect,
});

calendar.render();
