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

  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
    console.error(notificationService);
  }

  ngOnInit(): void {
    this.notificationService.getNotificationStream().subscribe(
      (notifications) => console.error(notifications)
    )
  }

}
