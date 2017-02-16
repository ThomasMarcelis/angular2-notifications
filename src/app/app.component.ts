import { Component, OnInit } from '@angular/core';
import {Notification} from "./notification";
import {NotificationService} from "./notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotificationService]
})
export class AppComponent implements OnInit {
  title = 'app works!';
  notifications: Notification[];
  notificationService: NotificationService;
  counter: number;

  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
    this.notifications = [];
    this.counter = 0;
  }

  ngOnInit(): void {
    this.notificationService.getNotificationStream().subscribe(
      (notifications) => {this.addNotification(notifications);}
    )
  }

  addNotification(notifications: Notification[]): void {
    this.notifications = this.notifications.concat(notifications);
    this.counter = this.notifications.length;
  }

  onNotificationClicked(notification: Notification) {
    let notificationIndex = this.notifications.indexOf(notification);
    if(notificationIndex > -1) {
      this.notifications.splice(notificationIndex, 1);
      this.counter--;
    }
  }

}
