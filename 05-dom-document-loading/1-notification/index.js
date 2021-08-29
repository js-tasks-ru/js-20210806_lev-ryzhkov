export default class NotificationMessage {
  static notification;

  constructor(message = '', {
    duration = 0,
    type = '',
  } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.render();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = `
      <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;

    this.element = element.firstElementChild;
  }

  show(container) {
    if (this.notification) {
      this.clearNotification()
    }
    this.timerId = setTimeout(() => {
        this.remove();
      }, this.duration
    )
    container ? container.append(this.element) : document.body.append(this.element);
    this.notification = this
  }

  clearNotification() {
    clearTimeout(notification.timerId);
    this.notification.element.remove();
    this.notification = null;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
