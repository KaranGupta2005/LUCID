class EventBus {
  constructor() {
    this.subscribers = new Map();
  }

  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event).push(callback);
  }

  publish(event, data) {
    const callbacks = this.subscribers.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }

  unsubscribe(event, callback) {
    const callbacks = this.subscribers.get(event) || [];
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }
}

export const eventBus = new EventBus();
