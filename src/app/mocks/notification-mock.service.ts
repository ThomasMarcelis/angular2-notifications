import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Notification} from '../notification';

@Injectable()
export class NotificationMockService {

  private timer;
  private notifications: Notification[];

  constructor() {
    this.notifications = [
      {
        title: "This is a notifications",
        type: "This is a type",
        id: 0,
      },
      {
        title: "This is a notifications",
        type: "This is a type",
        id: 1
      },
      {
        title: "This is a notifications",
        type: "This is a type",
        id: 2
      }
    ];
    this.timer = Observable.of(this.notifications);
  }

  public getNotificationStream() {
    return this.timer;
  }

}
