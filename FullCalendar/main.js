import { Calendar } from '@fullcalendar/core';
import LocaleEs from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventManager from './scripts/EventManager';
import listPlugin from '@fullcalendar/list';
import '@dile/dile-modal/dile-modal';
import './style.css';

const container = document.querySelector('.calendar-container');
const eventModal = document.querySelector('#event-modal');
const form = eventModal.querySelector('form');

let selectedInfo = null;
const eventManager = new EventManager();

const handleOnSelect = (info) => {
  console.log('selected ' + info.startStr + ' to ' + info.endStr);
  selectedInfo = info;
  eventModal.open();
};

const handleOnSubmitForm = (e) => {
  e.preventDefault();
  const name = e.target.querySelector('[name="eventName"]').value;
  const description = e.target.querySelector('[name="eventDescription"]').value;
  if (!name.trim() || !description.trim()) {
    return;
  }
  const event = {
    id: Date.now(),
    name,
    description,
    start: selectedInfo.startStr,
    end: selectedInfo.endStr
  };
  eventManager.saveEvent(event);
  calendar.addEvent(event);
  selectedInfo = null;
  eventModal.close();
}

form.addEventListener('submit', handleOnSubmitForm);

// const handleOnDateClick = (info) => {
//   alert('clicked ' + info.dateStr);
// }

const calendar = new Calendar(container, {
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  longPressDelay: 100,
  locale: LocaleEs,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,listWeek'
  },
  selectable: true,
  events: eventManager.getEvents(),
  eventClick: (data) => {
    debugger;
    form.querySelector('[name="eventName"]').value = data.event.name;
    form.querySelector('[name="eventDescription"]').value = data.event.name;
    eventModal.open();
  },
  // dateClick: handleOnDateClick,
  select: handleOnSelect
});

calendar.render();