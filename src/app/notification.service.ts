import { Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Notification} from './notification';

@Injectable()
export class NotificationService implements OnInit{
  private timer;

  ngOnInit(): void {
  }

  constructor() {
    this.timer = Observable.interval(1000)
      .flatMap(() => {
        return this.getNotification();
      });
  }

  private getNotification(): Notification[] {
    const notification: Notification[] = [
      {
        title: "This is a notification",
        type: "this is a notification type"
      }
    ];
    return notification;
  }

  public getNotificationStream() {
    return this.timer;
  }



}
