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
  notifications: Notification[];
  displayed: idToBool;
  amountDisplayed: number;
  forUser: Notification[];
  notificationService: NotificationService;
  counter: number;

  constructor(notificationService: NotificationService) {
    this.displayed = {};
    this.forUser = [];
    this.amountDisplayed = 0;
    this.notificationService = notificationService;
    this.notifications = [];
    this.counter = 0;
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
      if(this.amountDisplayed < 3) {
        this.display(notification)
      }
    }


    this.counter = this.notifications.length;
  }

  onNotificationClicked(notification: Notification, event: any) {

    this.removeFromDisplay(notification);


  }

  display(notification: Notification) {
    this.forUser.push(notification);
    this.amountDisplayed++;
    setTimeout(() => {
      this.displayed[notification.id] = true;
      }, 100)
  }

  removeFromDisplay(notification: Notification) {
      let notificationIndex = this.notifications.indexOf(notification);
      if (notificationIndex > -1) {
        this.notifications.splice(notificationIndex, 1);
        this.counter--;


        let reduceAmount = 1;
        let addedNotification: Notification = undefined;
        if(this.notifications.length > 2) {
          while(this.forUser.includes(this.notifications[this.notifications.length-reduceAmount])) {
            reduceAmount++;
          }
          addedNotification = this.notifications[this.notifications.length-reduceAmount];
          this.displayed[addedNotification.id] = false;
          this.forUser.push(addedNotification);
        } else {
          this.amountDisplayed--;
        }

      setTimeout(() => {
      this.displayed[notification.id] = false;
      this.displayed[addedNotification.id] = true
      }, 100)
      setTimeout(() => {
        let notificationIndex = this.forUser.indexOf(notification);
        if (notificationIndex > -1) {
          this.forUser.splice(notificationIndex, 1);
        }
      }, 500)

    }
  }


}
