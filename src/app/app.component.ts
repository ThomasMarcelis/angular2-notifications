import {Component, Renderer} from '@angular/core';
import {Notification} from "./notification";
import {NotificationMockService} from "./mocks/notification-mock.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotificationMockService],

})
export class AppComponent {
  title = 'app works!';
  notifications: Notification[];
  notificationService: NotificationMockService;
  counter: number;

  constructor(notificationService: NotificationMockService, private renderer: Renderer) {
    this.notificationService = notificationService;
    this.notifications = [];
    this.counter = 0;
    this.notificationService.getNotificationStream().subscribe(
      (notifications) => {this.addNotification(notifications);}
    )
  }

  addNotification(notifications: Notification[]): void {
    this.notifications = this.notifications.reverse().concat(notifications).reverse();
    this.counter = this.notifications.length;
  }

  onNotificationClicked(notification: Notification, event: any) {

    let oldClasses = event.target.getAttribute('class');
    this.renderer.setElementAttribute(event.target, "class", oldClasses + ' removing');

    setTimeout(() => {

        let notificationIndex = this.notifications.indexOf(notification);
        if (notificationIndex > -1) {
          this.notifications.splice(notificationIndex, 1);
          this.counter--;
        }
      }, 1000)
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
