class EventManager {
  constructor() {
    this.eventsKey = 'ljs-events';
    const events = localStorage.getItem(this.eventsKey);
    if (!events) {
      localStorage.setItem(this.eventsKey, JSON.stringify([]));
    }
  }
  getEvents() {
    return JSON.parse(localStorage.getItem(this.eventsKey));
  }
  saveEvent(event) {
    const events = this.getEvents();
    localStorage.setItem(this.eventsKey, JSON.stringify([event, ...events]));
  }
  deleteEvent(id) {
    const events = this.getEvents();
    localStorage.setItem(this.eventsKey, JSON.stringify(
      events.filter((event) => event.id !== id)
    ));
  }
}

export default EventManager;