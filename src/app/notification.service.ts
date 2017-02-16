import { Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Notification} from './notification';


@Injectable()
export class NotificationService implements OnInit{
  private timer;
  private idCounter;

  ngOnInit(): void {
  }

  constructor() {
    this.idCounter = 0;
    this.timer = Observable.interval(3000)
      .flatMap(() => {
        return this.getNotification();
      });
  }

  private getNotification(): Notification[] {
    const notification: Notification[] = [
      {
        title: "This is a notification",
        type: "this is a notification type",
        id: this.idCounter
      }
    ];
    this.idCounter++;
    return notification;
  }

  public getNotificationStream() {
    return this.timer;
  }



}
