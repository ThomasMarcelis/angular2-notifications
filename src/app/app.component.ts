import {Component, Renderer} from '@angular/core';
import {Notification} from "./notification";
import {NotificationService} from "./notification.service";

interface idToBool {
  [id: number]: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotificationService],

})
export class AppComponent {
  title = 'app works!';
  notifications: Notification[];
  displayed: idToBool;
  notificationService: NotificationService;
  counter: number;

  constructor(notificationService: NotificationService) {
    this.displayed = {};
    this.notificationService = notificationService;
    this.notifications = [];
    this.counter = 0;
    console.log("hello");
    this.notificationService.getNotificationStream().subscribe(
      (notifications) => {this.addNotification(notifications);}
    )
  }

  addNotification(notifications: Notification[]): void {
    if(!Array.isArray(notifications)) {
      notifications = [ notifications ];
    }

    for(let notification of notifications) {
      this.displayed[notification.id] = false;
      this.notifications.unshift(notification);
      setTimeout(() => {
        this.displayed[notification.id] = true;
      }, 50)
    }

    this.counter = this.notifications.length;
  }

  onNotificationClicked(notification: Notification, event: any) {

    this.displayed[notification.id] = false;


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
